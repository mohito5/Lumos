import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";

export const catalysts = [
{
    id: 'Angelos\'Heptades',
    enkaId: 14523,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.CATALYST,
    base_attack_curve: [49.1, 144.9, 176, 285.9, 317, 374.4, 405.6, 464.4, 495.5, 555.4, 586.5, 647.5, 678.6, 740.6],
    main_stat: {
        stat: STATS.ATK_PERCENT,
        curve: [3.6, 6.36, 6.36, 9.27, 9.27, 10.72, 10.72, 12.18, 12.18, 13.63, 13.63, 15.08, 15.08, 16.54]
    },
    passive: [
        [12, 10, 26, 14],
        [15, 13, 34, 15],
        [18, 16, 42, 16],
        [21, 19, 50, 17],
        [24, 22, 58, 18]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'artful_device_fragment',
        common_enemy_drops: 'broken_drive_shaft',
        elite_enemy_drops: 'faded_flaming_hilt'
    }
},
{
    id: 'Ash-GravenDrinkingHorn',
    enkaId: 14427,
    rarity: RARITY.EPIC,
    type: WEAPON_TYPE.CATALYST,
    base_attack_curve: [42.4, 108.9, 134.8, 204.8, 230.8, 265.9, 291.8, 326.8, 352.7, 387.7, 413.7, 448.7, 474.6, 509.6],
    main_stat: {
        stat: STATS.HP_PERCENT,
        curve: [9, 15.9, 15.9, 23.18, 23.18, 26.81, 26.81, 30.45, 30.45, 34.07, 34.07, 37.71, 37.71, 41.35]
    },
    passive: [
        [40],
        [50],
        [60],
        [70],
        [80]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'night_winds_mystic_consideration',
        common_enemy_drops: 'juvenile_fang',
        elite_enemy_drops: 'axis_of_the_secret_source'
    }
}
];
