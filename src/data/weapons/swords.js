
import { RARITY, WEAPON_TYPE, MATERIAL_GROUP } from "../../app/constants";
import { attackCurves } from "../weapon-stats-curves.js";
import { STATS } from "../../app/stats.js";

export const swords = [
  {
    id: 'aquila-favonia',
    enkaId: 11501,
    rarity: RARITY.LEGENDARY,
    type: WEAPON_TYPE.SWORD,
    icon: "/images/weapons/aquila-favonia.png",
    base_attack_curve: attackCurves.rarity_5_674,
    main_stat: {
        stat: STATS.PHYSICAL_DMG,
        curve: 'high'
    },
    passive: [
        [20, 100, 200],
        [25, 115, 230],
        [30, 130, 260],
        [35, 145, 290],
        [40, 160, 320]
    ],
    ascensionMaterials: {
      [MATERIAL_GROUP.WEAPON_ASCENSION_MATERIALS]: MATERIAL_GROUP.DECARABIAN_MATERIALS,
      [MATERIAL_GROUP.ELITE_ENEMY_DROPS]: MATERIAL_GROUP.HORN_MATERIALS,
      [MATERIAL_GROUP.COMMON_ENEMY_DROPS]: MATERIAL_GROUP.HILICHURL_ARROWHEADS
    }
  },
  {
    id: 'sacrificial-sword',
    enkaId: 11403,
    rarity: RARITY.RARE,
    type: WEAPON_TYPE.SWORD,
    icon: "/images/weapons/sacrificial-sword.png",
    base_attack_curve: attackCurves.rarity_4_454,
    main_stat: {
        stat: STATS.ENERGY_RECHARGE,
        curve: 'high'
    },
    passive: [
        [40, 30],
        [50, 26],
        [60, 22],
        [70, 19],
        [80, 16]
    ],
    ascensionMaterials: {
      [MATERIAL_GROUP.WEAPON_ASCENSION_MATERIALS]: MATERIAL_GROUP.BOREAL_WOLF_MATERIALS,
      [MATERIAL_GROUP.ELITE_ENEMY_DROPS]: MATERIAL_GROUP.LEY_LINE_MATERIALS,
      [MATERIAL_GROUP.COMMON_ENEMY_DROPS]: MATERIAL_GROUP.DIVINING_SCROLL_MATERIALS
    }
  }
];
