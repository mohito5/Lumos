import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../shared/config/stats.js";

export const claymores = [
  {
    id: 'wolfs-gravestone',
    enkaId: 12502,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.CLAYMORE,
    icon: "/images/weapons/wolfs-gravestone.png",
    base_attack_curve: attackCurves.rarity_5_608,
    main_stat: {
        stat: STATS.ATK_PERCENT,
        curve: 'high'
    },
    passive: [
        [20, 40],
        [25, 50],
        [30, 60],
        [35, 70],
        [40, 80]
    ],
    ascensionMaterials: {
      [MATERIAL_GROUP.WEAPON_ASCENSION_MATERIALS]: MATERIAL_GROUP.DANDELION_GLADIATOR_MATERIALS,
      [MATERIAL_GROUP.ELITE_ENEMY_DROPS]: MATERIAL_GROUP.CHAOS_DEVICE_MATERIALS,
      [MATERIAL_GROUP.COMMON_ENEMY_DROPS]: MATERIAL_GROUP.DIVINING_SCROLL_MATERIALS
    }
  }
];
