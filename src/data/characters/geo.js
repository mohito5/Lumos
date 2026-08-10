import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";

export const geo = [
    {
    id: 'Chiori',
    enkaId: 10000095,
    rarity: RARITY.LEGENDARY,
    element: VISION.GEO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '8-17',
    avatar_icon: 'assets/avatar-icon/chiori_icon.png',
    baseStats: {
        [STATS.HP]: [890.4, 2309.7, 5140.8, 6637.9, 7962.1, 9293.4, 10633.6, 11437.7],
        [STATS.ATK]: [25.1, 65.2, 145.1, 187.4, 224.8, 262.4, 300.2, 322.9],
        [STATS.DEF]: [74.2, 192.4, 428.3, 553.1, 663.4, 774.3, 886, 953]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'prithiva_topaz',
        local_specialties: 'dendrobium',
        common_enemy_drops: 'spectral_husk',
        normal_boss_drops: 'artificed_spare_clockwork_component_coppelia',
        talent_books: 'books_of_light',
        weekly_boss_drops: 'lightless_silk_string'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4941, 0.5343, 0.5745, 0.632, 0.6722, 0.7182, 0.7814, 0.8446, 0.9078, 0.9767]
                },
                {
                    name: 'hit_2',
                    values: [0.4683, 0.5065, 0.5446, 0.599, 0.6372, 0.6807, 0.7406, 0.8005, 0.8604, 0.9258]
                },
                {
                    name: 'hit_3',
                    values: [0.3042, 0.3289, 0.3537, 0.389, 0.4138, 0.4421, 0.481, 0.5199, 0.5588, 0.6013]
                },
                {
                    name: 'hit_4',
                    values: [0.7512, 0.8124, 0.8735, 0.9609, 1.022, 1.0919, 1.188, 1.2841, 1.3802, 1.485]
                },
                {
                    name: 'charged_dmg',
                    values: [0.5431, 0.5873, 0.6315, 0.6947, 0.7389, 0.7894, 0.8588, 0.9283, 0.9978, 1.0736]
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
                    name: 'tamoto_dmg',
                    values: [0.8208, 0.8824, 0.9439, 1.026, 1.0876, 1.1491, 1.2312, 1.3133, 1.3954, 1.4774]
                },
                {
                    name: 'tamoto_duration',
                    values: [17, 17, 17, 17, 17, 17, 17, 17, 17, 17]
                },
                {
                    name: 'tamoto_attack_interval',
                    values: [3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6]
                },
                {
                    name: 'upward_sweep_attack_dmg',
                    values: [1.4928, 1.6048, 1.7167, 1.866, 1.978, 2.0899, 2.2392, 2.3885, 2.5378, 2.687]
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
                    values: [2.5632, 2.7554, 2.9477, 3.204, 3.3962, 3.5885, 3.8448, 4.1011, 4.3574, 4.6138]
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
},
    {
    id: 'Zhongli',
    enkaId: 10000030,
    rarity: RARITY.LEGENDARY,
    element: VISION.GEO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '12-31',
    avatar_icon: 'assets/avatar-icon/zhongli.png',
    baseStats: {
        [STATS.HP]: [1144, 2967.5, 6604.9, 8528.3, 10229.6, 11940.1, 13662.1, 14695.1],
        [STATS.ATK]: [19.6, 50.7, 112.9, 145.7, 174.8, 204.1, 233.5, 251.1],
        [STATS.DEF]: [57.4, 149, 331.6, 428.2, 513.6, 599.5, 685.9, 737.8]
    },
    ascensionStat: STATS.GEO_DMG,
    ascensionMaterials: {
        ascension_gems: 'prithiva_topaz',
        local_specialties: 'cor_lapis',
        common_enemy_drops: 'slime_condensate',
        normal_boss_drops: 'basalt_pillar',
        talent_books: 'books_of_gold',
        weekly_boss_drops: 'tusk_of_monoceros_caeli'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3077, 0.3327, 0.3578, 0.3936, 0.4186, 0.4472, 0.4866, 0.5259, 0.5653, 0.6082]
                },
                {
                    name: 'hit_2',
                    values: [0.3115, 0.3369, 0.3622, 0.3985, 0.4238, 0.4528, 0.4926, 0.5325, 0.5723, 0.6158]
                },
                {
                    name: 'hit_3',
                    values: [0.3858, 0.4172, 0.4486, 0.4934, 0.5248, 0.5607, 0.61, 0.6594, 0.7087, 0.7626]
                },
                {
                    name: 'hit_4',
                    values: [0.4294, 0.4643, 0.4993, 0.5492, 0.5842, 0.6241, 0.679, 0.734, 0.7889, 0.8488]
                },
                {
                    name: 'hit_5',
                    values: [0.1075, 0.1163, 0.125, 0.1375, 0.1463, 0.1563, 0.17, 0.1838, 0.1975, 0.2125]
                },
                {
                    name: 'hit_6',
                    values: [0.545, 0.5893, 0.6337, 0.697, 0.7414, 0.7921, 0.8618, 0.9315, 1.0012, 1.0773]
                },
                {
                    name: 'charged_dmg',
                    values: [1.1103, 1.2006, 1.291, 1.4201, 1.5105, 1.6138, 1.7558, 1.8978, 2.0398, 2.1947]
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
                    name: 'stone_stele_resonance_dmg',
                    values: [0.16, 0.172, 0.184, 0.2, 0.212, 0.224, 0.24, 0.256, 0.272, 0.288]
                },
                {
                    name: 'press_cd',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                {
                    name: 'hold_dmg',
                    values: [0.8, 0.86, 0.92, 1, 1.06, 1.12, 1.2, 1.28, 1.36, 1.44]
                },
                {
                    name: 'shield_base_absorption',
                    values: [
                        1232.4108,
                        1355.6691,
                        1489.1987,
                        1633,
                        1787.0728,
                        1951.417,
                        2126.033,
                        2310.9202,
                        2506.079,
                        2711.5093
                    ]
                },
                {
                    name: 'additional_shield_absorption',
                    values: [0.128, 0.1376, 0.1472, 0.16, 0.1696, 0.1792, 0.192, 0.2048, 0.2176, 0.2304]
                },
                {
                    name: 'shield_duration',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'hold_cd',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [4.0108, 4.4444, 4.878, 5.42, 5.9078, 6.3956, 7.046, 7.6964, 8.3468, 8.9972]
                },
                {
                    name: 'petrification_duration',
                    values: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4]
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
    id: 'Albedo',
    enkaId: 10000038,
    rarity: RARITY.LEGENDARY,
    element: VISION.GEO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '9-13',
    avatar_icon: 'assets/avatar-icon/albedo.png',
    baseStats: {
        [STATS.HP]: [1029.6, 2670.7, 5944.4, 7675.5, 9206.7, 10746.1, 12295.9, 13225.6],
        [STATS.ATK]: [19.6, 50.7, 112.9, 145.7, 174.8, 204.1, 233.5, 251.1],
        [STATS.DEF]: [68.2, 176.9, 393.8, 508.5, 609.9, 711.9, 814.6, 876.2]
    },
    ascensionStat: STATS.GEO_DMG,
    ascensionMaterials: {
        ascension_gems: 'prithiva_topaz',
        local_specialties: 'cecilia',
        common_enemy_drops: 'divining_scroll',
        normal_boss_drops: 'basalt_pillar',
        talent_books: 'books_of_ballad',
        weekly_boss_drops: 'tusk_of_monoceros_caeli'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3674, 0.3973, 0.4272, 0.4699, 0.4998, 0.534, 0.581, 0.628, 0.675, 0.7262]
                },
                {
                    name: 'hit_2',
                    values: [0.3674, 0.3973, 0.4272, 0.4699, 0.4998, 0.534, 0.581, 0.628, 0.675, 0.7262]
                },
                {
                    name: 'hit_3',
                    values: [0.4745, 0.5132, 0.5518, 0.607, 0.6456, 0.6898, 0.7504, 0.8111, 0.8718, 0.9381]
                },
                {
                    name: 'hit_4',
                    values: [0.4975, 0.538, 0.5785, 0.6364, 0.6768, 0.7231, 0.7868, 0.8504, 0.914, 0.9835]
                },
                {
                    name: 'hit_5',
                    values: [0.6207, 0.6713, 0.7218, 0.794, 0.8445, 0.9022, 0.9816, 1.061, 1.1404, 1.227]
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
                    values: [1.304, 1.4018, 1.4996, 1.63, 1.7278, 1.8256, 1.956, 2.0864, 2.2168, 2.3472]
                },
                {
                    name: 'transient_blossom_dmg',
                    values: [1.336, 1.4362, 1.5364, 1.67, 1.7702, 1.8704, 2.004, 2.1376, 2.2712, 2.4048]
                },
                {
                    name: 'duration',
                    values: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
                },
                {
                    name: 'skill_cd',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'burst_dmg',
                    values: [3.672, 3.9474, 4.2228, 4.59, 4.8654, 5.1408, 5.508, 5.8752, 6.2424, 6.6096]
                },
                {
                    name: 'fatal_blossom_dmg',
                    values: [0.72, 0.774, 0.828, 0.9, 0.954, 1.008, 1.08, 1.152, 1.224, 1.296]
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
    id: 'AratakiItto',
    enkaId: 10000056,
    rarity: RARITY.LEGENDARY,
    element: VISION.GEO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '6-1',
    avatar_icon: 'assets/avatar-icon/itto.png',
    baseStats: {
        [STATS.HP]: [1001, 2596.6, 5779.3, 7462.3, 8950.9, 10447.6, 11954.3, 12858.2],
        [STATS.ATK]: [17.7, 45.9, 102.1, 131.9, 158.2, 184.6, 211.2, 227.2],
        [STATS.DEF]: [74.7, 193.7, 431.1, 556.6, 667.7, 779.3, 891.7, 959.2]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'prithiva_topaz',
        local_specialties: 'onikabuto',
        common_enemy_drops: 'slime_condensate',
        normal_boss_drops: 'riftborn_regalia',
        talent_books: 'books_of_elegance',
        weekly_boss_drops: 'ashen_heart'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7923, 0.8568, 0.9213, 1.0134, 1.0779, 1.1516, 1.253, 1.3543, 1.4557, 1.5662]
                },
                {
                    name: 'hit_2',
                    values: [0.7637, 0.8258, 0.888, 0.9768, 1.039, 1.11, 1.2077, 1.3054, 1.403, 1.5096]
                },
                {
                    name: 'hit_3',
                    values: [0.9164, 0.991, 1.0656, 1.1722, 1.2468, 1.332, 1.4492, 1.5664, 1.6836, 1.8115]
                },
                {
                    name: 'hit_4',
                    values: [1.1722, 1.2677, 1.3631, 1.4994, 1.5948, 1.7039, 1.8538, 2.0037, 2.1537, 2.3172]
                },
                {
                    name: 'arataki_kesagiri_combo_slash_dmg',
                    values: [0.9116, 0.9858, 1.06, 1.166, 1.2402, 1.325, 1.4416, 1.5582, 1.6748, 1.802]
                },
                {
                    name: 'arataki_kesagiri_final_slash_dmg',
                    values: [1.9092, 2.0646, 2.22, 2.442, 2.5974, 2.775, 3.0192, 3.2634, 3.5076, 3.774]
                },
                {
                    name: 'superlative_superstrength_duration',
                    values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
                },
                {
                    name: 'saichimonji_slash_dmg',
                    values: [0.9047, 0.9784, 1.052, 1.1572, 1.2308, 1.315, 1.4307, 1.5464, 1.6622, 1.7884]
                },
                {
                    name: 'saichimonji_slash_stamina_cost',
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
                    name: 'skill_dmg',
                    values: [3.072, 3.3024, 3.5328, 3.84, 4.0704, 4.3008, 4.608, 4.9152, 5.2224, 5.5296]
                },
                {
                    name: 'inherited_hp',
                    values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
                    name: 'atk_bonus',
                    values: [0.576, 0.6192, 0.6624, 0.72, 0.7632, 0.8064, 0.864, 0.9216, 0.9792, 1.0368]
                },
                {
                    name: 'atk_spd_bonus',
                    values: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
                },
                {
                    name: 'duration',
                    values: [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
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
    id: 'Ningguang',
    enkaId: 10000027,
    rarity: RARITY.EPIC,
    element: VISION.GEO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '8-26',
    avatar_icon: 'assets/avatar-icon/ningguang.png',
    baseStats: {
        [STATS.HP]: [820.6, 2108.2, 4511.6, 5770.2, 6883.6, 7996.2, 9109.6, 9787.4],
        [STATS.ATK]: [17.8, 45.7, 97.9, 125.2, 149.4, 173.5, 197.7, 212.4],
        [STATS.DEF]: [48.1, 123.5, 264.3, 338, 403.2, 468.4, 533.6, 573.3]
    },
    ascensionStat: STATS.GEO_DMG,
    ascensionMaterials: {
        ascension_gems: 'prithiva_topaz',
        local_specialties: 'glaze_lily',
        common_enemy_drops: 'recruits_insignia',
        normal_boss_drops: 'basalt_pillar',
        talent_books: 'books_of_prosperity',
        weekly_boss_drops: 'spirit_locket_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'normal_attack_dmg',
                    values: [0.28, 0.301, 0.322, 0.35, 0.371, 0.392, 0.42, 0.448, 0.476, 0.504]
                },
                {
                    name: 'charged_dmg',
                    values: [1.7408, 1.8714, 2.0019, 2.176, 2.3066, 2.4371, 2.6112, 2.7853, 2.9594, 3.1334]
                },
                {
                    name: 'dmg_per_star_jade',
                    values: [0.496, 0.5332, 0.5704, 0.62, 0.6572, 0.6944, 0.744, 0.7936, 0.8432, 0.8928]
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
                    name: 'inherited_hp',
                    values: [0.501, 0.531, 0.561, 0.6, 0.63, 0.66, 0.699, 0.738, 0.777, 0.816]
                },
                {
                    name: 'skill_dmg',
                    values: [2.304, 2.4768, 2.6496, 2.88, 3.0528, 3.2256, 3.456, 3.6864, 3.9168, 4.1472]
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
                    name: 'dmg_per_gem',
                    values: [0.8696, 0.9348, 1, 1.087, 1.1522, 1.2174, 1.3044, 1.3914, 1.4783, 1.5653]
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
    id: 'Noelle',
    enkaId: 10000034,
    rarity: RARITY.EPIC,
    element: VISION.GEO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '3-21',
    avatar_icon: 'assets/avatar-icon/noelle.png',
    baseStats: {
        [STATS.HP]: [1012.1, 2600.1, 5564.3, 7116.6, 8489.8, 9862, 11235.2, 12071.2],
        [STATS.ATK]: [16, 41.2, 88.1, 112.7, 134.4, 156.2, 177.9, 191.2],
        [STATS.DEF]: [67, 172, 368.1, 470.8, 561.6, 652.4, 743.2, 798.6]
    },
    ascensionStat: STATS.DEF_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'prithiva_topaz',
        local_specialties: 'valberry',
        common_enemy_drops: 'damaged_mask',
        normal_boss_drops: 'basalt_pillar',
        talent_books: 'books_of_resistance',
        weekly_boss_drops: 'dvalins_claw'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7912, 0.8556, 0.92, 1.012, 1.0764, 1.15, 1.2512, 1.3524, 1.4536, 1.564]
                },
                {
                    name: 'hit_2',
                    values: [0.7336, 0.7933, 0.853, 0.9383, 0.998, 1.0663, 1.1601, 1.2539, 1.3477, 1.4501]
                },
                {
                    name: 'hit_3',
                    values: [0.8626, 0.9328, 1.003, 1.1033, 1.1735, 1.2538, 1.3641, 1.4744, 1.5847, 1.7051]
                },
                {
                    name: 'hit_4',
                    values: [1.1343, 1.2267, 1.319, 1.4509, 1.5432, 1.6488, 1.7938, 1.9389, 2.084, 2.2423]
                },
                {
                    name: 'charged_attack_cyclic_dmg',
                    values: [0.5074, 0.5487, 0.59, 0.649, 0.6903, 0.7375, 0.8024, 0.8673, 0.9322, 1.003]
                },
                {
                    name: 'charged_attack_final_dmg',
                    values: [0.9047, 0.9784, 1.052, 1.1572, 1.2308, 1.315, 1.4307, 1.5464, 1.6622, 1.7884]
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
                    values: [1.2, 1.29, 1.38, 1.5, 1.59, 1.68, 1.8, 1.92, 2.04, 2.16]
                },
                {
                    name: 'dmg_absorption',
                    values: [1.6, 1.72, 1.84, 2, 2.12, 2.24, 2.4, 2.56, 2.72, 2.88]
                },
                {
                    name: 'heal_amount',
                    values: [0.2128, 0.2288, 0.2447, 0.266, 0.282, 0.2979, 0.3192, 0.3405, 0.3618, 0.383]
                },
                {
                    name: 'healing_triggering_chance',
                    values: [0.5, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59]
                },
                {
                    name: 'duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'cd',
                    values: [24, 24, 24, 24, 24, 24, 24, 24, 24, 24]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'burst_dmg',
                    values: [0.672, 0.7224, 0.7728, 0.84, 0.8904, 0.9408, 1.008, 1.0752, 1.1424, 1.2096]
                },
                {
                    name: 'skill_dmg',
                    values: [0.928, 0.9976, 1.0672, 1.16, 1.2296, 1.2992, 1.392, 1.4848, 1.5776, 1.6704]
                },
                {
                    name: 'atk_bonus',
                    values: [0.4, 0.43, 0.46, 0.5, 0.53, 0.56, 0.6, 0.64, 0.68, 0.72]
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
    id: 'Gorou',
    enkaId: 10000055,
    rarity: RARITY.EPIC,
    element: VISION.GEO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '5-18',
    avatar_icon: 'assets/avatar-icon/gorou.png',
    baseStats: {
        [STATS.HP]: [802.4, 2061.3, 4411.3, 5642, 6730.6, 7818.5, 8907.2, 9569.9],
        [STATS.ATK]: [15.3, 39.3, 84.2, 107.7, 128.5, 149.2, 170, 182.7],
        [STATS.DEF]: [54.4, 139.7, 298.9, 382.3, 456, 529.7, 603.5, 648.4]
    },
    ascensionStat: STATS.GEO_DMG,
    ascensionMaterials: {
        ascension_gems: 'prithiva_topaz',
        local_specialties: 'sango_pearl',
        common_enemy_drops: 'spectral_husk',
        normal_boss_drops: 'perpetual_heart',
        talent_books: 'books_of_light',
        weekly_boss_drops: 'molten_moment'
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
                    values: [0.3715, 0.4018, 0.432, 0.4752, 0.5054, 0.54, 0.5875, 0.635, 0.6826, 0.7344]
                },
                {
                    name: 'hit_3',
                    values: [0.4945, 0.5347, 0.575, 0.6325, 0.6728, 0.7188, 0.782, 0.8453, 0.9085, 0.9775]
                },
                {
                    name: 'hit_4',
                    values: [0.59, 0.638, 0.686, 0.7546, 0.8026, 0.8575, 0.933, 1.0084, 1.0839, 1.1662]
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
                    values: [1.072, 1.1524, 1.2328, 1.34, 1.4204, 1.5008, 1.608, 1.7152, 1.8224, 1.9296]
                },
                {
                    name: 'def_increase',
                    values: [
                        206.16,
                        221.622,
                        237.084,
                        257.7,
                        273.162,
                        288.624,
                        309.24,
                        329.856,
                        350.472,
                        371.088
                    ]
                },
                {
                    name: 'geo_dmg_bonus',
                    values: [0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]
                },
                {
                    name: 'duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
                    values: [0.9822, 1.0558, 1.1295, 1.2277, 1.3014, 1.375, 1.4732, 1.5715, 1.6697, 1.7679]
                },
                {
                    name: 'crystal_collapse_dmg',
                    values: [0.613, 0.659, 0.705, 0.7663, 0.8122, 0.8582, 0.9195, 0.9808, 1.0421, 1.1034]
                },
                {
                    name: 'duration',
                    values: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
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
    id: 'YunJin',
    enkaId: 10000064,
    rarity: RARITY.EPIC,
    element: VISION.GEO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '5-21',
    avatar_icon: 'assets/avatar-icon/yunjin.png',
    baseStats: {
        [STATS.HP]: [893.6, 2295.5, 4912.6, 6283.1, 7495.5, 8707, 9919.3, 10657.4],
        [STATS.ATK]: [16, 41.2, 88.1, 112.7, 134.4, 156.2, 177.9, 191.2],
        [STATS.DEF]: [61.6, 158.2, 338.5, 433, 516.5, 600, 683.5, 734.4]
    },
    ascensionStat: STATS.ENERGY_RECHARGE,
    ascensionMaterials: {
        ascension_gems: 'prithiva_topaz',
        local_specialties: 'glaze_lily',
        common_enemy_drops: 'damaged_mask',
        normal_boss_drops: 'riftborn_regalia',
        talent_books: 'books_of_diligence',
        weekly_boss_drops: 'ashen_heart'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4051, 0.438, 0.471, 0.5181, 0.5511, 0.5888, 0.6406, 0.6924, 0.7442, 0.8007]
                },
                {
                    name: 'hit_2',
                    values: [0.4025, 0.4352, 0.468, 0.5148, 0.5476, 0.585, 0.6365, 0.688, 0.7394, 0.7956]
                },
                {
                    name: 'hit_3',
                    values: [0.2296, 0.2483, 0.267, 0.2937, 0.3124, 0.3338, 0.3631, 0.3925, 0.4219, 0.4539]
                },
                {
                    name: 'hit_4',
                    values: [0.2399, 0.2595, 0.279, 0.3069, 0.3264, 0.3488, 0.3794, 0.4101, 0.4408, 0.4743]
                },
                {
                    name: 'hit_5',
                    values: [0.6734, 0.7282, 0.783, 0.8613, 0.9161, 0.9788, 1.0649, 1.151, 1.2371, 1.3311]
                },
                {
                    name: 'charged_attack',
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
                    values: [1.4912, 1.603, 1.7149, 1.864, 1.9758, 2.0877, 2.2368, 2.3859, 2.535, 2.6842]
                },
                {
                    name: 'charge_level_1_dmg',
                    values: [2.6096, 2.8053, 3.001, 3.262, 3.4577, 3.6534, 3.9144, 4.1754, 4.4363, 4.6973]
                },
                {
                    name: 'charge_level_2_dmg',
                    values: [3.728, 4.0076, 4.2872, 4.66, 4.9396, 5.2192, 5.592, 5.9648, 6.3376, 6.7104]
                },
                {
                    name: 'shield_dmg_absorption',
                    values: [0.12, 0.129, 0.138, 0.15, 0.159, 0.168, 0.18, 0.192, 0.204, 0.216]
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
                    values: [2.44, 2.623, 2.806, 3.05, 3.233, 3.416, 3.66, 3.904, 4.148, 4.392]
                },
                {
                    name: 'dmg_increase',
                    values: [0.3216, 0.3457, 0.3698, 0.402, 0.4261, 0.4502, 0.4824, 0.5146, 0.5467, 0.5789]
                },
                {
                    name: 'duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'trigger_quota',
                    values: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
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
    id: 'Odette',
    enkaId: 10000100,
    rarity: RARITY.EPIC,
    element: VISION.GEO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '4-22',
    baseStats: {
        [STATS.HP]: [989.3, 2541.5, 5439, 6956.3, 8298.6, 9639.9, 10982.1, 11799.3],
        [STATS.ATK]: [18.2, 46.7, 99.9, 127.7, 152.4, 177, 201.6, 216.6],
        [STATS.DEF]: [66.4, 170.7, 365.3, 467.2, 557.3, 647.4, 737.5, 792.4]
    },
    ascensionStat: STATS.GEO_DMG,
    ascensionMaterials: {
        ascension_gems: 'prithiva_topaz',
        local_specialties: 'quenepa_berry',
        common_enemy_drops: 'sentrys_wooden_whistle',
        normal_boss_drops: 'overripe_flamegranate'
    },
    talents: {
        attack: {
            icon: '',
            stats: []
        },
        skill: {
            icon: '',
            stats: []
        },
        burst: {
            icon: '',
            stats: []
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
    passives: {}
}
];
