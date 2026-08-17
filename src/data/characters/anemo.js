import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { MATERIAL_TYPE } from "../../shared/config/material_type.js";
import { STATS } from "../../shared/config/stats.js";


export const anemo = [
    // #Varka
    {
    id: 'Varka',
    enkaId: 10000128,
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '1-1',
    avatar: 'assets/avatar/Varka_Profile.webp',
    avatar_enka: 'assets/enka/varka_enka.png',
    avatar_icon: 'assets/avatar-icon/varka.webp',
    baseStats: {
        [STATS.HP]: [981.9, 2547.1, 5669.2, 7320.1, 8780.4, 10248.6, 11726.6, 12613.3],
        [STATS.ATK]: [27.5, 71.2, 158.6, 204.7, 245.6, 286.6, 328, 352.8],
        [STATS.DEF]: [61.9, 160.6, 357.5, 461.6, 553.7, 646.3, 739.5, 795.5]
    },
    ascensionStat: STATS.CRIT_DMG,
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
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.6546, 0.7079, 0.7612, 0.8373, 0.8906, 0.9515, 1.0352, 1.1189, 1.2026, 1.294]
                },
                {
                    name: 'hit_2',
                    values: [0.2399, 0.2594, 0.2789, 0.3068, 0.3264, 0.3487, 0.3794, 0.41, 0.4407, 0.4742]
                },
                {
                    name: 'hit_3',
                    values: [0.3244, 0.3508, 0.3772, 0.4149, 0.4413, 0.4715, 0.5129, 0.5544, 0.5959, 0.6412]
                },
                {
                    name: 'hit_4',
                    values: [0.5543, 0.5994, 0.6446, 0.709, 0.7541, 0.8057, 0.8766, 0.9475, 1.0184, 1.0957]
                },
                {
                    name: 'hit_5',
                    values: [0.6975, 0.7543, 0.811, 0.8921, 0.9489, 1.0138, 1.103, 1.1922, 1.2815, 1.3788]
                },
                {
                    name: 'charged_dmg',
                    values: [0.8564, 0.9261, 0.9958, 1.0954, 1.1651, 1.2448, 1.3543, 1.4638, 1.5734, 1.6929]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
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
                    name: 'skill_dmg',
                    values: [2.784, 2.9928, 3.2016, 3.48, 3.6888, 3.8976, 4.176, 4.4544, 4.7328, 5.0112]
                },
                {
                    name: 'press_cd',
                    values: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
                },
                {
                    name: 'hold_cd',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: 'sturm_und_drang_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'sturm_und_drang_1_hit_dmg',
                    values: [0.8182, 0.8848, 0.9515, 1.0466, 1.1132, 1.1893, 1.294, 1.3986, 1.5033, 1.6175]
                },
                {
                    name: 'sturm_und_drang_2_hit_dmg',
                    values: [0.2999, 0.3243, 0.3487, 0.3835, 0.4079, 0.4358, 0.4742, 0.5125, 0.5509, 0.5927]
                },
                {
                    name: 'sturm_und_drang_3_hit_dmg',
                    values: [0.4055, 0.4385, 0.4715, 0.5186, 0.5516, 0.5893, 0.6412, 0.693, 0.7449, 0.8015]
                },
                {
                    name: 'sturm_und_drang_4_hit_dmg',
                    values: [0.6929, 0.7493, 0.8057, 0.8863, 0.9427, 1.0071, 1.0957, 1.1844, 1.273, 1.3697]
                },
                {
                    name: 'sturm_und_drang_5_hit_dmg',
                    values: [0.8719, 0.9428, 1.0138, 1.1152, 1.1862, 1.2673, 1.3788, 1.4903, 1.6018, 1.7235]
                },
                {
                    name: 'sturm_und_drang_charged_attack_dmg',
                    values: [1.0705, 1.1576, 1.2448, 1.3692, 1.4564, 1.5559, 1.6929, 1.8298, 1.9667, 2.1161]
                },
                {
                    name: 'four_winds_ascension_dmg',
                    values: [1.7576, 1.8894, 2.0212, 2.197, 2.3288, 2.4606, 2.6364, 2.8122, 2.9879, 3.1637]
                },
                {
                    name: 'azure_devour_dmg',
                    values: [0.936, 1.0062, 1.0764, 1.17, 1.2402, 1.3104, 1.404, 1.4976, 1.5912, 1.6848]
                },
                {
                    name: 'four_winds_ascension_cd',
                    values: [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_1_hit_dmg',
                    values: [3.3696, 3.6223, 3.875, 4.212, 4.4647, 4.7174, 5.0544, 5.3914, 5.7283, 6.0653]
                },
                {
                    name: 'skill_2_hit_dmg',
                    values: [1.8144, 1.9505, 2.0866, 2.268, 2.4041, 2.5402, 2.7216, 2.903, 3.0845, 3.2659]
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
    id: 'Chasca',
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '12-10',
    avatar: 'assets/avatar/Chasca_Profile.webp',
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
{
    id: 'Ifa',
    enkaId: 10000113,
    rarity: RARITY.EPIC,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '3-23',
    baseStats: {
        [STATS.HP]: [845.2, 2171.4, 4646.9, 5943.3, 7090.1, 8236.1, 9382.9, 10081],
        [STATS.ATK]: [15, 38.4, 82.2, 105.2, 125.5, 145.8, 166.1, 178.4],
        [STATS.DEF]: [50.8, 130.4, 279.1, 356.9, 425.8, 494.6, 563.5, 605.4]
    },
    ascensionStat: STATS.ELEMENTAL_MASTERY,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'saurian_claw_succulent',
        common_enemy_drops: 'juvenile_fang',
        normal_boss_drops: 'sparkless_statue_core',
        talent_books: 'books_of_conflict',
        weekly_boss_drops: 'ascended_sample_rook'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5361, 0.5763, 0.6165, 0.6701, 0.7103, 0.7505, 0.8041, 0.8577, 0.9113, 0.9649]
                },
                {
                    name: 'hit_2',
                    values: [0.4747, 0.5103, 0.5459, 0.5933, 0.6289, 0.6645, 0.712, 0.7595, 0.8069, 0.8544]
                },
                {
                    name: 'hit_3',
                    values: [0.7476, 0.8037, 0.8597, 0.9345, 0.9905, 1.0466, 1.1214, 1.1961, 1.2709, 1.3457]
                },
                {
                    name: 'charged_dmg',
                    values: [1.4704, 1.5807, 1.691, 1.838, 1.9483, 2.0586, 2.2056, 2.3526, 2.4997, 2.6467]
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
                    name: 'tonicshot_dmg',
                    values: [1.3336, 1.4336, 1.5336, 1.667, 1.767, 1.867, 2.0004, 2.1338, 2.2671, 2.4005]
                },
                {
                    name: 'tonicshot_healing_on_hit',
                    values: [0.2016, 0.2167, 0.2318, 0.252, 0.2671, 0.2822, 0.3024, 0.3226, 0.3427, 0.3629]
                },
                {
                    name: 'nightsoul_point_limit',
                    values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
                },
                {
                    name: 'cd',
                    values: [7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [5.0848, 5.4662, 5.8475, 6.356, 6.7374, 7.1187, 7.6272, 8.1357, 8.6442, 9.1526]
                },
                {
                    name: 'sedation_mark_dmg',
                    values: [1.0896, 1.1713, 1.253, 1.362, 1.4437, 1.5254, 1.6344, 1.7434, 1.8523, 1.9613]
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
}
,
{
    id: 'Yumemizuki',
    enkaId: 10000109,
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '3-16',
    baseStats: {
        [STATS.HP]: [991.5, 2571.8, 5724.3, 7391.2, 8865.7, 10348.1, 11840.5, 12735.7],
        [STATS.ATK]: [16.8, 43.5, 96.8, 124.9, 149.8, 174.9, 200.1, 215.3],
        [STATS.DEF]: [58.9, 152.9, 340.3, 439.3, 527, 615.1, 703.8, 757]
    },
    ascensionStat: STATS.ELEMENTAL_MASTERY,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'sea_ganoderma',
        common_enemy_drops: 'old_handguard',
        normal_boss_drops: 'talisman_of_the_enigmatic_land',
        talent_books: 'books_of_transience',
        weekly_boss_drops: 'fading_candle'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5228, 0.562, 0.6012, 0.6535, 0.6927, 0.7319, 0.7842, 0.8364, 0.8887, 0.941]
                },
                {
                    name: 'hit_2',
                    values: [0.4691, 0.5043, 0.5395, 0.5864, 0.6216, 0.6568, 0.7037, 0.7506, 0.7975, 0.8445]
                },
                {
                    name: 'hit_3',
                    values: [0.7137, 0.7672, 0.8207, 0.8921, 0.9456, 0.9992, 1.0705, 1.1419, 1.2133, 1.2846]
                },
                {
                    name: 'charged_dmg',
                    values: [1.3, 1.3975, 1.495, 1.625, 1.7225, 1.82, 1.95, 2.08, 2.21, 2.34]
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
                    values: [0.5774, 0.6207, 0.6641, 0.7218, 0.7651, 0.8084, 0.8662, 0.9239, 0.9816, 1.0394]
                },
                {
                    name: 'continuous_attack_dmg',
                    values: [0.4491, 0.4828, 0.5165, 0.5614, 0.5951, 0.6288, 0.6737, 0.7186, 0.7635, 0.8084]
                },
                {
                    name: 'dreamdrifter_duration',
                    values: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
                },
                {
                    name: 'elemental_mastery_based_swirl_dmg_increase',
                    values: [0.0018, 0.0021, 0.0024, 0.0027, 0.003, 0.0033, 0.0036, 0.0039, 0.0042, 0.0045]
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
                    name: 'skill_dmg',
                    values: [0.9408, 1.0114, 1.0819, 1.176, 1.2466, 1.3171, 1.4112, 1.5053, 1.5994, 1.6934]
                },
                {
                    name: 'munen_shockwave_dmg',
                    values: [0.7056, 0.7585, 0.8114, 0.882, 0.9349, 0.9878, 1.0584, 1.129, 1.1995, 1.2701]
                },
                {
                    name: 'snack_pick_up_hp_regeneration',
                    values: [1.3056, 1.4035, 1.5014, 1.632, 1.7299, 1.8278, 1.9584, 2.089, 2.2195, 2.3501]
                },
                {
                    name: 'duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
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
}
,
{
    id: 'Xianyun',
    enkaId: 10000093,
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '4-11',
    baseStats: {
        [STATS.HP]: [810.3, 2102, 4678.5, 6040.9, 7246, 8457.6, 9677.3, 10409],
        [STATS.ATK]: [26.1, 67.6, 150.5, 194.3, 233.1, 272.1, 311.3, 334.8],
        [STATS.DEF]: [44.6, 115.6, 257.4, 332.3, 398.6, 465.2, 532.3, 572.6]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'clearwater_jade',
        common_enemy_drops: 'divining_scroll',
        normal_boss_drops: 'cloudseam_scale',
        talent_books: 'books_of_gold',
        weekly_boss_drops: 'lightless_eye_of_the_maelstrom'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.403, 0.4333, 0.4635, 0.5038, 0.534, 0.5642, 0.6045, 0.6448, 0.6851, 0.7254]
                },
                {
                    name: 'hit_2',
                    values: [0.3886, 0.4177, 0.4468, 0.4857, 0.5148, 0.544, 0.5828, 0.6217, 0.6605, 0.6994]
                },
                {
                    name: 'hit_3',
                    values: [0.4888, 0.5254, 0.5621, 0.611, 0.6476, 0.6843, 0.7332, 0.782, 0.8309, 0.8798]
                },
                {
                    name: 'hit_4',
                    values: [0.6492, 0.6979, 0.7465, 0.8115, 0.8601, 0.9088, 0.9738, 1.0387, 1.1036, 1.1685]
                },
                {
                    name: 'charged_dmg',
                    values: [1.2312, 1.3235, 1.4159, 1.539, 1.6313, 1.7237, 1.8468, 1.9699, 2.093, 2.2162]
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
                    values: [0.248, 0.2666, 0.2852, 0.31, 0.3286, 0.3472, 0.372, 0.3968, 0.4216, 0.4464]
                },
                {
                    name: 'driftcloud_wave_dmg',
                    values: [1.16, 1.247, 1.334, 1.45, 1.537, 1.624, 1.74, 1.856, 1.972, 2.088]
                },
                {
                    name: 'cd',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [1.08, 1.161, 1.242, 1.35, 1.431, 1.512, 1.62, 1.728, 1.836, 1.944]
                },
                {
                    name: 'starwicker_dmg',
                    values: [0.392, 0.4214, 0.4508, 0.49, 0.5194, 0.5488, 0.588, 0.6272, 0.6664, 0.7056]
                },
                {
                    name: 'heal_amount',
                    values: [0.9216, 0.9907, 1.0598, 1.152, 1.2211, 1.2902, 1.3824, 1.4746, 1.5667, 1.6589]
                },
                {
                    name: 'continuous_healing',
                    values: [0.4301, 0.4623, 0.4946, 0.5376, 0.5699, 0.6021, 0.6451, 0.6881, 0.7311, 0.7741]
                },
                {
                    name: 'duration',
                    values: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
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
}
,
{
    id: 'Wanderer',
    enkaId: 10000075,
    rarity: RARITY.LEGENDARY,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '1-3',
    baseStats: {
        [STATS.HP]: [791.3, 2052.5, 4568.4, 5898.7, 7075.5, 8258.6, 9449.6, 10164.1],
        [STATS.ATK]: [25.5, 66.2, 147.3, 190.2, 228.1, 266.2, 304.6, 327.7],
        [STATS.DEF]: [47.3, 122.6, 272.9, 352.4, 422.7, 493.3, 564.5, 607.2]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'rukkhashava_mushrooms',
        common_enemy_drops: 'old_handguard',
        normal_boss_drops: 'perpetual_caliber',
        talent_books: 'books_of_praxis',
        weekly_boss_drops: 'dakas_bell'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.6871, 0.7431, 0.799, 0.8789, 0.9348, 0.9988, 1.0866, 1.1745, 1.2624, 1.3583]
                },
                {
                    name: 'hit_2',
                    values: [0.6502, 0.7031, 0.756, 0.8316, 0.8845, 0.945, 1.0282, 1.1113, 1.1945, 1.2852]
                },
                {
                    name: 'hit_3',
                    values: [0.4764, 0.5152, 0.554, 0.6094, 0.6482, 0.6925, 0.7534, 0.8144, 0.8753, 0.9418]
                },
                {
                    name: 'charged_dmg',
                    values: [1.3208, 1.4199, 1.5189, 1.651, 1.7501, 1.8491, 1.9812, 2.1133, 2.2454, 2.3774]
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
                    values: [0.952, 1.0234, 1.0948, 1.19, 1.2614, 1.3328, 1.428, 1.5232, 1.6184, 1.7136]
                },
                {
                    name: 'kuugo_fushoudan_dmg',
                    values: [1.3298, 1.3496, 1.3693, 1.395, 1.4148, 1.4345, 1.4602, 1.4858, 1.5115, 1.5372]
                },
                {
                    name: 'kuugo_toufukai_dmg',
                    values: [1.2639, 1.2797, 1.2955, 1.316, 1.3318, 1.3476, 1.3681, 1.3887, 1.4092, 1.4298]
                },
                {
                    name: 'initial_kuugoryoku_points',
                    values: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
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
                    values: [1.472, 1.5824, 1.6928, 1.84, 1.9504, 2.0608, 2.208, 2.3552, 2.5024, 2.6496]
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
}
,
{
    id: 'Prune',
    enkaId: 10000132,
    rarity: RARITY.EPIC,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '11-20',
    baseStats: {
        [STATS.HP]: [811.5, 2084.7, 4461.5, 5706.1, 6807.1, 7907.3, 9008.4, 9678.7],
        [STATS.ATK]: [18.5, 47.6, 101.8, 130.2, 155.4, 180.5, 205.6, 220.9],
        [STATS.DEF]: [48.6, 125, 267.4, 342, 408, 474, 540, 580.1]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'winter_icelea',
        common_enemy_drops: 'treasure_hoarder_insignia',
        normal_boss_drops: 'radiant_antler',
        talent_books: 'books_of_resistance',
        weekly_boss_drops: 'mask_of_the_virtuous_doctor'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4862, 0.5227, 0.5591, 0.6078, 0.6442, 0.6807, 0.7293, 0.7779, 0.8266, 0.8752]
                },
                {
                    name: 'hit_2',
                    values: [0.4828, 0.519, 0.5552, 0.6035, 0.6397, 0.6759, 0.7242, 0.7725, 0.8208, 0.8691]
                },
                {
                    name: 'hit_3',
                    values: [0.6798, 0.7308, 0.7817, 0.8497, 0.9007, 0.9517, 1.0197, 1.0876, 1.1556, 1.2236]
                },
                {
                    name: 'charged_dmg',
                    values: [1.3352, 1.4353, 1.5355, 1.669, 1.7691, 1.8693, 2.0028, 2.1363, 2.2698, 2.4034]
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
                    name: 'ring_a_ding_ding_hexhunter_chime_dmg',
                    values: [1.6744, 1.8, 1.9256, 2.093, 2.2186, 2.3442, 2.5116, 2.679, 2.8465, 3.0139]
                },
                {
                    name: 'clang_clang_witch_tribution_comes_dmg',
                    values: [2.0456, 2.199, 2.3524, 2.557, 2.7104, 2.8638, 3.0684, 3.273, 3.4775, 3.6821]
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
                    name: 'skill_dmg',
                    values: [0.9696, 1.0423, 1.115, 1.212, 1.2847, 1.3574, 1.4544, 1.5514, 1.6483, 1.7453]
                },
                {
                    name: 'witchlure_bell_dmg',
                    values: [0.7044, 0.7572, 0.8101, 0.8805, 0.9333, 0.9862, 1.0566, 1.127, 1.1975, 1.2679]
                },
                {
                    name: 'hunter_seeker_mode_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
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
}
,
{
    id: 'Jahoda',
    enkaId: 10000124,
    rarity: RARITY.EPIC,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '1-5',
    baseStats: {
        [STATS.HP]: [808.8, 2077.7, 4446.4, 5686.9, 6784.2, 7880.7, 8978, 9646],
        [STATS.ATK]: [18.7, 48, 102.8, 131.5, 156.9, 182.2, 207.6, 223],
        [STATS.DEF]: [48.6, 125, 267.4, 342, 408, 474, 540, 580.1]
    },
    ascensionStat: STATS.HEALING_BONUS,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'portable_bearing',
        common_enemy_drops: 'broken_drive_shaft',
        normal_boss_drops: 'lightbearing_scale_feather',
        talent_books: 'books_of_vagrancy',
        weekly_boss_drops: 'ascended_sample_knight'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4167, 0.4507, 0.4846, 0.533, 0.567, 0.6057, 0.659, 0.7123, 0.7656, 0.8238]
                },
                {
                    name: 'hit_2',
                    values: [0.1923, 0.208, 0.2236, 0.246, 0.2616, 0.2795, 0.3041, 0.3287, 0.3533, 0.3802]
                },
                {
                    name: 'hit_3',
                    values: [0.512, 0.5536, 0.5953, 0.6549, 0.6965, 0.7442, 0.8096, 0.8751, 0.9406, 1.012]
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
                    name: 'smoke_bomb_dmg',
                    values: [1.59, 1.7093, 1.8285, 1.9875, 2.1068, 2.226, 2.385, 2.544, 2.703, 2.862]
                },
                {
                    name: 'unfilled_treasure_flask_dmg',
                    values: [1.908, 2.0511, 2.1942, 2.385, 2.5281, 2.6712, 2.862, 3.0528, 3.2436, 3.4344]
                },
                {
                    name: 'filled_treasure_flask_dmg',
                    values: [2.12, 2.279, 2.438, 2.65, 2.809, 2.968, 3.18, 3.392, 3.604, 3.816]
                },
                {
                    name: 'treasure_flask_duration',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'meowball_dmg',
                    values: [1.28, 1.376, 1.472, 1.6, 1.696, 1.792, 1.92, 2.048, 2.176, 2.304]
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
                    name: 'skill_dmg',
                    values: [2.072, 2.2274, 2.3828, 2.59, 2.7454, 2.9008, 3.108, 3.3152, 3.5224, 3.7296]
                },
                {
                    name: 'purrsonal_coordinated_assistance_robot_dmg',
                    values: [0.1727, 0.1856, 0.1986, 0.2158, 0.2288, 0.2417, 0.259, 0.2763, 0.2935, 0.3108]
                },
                {
                    name: 'purrsonal_coordinated_assistance_robot_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'purrsonal_coordinated_assistance_robot_healing',
                    values: [0.7987, 0.8586, 0.9185, 0.9984, 1.0583, 1.1182, 1.1981, 1.278, 1.3578, 1.4377]
                },
                {
                    name: 'lowest_hp_character_additional_healing',
                    values: [0.3072, 0.3302, 0.3533, 0.384, 0.407, 0.4301, 0.4608, 0.4915, 0.5222, 0.553]
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
}
,
{
    id: 'Lynette',
    enkaId: 10000083,
    rarity: RARITY.EPIC,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '2-2',
    baseStats: {
        [STATS.HP]: [1039.4, 2670.3, 5714.7, 7308.9, 8719.2, 10128.5, 11538.8, 12397.4],
        [STATS.ATK]: [19.4, 49.9, 106.7, 136.5, 162.8, 189.1, 215.5, 231.5],
        [STATS.DEF]: [59.7, 153.3, 328.1, 419.7, 500.7, 581.6, 662.6, 711.9]
    },
    ascensionStat: STATS.ANEMO_DMG,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'lumidouce_bell',
        common_enemy_drops: 'meshing_gear',
        normal_boss_drops: 'artificed_spare_clockwork_component_coppelia',
        talent_books: 'books_of_order',
        weekly_boss_drops: 'everamber'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4308, 0.4659, 0.501, 0.551, 0.5861, 0.6262, 0.6813, 0.7364, 0.7915, 0.8516]
                },
                {
                    name: 'hit_2',
                    values: [0.3761, 0.4067, 0.4374, 0.4811, 0.5117, 0.5467, 0.5948, 0.6429, 0.691, 0.7435]
                },
                {
                    name: 'hit_3',
                    values: [0.2786, 0.3013, 0.324, 0.3564, 0.3791, 0.405, 0.4406, 0.4763, 0.5119, 0.5508]
                },
                {
                    name: 'hit_4',
                    values: [0.6315, 0.6829, 0.7343, 0.8078, 0.8592, 0.9179, 0.9987, 1.0795, 1.1603, 1.2484]
                },
                {
                    name: 'charged_dmg',
                    values: [0.442, 0.478, 0.514, 0.5654, 0.6014, 0.6425, 0.699, 0.7556, 0.8121, 0.8738]
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
                    name: 'enigma_thrust_dmg',
                    values: [2.68, 2.881, 3.082, 3.35, 3.551, 3.752, 4.02, 4.288, 4.556, 4.824]
                },
                {
                    name: 'surging_blade_dmg',
                    values: [0.312, 0.3354, 0.3588, 0.39, 0.4134, 0.4368, 0.468, 0.4992, 0.5304, 0.5616]
                },
                {
                    name: 'surging_blade_interval',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'hp_regeneration',
                    values: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
                },
                {
                    name: 'hp_cost',
                    values: [0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06]
                },
                {
                    name: 'hold_max_duration',
                    values: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
                },
                {
                    name: 'cd',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [0.832, 0.8944, 0.9568, 1.04, 1.1024, 1.1648, 1.248, 1.3312, 1.4144, 1.4976]
                },
                {
                    name: 'bogglecat_box_dmg',
                    values: [0.512, 0.5504, 0.5888, 0.64, 0.6784, 0.7168, 0.768, 0.8192, 0.8704, 0.9216]
                },
                {
                    name: 'vivid_shot_dmg',
                    values: [0.456, 0.4902, 0.5244, 0.57, 0.6042, 0.6384, 0.684, 0.7296, 0.7752, 0.8208]
                },
                {
                    name: 'bogglecat_box_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
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
}
,
{
    id: 'Lan',
    enkaId: 10000108,
    rarity: RARITY.EPIC,
    element: VISION.ANEMO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '1-6',
    baseStats: {
        [STATS.HP]: [775, 1991, 4261, 5449.6, 6501.2, 7552, 8603.5, 9243.7],
        [STATS.ATK]: [21, 54, 115.5, 147.8, 176.3, 204.8, 233.3, 250.6],
        [STATS.DEF]: [48.6, 125, 267.4, 342, 408, 474, 540, 580.1]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'vayuda_turquoise',
        local_specialties: 'clearwater_jade',
        common_enemy_drops: 'whopperflower_nectar',
        normal_boss_drops: 'gold_inscribed_secret_source_core',
        talent_books: 'books_of_diligence',
        weekly_boss_drops: 'eroded_sunfire'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4144, 0.4455, 0.4766, 0.518, 0.5491, 0.5802, 0.6216, 0.663, 0.7045, 0.7459]
                },
                {
                    name: 'hit_2',
                    values: [0.2041, 0.2194, 0.2347, 0.2552, 0.2705, 0.2858, 0.3062, 0.3266, 0.347, 0.3674]
                },
                {
                    name: 'hit_3',
                    values: [0.2692, 0.2894, 0.3096, 0.3365, 0.3567, 0.3769, 0.4038, 0.4307, 0.4576, 0.4846]
                },
                {
                    name: 'hit_4',
                    values: [0.6456, 0.694, 0.7424, 0.807, 0.8554, 0.9038, 0.9684, 1.033, 1.0975, 1.1621]
                },
                {
                    name: 'charged_dmg',
                    values: [0.3784, 0.4068, 0.4352, 0.473, 0.5014, 0.5298, 0.5676, 0.6054, 0.6433, 0.6811]
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
                    name: 'feathermoon_ring_dmg',
                    values: [0.9626, 1.0348, 1.1069, 1.2032, 1.2754, 1.3476, 1.4438, 1.5401, 1.6364, 1.7326]
                },
                {
                    name: 'shield_dmg_absorption',
                    values: [2.7648, 2.9722, 3.1795, 3.456, 3.6634, 3.8707, 4.1472, 4.4237, 4.7002, 4.9766]
                },
                {
                    name: 'shield_duration',
                    values: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5]
                },
                {
                    name: 'cd',
                    values: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [2.4106, 2.5914, 2.7722, 3.0133, 3.1941, 3.3749, 3.616, 3.857, 4.0981, 4.3392]
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
}
];
