import { RARITY, VISION, WEAPON_TYPE } from "../../app/constants";
import { STATS } from "../../app/stats.js";

export const electro = [
    {
      id: "Flins",
      enkaId: 10000120,
      rarity: RARITY.LEGENDARY,
      element: VISION.ELECTRO,
      weapon: WEAPON_TYPE.POLEARM,
      region: "Snezhnaya",
      birthday: "12-21",
      avatar: "assets/avatar/Flins_Profile.webp",
      avatar_enka: "assets/wish/flins_enka.png",
      avatar_icon: "assets/avatar-icon/flins-icon.png",
      baseStats: {
        [STATS.HP]: [1020, 2642, 5128, 6635, 8389, 10245, 12347, 14695],
        [STATS.ATK]: [27, 70, 136, 176, 223, 272, 328, 391],
        [STATS.DEF]: [62, 160, 310, 402, 508, 621, 749, 892],
      },
      talents: {
        attack: { icon: "assets/char-talent-icon/flins/attack.png", stats: [] },
        skill: { icon: "assets/char-talent-icon/flins/skill.png", stats: [] },
        burst: { icon: "assets/char-talent-icon/flins/burst.png", stats: [] }
      },
      constellations: {
        c1: { icon: "" },
        c2: { icon: "" },
        c3: { icon: "" },
        c4: { icon: "" },
        c5: { icon: "" },
        c6: { icon: "" }
      },
      ascensionMaterials: {}
    },
    {
        id: "RaidenShogun",
        enkaId: 10000052,
        rarity: RARITY.LEGENDARY,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "6-26",
        avatar_icon: "assets/avatar-icon/raiden.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/raidenshogun/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/raidenshogun/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/raidenshogun/burst.png", stats: [] }
        }
    },
    {
        id: "YaeMiko",
        enkaId: 10000057,
        rarity: RARITY.LEGENDARY,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "6-27",
        avatar_icon: "assets/avatar-icon/yae.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/yaemiko/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/yaemiko/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/yaemiko/burst.png", stats: [] }
        }
    },
    {
        id: "Keqing",
        enkaId: 10000042,
        rarity: RARITY.LEGENDARY,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: "11-20",
        avatar_icon: "assets/avatar-icon/keqing.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/keqing/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/keqing/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/keqing/burst.png", stats: [] }
        }
    },
    {
        id: "Cyno",
        enkaId: 10000071,
        rarity: RARITY.LEGENDARY,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "6-23",
        avatar_icon: "assets/avatar-icon/cyno.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/cyno/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/cyno/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/cyno/burst.png", stats: [] }
        }
    },
    {
        id: "Fischl",
        enkaId: 10000031,
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "5-27",
        avatar_icon: "assets/avatar-icon/fischl.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/fischl/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/fischl/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/fischl/burst.png", stats: [] }
        }
    },
    {
        id: "Beidou",
        enkaId: 10000024,
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: "2-14",
        avatar_icon: "assets/avatar-icon/beidou.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/beidou/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/beidou/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/beidou/burst.png", stats: [] }
        }
    },
    {
        id: "KujouSara",
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "7-14",
        avatar_icon: "assets/avatar-icon/sara.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/kujousara/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/kujousara/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/kujousara/burst.png", stats: [] }
        }
    },
    {
        id: "Razor",
        enkaId: 10000020,
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: "9-9",
        avatar_icon: "assets/avatar-icon/razor.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/razor/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/razor/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/razor/burst.png", stats: [] }
        }
    },
    {
        id: "Lisa",
        enkaId: 10000006,
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "6-9",
        avatar_icon: "assets/avatar-icon/lisa.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/lisa/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/lisa/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/lisa/burst.png", stats: [] }
        }
    },
    {
        id: "Dori",
        enkaId: 10000068,
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: "12-21",
        avatar_icon: "assets/avatar-icon/dori.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/dori/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/dori/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/dori/burst.png", stats: [] }
        }
    }
];