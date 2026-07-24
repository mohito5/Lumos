import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../app/constants";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../app/stats.js";

// Placeholder constant for the specific weapon ascension material group.
// Ideally, this would be in constants.js, e.g., MATERIAL_GROUP.DECARABIAN
const WEAPON_MAT_DECARABIAN = 'decarabian';

export const weapon_1 = [
  {
    id: 'amos-bow',
    enkaId: 15502,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.BOW,
    icon: "/assets/Weapon_Amos.webp",
    base_attack_curve: attackCurves.rarity_5_608,
    main_stat: {
        stat: STATS.ATK_PERCENT,
        curve: 'high'
    },
    passive: [
      [12, 8],
      [15, 10],
      [18, 12],
      [21, 14],
      [24, 16]
    ],
    ascensionMaterials: {
      [MATERIAL_GROUP.WEAPON_ASCENSION_MATERIALS]: MATERIAL_GROUP.DANDELION_GLADIATOR, // Specific material for this weapon
      [MATERIAL_GROUP.COMMON_ENEMY_DROPS]: MATERIAL_GROUP.SLIME_MATERIALS,
      [MATERIAL_GROUP.ELITE_ENEMY_DROPS]: MATERIAL_GROUP.HUMANOID_RUIN_MACHINE // Note: Using Clockwork Gears as it's an existing elite drop in our DB
    }
  },
]
