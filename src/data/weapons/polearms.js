import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../shared/config/stats.js";

export const polearms = [
  {
    id: 'primordial-jade-winged-spear',
    enkaId: 13505,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.POLEARM,
    icon: "/images/weapons/primordial-jade-winged-spear.png",
    base_attack_curve: attackCurves.rarity_5_674,
    main_stat: {
        stat: STATS.CRIT_RATE,
        curve: 'mid'
    },
    passive: [
        [3.2, 12],
        [3.9, 15],
        [4.6, 18],
        [5.3, 21],
        [6.0, 24]
    ],
    ascensionMaterials: {
      [MATERIAL_GROUP.WEAPON_ASCENSION_MATERIALS]: MATERIAL_GROUP.GUYUN_MATERIALS,
      [MATERIAL_GROUP.ELITE_ENEMY_DROPS]: MATERIAL_GROUP.FATUI_INSIGNIA_MATERIALS,
      [MATERIAL_GROUP.COMMON_ENEMY_DROPS]: MATERIAL_GROUP.SLIME_MATERIALS
    }
  }
];
