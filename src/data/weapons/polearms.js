import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../shared/config/stats.js";

export const polearms = [
  {
    id: 'primordial-jade-winged-spear',
    enkaId: 13505,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.POLEARM,
    icon: '/images/weapons/primordial-jade-winged-spear.png',
    base_attack_curve: [47.5, 133.3, 164.4, 260.6, 291.7, 341.4, 372.6, 423.4, 454.5, 506.2, 537.3, 589.9, 621, 674.3],
    main_stat: {
        stat: STATS.CRIT_RATE,
        curve: [4.8, 8.48, 8.48, 12.36, 12.36, 14.3, 14.3, 16.24, 16.24, 18.17, 18.17, 20.11, 20.11, 22.05]
    },
    passive: [
        [3.2, 12],
        [3.9, 15],
        [4.6, 18],
        [5.3, 21],
        [6, 24]
    ],
    ascensionMaterials: {
        weapon_ascension_materials: 'luminous_sands_from_guyun',
        common_enemy_drops: 'recruits_insignia',
        elite_enemy_drops: 'hunters_sacrificial_knife'
    }
}
];
