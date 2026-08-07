// ============================================================================
// fakeCv.ts — минимальный, но семантически честный фейк OpenCV.js для тестов.
//
// ЗАЧЕМ ОТДЕЛЬНЫЙ ФЕЙК, А НЕ vi.mock() КАЖДОЙ ФУНКЦИИ: digit-matching.ts и
// auto-detection.ts не просто ВЫЗЫВАЮТ cv — их правильность (сегментация
// глифов, NCC score, кластеризация) ЗАВИСИТ от того, что cv реально делает
// с пикселями. Замокать cv.findContours/matchTemplate заглушками означало бы
// протестировать не логику проекта, а сами моки. Поэтому ниже — честная,
// пусть и упрощённая, пиксельная реализация: connected components вместо
// настоящего findContours, реальная нормированная кросс-корреляция вместо
// заглушки score, реальный Otsu вместо фиксированного порога.
//
// НЕ реализовано (и не нужно для digit-matching/auto-detection/process-cell):
// GaussianBlur, Canny, grabCut — они нужны другим модулям (background-removal,
// auto-detection'овский препроцессинг), которые в тестах либо не участвуют,
// либо мокаются на уровне модуля (см. processCell.test.ts).
// ============================================================================

export class FakeMat {
  rows: number;
  cols: number;
  private _channels: number;
  data: Float64Array;
  private _deleted = false;

  constructor(rows: number, cols: number, channels = 1, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this._channels = channels;
    this.data = new Float64Array(rows * cols * channels).fill(fill);
  }

  channels(): number {
    return this._channels;
  }

  isDeleted(): boolean {
    return this._deleted;
  }

  delete(): void {
    this._deleted = true;
  }

  empty(): boolean {
    return this.rows === 0 || this.cols === 0;
  }

  clone(): FakeMat {
    const out = new FakeMat(this.rows, this.cols, this._channels);
    out.data.set(this.data);
    return out;
  }

  roi(rect: { x: number; y: number; width: number; height: number }): FakeMat {
    const out = new FakeMat(rect.height, rect.width, this._channels);
    for (let y = 0; y < rect.height; y++) {
      for (let x = 0; x < rect.width; x++) {
        for (let c = 0; c < this._channels; c++) {
          out.data[(y * rect.width + x) * this._channels + c] =
            this.data[((rect.y + y) * this.cols + (rect.x + x)) * this._channels + c];
        }
      }
    }
    return out;
  }

  ucharAt(row: number, col: number): number {
    return this.data[(row * this.cols + col) * this._channels];
  }

  ucharPtr(row: number, col: number): Float64Array {
    const i = (row * this.cols + col) * this._channels;
    return this.data.subarray(i, i + this._channels) as Float64Array;
  }

  copyTo(dst: FakeMat): void {
    dst._assign(this.rows, this.cols, this._channels, this.data.slice());
  }

  /** Внутренний хелпер фейка: мутирует Mat "на месте" (как это делает
   * настоящий cv, когда dst передан заранее созданным пустым Mat). */
  _assign(rows: number, cols: number, channels: number, data: Float64Array): void {
    this.rows = rows;
    this.cols = cols;
    this._channels = channels;
    this.data = data;
  }

  /** Тестовый хелпер (не часть настоящего cv.Mat): задать пиксель. */
  set(row: number, col: number, values: number[]): void {
    const i = (row * this.cols + col) * this._channels;
    for (let c = 0; c < this._channels; c++) this.data[i + c] = values[c] ?? 0;
  }

  /** Тестовый хелпер: залить Mat из плоского 0/255-массива (1 канал). */
  static fromBinary(rows: number, cols: number, values: number[]): FakeMat {
    const m = new FakeMat(rows, cols, 1);
    m.data.set(values);
    return m;
  }
}

class FakeMatVector {
  private items: FakeMat[] = [];
  push(m: FakeMat) {
    this.items.push(m);
  }
  get(i: number): FakeMat {
    return this.items[i];
  }
  size(): number {
    return this.items.length;
  }
  delete(): void {
    this.items = [];
  }
  isDeleted(): boolean {
    return false;
  }
}

// ── connected components (замена findContours для наших целей) ───────────
// Реальный findContours возвращает контуры, у которых потом берут
// contourArea/boundingRect. Нам не нужна геометрия контура как полигона —
// оба места использования в проекте (digit-matching.ts, auto-detection.ts)
// используют area/boundingRect только как прокси для "размер связной
// области", так что 4-connectivity flood fill даёт эквивалентный результат
// для тестовых целей.
interface Blob {
  pixels: Array<[number, number]>;
  x: number;
  y: number;
  width: number;
  height: number;
}

function findBlobs(mat: FakeMat, isForeground: (v: number) => boolean): Blob[] {
  const { rows, cols } = mat;
  const visited = new Uint8Array(rows * cols);
  const blobs: Blob[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const idx = y * cols + x;
      if (visited[idx] || !isForeground(mat.ucharAt(y, x))) continue;

      const pixels: Array<[number, number]> = [];
      const stack: Array<[number, number]> = [[y, x]];
      visited[idx] = 1;
      let minX = x, maxX = x, minY = y, maxY = y;

      while (stack.length > 0) {
        const [cy, cx] = stack.pop()!;
        pixels.push([cy, cx]);
        minX = Math.min(minX, cx); maxX = Math.max(maxX, cx);
        minY = Math.min(minY, cy); maxY = Math.max(maxY, cy);

        // 8-связность (не 4): реальный findContours у OpenCV трассирует
        // границы так, что тонкие диагональные штрихи мелкого пиксельного
        // шрифта остаются ОДНИМ контуром — 4-связный flood fill вместо
        // этого рвёт глиф на несколько мелких блобов на каждом диагональном
        // переходе (проверено на собственных тестовых битмапах ниже).
        const neighbors = [
          [cy - 1, cx], [cy + 1, cx], [cy, cx - 1], [cy, cx + 1],
          [cy - 1, cx - 1], [cy - 1, cx + 1], [cy + 1, cx - 1], [cy + 1, cx + 1],
        ];
        for (const [ny, nx] of neighbors) {
          if (ny < 0 || ny >= rows || nx < 0 || nx >= cols) continue;
          const nIdx = ny * cols + nx;
          if (visited[nIdx] || !isForeground(mat.ucharAt(ny, nx))) continue;
          visited[nIdx] = 1;
          stack.push([ny, nx]);
        }
      }

      blobs.push({ pixels, x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 });
    }
  }

  return blobs;
}

// contourArea/boundingRect в реальном cv принимают "контур" (обычно Mat из
// findContours). Здесь наш "контур" — это сам объект Blob, приведённый к
// форме, достаточной для contourArea/boundingRect ниже (см. FakeContour).
class FakeContour {
  constructor(public blob: Blob) {}
}

// ── нормированная кросс-корреляция (TM_CCOEFF_NORMED) ────────────────────
// Шаблон в проекте всегда ресайзится под точный размер глифа перед
// matchTemplate (см. digit-matching.ts: `cv.resize(tmpl, resized, new
// Size(gw, gh))`), поэтому валидная область корреляции — единственная
// позиция (0,0), и TM_CCOEFF_NORMED вырождается в обычный коэффициент
// корреляции Пирсона между двумя изображениями как векторами.
function pearsonCorrelation(a: Float64Array, b: Float64Array): number {
  const n = a.length;
  if (n === 0) return 0;
  let meanA = 0, meanB = 0;
  for (let i = 0; i < n; i++) { meanA += a[i]; meanB += b[i]; }
  meanA /= n; meanB /= n;

  let num = 0, denA = 0, denB = 0;
  for (let i = 0; i < n; i++) {
    const da = a[i] - meanA;
    const db = b[i] - meanB;
    num += da * db;
    denA += da * da;
    denB += db * db;
  }
  const den = Math.sqrt(denA * denB);
  return den === 0 ? (num === 0 ? 1 : 0) : num / den;
}

// ── Otsu (для binarizeAutoPolarity) ───────────────────────────────────────
function otsuThreshold(mat: FakeMat): number {
  const hist = new Array(256).fill(0);
  const total = mat.rows * mat.cols;
  for (let i = 0; i < total; i++) {
    const v = Math.max(0, Math.min(255, Math.round(mat.data[i])));
    hist[v]++;
  }
  let sum = 0;
  for (let t = 0; t < 256; t++) sum += t * hist[t];

  let sumB = 0, wB = 0, maxVar = -1, threshold = 0;
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (wB === 0) continue;
    const wF = total - wB;
    if (wF === 0) break;
    sumB += t * hist[t];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const between = wB * wF * (mB - mF) * (mB - mF);
    if (between > maxVar) {
      maxVar = between;
      threshold = t;
    }
  }
  return threshold;
}

export const THRESH_BINARY = 0;
export const THRESH_OTSU = 8;
export const RETR_EXTERNAL = 0;
export const CHAIN_APPROX_SIMPLE = 1;
export const COLOR_RGBA2GRAY = 1;
export const COLOR_RGBA2BGR = 2;
export const COLOR_BGR2HSV = 3;
export const TM_CCOEFF_NORMED = 5;

export function createFakeCv() {
  return {
    Mat: Object.assign(
      function (this: unknown) {
        return new FakeMat(0, 0, 1);
      },
      {
        ones: (rows: number, cols: number) => new FakeMat(rows, cols, 1, 1),
        zeros: (rows: number, cols: number) => new FakeMat(rows, cols, 1, 0),
      },
    ),
    MatVector: FakeMatVector,
    Rect: function (x: number, y: number, width: number, height: number) {
      return { x, y, width, height };
    },
    Size: function (width: number, height: number) {
      return { width, height };
    },

    THRESH_BINARY,
    THRESH_OTSU,
    RETR_EXTERNAL,
    CHAIN_APPROX_SIMPLE,
    COLOR_RGBA2GRAY,
    COLOR_RGBA2BGR,
    COLOR_BGR2HSV,
    TM_CCOEFF_NORMED,

    cvtColor(src: FakeMat, dst: FakeMat, code: number): void {
      const n = src.rows * src.cols;

      if (code === COLOR_RGBA2GRAY) {
        const inCh = src.channels();
        const out = new Float64Array(n);
        for (let i = 0; i < n; i++) {
          const base = i * inCh;
          const r = src.data[base] ?? 0;
          const g = src.data[base + 1] ?? r;
          const b = src.data[base + 2] ?? r;
          out[i] = 0.299 * r + 0.587 * g + 0.114 * b;
        }
        dst._assign(src.rows, src.cols, 1, out);
        return;
      }

      if (code === COLOR_RGBA2BGR) {
        // RGBA → BGR: тот же канальный своп, что делает настоящий cv —
        // нужен goldPixelFraction (auto-detection.ts), которая идёт именно
        // через RGBA2BGR → BGR2HSV, а не напрямую RGB2HSV.
        const out = new Float64Array(n * 3);
        for (let i = 0; i < n; i++) {
          const r = src.data[i * 4];
          const g = src.data[i * 4 + 1];
          const b = src.data[i * 4 + 2];
          out[i * 3] = b; out[i * 3 + 1] = g; out[i * 3 + 2] = r;
        }
        dst._assign(src.rows, src.cols, 3, out);
        return;
      }

      if (code === COLOR_BGR2HSV) {
        // Формулы стандартные; H приведён к диапазону OpenCV (0-179, т.е.
        // реальный_hue/2), S/V — к 0-255, как и ожидает goldPixelFraction.
        const out = new Float64Array(n * 3);
        for (let i = 0; i < n; i++) {
          const b = src.data[i * 3] / 255;
          const g = src.data[i * 3 + 1] / 255;
          const r = src.data[i * 3 + 2] / 255;
          const max = Math.max(r, g, b), min = Math.min(r, g, b);
          const delta = max - min;
          let h = 0;
          if (delta > 0) {
            if (max === r) h = 60 * (((g - b) / delta) % 6);
            else if (max === g) h = 60 * ((b - r) / delta + 2);
            else h = 60 * ((r - g) / delta + 4);
            if (h < 0) h += 360;
          }
          out[i * 3] = h / 2;
          out[i * 3 + 1] = max === 0 ? 0 : (delta / max) * 255;
          out[i * 3 + 2] = max * 255;
        }
        dst._assign(src.rows, src.cols, 3, out);
        return;
      }

      dst._assign(src.rows, src.cols, src.channels(), src.data.slice());
    },

    bitwise_not(src: FakeMat, dst: FakeMat): void {
      const out = new Float64Array(src.data.length);
      for (let i = 0; i < src.data.length; i++) out[i] = 255 - src.data[i];
      dst._assign(src.rows, src.cols, src.channels(), out);
    },

    threshold(src: FakeMat, dst: FakeMat, thresh: number, maxval: number, type: number): number {
      const useOtsu = (type & THRESH_OTSU) === THRESH_OTSU;
      const t = useOtsu ? otsuThreshold(src) : thresh;
      const out = new Float64Array(src.data.length);
      for (let i = 0; i < src.data.length; i++) out[i] = src.data[i] > t ? maxval : 0;
      dst._assign(src.rows, src.cols, src.channels(), out);
      return t;
    },

    mean(src: FakeMat): number[] {
      const ch = src.channels();
      const sums = new Array(ch).fill(0);
      const count = src.rows * src.cols;
      for (let i = 0; i < count; i++) {
        for (let c = 0; c < ch; c++) sums[c] += src.data[i * ch + c];
      }
      return sums.map((s) => (count > 0 ? s / count : 0));
    },

    findContours(image: FakeMat, contours: FakeMatVector): void {
      // Реальный код инвертирует ДО вызова (см. digit-matching.ts) и ищет
      // светлые объекты на тёмном — значит foreground здесь: value > 127.
      const blobs = findBlobs(image, (v) => v > 127);
      for (const blob of blobs) {
        contours.push(new FakeContour(blob) as unknown as FakeMat);
      }
    },

    contourArea(contour: unknown): number {
      return (contour as FakeContour).blob.pixels.length;
    },

    boundingRect(contour: unknown): { x: number; y: number; width: number; height: number } {
      const b = (contour as FakeContour).blob;
      return { x: b.x, y: b.y, width: b.width, height: b.height };
    },

    resize(src: FakeMat, dst: FakeMat, dsize: { width: number; height: number }): void {
      const out = new FakeMat(dsize.height, dsize.width, src.channels());
      for (let y = 0; y < dsize.height; y++) {
        const sy = Math.min(src.rows - 1, Math.floor((y * src.rows) / dsize.height));
        for (let x = 0; x < dsize.width; x++) {
          const sx = Math.min(src.cols - 1, Math.floor((x * src.cols) / dsize.width));
          for (let c = 0; c < src.channels(); c++) {
            out.data[(y * dsize.width + x) * src.channels() + c] = src.ucharPtr(sy, sx)[c];
          }
        }
      }
      dst._assign(out.rows, out.cols, out.channels(), out.data);
    },

    matchTemplate(image: FakeMat, templ: FakeMat, result: FakeMat): void {
      // Валидна ровно 1 позиция (image и templ одного размера — см. комментарий
      // у pearsonCorrelation выше), поэтому result — Mat 1x1.
      const score = pearsonCorrelation(image.data, templ.data);
      result._assign(1, 1, 1, new Float64Array([score]));
    },

    minMaxLoc(src: FakeMat): { minVal: number; maxVal: number; minLoc: { x: number; y: number }; maxLoc: { x: number; y: number } } {
      let minVal = Infinity, maxVal = -Infinity;
      for (let i = 0; i < src.data.length; i++) {
        minVal = Math.min(minVal, src.data[i]);
        maxVal = Math.max(maxVal, src.data[i]);
      }
      return { minVal, maxVal, minLoc: { x: 0, y: 0 }, maxLoc: { x: 0, y: 0 } };
    },
  };
}
