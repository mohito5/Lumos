// ============================================================================
// template-matching.ts — загрузка шаблонов и сравнение иконок
//
// ПОЧЕМУ TM_CCOEFF_NORMED вместо TM_SQDIFF_NORMED:
//   TM_SQDIFF_NORMED — сумма квадратов разностей, очень чувствителен
//   к яркости. Если у иконки другой фон — результат ухудшается.
//   TM_CCOEFF_NORMED — нормализованная кросс-корреляция, устойчива
//   к линейным изменениям яркости. Score 1.0 = идеальное совпадение.
// ============================================================================

import type { CvMat, CvMatVector, MatchScore, TemplateCache } from '../../types/inventory.types';
import { safeDeleteAll, loadUrlToMat } from './mat-utils';
import { getColorHistogram } from './histogram';
import { compareHistograms } from './histogram';
import { ocrLog } from './ocr-logger';

/** Веса для финального скора: форма важнее цвета */
const SHAPE_WEIGHT = 0.75;
const COLOR_WEIGHT = 0.25;

/** Ячейка считается распознанной если скор выше порога и отрыв от второго достаточный */
const MIN_TOTAL_SCORE = 0.6;
const MIN_MARGIN = 0.1;

// ── Загрузка шаблонов ──────────────────────────────────────────────────────

interface MaterialForTemplate {
  id: string;
  icon: string;
}

/**
 * Загружает все шаблоны материалов в кэш.
 * Для каждого материала:
 *   1. Загружает иконку как Mat
 *   2. Извлекает alpha-маску (прозрачность)
 *   3. Конвертирует в grayscale
 *   4. Считает цветовую гистограмму
 */
export const loadTemplates = async (
  materials: MaterialForTemplate[],
  onProgress?: (loaded: number, total: number) => void,
): Promise<TemplateCache> => {
  const cache: TemplateCache = {};
  const toLoad = materials.filter((m) => m.icon && !m.icon.includes('unknown'));
  const skippedNoIcon = materials.length - toLoad.length;
  const failed: Array<{ id: string; icon: string; error: string }> = [];

  ocrLog.info('templates', `старт загрузки: ${toLoad.length} материалов с иконками (пропущено без иконки: ${skippedNoIcon})`);

  for (let i = 0; i < toLoad.length; i++) {
    const mat = toLoad[i];
    let tM: CvMat | null = null;
    let gM: CvMat | null = null;
    let masked: CvMat | null = null;
    let alphaCh: CvMatVector | null = null;

    try {
      // Частая причина отказа: файл иконки физически отсутствует в
      // public/ (404) — тогда img.onerror сработает и попадём в catch.
      tM = await loadUrlToMat(`/${mat.icon}`);
      if (!tM || tM.empty()) throw new Error(`Пустой Mat для ${mat.id}`);

      // Grayscale для matchTemplate
      gM = new window.cv.Mat();
      window.cv.cvtColor(tM, gM, window.cv.COLOR_RGBA2GRAY);

      // Alpha-маска (4й канал RGBA)
      alphaCh = new window.cv.MatVector();
      window.cv.split(tM, alphaCh);
      const aMat = alphaCh.get(3);

      // Маскированная версия для гистограммы (фон отсечён)
      masked = new window.cv.Mat();
      if (!gM || !masked) throw new Error(`[loadTemplates] Mat allocation failed for ${mat.id}`);
      tM.copyTo(masked, aMat);

      cache[mat.id] = {
        grayTemplate: gM.clone(),
        mask: aMat.clone(),
        colorHist: getColorHistogram(masked),
        size: { width: tM.cols, height: tM.rows },
      };
    } catch (e) {
      failed.push({ id: mat.id, icon: mat.icon, error: String(e) });
    } finally {
      safeDeleteAll(tM, gM, masked);
      if (alphaCh && !alphaCh.isDeleted()) alphaCh.delete();
    }

    onProgress?.(i + 1, toLoad.length);
  }

  const loadedCount = Object.keys(cache).length;
  if (failed.length > 0) {
    ocrLog.warn(
      'templates',
      `загружено ${loadedCount}/${toLoad.length}. Не удалось загрузить ${failed.length} — ` +
      `скорее всего файлы отсутствуют в public/ (проверь пути). Сравнение для них работать не будет.`,
    );
    ocrLog.table('templates', 'Материалы без загруженной иконки', failed);
  } else {
    ocrLog.info('templates', `все ${loadedCount} шаблонов загружены успешно`);
  }

  return cache;
};

// ── Сравнение иконки с шаблонами ──────────────────────────────────────────

interface MatchResult {
  id: string;
  score: number;
  isConfident: boolean;
  /** Второй кандидат — заполнено всегда (если было ≥2 валидных шаблонов),
   *  не только при isConfident=false. Нужен для диагностики: "неуверенно"
   *  может значить и "просто низкий score", и "два кандидата почти
   *  неотличимы" (passesMargin не прошёл) — раньше это было неразличимо
   *  по логам без второго значения рядом. */
  runnerUp: { id: string; score: number } | null;
}

/**
 * Сравнивает иконку ячейки со всеми шаблонами из кэша.
 * Использует TM_CCOEFF_NORMED (форма) + cosine similarity (цвет).
 *
 * Возвращает лучшее совпадение или null если ни одно не прошло порог.
 */
// БЫЛО: resize шаблона под размер иконки происходил заново на КАЖДОЕ
// сравнение иконка↔шаблон, то есть на каждую ячейку — а размер иконки
// (iconGray.cols/rows) в рамках одного скрина почти всегда один и тот же
// (та же сетка, тот же medW/medH). Кэшируем resize-результат по ключу
// "id:WxH" — при повторном совпадении размера просто переиспользуем Mat
// вместо повторного cv.resize(). Живёт на уровне модуля, как и _worker в
// number-recognition.ts — то есть до перезагрузки страницы, WASM-память
// освобождается вместе со всем cv-контекстом при рефреше.
const resizeCache = new Map<string, { gray: CvMat; mask: CvMat }>();

export const matchIcon = (
  iconGray: CvMat,
  iconHist: Float32Array,
  cache: TemplateCache,
): MatchResult | null => {
  const scores: MatchScore[] = [];

  for (const [id, cached] of Object.entries(cache)) {
    if (!cached?.grayTemplate || cached.grayTemplate.empty()) continue;

    // Масштабируем шаблон под размер иконки (95% чтобы не вылезать за края)
    const scale =
      Math.min(iconGray.cols / cached.size.width, iconGray.rows / cached.size.height) * 0.95;

    const mW = Math.round(cached.size.width * scale);
    const mH = Math.round(cached.size.height * scale);
    if (mW < 5 || mH < 5) continue;

    const resizeKey = `${id}:${mW}x${mH}`;
    let rT: CvMat | null = null;
    let rM: CvMat | null = null;
    let res: CvMat | null = null;

    try {
      const fromCache = resizeCache.get(resizeKey);
      if (fromCache) {
        rT = fromCache.gray;
        rM = fromCache.mask;
      } else {
        rT = new window.cv.Mat();
        rM = new window.cv.Mat();
        window.cv.resize(cached.grayTemplate, rT, new window.cv.Size(mW, mH));
        window.cv.resize(cached.mask, rM, new window.cv.Size(mW, mH));
        resizeCache.set(resizeKey, { gray: rT, mask: rM });
      }

      res = new window.cv.Mat();

      // TM_CCOEFF_NORMED: 1.0 = идеальное совпадение (берём maxVal)
      window.cv.matchTemplate(iconGray, rT, res, window.cv.TM_CCOEFF_NORMED, rM);
      const { maxVal } = window.cv.minMaxLoc(res);

      // БАГ (найден на реальном скриншоте): для некоторых иконок (256×256
      // канвас, но непрозрачная область — всего ~10% площади, например
      // gems/anemo/*.png) маскированная нормализованная кросс-корреляция
      // на части позиций может давать нулевую дисперсию под маской → OpenCV
      // возвращает NaN/Infinity для этой позиции. Поскольку Infinity в JS
      // "больше" любого конечного числа, minMaxLoc отдаёт именно её как
      // maxVal, и это Infinity протекает дальше в total/margin (видно в
      // логах: score=Infinity, margin=NaN). Отбрасываем такие кандидаты
      // явно, а не полагаемся на то, что дальнейшая арифметика "как-то"
      // с ними справится.
      if (!Number.isFinite(maxVal)) {
        ocrLog.warn('match', `matchTemplate вернул не-число для "${id}" (maxVal=${maxVal}) — пропускаем кандидата`, {
          templateSize: cached.size,
          scaledTo: { mW, mH },
        });
        continue;
      }

      scores.push({
        id,
        shape: maxVal, // уже в [−1, 1], идеал = 1
        color: compareHistograms(iconHist, cached.colorHist),
        total: 0,
      });
    } finally {
      // БАГ (найден на реальном скриншоте — "Cannot pass deleted object as
      // a pointer of type Mat" начиная с ~13-й ячейки): здесь раньше стояло
      // `if (ownsResizedMats) safeDeleteAll(rT, rM)` — то есть Mat удалялся
      // РОВНО в тот момент, когда только что был положен в resizeCache для
      // повторного использования. Следующая ячейка брала из кэша ссылку на
      // уже удалённый объект → падение в matchTemplate. rT/rM теперь
      // принадлежат resizeCache НАВСЕГДА (до перезагрузки страницы) — их
      // нельзя удалять здесь ни в каком случае, только res (он временный,
      // создаётся заново на каждое сравнение и в кэш не кладётся).
      safeDeleteAll(res);
    }
  }

  if (scores.length < 2) {
    // Меньше 2 валидных шаблонов — почти всегда значит, что кэш шаблонов
    // почти пуст (см. лог [OCR:templates] — сколько реально загрузилось).
    ocrLog.warn('match', `сравнивать не с чем: валидных шаблонов в кэше только ${scores.length} (нужно ≥2)`, {
      cacheSize: Object.keys(cache).length,
    });
    return null;
  }

  scores.forEach((s) => {
    s.total = s.shape * SHAPE_WEIGHT + s.color * COLOR_WEIGHT;
  });
  scores.sort((a, b) => b.total - a.total);

  const best = scores[0];
  const second = scores[1];
  const passesScore = best.total > MIN_TOTAL_SCORE;
  const passesMargin = best.total - second.total > MIN_MARGIN;
  const isConfident = passesScore && passesMargin;

  ocrLog.info('match', `лучшее совпадение: ${best.id} (score=${best.total.toFixed(3)})`, {
    second: `${second.id} (${second.total.toFixed(3)})`,
    margin: (best.total - second.total).toFixed(3),
    passesScore: `${passesScore} (порог ${MIN_TOTAL_SCORE})`,
    passesMargin: `${passesMargin} (порог ${MIN_MARGIN})`,
    isConfident,
  });

  return { id: best.id, score: best.total, isConfident, runnerUp: { id: second.id, score: second.total } };
};
