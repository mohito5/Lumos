import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../shared/config/stats.js";

// Placeholder constant for the specific weapon ascension material group.
// Ideally, this would be in constants.js, e.g., MATERIAL_GROUP.DECARABIAN
const WEAPON_MAT_DECARABIAN = 'decarabian';

export const weapon_1 = [
  {
    id: 'amos-bow',
    enkaId: 15502,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.BOW,
    icon: '/assets/Weapon_Amos.webp',
    base_attack_curve: [45.9, 121.7, 152.8, 235.2, 266.3, 308.4, 339.6, 382.4, 413.5, 457, 488.1, 532.2, 563.3, 608.1],
    main_stat: {
        stat: STATS.ATK_PERCENT,
        curve: [
            10.8,
            19.08,
            19.08,
            27.81,
            27.81,
            32.17,
            32.17,
            36.54,
            36.54,
            40.89,
            40.89,
            45.25,
            45.25,
            49.62
        ]
    },
    passive: [
        [12, 8],
        [15, 10],
        [18, 12],
        [21, 14],
        [24, 16]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'fetters_of_the_dandelion_gladiator',
        common_enemy_drops: 'slime_condensate',
        elite_enemy_drops: 'chaos_device'
    }
},
]
