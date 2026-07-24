import { RARITY, VISION, WEAPON_TYPE } from "../../app/constants";
import { STATS } from "../../app/stats.js";

export const geo = [
    {
      id: "Chiori",
      enkaId: 10000095,
      rarity: RARITY.LEGENDARY,
      element: VISION.GEO,
      weapon: WEAPON_TYPE.SWORD,
      birthday: "8-17",
      avatar: "assets/avatar/chiori.png",
      avatar_icon: "assets/avatar-icon/chiori_icon.png",
      baseStats: {
        [STATS.HP]: [1050, 2720, 5280, 6840, 8650, 10580, 12760, 15190],
        [STATS.ATK]: [28, 73, 141, 183, 231, 283, 341, 406],
        [STATS.DEF]: [65, 168, 326, 422, 534, 653, 787, 937],
      },
      ascensionMaterials: {},
      talents: {
        attack: { icon: "assets/char-talent-icon/chiori/attack.png", stats: [] },
        skill: { icon: "assets/char-talent-icon/chiori/skill.png", stats: [] },
        burst: { icon: "assets/char-talent-icon/chiori/burst.png", stats: [] }
      }
    },
    {
        id: "Zhongli",
        enkaId: 10000030,
        rarity: RARITY.LEGENDARY,
        element: VISION.GEO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "12-31",
        avatar_icon: "assets/avatar-icon/zhongli.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/zhongli/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/zhongli/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/zhongli/burst.png", stats: [] }
        }
    },
    {
        id: "Albedo",
        enkaId: 10000038,
        rarity: RARITY.LEGENDARY,
        element: VISION.GEO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: "9-13",
        avatar_icon: "assets/avatar-icon/albedo.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/albedo/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/albedo/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/albedo/burst.png", stats: [] }
        }
    },
    {
        id: "AratakiItto",
        enkaId: 10000056,
        rarity: RARITY.LEGENDARY,
        element: VISION.GEO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: "6-1",
        avatar_icon: "assets/avatar-icon/itto.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/aratakiitto/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/aratakiitto/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/aratakiitto/burst.png", stats: [] }
        }
    },
    {
        id: "Ningguang",
        enkaId: 10000027,
        rarity: RARITY.EPIC,
        element: VISION.GEO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "8-26",
        avatar_icon: "assets/avatar-icon/ningguang.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/ningguang/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/ningguang/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/ningguang/burst.png", stats: [] }
        }
    },
    {
        id: "Noelle",
        enkaId: 10000034,
        rarity: RARITY.EPIC,
        element: VISION.GEO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: "3-21",
        avatar_icon: "assets/avatar-icon/noelle.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/noelle/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/noelle/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/noelle/burst.png", stats: [] }
        }
    },
    {
        id: "Gorou",
        enkaId: 10000055,
        rarity: RARITY.EPIC,
        element: VISION.GEO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "5-18",
        avatar_icon: "assets/avatar-icon/gorou.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/gorou/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/gorou/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/gorou/burst.png", stats: [] }
        }
    },
    {
        id: "YunJin",
        enkaId: 10000064,
        rarity: RARITY.EPIC,
        element: VISION.GEO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "5-21",
        avatar_icon: "assets/avatar-icon/yunjin.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/yunjin/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/yunjin/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/yunjin/burst.png", stats: [] }
        }
    }
];