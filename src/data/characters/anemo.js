import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../app/constants.js";
import { STATS } from "../../app/stats.js";

export const anemo = [
    {
      id: "Varka",
      enkaId: 10000128,
      rarity: RARITY.LEGENDARY,
      element: VISION.ANEMO,
      weapon: WEAPON_TYPE.CLAYMORE,
      birthday: "1-1",
      avatar: "assets/avatar/Varka_Profile.webp",
      avatar_enka: "assets/wish/varka_enka.png",
      avatar_icon: "assets/avatar-icon/varka.webp",
      baseStats: {
        [STATS.HP]: [980, 2540, 3382, 4920, 5599, 6370, 7049, 8060, 8740, 9850, 10530, 11870, 12550, 14120],
        [STATS.ATK]: [26, 68, 90, 131, 149, 170, 188, 215, 233, 263, 281, 317, 335, 377],
        [STATS.DEF]: [59, 153, 203, 297, 338, 385, 426, 487, 528, 595, 636, 717, 758, 854],
      },
      ascensionStat: STATS.ATK_PERCENT,
      ascensionMaterials: {
        [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.VAYUDA_TURQUOISE,
        [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.PRISMATIC_SEVERED_TAIL,
        [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.WOLFHOOK,
        [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_FREEDOM,
        [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.SLIME_MATERIALS,
        [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.ASCENDED_SAMPLE_QUEEN
      },
      talents: {
        attack: { 
          icon: "assets/char-talent-icon/varka/attack.png", 
          stats: [
            { name: "hit_1", values: [80.5, 87.1, 93.7, 102.4, 109.0, 116.5, 126.3, 136.1, 145.9, 156.8] },
            { name: "hit_2", values: [78.2, 84.6, 91.0, 99.5, 105.9, 113.2, 122.7, 132.2, 141.7, 152.3] },
            { name: "hit_3", values: [95.4, 103.2, 111.0, 121.4, 129.2, 138.1, 149.7, 161.3, 172.9, 185.8] },
            { name: "hit_4", values: [110.3, 119.3, 128.3, 140.3, 149.3, 159.6, 173.1, 186.5, 199.9, 214.9] },
            { name: "charged_dmg", values: [65.2, 70.5, 75.8, 82.9, 88.2, 94.3, 102.2, 110.2, 118.1, 127.0] },
            { name: "plunge_dmg", values: [74.6, 80.7, 86.8, 94.9, 101.0, 108.0, 117.1, 126.3, 135.4, 145.5] }
          ] 
        },
        skill: { 
          icon: "assets/char-talent-icon/varka/skill.png", 
          stats: [
            { name: "skill_dmg", values: [215, 231, 247, 269, 285, 303, 327, 351, 375, 403] },
            { name: "atk_speed_bonus", values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15] },
            { name: "duration", values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12] },
            { name: "cd", values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15] }
          ] 
        },
        burst: { 
          icon: "assets/char-talent-icon/varka/burst.png", 
          stats: [
            { name: "burst_dmg", values: [420, 452, 484, 525, 557, 593, 641, 689, 736, 792] },
            { name: "energy_cost", values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80] },
            { name: "cd", values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20] }
          ] 
        }
      }
    },
    {
      id: "Chasca",
      rarity: RARITY.LEGENDARY,
      element: VISION.ANEMO,
      weapon: WEAPON_TYPE.BOW,
      birthday: "1-2",
      avatar: "assets/avatar/chasca.png",
      avatar_icon: "assets/avatar-icon/chasca_icon.png",
      baseStats: {
        [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
        [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
        [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
      },
      ascensionStat: STATS.ATK_PERCENT,
      ascensionMaterials: {
        talentBook: MATERIAL_FAMILY.VAGRANCY,
        localSpecialty: 'frostlamp_flower',
        enemyDrops: MATERIAL_FAMILY.SHAFT,
        bossMaterial: 'drugkrumkake',
        weeklyBossMaterial: 'ascended_sample_queen'
      },
      talents: {
        attack: { icon: "assets/char-talent-icon/chasca/attack.png", stats: [] },
        skill: { icon: "assets/char-talent-icon/chasca/skill.png", stats: [] },
        burst: { icon: "assets/char-talent-icon/chasca/burst.png", stats: [] }
      }
    },
    {
        id: "KaedeharaKazuha",
        enkaId: 10000047,
        rarity: RARITY.LEGENDARY,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: "10-29",
        avatar_icon: "assets/avatar-icon/kazuha.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionStat: STATS.ELEMENTAL_MASTERY,
        ascensionMaterials: {
            talentBook: 'diligence',
            localSpecialty: 'sea_ganoderma',
            enemyDrops: 'insignia',
            bossMaterial: 'maguu_kenki',
            weeklyBossMaterial: 'gilded_scale'
        },
        talents: {
            attack: { icon: "assets/char-talent-icon/kaedeharakazuha/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/kaedeharakazuha/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/kaedeharakazuha/burst.png", stats: [] }
        }
    },
    {
        id: "Venti",
        enkaId: 10000022,
        rarity: RARITY.LEGENDARY,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "6-16",
        avatar_icon: "assets/avatar-icon/venti.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionStat: STATS.ENERGY_RECHARGE,
        ascensionMaterials: {
            talentBook: 'ballad',
            localSpecialty: 'cecilia',
            enemyDrops: 'slime',
            bossMaterial: 'hurricane_seed',
            weeklyBossMaterial: 'tail_of_boreas'
        },
        talents: {
            attack: { icon: "assets/char-talent-icon/venti/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/venti/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/venti/burst.png", stats: [] }
        }
    },
    {
        id: "Jean",
        enkaId: 10000003,
        rarity: RARITY.LEGENDARY,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: "3-14",
        avatar_icon: "assets/avatar-icon/jean.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionStat: STATS.HEALING_BONUS,
        ascensionMaterials: {
            talentBook: 'resistance',
            localSpecialty: 'dandelion_seed',
            enemyDrops: 'mask',
            bossMaterial: 'hurricane_seed',
            weeklyBossMaterial: 'dvalins_plume'
        },
        talents: {
            attack: { icon: "assets/char-talent-icon/jean/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/jean/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/jean/burst.png", stats: [] }
        }
    },
    {
        id: "Xiao",
        enkaId: 10000026,
        rarity: RARITY.LEGENDARY,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: "4-17",
        avatar_icon: "assets/avatar-icon/xiao.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionStat: STATS.CRIT_RATE,
        ascensionMaterials: {
            talentBook: 'prosperity',
            localSpecialty: 'qingxin',
            enemyDrops: 'slime',
            bossMaterial: 'juvenile_jade',
            weeklyBossMaterial: 'shadow_of_the_warrior'
        },
        talents: {
            attack: { icon: "assets/char-talent-icon/xiao/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/xiao/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/xiao/burst.png", stats: [] }
        }
    },
    {
        id: "Sucrose",
        enkaId: 10000043,
        rarity: RARITY.EPIC,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "11-26",
        avatar_icon: "assets/avatar-icon/sucrose.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionStat: STATS.ANEMO_DMG,
        ascensionMaterials: {
            talentBook: 'freedom',
            localSpecialty: 'windwheel_aster',
            enemyDrops: 'nectar',
            bossMaterial: 'hurricane_seed',
            weeklyBossMaterial: 'spirit_locket_of_boreas'
        },
        talents: {
            attack: { icon: "assets/char-talent-icon/sucrose/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/sucrose/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/sucrose/burst.png", stats: [] }
        }
    },
    {
        id: "Sayu",
        enkaId: 10000053,
        rarity: RARITY.EPIC,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: "1-3",
        avatar_icon: "assets/avatar-icon/sayu.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionStat: STATS.ELEMENTAL_MASTERY,
        ascensionMaterials: {
            talentBook: 'light',
            localSpecialty: 'crystal_marrow',
            enemyDrops: 'nectar',
            bossMaterial: 'maguu_kenki',
            weeklyBossMaterial: 'gilded_scale'
        },
        talents: {
            attack: { icon: "assets/char-talent-icon/sayu/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/sayu/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/sayu/burst.png", stats: [] }
        }
    },
    {
        id: "ShikanoinHeizou",
        enkaId: 10000058,
        rarity: RARITY.EPIC,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: "1-4",
        avatar_icon: "assets/avatar-icon/heizou.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionStat: STATS.ANEMO_DMG,
        ascensionMaterials: {
            talentBook: 'transience',
            localSpecialty: 'onikabuto',
            enemyDrops: 'insignia',
            bossMaterial: 'runic_fang',
            weeklyBossMaterial: 'the_meaning_of_aeons'
        },
        talents: {
            attack: { icon: "assets/char-talent-icon/shikanoinheizou/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/shikanoinheizou/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/shikanoinheizou/burst.png", stats: [] }
        }
    },
    {
        id: "Faruzan",
        enkaId: 10000076,
        rarity: RARITY.EPIC,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.BOW,
        birthday: "1-5",
        avatar_icon: "assets/avatar-icon/faruzan.png",
        baseStats: {
            [STATS.HP]: [980, 2540, 4920, 6370, 8060, 9850, 11870, 14120],
            [STATS.ATK]: [26, 68, 131, 170, 215, 263, 317, 377],
            [STATS.DEF]: [59, 153, 297, 385, 487, 595, 717, 854],
        },
        ascensionStat: STATS.ATK_PERCENT,
        ascensionMaterials: {
            talentBook: 'admonition',
            localSpecialty: 'henna_berry',
            enemyDrops: 'satin',
            bossMaterial: 'light_guiding_tetrahedron',
            weeklyBossMaterial: 'puppet_strings'
        },
        talents: {
            attack: { icon: "assets/char-talent-icon/faruzan/attack.png", stats: [] },
            skill: { icon: "assets/char-talent-icon/faruzan/skill.png", stats: [] },
            burst: { icon: "assets/char-talent-icon/faruzan/burst.png", stats: [] }
        }
    }
];