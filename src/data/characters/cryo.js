import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";

export const cryo = [
    {
    id: 'KamisatoAyaka',
    enkaId: 10000002,
    rarity: RARITY.LEGENDARY,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '9-28',
    avatar_icon: 'assets/avatar-icon/ayaka.png',
    baseStats: {
        [STATS.HP]: [1001, 2596.6, 5779.3, 7462.3, 8950.9, 10447.6, 11954.3, 12858.2],
        [STATS.ATK]: [26.6, 69.1, 153.7, 198.5, 238.1, 277.9, 318, 342],
        [STATS.DEF]: [61, 158.3, 352.3, 455, 545.7, 637, 728.8, 783.9]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'sakura_bloom',
        common_enemy_drops: 'old_handguard',
        normal_boss_drops: 'perpetual_heart',
        talent_books: 'books_of_elegance',
        weekly_boss_drops: 'bloodjade_branch'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4573, 0.4945, 0.5317, 0.5849, 0.6221, 0.6646, 0.7231, 0.7816, 0.8401, 0.9039]
                },
                {
                    name: 'hit_2',
                    values: [0.4868, 0.5265, 0.5661, 0.6227, 0.6623, 0.7076, 0.7699, 0.8322, 0.8944, 0.9624]
                },
                {
                    name: 'hit_3',
                    values: [0.6262, 0.6772, 0.7282, 0.801, 0.8519, 0.9102, 0.9903, 1.0704, 1.1505, 1.2379]
                },
                {
                    name: 'hit_4',
                    values: [0.2265, 0.2449, 0.2633, 0.2897, 0.3081, 0.3292, 0.3581, 0.3871, 0.4161, 0.4477]
                },
                {
                    name: 'hit_5',
                    values: [0.7818, 0.8455, 0.9091, 1, 1.0636, 1.1364, 1.2364, 1.3364, 1.4364, 1.5455]
                },
                {
                    name: 'charged_dmg',
                    values: [0.5513, 0.5961, 0.641, 0.7051, 0.75, 0.8013, 0.8718, 0.9423, 1.0128, 1.0897]
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
                    values: [2.392, 2.5714, 2.7508, 2.99, 3.1694, 3.3488, 3.588, 3.8272, 4.0664, 4.3056]
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
                    name: 'cutting_dmg',
                    values: [1.123, 1.2072, 1.2915, 1.4038, 1.488, 1.5722, 1.6845, 1.7968, 1.9091, 2.0214]
                },
                {
                    name: 'bloom_dmg',
                    values: [1.6845, 1.8108, 1.9372, 2.1056, 2.232, 2.3583, 2.5268, 2.6952, 2.8636, 3.0321]
                },
                {
                    name: 'duration',
                    values: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
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
    id: 'Ganyu',
    enkaId: 10000037,
    rarity: RARITY.LEGENDARY,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '12-2',
    avatar_icon: 'assets/avatar-icon/ganyu.png',
    baseStats: {
        [STATS.HP]: [762.7, 1978.3, 4403.3, 5685.5, 6819.8, 7960.1, 9108.1, 9796.7],
        [STATS.ATK]: [26.1, 67.6, 150.5, 194.3, 233.1, 272.1, 311.3, 334.8],
        [STATS.DEF]: [49.1, 127.3, 283.3, 365.7, 438.7, 512.1, 585.9, 630.2]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'qingxin',
        common_enemy_drops: 'whopperflower_nectar',
        normal_boss_drops: 'hoarfrost_core',
        talent_books: 'books_of_diligence',
        weekly_boss_drops: 'shadow_of_the_warrior'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3173, 0.3432, 0.369, 0.4059, 0.4317, 0.4613, 0.5018, 0.5424, 0.583, 0.6273]
                },
                {
                    name: 'hit_2',
                    values: [0.356, 0.385, 0.414, 0.4554, 0.4844, 0.5175, 0.563, 0.6086, 0.6541, 0.7038]
                },
                {
                    name: 'hit_3',
                    values: [0.4549, 0.492, 0.529, 0.5819, 0.6189, 0.6613, 0.7194, 0.7776, 0.8358, 0.8993]
                },
                {
                    name: 'hit_4',
                    values: [0.4549, 0.492, 0.529, 0.5819, 0.6189, 0.6613, 0.7194, 0.7776, 0.8358, 0.8993]
                },
                {
                    name: 'hit_5',
                    values: [0.4825, 0.5217, 0.561, 0.6171, 0.6564, 0.7013, 0.763, 0.8247, 0.8864, 0.9537]
                },
                {
                    name: 'hit_6',
                    values: [0.5762, 0.6231, 0.67, 0.737, 0.7839, 0.8375, 0.9112, 0.9849, 1.0586, 1.139]
                },
                {
                    name: 'aimed_shot',
                    values: [0.4386, 0.4743, 0.51, 0.561, 0.5967, 0.6375, 0.6936, 0.7497, 0.8058, 0.867]
                },
                {
                    name: 'aimed_shot_charge_level_1',
                    values: [1.24, 1.333, 1.426, 1.55, 1.643, 1.736, 1.86, 1.984, 2.108, 2.232]
                },
                {
                    name: 'frostflake_arrow_dmg',
                    values: [1.28, 1.376, 1.472, 1.6, 1.696, 1.792, 1.92, 2.048, 2.176, 2.304]
                },
                {
                    name: 'frostflake_arrow_bloom_dmg',
                    values: [2.176, 2.3392, 2.5024, 2.72, 2.8832, 3.0464, 3.264, 3.4816, 3.6992, 3.9168]
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
                    name: 'inherited_hp',
                    values: [1.2, 1.29, 1.38, 1.5, 1.59, 1.68, 1.8, 1.92, 2.04, 2.16]
                },
                {
                    name: 'skill_dmg',
                    values: [1.32, 1.419, 1.518, 1.65, 1.749, 1.848, 1.98, 2.112, 2.244, 2.376]
                },
                {
                    name: 'duration',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
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
                    name: 'ice_shard_dmg',
                    values: [0.7027, 0.7554, 0.8081, 0.8784, 0.9311, 0.9838, 1.0541, 1.1244, 1.1946, 1.2649]
                },
                {
                    name: 'duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
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
    id: 'Eula',
    enkaId: 10000051,
    rarity: RARITY.LEGENDARY,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '10-25',
    avatar_icon: 'assets/avatar-icon/eula.png',
    baseStats: {
        [STATS.HP]: [1029.6, 2670.7, 5944.4, 7675.5, 9206.7, 10746.1, 12295.9, 13225.6],
        [STATS.ATK]: [26.6, 69.1, 153.7, 198.5, 238.1, 277.9, 318, 342],
        [STATS.DEF]: [58.5, 151.6, 337.5, 435.8, 522.7, 610.1, 698.1, 750.9]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'dandelion_seed',
        common_enemy_drops: 'damaged_mask',
        normal_boss_drops: 'crystalline_bloom',
        talent_books: 'books_of_resistance',
        weekly_boss_drops: 'dragon_lords_crown'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.8973, 0.9704, 1.0434, 1.1477, 1.2208, 1.3043, 1.419, 1.5338, 1.6486, 1.7738]
                },
                {
                    name: 'hit_2',
                    values: [0.9355, 1.0117, 1.0878, 1.1966, 1.2727, 1.3598, 1.4794, 1.5991, 1.7187, 1.8493]
                },
                {
                    name: 'hit_3',
                    values: [0.568, 0.6142, 0.6605, 0.7265, 0.7727, 0.8256, 0.8982, 0.9709, 1.0435, 1.1228]
                },
                {
                    name: 'hit_4',
                    values: [1.1264, 1.2181, 1.3098, 1.4408, 1.5325, 1.6373, 1.7813, 1.9254, 2.0695, 2.2267]
                },
                {
                    name: 'hit_5',
                    values: [0.7183, 0.7768, 0.8353, 0.9188, 0.9773, 1.0441, 1.136, 1.2279, 1.3197, 1.42]
                },
                {
                    name: 'charged_attack_spinning_dmg',
                    values: [0.688, 0.744, 0.8, 0.88, 0.936, 1, 1.088, 1.176, 1.264, 1.36]
                },
                {
                    name: 'charged_attack_final_dmg',
                    values: [1.244, 1.3452, 1.4465, 1.5912, 1.6924, 1.8081, 1.9672, 2.1264, 2.2855, 2.4591]
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
                    name: 'press_dmg',
                    values: [1.464, 1.5738, 1.6836, 1.83, 1.9398, 2.0496, 2.196, 2.3424, 2.4888, 2.6352]
                },
                {
                    name: 'hold_dmg',
                    values: [2.456, 2.6402, 2.8244, 3.07, 3.2542, 3.4384, 3.684, 3.9296, 4.1752, 4.4208]
                },
                {
                    name: 'icewhirl_brand_dmg',
                    values: [0.96, 1.032, 1.104, 1.2, 1.272, 1.344, 1.44, 1.536, 1.632, 1.728]
                },
                {
                    name: 'def_bonus',
                    values: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
                },
                {
                    name: 'grimheart_duration',
                    values: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
                },
                {
                    name: 'physical_res_decrease',
                    values: [0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25]
                },
                {
                    name: 'cryo_res_decrease',
                    values: [0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25]
                },
                {
                    name: 'res_decrease_duration',
                    values: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
                },
                {
                    name: 'press_cd',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                {
                    name: 'hold_cd',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [2.456, 2.6402, 2.8244, 3.07, 3.2542, 3.4384, 3.684, 3.9296, 4.1752, 4.4208]
                },
                {
                    name: 'lightfall_sword_base_dmg',
                    values: [3.6705, 3.9692, 4.268, 4.6948, 4.9936, 5.335, 5.8045, 6.274, 6.7434, 7.2556]
                },
                {
                    name: 'dmg_per_stack',
                    values: [0.7499, 0.811, 0.872, 0.9592, 1.0202, 1.09, 1.1859, 1.2818, 1.3778, 1.4824]
                },
                {
                    name: 'maximum_stacks',
                    values: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
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
    id: 'Shenhe',
    enkaId: 10000063,
    rarity: RARITY.LEGENDARY,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '3-10',
    avatar_icon: 'assets/avatar-icon/shenhe.png',
    baseStats: {
        [STATS.HP]: [1011.5, 2623.8, 5839.9, 7540.4, 9044.7, 10557.1, 12079.6, 12992.9],
        [STATS.ATK]: [23.6, 61.3, 136.5, 176.3, 211.5, 246.8, 282.4, 303.8],
        [STATS.DEF]: [64.6, 167.6, 373.1, 481.7, 577.8, 674.4, 771.7, 830]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'qingxin',
        common_enemy_drops: 'whopperflower_nectar',
        normal_boss_drops: 'dragonheirs_false_fin',
        talent_books: 'books_of_prosperity',
        weekly_boss_drops: 'hellfire_butterfly'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4326, 0.4678, 0.503, 0.5533, 0.5885, 0.6288, 0.6841, 0.7394, 0.7947, 0.8551]
                },
                {
                    name: 'hit_2',
                    values: [0.4025, 0.4352, 0.468, 0.5148, 0.5476, 0.585, 0.6365, 0.688, 0.7394, 0.7956]
                },
                {
                    name: 'hit_3',
                    values: [0.5332, 0.5766, 0.62, 0.682, 0.7254, 0.775, 0.8432, 0.9114, 0.9796, 1.054]
                },
                {
                    name: 'hit_4',
                    values: [0.2632, 0.2846, 0.306, 0.3366, 0.358, 0.3825, 0.4162, 0.4498, 0.4835, 0.5202]
                },
                {
                    name: 'hit_5',
                    values: [0.6562, 0.7096, 0.763, 0.8393, 0.8927, 0.9538, 1.0377, 1.1216, 1.2055, 1.2971]
                },
                {
                    name: 'charged_dmg',
                    values: [1.1067, 1.1968, 1.2869, 1.4156, 1.5057, 1.6086, 1.7502, 1.8917, 2.0333, 2.1877]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
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
                    name: 'press_skill_dmg',
                    values: [1.392, 1.4964, 1.6008, 1.74, 1.8444, 1.9488, 2.088, 2.2272, 2.3664, 2.5056]
                },
                {
                    name: 'hold_skill_dmg',
                    values: [1.888, 2.0296, 2.1712, 2.36, 2.5016, 2.6432, 2.832, 3.0208, 3.2096, 3.3984]
                },
                {
                    name: 'dmg_bonus',
                    values: [0.4566, 0.4908, 0.525, 0.5707, 0.6049, 0.6392, 0.6848, 0.7305, 0.7762, 0.8218]
                },
                {
                    name: 'press_hold_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'press_hold_trigger_quota',
                    values: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
                },
                {
                    name: 'press_cd',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
                    name: 'skill_dmg',
                    values: [1.008, 1.0836, 1.1592, 1.26, 1.3356, 1.4112, 1.512, 1.6128, 1.7136, 1.8144]
                },
                {
                    name: 'res_decrease',
                    values: [0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15]
                },
                {
                    name: 'dot_dmg',
                    values: [0.3312, 0.356, 0.3809, 0.414, 0.4388, 0.4637, 0.4968, 0.5299, 0.563, 0.5962]
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
    id: 'Qiqi',
    enkaId: 10000035,
    rarity: RARITY.LEGENDARY,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '3-3',
    avatar_icon: 'assets/avatar-icon/qiqi.png',
    baseStats: {
        [STATS.HP]: [962.9, 2497.6, 5559.2, 7178, 8609.9, 10049.6, 11498.9, 12368.4],
        [STATS.ATK]: [22.3, 58, 129, 166.6, 199.8, 233.2, 266.8, 287],
        [STATS.DEF]: [71.8, 186.2, 414.5, 535.2, 642, 749.4, 857.4, 922.3]
    },
    ascensionStat: STATS.HEALING_BONUS,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'violetgrass',
        common_enemy_drops: 'divining_scroll',
        normal_boss_drops: 'hoarfrost_core',
        talent_books: 'books_of_prosperity',
        weekly_boss_drops: 'tail_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3775, 0.4083, 0.439, 0.4829, 0.5136, 0.5488, 0.597, 0.6453, 0.6936, 0.7463]
                },
                {
                    name: 'hit_2',
                    values: [0.3887, 0.4204, 0.452, 0.4972, 0.5288, 0.565, 0.6147, 0.6644, 0.7142, 0.7684]
                },
                {
                    name: 'hit_3',
                    values: [0.2417, 0.2613, 0.281, 0.3091, 0.3288, 0.3513, 0.3822, 0.4131, 0.444, 0.4777]
                },
                {
                    name: 'hit_4',
                    values: [0.2468, 0.2669, 0.287, 0.3157, 0.3358, 0.3588, 0.3903, 0.4219, 0.4535, 0.4879]
                },
                {
                    name: 'hit_5',
                    values: [0.6304, 0.6817, 0.733, 0.8063, 0.8576, 0.9163, 0.9969, 1.0775, 1.1581, 1.2461]
                },
                {
                    name: 'charged_dmg',
                    values: [0.6433, 0.6956, 0.748, 0.8228, 0.8752, 0.935, 1.0173, 1.0996, 1.1818, 1.2716]
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
                    values: [0.96, 1.032, 1.104, 1.2, 1.272, 1.344, 1.44, 1.536, 1.632, 1.728]
                },
                {
                    name: 'regeneration_on_hit',
                    values: [0.1056, 0.1135, 0.1214, 0.132, 0.1399, 0.1478, 0.1584, 0.169, 0.1795, 0.1901]
                },
                {
                    name: 'continuous_regeneration',
                    values: [0.696, 0.7482, 0.8004, 0.87, 0.9222, 0.9744, 1.044, 1.1136, 1.1832, 1.2528]
                },
                {
                    name: 'herald_of_frost_dmg',
                    values: [0.36, 0.387, 0.414, 0.45, 0.477, 0.504, 0.54, 0.576, 0.612, 0.648]
                },
                {
                    name: 'duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'cd',
                    values: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
                },
                {
                    name: 'herald_of_frost_coordinated_attack_dmg',
                    values: [0.24, 0.258, 0.276, 0.3, 0.318, 0.336, 0.36, 0.384, 0.408, 0.432]
                },
                {
                    name: 'herald_of_frost_coordinated_attack_cd',
                    values: [2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2]
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
                    values: [2.848, 3.0616, 3.2752, 3.56, 3.7736, 3.9872, 4.272, 4.5568, 4.8416, 5.1264]
                },
                {
                    name: 'heal_amount',
                    values: [0.9, 0.9675, 1.035, 1.125, 1.1925, 1.26, 1.35, 1.44, 1.53, 1.62]
                },
                {
                    name: 'duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'cd',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'energy_cost',
                    values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
                },
                {
                    name: 'stellar_conduct_dmg',
                    values: [2.9733, 3.1963, 3.4193, 3.7167, 3.9397, 4.1627, 4.46, 4.7573, 5.0547, 5.352]
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
    id: 'Diona',
    enkaId: 10000039,
    rarity: RARITY.EPIC,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '1-18',
    avatar_icon: 'assets/avatar-icon/diona.png',
    baseStats: {
        [STATS.HP]: [802.4, 2061.3, 4411.3, 5642, 6730.6, 7818.5, 8907.2, 9569.9],
        [STATS.ATK]: [17.8, 45.7, 97.9, 125.2, 149.4, 173.5, 197.7, 212.4],
        [STATS.DEF]: [50.4, 129.4, 276.9, 354.1, 422.4, 490.7, 559, 600.6]
    },
    ascensionStat: STATS.CRYO_DMG,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'calla_lily',
        common_enemy_drops: 'firm_arrowhead',
        normal_boss_drops: 'hoarfrost_core',
        talent_books: 'books_of_freedom',
        weekly_boss_drops: 'shard_of_a_foul_legacy'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3612, 0.3906, 0.42, 0.462, 0.4914, 0.525, 0.5712, 0.6174, 0.6636, 0.714]
                },
                {
                    name: 'hit_2',
                    values: [0.3354, 0.3627, 0.39, 0.429, 0.4563, 0.4875, 0.5304, 0.5733, 0.6162, 0.663]
                },
                {
                    name: 'hit_3',
                    values: [0.4558, 0.4929, 0.53, 0.583, 0.6201, 0.6625, 0.7208, 0.7791, 0.8374, 0.901]
                },
                {
                    name: 'hit_4',
                    values: [0.43, 0.465, 0.5, 0.55, 0.585, 0.625, 0.68, 0.735, 0.79, 0.85]
                },
                {
                    name: 'hit_5',
                    values: [0.5375, 0.5813, 0.625, 0.6875, 0.7313, 0.7813, 0.85, 0.9188, 0.9875, 1.0625]
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
                    name: 'icy_paw_dmg',
                    values: [0.4192, 0.4506, 0.4821, 0.524, 0.5554, 0.5869, 0.6288, 0.6707, 0.7126, 0.7546]
                },
                {
                    name: 'base_shield_dmg_absorption',
                    values: [0.072, 0.0774, 0.0828, 0.09, 0.0954, 0.1008, 0.108, 0.1152, 0.1224, 0.1296]
                },
                {
                    name: 'duration',
                    values: [1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.4, 2.4, 2.4]
                },
                {
                    name: 'press_cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
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
                    name: 'skill_dmg',
                    values: [0.8, 0.86, 0.92, 1, 1.06, 1.12, 1.2, 1.28, 1.36, 1.44]
                },
                {
                    name: 'continuous_field_dmg',
                    values: [0.5264, 0.5659, 0.6054, 0.658, 0.6975, 0.737, 0.7896, 0.8422, 0.8949, 0.9475]
                },
                {
                    name: 'hp_regeneration_over_time',
                    values: [0.0534, 0.0574, 0.0614, 0.0667, 0.0707, 0.0747, 0.08, 0.0854, 0.0907, 0.096]
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
    id: 'Kaeya',
    enkaId: 10000015,
    rarity: RARITY.EPIC,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '11-30',
    avatar_icon: 'assets/avatar-icon/kaeya.png',
    baseStats: {
        [STATS.HP]: [975.6, 2506.4, 5363.8, 6860.1, 8183.8, 9506.6, 10830.3, 11636.2],
        [STATS.ATK]: [18.7, 48, 102.8, 131.5, 156.9, 182.2, 207.6, 223],
        [STATS.DEF]: [66.4, 170.5, 365, 466.8, 556.8, 646.8, 736.9, 791.7]
    },
    ascensionStat: STATS.ENERGY_RECHARGE,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'calla_lily',
        common_enemy_drops: 'treasure_hoarder_insignia',
        normal_boss_drops: 'hoarfrost_core',
        talent_books: 'books_of_ballad',
        weekly_boss_drops: 'spirit_locket_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5375, 0.5813, 0.625, 0.6875, 0.7313, 0.7813, 0.85, 0.9188, 0.9875, 1.0625]
                },
                {
                    name: 'hit_2',
                    values: [0.5169, 0.5589, 0.601, 0.6611, 0.7032, 0.7513, 0.8174, 0.8835, 0.9496, 1.0217]
                },
                {
                    name: 'hit_3',
                    values: [0.6527, 0.7059, 0.759, 0.8349, 0.888, 0.9488, 1.0322, 1.1157, 1.1992, 1.2903]
                },
                {
                    name: 'hit_4',
                    values: [0.7086, 0.7663, 0.824, 0.9064, 0.9641, 1.03, 1.1206, 1.2113, 1.3019, 1.4008]
                },
                {
                    name: 'hit_5',
                    values: [0.8824, 0.9542, 1.026, 1.1286, 1.2004, 1.2825, 1.3954, 1.5082, 1.6211, 1.7442]
                },
                {
                    name: 'charged_dmg',
                    values: [0.5504, 0.5952, 0.64, 0.704, 0.7488, 0.8, 0.8704, 0.9408, 1.0112, 1.088]
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
                    values: [1.912, 2.0554, 2.1988, 2.39, 2.5334, 2.6768, 2.868, 3.0592, 3.2504, 3.4416]
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
                    values: [0.776, 0.8342, 0.8924, 0.97, 1.0282, 1.0864, 1.164, 1.2416, 1.3192, 1.3968]
                },
                {
                    name: 'cd',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
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
    id: 'Rosaria',
    enkaId: 10000045,
    rarity: RARITY.EPIC,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '1-24',
    avatar_icon: 'assets/avatar-icon/rosaria.png',
    baseStats: {
        [STATS.HP]: [1030.3, 2646.9, 5664.6, 7244.8, 8642.8, 10039.7, 11437.6, 12288.7],
        [STATS.ATK]: [20.1, 51.7, 110.6, 141.5, 168.8, 196.1, 223.4, 240],
        [STATS.DEF]: [59.5, 152.9, 327.2, 418.5, 499.2, 579.9, 660.7, 709.8]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'valberry',
        common_enemy_drops: 'recruits_insignia',
        normal_boss_drops: 'hoarfrost_core',
        talent_books: 'books_of_ballad',
        weekly_boss_drops: 'shadow_of_the_warrior'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5246, 0.5673, 0.61, 0.671, 0.7137, 0.7625, 0.8296, 0.8967, 0.9638, 1.037]
                },
                {
                    name: 'hit_2',
                    values: [0.516, 0.558, 0.6, 0.66, 0.702, 0.75, 0.816, 0.882, 0.948, 1.02]
                },
                {
                    name: 'hit_3',
                    values: [0.3182, 0.3441, 0.37, 0.407, 0.4329, 0.4625, 0.5032, 0.5439, 0.5846, 0.629]
                },
                {
                    name: 'hit_4',
                    values: [0.6966, 0.7533, 0.81, 0.891, 0.9477, 1.0125, 1.1016, 1.1907, 1.2798, 1.377]
                },
                {
                    name: 'hit_5',
                    values: [0.4162, 0.4501, 0.484, 0.5324, 0.5663, 0.605, 0.6582, 0.7115, 0.7647, 0.8228]
                },
                {
                    name: 'charged_dmg',
                    values: [1.3674, 1.4787, 1.59, 1.749, 1.8603, 1.9875, 2.1624, 2.3373, 2.5122, 2.703]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
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
                    values: [0.584, 0.6278, 0.6716, 0.73, 0.7738, 0.8176, 0.876, 0.9344, 0.9928, 1.0512]
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
                    values: [1.04, 1.118, 1.196, 1.3, 1.378, 1.456, 1.56, 1.664, 1.768, 1.872]
                },
                {
                    name: 'ice_lance_dot',
                    values: [1.32, 1.419, 1.518, 1.65, 1.749, 1.848, 1.98, 2.112, 2.244, 2.376]
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
    id: 'Chongyun',
    enkaId: 10000036,
    rarity: RARITY.EPIC,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '9-7',
    avatar_icon: 'assets/avatar-icon/chongyun.png',
    baseStats: {
        [STATS.HP]: [920.9, 2365.8, 5063, 6475.4, 7724.9, 8973.5, 10223, 10983.7],
        [STATS.ATK]: [18.7, 48, 102.8, 131.5, 156.9, 182.2, 207.6, 223],
        [STATS.DEF]: [54.4, 139.7, 298.9, 382.3, 456, 529.7, 603.5, 648.4]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'cor_lapis',
        common_enemy_drops: 'damaged_mask',
        normal_boss_drops: 'hoarfrost_core',
        talent_books: 'books_of_diligence',
        weekly_boss_drops: 'dvalins_sigh'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7, 0.757, 0.814, 0.8954, 0.9524, 1.0175, 1.107, 1.1966, 1.2861, 1.3838]
                },
                {
                    name: 'hit_2',
                    values: [0.6312, 0.6826, 0.734, 0.8074, 0.8588, 0.9175, 0.9982, 1.079, 1.1597, 1.2478]
                },
                {
                    name: 'hit_3',
                    values: [0.8032, 0.8686, 0.934, 1.0274, 1.0928, 1.1675, 1.2702, 1.373, 1.4757, 1.5878]
                },
                {
                    name: 'hit_4',
                    values: [1.0122, 1.0946, 1.177, 1.2947, 1.3771, 1.4713, 1.6007, 1.7302, 1.8597, 2.0009]
                },
                {
                    name: 'charged_attack_cyclic_dmg',
                    values: [0.5629, 0.6087, 0.6545, 0.7199, 0.7657, 0.8181, 0.8901, 0.9621, 1.0341, 1.1126]
                },
                {
                    name: 'charged_attack_final_dmg',
                    values: [1.0178, 1.1007, 1.1835, 1.3019, 1.3847, 1.4794, 1.6096, 1.7397, 1.8699, 2.012]
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
                    name: 'skill_dmg',
                    values: [1.7204, 1.8494, 1.9785, 2.1505, 2.2795, 2.4086, 2.5806, 2.7526, 2.9247, 3.0967]
                },
                {
                    name: 'infusion_duration',
                    values: [2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9]
                },
                {
                    name: 'field_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
                    values: [1.424, 1.5308, 1.6376, 1.78, 1.8868, 1.9936, 2.136, 2.2784, 2.4208, 2.5632]
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
}
];