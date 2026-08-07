import { describe, it, expect } from 'vitest';
import { allocateResources } from '../src/features/profile/hooks/useResourceAllocator';
import { materialsData } from '../src/data/materials';

// Берём 2 реальных материала проекта (нужны настоящие пары id↔sid для
// конвертации инвентаря) — сама логика распределения ниже не зависит от
// ТОГО, какие именно это материалы.
const [matA, matB] = materialsData;

describe('allocateResources — превью распределения (см. JSDoc модуля: инвентарь НЕ меняется)', () => {
  it('без appData возвращает {}', () => {
    expect(allocateResources(null)).toEqual({});
    expect(allocateResources(undefined)).toEqual({});
  });

  it('сборка в приоритете получает материалы из инвентаря (ui: true)', () => {
    const appData = {
      inventory: { [matA.id]: 10 },
      savedChars: [{ i: 'char1', ui: true, materials: { [matA.sid]: 5 } }],
      savedWeaps: [],
      priority: ['char1'],
    };
    const result = allocateResources(appData);
    expect(result.char1).toEqual({ [matA.id]: 5 });
  });

  it('инвентаря не хватает на всех — выделяется частями по порядку приоритета, не поровну', () => {
    const appData = {
      inventory: { [matA.id]: 5 },
      savedChars: [
        { i: 'char1', ui: true, materials: { [matA.sid]: 5 } },
        { i: 'char2', ui: true, materials: { [matA.sid]: 5 } },
      ],
      savedWeaps: [],
      priority: ['char1', 'char2'], // char1 приоритетнее
    };
    const result = allocateResources(appData);
    expect(result.char1).toEqual({ [matA.id]: 5 }); // забрал все 5
    expect(result.char2).toEqual({ [matA.id]: 0 }); // ничего не осталось
  });

  it('сборки не из priority обрабатываются ПОСЛЕ приоритетных', () => {
    const appData = {
      inventory: { [matA.id]: 5 },
      savedChars: [
        { i: 'char1', ui: true, materials: { [matA.sid]: 5 } }, // не в priority
      ],
      savedWeaps: [
        { i: 'weap1', ui: true, materials: { [matA.sid]: 5 } },
      ],
      priority: ['weap1'], // weap1 приоритетнее, хотя char1 стоит раньше в savedChars
    };
    const result = allocateResources(appData);
    expect(result.weap1).toEqual({ [matA.id]: 5 });
    expect(result.char1).toEqual({ [matA.id]: 0 });
  });

  it('ui: false отдаёт localMaterials (lm) как есть, не трогая tempInventory', () => {
    const appData = {
      inventory: { [matA.id]: 10 },
      savedChars: [
        { i: 'char1', ui: false, lm: { [matA.sid]: 3 } },
        { i: 'char2', ui: true, materials: { [matA.sid]: 10 } },
      ],
      savedWeaps: [],
      priority: ['char1', 'char2'],
    };
    const result = allocateResources(appData);
    expect(result.char1).toEqual({ [matA.id]: 3 });
    // char1 был ui:false — не трогал общий инвентарь, значит char2 получает все 10
    expect(result.char2).toEqual({ [matA.id]: 10 });
  });

  it('liveOverride подставляет ЖИВЫЕ (несохранённые) потребности для редактируемой сборки', () => {
    const appData = {
      inventory: { [matA.id]: 10 },
      savedChars: [{ i: 'char1', ui: true, materials: { [matA.sid]: 2 } }], // замороженное значение
      savedWeaps: [],
      priority: ['char1'],
    };
    const liveOverride = { id: 'char1', useInventory: true, materialsBySid: { [matA.sid]: 7 } };
    const result = allocateResources(appData, liveOverride);
    // Должно взять 7 (live), а не 2 (замороженное save.materials)
    expect(result.char1).toEqual({ [matA.id]: 7 });
  });

  it('liveOverride с useInventory:false работает как ui:false для этой сборки', () => {
    const appData = {
      inventory: { [matA.id]: 10 },
      savedChars: [{ i: 'char1', ui: true, materials: { [matA.sid]: 5 }, lm: { [matA.sid]: 1 } }],
      savedWeaps: [],
      priority: ['char1'],
    };
    const liveOverride = { id: 'char1', useInventory: false, materialsBySid: {} };
    const result = allocateResources(appData, liveOverride);
    expect(result.char1).toEqual({ [matA.id]: 1 }); // lm, не tempInventory
  });

  it('несколько разных материалов не смешиваются между собой', () => {
    const appData = {
      inventory: { [matA.id]: 10, [matB.id]: 10 },
      savedChars: [{ i: 'char1', ui: true, materials: { [matA.sid]: 4, [matB.sid]: 6 } }],
      savedWeaps: [],
      priority: ['char1'],
    };
    const result = allocateResources(appData);
    expect(result.char1).toEqual({ [matA.id]: 4, [matB.id]: 6 });
  });

  it('пустой appData (без сборок) не падает', () => {
    expect(allocateResources({})).toEqual({});
  });
});
