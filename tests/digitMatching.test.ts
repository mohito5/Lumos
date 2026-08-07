import { describe, it, expect, beforeEach } from 'vitest';
import { createFakeCv, FakeMat } from './helpers/fakeCv';
import {
  segmentGlyphs,
  extractGlyph,
  matchGlyph,
  recognizeQuantityByTemplate,
} from '../src/features/profile/utils/opencv/digit-matching';
import type { DigitTemplateCache } from '../src/features/profile/types/inventory.types';

// ============================================================================
// Синтетические битмапы символов (0 = чёрный текст, 255 = белый фон — та же
// полярность, что возвращает binarizeAutoPolarity). Специально нарисованы
// достаточно разными по силуэту, чтобы нормированная кросс-корреляция между
// РАЗНЫМИ символами была заведомо ниже MIN_GLYPH_SCORE (0.45), а с самим собой
// (или тем же символом другого начертания) — заведомо выше.
//
// Высота (9px) выбрана НАМЕРЕННО выше MIN_GLYPH_HEIGHT (5) — как у реальных
// цифр в узкой полосе с числом. Точка ('.') ниже нарисована отдельно, именно
// такого маленького размера, какой она имеет в реальном шрифте относительно
// цифры — см. тест "точка ... отфильтровывается" ниже.
// ============================================================================
const GLYPH_BITMAPS: Record<string, string[]> = {
  '1': [
    '..#..',
    '.##..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '.###.',
  ],
  '2': [
    '.###.',
    '#...#',
    '....#',
    '...#.',
    '..#..',
    '.#...',
    '#....',
    '#....',
    '#####',
  ],
  '5': [
    '#####',
    '#....',
    '#....',
    '####.',
    '....#',
    '....#',
    '....#',
    '#...#',
    '.###.',
  ],
  '8': [
    '.###.',
    '#...#',
    '#...#',
    '.###.',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '.###.',
  ],
  k: [
    '#....',
    '#..#.',
    '#.#..',
    '##...',
    '#.#..',
    '#..#.',
    '#..#.',
    '#...#',
    '#....',
  ],
};

// Точка — 2×2 чёрных пикселя у самого низа полосы (baseline), как в реальном
// мелком шрифте: физически намного мельче любой цифры.
const DOT_BITMAP = ['##', '##'];

/** Рисует битмап ('#'/'.') в 1-канальный Float64Array строки заданной ширины. */
function paintGlyph(
  target: Float64Array,
  stripCols: number,
  bitmap: string[],
  top: number,
  left: number,
): void {
  for (let y = 0; y < bitmap.length; y++) {
    const row = bitmap[y];
    for (let x = 0; x < row.length; x++) {
      const value = row[x] === '#' ? 0 : 255;
      target[(top + y) * stripCols + (left + x)] = value;
    }
  }
}

/** Собирает полосу (1-канальный бинарный Mat) из нескольких глифов подряд, с зазором gap px. */
function buildStrip(glyphs: string[][], opts: { height?: number; gap?: number; padTop?: number } = {}): FakeMat {
  const height = opts.height ?? 12;
  const gap = opts.gap ?? 3;
  const padTop = opts.padTop ?? 1;
  const width = glyphs.reduce((sum, g) => sum + (g[0]?.length ?? 0) + gap, gap);

  const data = new Float64Array(height * width).fill(255);
  let cursor = gap;
  for (const bitmap of glyphs) {
    paintGlyph(data, width, bitmap, padTop, cursor);
    cursor += (bitmap[0]?.length ?? 0) + gap;
  }
  return FakeMat.fromBinary(height, width, Array.from(data));
}

/**
 * Строит DigitTemplateCache из наших GLYPH_BITMAPS (по одному образцу на
 * символ, если не указано иное).
 *
 * ВАЖНО: шаблон обрезается по фактическому "чернильному" bounding box'у
 * через ТУ ЖЕ segmentGlyphs/extractGlyph, что использует и распознавание
 * сканов — иначе несовпадение размеров канваса (с полями) и вырезанного
 * глифа исказится при resize() внутри matchGlyph и даже правильная цифра
 * даст заниженный score. Ровно так, судя по всему, устроена и реальная
 * калибровка (DigitCalibrationPage вырезает символ по границам, а не
 * сохраняет паддинг канваса) — см. digit-matching.ts header.
 */
function buildTemplateCache(chars: string[]): DigitTemplateCache {
  const cache: DigitTemplateCache = {};
  for (const char of chars) {
    const bitmap = char === '.' ? DOT_BITMAP : GLYPH_BITMAPS[char];
    const solo = buildStrip([bitmap], { gap: 2 });
    const [glyphRect] = segmentGlyphs(solo);
    cache[char] = glyphRect ? [extractGlyph(solo, glyphRect)] : [];
  }
  return cache;
}

beforeEach(() => {
  (window as unknown as { cv: unknown }).cv = createFakeCv();
});

describe('segmentGlyphs', () => {
  it('находит по одному глифу на каждый нарисованный символ, слева направо', () => {
    const strip = buildStrip([GLYPH_BITMAPS['1'], GLYPH_BITMAPS['5']]);
    const glyphs = segmentGlyphs(strip);
    expect(glyphs).toHaveLength(2);
    // "1" уже правее в исходном порядке рисования, но проверяем именно
    // отсортированность по x, а не порядок вставки.
    expect(glyphs[0].x).toBeLessThan(glyphs[1].x);
  });

  it('разрезает слипшиеся символы (без зазора) на два глифа по провалу плотности', () => {
    // gap=0 — "1" и "8" рисуются вплотную, образуя один связный контур.
    const strip = buildStrip([GLYPH_BITMAPS['1'], GLYPH_BITMAPS['8']], { gap: 0 });
    const glyphs = segmentGlyphs(strip);
    // Именно ЭТУ функциональность (MERGE_WIDTH_RATIO) описывает комментарий
    // в digit-matching.ts — слипшиеся символы должны разрезаться, а не
    // распознаваться как один широкий блок.
    expect(glyphs.length).toBeGreaterThanOrEqual(2);
  });

  it('игнорирует объекты ниже MIN_GLYPH_HEIGHT/MIN_GLYPH_AREA (шум)', () => {
    // Одиночный пиксель — заведомо ниже порога площади/высоты.
    const height = 12, width = 10;
    const data = new Float64Array(height * width).fill(255);
    data[5 * width + 5] = 0;
    const strip = FakeMat.fromBinary(height, width, Array.from(data));
    expect(segmentGlyphs(strip)).toHaveLength(0);
  });

  it('ДОКУМЕНТИРУЕТ известное ограничение: точка ("."), нарисованная в реальном для неё масштабе (мельче цифры), отфильтровывается ДО сравнения с шаблонами', () => {
    // ВАЖНО: это не "требование", а зафиксированный текущий факт о
    // MIN_GLYPH_AREA=4 / MIN_GLYPH_HEIGHT=5 в digit-matching.ts — оба порога
    // подобраны под цифры и не различают "маленький шум" от "маленького, но
    // легитимного символа" (точки). Если/когда добавится калибровка "."
    // (см. digitTemplateManifest), школьный сценарий "1.5k" всё ещё не
    // заработает, пока эта сегментация не научится делать для точки
    // исключение — независимо от того, что манифест уже будет её содержать.
    const strip = buildStrip([GLYPH_BITMAPS['1'], DOT_BITMAP, GLYPH_BITMAPS['5']], { height: 12 });
    const glyphs = segmentGlyphs(strip);
    // Ожидаем 2 глифа (только "1" и "5"), а НЕ 3 — точка потеряна.
    expect(glyphs).toHaveLength(2);
  });
});

describe('matchGlyph', () => {
  it('находит точное совпадение с самим собой (score ≈ 1)', () => {
    const templates = buildTemplateCache(['1', '5', '8']);
    const glyph = templates['5'][0];
    const match = matchGlyph(glyph, templates);
    expect(match?.char).toBe('5');
    expect(match?.score).toBeGreaterThan(0.99);
  });

  it('выбирает лучший score среди НЕСКОЛЬКИХ образцов одного символа', () => {
    const cleanFive = templates5();
    const noisyFive = noisyVariant(GLYPH_BITMAPS['5']);
    const templates: DigitTemplateCache = { '5': [noisyFive, cleanFive] };
    const match = matchGlyph(cleanFive, templates);
    expect(match?.char).toBe('5');
    expect(match?.score).toBeGreaterThan(0.99);
  });

  it('разные символы дают заметно более низкий score, чем совпадение', () => {
    const templates = buildTemplateCache(['1', '5', '8', 'k']);
    const glyphOne = templates['1'][0];
    const matchAgainstItself = matchGlyph(glyphOne, { '1': templates['1'] });
    const matchAgainstOthers = matchGlyph(glyphOne, { '5': templates['5'], '8': templates['8'], k: templates.k });
    expect(matchAgainstItself!.score).toBeGreaterThan(matchAgainstOthers!.score);
  });

  function templates5() {
    return buildTemplateCache(['5'])['5'][0];
  }
  function noisyVariant(bitmap: string[]) {
    // Тот же силуэт, но с одним "битым" пикселем — имитирует другой скриншот/сжатие.
    const width = bitmap[0].length;
    const height = bitmap.length;
    const data = new Float64Array(width * height);
    paintGlyph(data, width, bitmap, 0, 0);
    data[1 * width + 1] = data[1 * width + 1] === 0 ? 255 : 0;
    return FakeMat.fromBinary(height, width, Array.from(data));
  }
});

describe('recognizeQuantityByTemplate — полный пайплайн (RGBA → серое → бинарное → текст → число)', () => {
  function stripToRgba(strip: FakeMat): FakeMat {
    // Реальный numMat приходит как RGBA (4 канала) из скриншота — здесь
    // строим 4-канальный Mat с одинаковыми R=G=B (серый) и A=255, как если
    // бы cv.imread прочитал ч/б изображение.
    const rgba = new FakeMat(strip.rows, strip.cols, 4);
    for (let i = 0; i < strip.rows * strip.cols; i++) {
      const v = strip.data[i];
      rgba.data[i * 4] = v;
      rgba.data[i * 4 + 1] = v;
      rgba.data[i * 4 + 2] = v;
      rgba.data[i * 4 + 3] = 255;
    }
    return rgba;
  }

  it('возвращает {text: "", quantity: 0}, если шаблоны не загружены (пустой кэш)', () => {
    const strip = buildStrip([GLYPH_BITMAPS['1']]);
    const result = recognizeQuantityByTemplate(stripToRgba(strip), {});
    expect(result).toEqual({ text: '', quantity: 0, avgScore: 0, isValid: false });
  });

  it('распознаёт многозначное число без "k" ("158" → quantity 158)', () => {
    const templates = buildTemplateCache(['1', '5', '8']);
    const strip = buildStrip([GLYPH_BITMAPS['1'], GLYPH_BITMAPS['5'], GLYPH_BITMAPS['8']]);
    const result = recognizeQuantityByTemplate(stripToRgba(strip), templates);
    expect(result.text).toBe('158');
    expect(result.quantity).toBe(158);
  });

  it('распознаёт "k"-количество и умножает на 1000 ("5k" → quantity 5000)', () => {
    const templates = buildTemplateCache(['5', 'k']);
    const strip = buildStrip([GLYPH_BITMAPS['5'], GLYPH_BITMAPS.k]);
    const result = recognizeQuantityByTemplate(stripToRgba(strip), templates);
    expect(result.text.toLowerCase()).toBe('5k');
    expect(result.quantity).toBe(5000);
  });

  it('если хотя бы один символ не опознан ("?") — quantity=0, а не частичное число', () => {
    // В кэше нет шаблона для "8" — второй глиф не наберёт MIN_GLYPH_SCORE
    // ни с одним доступным символом и станет "?".
    const templates = buildTemplateCache(['1']);
    const strip = buildStrip([GLYPH_BITMAPS['1'], GLYPH_BITMAPS['8']]);
    const result = recognizeQuantityByTemplate(stripToRgba(strip), templates);
    expect(result.text).toContain('?');
    expect(result.quantity).toBe(0);
  });
});
