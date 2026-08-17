import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";

export const pyro = [
    {
    id: 'Mavuika',
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '4-1',
    avatar_icon: 'assets/avatar-icon/mavuika_icon.png',
    baseStats: {
        [STATS.HP]: [977.2, 2534.7, 5641.7, 7284.6, 8737.8, 10198.9, 11669.7, 12552.1],
        [STATS.ATK]: [27.9, 72.5, 161.3, 208.2, 249.7, 291.5, 333.5, 358.8],
        [STATS.DEF]: [61.6, 159.9, 355.8, 459.4, 551.1, 643.2, 736, 791.6]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'withering_purpurbloom',
        common_enemy_drops: 'sentrys_wooden_whistle',
        normal_boss_drops: 'gold_inscribed_secret_source_core',
        talent_books: 'books_of_contention',
        weekly_boss_drops: 'eroded_horn'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.8004, 0.8655, 0.9306, 1.0237, 1.0888, 1.1633, 1.2657, 1.368, 1.4704, 1.5821]
                },
                {
                    name: 'hit_2',
                    values: [0.3648, 0.3945, 0.4242, 0.4666, 0.4963, 0.5302, 0.5769, 0.6236, 0.6702, 0.7211]
                },
                {
                    name: 'hit_3',
                    values: [0.3322, 0.3593, 0.3863, 0.4249, 0.452, 0.4829, 0.5254, 0.5679, 0.6104, 0.6567]
                },
                {
                    name: 'hit_4',
                    values: [1.1619, 1.2565, 1.3511, 1.4862, 1.5808, 1.6889, 1.8375, 1.9861, 2.1347, 2.2968]
                },
                {
                    name: 'charged_dmg',
                    values: [1.9384, 2.0962, 2.254, 2.4794, 2.6372, 2.8175, 3.0654, 3.3134, 3.5613, 3.8318]
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
                    values: [0.744, 0.7998, 0.8556, 0.93, 0.9858, 1.0416, 1.116, 1.1904, 1.2648, 1.3392]
                },
                {
                    name: 'ring_of_searing_radiance_dmg',
                    values: [1.28, 1.376, 1.472, 1.6, 1.696, 1.792, 1.92, 2.048, 2.176, 2.304]
                },
                {
                    name: 'ring_of_searing_radiance_attack_interval',
                    values: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
                },
                {
                    name: 'flamestrider_normal_attack_1_hit_dmg',
                    values: [0.5726, 0.6193, 0.6659, 0.7325, 0.7791, 0.8323, 0.9056, 0.9788, 1.0521, 1.132]
                },
                {
                    name: 'flamestrider_normal_attack_2_hit_dmg',
                    values: [0.5913, 0.6395, 0.6876, 0.7563, 0.8045, 0.8595, 0.9351, 1.0108, 1.0864, 1.1689]
                },
                {
                    name: 'flamestrider_normal_attack_3_hit_dmg',
                    values: [0.6999, 0.7568, 0.8138, 0.8952, 0.9521, 1.0173, 1.1068, 1.1963, 1.2858, 1.3835]
                },
                {
                    name: 'flamestrider_normal_attack_4_hit_dmg',
                    values: [0.697, 0.7538, 0.8105, 0.8916, 0.9483, 1.0132, 1.1023, 1.1915, 1.2806, 1.3779]
                },
                {
                    name: 'flamestrider_normal_attack_5_hit_dmg',
                    values: [0.91, 0.9841, 1.0582, 1.164, 1.2381, 1.3227, 1.4391, 1.5555, 1.6719, 1.7989]
                },
                {
                    name: 'flamestrider_sprint_dmg',
                    values: [0.8084, 0.8742, 0.94, 1.034, 1.0998, 1.175, 1.2784, 1.3818, 1.4852, 1.598]
                },
                {
                    name: 'flamestrider_charged_attack_cyclic_dmg',
                    values: [0.989, 1.0695, 1.15, 1.265, 1.3455, 1.4375, 1.564, 1.6905, 1.817, 1.955]
                },
                {
                    name: 'flamestrider_charged_attack_final_dmg',
                    values: [1.376, 1.488, 1.6, 1.76, 1.872, 2, 2.176, 2.352, 2.528, 2.72]
                },
                {
                    name: 'flamestrider_plunge_dmg',
                    values: [1.5996, 1.7298, 1.86, 2.046, 2.1762, 2.325, 2.5296, 2.7342, 2.9388, 3.162]
                },
                {
                    name: 'nightsoul_point_limit',
                    values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
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
                    values: [4.448, 4.7816, 5.1152, 5.56, 5.8936, 6.2272, 6.672, 7.1168, 7.5616, 8.0064]
                },
                {
                    name: 'crucible_of_death_and_life_duration',
                    values: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
                },
                {
                    name: 'sunfell_slice_dmg_bonus',
                    values: [0.016, 0.0172, 0.0184, 0.02, 0.0212, 0.0224, 0.024, 0.0256, 0.0272, 0.0288]
                },
                {
                    name: 'flamestrider_normal_attack_dmg_bonus',
                    values: [0.0026, 0.0028, 0.003, 0.0033, 0.0035, 0.0038, 0.0041, 0.0044, 0.0047, 0.0051]
                },
                {
                    name: 'flamestrider_charged_attack_dmg_bonus',
                    values: [0.0052, 0.0056, 0.006, 0.0066, 0.007, 0.0075, 0.0082, 0.0088, 0.0095, 0.0102]
                },
                {
                    name: 'cd',
                    values: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
                },
                {
                    name: 'fighting_spirit_limit',
                    values: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200]
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
    id: 'HuTao',
    enkaId: 10000046,
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '7-15',
    avatar_icon: 'assets/avatar-icon/hutao.png',
    baseStats: {
        [STATS.HP]: [1210.7, 3140.6, 6990.2, 9025.8, 10826.4, 12636.6, 14459, 15552.3],
        [STATS.ATK]: [8.3, 21.5, 47.8, 61.8, 74.1, 86.5, 99, 106.4],
        [STATS.DEF]: [68.2, 176.9, 393.8, 508.5, 609.9, 711.9, 814.6, 876.2]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'silk_flower',
        common_enemy_drops: 'whopperflower_nectar',
        normal_boss_drops: 'juvenile_jade',
        talent_books: 'books_of_diligence',
        weekly_boss_drops: 'shard_of_a_foul_legacy'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4689, 0.5008, 0.5328, 0.5754, 0.6074, 0.6447, 0.6926, 0.7406, 0.7885, 0.8365]
                },
                {
                    name: 'hit_2',
                    values: [0.4825, 0.5154, 0.5483, 0.5922, 0.6251, 0.6635, 0.7128, 0.7622, 0.8115, 0.8609]
                },
                {
                    name: 'hit_3',
                    values: [0.6105, 0.6521, 0.6938, 0.7493, 0.7909, 0.8394, 0.9019, 0.9643, 1.0268, 1.0892]
                },
                {
                    name: 'hit_4',
                    values: [0.6564, 0.7012, 0.7459, 0.8056, 0.8503, 0.9026, 0.9697, 1.0368, 1.104, 1.1711]
                },
                {
                    name: 'hit_5',
                    values: [0.3327, 0.3554, 0.3781, 0.4084, 0.431, 0.4575, 0.4915, 0.5256, 0.5596, 0.5936]
                },
                {
                    name: 'hit_6',
                    values: [0.8596, 0.9182, 0.9768, 1.0549, 1.1136, 1.1819, 1.2698, 1.3578, 1.4457, 1.5336]
                },
                {
                    name: 'charged_attack',
                    values: [1.3596, 1.4523, 1.545, 1.6686, 1.7613, 1.8695, 2.0085, 2.1476, 2.2866, 2.4257]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
                },
                {
                    name: 'plunge_dmg',
                    values: [0.6542, 0.6988, 0.7434, 0.8029, 0.8475, 0.8995, 0.9664, 1.0333, 1.1002, 1.1671]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.3081, 1.3973, 1.4865, 1.6054, 1.6946, 1.7986, 1.9324, 2.0662, 2.2, 2.3338]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'activation_cost',
                    values: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
                },
                {
                    name: 'atk_increase',
                    values: [0.0384, 0.0407, 0.043, 0.046, 0.0483, 0.0506, 0.0536, 0.0566, 0.0596, 0.0626]
                },
                {
                    name: 'blood_blossom_dmg',
                    values: [0.64, 0.688, 0.736, 0.8, 0.848, 0.896, 0.96, 1.024, 1.088, 1.152]
                },
                {
                    name: 'blood_blossom_duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: 'duration',
                    values: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
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
                    values: [3.0327, 3.2143, 3.3959, 3.632, 3.8136, 3.9952, 4.2313, 4.4674, 4.7034, 4.9395]
                },
                {
                    name: 'low_hp_skill_dmg',
                    values: [3.7909, 4.0179, 4.2449, 4.54, 4.767, 4.994, 5.2891, 5.5842, 5.8793, 6.1744]
                },
                {
                    name: 'skill_hp_regeneration',
                    values: [0.0626, 0.0664, 0.0701, 0.075, 0.0788, 0.0825, 0.0874, 0.0923, 0.0971, 0.102]
                },
                {
                    name: 'low_hp_skill_regeneration',
                    values: [0.0835, 0.0885, 0.0935, 0.1, 0.105, 0.11, 0.1165, 0.123, 0.1295, 0.136]
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
    id: 'Klee',
    enkaId: 10000029,
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '7-27',
    avatar_icon: 'assets/avatar-icon/klee.png',
    baseStats: {
        [STATS.HP]: [800.8, 2077.2, 4623.5, 5969.8, 7160.7, 8358.1, 9563.5, 10286.6],
        [STATS.ATK]: [24.2, 62.8, 139.8, 180.4, 216.4, 252.6, 289.1, 310.9],
        [STATS.DEF]: [47.9, 124.2, 276.4, 356.8, 428, 499.6, 571.6, 614.8]
    },
    ascensionStat: STATS.PYRO_DMG,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'philanemo_mushroom',
        common_enemy_drops: 'divining_scroll',
        normal_boss_drops: 'everflame_seed',
        talent_books: 'books_of_freedom',
        weekly_boss_drops: 'ring_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7216, 0.7757, 0.8298, 0.902, 0.9561, 1.0102, 1.0824, 1.1546, 1.2267, 1.2989]
                },
                {
                    name: 'hit_2',
                    values: [0.624, 0.6708, 0.7176, 0.78, 0.8268, 0.8736, 0.936, 0.9984, 1.0608, 1.1232]
                },
                {
                    name: 'hit_3',
                    values: [0.8992, 0.9666, 1.0341, 1.124, 1.1914, 1.2589, 1.3488, 1.4387, 1.5286, 1.6186]
                },
                {
                    name: 'charged_dmg',
                    values: [1.5736, 1.6916, 1.8096, 1.967, 2.085, 2.203, 2.3604, 2.5178, 2.6751, 2.8325]
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
                    name: 'jumpy_dumpty_dmg',
                    values: [0.952, 1.0234, 1.0948, 1.19, 1.2614, 1.3328, 1.428, 1.5232, 1.6184, 1.7136]
                },
                {
                    name: 'mine_dmg',
                    values: [0.328, 0.3526, 0.3772, 0.41, 0.4346, 0.4592, 0.492, 0.5248, 0.5576, 0.5904]
                },
                {
                    name: 'mine_duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'cd',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'sparks_n_splash_dmg',
                    values: [0.4264, 0.4584, 0.4904, 0.533, 0.565, 0.597, 0.6396, 0.6822, 0.7249, 0.7675]
                },
                {
                    name: 'duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
    id: 'Diluc',
    enkaId: 10000016,
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '4-30',
    avatar_icon: 'assets/avatar-icon/diluc.png',
    baseStats: {
        [STATS.HP]: [1010.5, 2621.3, 5834.4, 7533.3, 9036.2, 10547.1, 12068.2, 12980.7],
        [STATS.ATK]: [26.1, 67.6, 150.5, 194.3, 233.1, 272.1, 311.3, 334.8],
        [STATS.DEF]: [61, 158.3, 352.3, 455, 545.7, 637, 728.8, 783.9]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'small_lamp_grass',
        common_enemy_drops: 'recruits_insignia',
        normal_boss_drops: 'everflame_seed',
        talent_books: 'books_of_resistance',
        weekly_boss_drops: 'dvalins_plume'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.897, 0.97, 1.043, 1.1473, 1.2203, 1.3038, 1.4185, 1.5332, 1.6479, 1.7731]
                },
                {
                    name: 'hit_2',
                    values: [0.8763, 0.9477, 1.019, 1.1209, 1.1922, 1.2738, 1.3858, 1.4979, 1.61, 1.7323]
                },
                {
                    name: 'hit_3',
                    values: [0.9881, 1.0686, 1.149, 1.2639, 1.3443, 1.4363, 1.5626, 1.689, 1.8154, 1.9533]
                },
                {
                    name: 'hit_4',
                    values: [1.3399, 1.4489, 1.558, 1.7138, 1.8229, 1.9475, 2.1189, 2.2903, 2.4616, 2.6486]
                },
                {
                    name: 'charged_attack_cyclic_dmg',
                    values: [0.688, 0.744, 0.8, 0.88, 0.936, 1, 1.088, 1.176, 1.264, 1.36]
                },
                {
                    name: 'charged_attack_final_dmg',
                    values: [1.247, 1.3485, 1.45, 1.595, 1.6965, 1.8125, 1.972, 2.1315, 2.291, 2.465]
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
                    values: [0.8951, 0.9679, 1.0408, 1.1448, 1.2177, 1.301, 1.4154, 1.5299, 1.6444, 1.7693]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.7897, 1.9354, 2.0811, 2.2892, 2.4349, 2.6013, 2.8303, 3.0592, 3.2881, 3.5378]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.944, 1.0148, 1.0856, 1.18, 1.2508, 1.3216, 1.416, 1.5104, 1.6048, 1.6992]
                },
                {
                    name: 'hit_2',
                    values: [0.976, 1.0492, 1.1224, 1.22, 1.2932, 1.3664, 1.464, 1.5616, 1.6592, 1.7568]
                },
                {
                    name: 'hit_3',
                    values: [1.288, 1.3846, 1.4812, 1.61, 1.7066, 1.8032, 1.932, 2.0608, 2.1896, 2.3184]
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
                    name: 'slashing_dmg',
                    values: [2.04, 2.193, 2.346, 2.55, 2.703, 2.856, 3.06, 3.264, 3.468, 3.672]
                },
                {
                    name: 'dot_dmg',
                    values: [0.6, 0.645, 0.69, 0.75, 0.795, 0.84, 0.9, 0.96, 1.02, 1.08]
                },
                {
                    name: 'explosion_dmg',
                    values: [2.04, 2.193, 2.346, 2.55, 2.703, 2.856, 3.06, 3.264, 3.468, 3.672]
                },
                {
                    name: 'cd',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'infusion_duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
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
    id: 'Yoimiya',
    enkaId: 10000049,
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '6-21',
    avatar_icon: 'assets/avatar-icon/yoimiya.png',
    baseStats: {
        [STATS.HP]: [791.3, 2052.5, 4568.4, 5898.7, 7075.5, 8258.6, 9449.6, 10164.1],
        [STATS.ATK]: [25.1, 65.2, 145.1, 187.4, 224.8, 262.4, 300.2, 322.9],
        [STATS.DEF]: [47.9, 124.2, 276.4, 356.8, 428, 499.6, 571.6, 614.8]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'naku_weed',
        common_enemy_drops: 'divining_scroll',
        normal_boss_drops: 'smoldering_pearl',
        talent_books: 'books_of_transience',
        weekly_boss_drops: 'dragon_lords_crown'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3564, 0.3807, 0.405, 0.4374, 0.4617, 0.4901, 0.5265, 0.5629, 0.5994, 0.6359]
                },
                {
                    name: 'hit_2',
                    values: [0.6838, 0.7304, 0.777, 0.8392, 0.8858, 0.9402, 1.0101, 1.08, 1.15, 1.2199]
                },
                {
                    name: 'hit_3',
                    values: [0.8889, 0.9495, 1.0101, 1.0909, 1.1515, 1.2222, 1.3131, 1.404, 1.4949, 1.5859]
                },
                {
                    name: 'hit_4',
                    values: [0.4642, 0.4959, 0.5275, 0.5697, 0.6014, 0.6383, 0.6858, 0.7332, 0.7807, 0.8282]
                },
                {
                    name: 'hit_5',
                    values: [1.0586, 1.1308, 1.203, 1.2992, 1.3714, 1.4556, 1.5639, 1.6722, 1.7804, 1.8887]
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
                    name: 'kindling_arrow_dmg',
                    values: [0.164, 0.1763, 0.1886, 0.205, 0.2173, 0.2296, 0.246, 0.2624, 0.2788, 0.2952]
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
                    name: 'blazing_arrow_dmg',
                    values: [1.3791, 1.4018, 1.4245, 1.454, 1.4767, 1.4994, 1.5289, 1.5584, 1.5879, 1.6174]
                },
                {
                    name: 'duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
                    values: [1.272, 1.3674, 1.4628, 1.59, 1.6854, 1.7808, 1.908, 2.0352, 2.1624, 2.2896]
                },
                {
                    name: 'aurous_blaze_explosion_dmg',
                    values: [1.22, 1.3115, 1.403, 1.525, 1.6165, 1.708, 1.83, 1.952, 2.074, 2.196]
                },
                {
                    name: 'duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
    id: 'Xinyan',
    enkaId: 10000044,
    rarity: RARITY.EPIC,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '10-16',
    avatar_icon: 'assets/avatar-icon/xinyan.png',
    baseStats: {
        [STATS.HP]: [939.1, 2412.7, 5163.3, 6603.7, 7877.9, 9151.2, 10425.4, 11201.2],
        [STATS.ATK]: [20.8, 53.5, 114.6, 146.5, 174.8, 203, 231.3, 248.5],
        [STATS.DEF]: [67, 172, 368.1, 470.8, 561.6, 652.4, 743.2, 798.6]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'violetgrass',
        common_enemy_drops: 'treasure_hoarder_insignia',
        normal_boss_drops: 'everflame_seed',
        talent_books: 'books_of_gold',
        weekly_boss_drops: 'tusk_of_monoceros_caeli'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7654, 0.8277, 0.89, 0.979, 1.0413, 1.1125, 1.2104, 1.3083, 1.4062, 1.513]
                },
                {
                    name: 'hit_2',
                    values: [0.7396, 0.7998, 0.86, 0.946, 1.0062, 1.075, 1.1696, 1.2642, 1.3588, 1.462]
                },
                {
                    name: 'hit_3',
                    values: [0.9546, 1.0323, 1.11, 1.221, 1.2987, 1.3875, 1.5096, 1.6317, 1.7538, 1.887]
                },
                {
                    name: 'hit_4',
                    values: [1.1584, 1.2527, 1.347, 1.4817, 1.576, 1.6838, 1.8319, 1.9801, 2.1283, 2.2899]
                },
                {
                    name: 'charged_attack_cyclic_dmg',
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
                    name: 'swing_dmg',
                    values: [1.696, 1.8232, 1.9504, 2.12, 2.2472, 2.3744, 2.544, 2.7136, 2.8832, 3.0528]
                },
                {
                    name: 'shield_level_1_dmg_absorption',
                    values: [1.0404, 1.1184, 1.1965, 1.3005, 1.3785, 1.4566, 1.5606, 1.6646, 1.7687, 1.8727]
                },
                {
                    name: 'shield_level_2_dmg_absorption',
                    values: [1.224, 1.3158, 1.4076, 1.53, 1.6218, 1.7136, 1.836, 1.9584, 2.0808, 2.2032]
                },
                {
                    name: 'shield_level_3_dmg_absorption',
                    values: [1.44, 1.548, 1.656, 1.8, 1.908, 2.016, 2.16, 2.304, 2.448, 2.592]
                },
                {
                    name: 'dot_dmg',
                    values: [0.336, 0.3612, 0.3864, 0.42, 0.4452, 0.4704, 0.504, 0.5376, 0.5712, 0.6048]
                },
                {
                    name: 'shield_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
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
                    values: [3.408, 3.6636, 3.9192, 4.26, 4.5156, 4.7712, 5.112, 5.4528, 5.7936, 6.1344]
                },
                {
                    name: 'pyro_dot',
                    values: [0.4, 0.43, 0.46, 0.5, 0.53, 0.56, 0.6, 0.64, 0.68, 0.72]
                },
                {
                    name: 'duration',
                    values: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
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
    id: 'Yanfei',
    enkaId: 10000048,
    rarity: RARITY.EPIC,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '7-28',
    avatar_icon: 'assets/avatar-icon/yanfei.png',
    baseStats: {
        [STATS.HP]: [784.1, 2014.5, 4311.1, 5513.7, 6577.7, 7640.8, 8704.7, 9352.4],
        [STATS.ATK]: [20.1, 51.7, 110.6, 141.5, 168.8, 196.1, 223.4, 240],
        [STATS.DEF]: [49.2, 126.4, 270.6, 346, 412.8, 479.5, 546.3, 587]
    },
    ascensionStat: STATS.PYRO_DMG,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'noctilucous_jade',
        common_enemy_drops: 'treasure_hoarder_insignia',
        normal_boss_drops: 'juvenile_jade',
        talent_books: 'books_of_gold',
        weekly_boss_drops: 'bloodjade_branch'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5834, 0.6272, 0.6709, 0.7293, 0.773, 0.8168, 0.8751, 0.9335, 0.9918, 1.0501]
                },
                {
                    name: 'hit_2',
                    values: [0.5213, 0.5604, 0.5994, 0.6516, 0.6907, 0.7298, 0.7819, 0.834, 0.8861, 0.9383]
                },
                {
                    name: 'hit_3',
                    values: [0.7601, 0.8171, 0.8741, 0.9502, 1.0072, 1.0642, 1.1402, 1.2162, 1.2922, 1.3682]
                },
                {
                    name: 'charged_attack',
                    values: [0.9823, 1.0411, 1.0999, 1.1764, 1.2352, 1.294, 1.3705, 1.447, 1.5234, 1.5999]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
                },
                {
                    name: 'scarlet_seal_stamina_consumption_decrease',
                    values: [0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]
                },
                {
                    name: 'scarlet_seal_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
                    values: [1.696, 1.8232, 1.9504, 2.12, 2.2472, 2.3744, 2.544, 2.7136, 2.8832, 3.0528]
                },
                {
                    name: 'cd',
                    values: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [1.824, 1.9608, 2.0976, 2.28, 2.4168, 2.5536, 2.736, 2.9184, 3.1008, 3.2832]
                },
                {
                    name: 'scarlet_seal_grant_interval',
                    values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                },
                {
                    name: 'charged_attack_dmg_bonus',
                    values: [0.334, 0.354, 0.374, 0.4, 0.42, 0.44, 0.466, 0.492, 0.518, 0.544]
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
    id: 'Thoma',
    enkaId: 10000050,
    rarity: RARITY.EPIC,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '1-9',
    avatar_icon: 'assets/avatar-icon/thoma.png',
    baseStats: {
        [STATS.HP]: [866.2, 2225.3, 4762.2, 6090.8, 7266, 8440.4, 9615.7, 10331.2],
        [STATS.ATK]: [16.9, 43.5, 93, 119, 141.9, 164.8, 187.8, 201.8],
        [STATS.DEF]: [62.9, 161.7, 346.1, 442.6, 528, 613.4, 698.8, 750.8]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'fluorescent_fungus',
        common_enemy_drops: 'treasure_hoarder_insignia',
        normal_boss_drops: 'smoldering_pearl',
        talent_books: 'books_of_transience',
        weekly_boss_drops: 'hellfire_butterfly'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4439, 0.4801, 0.5162, 0.5678, 0.604, 0.6453, 0.702, 0.7588, 0.8156, 0.8775]
                },
                {
                    name: 'hit_2',
                    values: [0.4363, 0.4718, 0.5073, 0.558, 0.5935, 0.6341, 0.6899, 0.7457, 0.8015, 0.8624]
                },
                {
                    name: 'hit_3',
                    values: [0.2679, 0.2897, 0.3115, 0.3427, 0.3645, 0.3894, 0.4236, 0.4579, 0.4922, 0.5296]
                },
                {
                    name: 'hit_4',
                    values: [0.6736, 0.7284, 0.7832, 0.8615, 0.9163, 0.979, 1.0652, 1.1513, 1.2375, 1.3314]
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
                    name: 'skill_dmg',
                    values: [1.464, 1.5738, 1.6836, 1.83, 1.9398, 2.0496, 2.196, 2.3424, 2.4888, 2.6352]
                },
                {
                    name: 'shield_dmg_absorption',
                    values: [0.072, 0.0774, 0.0828, 0.09, 0.0954, 0.1008, 0.108, 0.1152, 0.1224, 0.1296]
                },
                {
                    name: 'shield_duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: 'max_shield_dmg_absorption',
                    values: [0.196, 0.2107, 0.2254, 0.245, 0.2597, 0.2744, 0.294, 0.3136, 0.3332, 0.3528]
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
                    values: [0.88, 0.946, 1.012, 1.1, 1.166, 1.232, 1.32, 1.408, 1.496, 1.584]
                },
                {
                    name: 'fiery_collapse_dmg',
                    values: [0.58, 0.6235, 0.667, 0.725, 0.7685, 0.812, 0.87, 0.928, 0.986, 1.044]
                },
                {
                    name: 'shield_dmg_absorption',
                    values: [0.0114, 0.0123, 0.0132, 0.0143, 0.0152, 0.016, 0.0172, 0.0183, 0.0194, 0.0206]
                },
                {
                    name: 'shield_duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: 'scorching_ooyoroi_duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
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
    id: 'Arlecchino',
    enkaId: 10000096,
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '8-22',
    baseStats: {
        [STATS.HP]: [1020.1, 2646, 5889.4, 7604.4, 9121.4, 10646.6, 12182, 13103.1],
        [STATS.ATK]: [26.6, 69.1, 153.7, 198.5, 238.1, 277.9, 318, 342],
        [STATS.DEF]: [59.5, 154.4, 343.7, 443.8, 532.3, 621.3, 711, 764.7]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'rainbow_rose',
        common_enemy_drops: 'recruits_insignia',
        normal_boss_drops: 'fragment_of_a_golden_melody',
        talent_books: 'books_of_order',
        weekly_boss_drops: 'fading_candle'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'masque_of_the_red_death_increase',
                    values: [1.204, 1.302, 1.4, 1.54, 1.638, 1.75, 1.904, 2.058, 2.212, 2.38]
                },
                {
                    name: 'hit_1',
                    values: [0.475, 0.5137, 0.5523, 0.6076, 0.6462, 0.6904, 0.7512, 0.8119, 0.8727, 0.939]
                },
                {
                    name: 'hit_2',
                    values: [0.5211, 0.5635, 0.6059, 0.6665, 0.7089, 0.7574, 0.824, 0.8906, 0.9573, 1.03]
                },
                {
                    name: 'hit_3',
                    values: [0.6539, 0.7071, 0.7603, 0.8363, 0.8896, 0.9504, 1.034, 1.1176, 1.2013, 1.2925]
                },
                {
                    name: 'hit_4',
                    values: [0.3715, 0.4017, 0.4319, 0.4751, 0.5053, 0.5399, 0.5874, 0.6349, 0.6824, 0.7343]
                },
                {
                    name: 'hit_5',
                    values: [0.6998, 0.7568, 0.8137, 0.8951, 0.9521, 1.0172, 1.1067, 1.1962, 1.2857, 1.3834]
                },
                {
                    name: 'hit_6',
                    values: [0.8538, 0.9233, 0.9928, 1.092, 1.1615, 1.241, 1.3502, 1.4594, 1.5686, 1.6877]
                },
                {
                    name: 'charged_dmg',
                    values: [0.9082, 0.9821, 1.056, 1.1616, 1.2355, 1.32, 1.4362, 1.5523, 1.6685, 1.7952]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
                },
                {
                    name: 'high_speed_movement_stamina_cost',
                    values: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
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
                    name: 'spike_dmg',
                    values: [0.1484, 0.1595, 0.1707, 0.1855, 0.1966, 0.2078, 0.2226, 0.2374, 0.2523, 0.2671]
                },
                {
                    name: 'cleave_dmg',
                    values: [1.3356, 1.4358, 1.5359, 1.6695, 1.7697, 1.8698, 2.0034, 2.137, 2.2705, 2.4041]
                },
                {
                    name: 'blood_debt_directive_dmg',
                    values: [0.318, 0.3419, 0.3657, 0.3975, 0.4214, 0.4452, 0.477, 0.5088, 0.5406, 0.5724]
                },
                {
                    name: 'cd',
                    values: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [3.704, 3.9818, 4.2596, 4.63, 4.9078, 5.1856, 5.556, 5.9264, 6.2968, 6.6672]
                },
                {
                    name: 'amount_of_hp_restored',
                    values: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5]
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
    id: 'Nicole',
    enkaId: 10000131,
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '9-29',
    baseStats: {
        [STATS.HP]: [810.3, 2102, 4678.5, 6040.9, 7246, 8457.6, 9677.3, 10409],
        [STATS.ATK]: [26.6, 69.1, 153.7, 198.5, 238.1, 277.9, 318, 342],
        [STATS.DEF]: [43.8, 113.6, 252.9, 326.5, 391.6, 457.1, 523, 562.6]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'pine_amber',
        common_enemy_drops: 'tattered_warrant',
        normal_boss_drops: 'remnant_of_the_dreadwing',
        talent_books: 'books_of_elysium',
        weekly_boss_drops: 'counterfeit_resin'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3518, 0.3782, 0.4046, 0.4397, 0.4661, 0.4925, 0.5277, 0.5629, 0.598, 0.6332]
                },
                {
                    name: 'hit_2',
                    values: [0.2963, 0.3186, 0.3408, 0.3704, 0.3926, 0.4149, 0.4445, 0.4741, 0.5038, 0.5334]
                },
                {
                    name: 'hit_3',
                    values: [0.4619, 0.4965, 0.5312, 0.5774, 0.612, 0.6466, 0.6928, 0.739, 0.7852, 0.8314]
                },
                {
                    name: 'charged_dmg',
                    values: [1.1232, 1.2074, 1.2917, 1.404, 1.4882, 1.5725, 1.6848, 1.7971, 1.9094, 2.0218]
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
                    values: [1.384, 1.4878, 1.5916, 1.73, 1.8338, 1.9376, 2.076, 2.2144, 2.3528, 2.4912]
                },
                {
                    name: 'shield_dmg_absorption',
                    values: [2.2118, 2.3777, 2.5436, 2.7648, 2.9307, 3.0966, 3.3178, 3.5389, 3.7601, 3.9813]
                },
                {
                    name: 'shield_duration',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'grace_of_kenosis_atk_bonus_ratio',
                    values: [0.0825, 0.09, 0.0975, 0.105, 0.1125, 0.12, 0.1275, 0.135, 0.1425, 0.15]
                },
                {
                    name: 'grace_of_kenosis_max_atk_bonus',
                    values: [330, 360, 390, 420, 450, 480, 510, 540, 570, 600]
                },
                {
                    name: 'grace_of_kenosis_duration',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
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
                    values: [3.168, 3.4056, 3.6432, 3.96, 4.1976, 4.4352, 4.752, 5.0688, 5.3856, 5.7024]
                },
                {
                    name: 'arcane_projection_dmg',
                    values: [0.99, 1.08, 1.17, 1.26, 1.35, 1.44, 1.53, 1.62, 1.71, 1.8]
                },
                {
                    name: 'arcane_projection_attack_count',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                {
                    name: 'silent_contemplation_duration',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
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
    id: 'Durin',
    enkaId: 10000123,
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '3-14',
    baseStats: {
        [STATS.HP]: [967.6, 2510, 5586.7, 7213.5, 8652.6, 10099.4, 11555.8, 12429.6],
        [STATS.ATK]: [27, 70, 155.9, 201.3, 241.4, 281.8, 322.4, 346.8],
        [STATS.DEF]: [64, 166.1, 369.6, 477.3, 572.5, 668.2, 764.5, 822.4]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'frostlamp_flower',
        common_enemy_drops: 'tattered_warrant',
        normal_boss_drops: 'cyclic_military_kuuvahki_core',
        talent_books: 'books_of_ballad',
        weekly_boss_drops: 'eroded_sunfire'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4565, 0.4937, 0.5308, 0.5839, 0.6211, 0.6635, 0.7219, 0.7803, 0.8387, 0.9024]
                },
                {
                    name: 'hit_2',
                    values: [0.41, 0.4434, 0.4768, 0.5245, 0.5579, 0.596, 0.6484, 0.7009, 0.7533, 0.8106]
                },
                {
                    name: 'hit_3',
                    values: [0.2916, 0.3154, 0.3391, 0.373, 0.3967, 0.4239, 0.4612, 0.4985, 0.5358, 0.5765]
                },
                {
                    name: 'hit_4',
                    values: [0.7115, 0.7694, 0.8274, 0.9101, 0.968, 1.0342, 1.1252, 1.2162, 1.3072, 1.4065]
                },
                {
                    name: 'charged_dmg',
                    values: [1.1343, 1.2267, 1.319, 1.4509, 1.5432, 1.6488, 1.7938, 1.9389, 2.084, 2.2423]
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
                    name: 'transmutation_confirmation_of_purity_dmg',
                    values: [1.056, 1.1352, 1.2144, 1.32, 1.3992, 1.4784, 1.584, 1.6896, 1.7952, 1.9008]
                },
                {
                    name: 'transmutation_denial_of_darkness_dmg',
                    values: [0.7224, 0.7766, 0.8308, 0.903, 0.9572, 1.0114, 1.0836, 1.1558, 1.2281, 1.3003]
                },
                {
                    name: 'energy_regeneration',
                    values: [6, 9, 12, 15, 18, 21, 24, 27, 30, 33]
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
                    name: 'principle_of_purity_as_the_light_shifts_dmg',
                    values: [1.1896, 1.2788, 1.368, 1.487, 1.5762, 1.6654, 1.7844, 1.9034, 2.0223, 2.1413]
                },
                {
                    name: 'principle_of_darkness_as_the_stars_smolder_dmg',
                    values: [1.2544, 1.3485, 1.4426, 1.568, 1.6621, 1.7562, 1.8816, 2.007, 2.1325, 2.2579]
                },
                {
                    name: 'dragon_of_white_flame_dmg',
                    values: [0.9464, 1.0174, 1.0884, 1.183, 1.254, 1.325, 1.4196, 1.5142, 1.6089, 1.7035]
                },
                {
                    name: 'dragon_of_dark_decay_dmg',
                    values: [1.2984, 1.3958, 1.4932, 1.623, 1.7204, 1.8178, 1.9476, 2.0774, 2.2073, 2.3371]
                },
                {
                    name: 'dragon_of_white_flame_duration',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'dragon_of_dark_decay_duration',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
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
    id: 'Chevreuse',
    enkaId: 10000090,
    rarity: RARITY.EPIC,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '1-10',
    baseStats: {
        [STATS.HP]: [1003, 2576.6, 5514.2, 7052.5, 8413.3, 9773.1, 11134, 11962.4],
        [STATS.ATK]: [16.2, 41.6, 89.1, 113.9, 135.9, 157.9, 179.9, 193.3],
        [STATS.DEF]: [50.7, 130.3, 278.7, 356.5, 425.3, 494, 562.8, 604.7]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'lumidouce_bell',
        common_enemy_drops: 'meshing_gear',
        normal_boss_drops: 'fontemer_unihorn',
        talent_books: 'books_of_order',
        weekly_boss_drops: 'lightless_eye_of_the_maelstrom'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5313, 0.5745, 0.6178, 0.6796, 0.7228, 0.7722, 0.8402, 0.9082, 0.9761, 1.0502]
                },
                {
                    name: 'hit_2',
                    values: [0.4931, 0.5332, 0.5734, 0.6307, 0.6709, 0.7167, 0.7798, 0.8429, 0.9059, 0.9747]
                },
                {
                    name: 'hit_3',
                    values: [0.2764, 0.299, 0.3215, 0.3536, 0.3761, 0.4018, 0.4372, 0.4725, 0.5079, 0.5465]
                },
                {
                    name: 'hit_4',
                    values: [0.7726, 0.8355, 0.8984, 0.9882, 1.0511, 1.123, 1.2218, 1.3206, 1.4195, 1.5273]
                },
                {
                    name: 'charged_dmg',
                    values: [1.2169, 1.316, 1.415, 1.5565, 1.6556, 1.7688, 1.9244, 2.0801, 2.2357, 2.4055]
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
                    name: 'press_dmg',
                    values: [1.152, 1.2384, 1.3248, 1.44, 1.5264, 1.6128, 1.728, 1.8432, 1.9584, 2.0736]
                },
                {
                    name: 'hold_dmg',
                    values: [1.728, 1.8576, 1.9872, 2.16, 2.2896, 2.4192, 2.592, 2.7648, 2.9376, 3.1104]
                },
                {
                    name: 'overcharged_ball_dmg',
                    values: [2.824, 3.0358, 3.2476, 3.53, 3.7418, 3.9536, 4.236, 4.5184, 4.8008, 5.0832]
                },
                {
                    name: 'hp_regeneration_over_time',
                    values: [0.0267, 0.0287, 0.0307, 0.0333, 0.0353, 0.0373, 0.04, 0.0427, 0.0453, 0.048]
                },
                {
                    name: 'healing_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'surging_blade_dmg',
                    values: [0.288, 0.3096, 0.3312, 0.36, 0.3816, 0.4032, 0.432, 0.4608, 0.4896, 0.5184]
                },
                {
                    name: 'surging_blade_interval',
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
                    name: 'explosive_grenade_dmg',
                    values: [3.6816, 3.9577, 4.2338, 4.602, 4.8781, 5.1542, 5.5224, 5.8906, 6.2587, 6.6269]
                },
                {
                    name: 'secondary_explosive_shell_dmg',
                    values: [0.4909, 0.5277, 0.5645, 0.6136, 0.6504, 0.6872, 0.7363, 0.7854, 0.8345, 0.8836]
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
    id: 'Dehya',
    enkaId: 10000079,
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '4-7',
    baseStats: {
        [STATS.HP]: [1220.2, 3165.3, 7045.3, 9096.8, 10911.6, 12736.1, 14572.9, 15674.8],
        [STATS.ATK]: [20.7, 53.6, 119.3, 154.1, 184.8, 215.7, 246.8, 265.5],
        [STATS.DEF]: [48.9, 126.8, 282.2, 364.4, 437.1, 510.2, 583.8, 627.9]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'sand_grease_pupa',
        common_enemy_drops: 'faded_red_satin',
        normal_boss_drops: 'light_guiding_tetrahedron',
        talent_books: 'books_of_praxis',
        weekly_boss_drops: 'puppet_strings'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.6212, 0.6717, 0.7223, 0.7945, 0.8451, 0.9029, 0.9823, 1.0618, 1.1412, 1.2279]
                },
                {
                    name: 'hit_2',
                    values: [0.6171, 0.6673, 0.7176, 0.7893, 0.8395, 0.897, 0.9759, 1.0548, 1.1337, 1.2199]
                },
                {
                    name: 'hit_3',
                    values: [0.7663, 0.8287, 0.8911, 0.9802, 1.0425, 1.1138, 1.2118, 1.3099, 1.4079, 1.5148]
                },
                {
                    name: 'hit_4',
                    values: [0.9529, 1.0305, 1.108, 1.2188, 1.2964, 1.385, 1.5069, 1.6288, 1.7507, 1.8837]
                },
                {
                    name: 'charged_attack_cyclic_dmg',
                    values: [0.5633, 0.6092, 0.655, 0.7205, 0.7664, 0.8188, 0.8908, 0.9629, 1.0349, 1.1135]
                },
                {
                    name: 'charged_attack_final_dmg',
                    values: [1.0182, 1.1011, 1.184, 1.3024, 1.3853, 1.48, 1.6102, 1.7405, 1.8707, 2.0128]
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
                    name: 'indomitable_flame_dmg',
                    values: [1.1288, 1.2135, 1.2981, 1.411, 1.4957, 1.5803, 1.6932, 1.8061, 1.919, 2.0318]
                },
                {
                    name: 'ranging_flame_dmg',
                    values: [1.328, 1.4276, 1.5272, 1.66, 1.7596, 1.8592, 1.992, 2.1248, 2.2576, 2.3904]
                },
                {
                    name: 'field_dmg',
                    values: [0.602, 0.6472, 0.6923, 0.7525, 0.7977, 0.8428, 0.903, 0.9632, 1.0234, 1.0836]
                },
                {
                    name: 'mitigation',
                    values: [0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5]
                },
                {
                    name: 'redmanes_blood_maximum',
                    values: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
                },
                {
                    name: 'field_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'cd',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'flame_manes_fist_dmg',
                    values: [0.987, 1.061, 1.135, 1.2337, 1.3078, 1.3818, 1.4805, 1.5792, 1.6779, 1.7766]
                },
                {
                    name: 'incineration_drive_dmg',
                    values: [1.393, 1.4975, 1.602, 1.7413, 1.8457, 1.9502, 2.0895, 2.2288, 2.3681, 2.5074]
                },
                {
                    name: 'duration',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
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
    id: 'Gaming',
    enkaId: 10000092,
    rarity: RARITY.EPIC,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '12-22',
    baseStats: {
        [STATS.HP]: [957.4, 2459.5, 5263.5, 6731.9, 8030.9, 9328.9, 10627.9, 11418.7],
        [STATS.ATK]: [25.3, 65, 139, 177.8, 212.1, 246.4, 280.7, 301.6],
        [STATS.DEF]: [58.9, 151.4, 324.1, 414.5, 494.4, 574.3, 654.3, 703]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'starconch',
        common_enemy_drops: 'slime_condensate',
        normal_boss_drops: 'emperors_resolution',
        talent_books: 'books_of_prosperity',
        weekly_boss_drops: 'lightless_mass'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.8386, 0.9068, 0.9751, 1.0726, 1.1408, 1.2188, 1.3261, 1.4334, 1.5406, 1.6576]
                },
                {
                    name: 'hit_2',
                    values: [0.7904, 0.8548, 0.9191, 1.011, 1.0754, 1.1489, 1.25, 1.3511, 1.4522, 1.5625]
                },
                {
                    name: 'hit_3',
                    values: [1.0665, 1.1533, 1.2401, 1.3641, 1.4509, 1.5501, 1.6865, 1.8229, 1.9593, 2.1081]
                },
                {
                    name: 'hit_4',
                    values: [1.2795, 1.3836, 1.4878, 1.6366, 1.7407, 1.8597, 2.0234, 2.187, 2.3507, 2.5292]
                },
                {
                    name: 'charged_attack_cyclic_dmg',
                    values: [0.6252, 0.6761, 0.727, 0.7997, 0.8506, 0.9088, 0.9887, 1.0687, 1.1487, 1.2359]
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
                    values: [0.6415, 0.6937, 0.7459, 0.8205, 0.8727, 0.9324, 1.0144, 1.0964, 1.1785, 1.268]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.2826, 1.387, 1.4914, 1.6406, 1.745, 1.8643, 2.0284, 2.1924, 2.3565, 2.5354]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'plunging_attack_charmed_cloudstrider_dmg',
                    values: [2.304, 2.4768, 2.6496, 2.88, 3.0528, 3.2256, 3.456, 3.6864, 3.9168, 4.1472]
                },
                {
                    name: 'hp_cost',
                    values: [0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]
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
                    name: 'suanni_man_chai_smash_dmg',
                    values: [3.704, 3.9818, 4.2596, 4.63, 4.9078, 5.1856, 5.556, 5.9264, 6.2968, 6.6672]
                },
                {
                    name: 'skill_healing',
                    values: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
                },
                {
                    name: 'wushou_stance_duration',
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
    id: 'Lyney',
    enkaId: 10000084,
    rarity: RARITY.LEGENDARY,
    element: VISION.PYRO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '2-2',
    baseStats: {
        [STATS.HP]: [858, 2225.6, 4953.7, 6396.2, 7672.2, 8955.1, 10246.6, 11021.3],
        [STATS.ATK]: [24.8, 64.2, 143, 184.6, 221.4, 258.5, 295.7, 318.1],
        [STATS.DEF]: [41.9, 108.6, 241.8, 312.2, 374.5, 437.1, 500.2, 538]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'agnidus_agate',
        local_specialties: 'rainbow_rose',
        common_enemy_drops: 'recruits_insignia',
        normal_boss_drops: 'emperors_resolution',
        talent_books: 'books_of_equity',
        weekly_boss_drops: 'primordial_greenbloom'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3879, 0.4194, 0.451, 0.4961, 0.5277, 0.5638, 0.6134, 0.663, 0.7126, 0.7667]
                },
                {
                    name: 'hit_2',
                    values: [0.3801, 0.4111, 0.442, 0.4862, 0.5171, 0.5525, 0.6011, 0.6497, 0.6984, 0.7514]
                },
                {
                    name: 'hit_3',
                    values: [0.2726, 0.2948, 0.317, 0.3487, 0.3709, 0.3963, 0.4311, 0.466, 0.5009, 0.5389]
                },
                {
                    name: 'hit_4',
                    values: [0.5693, 0.6157, 0.662, 0.7282, 0.7745, 0.8275, 0.9003, 0.9731, 1.046, 1.1254]
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
                    name: 'aimed_shot',
                    values: [0.4386, 0.4743, 0.51, 0.561, 0.5967, 0.6375, 0.6936, 0.7497, 0.8058, 0.867]
                },
                {
                    name: 'aimed_shot_charge_level_1',
                    values: [1.24, 1.333, 1.426, 1.55, 1.643, 1.736, 1.86, 1.984, 2.108, 2.232]
                },
                {
                    name: 'prop_arrow_dmg',
                    values: [1.728, 1.8576, 1.9872, 2.16, 2.2896, 2.4192, 2.592, 2.7648, 2.9376, 3.1104]
                },
                {
                    name: 'hp_cost',
                    values: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
                },
                {
                    name: 'grin_malkin_hat_inherited_hp',
                    values: [0.64, 0.688, 0.736, 0.8, 0.848, 0.896, 0.96, 1.024, 1.088, 1.152]
                },
                {
                    name: 'grin_malkin_hat_duration',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                {
                    name: 'pyrotechnic_strike_dmg',
                    values: [2.12, 2.279, 2.438, 2.65, 2.809, 2.968, 3.18, 3.392, 3.604, 3.816]
                },
                {
                    name: 'spiritbreath_thorn_dmg',
                    values: [0.2755, 0.2962, 0.3168, 0.3444, 0.3651, 0.3857, 0.4133, 0.4408, 0.4684, 0.4959]
                },
                {
                    name: 'spiritbreath_thorn_interval',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [1.672, 1.7974, 1.9228, 2.09, 2.2154, 2.3408, 2.508, 2.6752, 2.8424, 3.0096]
                },
                {
                    name: 'skill_dmg_bonus',
                    values: [0.532, 0.5719, 0.6118, 0.665, 0.7049, 0.7448, 0.798, 0.8512, 0.9044, 0.9576]
                },
                {
                    name: 'hp_regeneration',
                    values: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
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
                    values: [1.54, 1.6555, 1.771, 1.925, 2.0405, 2.156, 2.31, 2.464, 2.618, 2.772]
                },
                {
                    name: 'explosive_firework_dmg',
                    values: [4.14, 4.4505, 4.761, 5.175, 5.4855, 5.796, 6.21, 6.624, 7.038, 7.452]
                },
                {
                    name: 'duration',
                    values: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
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
