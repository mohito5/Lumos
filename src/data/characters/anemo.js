import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";


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
    id: 'Chasca',
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '1-2',
    avatar_icon: 'assets/avatar-icon/chasca_icon.png',
    baseStats: {
        [STATS.HP]: [762.7, 1978.3, 4403.3, 5685.5, 6819.8, 7960.1, 9108.1, 9796.7],
        [STATS.ATK]: [27, 70, 155.9, 201.3, 241.4, 281.8, 322.4, 346.8],
        [STATS.DEF]: [47.9, 124.2, 276.4, 356.8, 428, 499.6, 571.6, 614.8]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'withering_purpurbloom',
        common_enemy_drops: 'juvenile_fang',
        normal_boss_drops: 'ensnaring_gaze',
        talent_books: 'books_of_conflict',
        weekly_boss_drops: 'silken_feather'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4801, 0.5192, 0.5582, 0.6141, 0.6531, 0.6978, 0.7592, 0.8206, 0.882, 0.949]
                },
                {
                    name: 'hit_2',
                    values: [0.4459, 0.4822, 0.5185, 0.5703, 0.6066, 0.6481, 0.7051, 0.7622, 0.8192, 0.8814]
                },
                {
                    name: 'hit_3',
                    values: [0.297, 0.3211, 0.3453, 0.3799, 0.404, 0.4317, 0.4696, 0.5076, 0.5456, 0.587]
                },
                {
                    name: 'hit_4',
                    values: [0.2547, 0.2754, 0.2961, 0.3257, 0.3465, 0.3702, 0.4027, 0.4353, 0.4679, 0.5034]
                },
                {
                    name: 'aimed_shot',
                    values: [0.4386, 0.4743, 0.51, 0.561, 0.5967, 0.6375, 0.6936, 0.7497, 0.8058, 0.867]
                },
                {
                    name: 'fully_charged_aimed_shot',
                    values: [1.24, 1.333, 1.426, 1.55, 1.643, 1.736, 1.86, 1.984, 2.108, 2.232]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.5683, 0.6145, 0.6608, 0.7269, 0.7731, 0.826, 0.8987, 0.9714, 1.0441, 1.1234]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.1363, 1.2288, 1.3213, 1.4535, 1.5459, 1.6517, 1.797, 1.9423, 2.0877, 2.2462]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'resonance_dmg',
                    values: [0.6, 0.645, 0.69, 0.75, 0.795, 0.84, 0.9, 0.96, 1.02, 1.08]
                },
                {
                    name: 'multitarget_fire_tap_dmg',
                    values: [0.36, 0.387, 0.414, 0.45, 0.477, 0.504, 0.54, 0.576, 0.612, 0.648]
                },
                {
                    name: 'shadowhunt_shell_dmg',
                    values: [0.488, 0.5246, 0.5612, 0.61, 0.6466, 0.6832, 0.732, 0.7808, 0.8296, 0.8784]
                },
                {
                    name: 'shining_shadowhunt_shell_dmg',
                    values: [1.6657, 1.7906, 1.9156, 2.0822, 2.2071, 2.332, 2.4986, 2.6652, 2.8317, 2.9983]
                },
                {
                    name: 'nightsoul_point_limit',
                    values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
                },
                {
                    name: 'cd',
                    values: [6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'galesplitting_soulseeker_shell_dmg',
                    values: [0.88, 0.946, 1.012, 1.1, 1.166, 1.232, 1.32, 1.408, 1.496, 1.584]
                },
                {
                    name: 'soulseeker_shell_dmg',
                    values: [1.034, 1.1116, 1.1891, 1.2925, 1.3701, 1.4476, 1.551, 1.6544, 1.7578, 1.8612]
                },
                {
                    name: 'radiant_soulseeker_shell_dmg',
                    values: [2.068, 2.2231, 2.3782, 2.585, 2.7401, 2.8952, 3.102, 3.3088, 3.5156, 3.7224]
                },
                {
                    name: 'cd',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'energy_cost',
                    values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
                }
            ]
        }
    },
    constellations: {
        c1: {
            icon: ''
        },
        c2: {
            icon: ''
        },
        c3: {
            icon: ''
        },
        c4: {
            icon: ''
        },
        c5: {
            icon: ''
        },
        c6: {
            icon: ''
        }
    },
    passives: {
        passive1: {
            icon: ''
        },
        passive2: {
            icon: ''
        },
        passive3: {
            icon: ''
        }
    }
},
    {
    id: 'KaedeharaKazuha',
    enkaId: 10000047,
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '10-29',
    avatar_icon: 'assets/avatar-icon/kazuha.png',
    baseStats: {
        [STATS.HP]: [1039.1, 2695.5, 5999.5, 7746.5, 9291.9, 10845.6, 12409.7, 13348],
        [STATS.ATK]: [23.1, 59.9, 133.3, 172.1, 206.5, 241, 275.7, 296.6],
        [STATS.DEF]: [62.8, 163, 362.7, 468.3, 561.8, 655.7, 750.3, 807]
    },
    ascensionStat: STATS.ELEMENTAL_MASTERY,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'sea_ganoderma',
        common_enemy_drops: 'treasure_hoarder_insignia',
        normal_boss_drops: 'marionette_core',
        talent_books: 'books_of_diligence',
        weekly_boss_drops: 'gilded_scale'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4498, 0.4864, 0.523, 0.5753, 0.6119, 0.6538, 0.7113, 0.7688, 0.8263, 0.8891]
                },
                {
                    name: 'hit_2',
                    values: [0.4524, 0.4892, 0.526, 0.5786, 0.6154, 0.6575, 0.7154, 0.7732, 0.8311, 0.8942]
                },
                {
                    name: 'hit_3',
                    values: [0.258, 0.279, 0.3, 0.33, 0.351, 0.375, 0.408, 0.441, 0.474, 0.51]
                },
                {
                    name: 'hit_4',
                    values: [0.6072, 0.6566, 0.706, 0.7766, 0.826, 0.8825, 0.9602, 1.0378, 1.1155, 1.2002]
                },
                {
                    name: 'hit_5',
                    values: [0.2537, 0.2744, 0.295, 0.3245, 0.3452, 0.3688, 0.4012, 0.4337, 0.4661, 0.5015]
                },
                {
                    name: 'charged_dmg',
                    values: [0.43, 0.465, 0.5, 0.55, 0.585, 0.625, 0.68, 0.735, 0.79, 0.85]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.8183, 0.8849, 0.9516, 1.0467, 1.1133, 1.1894, 1.2941, 1.3988, 1.5035, 1.6176]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.6363, 1.7695, 1.9027, 2.093, 2.2262, 2.3784, 2.5877, 2.797, 3.0063, 3.2346]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'press_skill_dmg',
                    values: [1.92, 2.064, 2.208, 2.4, 2.544, 2.688, 2.88, 3.072, 3.264, 3.456]
                },
                {
                    name: 'press_cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                },
                {
                    name: 'hold_skill_dmg',
                    values: [2.608, 2.8036, 2.9992, 3.26, 3.4556, 3.6512, 3.912, 4.1728, 4.4336, 4.6944]
                },
                {
                    name: 'hold_cd',
                    values: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'slashing_dmg',
                    values: [2.624, 2.8208, 3.0176, 3.28, 3.4768, 3.6736, 3.936, 4.1984, 4.4608, 4.7232]
                },
                {
                    name: 'dot_dmg',
                    values: [1.2, 1.29, 1.38, 1.5, 1.59, 1.68, 1.8, 1.92, 2.04, 2.16]
                },
                {
                    name: 'additional_elemental_dmg',
                    values: [0.36, 0.387, 0.414, 0.45, 0.477, 0.504, 0.54, 0.576, 0.612, 0.648]
                },
                {
                    name: 'duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: 'cd',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'energy_cost',
                    values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
                }
            ]
        }
    },
    constellations: {
        c1: {
            icon: ''
        },
        c2: {
            icon: ''
        },
        c3: {
            icon: ''
        },
        c4: {
            icon: ''
        },
        c5: {
            icon: ''
        },
        c6: {
            icon: ''
        }
    },
    passives: {
        passive1: {
            icon: ''
        },
        passive2: {
            icon: ''
        },
        passive3: {
            icon: ''
        }
    }
},
    {
    id: 'Venti',
    enkaId: 10000022,
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '6-16',
    avatar_icon: 'assets/avatar-icon/venti.png',
    baseStats: {
        [STATS.HP]: [819.9, 2126.7, 4733.5, 6111.9, 7331.2, 8557.1, 9791.2, 10531.5],
        [STATS.ATK]: [20.5, 53.1, 118.3, 152.7, 183.1, 213.8, 244.6, 263.1],
        [STATS.DEF]: [52.1, 135, 300.5, 388, 465.5, 543.3, 621.6, 668.6]
    },
    ascensionStat: STATS.ENERGY_RECHARGE,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'cecilia',
        common_enemy_drops: 'slime_condensate',
        normal_boss_drops: 'hurricane_seed',
        talent_books: 'books_of_ballad',
        weekly_boss_drops: 'tail_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.2038, 0.2204, 0.237, 0.2607, 0.2773, 0.2963, 0.3223, 0.3484, 0.3745, 0.4029]
                },
                {
                    name: 'hit_2',
                    values: [0.4438, 0.4799, 0.516, 0.5676, 0.6037, 0.645, 0.7018, 0.7585, 0.8153, 0.8772]
                },
                {
                    name: 'hit_3',
                    values: [0.5237, 0.5664, 0.609, 0.6699, 0.7125, 0.7613, 0.8282, 0.8952, 0.9622, 1.0353]
                },
                {
                    name: 'hit_4',
                    values: [0.2606, 0.2818, 0.303, 0.3333, 0.3545, 0.3787, 0.4121, 0.4454, 0.4787, 0.5151]
                },
                {
                    name: 'hit_5',
                    values: [0.5065, 0.5478, 0.589, 0.6479, 0.6891, 0.7363, 0.801, 0.8658, 0.9306, 1.0013]
                },
                {
                    name: 'hit_6',
                    values: [0.7095, 0.7673, 0.825, 0.9075, 0.9653, 1.0313, 1.122, 1.2128, 1.3035, 1.4025]
                },
                {
                    name: 'aimed_shot',
                    values: [0.4386, 0.4743, 0.51, 0.561, 0.5967, 0.6375, 0.6936, 0.7497, 0.8058, 0.867]
                },
                {
                    name: 'fully_charged_aimed_shot',
                    values: [1.24, 1.333, 1.426, 1.55, 1.643, 1.736, 1.86, 1.984, 2.108, 2.232]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.5683, 0.6145, 0.6608, 0.7269, 0.7731, 0.826, 0.8987, 0.9714, 1.0441, 1.1234]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.1363, 1.2288, 1.3213, 1.4535, 1.5459, 1.6517, 1.797, 1.9423, 2.0877, 2.2462]
                },
                {
                    name: 'windsunder_arrow_dmg',
                    values: [1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'press_dmg',
                    values: [2.76, 2.967, 3.174, 3.45, 3.657, 3.864, 4.14, 4.416, 4.692, 4.968]
                },
                {
                    name: 'press_cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                },
                {
                    name: 'hold_dmg',
                    values: [3.8, 4.085, 4.37, 4.75, 5.035, 5.32, 5.7, 6.08, 6.46, 6.84]
                },
                {
                    name: 'hold_cd',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'dot_dmg',
                    values: [0.376, 0.4042, 0.4324, 0.47, 0.4982, 0.5264, 0.564, 0.6016, 0.6392, 0.6768]
                },
                {
                    name: 'additional_elemental_dmg',
                    values: [0.188, 0.2021, 0.2162, 0.235, 0.2491, 0.2632, 0.282, 0.3008, 0.3196, 0.3384]
                },
                {
                    name: 'duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: 'cd',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'energy_cost',
                    values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
                }
            ]
        }
    },
    constellations: {
        c1: {
            icon: ''
        },
        c2: {
            icon: ''
        },
        c3: {
            icon: ''
        },
        c4: {
            icon: ''
        },
        c5: {
            icon: ''
        },
        c6: {
            icon: ''
        }
    },
    passives: {
        passive1: {
            icon: ''
        },
        passive2: {
            icon: ''
        },
        passive3: {
            icon: ''
        }
    }
},
    {
    id: 'Jean',
    enkaId: 10000003,
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '3-14',
    avatar_icon: 'assets/avatar-icon/jean.png',
    baseStats: {
        [STATS.HP]: [1144, 2967.5, 6604.9, 8528.3, 10229.6, 11940.1, 13662.1, 14695.1],
        [STATS.ATK]: [18.6, 48.3, 107.5, 138.8, 166.5, 194.3, 222.4, 239.2],
        [STATS.DEF]: [59.8, 155.2, 345.4, 446, 535, 624.5, 714.5, 768.6]
    },
    ascensionStat: STATS.HEALING_BONUS,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'dandelion_seed',
        common_enemy_drops: 'damaged_mask',
        normal_boss_drops: 'hurricane_seed',
        talent_books: 'books_of_resistance',
        weekly_boss_drops: 'dvalins_plume'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4833, 0.5227, 0.562, 0.6182, 0.6575, 0.7025, 0.7643, 0.8261, 0.888, 0.9554]
                },
                {
                    name: 'hit_2',
                    values: [0.4558, 0.4929, 0.53, 0.583, 0.6201, 0.6625, 0.7208, 0.7791, 0.8374, 0.901]
                },
                {
                    name: 'hit_3',
                    values: [0.6029, 0.6519, 0.701, 0.7711, 0.8202, 0.8763, 0.9534, 1.0305, 1.1076, 1.1917]
                },
                {
                    name: 'hit_4',
                    values: [0.6588, 0.7124, 0.766, 0.8426, 0.8962, 0.9575, 1.0418, 1.126, 1.2103, 1.3022]
                },
                {
                    name: 'hit_5',
                    values: [0.7921, 0.8565, 0.921, 1.0131, 1.0776, 1.1513, 1.2526, 1.3539, 1.4552, 1.5657]
                },
                {
                    name: 'charged_dmg',
                    values: [1.6202, 1.7521, 1.884, 2.0724, 2.2043, 2.355, 2.5622, 2.7695, 2.9767, 3.2028]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.6393, 0.6914, 0.7434, 0.8177, 0.8698, 0.9293, 1.011, 1.0928, 1.1746, 1.2638]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.2784, 1.3824, 1.4865, 1.6351, 1.7392, 1.8581, 2.0216, 2.1851, 2.3486, 2.527]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [2.92, 3.139, 3.358, 3.65, 3.869, 4.088, 4.38, 4.672, 4.964, 5.256]
                },
                {
                    name: 'stamina_consumption',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'max_duration',
                    values: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
                },
                {
                    name: 'cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'burst_dmg',
                    values: [4.248, 4.5666, 4.8852, 5.31, 5.6286, 5.9472, 6.372, 6.7968, 7.2216, 7.6464]
                },
                {
                    name: 'field_entering_exiting_dmg',
                    values: [0.784, 0.8428, 0.9016, 0.98, 1.0388, 1.0976, 1.176, 1.2544, 1.3328, 1.4112]
                },
                {
                    name: 'field_activation_healing',
                    values: [2.512, 2.7004, 2.8888, 3.14, 3.3284, 3.5168, 3.768, 4.0192, 4.2704, 4.5216]
                },
                {
                    name: 'continuous_regeneration',
                    values: [0.2512, 0.27, 0.2889, 0.314, 0.3328, 0.3517, 0.3768, 0.4019, 0.427, 0.4522]
                },
                {
                    name: 'cd',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'energy_cost',
                    values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
                }
            ]
        }
    },
    constellations: {
        c1: {
            icon: ''
        },
        c2: {
            icon: ''
        },
        c3: {
            icon: ''
        },
        c4: {
            icon: ''
        },
        c5: {
            icon: ''
        },
        c6: {
            icon: ''
        }
    },
    passives: {
        passive1: {
            icon: ''
        },
        passive2: {
            icon: ''
        },
        passive3: {
            icon: ''
        }
    }
},
    {
    id: 'Xiao',
    enkaId: 10000026,
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '4-17',
    avatar_icon: 'assets/avatar-icon/xiao.png',
    baseStats: {
        [STATS.HP]: [991.5, 2571.8, 5724.3, 7391.2, 8865.7, 10348.1, 11840.5, 12735.7],
        [STATS.ATK]: [27.2, 70.5, 157, 202.7, 243.1, 283.7, 324.7, 349.2],
        [STATS.DEF]: [62.2, 161.4, 359.3, 463.9, 556.4, 649.4, 743.1, 799.3]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'qingxin',
        common_enemy_drops: 'slime_condensate',
        normal_boss_drops: 'juvenile_jade',
        talent_books: 'books_of_prosperity',
        weekly_boss_drops: 'shadow_of_the_warrior'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.2754, 0.2942, 0.313, 0.338, 0.3568, 0.3787, 0.4069, 0.4351, 0.4632, 0.4914]
                },
                {
                    name: 'hit_2',
                    values: [0.5694, 0.6082, 0.647, 0.6988, 0.7376, 0.7829, 0.8411, 0.8993, 0.9576, 1.0158]
                },
                {
                    name: 'hit_3',
                    values: [0.6855, 0.7323, 0.779, 0.8413, 0.8881, 0.9426, 1.0127, 1.0828, 1.1529, 1.223]
                },
                {
                    name: 'hit_4',
                    values: [0.3766, 0.4023, 0.428, 0.4622, 0.4879, 0.5179, 0.5564, 0.5949, 0.6334, 0.672]
                },
                {
                    name: 'hit_5',
                    values: [0.7154, 0.7642, 0.813, 0.878, 0.9268, 0.9837, 1.0569, 1.1301, 1.2032, 1.2764]
                },
                {
                    name: 'hit_6',
                    values: [0.9583, 1.0237, 1.089, 1.1761, 1.2415, 1.3177, 1.4157, 1.5137, 1.6117, 1.7097]
                },
                {
                    name: 'charged_dmg',
                    values: [1.2109, 1.2934, 1.376, 1.4861, 1.5686, 1.665, 1.7888, 1.9126, 2.0365, 2.1603]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.8183, 0.8849, 0.9516, 1.0467, 1.1133, 1.1894, 1.2941, 1.3988, 1.5035, 1.6176]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.6363, 1.7695, 1.9027, 2.093, 2.2262, 2.3784, 2.5877, 2.797, 3.0063, 3.2346]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [2.528, 2.7176, 2.9072, 3.16, 3.3496, 3.5392, 3.792, 4.0448, 4.2976, 4.5504]
                },
                {
                    name: 'cd',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'normal_charged_plunging_attack_dmg_bonus',
                    values: [0.5845, 0.6195, 0.6545, 0.7, 0.735, 0.77, 0.8155, 0.861, 0.9065, 0.952]
                },
                {
                    name: 'life_drain',
                    values: [0.03, 0.03, 0.03, 0.025, 0.025, 0.025, 0.02, 0.02, 0.02, 0.02]
                },
                {
                    name: 'duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'cd',
                    values: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
                },
                {
                    name: 'energy_cost',
                    values: [70, 70, 70, 70, 70, 70, 70, 70, 70, 70]
                }
            ]
        }
    },
    constellations: {
        c1: {
            icon: ''
        },
        c2: {
            icon: ''
        },
        c3: {
            icon: ''
        },
        c4: {
            icon: ''
        },
        c5: {
            icon: ''
        },
        c6: {
            icon: ''
        }
    },
    passives: {
        passive1: {
            icon: ''
        },
        passive2: {
            icon: ''
        },
        passive3: {
            icon: ''
        }
    }
},
    {
    id: 'Sucrose',
    enkaId: 10000043,
    rarity: RARITY.EPIC,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '11-26',
    avatar_icon: 'assets/avatar-icon/sucrose.png',
    baseStats: {
        [STATS.HP]: [775, 1991, 4261, 5449.6, 6501.2, 7552, 8603.5, 9243.7],
        [STATS.ATK]: [14.2, 36.6, 78.3, 100.2, 119.5, 138.8, 158.2, 169.9],
        [STATS.DEF]: [58.9, 151.4, 324.1, 414.5, 494.4, 574.3, 654.3, 703]
    },
    ascensionStat: STATS.ANEMO_DMG,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'windwheel_aster',
        common_enemy_drops: 'whopperflower_nectar',
        normal_boss_drops: 'hurricane_seed',
        talent_books: 'books_of_freedom',
        weekly_boss_drops: 'spirit_locket_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3346, 0.3597, 0.3848, 0.4183, 0.4434, 0.4685, 0.502, 0.5354, 0.5689, 0.6024]
                },
                {
                    name: 'hit_2',
                    values: [0.3062, 0.3291, 0.3521, 0.3827, 0.4057, 0.4286, 0.4592, 0.4899, 0.5205, 0.5511]
                },
                {
                    name: 'hit_3',
                    values: [0.3845, 0.4133, 0.4422, 0.4806, 0.5094, 0.5383, 0.5767, 0.6152, 0.6536, 0.6921]
                },
                {
                    name: 'hit_4',
                    values: [0.4792, 0.5151, 0.5511, 0.599, 0.6349, 0.6708, 0.7188, 0.7667, 0.8146, 0.8625]
                },
                {
                    name: 'charged_dmg',
                    values: [1.2016, 1.2917, 1.3818, 1.502, 1.5921, 1.6822, 1.8024, 1.9226, 2.0427, 2.1629]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.5683, 0.6145, 0.6608, 0.7269, 0.7731, 0.826, 0.8987, 0.9714, 1.0441, 1.1234]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.1363, 1.2288, 1.3213, 1.4535, 1.5459, 1.6517, 1.797, 1.9423, 2.0877, 2.2462]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [2.112, 2.2704, 2.4288, 2.64, 2.7984, 2.9568, 3.168, 3.3792, 3.5904, 3.8016]
                },
                {
                    name: 'cd',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'dot_dmg',
                    values: [1.48, 1.591, 1.702, 1.85, 1.961, 2.072, 2.22, 2.368, 2.516, 2.664]
                },
                {
                    name: 'additional_elemental_dmg',
                    values: [0.44, 0.473, 0.506, 0.55, 0.583, 0.616, 0.66, 0.704, 0.748, 0.792]
                },
                {
                    name: 'duration',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                },
                {
                    name: 'cd',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'energy_cost',
                    values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
                }
            ]
        }
    },
    constellations: {
        c1: {
            icon: ''
        },
        c2: {
            icon: ''
        },
        c3: {
            icon: ''
        },
        c4: {
            icon: ''
        },
        c5: {
            icon: ''
        },
        c6: {
            icon: ''
        }
    },
    passives: {
        passive1: {
            icon: ''
        },
        passive2: {
            icon: ''
        },
        passive3: {
            icon: ''
        }
    }
},
    {
    id: 'Sayu',
    enkaId: 10000053,
    rarity: RARITY.EPIC,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '1-3',
    avatar_icon: 'assets/avatar-icon/sayu.png',
    baseStats: {
        [STATS.HP]: [993.9, 2553.2, 5464.1, 6988.4, 8336.8, 9684.3, 11032.7, 11853.7],
        [STATS.ATK]: [20.5, 52.6, 112.6, 144, 171.8, 199.6, 227.3, 244.3],
        [STATS.DEF]: [62.4, 160.4, 343.2, 439, 523.7, 608.4, 693.1, 744.6]
    },
    ascensionStat: STATS.ELEMENTAL_MASTERY,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'crystal_marrow',
        common_enemy_drops: 'whopperflower_nectar',
        normal_boss_drops: 'marionette_core',
        talent_books: 'books_of_light',
        weekly_boss_drops: 'gilded_scale'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7224, 0.7812, 0.84, 0.924, 0.9828, 1.05, 1.1424, 1.2348, 1.3272, 1.428]
                },
                {
                    name: 'hit_2',
                    values: [0.7138, 0.7719, 0.83, 0.913, 0.9711, 1.0375, 1.1288, 1.2201, 1.3114, 1.411]
                },
                {
                    name: 'hit_3',
                    values: [0.4343, 0.4697, 0.505, 0.5555, 0.5909, 0.6313, 0.6868, 0.7423, 0.7979, 0.8585]
                },
                {
                    name: 'hit_4',
                    values: [0.9813, 1.0611, 1.141, 1.2551, 1.335, 1.4263, 1.5518, 1.6773, 1.8028, 1.9397]
                },
                {
                    name: 'charged_attack_spinning_dmg',
                    values: [0.6255, 0.6764, 0.7273, 0.8, 0.8509, 0.9091, 0.9891, 1.0691, 1.1491, 1.2364]
                },
                {
                    name: 'charged_attack_final_dmg',
                    values: [1.1309, 1.223, 1.315, 1.4465, 1.5386, 1.6438, 1.7884, 1.9331, 2.0777, 2.2355]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
                },
                {
                    name: 'max_duration',
                    values: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.7459, 0.8066, 0.8673, 0.954, 1.0147, 1.0841, 1.1795, 1.2749, 1.3703, 1.4744]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.4914, 1.6128, 1.7342, 1.9077, 2.0291, 2.1678, 2.3586, 2.5493, 2.7401, 2.9482]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'fuufuu_windwheel_dmg',
                    values: [0.36, 0.387, 0.414, 0.45, 0.477, 0.504, 0.54, 0.576, 0.612, 0.648]
                },
                {
                    name: 'fuufuu_whirlwind_kick_press_dmg',
                    values: [1.584, 1.7028, 1.8216, 1.98, 2.0988, 2.2176, 2.376, 2.5344, 2.6928, 2.8512]
                },
                {
                    name: 'fuufuu_whirlwind_kick_hold_dmg',
                    values: [2.176, 2.3392, 2.5024, 2.72, 2.8832, 3.0464, 3.264, 3.4816, 3.6992, 3.9168]
                },
                {
                    name: 'fuufuu_windwheel_elemental_dmg',
                    values: [0.168, 0.1806, 0.1932, 0.21, 0.2226, 0.2352, 0.252, 0.2688, 0.2856, 0.3024]
                },
                {
                    name: 'fuufuu_whirlwind_kick_elemental_dmg',
                    values: [0.7616, 0.8187, 0.8758, 0.952, 1.0091, 1.0662, 1.1424, 1.2186, 1.2947, 1.3709]
                },
                {
                    name: 'max_duration_hold',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_activation_dmg',
                    values: [1.168, 1.2556, 1.3432, 1.46, 1.5476, 1.6352, 1.752, 1.8688, 1.9856, 2.1024]
                },
                {
                    name: 'skill_activation_healing',
                    values: [0.9216, 0.9907, 1.0598, 1.152, 1.2211, 1.2902, 1.3824, 1.4746, 1.5667, 1.6589]
                },
                {
                    name: 'muji_muji_daruma_dmg',
                    values: [0.52, 0.559, 0.598, 0.65, 0.689, 0.728, 0.78, 0.832, 0.884, 0.936]
                },
                {
                    name: 'muji_muji_daruma_healing',
                    values: [0.7987, 0.8586, 0.9185, 0.9984, 1.0583, 1.1182, 1.1981, 1.278, 1.3578, 1.4377]
                },
                {
                    name: 'duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'cd',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'energy_cost',
                    values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
                }
            ]
        }
    },
    constellations: {
        c1: {
            icon: ''
        },
        c2: {
            icon: ''
        },
        c3: {
            icon: ''
        },
        c4: {
            icon: ''
        },
        c5: {
            icon: ''
        },
        c6: {
            icon: ''
        }
    },
    passives: {
        passive1: {
            icon: ''
        },
        passive2: {
            icon: ''
        },
        passive3: {
            icon: ''
        }
    }
},
    {
    id: 'ShikanoinHeizou',
    enkaId: 10000058,
    rarity: RARITY.EPIC,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '1-4',
    avatar_icon: 'assets/avatar-icon/heizou.png',
    baseStats: {
        [STATS.HP]: [893.6, 2295.5, 4912.6, 6283.1, 7495.5, 8707, 9919.3, 10657.4],
        [STATS.ATK]: [18.9, 48.5, 103.8, 132.7, 158.3, 183.9, 209.5, 225.1],
        [STATS.DEF]: [57.3, 147.3, 315.2, 403.2, 481, 558.7, 636.5, 683.9]
    },
    ascensionStat: STATS.ANEMO_DMG,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'onikabuto',
        common_enemy_drops: 'treasure_hoarder_insignia',
        normal_boss_drops: 'runic_fang',
        talent_books: 'books_of_transience',
        weekly_boss_drops: 'the_meaning_of_aeons'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3747, 0.4028, 0.4309, 0.4684, 0.4965, 0.5246, 0.5621, 0.5996, 0.6371, 0.6745]
                },
                {
                    name: 'hit_2',
                    values: [0.3685, 0.3962, 0.4238, 0.4607, 0.4883, 0.5159, 0.5528, 0.5896, 0.6265, 0.6633]
                },
                {
                    name: 'hit_3',
                    values: [0.5106, 0.5489, 0.5872, 0.6383, 0.6765, 0.7148, 0.7659, 0.817, 0.868, 0.9191]
                },
                {
                    name: 'hit_4',
                    values: [0.1478, 0.1589, 0.17, 0.1848, 0.1959, 0.207, 0.2217, 0.2365, 0.2513, 0.2661]
                },
                {
                    name: 'hit_5',
                    values: [0.6145, 0.6606, 0.7067, 0.7681, 0.8142, 0.8603, 0.9217, 0.9832, 1.0446, 1.1061]
                },
                {
                    name: 'charged_attack',
                    values: [0.73, 0.7847, 0.8395, 0.9125, 0.9673, 1.022, 1.095, 1.168, 1.241, 1.314]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.5683, 0.6145, 0.6608, 0.7269, 0.7731, 0.826, 0.8987, 0.9714, 1.0441, 1.1234]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.1363, 1.2288, 1.3213, 1.4535, 1.5459, 1.6517, 1.797, 1.9423, 2.0877, 2.2462]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [2.2752, 2.4458, 2.6165, 2.844, 3.0146, 3.1853, 3.4128, 3.6403, 3.8678, 4.0954]
                },
                {
                    name: 'declension_dmg_bonus',
                    values: [0.5688, 0.6115, 0.6541, 0.711, 0.7537, 0.7963, 0.8532, 0.9101, 0.967, 1.0238]
                },
                {
                    name: 'conviction_dmg_bonus',
                    values: [1.1376, 1.2229, 1.3082, 1.422, 1.5073, 1.5926, 1.7064, 1.8202, 1.9339, 2.0477]
                },
                {
                    name: 'declension_duration',
                    values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
                },
                {
                    name: 'cd',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'fudou_style_vacuum_slugger_dmg',
                    values: [3.1469, 3.3829, 3.6189, 3.9336, 4.1696, 4.4056, 4.7203, 5.035, 5.3497, 5.6644]
                },
                {
                    name: 'windmuster_iris_dmg',
                    values: [0.2146, 0.2307, 0.2467, 0.2682, 0.2843, 0.3004, 0.3218, 0.3433, 0.3648, 0.3862]
                },
                {
                    name: 'cd',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'energy_cost',
                    values: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
                }
            ]
        }
    },
    constellations: {
        c1: {
            icon: ''
        },
        c2: {
            icon: ''
        },
        c3: {
            icon: ''
        },
        c4: {
            icon: ''
        },
        c5: {
            icon: ''
        },
        c6: {
            icon: ''
        }
    },
    passives: {
        passive1: {
            icon: ''
        },
        passive2: {
            icon: ''
        },
        passive3: {
            icon: ''
        }
    }
},
    {
    id: 'Faruzan',
    enkaId: 10000076,
    rarity: RARITY.EPIC,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '1-5',
    avatar_icon: 'assets/avatar-icon/faruzan.png',
    baseStats: {
        [STATS.HP]: [802.4, 2061.3, 4411.3, 5642, 6730.6, 7818.5, 8907.2, 9569.9],
        [STATS.ATK]: [16.5, 42.3, 90.6, 115.8, 138.2, 160.5, 182.9, 196.5],
        [STATS.DEF]: [52.6, 135.3, 289.4, 370.2, 441.6, 513, 584.4, 627.9]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'henna_berry',
        common_enemy_drops: 'faded_red_satin',
        normal_boss_drops: 'light_guiding_tetrahedron',
        talent_books: 'books_of_admonition',
        weekly_boss_drops: 'puppet_strings'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4473, 0.4837, 0.5201, 0.5721, 0.6085, 0.6501, 0.7074, 0.7646, 0.8218, 0.8842]
                },
                {
                    name: 'hit_2',
                    values: [0.4219, 0.4562, 0.4905, 0.5396, 0.5739, 0.6132, 0.6671, 0.7211, 0.7751, 0.8339]
                },
                {
                    name: 'hit_3',
                    values: [0.5316, 0.5749, 0.6182, 0.68, 0.7233, 0.7727, 0.8407, 0.9087, 0.9767, 1.0509]
                },
                {
                    name: 'hit_4',
                    values: [0.7062, 0.7637, 0.8212, 0.9033, 0.9608, 1.0265, 1.1168, 1.2071, 1.2974, 1.396]
                },
                {
                    name: 'aimed_shot',
                    values: [0.4386, 0.4743, 0.51, 0.561, 0.5967, 0.6375, 0.6936, 0.7497, 0.8058, 0.867]
                },
                {
                    name: 'fully_charged_aimed_shot',
                    values: [1.24, 1.333, 1.426, 1.55, 1.643, 1.736, 1.86, 1.984, 2.108, 2.232]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.5683, 0.6145, 0.6608, 0.7269, 0.7731, 0.826, 0.8987, 0.9714, 1.0441, 1.1234]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.1363, 1.2288, 1.3213, 1.4535, 1.5459, 1.6517, 1.797, 1.9423, 2.0877, 2.2462]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [1.488, 1.5996, 1.7112, 1.86, 1.9716, 2.0832, 2.232, 2.3808, 2.5296, 2.6784]
                },
                {
                    name: 'pressurized_collapse_vortex_dmg',
                    values: [1.08, 1.161, 1.242, 1.35, 1.431, 1.512, 1.62, 1.728, 1.836, 1.944]
                },
                {
                    name: 'manifest_gale_duration',
                    values: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
                },
                {
                    name: 'cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [3.776, 4.0592, 4.3424, 4.72, 5.0032, 5.2864, 5.664, 6.0416, 6.4192, 6.7968]
                },
                {
                    name: 'anemo_dmg_bonus',
                    values: [0.18, 0.1935, 0.207, 0.225, 0.2385, 0.252, 0.27, 0.288, 0.306, 0.324]
                },
                {
                    name: 'prayerful_winds_benefit_duration',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                {
                    name: 'anemo_res_decrease',
                    values: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
                },
                {
                    name: 'perfidious_winds_bale_duration',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                {
                    name: 'duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'cd',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'energy_cost',
                    values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
                }
            ]
        }
    },
    constellations: {
        c1: {
            icon: ''
        },
        c2: {
            icon: ''
        },
        c3: {
            icon: ''
        },
        c4: {
            icon: ''
        },
        c5: {
            icon: ''
        },
        c6: {
            icon: ''
        }
    },
    passives: {
        passive1: {
            icon: ''
        },
        passive2: {
            icon: ''
        },
        passive3: {
            icon: ''
        }
    }
},
];
