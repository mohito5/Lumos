import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";

export const pyro = [
    {
      id: "Mavuika",
      rarity: RARITY.LEGENDARY,
      element: VISION.PYRO,
      weapon: WEAPON_TYPE.CLAYMORE,
      birthday: "4-1",
      avatar: "assets/avatar/mavuika.png",
      avatar_icon: "assets/avatar-icon/mavuika_icon.png",
      baseStats: {
        [STATS.HP]: [1080, 2800, 5430, 7030, 8900, 10880, 13120, 15620],
        [STATS.ATK]: [29, 75, 145, 188, 238, 291, 351, 418],
        [STATS.DEF]: [54, 140, 272, 352, 445, 545, 657, 782],
      },
      ascensionMaterials: {},
      talents: {
        attack: {
          icon: "assets/char-talent-icon/mavuika/attack.png",
          stats: [
            { id: "a1", valueKey: "damage_multiplier", levels: ["45.6%", "49.0%", "52.4%", "57.4%", "60.8%", "64.2%", "69.2%", "74.2%", "79.2%", "84.2%"] },
            { id: "a2", valueKey: "damage_multiplier", levels: ["46.3%", "49.8%", "53.3%", "58.4%", "61.9%", "65.4%", "70.5%", "75.6%", "80.7%", "85.8%"] },
            { id: "a3", valueKey: "damage_multiplier", levels: ["56.1%", "60.3%", "64.5%", "70.7%", "74.9%", "79.1%", "85.3%", "91.5%", "97.7%", "103.9%"] },
            { id: "a4", valueKey: "damage_multiplier", levels: ["59.8%", "64.3%", "68.8%", "75.4%", "79.9%", "84.4%", "91.0%", "97.6%", "104.2%", "110.8%"] },
            { id: "a5", valueKey: "damage_multiplier", levels: ["71.9%", "77.3%", "82.7%", "90.6%", "96.0%", "101.4%", "109.3%", "117.2%", "125.1%", "133.0%"] },
            { id: "charged", valueKey: "damage_multiplier", levels: ["121%", "130%", "139%", "152%", "161%", "170%", "183%", "196%", "209%", "222%"] }
          ]
        },
        skill: { icon: "assets/char-talent-icon/mavuika/skill.png", stats: [] },
        burst: { icon: "assets/char-talent-icon/mavuika/burst.png", stats: [] }
      }
    },
    {
        id: "HuTao",
        enkaId: 10000046,
        rarity: RARITY.LEGENDARY,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "7-15",
        avatar_icon: "assets/avatar-icon/hutao.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/hutao/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/hutao/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/hutao/burst.png", stats: [] }
        }
    },
    {
        id: "Klee",
        enkaId: 10000029,
        rarity: RARITY.LEGENDARY,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "7-27",
        avatar_icon: "assets/avatar-icon/klee.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/klee/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/klee/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/klee/burst.png", stats: [] }
        }
    },
    {
        id: "Diluc",
        enkaId: 10000016,
        rarity: RARITY.LEGENDARY,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: "4-30",
        avatar_icon: "assets/avatar-icon/diluc.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/diluc/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/diluc/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/diluc/burst.png", stats: [] }
        }
    },
    {
        id: "Yoimiya",
        enkaId: 10000049,
        rarity: RARITY.LEGENDARY,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "6-21",
        avatar_icon: "assets/avatar-icon/yoimiya.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/yoimiya/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/yoimiya/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/yoimiya/burst.png", stats: [] }
        }
    },
    {
        id: "Bennett",
        enkaId: 10000032,
        rarity: RARITY.EPIC,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: "2-29",
        avatar_icon: "assets/avatar-icon/bennett.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/bennett/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/bennett/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/bennett/burst.png", stats: [] }
        }
    },
    {
        id: "Xiangling",
        enkaId: 10000023,
        rarity: RARITY.EPIC,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "11-2",
        avatar_icon: "assets/avatar-icon/xiangling.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/xiangling/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/xiangling/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/xiangling/burst.png", stats: [] }
        }
    },
    {
        id: "Amber",
        enkaId: 10000021,
        rarity: RARITY.EPIC,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "8-10",
        avatar_icon: "assets/avatar-icon/amber.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/amber/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/amber/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/amber/burst.png", stats: [] }
        }
    },
    {
        id: "Xinyan",
        enkaId: 10000044,
        rarity: RARITY.EPIC,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: "10-16",
        avatar_icon: "assets/avatar-icon/xinyan.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/xinyan/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/xinyan/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/xinyan/burst.png", stats: [] }
        }
    },
    {
        id: "Yanfei",
        enkaId: 10000048,
        rarity: RARITY.EPIC,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "7-28",
        avatar_icon: "assets/avatar-icon/yanfei.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/yanfei/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/yanfei/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/yanfei/burst.png", stats: [] }
        }
    },
    {
        id: "Thoma",
        enkaId: 10000050,
        rarity: RARITY.EPIC,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "1-9",
        avatar_icon: "assets/avatar-icon/thoma.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionMaterials: {},
        talents: {
            attack: { icon: "assets/char-talent-icon/thoma/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/thoma/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/thoma/burst.png", stats: [] }
        }
    }
];
