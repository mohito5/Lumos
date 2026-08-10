// ============================================================================
// project-schema-map.mjs — сопоставление значений genshin-db с реальными
// константами проекта (src/shared/config/constants.js, stats.js). Импортирует
// эти файлы напрямую (а не дублирует их значения), чтобы не разъехаться при
// будущих изменениях констант.
// ============================================================================

import { RARITY, VISION, WEAPON_TYPE, MATERIAL_GROUP } from '../../src/shared/config/constants.js';
import { STATS } from '../../src/shared/config/stats.js';
import { codeRef } from './js-print.mjs';

/** Ищет имя ключа в enum-объекте по значению: reverseEnum(RARITY, 5) -> 'LEGENDARY' */
function reverseEnum(enumObj, value) {
    const entry = Object.entries(enumObj).find(([, v]) => v === value);
    return entry ? entry[0] : null;
}

/** rarity: число 1-5 -> codeRef('RARITY.LEGENDARY') */
export function rarityRef(rarityNumber) {
    const key = reverseEnum(RARITY, rarityNumber);
    if (!key) throw new Error(`Неизвестная редкость: ${rarityNumber}`);
    return codeRef(`RARITY.${key}`);
}

/** elementText genshin-db ('Cryo') -> codeRef('VISION.CRYO') */
export function visionRef(elementText) {
    const key = reverseEnum(VISION, elementText);
    if (!key) throw new Error(`Неизвестный элемент: ${elementText}`);
    return codeRef(`VISION.${key}`);
}
export function visionKey(elementText) {
    const key = reverseEnum(VISION, elementText);
    if (!key) throw new Error(`Неизвестный элемент: ${elementText}`);
    return key; // 'CRYO' и т.п., без обёртки — нужно для таблицы гемов ниже
}

/** weaponText genshin-db ('Catalyst') -> codeRef('WEAPON_TYPE.CATALYST') */
export function weaponTypeRef(weaponText) {
    const key = reverseEnum(WEAPON_TYPE, weaponText);
    if (!key) throw new Error(`Неизвестный тип оружия: ${weaponText}`);
    return codeRef(`WEAPON_TYPE.${key}`);
}

// substatType (FIGHT_PROP_*) персонажа -> STATS.* проекта. Таблица построена
// эмпирически (см. историю разработки) перебором costs/substat ВСЕХ
// персонажей в genshin-db — других значений substatType в игре не бывает.
const FIGHT_PROP_TO_STATS_KEY = {
    FIGHT_PROP_HP_PERCENT: 'HP_PERCENT',
    FIGHT_PROP_ATTACK_PERCENT: 'ATK_PERCENT',
    FIGHT_PROP_DEFENSE_PERCENT: 'DEF_PERCENT',
    FIGHT_PROP_CRITICAL: 'CRIT_RATE',
    FIGHT_PROP_CRITICAL_HURT: 'CRIT_DMG',
    FIGHT_PROP_CHARGE_EFFICIENCY: 'ENERGY_RECHARGE',
    FIGHT_PROP_ELEMENT_MASTERY: 'ELEMENTAL_MASTERY',
    FIGHT_PROP_HEAL_ADD: 'HEALING_BONUS',
    FIGHT_PROP_FIRE_ADD_HURT: 'PYRO_DMG',
    FIGHT_PROP_WATER_ADD_HURT: 'HYDRO_DMG',
    FIGHT_PROP_ELEC_ADD_HURT: 'ELECTRO_DMG',
    FIGHT_PROP_ICE_ADD_HURT: 'CRYO_DMG',
    FIGHT_PROP_WIND_ADD_HURT: 'ANEMO_DMG',
    FIGHT_PROP_ROCK_ADD_HURT: 'GEO_DMG',
    FIGHT_PROP_GRASS_ADD_HURT: 'DENDRO_DMG',
    FIGHT_PROP_PHYSICAL_ADD_HURT: 'PHYSICAL_DMG',
};
export function ascensionStatRef(substatType) {
    const key = FIGHT_PROP_TO_STATS_KEY[substatType];
    if (!key) throw new Error(`Неизвестный substatType: ${substatType}`);
    return codeRef(`STATS.${key}`);
}

// Семейство камня возвышения жёстко привязано к элементу персонажа — это не
// эвристика, а факт игровых данных (проверено по всем 7 элементам вживую).
const GEM_FAMILY_BY_ELEMENT = {
    ANEMO: 'VAYUDA_TURQUOISE',
    ELECTRO: 'VAJRADA_AMETHYST',
    CRYO: 'SHIVADA_JADE',
    PYRO: 'AGNIDUS_AGATE',
    HYDRO: 'VARUNADA_LAZURITE',
    GEO: 'PRITHIVA_TOPAZ',
    DENDRO: 'NAGADUS_EMERALD',
};
/** elementKey ('CRYO') -> { constGroupKey: 'SHIVADA_JADE', slug: 'shivada_jade' } —
 *  constGroupKey может не существовать ещё в MATERIAL_GROUP (сейчас там
 *  зарегистрирован только VAYUDA_TURQUOISE) — вызывающий код при
 *  необходимости регистрирует недостающий. */
export function gemFamilyForElement(elementKey) {
    const constGroupKey = GEM_FAMILY_BY_ELEMENT[elementKey];
    if (!constGroupKey) throw new Error(`Нет камня возвышения для элемента: ${elementKey}`);
    return { constGroupKey, slug: constGroupKey.toLowerCase() };
}

export function slugify(name) {
    return name
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

/**
 * Извлекает "семью" книги таланта из имени: "Teachings of Diligence" ->
 * "diligence", "Guide of Order" -> "order". Возвращает null, если имя не
 * матчится ни под один из трёх известных префиксов книг талантов.
 */
export function bookFamilySlug(name) {
    const m = name.match(/^(?:Teachings of|Guide of|Philosophies of)\s+(.+)$/i);
    return m ? slugify(m[1]) : null;
}

/**
 * Классифицирует один материал стоимости (из costs.ascendN / costs.lvlN
 * genshin-db) по typeText записи materials(). context — 'ascension' (мы
 * внутри costs персонажа) или 'talent' (внутри costs таланта) — нужен,
 * потому что "Character Level-Up Material" в контексте таланта — это
 * СЕДЬМАЯ+ ступень, т.е. материал с недельного босса (в возвышении такого
 * не бывает — Hoyoverse убрали недельных боссов из возвышения персонажей),
 * а тот же typeText в контексте возвышения — обычный (не недельный) босс.
 *
 * @returns {'gem'|'local_specialty'|'common_enemy_drop'|'boss_material'|'weekly_boss_material'|'talent_book'|'currency'|'crown'|'unknown'}
 */
export function classifyMaterialKind(materialInfo, context) {
    if (!materialInfo) return 'unknown';
    const t = materialInfo.typeText || '';
    if (materialInfo.category === 'ADSORBATE' || t === 'Common Currency') return 'currency';
    if (t === 'Character Ascension Material') return 'gem';
    if (t.startsWith('Local Specialty')) return 'local_specialty';
    if (t === 'Character and Weapon Enhancement Material') return 'common_enemy_drop';
    if (t === 'Character Talent Material') {
        return materialInfo.name === 'Crown of Insight' ? 'crown' : 'talent_book';
    }
    if (t === 'Character Level-Up Material') {
        return context === 'talent' ? 'weekly_boss_material' : 'boss_material';
    }
    return 'unknown';
}
