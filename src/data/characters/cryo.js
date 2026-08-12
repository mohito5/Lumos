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
,
{
    id: 'Mika',
    enkaId: 10000080,
    rarity: RARITY.EPIC,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.POLEARM,
    avatar: 'assets/avatar/Mika_Profile.webp',
    birthday: '8-11',
    baseStats: {
        [STATS.HP]: [1048.6, 2693.7, 5764.8, 7373, 8795.7, 10217.4, 11640, 12506.2],
        [STATS.ATK]: [18.7, 48, 102.8, 131.5, 156.9, 182.2, 207.6, 223],
        [STATS.DEF]: [59.8, 153.6, 328.8, 420.5, 501.6, 582.7, 663.8, 713.2]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'wolfhook',
        common_enemy_drops: 'recruits_insignia',
        normal_boss_drops: 'pseudo_stamens',
        talent_books: 'books_of_ballad',
        weekly_boss_drops: 'mirror_of_mushin'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4326, 0.4678, 0.5031, 0.5534, 0.5886, 0.6288, 0.6842, 0.7395, 0.7948, 0.8552]
                },
                {
                    name: 'hit_2',
                    values: [0.415, 0.4488, 0.4826, 0.5308, 0.5646, 0.6032, 0.6563, 0.7094, 0.7625, 0.8204]
                },
                {
                    name: 'hit_3',
                    values: [0.545, 0.5894, 0.6338, 0.6971, 0.7415, 0.7922, 0.8619, 0.9316, 1.0013, 1.0774]
                },
                {
                    name: 'hit_4',
                    values: [0.2761, 0.2986, 0.3211, 0.3532, 0.3757, 0.4014, 0.4367, 0.472, 0.5073, 0.5459]
                },
                {
                    name: 'hit_5',
                    values: [0.7087, 0.7664, 0.8241, 0.9065, 0.9642, 1.0301, 1.1208, 1.2115, 1.3021, 1.401]
                },
                {
                    name: 'charged_dmg',
                    values: [1.1275, 1.2192, 1.311, 1.4421, 1.5339, 1.6388, 1.783, 1.9272, 2.0714, 2.2287]
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
                    name: 'flowfrost_arrow_dmg',
                    values: [0.672, 0.7224, 0.7728, 0.84, 0.8904, 0.9408, 1.008, 1.0752, 1.1424, 1.2096]
                },
                {
                    name: 'rimestar_flare_dmg',
                    values: [0.84, 0.903, 0.966, 1.05, 1.113, 1.176, 1.26, 1.344, 1.428, 1.512]
                },
                {
                    name: 'rimestar_shard_dmg',
                    values: [0.252, 0.2709, 0.2898, 0.315, 0.3339, 0.3528, 0.378, 0.4032, 0.4284, 0.4536]
                },
                {
                    name: 'atk_spd_bonus',
                    values: [0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22]
                },
                {
                    name: 'soulwind_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
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
                    name: 'cast_healing',
                    values: [0.1217, 0.1308, 0.1399, 0.1521, 0.1612, 0.1704, 0.1825, 0.1947, 0.2069, 0.219]
                },
                {
                    name: 'eagleplume_healing',
                    values: [0.0243, 0.0261, 0.028, 0.0304, 0.0322, 0.034, 0.0365, 0.0389, 0.0413, 0.0438]
                },
                {
                    name: 'eagleplume_healing_interval',
                    values: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
                },
                {
                    name: 'eagleplume_duration',
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
}
,
{
    id: 'Sandrone',
    enkaId: 10000133,
    rarity: RARITY.LEGENDARY,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '1-13',
    baseStats: {
        [STATS.HP]: [1029.6, 2670.7, 5944.4, 7675.5, 9206.7, 10746.1, 12295.9, 13225.6],
        [STATS.ATK]: [26.6, 69.1, 153.7, 198.5, 238.1, 277.9, 318, 342],
        [STATS.DEF]: [58.6, 151.9, 338.2, 436.7, 523.8, 611.4, 699.5, 752.4]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'subdetection_unit',
        common_enemy_drops: 'broken_drive_shaft',
        normal_boss_drops: 'plume_of_the_fallen_watcher',
        talent_books: 'books_of_vagrancy',
        weekly_boss_drops: 'madmans_restraint'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7629, 0.825, 0.8871, 0.9758, 1.0378, 1.1088, 1.2064, 1.304, 1.4015, 1.508]
                },
                {
                    name: 'hit_2',
                    values: [0.672, 0.7267, 0.7814, 0.8595, 0.9142, 0.9767, 1.0627, 1.1486, 1.2345, 1.3283]
                },
                {
                    name: 'hit_3',
                    values: [1.028, 1.1117, 1.1954, 1.3149, 1.3986, 1.4942, 1.6257, 1.7572, 1.8887, 2.0322]
                },
                {
                    name: 'charged_attack_sweeping_fire_dmg',
                    values: [0.43, 0.465, 0.5, 0.55, 0.585, 0.625, 0.68, 0.735, 0.79, 0.85]
                },
                {
                    name: 'charged_attack_condensed_beam_dmg',
                    values: [1.2255, 1.3253, 1.425, 1.5675, 1.6673, 1.7813, 1.938, 2.0948, 2.2515, 2.4225]
                },
                {
                    name: 'charged_attack_condensed_beam_stellar_conduct_dmg',
                    values: [0.817, 0.8835, 0.95, 1.045, 1.1115, 1.1875, 1.292, 1.3965, 1.501, 1.615]
                },
                {
                    name: 'dmg_when_in_power_overdrive',
                    values: [0.43, 0.465, 0.5, 0.55, 0.585, 0.625, 0.68, 0.735, 0.79, 0.85]
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
                    name: 'prism_shot_dmg',
                    values: [0.324, 0.3483, 0.3726, 0.405, 0.4293, 0.4536, 0.486, 0.5184, 0.5508, 0.5832]
                },
                {
                    name: 'prism_shot_stellar_conduct_dmg',
                    values: [0.216, 0.2322, 0.2484, 0.27, 0.2862, 0.3024, 0.324, 0.3456, 0.3672, 0.3888]
                },
                {
                    name: 'cd',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'bombardment_dmg',
                    values: [0.8822, 0.9483, 1.0145, 1.1027, 1.1689, 1.235, 1.3232, 1.4115, 1.4997, 1.5879]
                },
                {
                    name: 'convective_inhibition_ray_dmg',
                    values: [3.308, 3.5561, 3.8042, 4.135, 4.3831, 4.6312, 4.962, 5.2928, 5.6236, 5.9544]
                },
                {
                    name: 'convective_inhibition_ray_stellar_conduct_dmg',
                    values: [2.2053, 2.3707, 2.5361, 2.7567, 2.9221, 3.0875, 3.308, 3.5285, 3.7491, 3.9696]
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
    id: 'Skirk',
    enkaId: 10000114,
    rarity: RARITY.LEGENDARY,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '11-5',
    baseStats: {
        [STATS.HP]: [966.7, 2507.5, 5581.2, 7206.4, 8644, 10089.4, 11544.5, 12417.4],
        [STATS.ATK]: [27.9, 72.5, 161.3, 208.2, 249.7, 291.5, 333.5, 358.8],
        [STATS.DEF]: [62.8, 162.8, 362.4, 467.9, 561.2, 655.1, 749.5, 806.2]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'skysplit_gembloom',
        common_enemy_drops: 'meshing_gear',
        normal_boss_drops: 'ensnaring_gaze',
        talent_books: 'books_of_contention',
        weekly_boss_drops: 'ascended_sample_knight'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5452, 0.5896, 0.634, 0.6974, 0.7418, 0.7925, 0.8622, 0.932, 1.0017, 1.0778]
                },
                {
                    name: 'hit_2',
                    values: [0.4979, 0.5385, 0.579, 0.6369, 0.6774, 0.7238, 0.7874, 0.8511, 0.9148, 0.9843]
                },
                {
                    name: 'hit_3',
                    values: [0.3242, 0.3506, 0.377, 0.4147, 0.4411, 0.4713, 0.5127, 0.5542, 0.5957, 0.6409]
                },
                {
                    name: 'hit_4',
                    values: [0.608, 0.6575, 0.707, 0.7777, 0.8272, 0.8838, 0.9615, 1.0393, 1.1171, 1.2019]
                },
                {
                    name: 'hit_5',
                    values: [0.829, 0.8965, 0.964, 1.0604, 1.1279, 1.205, 1.311, 1.4171, 1.5231, 1.6388]
                },
                {
                    name: 'charged_dmg',
                    values: [0.6682, 0.7226, 0.777, 0.8547, 0.9091, 0.9713, 1.0567, 1.1422, 1.2277, 1.3209]
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
                    name: 'hit_1',
                    values: [1.3282, 1.4364, 1.5445, 1.6989, 1.807, 1.9306, 2.1005, 2.2704, 2.4403, 2.6256]
                },
                {
                    name: 'hit_2',
                    values: [1.198, 1.2955, 1.393, 1.5323, 1.6298, 1.7413, 1.8945, 2.0477, 2.201, 2.3681]
                },
                {
                    name: 'hit_3',
                    values: [0.7572, 0.8189, 0.8805, 0.9686, 1.0302, 1.1006, 1.1975, 1.2943, 1.3912, 1.4969]
                },
                {
                    name: 'hit_4',
                    values: [0.8054, 0.8709, 0.9365, 1.0301, 1.0957, 1.1706, 1.2736, 1.3767, 1.4797, 1.5921]
                },
                {
                    name: 'hit_5',
                    values: [1.9662, 2.1263, 2.2863, 2.515, 2.675, 2.8579, 3.1094, 3.3609, 3.6124, 3.8868]
                },
                {
                    name: 'charged_dmg',
                    values: [0.4455, 0.4817, 0.518, 0.5698, 0.6061, 0.6475, 0.7045, 0.7615, 0.8184, 0.8806]
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
                },
                {
                    name: 'seven_phase_flash_mode_duration',
                    values: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5]
                },
                {
                    name: 'max_serpents_subtlety',
                    values: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
                },
                {
                    name: 'cd',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'slash_dmg',
                    values: [1.2276, 1.3197, 1.4117, 1.5345, 1.6266, 1.7186, 1.8414, 1.9642, 2.0869, 2.2097]
                },
                {
                    name: 'final_slash_dmg',
                    values: [2.046, 2.1995, 2.3529, 2.5575, 2.711, 2.8644, 3.069, 3.2736, 3.4782, 3.6828]
                },
                {
                    name: 'serpents_subtlety_bonus',
                    values: [0.1932, 0.2077, 0.2222, 0.2415, 0.256, 0.2705, 0.2899, 0.3092, 0.3285, 0.3478]
                },
                {
                    name: '0_1_2_3_void_rift_absorption_dmg_bonus',
                    values: [0.035, 0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08]
                },
                {
                    name: 'cd',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
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
    id: 'Lohen',
    enkaId: 10000129,
    rarity: RARITY.LEGENDARY,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '4-3',
    baseStats: {
        [STATS.HP]: [1001, 2596.6, 5779.3, 7462.3, 8950.9, 10447.6, 11954.3, 12858.2],
        [STATS.ATK]: [26.8, 69.6, 154.8, 199.9, 239.8, 279.8, 320.2, 344.4],
        [STATS.DEF]: [61, 158.3, 352.3, 455, 545.7, 637, 728.8, 783.9]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'etherwing_moth',
        common_enemy_drops: 'firm_arrowhead',
        normal_boss_drops: 'prismatic_severed_tail',
        talent_books: 'books_of_resistance',
        weekly_boss_drops: 'ascended_sample_knight'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5399, 0.5839, 0.6278, 0.6906, 0.7345, 0.7848, 0.8538, 0.9229, 0.9919, 1.0673]
                },
                {
                    name: 'hit_2',
                    values: [0.5644, 0.6104, 0.6563, 0.7219, 0.7679, 0.8204, 0.8926, 0.9648, 1.037, 1.1157]
                },
                {
                    name: 'hit_3',
                    values: [0.2542, 0.2749, 0.2956, 0.3251, 0.3458, 0.3695, 0.402, 0.4345, 0.467, 0.5025]
                },
                {
                    name: 'hit_4',
                    values: [0.7523, 0.8135, 0.8747, 0.9622, 1.0234, 1.0934, 1.1896, 1.2858, 1.3821, 1.487]
                },
                {
                    name: 'hit_5',
                    values: [0.3686, 0.3986, 0.4286, 0.4714, 0.5014, 0.5357, 0.5829, 0.63, 0.6772, 0.7286]
                },
                {
                    name: 'charged_dmg',
                    values: [0.6588, 0.7124, 0.766, 0.8426, 0.8962, 0.9575, 1.0418, 1.126, 1.2103, 1.3022]
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
                    name: 'hit_1',
                    values: [0.8099, 0.8758, 0.9417, 1.0359, 1.1018, 1.1771, 1.2807, 1.3843, 1.4879, 1.6009]
                },
                {
                    name: 'hit_2',
                    values: [0.8466, 0.9156, 0.9845, 1.0829, 1.1518, 1.2306, 1.3389, 1.4472, 1.5555, 1.6736]
                },
                {
                    name: 'hit_3',
                    values: [0.3813, 0.4123, 0.4434, 0.4877, 0.5187, 0.5542, 0.603, 0.6518, 0.7005, 0.7537]
                },
                {
                    name: 'hit_4',
                    values: [1.1284, 1.2202, 1.3121, 1.4433, 1.5351, 1.6401, 1.7844, 1.9288, 2.0731, 2.2305]
                },
                {
                    name: 'hit_5',
                    values: [0.5529, 0.5979, 0.6429, 0.7072, 0.7522, 0.8036, 0.8743, 0.945, 1.0157, 1.0929]
                },
                {
                    name: 'charged_dmg',
                    values: [0.9881, 1.0686, 1.149, 1.2639, 1.3443, 1.4363, 1.5626, 1.689, 1.8154, 1.9533]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.6393, 0.6914, 0.7434, 0.8177, 0.8698, 0.9293, 1.011, 1.0928, 1.1746, 1.2638]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.2784, 1.3824, 1.4865, 1.6351, 1.7392, 1.8581, 2.0216, 2.1851, 2.3486, 2.527]
                },
                {
                    name: 'masterstroke',
                    values: [13, 13, 13, 13, 13, 13, 13, 13, 13, 13]
                },
                {
                    name: 'etched_into_bone_and_soul_dmg',
                    values: [0.6, 0.645, 0.69, 0.75, 0.795, 0.84, 0.9, 0.96, 1.02, 1.08]
                },
                {
                    name: 'dmg_increase_from_will_to_win',
                    values: [0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004]
                },
                {
                    name: 'cd',
                    values: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [1.188, 1.2771, 1.3662, 1.485, 1.5741, 1.6632, 1.782, 1.9008, 2.0196, 2.1384]
                },
                {
                    name: 'dmg_increase_from_will_to_win',
                    values: [0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004]
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
    id: 'Wriothesley',
    enkaId: 10000086,
    rarity: RARITY.LEGENDARY,
    element: VISION.CRYO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '11-23',
    baseStats: {
        [STATS.HP]: [1058.2, 2744.9, 6109.6, 7888.7, 9462.4, 11044.6, 12637.4, 13593],
        [STATS.ATK]: [24.2, 62.8, 139.8, 180.4, 216.4, 252.6, 289.1, 310.9],
        [STATS.DEF]: [59.4, 154.1, 343, 442.9, 531.3, 620.1, 709.5, 763.2]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'shivada_jade',
        local_specialties: 'subdetection_unit',
        common_enemy_drops: 'meshing_gear',
        normal_boss_drops: 'tourbillon_device',
        talent_books: 'books_of_order',
        weekly_boss_drops: 'primordial_greenbloom'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5336, 0.577, 0.6205, 0.6825, 0.7259, 0.7756, 0.8438, 0.9121, 0.9803, 1.0548]
                },
                {
                    name: 'hit_2',
                    values: [0.518, 0.5601, 0.6023, 0.6625, 0.7047, 0.7529, 0.8191, 0.8854, 0.9517, 1.0239]
                },
                {
                    name: 'hit_3',
                    values: [0.6722, 0.7269, 0.7817, 0.8598, 0.9145, 0.9771, 1.0631, 1.149, 1.235, 1.3288]
                },
                {
                    name: 'hit_4',
                    values: [0.379, 0.4099, 0.4407, 0.4848, 0.5157, 0.5509, 0.5994, 0.6479, 0.6964, 0.7493]
                },
                {
                    name: 'hit_5',
                    values: [0.9074, 0.9813, 1.0551, 1.1607, 1.2345, 1.3189, 1.435, 1.5511, 1.6671, 1.7937]
                },
                {
                    name: 'charged_dmg',
                    values: [1.5296, 1.6443, 1.759, 1.912, 2.0267, 2.1414, 2.2944, 2.4474, 2.6003, 2.7533]
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
                    name: 'enhanced_repelling_fist_dmg',
                    values: [1.4317, 1.4575, 1.4834, 1.517, 1.5429, 1.5687, 1.6023, 1.6359, 1.6695, 1.7031]
                },
                {
                    name: 'hp_cost',
                    values: [0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045]
                },
                {
                    name: 'duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
                    values: [1.272, 1.3674, 1.4628, 1.59, 1.6854, 1.7808, 1.908, 2.0352, 2.1624, 2.2896]
                },
                {
                    name: 'surging_blade_dmg',
                    values: [0.424, 0.4558, 0.4876, 0.53, 0.5618, 0.5936, 0.636, 0.6784, 0.7208, 0.7632]
                },
                {
                    name: 'cd',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'surging_blade_cd',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
