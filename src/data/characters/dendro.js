import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";

export const dendro = [
    {
      id: "Lauma",
      rarity: RARITY.EPIC,
      element: VISION.DENDRO,
      weapon: WEAPON_TYPE.CATALYST,
      birthday: "2-1",
      avatar: "assets/avatar/lauma.png",
      avatar_icon: "assets/avatar-icon/lauma_icon.png",
      baseStats: {
        [STATS.HP]: [850, 2200, 4300, 5600, 7100, 8700, 10500, 12500],
        [STATS.ATK]: [22, 58, 114, 148, 187, 228, 275, 327],
        [STATS.DEF]: [52, 134, 260, 337, 426, 521, 628, 748],
      },
      ascensionMaterials: {},
      talents: {
        attack: { icon: "assets/char-talent-icon/lauma/attack.png", stats: [] },
        skill: { icon: "assets/char-talent-icon/lauma/skill.png", stats: [] },
        burst: { icon: "assets/char-talent-icon/lauma/burst.png", stats: [] }
      }
    },
    {
        id: "Nahida",
        enkaId: 10000073,
        rarity: RARITY.LEGENDARY,
        element: VISION.DENDRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "10-27",
        avatar_icon: "assets/avatar-icon/nahida.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/nahida/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/nahida/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/nahida/burst.png", stats: [] }
        }
    },
    {
        id: "Tighnari",
        enkaId: 10000069,
        rarity: RARITY.LEGENDARY,
        element: VISION.DENDRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "12-29",
        avatar_icon: "assets/avatar-icon/tighnari.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/tighnari/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/tighnari/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/tighnari/burst.png", stats: [] }
        }
    },
    {
        id: "Collei",
        enkaId: 10000067,
        rarity: RARITY.EPIC,
        element: VISION.DENDRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "8-18",
        avatar_icon: "assets/avatar-icon/collei.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/collei/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/collei/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/collei/burst.png", stats: [] }
        }
    },
    {
        id: "Alhaitham",
        enkaId: 10000078,
        rarity: RARITY.LEGENDARY,
        element: VISION.DENDRO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: "2-11",
        avatar_icon: "assets/avatar-icon/alhaitham.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/alhaitham/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/alhaitham/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/alhaitham/burst.png", stats: [] }
        }
    },
    {
        id: "Yaoyao",
        enkaId: 10000077,
        rarity: RARITY.EPIC,
        element: VISION.DENDRO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "3-6",
        avatar_icon: "assets/avatar-icon/yaoyao.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/yaoyao/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/yaoyao/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/yaoyao/burst.png", stats: [] }
        }
    }
];