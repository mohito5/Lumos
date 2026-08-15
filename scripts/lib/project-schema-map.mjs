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

// ============================================================================
// Определение региона — нужно для раскладки материалов по папкам
// (data/materials/{local-specialty,books,boss-drops,enemy-drops}/<регион>.js,
// см. scripts/lib/materials-catalog.mjs). genshin-db даёт регион НАПРЯМУЮ
// только для местных диковинок (typeText: "Local Specialty (Liyue)") —
// для остального ниже курируемые таблицы по игровым знаниям, не выведены
// из genshin-db механически. Где заведомо не уверен — таблица НЕ содержит
// запись, вызывающий код тогда кладёt в other.js/common.js, а не гадает.
// ============================================================================

const REGION_KEYS = ['mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan', 'snezhnaya'];

/** "Local Specialty (Liyue)" -> "liyue". genshin-db даёт это напрямую, тут
 *  просто разбор текста, без угадывания. */
export function regionFromLocalSpecialtyTypeText(typeText) {
    const m = String(typeText || '').match(/Local Specialty \(([^)]+)\)/);
    if (!m) return null;
    const key = m[1].toLowerCase();
    return REGION_KEYS.includes(key) ? key : null;
}

// Семья книги таланта -> регион. Устоявшееся, хорошо известное игровое
// деление (не меняется между патчами) — 3 семьи на регион.
const BOOK_FAMILY_REGION = {
    freedom: 'mondstadt', resistance: 'mondstadt', ballad: 'mondstadt',
    prosperity: 'liyue', diligence: 'liyue', gold: 'liyue',
    transience: 'inazuma', elegance: 'inazuma', light: 'inazuma',
    admonition: 'sumeru', ingenuity: 'sumeru', praxis: 'sumeru',
    justice: 'fontaine', order: 'fontaine', kindling: 'fontaine', equity: 'fontaine',
};
/** bookFamilySlug()-результат ("freedom") -> регион, либо null если семья
 *  не из таблицы выше (новый регион/семья, которую ещё не видели). */
export function regionForBookFamily(familySlug) {
    return BOOK_FAMILY_REGION[familySlug] || null;
}

// Боссовый материал -> регион, по названию БОССА (не материала — материалы
// часто называются иначе). Покрывает только уверенные, хорошо известные
// случаи; неполный список — лучше честный "не знаю" (-> other.js), чем
// приписать боссу не тот регион.
const BOSS_NAME_REGION = {
    'stormterror': 'mondstadt', 'dvalin': 'mondstadt', 'andrius': 'mondstadt', 'wolf of the north': 'mondstadt',
    'azhdaha': 'liyue', 'childe': 'liyue', 'tartaglia': 'liyue', 'rhodeia': 'liyue', 'oceanid': 'liyue',
    'raiden': 'inazuma', 'shogun': 'inazuma', 'maguu kenki': 'inazuma', 'golden wolflord': 'inazuma',
    'thunder manifestation': 'inazuma', 'perpetual mechanical array': 'inazuma',
    'wenut': 'sumeru', 'jadeplume terrorshroom': 'sumeru', 'aeonblight drake': 'sumeru', 'apep': 'sumeru',
    'all-devouring narwhal': 'sumeru', 'setekh wenut': 'sumeru',
    'narwhal': 'fontaine', 'usher': 'fontaine', 'emperor of fire and iron': 'fontaine',
};
/** sources-текст genshin-db ("Dropped by Lv. 30+ Cryo Regisvines") -> регион
 *  через поиск известного имени босса внутри строки, либо null. */
export function regionForBossSource(sourcesText) {
    const haystack = String(sourcesText || '').toLowerCase();
    for (const [name, region] of Object.entries(BOSS_NAME_REGION)) {
        if (haystack.includes(name)) return region;
    }
    return null;
}

// Семья дропа с обычных/элитных существ -> регион, ТОЛЬКО для явно
// региональных семей (по названию источника). Всё, чего нет в этой таблице,
// по умолчанию считается общим (common.js) — так безопаснее, чем ошибочно
// закрепить за одним регионом то, что на самом деле есть везде.
const ENEMY_DROP_KEYWORD_REGION = {
    nobushi: 'inazuma', 'kairagi': 'inazuma', shuumatsuban: 'inazuma',
    eremite: 'sumeru', 'consecrated': 'sumeru', 'jinni': 'sumeru',
    'fontaine': 'fontaine', 'meropide': 'fontaine',
};
/** Название материала/источника -> регион по ключевым словам, либо null
 *  (=> common.js) если не найдено явное совпадение. */
export function regionForEnemyDropKeyword(text) {
    const haystack = String(text || '').toLowerCase();
    for (const [kw, region] of Object.entries(ENEMY_DROP_KEYWORD_REGION)) {
        if (haystack.includes(kw)) return region;
    }
    return null;
}
