import { STATS } from '../../../shared/config/stats';

/**
 * Enka.Network отдаёт статы артефактов/оружия ДВУМЯ способами:
 *  1. reliquary.mainPropId / appendPropIdList — числовые ID "роллов",
 *     требующие отдельной большой таблицы для расшифровки в конкретное
 *     значение (таблица меняется от патча к патчу).
 *  2. flat.reliquaryMainstat / flat.reliquarySubstats / flat.weaponStats —
 *     УЖЕ РАЗРЕШЁННЫЕ Enka человекочитаемые пары { <mainPropId|appendPropId>:
 *     строка вида "FIGHT_PROP_CRIT_RATE", statValue: число }.
 *
 * Используем ИСКЛЮЧИТЕЛЬНО второй способ — он не требует поддержки таблицы
 * роллов на нашей стороне и не ломается при обновлениях игры.
 *
 * Источник имён: EnkaNetwork/API-docs (docs/gi/api.md, раздел AppendProp Data),
 * сверено с реальным примером ответа https://enka.network/api/uid/618285856/.
 */
export const FIGHT_PROP_TO_STAT = {
    FIGHT_PROP_HP: STATS.HP,
    FIGHT_PROP_ATTACK: STATS.ATK,
    FIGHT_PROP_DEFENSE: STATS.DEF,
    FIGHT_PROP_HP_PERCENT: STATS.HP_PERCENT,
    FIGHT_PROP_ATTACK_PERCENT: STATS.ATK_PERCENT,
    FIGHT_PROP_DEFENSE_PERCENT: STATS.DEF_PERCENT,
    FIGHT_PROP_CRITICAL: STATS.CRIT_RATE,
    FIGHT_PROP_CRITICAL_HURT: STATS.CRIT_DMG,
    FIGHT_PROP_CHARGE_EFFICIENCY: STATS.ENERGY_RECHARGE,
    FIGHT_PROP_HEAL_ADD: STATS.HEALING_BONUS,
    FIGHT_PROP_ELEMENT_MASTERY: STATS.ELEMENTAL_MASTERY,
    FIGHT_PROP_PHYSICAL_ADD_HURT: STATS.PHYSICAL_DMG,
    FIGHT_PROP_FIRE_ADD_HURT: STATS.PYRO_DMG,
    FIGHT_PROP_ELEC_ADD_HURT: STATS.ELECTRO_DMG,
    FIGHT_PROP_WATER_ADD_HURT: STATS.HYDRO_DMG,
    FIGHT_PROP_WIND_ADD_HURT: STATS.ANEMO_DMG,
    FIGHT_PROP_ICE_ADD_HURT: STATS.CRYO_DMG,
    FIGHT_PROP_ROCK_ADD_HURT: STATS.GEO_DMG,
    FIGHT_PROP_GRASS_ADD_HURT: STATS.DENDRO_DMG,
    // Сопротивления — присутствуют в fightPropMap персонажа (расчётные),
    // как substat/mainstat артефакта/оружия НЕ встречаются, но маппим
    // на случай появления в fightPropMap.
    FIGHT_PROP_PHYSICAL_SUB_HURT: STATS.PHYSICAL_RES,
    FIGHT_PROP_FIRE_SUB_HURT: STATS.PYRO_RES,
    FIGHT_PROP_ELEC_SUB_HURT: STATS.ELECTRO_RES,
    FIGHT_PROP_WATER_SUB_HURT: STATS.HYDRO_RES,
    FIGHT_PROP_WIND_SUB_HURT: STATS.ANEMO_RES,
    FIGHT_PROP_ICE_SUB_HURT: STATS.CRYO_RES,
    FIGHT_PROP_ROCK_SUB_HURT: STATS.GEO_RES,
    FIGHT_PROP_GRASS_SUB_HURT: STATS.DENDRO_RES,
};

/**
 * flat.equipType (только у артефактов) → внутренний slot,
 * используемый в CalculatorPage.jsx / ArtifactSlot.jsx.
 * Источник: EnkaNetwork/API-docs.
 */
export const EQUIP_TYPE_TO_SLOT = {
    EQUIP_BRACER: 'flower',
    EQUIP_NECKLACE: 'plume',
    EQUIP_SHOES: 'sands',
    EQUIP_RING: 'goblet',
    EQUIP_DRESS: 'circlet',
};

/**
 * propMap (характеристики персонажа) — числовые ключи.
 * Источник: EnkaNetwork/API-docs (docs/gi/api.md, раздел PropType Data).
 */
export const PROP_TYPE = {
    EXP: '1001',
    ASCENSION: '1002',
    LEVEL: '4001',
};

/**
 * fightPropMap (ИТОГОВЫЕ/расчётные статы персонажа целиком — не путать с
 * mainStat/substat конкретного артефакта/оружия) — тоже числовые ключи, но
 * ДРУГАЯ таблица ID, чем PROP_TYPE выше (это "FightProp Data", а не
 * "PropType Data"). Источник: EnkaNetwork/API-docs (docs/gi/api.md, раздел
 * FightProp Data). Даём только то, что реально показываем в карточке импорта.
 *
 * Массив пар, а НЕ объект { 2000: ..., 20: ... } — у объекта числовые ключи
 * JS всегда перебирает по возрастанию (20, 22, 23, 2000...), независимо от
 * порядка записи, и порядок HP/ATK/DEF/крит/крит.урон/восст.энергии терялся.
 */
export const FIGHT_PROP_MAP_TO_STAT = [
    [2000, STATS.HP],
    [2001, STATS.ATK],
    [2002, STATS.DEF],
    [20, STATS.CRIT_RATE],
    [22, STATS.CRIT_DMG],
    [23, STATS.ENERGY_RECHARGE],
];

/**
 * Конвертирует значение substat/mainstat Enka в число.
 * Проценты (statValue приходит как ДОЛЯ, напр. 0.466 для 46.6%) переводим
 * в проценты, как их хранит остальной калькулятор (STATS.*% всегда в виде
 * "46.6", а не "0.466" — сверено по ArtifactConfigModal.jsx/calculatorUtils.js).
 */
export function normalizeStatValue(statKey, rawValue) {
    const isPercent = typeof statKey === 'string' && statKey.endsWith('%');
    if (isPercent) {
        return Math.round(rawValue * 10) / 10; // 0.4663 -> 46.6
    }
    return Math.round(rawValue);
}
