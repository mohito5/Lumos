// ============================================================================
// mat-utils.ts — безопасная работа с cv.Mat
// ============================================================================

import type { CvMat } from '../../types/inventory.types';
import { ocrLog } from './ocr-logger';

/**
 * Бинаризация серого изображения с автоопределением полярности текста.
 *
 * НАХОДКА (проверено на реальных скриншотах): у разных редкостей материалов
 * разная полярность — где-то светлый текст на тёмном фоне, где-то наоборот.
 * Жёстко фиксированное направление (THRESH_BINARY_INV) давало перевёрнутый
 * результат для части случаев. Считаем Otsu без форсирования направления,
 * затем проверяем: фон (большинство пикселей) должен стать белым — если
 * нет, инвертируем.
 *
 * Возвращает: чёрный текст (0) на белом фоне (255) — стандарт для OCR/
 * сравнения с шаблонами.
 */
export const binarizeAutoPolarity = (gray: CvMat): CvMat => {
  const binary = new window.cv.Mat() as CvMat;
  window.cv.threshold(gray, binary, 0, 255, window.cv.THRESH_BINARY | window.cv.THRESH_OTSU);
  const whiteRatio = window.cv.mean(binary)[0] / 255;
  if (whiteRatio < 0.5) {
    window.cv.bitwise_not(binary, binary);
  }
  return binary;
};

/**
 * Безопасно удаляет Mat из памяти WASM.
 * Не бросает исключение если Mat уже удалён.
 */
export const safeDelete = (mat: CvMat | null | undefined): void => {
  try {
    if (mat && !mat.isDeleted()) mat.delete();
  } catch {
    // уже удалён или некорректный
  }
};

/**
 * Удаляет несколько Mat за раз.
 * Удобно для finally-блоков: safeDeleteAll(a, b, c)
 */
export const safeDeleteAll = (...mats: Array<CvMat | null | undefined>): void => {
  mats.forEach(safeDelete);
};

/**
 * Загружает HTMLImageElement в cv.Mat.
 * Ждёт загрузки картинки если она ещё не загрузилась.
 */
export const loadImageToMat = (imgElement: HTMLImageElement): Promise<CvMat> =>
  new Promise((resolve, reject) => {
    const tryResolve = () => {
      try {
        const mat = window.cv.imread(imgElement);
        if (mat && !mat.empty()) resolve(mat);
        else reject(new Error('Mat is empty after imread'));
      } catch (e) {
        reject(e);
      }
    };

    if (imgElement.complete && imgElement.naturalWidth > 0) {
      tryResolve();
    } else {
      imgElement.onload = tryResolve;
      imgElement.onerror = () => {
        // Частая причина: 404 (файл не существует по этому пути в public/)
        // либо CORS (для loadUrlToMat с внешним URL).
        ocrLog.error('image-load', `не удалось загрузить изображение: ${imgElement.src}`);
        reject(new Error(`Image failed to load: ${imgElement.src}`));
      };
    }
  });

/**
 * Загружает картинку по URL в cv.Mat через временный HTMLImageElement.
 */
export const loadUrlToMat = (url: string): Promise<CvMat> => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = url;
  return loadImageToMat(img);
};
