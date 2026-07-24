import { describe, it, expect } from 'vitest';
import {
  expandBuildData,
  compactBuildData,
  calculateCharacterMaterials,
  calculateCharacterCostRange,
  calculateWeaponMaterials,
} from '../src/core/utils/materialsCalculator';
import allCharacters from '../src/data/characters/index';
import weaponsData from '../src/data/weapons/index';
import { materialsData } from '../src/data/materials';
import { LEVEL_MILESTONES } from '../src/app/constants';

// Берём РЕАЛЬные данные проекта (не фикстуры) — эти функции читают игровые
// таблицы стоимости напрямую по импорту (не принимают их как параметр), так
// что синтетические фикстуры не покрыли бы реальный маппинг group/rarity →
// materialId. Первый персонаж/оружие с ascensionMaterials достаточно —
// тесты не должны знать КОНКРЕТНОЕ имя, чтобы не сломаться при правках
// баланса/данных персонажей.
const testCharacter = allCharacters.find((c) => c.ascensionMaterials);
const testWeapon = weaponsData.find((w) => w.ascensionMaterials && w.rarity);
const testMaterial = materialsData[0];

// ВАЖНО: 'from'/'to' в level-диапазонах — это ИНДЕКСЫ в LEVEL_MILESTONES
// (0..LEVEL_MILESTONES.length-1 = 0..13), а НЕ сырой уровень персонажа
// 1-90 — так их использует весь реальный UI (см. LevelSlider.jsx:
// `max={LEVEL_MILESTONES.length - 1}`, usePinnedFarmingSchedules.js:
// `to: LEVEL_MILESTONES.length - 1`). LEVEL_MILESTONES[i+1] — по этой же
// причине с i, доходящим до сырого "90", падает: 90 далеко за пределами
// 14-элементного массива.
const LAST_MILESTONE_INDEX = LEVEL_MILESTONES.length - 1;
const MID_MILESTONE_INDEX = Math.floor(LEVEL_MILESTONES.length / 2);

describe('materialsCalculator: exists precondition (данные проекта)', () => {
  it('в проекте есть хотя бы один персонаж с ascensionMaterials', () => {
    expect(testCharacter).toBeTruthy();
  });
  it('в проекте есть хотя бы одно оружие с ascensionMaterials', () => {
    expect(testWeapon).toBeTruthy();
  });
});

describe('compactBuildData / expandBuildData — round-trip', () => {
  it('levelRange → lr → levelRange не теряет значения', () => {
    const build = { levelRange: { from: 1, to: 90 } };
    const compact = compactBuildData(build);
    expect(compact.lr).toEqual({ f: 1, t: 90 });

    const expanded = expandBuildData(compact, {});
    expect(expanded.levelRange).toEqual({ from: 1, to: 90 });
    // Сырое компактное поле не должно просочиться в expanded
    expect(expanded.lr).toBeUndefined();
  });

  it('attackRange/skillRange/burstRange → ar/sr/br и обратно', () => {
    const build = {
      attackRange: { from: 1, to: 9 },
      skillRange: { from: 1, to: 10 },
      burstRange: { from: 1, to: 10 },
    };
    const compact = compactBuildData(build);
    expect(compact.ar).toEqual({ f: 1, t: 9 });
    expect(compact.sr).toEqual({ f: 1, t: 10 });
    expect(compact.br).toEqual({ f: 1, t: 10 });

    const expanded = expandBuildData(compact, {});
    expect(expanded.attackRange).toEqual({ from: 1, to: 9 });
    expect(expanded.skillRange).toEqual({ from: 1, to: 10 });
    expect(expanded.burstRange).toEqual({ from: 1, to: 10 });
  });

  it('useInventory=true по умолчанию, если не указано явно false', () => {
    const compact = compactBuildData({});
    expect(compact.ui).toBe(true);
  });

  it('useInventory=false сохраняет localMaterials как lm ({sid: count}) и наоборот', () => {
    const build = {
      useInventory: false,
      localMaterials: { [testMaterial.id]: 5 },
    };
    const compact = compactBuildData(build);
    expect(compact.ui).toBe(false);
    expect(compact.lm).toEqual({ [testMaterial.sid]: 5 });

    const expanded = expandBuildData(compact, {});
    expect(expanded.useInventory).toBe(false);
    expect(expanded.localMaterials).toEqual({ [testMaterial.id]: 5 });
  });

  it('useInventory=true НЕ пишет lm, даже если localMaterials присутствует в buildData', () => {
    const build = { useInventory: true, localMaterials: { [testMaterial.id]: 3 } };
    const compact = compactBuildData(build);
    expect(compact.lm).toBeUndefined();
  });

  // РЕГРЕССИОННЫЙ ТЕСТ — воспроизводит реальный найденный баг:
  // initialBuildState раньше спредил компактные поля (lr/ar/...) прямо в
  // buildData; при повторном сохранении свежепосчитанный compact.lr
  // затирался этим протухшим lr при проходе "прокинуть остальные поля как
  // есть". Если этот тест когда-нибудь начнёт падать — баг вернулся.
  it('РЕГРЕССИЯ: протёкший сырой lr/ui в localBuildData не перебивает свежепосчитанные compact.lr/compact.ui', () => {
    const buildWithLeakedFields = {
      levelRange: { from: 50, to: 90 }, // свежее значение из формы
      lr: { f: 1, t: 20 }, // ПРОТЁКШЕЕ старое значение — не должно победить
      useInventory: true,
      ui: false, // ПРОТЁКШЕЕ старое значение — не должно победить
    };
    const compact = compactBuildData(buildWithLeakedFields);
    expect(compact.lr).toEqual({ f: 50, t: 90 });
    expect(compact.ui).toBe(true);
  });

  it('compactBuildData не включает entityId/ts — это забота вызывающего кода', () => {
    const compact = compactBuildData({ levelRange: { from: 1, to: 90 } });
    expect(compact.ts).toBeUndefined();
    expect(compact.i).toBeUndefined();
    expect(compact.ci).toBeUndefined();
  });

  it('expandBuildData(null, defaults) возвращает defaults как есть', () => {
    const defaults = { levelRange: { from: 1, to: 20 } };
    expect(expandBuildData(null, defaults)).toBe(defaults);
  });

  it('произвольные прочие поля проходят через компакцию без изменений', () => {
    const compact = compactBuildData({ buildName: 'Мой сет' });
    expect(compact.buildName).toBe('Мой сет');
  });
});

describe('calculateCharacterCostRange', () => {
  it('from === to даёт пустой результат (нечего считать)', () => {
    const totals = calculateCharacterCostRange('level', 10, 10, testCharacter);
    expect(Object.keys(totals).length).toBe(0);
  });

  it('увеличение диапазона уровня не уменьшает суммарное количество ни одного материала', () => {
    const small = calculateCharacterCostRange('level', 0, MID_MILESTONE_INDEX, testCharacter);
    const big = calculateCharacterCostRange('level', 0, LAST_MILESTONE_INDEX, testCharacter);
    for (const materialId in small) {
      expect(big[materialId] ?? 0).toBeGreaterThanOrEqual(small[materialId]);
    }
  });

  it('без character.ascensionMaterials возвращает пустой объект, а не падает', () => {
    expect(calculateCharacterCostRange('level', 1, 90, null)).toEqual({});
    expect(calculateCharacterCostRange('level', 1, 90, {})).toEqual({});
  });
});

describe('calculateCharacterMaterials', () => {
  it('сумма по всем 4 направлениям (level/attack/skill/burst) не меньше суммы по одному level', () => {
    const buildData = {
      levelRange: { from: 0, to: LAST_MILESTONE_INDEX },
      attackRange: { from: 1, to: 10 },
      skillRange: { from: 1, to: 10 },
      burstRange: { from: 1, to: 10 },
    };
    const combined = calculateCharacterMaterials(testCharacter, buildData);
    const levelOnly = calculateCharacterCostRange('level', 0, LAST_MILESTONE_INDEX, testCharacter);
    for (const materialId in levelOnly) {
      expect(combined[materialId]).toBeGreaterThanOrEqual(levelOnly[materialId]);
    }
  });

  it('без character возвращает {}', () => {
    expect(calculateCharacterMaterials(null, {})).toEqual({});
  });
});

describe('calculateWeaponMaterials', () => {
  it('from === to даёт пустой результат', () => {
    const totals = calculateWeaponMaterials(testWeapon, { levelRange: { from: 0, to: 0 } });
    expect(Object.keys(totals).length).toBe(0);
  });

  it('увеличение диапазона не уменьшает суммарное количество материалов', () => {
    const small = calculateWeaponMaterials(testWeapon, { levelRange: { from: 0, to: MID_MILESTONE_INDEX } });
    const big = calculateWeaponMaterials(testWeapon, { levelRange: { from: 0, to: LAST_MILESTONE_INDEX } });
    for (const materialId in small) {
      expect(big[materialId] ?? 0).toBeGreaterThanOrEqual(small[materialId]);
    }
  });

  it('без weapon.ascensionMaterials возвращает {}, а не падает', () => {
    expect(calculateWeaponMaterials({ rarity: 5 }, { levelRange: { from: 0, to: LAST_MILESTONE_INDEX } })).toEqual({});
  });
});
