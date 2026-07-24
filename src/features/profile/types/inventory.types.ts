// ============================================================================
// inventory.types.ts — типы для инвентаря материалов и OCR-пайплайна
//
// ИСТОРИЯ: раньше здесь были типы под старую архитектуру OCR (ручная сетка
// GridConfig с x1/y1/x2/y2, воркер с выбором движка google-vision/tesseract,
// OcrResult с rect/distance/isExactMatch). Та архитектура была заменена на
// текущий "упрощённый флоу" (см. комментарий в OcrImportModal.jsx), сами
// типы использовались только друг другом и нигде в реальном коде — удалены.
// Взамен добавлены типы, которые реальный код по факту импортировал, но
// которых здесь не было (OcrProgress, TemplateCache, MatchScore,
// GridDetectionMethod) — из-за этого IDE и tsc не видели половину пайплайна.
// ============================================================================

/** Прямоугольник ячейки (слота) в пикселях на исходном скриншоте. */
export interface SlotRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Состояние инвентаря: materialId → количество. */
export type InventoryState = Record<string, number>;

/** Материал из data/materials. */
export interface MaterialItem {
  id: string;
  icon: string;
  rarity: number;
  type: string;
  element?: string;
  group?: string | string[];
  farmDays?: string[];
  region?: string;
  tier?: string;
}

/** Фильтры для списка материалов. */
export interface FilterState {
  category?: string[];
  rarity?: string[];
  type?: string[];
}

// ── OCR-пайплайн ────────────────────────────────────────────────────────────

export type CvLoadingStatus = 'unloaded' | 'loading' | 'ready' | 'error';

/**
 * Каким способом была построена сетка ячеек для текущего скана.
 *   auto     — настоящая CV-детекция контуров (autoDetectContainers)
 *   single   — найден один контейнер крупным планом (detectSingleContainer)
 *   manual   — использована сохранённая ручная калибровка (calibration.ts)
 *   fallback — примерная сетка 8×5 под типичный скриншот инвентаря
 *   none     — ни один из способов ничего не нашёл
 */
export type GridDetectionMethod = 'auto' | 'single' | 'manual' | 'fallback' | 'none';

/** Прогресс сканирования, отображаемый в модалке. */
export interface OcrProgress {
  progress: number;
  status: string;
}

/** Результат распознавания числа количества на одной ячейке (Tesseract). */
export interface OcrResult {
  /** Сырой текст, который вернул Tesseract (после очистки от пробелов) */
  text: string;
  /** Распознанное количество */
  quantity: number;
  /** Уверенность Tesseract в распознавании, 0–100 */
  confidence: number;
}

/** Один закэшированный шаблон материала для сравнения иконок. */
export interface CachedTemplate {
  /** Шаблон в градациях серого — для matchTemplate (форма) */
  grayTemplate: CvMat;
  /** Alpha-канал исходного PNG — маска, чтобы не сравнивать прозрачный фон */
  mask: CvMat;
  /** Цветовая гистограмма шаблона (по Hue) — для сравнения цвета */
  colorHist: Float32Array;
  size: { width: number; height: number };
}

/** Кэш шаблонов всех материалов: materialId → CachedTemplate. */
export type TemplateCache = Record<string, CachedTemplate>;

/**
 * Шаблоны символов для распознавания количества (0-9, k, K, .).
 * Несколько образцов на символ — усредняем/берём лучший по всем, чтобы
 * не зависеть от шума конкретного скриншота/редкости.
 */
export type DigitTemplateCache = Record<string, CvMat[]>;

/** Один сегментированный символ внутри полосы с числом. */
export interface DigitGlyph {
  rect: SlotRect;
  mat: CvMat;
}

/** Промежуточный скор сравнения иконки ячейки с одним шаблоном. */
export interface MatchScore {
  id: string;
  /** Скор формы (TM_CCOEFF_NORMED), диапазон [-1, 1], идеал = 1 */
  shape: number;
  /** Скор цвета (косинусное сходство гистограмм), диапазон [0, 1] */
  color: number;
  /** Взвешенная сумма shape*SHAPE_WEIGHT + color*COLOR_WEIGHT */
  total: number;
}

/**
 * Ручная калибровка сетки пользователем (fallback при неудаче авто-детекции).
 * screenW/screenH нужны для проверки совместимости при загрузке из localStorage.
 */
export interface GridCalibration {
  /** Разрешение при сохранении */
  screenW: number;
  screenH: number;
  startX: number;
  startY: number;
  slotW: number;
  slotH: number;
  rows: number;
  cols: number;
}

// ── Минимальные типы cv.Mat, чтобы не писать any везде ───────────────────────

export interface CvMat {
  rows: number;
  cols: number;
  empty(): boolean;
  isDeleted(): boolean;
  delete(): void;
  clone(): CvMat;
  roi(rect: CvRect): CvMat;
  ucharAt(row: number, col: number): number;
  ucharPtr(row: number, col: number): Uint8Array;
  copyTo(dst: CvMat, mask?: CvMat): void;
  channels(): number;
}

export interface CvRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CvSize {
  width: number;
  height: number;
}

export interface CvScalar extends Array<number> {}

export interface CvMatVector {
  get(index: number): CvMat;
  size(): number;
  delete(): void;
  isDeleted(): boolean;
}
