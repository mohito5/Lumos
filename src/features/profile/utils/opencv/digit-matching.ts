// ============================================================================
// digit-matching.ts — распознавание количества через сравнение с шаблонами
// цифр, вместо Tesseract OCR.
//
// ПОЧЕМУ НЕ TESSERACT: проверено эмпирически на реальных скриншотах —
// движок общего назначения (обучен на документах) не читает мелкий игровой
// шрифт надёжно ни в одной из проверенных конфигураций (LSTM/legacy/combined
// движки, разные traineddata — стандартная eng, best_int, полная 4.0.0,
// разные PSM). Лучший результат на тестовой выборке из 32 реальных ячеек —
// 2/32. Проблема не в конкретной версии/сборке, а в самой задаче: шрифт
// слишком мелкий и специфичный для универсального OCR, обученного на
// документах, а не на игровых интерфейсах.
//
// ПОДХОД: та же идея, что уже работает для иконок материалов
// (template-matching.ts) — сравнение с заранее подготовленными шаблонами
// (TM_CCOEFF_NORMED), а не открытое распознавание. Шаблоны символов
// (0-9, k, K, .) вырезаются из реальных скриншотов игры через
// digit-calibration — не скачиваются как файл шрифта: (1) точнее, потому
// что это тот же самый рендер, что и на реальных сканах, а не сторонний
// файл шрифта, который игра всё равно рисует с своей обводкой/жирностью
// поверх; (2) не тянет за собой вопросы лицензии на шрифт.
//
// Сегментация использует findContours (не connectedComponentsWithStats —
// последний не проверен на доступность в этой кастомной сборке opencv.js,
// а findContours уже подтверждённо работает в auto-detection.ts).
// ============================================================================

import type { CvMat, CvMatVector, DigitTemplateCache, SlotRect } from '../../types/inventory.types';
import { safeDeleteAll, binarizeAutoPolarity, loadUrlToMat } from './mat-utils';
import { ocrLog } from './ocr-logger';

// ".": как имя папки "." — это текущая директория, а не буквальная точка,
// поэтому нужен безопасный алиас. Должен совпадать с SAFE_NAMES в
// scripts/unpack-digit-templates.js.
const SAFE_FOLDER_NAMES: Record<string, string> = { '.': 'dot' };

interface DigitManifest {
  [char: string]: number; // сколько файлов N.png лежит в public/assets/digits/<символ>/
}

/**
 * Грузит шаблоны символов из public/assets/digits/ (собраны через
 * #/dev/digit-calibration + scripts/unpack-digit-templates.js).
 *
 * Если manifest.json отсутствует или пуст — возвращает {} и подробно логирует
 * это; вызывающий код (useOcrProcess.ts) должен понимать, что при пустом
 * кэше распознавание чисел просто не будет работать, и явно сообщать об
 * этом в UI, а не молча возвращать нули.
 */
export const loadDigitTemplates = async (): Promise<DigitTemplateCache> => {
  const cache: DigitTemplateCache = {};

  let manifest: DigitManifest;
  try {
    const res = await fetch('/assets/digits/manifest.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    manifest = await res.json();
  } catch (e) {
    ocrLog.warn('digit-templates', 'manifest.json не найден — шаблоны цифр не откалиброваны (см. #/dev/digit-calibration)', { error: String(e) });
    return cache;
  }

  const chars = Object.keys(manifest);
  if (chars.length === 0) {
    ocrLog.warn('digit-templates', 'manifest.json пуст');
    return cache;
  }

  let totalLoaded = 0;
  let totalFailed = 0;

  for (const char of chars) {
    const count = manifest[char];
    const folder = SAFE_FOLDER_NAMES[char] || char;
    const samples: CvMat[] = [];

    for (let n = 1; n <= count; n++) {
      try {
        const rgba = await loadUrlToMat(`/assets/digits/${folder}/${n}.png`);
        const gray = new window.cv.Mat();
        window.cv.cvtColor(rgba, gray, window.cv.COLOR_RGBA2GRAY);
        // Перебинаризуем на всякий случай (защита от артефактов сжатия) —
        // экспортированные PNG и так уже чёрно-белые.
        const binary = binarizeAutoPolarity(gray);
        samples.push(binary);
        safeDeleteAll(rgba, gray);
        totalLoaded++;
      } catch (e) {
        totalFailed++;
        ocrLog.warn('digit-templates', `не удалось загрузить /assets/digits/${folder}/${n}.png`, { error: String(e) });
      }
    }

    if (samples.length > 0) cache[char] = samples;
  }

  ocrLog.info('digit-templates', `загружено ${totalLoaded} образцов для ${Object.keys(cache).length} символов${totalFailed > 0 ? `, ошибок: ${totalFailed}` : ''}`, {
    символы: Object.keys(cache).sort(),
  });

  return cache;
};

// ── Настройки сегментации ────────────────────────────────────────────────
// Область с числом — узкая полоса у самого низа ячейки; выше неё может быть
// декор (полоска звёзд рейтинга и/или другой элемент оформления карточки).
// Границы полосы (numY/numH) заданы в region-calibration.ts — общем
// источнике для этого файла / useOcrProcess.ts / DigitCalibrationPage.tsx.
// Сам digit-matching.ts эти координаты не использует напрямую — их читает
// вызывающий код (useOcrProcess.ts), который вырезает полосу с числом ДО
// вызова segmentGlyphs/matchGlyph ниже. Откалибровано через
// #/dev/digit-calibration на реальных ячейках (5★/3★/2★ редкости) —
// подробнее см. комментарий в region-calibration.ts.

// MIN_GLYPH_AREA/MERGE_WIDTH_RATIO ниже — той же природы, что и
// MIN_GLYPH_SCORE (см. комментарий там): подобраны эмпирически на тех же
// скриншотах, отдельного датасета/README не сохранено, порядок
// перекалибровки — тот же (шаги 1-2 там же).
const MIN_GLYPH_AREA = 4;
const MIN_GLYPH_HEIGHT = 5;
// Если контур шире этого множителя от медианной ширины остальных контуров —
// считаем, что это слипшиеся символы (например "1"+"9" почти вплотную), и
// разрезаем по внутреннему столбцу с минимальной "чернотой".
const MERGE_WIDTH_RATIO = 1.6;

const median = (vals: number[]): number => {
  const s = [...vals].sort((a, b) => a - b);
  const n = s.length;
  if (n === 0) return 0;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};

/**
 * Сегментирует бинарную полосу (чёрный текст на белом) на отдельные глифы.
 *
 * Возвращает координаты глифов слева направо. НЕ отвечает за то, что это
 * именно цифры — просто "визуально обособленные тёмные объекты разумного
 * размера", отфильтрованные от явного шума и разрезанные там, где похоже
 * на слипшиеся символы.
 */
export const segmentGlyphs = (stripBinary: CvMat): SlotRect[] => {
  let inverted: CvMat | null = null;
  let contours: CvMatVector | null = null;
  let hierarchy: CvMat | null = null;

  try {
    const cv = window.cv;
    // findContours в этой сборке ищет светлые объекты на тёмном фоне —
    // у нас наоборот (чёрный текст на белом), поэтому инвертируем перед
    // поиском контуров.
    inverted = new cv.Mat();
    cv.bitwise_not(stripBinary, inverted);

    contours = new cv.MatVector();
    hierarchy = new cv.Mat();
    cv.findContours(inverted, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    const H = stripBinary.rows;
    const raw: Array<{ x: number; y: number; w: number; h: number; area: number }> = [];

    for (let i = 0; i < contours.size(); i++) {
      const cnt = contours.get(i);
      const area = cv.contourArea(cnt);
      if (area < MIN_GLYPH_AREA) continue;

      const rect = cv.boundingRect(cnt);
      if (rect.height < MIN_GLYPH_HEIGHT || rect.height > H) continue;
      // Широкие и плоские блобы — типичный шум (декоративные элементы,
      // обрезки соседних деталей), а не символ.
      if (rect.width > rect.height * 2.5) continue;

      raw.push({ x: rect.x, y: rect.y, w: rect.width, h: rect.height, area });
    }

    if (raw.length === 0) return [];

    const medianW = median(raw.map(r => r.w));
    const glyphs: SlotRect[] = [];

    for (const r of raw) {
      if (medianW > 0 && r.w > medianW * MERGE_WIDTH_RATIO) {
        // Похоже на слипшиеся символы — ищем "провал" (минимум ink-плотности)
        // ближе к середине блока и режем по нему.
        const region = inverted.roi(new cv.Rect(r.x, r.y, r.w, r.h));
        const colSums = new Array<number>(r.w).fill(0);
        for (let cx = 0; cx < r.w; cx++) {
          let sum = 0;
          for (let cy = 0; cy < r.h; cy++) sum += region.ucharAt(cy, cx);
          colSums[cx] = sum;
        }
        region.delete();

        const searchStart = Math.max(1, Math.round(r.w * 0.3));
        const searchEnd = Math.min(r.w - 1, Math.round(r.w * 0.7));
        let splitAt = Math.round(r.w / 2);
        let minVal = Infinity;
        for (let cx = searchStart; cx < searchEnd; cx++) {
          if (colSums[cx] < minVal) {
            minVal = colSums[cx];
            splitAt = cx;
          }
        }
        glyphs.push({ x: r.x, y: r.y, width: splitAt, height: r.h });
        glyphs.push({ x: r.x + splitAt, y: r.y, width: r.w - splitAt, height: r.h });
        ocrLog.info('digit-seg', `разрезан широкий блок (w=${r.w}, медиана=${medianW.toFixed(0)}) на две части по x=${splitAt}`);
      } else {
        glyphs.push({ x: r.x, y: r.y, width: r.w, height: r.h });
      }
    }

    glyphs.sort((a, b) => a.x - b.x);
    return glyphs;
  } catch (e) {
    ocrLog.error('digit-seg', 'ошибка сегментации', e);
    return [];
  } finally {
    safeDeleteAll(inverted, hierarchy);
    contours?.delete();
  }
};

/** Вырезает бинарный глиф (чёрный на белом) из полосы по координатам. */
export const extractGlyph = (stripBinary: CvMat, rect: SlotRect): CvMat => {
  return stripBinary.roi(new window.cv.Rect(rect.x, rect.y, rect.width, rect.height)).clone();
};

/**
 * Сравнивает один глиф со всеми образцами всех символов в кэше,
 * возвращает лучшее совпадение.
 *
 * Как и в template-matching.ts (та же находка): matchTemplate иногда
 * может вернуть не-число на вырожденных сравнениях — отбрасываем такие
 * кандидаты явно вместо того, чтобы дать NaN/Infinity протечь в результат.
 */
export const matchGlyph = (
  glyph: CvMat,
  templates: DigitTemplateCache,
): { char: string; score: number } | null => {
  let best: { char: string; score: number } | null = null;

  for (const [char, samples] of Object.entries(templates)) {
    for (const tmpl of samples) {
      if (!tmpl || tmpl.empty()) continue;

      let resized: CvMat | null = null;
      let res: CvMat | null = null;
      try {
        const gw = glyph.cols;
        const gh = glyph.rows;
        if (gw < 2 || gh < 2) continue;

        resized = new window.cv.Mat();
        window.cv.resize(tmpl, resized, new window.cv.Size(gw, gh));

        res = new window.cv.Mat();
        window.cv.matchTemplate(glyph, resized, res, window.cv.TM_CCOEFF_NORMED);
        const { maxVal } = window.cv.minMaxLoc(res);

        if (!Number.isFinite(maxVal)) continue;
        if (!best || maxVal > best.score) {
          best = { char, score: maxVal };
        }
      } finally {
        safeDeleteAll(resized, res);
      }
    }
  }

  return best;
};

// ПОРОГ ПОДОБРАН ЭМПИРИЧЕСКИ на реальных скриншотах инвентаря (тот же
// смешанный набор 5★/3★/2★ ячеек, на котором калибровались numY/numH в
// region-calibration.ts) — точный список исходных файлов/число образцов
// отдельно не зафиксированы, задним числом их не восстановить. Если позже
// понадобится подстроить порог под новый тип скриншотов (другое разрешение
// или масштаб интерфейса игры), процедура:
//   1. Собрать свежий набор скриншотов инвентаря через #/dev/digit-calibration
//   2. Прогнать распознавание на них с OCR_DEBUG=true (ocr-logger.ts) —
//      recognizeQuantityByTemplate логирует score каждого совпадённого
//      символа через ocrLog.table
//   3. Смотреть на разрыв между score верных совпадений и score ложных —
//      порог должен резать МЕЖДУ ними, а не где-то посередине распределения
//      верных совпадений (иначе часть верных символов начнёт отбрасываться)
const MIN_GLYPH_SCORE = 0.45;

/**
 * Полный пайплайн: полоса с числом (RGBA, кроп из containerMat) →
 * бинаризация → сегментация → посимвольное сравнение с шаблонами → строка.
 */
export const recognizeQuantityByTemplate = (
  numMat: CvMat,
  templates: DigitTemplateCache,
): { text: string; quantity: number; avgScore: number } => {
  const empty = { text: '', quantity: 0, avgScore: 0 };

  if (Object.keys(templates).length === 0) {
    ocrLog.warn('digit-match', 'шаблоны цифр не загружены — см. digit-calibration');
    return empty;
  }

  let gray: CvMat | null = null;
  let binary: CvMat | null = null;

  try {
    gray = new window.cv.Mat();
    window.cv.cvtColor(numMat, gray, window.cv.COLOR_RGBA2GRAY);
    binary = binarizeAutoPolarity(gray);

    const glyphRects = segmentGlyphs(binary);
    if (glyphRects.length === 0) {
      return empty;
    }

    let text = '';
    let scoreSum = 0;
    let scoreCount = 0;

    for (const rect of glyphRects) {
      const glyph = extractGlyph(binary, rect);
      try {
        const match = matchGlyph(glyph, templates);
        if (match && match.score >= MIN_GLYPH_SCORE) {
          text += match.char;
          scoreSum += match.score;
          scoreCount++;
        } else {
          text += '?'; // неопознанный символ — виден в логах, не молчим
          ocrLog.warn('digit-match', `символ не опознан (ближайший кандидат: "${match?.char ?? 'н/д'}", score=${match?.score.toFixed(2) ?? 'н/д'}, порог=${MIN_GLYPH_SCORE})`);
        }
      } finally {
        glyph.delete();
      }
    }

    const cleanText = text.replace(/\?/g, '');
    const quantity = cleanText.toLowerCase().includes('k')
      ? Math.round(parseFloat(cleanText) * 1000)
      : parseInt(cleanText.replace(/\D/g, ''), 10) || 0;

    return {
      text,
      quantity: text.includes('?') ? 0 : quantity, // если хоть один символ не опознан — не гадаем
      avgScore: scoreCount > 0 ? scoreSum / scoreCount : 0,
    };
  } catch (e) {
    ocrLog.error('digit-match', 'ошибка распознавания', e);
    return empty;
  } finally {
    safeDeleteAll(gray, binary);
  }
};
