
import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../shared/config/stats.js";

export const bows = [
  {
    id: "skyward-harp",
    enkaId: 15501,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.BOW,
    icon: "/images/weapons/skyward-harp.png",
    base_attack_curve: attackCurves.rarity_5_674,
    main_stat: {
        stat: STATS.CRIT_RATE,
        curve: 'mid'
    },
    passive: [
        [20, 60, 4],
        [25, 70, 3.5],
        [30, 80, 3],
        [35, 90, 2.5],
        [40, 100, 2]
    ],
    ascensionMaterials: {
      [MATERIAL_GROUP.WEAPON_ASCENSION_MATERIALS]: MATERIAL_GROUP.BOREAL_WOLF_MATERIALS,
      [MATERIAL_GROUP.ELITE_ENEMY_DROPS]: MATERIAL_GROUP.LEY_LINE_MATERIALS,
      [MATERIAL_GROUP.COMMON_ENEMY_DROPS]: MATERIAL_GROUP.HILICHURL_ARROWHEADS
    }
  },
  {
    id: "rust",
    enkaId: 15405,
    rarity: RARITY.RARE,
    type: WEAPON_TYPE.BOW,
    icon: "/images/weapons/rust.png",
    base_attack_curve: attackCurves.rarity_4_510,
    main_stat: {
        stat: STATS.ATK_PERCENT,
        curve: 'high'
    },
    passive: [
        [40],
        [50],
        [60],
        [70],
        [80]
    ],
    ascensionMaterials: {
      [MATERIAL_GROUP.WEAPON_ASCENSION_MATERIALS]: MATERIAL_GROUP.GUYUN_MATERIALS,
      [MATERIAL_GROUP.ELITE_ENEMY_DROPS]: MATERIAL_GROUP.HUNTER_SACRIFICIAL_KNIFE_MATERIALS,
      [MATERIAL_GROUP.COMMON_ENEMY_DROPS]: MATERIAL_GROUP.STAINED_MASK_MATERIALS
    }
  }
]
