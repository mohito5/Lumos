
import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../shared/config/stats.js";

export const bows = [
  {
    id: 'skyward-harp',
    enkaId: 15501,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.BOW,
    icon: '/images/weapons/skyward-harp.png',
    base_attack_curve: [47.5, 133.3, 164.4, 260.6, 291.7, 341.4, 372.6, 423.4, 454.5, 506.2, 537.3, 589.9, 621, 674.3],
    main_stat: {
        stat: STATS.CRIT_RATE,
        curve: [4.8, 8.48, 8.48, 12.36, 12.36, 14.3, 14.3, 16.24, 16.24, 18.17, 18.17, 20.11, 20.11, 22.05]
    },
    passive: [
        [20, 60, 4],
        [25, 70, 3.5],
        [30, 80, 3],
        [35, 90, 2.5],
        [40, 100, 2]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'boreal_wolfs_milk_tooth',
        common_enemy_drops: 'firm_arrowhead',
        elite_enemy_drops: 'dead_ley_line_branch'
    }
},
  {
    id: 'rust',
    enkaId: 15405,
    rarity: RARITY.EPIC,
    type: WEAPON_TYPE.BOW,
    icon: '/images/weapons/rust.png',
    base_attack_curve: [42.4, 108.9, 134.8, 204.8, 230.8, 265.9, 291.8, 326.8, 352.7, 387.7, 413.7, 448.7, 474.6, 509.6],
    main_stat: {
        stat: STATS.ATK_PERCENT,
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
        weapon_ascension_materials: 'luminous_sands_from_guyun',
        common_enemy_drops: 'damaged_mask',
        elite_enemy_drops: 'hunters_sacrificial_knife'
    }
},
{
    id: 'AlleyHunter',
    enkaId: 15410,
    rarity: RARITY.EPIC,
    type: WEAPON_TYPE.BOW,
    base_attack_curve: [43.7, 118.6, 144.5, 226, 252, 293.4, 319.3, 360.9, 386.8, 428.7, 454.7, 496.7, 522.6, 564.8],
    main_stat: {
        stat: STATS.ATK_PERCENT,
        curve: [6, 10.6, 10.6, 15.45, 15.45, 17.87, 17.87, 20.3, 20.3, 22.72, 22.72, 25.14, 25.14, 27.56]
    },
    passive: [
        [2, 20, 4],
        [2.5, 25, 5],
        [3, 30, 6],
        [3.5, 35, 7],
        [4, 40, 8]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'fetters_of_the_dandelion_gladiator',
        common_enemy_drops: 'slime_condensate',
        elite_enemy_drops: 'chaos_device'
    }
},
{
    id: 'AquaSimulacra',
    enkaId: 15508,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.BOW,
    base_attack_curve: [44.3, 110.2, 141.3, 209.8, 240.9, 275.5, 306.7, 341.5, 372.6, 407.8, 438.9, 474.6, 505.7, 541.8],
    main_stat: {
        stat: STATS.CRIT_DMG,
        curve: [
            19.2,
            33.93,
            33.93,
            49.44,
            49.44,
            57.2,
            57.2,
            64.95,
            64.95,
            72.69,
            72.69,
            80.45,
            80.45,
            88.2
        ]
    },
    passive: [
        [16, 20],
        [20, 25],
        [24, 30],
        [28, 35],
        [32, 40]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'luminous_sands_from_guyun',
        common_enemy_drops: 'spectral_husk',
        elite_enemy_drops: 'gloomy_statuette'
    }
},
{
    id: 'AstralVulture\'sCrimson',
    enkaId: 15514,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.BOW,
    base_attack_curve: [45.9, 121.7, 152.8, 235.2, 266.3, 308.4, 339.6, 382.4, 413.5, 457, 488.1, 532.2, 563.3, 608.1],
    main_stat: {
        stat: STATS.CRIT_DMG,
        curve: [
            14.4,
            25.44,
            25.44,
            37.08,
            37.08,
            42.9,
            42.9,
            48.72,
            48.72,
            54.52,
            54.52,
            60.34,
            60.34,
            66.15
        ]
    },
    passive: [
        [24, 20, 10],
        [30, 25, 12.5],
        [36, 30, 15],
        [42, 35, 17.5],
        [48, 40, 20]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'night_winds_mystic_consideration',
        common_enemy_drops: 'sentrys_wooden_whistle',
        elite_enemy_drops: 'refractive_bud'
    }
}
];
