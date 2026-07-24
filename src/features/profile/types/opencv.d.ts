// ============================================================================
// opencv.d.ts — типы для window.cv (OpenCV.js)
// Содержит декларации ВСЕГО что реально используется в проекте.
// ============================================================================

import type { CvMat, CvRect, CvSize, CvScalar, CvMatVector } from '../types/inventory.types';

declare global {
  interface Window {
    cv: OpenCvInstance;
  }
}

interface OpenCvInstance {
  // ── Конструкторы ────────────────────────────────────────────────────────
  Mat: {
    new (): CvMat;
    zeros(rows: number, cols: number, type: number): CvMat;
    ones(rows: number, cols: number, type: number): CvMat;
  };
  MatVector: { new (): CvMatVector };
  Rect:   { new (x: number, y: number, w: number, h: number): CvRect };
  Size:   { new (width: number, height: number): CvSize };
  Scalar: { new (v0: number, v1?: number, v2?: number, v3?: number): CvScalar };

  // ── Ввод / вывод ────────────────────────────────────────────────────────
  imread(element: HTMLImageElement | HTMLCanvasElement): CvMat;
  imshow(canvas: HTMLCanvasElement, mat: CvMat): void;

  // ── Цветовые преобразования ─────────────────────────────────────────────
  cvtColor(src: CvMat, dst: CvMat, code: number, dstCn?: number): void;
  split(src: CvMat, mv: CvMatVector): void;

  // ── Фильтрация ───────────────────────────────────────────────────────────
  GaussianBlur(src: CvMat, dst: CvMat, ksize: CvSize, sigmaX: number,
               sigmaY?: number, borderType?: number): void;

  // ── Геометрия ────────────────────────────────────────────────────────────
  resize(src: CvMat, dst: CvMat, dsize: CvSize,
         fx?: number, fy?: number, interpolation?: number): void;
  copyMakeBorder(src: CvMat, dst: CvMat,
                 top: number, bottom: number, left: number, right: number,
                 borderType: number, value?: CvScalar): void;

  // ── Пороговые операции ───────────────────────────────────────────────────
  threshold(src: CvMat, dst: CvMat, thresh: number, maxval: number, type: number): number;
  adaptiveThreshold(src: CvMat, dst: CvMat, maxValue: number,
                    adaptiveMethod: number, thresholdType: number,
                    blockSize: number, C: number): void;

  // ── Морфология ───────────────────────────────────────────────────────────
  morphologyEx(src: CvMat, dst: CvMat, op: number, kernel: CvMat,
               anchor?: CvPoint, iterations?: number,
               borderType?: number, borderValue?: CvScalar): void;
  dilate(src: CvMat, dst: CvMat, kernel: CvMat,
         anchor?: CvPoint, iterations?: number,
         borderType?: number, borderValue?: CvScalar): void;
  erode(src: CvMat, dst: CvMat, kernel: CvMat,
        anchor?: CvPoint, iterations?: number,
        borderType?: number, borderValue?: CvScalar): void;

  // ── Детектирование краёв и контуров ─────────────────────────────────────
  Canny(image: CvMat, edges: CvMat, threshold1: number, threshold2: number,
        apertureSize?: number, L2gradient?: boolean): void;
  findContours(image: CvMat, contours: CvMatVector, hierarchy: CvMat,
               mode: number, method: number): void;
  contourArea(contour: CvMat, oriented?: boolean): number;
  boundingRect(points: CvMat): CvRect;
  drawContours(image: CvMat, contours: CvMatVector, contourIdx: number,
               color: CvScalar, thickness?: number): void;

  // ── Маски и логика ───────────────────────────────────────────────────────
  inRange(src: CvMat, lowerb: CvScalar, upperb: CvScalar, dst: CvMat): void;
  bitwise_not(src: CvMat, dst: CvMat, mask?: CvMat): void;
  bitwise_and(src1: CvMat, src2: CvMat, dst: CvMat, mask?: CvMat): void;

  // ── Статистика ───────────────────────────────────────────────────────────
  mean(src: CvMat, mask?: CvMat): CvScalar;

  // ── Template matching ────────────────────────────────────────────────────
  matchTemplate(image: CvMat, templ: CvMat, result: CvMat,
                method: number, mask?: CvMat): void;
  minMaxLoc(src: CvMat, mask?: CvMat): {
    minVal: number; maxVal: number;
    minLoc: CvPoint; maxLoc: CvPoint;
  };

  // ── GrabCut ──────────────────────────────────────────────────────────────
  grabCut(img: CvMat, mask: CvMat, rect: CvRect,
          bgdModel: CvMat, fgdModel: CvMat,
          iterCount: number, mode: number): void;

  // ══ Константы ════════════════════════════════════════════════════════════

  // Типы Mat
  CV_8U:   number;
  CV_8UC1: number;
  CV_8UC3: number;
  CV_8UC4: number;
  CV_32F:  number;

  // Цветовые конвертации
  COLOR_RGBA2GRAY: number;
  COLOR_RGBA2BGR:  number;
  COLOR_BGR2GRAY:  number;
  COLOR_GRAY2BGR:  number;
  COLOR_BGR2HSV:   number;
  COLOR_RGB2HSV:   number;

  // Пороговые операции
  THRESH_BINARY:     number;
  THRESH_BINARY_INV: number;
  THRESH_OTSU:       number;

  // Морфология — операции
  MORPH_ERODE:  number;
  MORPH_DILATE: number;
  MORPH_OPEN:   number;
  MORPH_CLOSE:  number;
  // Морфология — форма ядра
  MORPH_RECT:    number;
  MORPH_ELLIPSE: number;

  // Контуры — режим поиска
  RETR_EXTERNAL: number;
  RETR_LIST:     number;
  RETR_TREE:     number;
  // Контуры — аппроксимация
  CHAIN_APPROX_NONE:   number;
  CHAIN_APPROX_SIMPLE: number;

  // Границы
  BORDER_DEFAULT:  number;
  BORDER_CONSTANT: number;
  BORDER_REFLECT:  number;

  // Интерполяция
  INTER_NEAREST:  number;
  INTER_LINEAR:   number;
  INTER_CUBIC:    number;
  INTER_AREA:     number;

  // Template matching
  TM_CCOEFF_NORMED: number;
  TM_SQDIFF_NORMED: number;

  // GrabCut
  GC_INIT_WITH_RECT: number;
  GC_BGD:            number;
  GC_PR_BGD:         number;
  GC_FGD:            number;
  GC_PR_FGD:         number;
}

interface CvPoint { x: number; y: number; }

export {};