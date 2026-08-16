import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../shared/config/stats.js";

export const swords = [
  {
    id: 'aquila-favonia',
    enkaId: 11501,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.SWORD,
    icon: '/images/weapons/aquila-favonia.png',
    base_attack_curve: [47.5, 133.3, 164.4, 260.6, 291.7, 341.4, 372.6, 423.4, 454.5, 506.2, 537.3, 589.9, 621, 674.3],
    main_stat: {
        stat: STATS.PHYSICAL_DMG,
        curve: [9, 15.9, 15.9, 23.18, 23.18, 26.81, 26.81, 30.45, 30.45, 34.07, 34.07, 37.71, 37.71, 41.35]
    },
    passive: [
        [20, 100, 200],
        [25, 115, 230],
        [30, 130, 260],
        [35, 145, 290],
        [40, 160, 320]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'tile_of_decarabians_tower',
        common_enemy_drops: 'firm_arrowhead',
        elite_enemy_drops: 'heavy_horn'
    }
},
  {
    id: 'sacrificial-sword',
    enkaId: 11403,
    rarity: RARITY.EPIC,
    type: WEAPON_TYPE.SWORD,
    icon: '/images/weapons/sacrificial-sword.png',
    base_attack_curve: [41.1, 99.3, 125.2, 183.7, 209.7, 238.3, 264.2, 292.6, 318.5, 346.7, 372.7, 400.7, 426.6, 454.4],
    main_stat: {
        stat: STATS.ENERGY_RECHARGE,
        curve: [
            13.33,
            23.56,
            23.56,
            34.33,
            34.33,
            39.72,
            39.72,
            45.11,
            45.11,
            50.48,
            50.48,
            55.87,
            55.87,
            61.25
        ]
    },
    passive: [
        [40, 30],
        [50, 26],
        [60, 22],
        [70, 19],
        [80, 16]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'fetters_of_the_dandelion_gladiator',
        common_enemy_drops: 'divining_scroll',
        elite_enemy_drops: 'chaos_device'
    }
},
{
    id: 'AmenomaKageuchi',
    enkaId: 11414,
    rarity: RARITY.EPIC,
    type: WEAPON_TYPE.SWORD,
    base_attack_curve: [41.1, 99.3, 125.2, 183.7, 209.7, 238.3, 264.2, 292.6, 318.5, 346.7, 372.7, 400.7, 426.6, 454.4],
    main_stat: {
        stat: STATS.ATK_PERCENT,
        curve: [12, 21.2, 21.2, 30.9, 30.9, 35.75, 35.75, 40.6, 40.6, 45.43, 45.43, 50.28, 50.28, 55.13]
    },
    passive: [
        [6],
        [7.5],
        [9],
        [10.5],
        [12]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'coral_branch_of_a_distant_sea',
        common_enemy_drops: 'old_handguard',
        elite_enemy_drops: 'chaos_gear'
    }
}
];
