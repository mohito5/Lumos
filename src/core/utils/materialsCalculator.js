import { materialsData } from '../../data/materials';
import { CHARACTER_LEVEL_UP_COST, CHARACTER_TALENT_COST } from '../../data/character-materials-data';
import { WEAPON_ASCENSION_COST } from '../../data/weapon-materials-data';
import { LEVEL_MILESTONES, MATERIAL_TYPE, MATERIAL_GROUP } from '../../app/constants';

/**
 * Раньше расчёт «сколько чего нужно» жил как локальная функция прямо в
 * CharacterMaterialsPage.jsx/WeaponMaterialsPage.jsx — то есть работал
 * только пока соответствующая страница смонтирована. Чтобы виджет
 * расписания фарма на главной мог посчитать это же для ЛЮБОГО закреплённого
 * персонажа/оружия (не только для того, чью страницу сейчас открыли),
 * логика вынесена сюда как чистые функции без React/страничного контекста.
 */

let sidToMatIdCache = null;
function sidToMatId(sid) {
    if (!sidToMatIdCache) {
        sidToMatIdCache = new Map(materialsData.map((m) => [m.sid, m.id]));
    }
    return sidToMatIdCache.get(sid);
}

// Обратное направление к sidToMatId — нужно compactBuildData() ниже, чтобы
// конвертировать localMaterials { materialId → count } → lm { sid → count }.
let matIdToSidCache = null;
function matIdToSid(matId) {
    if (!matIdToSidCache) {
        matIdToSidCache = new Map(materialsData.map((m) => [m.id, m.sid]));
    }
    return matIdToSidCache.get(matId);
}

/**
 * Разворачивает сжатый формат сохранённой сборки (lr/ar/sr/br/ui/lm — см.
 * useDataManager.saveData) обратно в подробный buildData, которым
 * оперирует UI. Используется и на самих страницах материалов (через
 * useDataManager), и здесь — при живом расчёте для закреплённых виджетов.
 *
 * ВАЖНО: спред {...savedEntity} затаскивает в expanded СЫРЫЕ компактные
 * поля (lr/ar/sr/br/ui/lm/i/ts) один в один — их специально деструктурируют
 * и отбрасывают ниже. Раньше (до этого фикса) они так и оставались висеть
 * в buildData бессрочно, никем отдельно не обновляясь — обновлялись только
 * verbose-поля levelRange и т.д. При следующем сохранении saveData()
 * пересчитывал compact.lr из СВЕЖЕГО levelRange правильно, но затем цикл
 * "прокинуть остальные поля как есть" проходил по ключам buildData и
 * затирал только что посчитанный compact.lr этим самым протухшим
 * значением — отсюда баг "Обновить не сохраняет новый диапазон уровня" (и
 * потенциально то же самое для useInventory/ui). Поэтому buildData должен
 * содержать ТОЛЬКО verbose-представление.
 */
export function expandBuildData(savedEntity, defaultBuildData) {
    if (!savedEntity) return defaultBuildData;

    const {
        lr: _lr, ar: _ar, sr: _sr, br: _br,
        ui: _ui, lm: _lm, i: _i, ci: _ci, ts: _ts,
        ...expanded
    } = { ...defaultBuildData, ...savedEntity };

    if (savedEntity.lr) expanded.levelRange = { from: savedEntity.lr.f, to: savedEntity.lr.t };
    if (savedEntity.ar) expanded.attackRange = { from: savedEntity.ar.f, to: savedEntity.ar.t };
    if (savedEntity.sr) expanded.skillRange = { from: savedEntity.sr.f, to: savedEntity.sr.t };
    if (savedEntity.br) expanded.burstRange = { from: savedEntity.br.f, to: savedEntity.br.t };
    if (savedEntity.ui !== undefined) expanded.useInventory = savedEntity.ui;

    if (savedEntity.lm !== undefined) {
        const localMats = {};
        for (const sid in savedEntity.lm) {
            const matId = sidToMatId(sid);
            if (matId) localMats[matId] = savedEntity.lm[sid];
        }
        expanded.localMaterials = localMats;
    }

    return expanded;
}

/**
 * Компакция verbose buildData → компактный формат хранения (spec §3) —
 * обратная операция к expandBuildData() выше. Раньше жила инлайном внутри
 * useDataManager.saveData(); вынесена сюда чистой функцией (без React,
 * без стора) ради unit-тестируемости — это самое рискованное по формату
 * место в проекте (levelRange/attackRange/skillRange/burstRange → lr/ar/sr/br
 * и обратно), тихая регрессия здесь бьёт по сохранности сборок пользователя.
 * Меняешь маппинг полей тут — почти наверняка нужно менять и в expandBuildData.
 *
 * ВАЖНО: результат НЕ включает entityId/ts — их добавляет вызывающий код
 * (useDataManager.saveData) поверх результата, это не забота компакции.
 *
 * @param {object} localBuildData — verbose buildData из формы редактирования
 * @returns {object} compact — объект в компактном формате для записи в стор
 */
export function compactBuildData(localBuildData) {
    const compact = {};
    if (localBuildData.levelRange) compact.lr = { f: localBuildData.levelRange.from, t: localBuildData.levelRange.to };
    if (localBuildData.attackRange) compact.ar = { f: localBuildData.attackRange.from, t: localBuildData.attackRange.to };
    if (localBuildData.skillRange) compact.sr = { f: localBuildData.skillRange.from, t: localBuildData.skillRange.to };
    if (localBuildData.burstRange) compact.br = { f: localBuildData.burstRange.from, t: localBuildData.burstRange.to };

    // ui — boolean, дефолт true
    const useInventory = localBuildData.useInventory !== false;
    compact.ui = useInventory;
    if (!useInventory && localBuildData.localMaterials) {
        // localMaterials хранится как { materialId → count } (UI-формат),
        // lm в сторе — { sid → count } (компактный формат по spec)
        const lm = {};
        for (const matId in localBuildData.localMaterials) {
            const sid = matIdToSid(matId);
            if (sid) lm[sid] = (lm[sid] || 0) + localBuildData.localMaterials[matId];
        }
        compact.lm = lm;
    }

    // materials — рассчитанные потребности (для allocator)
    if (localBuildData.materials) compact.materials = localBuildData.materials;

    // Любые другие поля (кроме уже обработанных) — прокидываем как есть.
    // ВАЖНО: сюда же добавлены сырые компактные имена (lr/ar/sr/br/ui/lm/i/ci/ts) —
    // защита на случай, если они когда-нибудь снова просочатся в localBuildData
    // (см. фикс в expandBuildData выше). Без этого такой "просочившийся" lr/ui
    // молча перезаписывает только что правильно посчитанный compact.lr/compact.ui
    // значением из ПРЕДЫДУЩЕГО сохранения — именно так терялось обновление
    // диапазона уровня при повторном "Обновить".
    const skip = new Set([
        'levelRange', 'attackRange', 'skillRange', 'burstRange', 'useInventory', 'localMaterials', 'materials',
        'lr', 'ar', 'sr', 'br', 'ui', 'lm', 'i', 'ci', 'ts',
    ]);
    for (const k of Object.keys(localBuildData)) {
        if (!skip.has(k)) compact[k] = localBuildData[k];
    }

    return compact;
}

export function findMaterialId(specificGroup, rarity) {
    if (!specificGroup) return null;
    const material = materialsData.find((m) => m.group?.includes(specificGroup) && m.rarity === rarity);
    return material?.id;
}

/**
 * Общий поиск материала по произвольному набору полей — раньше был
 * определён локально и идентично в CharacterInfoPage.jsx и WeaponInfoPage.jsx
 * (например findMaterial({ id: 'mora' })).
 */
export function findMaterial(props) {
    if (!props) return null;
    return materialsData.find((m) => Object.entries(props).every(([key, value]) => m[key] === value));
}

export function findUniqueMaterialId(specificGroup) {
    if (!specificGroup) return null;
    const material = materialsData.find((m) => m.group?.includes(specificGroup));
    return material?.id;
}

export function findEnhancementOreId(rarity) {
    const material = materialsData.find((m) => m.group?.includes(MATERIAL_GROUP.ENHANCEMENT_ORE) && m.rarity === rarity);
    return material?.id;
}

/**
 * Стоимость ОДНОГО измерения прокачки (уровень персонажа, либо конкретный
 * талант) на диапазоне [from, to). Раньше эта же логика была продублирована
 * как локальный расчёт внутри CharacterInfoPage.jsx (только type='level') и
 * TalentSection.jsx (только тип таланта) — экспортирована, чтобы обе
 * страницы звали ровно этот код вместо параллельных копий:
 *   - «с начала» / «полная стоимость»: from=0 (уровень) или from=1 (талант), to=текущий
 *   - «с предыдущего шага»: from=текущий-1, to=текущий (даёт стоимость только
 *     последнего перехода — единообразно для обеих страниц)
 */
export function calculateCharacterCostRange(type, from, to, character) {
    const totals = {};
    if (!character?.ascensionMaterials) return totals;

    const addMaterial = (materialId, count) => {
        if (!materialId || count <= 0) return;
        totals[materialId] = (totals[materialId] || 0) + count;
    };

    const processCost = (cost) => {
        let materialId;
        const specificMatGroup = character.ascensionMaterials[cost.group];

        if (cost.type === MATERIAL_TYPE.COMMON_CURRENCIES) {
            materialId = 'mora';
        } else if (cost.type === MATERIAL_TYPE.CHARACTER_EXP) {
            const expBook = materialsData.find((m) => m.type === MATERIAL_TYPE.CHARACTER_EXP && m.rarity === cost.rarity);
            materialId = expBook?.id;
        } else if (cost.group === MATERIAL_GROUP.CROWN_OF_INSIGHT) {
            materialId = 'crown_of_insight';
        } else if (specificMatGroup) {
            materialId = cost.rarity ? findMaterialId(specificMatGroup, cost.rarity) : findUniqueMaterialId(specificMatGroup);
        }

        if (materialId) addMaterial(materialId, cost.count);
    };

    if (type === 'level') {
        for (let i = from; i < to; i++) {
            const milestone = LEVEL_MILESTONES[i + 1];
            const costs = CHARACTER_LEVEL_UP_COST[milestone.label];
            if (costs) costs.forEach(processCost);
        }
    } else {
        const talentCosts = CHARACTER_TALENT_COST[type];
        if (!talentCosts) return totals;
        for (let targetLevel = from + 1; targetLevel <= to; targetLevel++) {
            const costs = talentCosts[targetLevel];
            if (costs) costs.forEach(processCost);
        }
    }

    return totals;
}

/** { materialId → count } — сколько всего нужно персонажу при заданных диапазонах buildData. */
export function calculateCharacterMaterials(character, buildData) {
    if (!character) return {};
    const { levelRange, attackRange, skillRange, burstRange } = buildData;

    const levelMats = calculateCharacterCostRange('level', levelRange.from, levelRange.to, character);
    const attackMats = calculateCharacterCostRange('attack', attackRange.from, attackRange.to, character);
    const skillMats = calculateCharacterCostRange('skill', skillRange.from, skillRange.to, character);
    const burstMats = calculateCharacterCostRange('burst', burstRange.from, burstRange.to, character);

    const combined = {};
    [levelMats, attackMats, skillMats, burstMats].forEach((mats) => {
        for (const key in mats) combined[key] = (combined[key] || 0) + mats[key];
    });
    return combined;
}

/** { materialId → count } — сколько всего нужно оружию при заданном диапазоне уровня. */
export function calculateWeaponMaterials(weapon, buildData) {
    const totals = {};
    if (!weapon?.ascensionMaterials) return totals;

    const { from, to } = buildData.levelRange;
    const addMaterial = (materialId, count) => {
        if (!materialId || count <= 0) return;
        totals[materialId] = (totals[materialId] || 0) + count;
    };

    const costData = WEAPON_ASCENSION_COST[weapon.rarity];
    if (!costData) return totals;

    for (let i = from; i < to; i++) {
        const milestone = LEVEL_MILESTONES[i + 1];
        const costs = costData[milestone.label];
        if (!costs) continue;

        for (const cost of costs) {
            if (cost.type === MATERIAL_TYPE.COMMON_CURRENCIES) {
                addMaterial('mora', cost.count);
                continue;
            }
            if (cost.group === MATERIAL_GROUP.ENHANCEMENT_ORE) {
                const oreId = findEnhancementOreId(cost.rarity);
                if (oreId) addMaterial(oreId, cost.count);
                continue;
            }
            const isWeaponAscensionMat = cost.type === MATERIAL_TYPE.WEAPON_ENHANCEMENT_MATERIALS;
            const isEnemyDropMat = cost.type === MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT;
            if ((isWeaponAscensionMat || isEnemyDropMat) && cost.group) {
                const specificMaterialGroup = weapon.ascensionMaterials[cost.group];
                if (specificMaterialGroup) {
                    const materialId = findMaterialId(specificMaterialGroup, cost.rarity);
                    if (materialId) addMaterial(materialId, cost.count);
                }
            }
        }
    }

    return totals;
}
