// ============================================================================
// histogram.ts — цветовая гистограмма для сравнения иконок
// ============================================================================

import type { CvMat, CvMatVector } from '../../types/inventory.types';
import { safeDeleteAll } from './mat-utils';
import { ocrLog } from './ocr-logger';

/**
 * Было 8 (22.5° на бин) — по логам реальных сканов основная масса
 * "неуверенных" совпадений приходится на материалы из семейств с почти
 * идентичной формой (книги талантов, элементальные кристаллы одного тира):
 * там 75%-й вес формы в скоринге (см. SHAPE_WEIGHT в template-matching.ts)
 * почти не даёт информации, и всё держится на цвете. 8 бинов слишком грубо
 * разделяли близкие оттенки палитры игры. 16 (11.25° на бин) — вдвое точнее,
 * без риска переусложнения (JPEG-артефакты сжатия скриншотов Telegram на
 * таком шаге всё ещё сглаживаются, в отличие от совсем мелких бинов вроде 32).
 * Миграции не нужно: гистограммы шаблонов считаются ЭТОЙ ЖЕ функцией при
 * каждой загрузке (loadTemplates → getColorHistogram), не хранятся отдельно —
 * значение здесь одинаково применяется и к шаблонам, и к живому скану.
 */
const BINS = 16;

/**
 * Вычисляет нормализованную HSV-гистограмму по каналу Hue.
 * Пропускает прозрачные (alpha=0), почти чёрные и почти белые пиксели —
 * они не несут информации о цвете объекта.
 */
export const getColorHistogram = (mat: CvMat): Float32Array => {
  const bins = new Float32Array(BINS).fill(0);
  if (!mat || mat.isDeleted() || mat.empty()) return bins;

  let hsv: CvMat | null = null;
  let ch: CvMatVector | null = null;
  let hCh: CvMat | null = null;
  let sCh: CvMat | null = null;
  let vCh: CvMat | null = null;
  let bgr: CvMat | null = null;

  try {
    hsv = new window.cv.Mat();
    bgr = new window.cv.Mat();
    ch = new window.cv.MatVector();

    // COLOR_RGBA2HSV отсутствует в OpenCV.js → RGBA→BGR→HSV
    window.cv.cvtColor(mat, bgr, window.cv.COLOR_RGBA2BGR);
    window.cv.cvtColor(bgr, hsv, window.cv.COLOR_BGR2HSV);
    window.cv.split(hsv, ch);

    hCh = ch.get(0);
    sCh = ch.get(1);
    vCh = ch.get(2);

    let total = 0;
    for (let y = 0; y < mat.rows; y++) {
      for (let x = 0; x < mat.cols; x++) {
        // пропускаем прозрачные пиксели
        if (mat.ucharPtr(y, x)[3] === 0) continue;

        const v = vCh.ucharAt(y, x);
        const s = sCh.ucharAt(y, x);

        // пропускаем почти чёрные (V<30) и почти белые (S<25 && V>230)
        if (v < 30 || (s < 25 && v > 230)) continue;

        const hueIndex = Math.min(Math.floor(hCh.ucharAt(y, x) / 22.5), BINS - 1);
        bins[hueIndex]++;
        total++;
      }
    }

    // нормализуем в [0..1]
    if (total > 0) {
      for (let i = 0; i < BINS; i++) bins[i] /= total;
    }

    return bins;
  } catch (e) {
    ocrLog.warn('histogram', 'ошибка вычисления гистограммы', { error: String(e) });
    return bins;
  } finally {
    safeDeleteAll(hsv, bgr, hCh, sCh, vCh);
    if (ch && !ch.isDeleted()) ch.delete();
  }
};

/**
 * Косинусное сходство двух гистограмм.
 * Возвращает 0..1, где 1 = идентичное распределение цветов.
 */
export const compareHistograms = (h1: Float32Array, h2: Float32Array): number => {
  if (!h1 || !h2 || h1.length !== h2.length) return 0;

  let dot = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < h1.length; i++) {
    dot += h1[i] * h2[i];
    norm1 += h1[i] ** 2;
    norm2 += h2[i] ** 2;
  }

  const denom = Math.sqrt(norm1) * Math.sqrt(norm2);
  return denom === 0 ? 0 : dot / denom;
};