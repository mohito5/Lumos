// ============================================================================
// background-removal.ts — удаление фона иконки материала
//
// БАГ, НАЙДЕННЫЙ ПРИ АУДИТЕ (июль): GrabCut вызывался на iconMat напрямую.
// iconMat приходит из ROI над RGBA-скриншотом (cv.imread всегда даёт RGBA,
// 4 канала), а cv.grabCut в OpenCV(.js) требует 8-битный 3-канальный BGR.
// На практике это либо кидало исключение внутри WASM-биндинга, либо (если
// биндинг молча брал только первые 3 байта как BGR, что тоже наблюдалось
// в некоторых сборках) портило цвета маски сегментации. Теперь строим
// отдельный 3-канальный BGR just for grabCut, а итоговую маску применяем
// к ОРИГИНАЛЬНОМУ RGBA iconMat, чтобы не потерять альфа-канал результата.
// ============================================================================

import type { CvMat } from '../../types/inventory.types';
import { safeDeleteAll } from './mat-utils';
import { ocrLog } from './ocr-logger';

/**
 * Удаляет фон иконки.
 *
 * Для редкостей 4★ (фиолетовый) и 5★ (золотой) — быстрый путь через HSV.
 * Для 1-3★ — GrabCut (точнее, но медленнее).
 *
 * Примечание по OpenCV.js:
 * HSV-диапазоны: H [0-179], S [0-255], V [0-255] (не 360/1/1 как в обычном HSV)
 */
export const removeBackground = (iconMat: CvMat, rarity: number): CvMat => {
  if (!iconMat || iconMat.isDeleted() || iconMat.empty()) {
    ocrLog.error('bg-removal', 'получен пустой/удалённый Mat');
    return window.cv.Mat.zeros(1, 1, window.cv.CV_8U) as CvMat;
  }

  // ── Быстрый путь для 4★ и 5★ ──────────────────────────────────────────
  if (rarity >= 4) {
    let bgr: CvMat | null = null;
    let hsv: CvMat | null = null;
    let mask: CvMat | null = null;
    let result: CvMat | null = null;

    try {
      bgr = new window.cv.Mat() as CvMat;
      hsv = new window.cv.Mat() as CvMat;
      mask = new window.cv.Mat() as CvMat;

      // COLOR_RGBA2HSV отсутствует в OpenCV.js → два шага
      window.cv.cvtColor(iconMat, bgr, window.cv.COLOR_RGBA2BGR);
      window.cv.cvtColor(bgr, hsv, window.cv.COLOR_BGR2HSV);

      // cv.inRange в этой сборке принимает только Mat, не Scalar.
      // Делаем range-check вручную по пикселям HSV.
      const [hLo, sLo, vLo, hHi, sSat, vHi] =
        rarity === 4
          ? [125, 40,  40, 155, 255, 255]   // 4★ фиолетовый
          : [ 20, 100, 100,  30, 255, 255];  // 5★ золотой

      mask = window.cv.Mat.zeros(hsv.rows, hsv.cols, window.cv.CV_8UC1) as CvMat;
      let inRangeCount = 0;
      const totalPixels = hsv.rows * hsv.cols;
      for (let y = 0; y < hsv.rows; y++) {
        for (let x = 0; x < hsv.cols; x++) {
          const p = hsv.ucharPtr(y, x);
          const inR = p[0] >= hLo && p[0] <= hHi
                   && p[1] >= sLo && p[1] <= sSat
                   && p[2] >= vLo && p[2] <= vHi;
          if (inR) inRangeCount++;
          mask.ucharPtr(y, x)[0] = inR ? 255 : 0;
        }
      }

      // БАГ (найден на реальном скриншоте — vajrada_amethyst_fragment
      // стабильно давал только средний score даже когда был правильным
      // кандидатом): этот метод ПРЕДПОЛАГАЕТ, что фон карточки и сам
      // предмет — разного цвета. Для vajrada_amethyst (ELECTRO, фиолетовый
      // ~H137) и диапазона "фон 4★" (H125-155) это предположение неверно —
      // проверено на реальном файле шаблона: под удаление как "фон"
      // попадает 96.4% пикселей САМОЙ иконки, а не только настоящего фона.
      // Если так — HSV-путь не просто неточен, а вреден: iconGray на
      // выходе почти пустой, и shape-score, и color-гистограмма после
      // этого бессмысленны. Если под удаление попадает подозрительно много
      // (>80% кропа) — считаем это провалом метода и уходим на GrabCut
      // (тот сегментирует по форме+цвету+положению, а не по одному только
      // глобальному диапазону оттенка, и не путает "предмет того же
      // цвета, что и фон редкости" с самим фоном настолько грубо).
      const strippedFraction = inRangeCount / totalPixels;
      if (strippedFraction > 0.80) {
        throw new Error(
          `HSV-диапазон rarity=${rarity} совпал с цветом самого предмета — ` +
          `под удаление попало ${(strippedFraction * 100).toFixed(0)}% пикселей (порог 80%)`,
        );
      }

      window.cv.bitwise_not(mask, mask);

      result = new window.cv.Mat() as CvMat;
      iconMat.copyTo(result, mask);

      ocrLog.info('bg-removal', `HSV-путь успешен (rarity=${rarity}, удалено фона: ${(strippedFraction * 100).toFixed(0)}%)`);
      const toReturn = result;
      result = null; // Prevent `finally` from deleting the returned Mat
      return toReturn;
    } catch (e) {
      ocrLog.warn('bg-removal', `HSV метод не сработал для rarity=${rarity}, пробуем GrabCut`, { error: String(e) });
      // Fall through to GrabCut. `finally` will clean up allocated Mats.
    } finally {
      safeDeleteAll(bgr, hsv, mask, result);
    }
  }

  // ── GrabCut для 1-3★ (и как fallback, если HSV выше не сработал) ──────
  const W = iconMat.cols;
  const H = iconMat.rows;
  const MARGIN = 5; // прямоугольник инициализации GrabCut должен быть строго внутри Mat

  if (W <= MARGIN * 2 || H <= MARGIN * 2) {
    // На совсем маленьких иконках (например, после агрессивного кропа)
    // прямоугольник MARGIN..W-MARGIN становится нулевым/отрицательным,
    // и cv.grabCut падает с ошибкой границ. Проще пропустить сегментацию.
    ocrLog.warn('bg-removal', `иконка слишком мала для GrabCut (${W}×${H}, нужно >${MARGIN * 2}px) — возвращаем без удаления фона`);
    return iconMat.clone();
  }

  let srcBgr: CvMat | null = null;
  let gcMask: CvMat | null = null;
  let bgdModel: CvMat | null = null;
  let fgdModel: CvMat | null = null;
  let finalResult: CvMat | null = null;

  try {
    const channels = iconMat.channels();
    srcBgr = new window.cv.Mat() as CvMat;

    // ГЛАВНЫЙ ФИКС: grabCut ожидает 3-канальный BGR, а iconMat из ROI —
    // 4-канальный RGBA. Раньше здесь передавался iconMat.clone() напрямую.
    if (channels === 4) {
      window.cv.cvtColor(iconMat, srcBgr, window.cv.COLOR_RGBA2BGR);
    } else if (channels === 3) {
      safeDeleteAll(srcBgr);
      srcBgr = iconMat.clone();
    } else {
      throw new Error(`неподдерживаемое число каналов у iconMat: ${channels} (ожидалось 3 или 4)`);
    }

    gcMask = window.cv.Mat.zeros(H, W, window.cv.CV_8U) as CvMat;
    bgdModel = new window.cv.Mat() as CvMat;
    fgdModel = new window.cv.Mat() as CvMat;

    const rect = new window.cv.Rect(MARGIN, MARGIN, W - MARGIN * 2, H - MARGIN * 2);
    window.cv.grabCut(srcBgr, gcMask, rect, bgdModel, fgdModel, 5, window.cv.GC_INIT_WITH_RECT);

    // GC_BGD=0, GC_PR_BGD=2 → фон; GC_FGD=1, GC_PR_FGD=3 → объект
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        const v = gcMask.ucharAt(i, j);
        gcMask.ucharPtr(i, j)[0] =
          v === window.cv.GC_BGD || v === window.cv.GC_PR_BGD ? 0 : 1;
      }
    }

    finalResult = new window.cv.Mat() as CvMat;
    iconMat.copyTo(finalResult, gcMask); // берём ОРИГИНАЛ (RGBA, с прозрачностью), не srcBgr

    ocrLog.info('bg-removal', `GrabCut успешно применён (${W}×${H}, ${channels} → 3 канала)`);
    const toReturn = finalResult;
    finalResult = null; // Prevent `finally` from deleting the returned Mat
    return toReturn;
  } catch (e) {
    ocrLog.warn('bg-removal', 'GrabCut не сработал, возвращаем иконку без удаления фона', { error: String(e) });
    return iconMat.clone(); // fallback — возвращаем как есть
  } finally {
    safeDeleteAll(srcBgr, gcMask, bgdModel, fgdModel, finalResult);
  }
};
