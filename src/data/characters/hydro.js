import { RARITY, VISION, WEAPON_TYPE } from "../../app/constants";
import { STATS } from "../../app/stats.js";

export const hydro = [
    {
      id: "Ayato",
      enkaId: 10000066,
      rarity: RARITY.LEGENDARY,
      element: VISION.HYDRO,
      weapon: WEAPON_TYPE.SWORD,
      birthday: "3-26",
      avatar: "assets/avatar/ayato.png",
      avatar_icon: "assets/avatar-icon/ayato-icon.png",
      baseStats: {
        [STATS.HP]: [1060, 2750, 5330, 6900, 8730, 10670, 12870, 15320],
        [STATS.ATK]: [30, 78, 151, 196, 248, 303, 365, 435],
        [STATS.DEF]: [61, 158, 307, 397, 502, 614, 741, 882],
      },
      ascensionMaterials: {},
      talents: {
        attack: { icon: "assets/char-talent-icon/ayato/attack.png", stats: [] },
        skill: { icon: "assets/char-talent-icon/ayato/skill.png", stats: [] },
        burst: { icon: "assets/char-talent-icon/ayato/burst.png", stats: [] }
      }
    },
    {
        id: "Yelan",
        enkaId: 10000060,
        rarity: RARITY.LEGENDARY,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "4-20",
        avatar_icon: "assets/avatar-icon/yelan.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/yelan/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/yelan/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/yelan/burst.png", stats: [] }
        }
    },
    {
        id: "SangonomiyaKokomi",
        enkaId: 10000054,
        rarity: RARITY.LEGENDARY,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "2-22",
        avatar_icon: "assets/avatar-icon/kokomi.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/sangonomiyakokomi/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/sangonomiyakokomi/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/sangonomiyakokomi/burst.png", stats: [] }
        }
    },
    {
        id: "Mona",
        enkaId: 10000041,
        rarity: RARITY.LEGENDARY,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "8-31",
        avatar_icon: "assets/avatar-icon/mona.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/mona/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/mona/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/mona/burst.png", stats: [] }
        }
    },
    {
        id: "Tartaglia",
        enkaId: 10000033,
        rarity: RARITY.LEGENDARY,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "7-20",
        avatar_icon: "assets/avatar-icon/tartaglia.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/tartaglia/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/tartaglia/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/tartaglia/burst.png", stats: [] }
        }
    },
    {
        id: "Xingqiu",
        enkaId: 10000025,
        rarity: RARITY.EPIC,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: "10-9",
        avatar_icon: "assets/avatar-icon/xingqiu.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/xingqiu/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/xingqiu/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/xingqiu/burst.png", stats: [] }
        }
    },
    {
        id: "Barbara",
        enkaId: 10000014,
        rarity: RARITY.EPIC,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "7-5",
        avatar_icon: "assets/avatar-icon/barbara.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/barbara/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/barbara/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/barbara/burst.png", stats: [] }
        }
    },
    {
        id: "Candace",
        enkaId: 10000072,
        rarity: RARITY.EPIC,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "5-3",
        avatar_icon: "assets/avatar-icon/candace.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/candace/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/candace/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/candace/burst.png", stats: [] }
        }
    },
    {
        id: "Nilou",
        enkaId: 10000070,
        rarity: RARITY.LEGENDARY,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: "12-3",
        avatar_icon: "assets/avatar-icon/nilou.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/nilou/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/nilou/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/nilou/burst.png", stats: [] }
        }
    }
];