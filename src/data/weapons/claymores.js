import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../shared/config/stats.js";

export const claymores = [
  {
    id: 'wolfs-gravestone',
    enkaId: 12502,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.CLAYMORE,
    icon: '/images/weapons/wolfs-gravestone.png',
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
        [20, 40],
        [25, 50],
        [30, 60],
        [35, 70],
        [40, 80]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'fetters_of_the_dandelion_gladiator',
        common_enemy_drops: 'divining_scroll',
        elite_enemy_drops: 'chaos_device'
    }
},
{
    id: 'Akuoumaru',
    enkaId: 12416,
    rarity: RARITY.EPIC,
    type: WEAPON_TYPE.CLAYMORE,
    base_attack_curve: [42.4, 108.9, 134.8, 204.8, 230.8, 265.9, 291.8, 326.8, 352.7, 387.7, 413.7, 448.7, 474.6, 509.6],
    main_stat: {
        stat: STATS.ATK_PERCENT,
        curve: [9, 15.9, 15.9, 23.18, 23.18, 26.81, 26.81, 30.45, 30.45, 34.07, 34.07, 37.71, 37.71, 41.35]
    },
    passive: [
        [0.12, 40],
        [0.15, 50],
        [0.18, 60],
        [0.21, 70],
        [0.24, 80]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'coral_branch_of_a_distant_sea',
        common_enemy_drops: 'old_handguard',
        elite_enemy_drops: 'concealed_claw'
    }
}
];
