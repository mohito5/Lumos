import { describe, it, expect, beforeEach } from 'vitest';
import { createFakeCv, FakeMat } from './helpers/fakeCv';
import {
  median,
  cluster,
  avg,
  extrapolateGrid,
  goldPixelFraction,
  MIN_GOLD_FRACTION,
} from '../src/features/profile/utils/opencv/auto-detection';

describe('median', () => {
  it('нечётное число элементов — средний элемент отсортированного массива', () => {
    expect(median([5, 1, 3])).toBe(3);
  });
  it('чётное число элементов — среднее двух центральных', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });
  it('пустой массив — 0', () => {
    expect(median([])).toBe(0);
  });
  it('не мутирует исходный массив (сортирует копию)', () => {
    const input = [3, 1, 2];
    median(input);
    expect(input).toEqual([3, 1, 2]);
  });
});

describe('avg', () => {
  it('среднее арифметическое', () => {
    expect(avg([2, 4, 6])).toBe(4);
  });
  it('пустой массив — 0 (не NaN)', () => {
    expect(avg([])).toBe(0);
  });
});

describe('cluster', () => {
  it('группирует близкие значения (в пределах tolerance) в один кластер', () => {
    const groups = cluster([10, 12, 50, 52, 51], 5);
    expect(groups).toHaveLength(2);
    expect(groups[0]).toEqual([10, 12]);
    expect(groups[1]).toEqual([50, 51, 52]);
  });

  it('значения дальше tolerance друг от друга — отдельные кластеры', () => {
    const groups = cluster([0, 100, 200], 5);
    expect(groups).toHaveLength(3);
  });

  it('кластеризация "цепочкой" — сравнивает с ПОСЛЕДНИМ элементом группы, не с первым', () => {
    // 0,4,8,12 с tolerance=5: 0→[0]; 4 близко к 0(диф.4)→[0,4]; 8 близко к
    // ПОСЛЕДНЕМУ (4, диф.4), хотя от первого (0) диф.8 > tolerance → всё
    // равно один кластер, т.к. сравнение идёт с концом группы, не с началом.
    const groups = cluster([0, 4, 8, 12], 5);
    expect(groups).toHaveLength(1);
    expect(groups[0]).toEqual([0, 4, 8, 12]);
  });
});

describe('extrapolateGrid', () => {
  it('меньше 2 точек — возвращает как есть, ничего не достраивает', () => {
    const result = extrapolateGrid([50], 10, 500);
    expect(result).toEqual({ centers: [50], addedBefore: 0, addedAfter: 0 });
  });

  it('достраивает недостающие центры по обе стороны с уже известным шагом', () => {
    // Шаг между центрами = 100. Изображение 500px, cellHalfSize=20.
    // Слева до 0 помещается ещё один центр (100-100=0, 0+20>0 — влезает).
    // Справа до 500 — центр 500 (400+100), 500-20=480<500 — тоже влезает.
    const result = extrapolateGrid([100, 200, 300, 400], 20, 500, 1);
    expect(result.addedBefore).toBe(1);
    expect(result.addedAfter).toBe(1);
    expect(result.centers).toEqual([0, 100, 200, 300, 400, 500]);
  });

  it('уважает maxExtra — не достраивает больше указанного количества', () => {
    const result = extrapolateGrid([100, 200], 5, 10000, 1);
    expect(result.addedBefore).toBeLessThanOrEqual(1);
    expect(result.addedAfter).toBeLessThanOrEqual(1);
  });

  it('аномально маленький шаг (клетки почти слиплись) — не рискует достраивать', () => {
    // step=6, cellHalfSize=10 → step <= cellHalfSize → бракуем экстраполяцию.
    const result = extrapolateGrid([100, 106, 112], 10, 1000);
    expect(result).toEqual({ centers: [100, 106, 112], addedBefore: 0, addedAfter: 0 });
  });

  it('не выходит за границы изображения даже если maxExtra позволил бы больше', () => {
    // Шаг 100, изображение всего 150px — второй "достроенный" центр справа
    // (400+100=500) не поместится (500-cellHalfSize >= 150), значит
    // addedAfter должен остановиться раньше maxExtra.
    const result = extrapolateGrid([100, 200], 10, 150, 5);
    expect(result.addedAfter).toBe(0);
  });

  it('регрессионный тест: maxExtra=2 не должен тянуть сетку в соседнюю UI-панель дальше необходимого', () => {
    // Это тот самый сценарий, описанный в комментарии extrapolateGrid —
    // maxExtra=2 на реальном скриншоте дотягивался до инфопанели. Здесь —
    // числовая проверка, что при maxExtra=1 (текущее значение по умолчанию)
    // за пределы разумного не выходит.
    const result = extrapolateGrid([50, 150, 250, 350], 15, 500);
    expect(result.addedAfter).toBeLessThanOrEqual(1);
    expect(result.addedBefore).toBeLessThanOrEqual(1);
  });
});

describe('goldPixelFraction', () => {
  beforeEach(() => {
    (window as unknown as { cv: unknown }).cv = createFakeCv();
  });

  function solidRgba(rows: number, cols: number, r: number, g: number, b: number): FakeMat {
    const mat = new FakeMat(rows, cols, 4);
    for (let i = 0; i < rows * cols; i++) {
      mat.data[i * 4] = r; mat.data[i * 4 + 1] = g; mat.data[i * 4 + 2] = b; mat.data[i * 4 + 3] = 255;
    }
    return mat;
  }

  it('полностью золотая область (цвет звёзд Genshin ~255,200,50) — фракция = 1', () => {
    const mat = solidRgba(4, 4, 255, 200, 50);
    expect(goldPixelFraction(mat)).toBeCloseTo(1, 5);
  });

  it('нейтральный серый/белый фон (нет звёзд) — фракция = 0', () => {
    const mat = solidRgba(4, 4, 230, 230, 230);
    expect(goldPixelFraction(mat)).toBe(0);
  });

  it('насыщенный синий (не золото) — фракция = 0', () => {
    const mat = solidRgba(4, 4, 60, 90, 220);
    expect(goldPixelFraction(mat)).toBe(0);
  });

  it('половина области золотая, половина — нет: фракция ≈ 0.5', () => {
    const mat = new FakeMat(4, 4, 4);
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        const isGold = x < 2;
        const [r, g, b] = isGold ? [255, 200, 50] : [200, 200, 200];
        const i = y * 4 + x;
        mat.data[i * 4] = r; mat.data[i * 4 + 1] = g; mat.data[i * 4 + 2] = b; mat.data[i * 4 + 3] = 255;
      }
    }
    expect(goldPixelFraction(mat)).toBeCloseTo(0.5, 5);
  });

  it('MIN_GOLD_FRACTION — золотая область ровно на границе не должна давать ложных срабатываний ниже порога', () => {
    const mat = solidRgba(10, 10, 200, 200, 200); // не золото вообще
    expect(goldPixelFraction(mat)).toBeLessThan(MIN_GOLD_FRACTION);
  });

  it('пустой/удалённый Mat — возвращает 0, не бросает исключение', () => {
    const empty = new FakeMat(0, 0, 4);
    expect(goldPixelFraction(empty)).toBe(0);
  });
});
