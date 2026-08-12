import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";

export const hydro = [
    {
    id: 'Ayato',
    enkaId: 10000066,
    rarity: RARITY.LEGENDARY,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '3-26',
    avatar_icon: 'assets/avatar-icon/ayato-icon.png',
    baseStats: {
        [STATS.HP]: [1067.7, 2769.7, 6164.6, 7959.7, 9547.7, 11144.1, 12751.3, 13715.4],
        [STATS.ATK]: [23.3, 60.4, 134.4, 173.5, 208.1, 242.9, 278, 299],
        [STATS.DEF]: [59.8, 155.2, 345.4, 446, 535, 624.5, 714.5, 768.6]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'sakura_bloom',
        common_enemy_drops: 'old_handguard',
        normal_boss_drops: 'dew_of_repudiation',
        talent_books: 'books_of_elegance',
        weekly_boss_drops: 'mudra_of_the_malefic_general'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4496, 0.4862, 0.5228, 0.5751, 0.6117, 0.6535, 0.711, 0.7685, 0.826, 0.8888]
                },
                {
                    name: 'hit_2',
                    values: [0.4716, 0.51, 0.5483, 0.6032, 0.6416, 0.6854, 0.7457, 0.8061, 0.8664, 0.9322]
                },
                {
                    name: 'hit_3',
                    values: [0.5861, 0.6338, 0.6815, 0.7497, 0.7974, 0.8519, 0.9269, 1.0019, 1.0768, 1.1586]
                },
                {
                    name: 'hit_4',
                    values: [0.2945, 0.3185, 0.3424, 0.3767, 0.4006, 0.428, 0.4657, 0.5034, 0.541, 0.5821]
                },
                {
                    name: 'hit_5',
                    values: [0.756, 0.8176, 0.8791, 0.967, 1.0286, 1.0989, 1.1956, 1.2923, 1.389, 1.4945]
                },
                {
                    name: 'charged_dmg',
                    values: [1.2953, 1.4007, 1.5062, 1.6568, 1.7622, 1.8827, 2.0484, 2.2141, 2.3797, 2.5605]
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
                    name: 'shunsuiken_1_hit_dmg',
                    values: [0.5289, 0.572, 0.615, 0.6765, 0.7196, 0.7688, 0.8364, 0.9041, 0.9717, 1.0455]
                },
                {
                    name: 'shunsuiken_2_hit_dmg',
                    values: [0.5891, 0.6371, 0.685, 0.7535, 0.8015, 0.8563, 0.9316, 1.007, 1.0823, 1.1645]
                },
                {
                    name: 'shunsuiken_3_hit_dmg',
                    values: [0.6493, 0.7022, 0.755, 0.8305, 0.8834, 0.9438, 1.0268, 1.1099, 1.1929, 1.2835]
                },
                {
                    name: 'takimeguri_kanka_duration',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                },
                {
                    name: 'namisen_dmg_bonus',
                    values: [0.0056, 0.0061, 0.0065, 0.0072, 0.0076, 0.0082, 0.0089, 0.0096, 0.0103, 0.0111]
                },
                {
                    name: 'water_illusion_dmg',
                    values: [1.0148, 1.0974, 1.18, 1.298, 1.3806, 1.475, 1.6048, 1.7346, 1.8644, 2.006]
                },
                {
                    name: 'water_illusion_duration',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
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
                    name: 'bloomwater_blade_dmg',
                    values: [0.6646, 0.7144, 0.7642, 0.8307, 0.8805, 0.9304, 0.9968, 1.0633, 1.1298, 1.1962]
                },
                {
                    name: 'normal_attack_dmg_bonus',
                    values: [0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2]
                },
                {
                    name: 'duration',
                    values: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
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
    id: 'Yelan',
    enkaId: 10000060,
    rarity: RARITY.LEGENDARY,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '4-20',
    avatar_icon: 'assets/avatar-icon/yelan.png',
    baseStats: {
        [STATS.HP]: [1124.9, 2918, 6494.8, 8386.2, 10059.1, 11741.1, 13434.4, 14450.2],
        [STATS.ATK]: [19, 49.3, 109.7, 141.6, 169.8, 198.2, 226.8, 244],
        [STATS.DEF]: [42.7, 110.7, 246.3, 318, 381.5, 445.2, 509.5, 548]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'starconch',
        common_enemy_drops: 'recruits_insignia',
        normal_boss_drops: 'runic_fang',
        talent_books: 'books_of_prosperity',
        weekly_boss_drops: 'gilded_scale'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4068, 0.4399, 0.473, 0.5203, 0.5534, 0.5913, 0.6433, 0.6953, 0.7473, 0.8041]
                },
                {
                    name: 'hit_2',
                    values: [0.3904, 0.4222, 0.454, 0.4994, 0.5312, 0.5675, 0.6174, 0.6674, 0.7173, 0.7718]
                },
                {
                    name: 'hit_3',
                    values: [0.516, 0.558, 0.6, 0.66, 0.702, 0.75, 0.816, 0.882, 0.948, 1.02]
                },
                {
                    name: 'hit_4',
                    values: [0.3251, 0.3515, 0.378, 0.4158, 0.4423, 0.4725, 0.5141, 0.5557, 0.5972, 0.6426]
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
                    name: 'breakthrough_barb_dmg',
                    values: [0.1158, 0.1244, 0.1331, 0.1447, 0.1534, 0.1621, 0.1736, 0.1852, 0.1968, 0.2084]
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
                    values: [0.2261, 0.2431, 0.2601, 0.2827, 0.2996, 0.3166, 0.3392, 0.3618, 0.3844, 0.407]
                },
                {
                    name: 'max_duration_hold',
                    values: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
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
                    name: 'skill_dmg',
                    values: [0.0731, 0.0786, 0.084, 0.0914, 0.0968, 0.1023, 0.1096, 0.1169, 0.1242, 0.1315]
                },
                {
                    name: 'exquisite_throw_dmg',
                    values: [0.0487, 0.0524, 0.056, 0.0609, 0.0646, 0.0682, 0.0731, 0.078, 0.0828, 0.0877]
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
    id: 'SangonomiyaKokomi',
    enkaId: 10000054,
    rarity: RARITY.LEGENDARY,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '2-22',
    avatar_icon: 'assets/avatar-icon/kokomi.png',
    baseStats: {
        [STATS.HP]: [1048.7, 2720.2, 6054.5, 7817.6, 9377.2, 10945.1, 12523.6, 13470.5],
        [STATS.ATK]: [18.2, 47.3, 105.4, 136, 163.2, 190.5, 217.9, 234.4],
        [STATS.DEF]: [51.2, 132.7, 295.3, 381.4, 457.4, 533.9, 610.9, 657.1]
    },
    ascensionStat: STATS.HYDRO_DMG,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'sango_pearl',
        common_enemy_drops: 'spectral_husk',
        normal_boss_drops: 'dew_of_repudiation',
        talent_books: 'books_of_transience',
        weekly_boss_drops: 'hellfire_butterfly'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.6838, 0.735, 0.7863, 0.8547, 0.906, 0.9573, 1.0256, 1.094, 1.1624, 1.2308]
                },
                {
                    name: 'hit_2',
                    values: [0.6154, 0.6615, 0.7077, 0.7692, 0.8154, 0.8615, 0.9231, 0.9846, 1.0462, 1.1077]
                },
                {
                    name: 'hit_3',
                    values: [0.9431, 1.0138, 1.0845, 1.1788, 1.2495, 1.3203, 1.4146, 1.5089, 1.6032, 1.6975]
                },
                {
                    name: 'charged_dmg',
                    values: [1.4832, 1.5944, 1.7057, 1.854, 1.9652, 2.0765, 2.2248, 2.3731, 2.5214, 2.6698]
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
                    name: 'regeneration',
                    values: [0.044, 0.0473, 0.0506, 0.055, 0.0583, 0.0616, 0.066, 0.0704, 0.0748, 0.0792]
                },
                {
                    name: 'ripple_dmg',
                    values: [1.0919, 1.1738, 1.2557, 1.3649, 1.4468, 1.5287, 1.6379, 1.747, 1.8562, 1.9654]
                },
                {
                    name: 'duration',
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
                    name: 'skill_dmg',
                    values: [0.1042, 0.112, 0.1198, 0.1302, 0.138, 0.1458, 0.1562, 0.1667, 0.1771, 0.1875]
                },
                {
                    name: 'normal_attack_dmg_bonus',
                    values: [0.0484, 0.052, 0.0557, 0.0605, 0.0641, 0.0678, 0.0726, 0.0774, 0.0823, 0.0871]
                },
                {
                    name: 'charged_attack_dmg_bonus',
                    values: [0.0678, 0.0728, 0.0779, 0.0847, 0.0898, 0.0949, 0.1016, 0.1084, 0.1152, 0.122]
                },
                {
                    name: 'bake_kurage_dmg_bonus',
                    values: [0.071, 0.0763, 0.0816, 0.0887, 0.094, 0.0993, 0.1064, 0.1135, 0.1206, 0.1277]
                },
                {
                    name: 'hp_regeneration_per_hit',
                    values: [0.0081, 0.0087, 0.0093, 0.0101, 0.0107, 0.0113, 0.0121, 0.0129, 0.0137, 0.0145]
                },
                {
                    name: 'duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
    id: 'Mona',
    enkaId: 10000041,
    rarity: RARITY.LEGENDARY,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '8-31',
    avatar_icon: 'assets/avatar-icon/mona.png',
    baseStats: {
        [STATS.HP]: [810.3, 2102, 4678.5, 6040.9, 7246, 8457.6, 9677.3, 10409],
        [STATS.ATK]: [22.3, 58, 129, 166.6, 199.8, 233.2, 266.8, 287],
        [STATS.DEF]: [50.9, 131.9, 293.6, 379.1, 454.8, 530.8, 607.3, 653.3]
    },
    ascensionStat: STATS.ENERGY_RECHARGE,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'philanemo_mushroom',
        common_enemy_drops: 'whopperflower_nectar',
        normal_boss_drops: 'cleansing_heart',
        talent_books: 'books_of_resistance',
        weekly_boss_drops: 'ring_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.376, 0.4042, 0.4324, 0.47, 0.4982, 0.5264, 0.564, 0.6016, 0.6392, 0.6768]
                },
                {
                    name: 'hit_2',
                    values: [0.36, 0.387, 0.414, 0.45, 0.477, 0.504, 0.54, 0.576, 0.612, 0.648]
                },
                {
                    name: 'hit_3',
                    values: [0.448, 0.4816, 0.5152, 0.56, 0.5936, 0.6272, 0.672, 0.7168, 0.7616, 0.8064]
                },
                {
                    name: 'hit_4',
                    values: [0.5616, 0.6037, 0.6458, 0.702, 0.7441, 0.7862, 0.8424, 0.8986, 0.9547, 1.0109]
                },
                {
                    name: 'charged_dmg',
                    values: [1.4972, 1.6095, 1.7218, 1.8715, 1.9838, 2.0961, 2.2458, 2.3955, 2.5452, 2.695]
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
                    name: 'dot_dmg',
                    values: [0.32, 0.344, 0.368, 0.4, 0.424, 0.448, 0.48, 0.512, 0.544, 0.576]
                },
                {
                    name: 'explosion_dmg',
                    values: [1.328, 1.4276, 1.5272, 1.66, 1.7596, 1.8592, 1.992, 2.1248, 2.2576, 2.3904]
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
                    name: 'illusory_bubble_duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: 'illusory_bubble_explosion_dmg',
                    values: [4.424, 4.7558, 5.0876, 5.53, 5.8618, 6.1936, 6.636, 7.0784, 7.5208, 7.9632]
                },
                {
                    name: 'dmg_bonus',
                    values: [0.42, 0.44, 0.46, 0.48, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6]
                },
                {
                    name: 'omen_duration',
                    values: [4, 4, 4, 4.5, 4.5, 4.5, 5, 5, 5, 5]
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
    id: 'Tartaglia',
    enkaId: 10000033,
    rarity: RARITY.LEGENDARY,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '7-20',
    avatar_icon: 'assets/avatar-icon/tartaglia.png',
    baseStats: {
        [STATS.HP]: [1020.1, 2646, 5889.4, 7604.4, 9121.4, 10646.6, 12182, 13103.1],
        [STATS.ATK]: [23.5, 60.9, 135.5, 174.9, 209.8, 244.9, 280.2, 301.4],
        [STATS.DEF]: [63.4, 164.5, 366.2, 472.8, 567.1, 661.9, 757.4, 814.7]
    },
    ascensionStat: STATS.HYDRO_DMG,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'starconch',
        common_enemy_drops: 'recruits_insignia',
        normal_boss_drops: 'cleansing_heart',
        talent_books: 'books_of_freedom',
        weekly_boss_drops: 'shard_of_a_foul_legacy'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4128, 0.4464, 0.48, 0.528, 0.5616, 0.6, 0.6528, 0.7056, 0.7584, 0.816]
                },
                {
                    name: 'hit_2',
                    values: [0.4627, 0.5003, 0.538, 0.5918, 0.6295, 0.6725, 0.7317, 0.7909, 0.85, 0.9146]
                },
                {
                    name: 'hit_3',
                    values: [0.5538, 0.5989, 0.644, 0.7084, 0.7535, 0.805, 0.8758, 0.9467, 1.0175, 1.0948]
                },
                {
                    name: 'hit_4',
                    values: [0.5702, 0.6166, 0.663, 0.7293, 0.7757, 0.8288, 0.9017, 0.9746, 1.0475, 1.1271]
                },
                {
                    name: 'hit_5',
                    values: [0.6089, 0.6584, 0.708, 0.7788, 0.8284, 0.885, 0.9629, 1.0408, 1.1186, 1.2036]
                },
                {
                    name: 'hit_6',
                    values: [0.7276, 0.7868, 0.846, 0.9306, 0.9898, 1.0575, 1.1506, 1.2436, 1.3367, 1.4382]
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
                    name: 'riptide_flash_dmg',
                    values: [0.124, 0.1333, 0.1426, 0.155, 0.1643, 0.1736, 0.186, 0.1984, 0.2108, 0.2232]
                },
                {
                    name: 'riptide_burst_dmg',
                    values: [0.62, 0.6665, 0.713, 0.775, 0.8215, 0.868, 0.93, 0.992, 1.054, 1.116]
                },
                {
                    name: 'riptide_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
                    name: 'stance_change_dmg',
                    values: [0.72, 0.774, 0.828, 0.9, 0.954, 1.008, 1.08, 1.152, 1.224, 1.296]
                },
                {
                    name: 'hit_1',
                    values: [0.3887, 0.4204, 0.452, 0.4972, 0.5288, 0.565, 0.6147, 0.6644, 0.7142, 0.7684]
                },
                {
                    name: 'hit_2',
                    values: [0.4162, 0.4501, 0.484, 0.5324, 0.5663, 0.605, 0.6582, 0.7115, 0.7647, 0.8228]
                },
                {
                    name: 'hit_3',
                    values: [0.5633, 0.6092, 0.655, 0.7205, 0.7664, 0.8188, 0.8908, 0.9629, 1.0349, 1.1135]
                },
                {
                    name: 'hit_4',
                    values: [0.5994, 0.6482, 0.697, 0.7667, 0.8155, 0.8713, 0.9479, 1.0246, 1.1013, 1.1849]
                },
                {
                    name: 'hit_5',
                    values: [0.553, 0.598, 0.643, 0.7073, 0.7523, 0.8038, 0.8745, 0.9452, 1.0159, 1.0931]
                },
                {
                    name: 'hit_6',
                    values: [0.3543, 0.3832, 0.412, 0.4532, 0.482, 0.515, 0.5603, 0.6056, 0.651, 0.7004]
                },
                {
                    name: 'charged_dmg',
                    values: [0.602, 0.651, 0.7, 0.77, 0.819, 0.875, 0.952, 1.029, 1.106, 1.19]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'riptide_slash',
                    values: [0.602, 0.651, 0.7, 0.77, 0.819, 0.875, 0.952, 1.029, 1.106, 1.19]
                },
                {
                    name: 'max_duration',
                    values: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
                },
                {
                    name: 'preemptive_cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                },
                {
                    name: 'max_cd',
                    values: [45, 45, 45, 45, 45, 45, 45, 45, 45, 45]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg_melee',
                    values: [4.64, 4.988, 5.336, 5.8, 6.148, 6.496, 6.96, 7.424, 7.888, 8.352]
                },
                {
                    name: 'skill_dmg_ranged',
                    values: [3.784, 4.0678, 4.3516, 4.73, 5.0138, 5.2976, 5.676, 6.0544, 6.4328, 6.8112]
                },
                {
                    name: 'riptide_blast_dmg',
                    values: [1.2, 1.29, 1.38, 1.5, 1.59, 1.68, 1.8, 1.92, 2.04, 2.16]
                },
                {
                    name: 'energy_return_ranged',
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
    id: 'Xingqiu',
    enkaId: 10000025,
    rarity: RARITY.EPIC,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '10-9',
    avatar_icon: 'assets/avatar-icon/xingqiu.png',
    baseStats: {
        [STATS.HP]: [857.1, 2201.8, 4712.1, 6026.7, 7189.5, 8351.6, 9514.5, 10222.4],
        [STATS.ATK]: [16.9, 43.5, 93, 119, 141.9, 164.8, 187.8, 201.8],
        [STATS.DEF]: [63.5, 163.2, 349.2, 446.6, 532.8, 618.9, 705.1, 757.6]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'silk_flower',
        common_enemy_drops: 'damaged_mask',
        normal_boss_drops: 'cleansing_heart',
        talent_books: 'books_of_gold',
        weekly_boss_drops: 'tail_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4661, 0.5041, 0.542, 0.5962, 0.6341, 0.6775, 0.7371, 0.7967, 0.8564, 0.9214]
                },
                {
                    name: 'hit_2',
                    values: [0.4764, 0.5152, 0.554, 0.6094, 0.6482, 0.6925, 0.7534, 0.8144, 0.8753, 0.9418]
                },
                {
                    name: 'hit_3',
                    values: [0.2855, 0.3088, 0.332, 0.3652, 0.3884, 0.415, 0.4515, 0.488, 0.5246, 0.5644]
                },
                {
                    name: 'hit_4',
                    values: [0.5599, 0.6054, 0.651, 0.7161, 0.7617, 0.8138, 0.8854, 0.957, 1.0286, 1.1067]
                },
                {
                    name: 'hit_5',
                    values: [0.3586, 0.3878, 0.417, 0.4587, 0.4879, 0.5213, 0.5671, 0.613, 0.6589, 0.7089]
                },
                {
                    name: 'charged_dmg',
                    values: [0.473, 0.5115, 0.55, 0.605, 0.6435, 0.6875, 0.748, 0.8085, 0.869, 0.935]
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
                    values: [1.68, 1.806, 1.932, 2.1, 2.226, 2.352, 2.52, 2.688, 2.856, 3.024]
                },
                {
                    name: 'damage_reduction_ratio',
                    values: [0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29]
                },
                {
                    name: 'duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'cd',
                    values: [21, 21, 21, 21, 21, 21, 21, 21, 21, 21]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'sword_rain_dmg',
                    values: [0.5427, 0.5834, 0.6241, 0.6784, 0.7191, 0.7598, 0.8141, 0.8684, 0.9226, 0.9769]
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
    id: 'Barbara',
    enkaId: 10000014,
    rarity: RARITY.EPIC,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '7-5',
    avatar_icon: 'assets/avatar-icon/barbara.png',
    baseStats: {
        [STATS.HP]: [820.6, 2108.2, 4511.6, 5770.2, 6883.6, 7996.2, 9109.6, 9787.4],
        [STATS.ATK]: [13.4, 34.3, 73.4, 93.9, 112, 130.1, 148.3, 159.3],
        [STATS.DEF]: [56.1, 144.1, 308.3, 394.3, 470.4, 546.5, 622.5, 668.9]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'philanemo_mushroom',
        common_enemy_drops: 'divining_scroll',
        normal_boss_drops: 'cleansing_heart',
        talent_books: 'books_of_freedom',
        weekly_boss_drops: 'ring_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3784, 0.4068, 0.4352, 0.473, 0.5014, 0.5298, 0.5676, 0.6054, 0.6433, 0.6811]
                },
                {
                    name: 'hit_2',
                    values: [0.3552, 0.3818, 0.4085, 0.444, 0.4706, 0.4973, 0.5328, 0.5683, 0.6038, 0.6394]
                },
                {
                    name: 'hit_3',
                    values: [0.4104, 0.4412, 0.472, 0.513, 0.5438, 0.5746, 0.6156, 0.6566, 0.6977, 0.7387]
                },
                {
                    name: 'hit_4',
                    values: [0.552, 0.5934, 0.6348, 0.69, 0.7314, 0.7728, 0.828, 0.8832, 0.9384, 0.9936]
                },
                {
                    name: 'charged_dmg',
                    values: [1.6624, 1.7871, 1.9118, 2.078, 2.2027, 2.3274, 2.4936, 2.6598, 2.8261, 2.9923]
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
                    name: 'hp_regeneration_per_hit',
                    values: [0.0075, 0.0081, 0.0086, 0.0094, 0.0099, 0.0105, 0.0113, 0.012, 0.0127, 0.0135]
                },
                {
                    name: 'continuous_regeneration',
                    values: [0.04, 0.043, 0.046, 0.05, 0.053, 0.056, 0.06, 0.064, 0.068, 0.072]
                },
                {
                    name: 'droplet_dmg',
                    values: [0.584, 0.6278, 0.6716, 0.73, 0.7738, 0.8176, 0.876, 0.9344, 0.9928, 1.0512]
                },
                {
                    name: 'duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'cd',
                    values: [32, 32, 32, 32, 32, 32, 32, 32, 32, 32]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'regeneration',
                    values: [0.176, 0.1892, 0.2024, 0.22, 0.2332, 0.2464, 0.264, 0.2816, 0.2992, 0.3168]
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
    id: 'Candace',
    enkaId: 10000072,
    rarity: RARITY.EPIC,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '5-3',
    avatar_icon: 'assets/avatar-icon/candace.png',
    baseStats: {
        [STATS.HP]: [911.8, 2342.4, 5012.9, 6411.3, 7648.5, 8884.7, 10121.8, 10874.9],
        [STATS.ATK]: [17.8, 45.7, 97.9, 125.2, 149.4, 173.5, 197.7, 212.4],
        [STATS.DEF]: [57.2, 147, 314.6, 402.4, 480, 557.6, 635.3, 682.5]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'henna_berry',
        common_enemy_drops: 'faded_red_satin',
        normal_boss_drops: 'light_guiding_tetrahedron',
        talent_books: 'books_of_admonition',
        weekly_boss_drops: 'tears_of_the_calamitous_god'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.608, 0.6575, 0.707, 0.7777, 0.8272, 0.8838, 0.9615, 1.0393, 1.1171, 1.2019]
                },
                {
                    name: 'hit_2',
                    values: [0.6115, 0.6612, 0.711, 0.7821, 0.8319, 0.8888, 0.967, 1.0452, 1.1234, 1.2087]
                },
                {
                    name: 'hit_3',
                    values: [0.3549, 0.3838, 0.4127, 0.4539, 0.4828, 0.5158, 0.5612, 0.6066, 0.652, 0.7015]
                },
                {
                    name: 'hit_4',
                    values: [0.9494, 1.0267, 1.104, 1.2144, 1.2917, 1.38, 1.5014, 1.6229, 1.7443, 1.8768]
                },
                {
                    name: 'charged_dmg',
                    values: [1.2418, 1.3429, 1.444, 1.5884, 1.6895, 1.805, 1.9638, 2.1227, 2.2815, 2.4548]
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
                    name: 'shield_dmg_absorption',
                    values: [0.12, 0.129, 0.138, 0.15, 0.159, 0.168, 0.18, 0.192, 0.204, 0.216]
                },
                {
                    name: 'basic_dmg',
                    values: [0.12, 0.129, 0.138, 0.15, 0.159, 0.168, 0.18, 0.192, 0.204, 0.216]
                },
                {
                    name: 'charged_up_dmg',
                    values: [0.1904, 0.2047, 0.219, 0.238, 0.2523, 0.2666, 0.2856, 0.3046, 0.3237, 0.3427]
                },
                {
                    name: 'press_cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
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
                    name: 'skill_dmg',
                    values: [0.0661, 0.0711, 0.076, 0.0826, 0.0876, 0.0925, 0.0992, 0.1058, 0.1124, 0.119]
                },
                {
                    name: 'duration',
                    values: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
                },
                {
                    name: 'dmg_bonus',
                    values: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
                },
                {
                    name: 'wave_impact_dmg',
                    values: [0.0661, 0.0711, 0.076, 0.0826, 0.0876, 0.0925, 0.0992, 0.1058, 0.1124, 0.119]
                },
                {
                    name: 'wave_instances',
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
},
    {
    id: 'Nilou',
    enkaId: 10000070,
    rarity: RARITY.LEGENDARY,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '12-3',
    avatar_icon: 'assets/avatar-icon/nilou.png',
    baseStats: {
        [STATS.HP]: [1182.1, 3066.4, 6825.1, 8812.6, 10570.6, 12338.1, 14117.5, 15184.9],
        [STATS.ATK]: [17.9, 46.4, 103.2, 133.3, 159.8, 186.6, 213.5, 229.6],
        [STATS.DEF]: [56.7, 147.1, 327.5, 422.8, 507.2, 592, 677.4, 728.6]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'padisarah',
        common_enemy_drops: 'fungal_spores',
        normal_boss_drops: 'perpetual_caliber',
        talent_books: 'books_of_praxis',
        weekly_boss_drops: 'tears_of_the_calamitous_god'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5031, 0.544, 0.585, 0.6435, 0.6844, 0.7312, 0.7956, 0.8599, 0.9243, 0.9944]
                },
                {
                    name: 'hit_2',
                    values: [0.4544, 0.4914, 0.5284, 0.5812, 0.6182, 0.6605, 0.7186, 0.7767, 0.8348, 0.8982]
                },
                {
                    name: 'hit_3',
                    values: [0.7035, 0.7608, 0.8181, 0.8999, 0.9571, 1.0226, 1.1126, 1.2026, 1.2926, 1.3907]
                },
                {
                    name: 'charged_dmg',
                    values: [0.5022, 0.5431, 0.584, 0.6424, 0.6833, 0.73, 0.7942, 0.8585, 0.9227, 0.9928]
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
                    values: [0.0334, 0.0359, 0.0384, 0.0417, 0.0442, 0.0467, 0.0501, 0.0534, 0.0568, 0.0601]
                },
                {
                    name: 'sword_dance_whirling_steps_1_hit_dmg',
                    values: [0.0455, 0.0489, 0.0524, 0.0569, 0.0603, 0.0637, 0.0683, 0.0728, 0.0774, 0.0819]
                },
                {
                    name: 'sword_dance_whirling_steps_2_hit_dmg',
                    values: [0.0514, 0.0553, 0.0592, 0.0643, 0.0682, 0.072, 0.0772, 0.0823, 0.0875, 0.0926]
                },
                {
                    name: 'luminous_illusion_water_wheel_dmg',
                    values: [0.0717, 0.0771, 0.0824, 0.0896, 0.095, 0.1004, 0.1075, 0.1147, 0.1219, 0.129]
                },
                {
                    name: 'pirouette_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'lunar_prayer_duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: 'tranquility_aura_duration',
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
                    values: [0.1843, 0.1981, 0.212, 0.2304, 0.2442, 0.258, 0.2765, 0.2949, 0.3133, 0.3318]
                },
                {
                    name: 'lingering_aeon_dmg',
                    values: [0.2253, 0.2422, 0.2591, 0.2816, 0.2985, 0.3154, 0.3379, 0.3604, 0.383, 0.4055]
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
    id: 'Columbina',
    enkaId: 10000125,
    rarity: RARITY.LEGENDARY,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '1-14',
    baseStats: {
        [STATS.HP]: [1144, 2967.5, 6604.9, 8528.3, 10229.6, 11940.1, 13662.1, 14695.1],
        [STATS.ATK]: [7.4, 19.3, 43, 55.5, 66.6, 77.7, 88.9, 95.7],
        [STATS.DEF]: [40.1, 104, 231.4, 298.8, 358.5, 418.4, 478.7, 514.9]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'winter_icelea',
        common_enemy_drops: 'slime_condensate',
        normal_boss_drops: 'radiant_antler',
        talent_books: 'books_of_moonlight',
        weekly_boss_drops: 'mask_of_the_virtuous_doctor'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4679, 0.503, 0.5381, 0.5849, 0.62, 0.6551, 0.7019, 0.7487, 0.7955, 0.8423]
                },
                {
                    name: 'hit_2',
                    values: [0.3663, 0.3937, 0.4212, 0.4578, 0.4853, 0.5128, 0.5494, 0.586, 0.6226, 0.6593]
                },
                {
                    name: 'hit_3',
                    values: [0.5848, 0.6287, 0.6726, 0.7311, 0.7749, 0.8188, 0.8773, 0.9357, 0.9942, 1.0527]
                },
                {
                    name: 'charged_dmg',
                    values: [1.1608, 1.2479, 1.3349, 1.451, 1.5381, 1.6251, 1.7412, 1.8573, 1.9734, 2.0894]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
                },
                {
                    name: 'moondew_cleanse_dmg',
                    values: [0.0151, 0.0162, 0.0174, 0.0189, 0.02, 0.0212, 0.0227, 0.0242, 0.0257, 0.0272]
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
                    values: [0.1672, 0.1797, 0.1923, 0.209, 0.2215, 0.2341, 0.2508, 0.2675, 0.2842, 0.301]
                },
                {
                    name: 'gravity_ripple_continuous_dmg',
                    values: [0.0936, 0.1006, 0.1076, 0.117, 0.124, 0.131, 0.1404, 0.1498, 0.1591, 0.1685]
                },
                {
                    name: 'gravity_interference_lunar_charged_dmg',
                    values: [0.047, 0.0506, 0.0541, 0.0588, 0.0623, 0.0659, 0.0706, 0.0753, 0.08, 0.0847]
                },
                {
                    name: 'gravity_interference_lunar_bloom_dmg',
                    values: [0.0141, 0.0151, 0.0162, 0.0176, 0.0187, 0.0197, 0.0211, 0.0225, 0.0239, 0.0253]
                },
                {
                    name: 'gravity_interference_lunar_crystallize_dmg',
                    values: [0.0882, 0.0949, 0.1015, 0.1103, 0.1169, 0.1235, 0.1324, 0.1412, 0.15, 0.1588]
                },
                {
                    name: 'gravity_limit',
                    values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
                },
                {
                    name: 'gravity_ripple_duration',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
                },
                {
                    name: 'cd',
                    values: [17, 17, 17, 17, 17, 17, 17, 17, 17, 17]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [0.3224, 0.3466, 0.3708, 0.403, 0.4272, 0.4514, 0.4836, 0.5158, 0.5481, 0.5803]
                },
                {
                    name: 'lunar_reaction_dmg_bonus',
                    values: [0.13, 0.16, 0.19, 0.22, 0.25, 0.28, 0.31, 0.34, 0.37, 0.4]
                },
                {
                    name: 'lunar_domain_duration',
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
}
,
{
    id: 'Aino',
    enkaId: 10000121,
    rarity: RARITY.EPIC,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '9-21',
    baseStats: {
        [STATS.HP]: [939.1, 2412.7, 5163.3, 6603.7, 7877.9, 9151.2, 10425.4, 11201.2],
        [STATS.ATK]: [20.3, 52.2, 111.6, 142.7, 170.3, 197.8, 225.4, 242.1],
        [STATS.DEF]: [50.9, 130.8, 280, 358.1, 427.2, 496.3, 565.4, 607.4]
    },
    ascensionStat: STATS.ELEMENTAL_MASTERY,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'portable_bearing',
        common_enemy_drops: 'broken_drive_shaft',
        normal_boss_drops: 'precision_kuuvahki_stamping_die',
        talent_books: 'books_of_elysium',
        weekly_boss_drops: 'silken_feather'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.665, 0.7191, 0.7732, 0.8506, 0.9047, 0.9666, 1.0516, 1.1367, 1.2217, 1.3145]
                },
                {
                    name: 'hit_2',
                    values: [0.6619, 0.7158, 0.7697, 0.8466, 0.9005, 0.9621, 1.0468, 1.1314, 1.2161, 1.3084]
                },
                {
                    name: 'hit_3',
                    values: [0.4922, 0.5322, 0.5723, 0.6295, 0.6696, 0.7154, 0.7783, 0.8413, 0.9042, 0.9729]
                },
                {
                    name: 'charged_attack_loop_dmg',
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
                    name: 'stage_1_dmg',
                    values: [0.656, 0.7052, 0.7544, 0.82, 0.8692, 0.9184, 0.984, 1.0496, 1.1152, 1.1808]
                },
                {
                    name: 'stage_2_dmg',
                    values: [1.888, 2.0296, 2.1712, 2.36, 2.5016, 2.6432, 2.832, 3.0208, 3.2096, 3.3984]
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
                    name: 'water_ball_dmg',
                    values: [0.2011, 0.2162, 0.2313, 0.2514, 0.2665, 0.2816, 0.3017, 0.3218, 0.3419, 0.362]
                },
                {
                    name: 'duration',
                    values: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14]
                },
                {
                    name: 'cd',
                    values: [13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5]
                },
                {
                    name: 'energy_cost',
                    values: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
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
    id: 'Neuvillette',
    enkaId: 10000087,
    rarity: RARITY.LEGENDARY,
    element: VISION.HYDRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '12-18',
    baseStats: {
        [STATS.HP]: [1144, 2967.5, 6604.9, 8528.3, 10229.6, 11940.1, 13662.1, 14695.1],
        [STATS.ATK]: [16.2, 42.1, 93.6, 120.9, 145, 169.3, 193.7, 208.3],
        [STATS.DEF]: [44.9, 116.4, 259.1, 334.5, 401.3, 468.4, 535.9, 576.4]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'varunada_lazurite',
        local_specialties: 'lumitoile',
        common_enemy_drops: 'transoceanic_pearl',
        normal_boss_drops: 'fontemer_unihorn',
        talent_books: 'books_of_equity',
        weekly_boss_drops: 'everamber'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5458, 0.5867, 0.6276, 0.6822, 0.7231, 0.7641, 0.8187, 0.8732, 0.9278, 0.9824]
                },
                {
                    name: 'hit_2',
                    values: [0.4625, 0.4971, 0.5318, 0.5781, 0.6128, 0.6474, 0.6937, 0.7399, 0.7862, 0.8324]
                },
                {
                    name: 'hit_3',
                    values: [0.7234, 0.7776, 0.8319, 0.9042, 0.9585, 1.0127, 1.0851, 1.1574, 1.2297, 1.3021]
                },
                {
                    name: 'charged_dmg',
                    values: [1.368, 1.4706, 1.5732, 1.71, 1.8126, 1.9152, 2.052, 2.1888, 2.3256, 2.4624]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
                },
                {
                    name: 'charged_attack_equitable_judgment',
                    values: [0.0732, 0.0791, 0.0851, 0.0936, 0.0996, 0.1064, 0.1157, 0.1251, 0.1345, 0.1447]
                },
                {
                    name: 'heal_amount',
                    values: [0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16]
                },
                {
                    name: 'hp_loss',
                    values: [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08]
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
                    values: [0.1286, 0.1383, 0.1479, 0.1608, 0.1704, 0.1801, 0.193, 0.2058, 0.2187, 0.2316]
                },
                {
                    name: 'spiritbreath_thorn_dmg',
                    values: [0.208, 0.2236, 0.2392, 0.26, 0.2756, 0.2912, 0.312, 0.3328, 0.3536, 0.3744]
                },
                {
                    name: 'spiritbreath_thorn_interval',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'sourcewater_droplet_duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
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
                    values: [0.2226, 0.2393, 0.256, 0.2782, 0.2949, 0.3116, 0.3339, 0.3561, 0.3784, 0.4006]
                },
                {
                    name: 'waterfall_dmg',
                    values: [0.0911, 0.0979, 0.1047, 0.1138, 0.1206, 0.1275, 0.1366, 0.1457, 0.1548, 0.1639]
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
];
