import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFakeCv, FakeMat } from './helpers/fakeCv';

// processCell делегирует тяжёлую CV-работу коллабораторам (removeBackground,
// getColorHistogram, matchIcon, recognizeQuantityByTemplate) — их собственная
// корректность проверяется отдельными тестами (background-removal — GrabCut,
// не покрыт здесь; digit-matching — см. digitMatching.test.ts). Здесь
// тестируется СОБСТВЕННАЯ логика processCell: последовательность проверок,
// ранние выходы и что именно попадает в match/rowLog на каждой ветке —
// то есть ровно то, что делает "оркестрирующим" в отличие от "распознающим".
vi.mock('../src/features/profile/utils/opencv/background-removal', () => ({
  removeBackground: vi.fn(),
}));
vi.mock('../src/features/profile/utils/opencv/histogram', () => ({
  getColorHistogram: vi.fn(),
}));
vi.mock('../src/features/profile/utils/opencv/template-matching', () => ({
  matchIcon: vi.fn(),
}));
vi.mock('../src/features/profile/utils/opencv/digit-matching', () => ({
  recognizeQuantityByTemplate: vi.fn(),
}));
vi.mock('../src/features/profile/utils/opencv/auto-detection', () => ({
  goldPixelFraction: vi.fn(),
  MIN_GOLD_FRACTION: 0.03,
}));

import { processCell } from '../src/features/profile/utils/opencv/process-cell';
import { removeBackground } from '../src/features/profile/utils/opencv/background-removal';
import { getColorHistogram } from '../src/features/profile/utils/opencv/histogram';
import { matchIcon } from '../src/features/profile/utils/opencv/template-matching';
import { recognizeQuantityByTemplate } from '../src/features/profile/utils/opencv/digit-matching';
import { goldPixelFraction } from '../src/features/profile/utils/opencv/auto-detection';

const SLOT_W = 100;
const SLOT_H = 140;

/** Строит RGBA "скриншот" с одним слотом по заданным координатам, залитым
 *  указанным цветом (по умолчанию — достаточно яркий, чтобы пройти brightness-фильтр). */
function buildScreenshot(opts: {
  slotX?: number;
  slotY?: number;
  fill?: [number, number, number];
  starsFill?: [number, number, number];
} = {}) {
  const slotX = opts.slotX ?? 0;
  const slotY = opts.slotY ?? 0;
  const [fr, fg, fb] = opts.fill ?? [180, 180, 180];
  const cols = slotX + SLOT_W + 10;
  const rows = slotY + SLOT_H + 10;
  const mat = new FakeMat(rows, cols, 4);
  for (let i = 0; i < rows * cols; i++) {
    mat.data[i * 4] = fr; mat.data[i * 4 + 1] = fg; mat.data[i * 4 + 2] = fb; mat.data[i * 4 + 3] = 255;
  }

  if (opts.starsFill) {
    // Полоса звёзд — containerTop(5%) + starsY(70% от CH) внутри контейнера,
    // считаем те же формулы, что и сам processCell, чтобы закрасить именно
    // её (используется тестами на определение редкости по hue).
    const containerTop = Math.round(SLOT_H * 0.05);
    const containerBottom = Math.round(SLOT_H * 0.97);
    const CH = containerBottom - containerTop;
    const starsY = Math.round(CH * 0.70);
    const starsH = Math.round(CH * 0.17);
    const bx = Math.round(SLOT_W * 0.08);
    const bw = Math.round(SLOT_W * 0.84);
    const [sr, sg, sb] = opts.starsFill;
    for (let y = containerTop + starsY; y < containerTop + starsY + starsH; y++) {
      for (let x = bx; x < bx + bw; x++) {
        const idx = ((slotY + y) * cols + (slotX + x)) * 4;
        mat.data[idx] = sr; mat.data[idx + 1] = sg; mat.data[idx + 2] = sb; mat.data[idx + 3] = 255;
      }
    }
  }

  return { mat, slot: { x: slotX, y: slotY, width: SLOT_W, height: SLOT_H } };
}

/** Настраивает моки коллабораторов на "счастливый путь" — успешное распознавание. */
function mockHappyPath() {
  vi.mocked(removeBackground).mockReturnValue(
    Object.assign(new FakeMat(10, 10, 4), { empty: () => false }) as never,
  );
  vi.mocked(getColorHistogram).mockReturnValue([0.5, 0.3, 0.2]);
  vi.mocked(matchIcon).mockReturnValue({ id: 'mora', score: 0.92, isConfident: true } as never);
  vi.mocked(recognizeQuantityByTemplate).mockReturnValue({ text: '158', quantity: 158, avgScore: 0.9, isValid: true });
  vi.mocked(goldPixelFraction).mockReturnValue(0.5);
}

beforeEach(() => {
  (window as unknown as { cv: unknown }).cv = createFakeCv();
  vi.clearAllMocks();
});

describe('processCell — успешный путь', () => {
  it('при уверенном совпадении иконки и валидном количестве возвращает match и rowLog.итог="принято ✓"', () => {
    mockHappyPath();
    const { mat, slot } = buildScreenshot();
    const { rowLog, match } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(match).toEqual({ materialId: 'mora', quantity: 158 });
    expect(rowLog['итог']).toBe('принято ✓');
    expect(rowLog['материал']).toBe('mora');
    expect(rowLog['количество']).toBe(158);
  });

  it('rowLog всегда содержит #, x, y независимо от исхода', () => {
    mockHappyPath();
    const { mat, slot } = buildScreenshot({ slotX: 20, slotY: 30 });
    const { rowLog } = processCell(slot, 4, 10, mat as never, {}, {});
    expect(rowLog['#']).toBe(5);
    expect(rowLog['x']).toBe(20);
    expect(rowLog['y']).toBe(30);
  });
});

describe('processCell — ранние выходы', () => {
  it('слот вне границ изображения (слишком маленький) → match=null', () => {
    const { mat } = buildScreenshot();
    const tinySlot = { x: 0, y: 0, width: 5, height: 5 };
    const { rowLog, match } = processCell(tinySlot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(rowLog['итог']).toBe('слот вне границ изображения');
  });

  it('слот целиком за пределами скриншота (x/y отрицательно смещены за край) → match=null, без исключения', () => {
    const { mat } = buildScreenshot();
    const offscreenSlot = { x: 10000, y: 10000, width: SLOT_W, height: SLOT_H };
    const { rowLog, match } = processCell(offscreenSlot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(rowLog['итог']).toBe('слот вне границ изображения');
  });

  it('тёмная/пустая ячейка (brightness < 20) → match=null, не доходит до matchIcon', () => {
    mockHappyPath();
    const { mat, slot } = buildScreenshot({ fill: [5, 5, 5] });
    const { rowLog, match } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(String(rowLog['итог'])).toContain('пусто');
    expect(matchIcon).not.toHaveBeenCalled();
  });

  it('не похоже на карточку материала (goldFraction < MIN_GOLD_FRACTION) → match=null, не доходит до removeBackground', () => {
    mockHappyPath();
    vi.mocked(goldPixelFraction).mockReturnValue(0.001);
    const { mat, slot } = buildScreenshot();
    const { rowLog, match } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(String(rowLog['итог'])).toContain('не похоже на карточку материала');
    expect(removeBackground).not.toHaveBeenCalled();
  });

  it('removeBackground вернул пустой Mat → match=null', () => {
    mockHappyPath();
    vi.mocked(removeBackground).mockReturnValue(
      Object.assign(new FakeMat(0, 0, 4), { empty: () => true }) as never,
    );
    const { mat, slot } = buildScreenshot();
    const { rowLog, match } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(rowLog['итог']).toBe('removeBackground вернул пустой Mat');
  });

  it('гистограмма иконки почти пустая (< 0.05) → match=null', () => {
    mockHappyPath();
    vi.mocked(getColorHistogram).mockReturnValue([0.01, 0.01]);
    const { mat, slot } = buildScreenshot();
    const { rowLog, match } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(String(rowLog['итог'])).toContain('иконка невалидна');
  });

  it('matchIcon не уверен (isConfident=false) → match=null, второй кандидат логируется', () => {
    mockHappyPath();
    vi.mocked(matchIcon).mockReturnValue({
      id: 'crystal-chunk', score: 0.4, isConfident: false,
      runnerUp: { id: 'crystal-core', score: 0.38 },
    } as never);
    const { mat, slot } = buildScreenshot();
    const { rowLog, match } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(String(rowLog['итог'])).toContain('неуверенно');
    expect(rowLog['второй_кандидат']).toContain('crystal-core');
  });

  it('matchIcon не нашёл вообще ничего (null) → match=null, "совпадений нет"', () => {
    mockHappyPath();
    vi.mocked(matchIcon).mockReturnValue(null as never);
    const { mat, slot } = buildScreenshot();
    const { rowLog, match } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(rowLog['итог']).toBe('совпадений нет');
  });

  it('распознанное количество невалидно (isValid=false от recognizeQuantityByTemplate) → match=null, текст и qty видны в логе', () => {
    mockHappyPath();
    vi.mocked(recognizeQuantityByTemplate).mockReturnValue({ text: '1?8', quantity: 0, avgScore: 0.3, isValid: false });
    const { mat, slot } = buildScreenshot();
    const { rowLog, match } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(rowLog['итог']).toBe('отклонено (текст="1?8", qty=0)');
  });

  it('необработанное исключение внутри пайплайна перехватывается — match=null, а не падение', () => {
    mockHappyPath();
    vi.mocked(matchIcon).mockImplementation(() => {
      throw new Error('неожиданный сбой');
    });
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { mat, slot } = buildScreenshot();
    const { rowLog, match } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(match).toBeNull();
    expect(String(rowLog['итог'])).toContain('ошибка:');
    spy.mockRestore();
  });
});

describe('processCell — определение редкости по цвету звёзд (hue)', () => {
  it.each([
    { name: 'золото → rarity 5', color: [255, 195, 60] as [number, number, number], rarity: 5 },
    { name: 'фиолетовый → rarity 4', color: [175, 60, 220] as [number, number, number], rarity: 4 },
    { name: 'синий → rarity 3', color: [60, 130, 220] as [number, number, number], rarity: 3 },
    { name: 'зелёный → rarity 2', color: [110, 200, 90] as [number, number, number], rarity: 2 },
    { name: 'низкая насыщенность (серый) → rarity 1', color: [180, 180, 185] as [number, number, number], rarity: 1 },
  ])('$name', ({ color, rarity }) => {
    mockHappyPath();
    const { mat, slot } = buildScreenshot({ starsFill: color });
    const { rowLog } = processCell(slot, 0, 1, mat as never, {}, {});
    expect(rowLog['редкость']).toBe(rarity);
  });
});
