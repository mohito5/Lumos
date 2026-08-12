import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";

export const electro = [
    {
    id: 'Flins',
    enkaId: 10000120,
    rarity: RARITY.LEGENDARY,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '12-21',
    avatar_icon: 'assets/avatar-icon/flins-icon.png',
    baseStats: {
        [STATS.HP]: [972.4, 2522.4, 5614.2, 7249, 8695.2, 10149.1, 11612.8, 12490.8],
        [STATS.ATK]: [27.4, 71, 158, 204, 244.8, 285.7, 326.9, 351.6],
        [STATS.DEF]: [62.9, 163.3, 363.4, 469.2, 562.8, 656.9, 751.7, 808.5]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'frostlamp_flower',
        common_enemy_drops: 'broken_drive_shaft',
        normal_boss_drops: 'precision_kuuvahki_stamping_die',
        talent_books: 'books_of_vagrancy',
        weekly_boss_drops: 'ascended_sample_queen'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4473, 0.4837, 0.5201, 0.5721, 0.6085, 0.6501, 0.7073, 0.7645, 0.8217, 0.8841]
                },
                {
                    name: 'hit_2',
                    values: [0.4515, 0.4882, 0.525, 0.5775, 0.6142, 0.6562, 0.714, 0.7717, 0.8295, 0.8925]
                },
                {
                    name: 'hit_3',
                    values: [0.5592, 0.6047, 0.6502, 0.7153, 0.7608, 0.8128, 0.8843, 0.9558, 1.0274, 1.1054]
                },
                {
                    name: 'hit_4',
                    values: [0.3204, 0.3465, 0.3725, 0.4098, 0.4359, 0.4657, 0.5067, 0.5476, 0.5886, 0.6333]
                },
                {
                    name: 'hit_5',
                    values: [0.7679, 0.8305, 0.893, 0.9823, 1.0448, 1.1162, 1.2144, 1.3127, 1.4109, 1.518]
                },
                {
                    name: 'charged_dmg',
                    values: [1.0303, 1.1141, 1.198, 1.3178, 1.4017, 1.4975, 1.6293, 1.7611, 1.8928, 2.0366]
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
                    values: [0.5825, 0.6262, 0.6699, 0.7281, 0.7718, 0.8155, 0.8737, 0.932, 0.9902, 1.0485]
                },
                {
                    name: 'hit_2',
                    values: [0.588, 0.6321, 0.6762, 0.735, 0.7791, 0.8232, 0.882, 0.9408, 0.9996, 1.0584]
                },
                {
                    name: 'hit_3',
                    values: [0.7283, 0.7829, 0.8375, 0.9103, 0.9649, 1.0196, 1.0924, 1.1652, 1.238, 1.3109]
                },
                {
                    name: 'hit_4',
                    values: [0.4173, 0.4485, 0.4798, 0.5216, 0.5529, 0.5842, 0.6259, 0.6676, 0.7093, 0.7511]
                },
                {
                    name: 'hit_5',
                    values: [1.0001, 1.0751, 1.1501, 1.2501, 1.3251, 1.4002, 1.5002, 1.6002, 1.7002, 1.8002]
                },
                {
                    name: 'charged_dmg',
                    values: [1.1496, 1.2358, 1.322, 1.437, 1.5232, 1.6094, 1.7244, 1.8394, 1.9543, 2.0693]
                },
                {
                    name: 'northland_spearstorm_dmg',
                    values: [1.784, 1.9178, 2.0516, 2.23, 2.3638, 2.4976, 2.676, 2.8544, 3.0328, 3.2112]
                },
                {
                    name: 'northland_spearstorm_cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                },
                {
                    name: 'manifest_flame_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'skill_cd',
                    values: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'initial_skill_dmg',
                    values: [2.5984, 2.7933, 2.9882, 3.248, 3.4429, 3.6378, 3.8976, 4.1574, 4.4173, 4.6771]
                },
                {
                    name: 'middle_phase_lunar_charged_dmg',
                    values: [0.1624, 0.1746, 0.1868, 0.203, 0.2152, 0.2274, 0.2436, 0.2598, 0.2761, 0.2923]
                },
                {
                    name: 'final_phase_lunar_charged_dmg',
                    values: [1.1693, 1.257, 1.3447, 1.4616, 1.5493, 1.637, 1.7539, 1.8708, 1.9878, 2.1047]
                },
                {
                    name: 'energy_cost',
                    values: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
                },
                {
                    name: 'cd',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                },
                {
                    name: 'thunderous_symphony_dmg',
                    values: [0.7146, 0.7682, 0.8217, 0.8932, 0.9468, 1.0004, 1.0718, 1.1433, 1.2148, 1.2862]
                },
                {
                    name: 'thunderous_symphony_additional_dmg',
                    values: [1.0394, 1.1173, 1.1953, 1.2992, 1.3772, 1.4551, 1.559, 1.663, 1.7669, 1.8708]
                },
                {
                    name: 'thunderous_symphony_energy_cost',
                    values: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
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
    id: 'RaidenShogun',
    enkaId: 10000052,
    rarity: RARITY.LEGENDARY,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '6-26',
    avatar_icon: 'assets/avatar-icon/raiden.png',
    baseStats: {
        [STATS.HP]: [1004.8, 2606.4, 5801.3, 7490.7, 8985, 10487.4, 11999.9, 12907.2],
        [STATS.ATK]: [26.3, 68.1, 151.6, 195.7, 234.8, 274, 313.5, 337.2],
        [STATS.DEF]: [61.4, 159.4, 354.8, 458.1, 549.5, 641.3, 733.8, 789.3]
    },
    ascensionStat: STATS.ENERGY_RECHARGE,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'amakumo_fruit',
        common_enemy_drops: 'old_handguard',
        normal_boss_drops: 'storm_beads',
        talent_books: 'books_of_light',
        weekly_boss_drops: 'molten_moment'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3965, 0.4287, 0.461, 0.5071, 0.5394, 0.5763, 0.627, 0.6777, 0.7284, 0.7837]
                },
                {
                    name: 'hit_2',
                    values: [0.3973, 0.4297, 0.462, 0.5082, 0.5405, 0.5775, 0.6283, 0.6791, 0.73, 0.7854]
                },
                {
                    name: 'hit_3',
                    values: [0.4988, 0.5394, 0.58, 0.638, 0.6786, 0.725, 0.7888, 0.8526, 0.9164, 0.986]
                },
                {
                    name: 'hit_4',
                    values: [0.2898, 0.3134, 0.337, 0.3707, 0.3943, 0.4213, 0.4583, 0.4954, 0.5325, 0.5729]
                },
                {
                    name: 'hit_5',
                    values: [0.6545, 0.7077, 0.761, 0.8371, 0.8904, 0.9513, 1.035, 1.1187, 1.2024, 1.2937]
                },
                {
                    name: 'charged_dmg',
                    values: [0.9959, 1.0769, 1.158, 1.2738, 1.3549, 1.4475, 1.5749, 1.7023, 1.8296, 1.9686]
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
                    values: [1.172, 1.2599, 1.3478, 1.465, 1.5529, 1.6408, 1.758, 1.8752, 1.9924, 2.1096]
                },
                {
                    name: 'coordinated_atk_dmg',
                    values: [0.42, 0.4515, 0.483, 0.525, 0.5565, 0.588, 0.63, 0.672, 0.714, 0.756]
                },
                {
                    name: 'duration',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
                },
                {
                    name: 'elemental_burst_dmg_bonus',
                    values: [0.0022, 0.0023, 0.0024, 0.0025, 0.0026, 0.0027, 0.0028, 0.0029, 0.003, 0.003]
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
                    name: 'musou_no_hitotachi_base_dmg',
                    values: [4.008, 4.3086, 4.6092, 5.01, 5.3106, 5.6112, 6.012, 6.4128, 6.8136, 7.2144]
                },
                {
                    name: 'resolve_bonus',
                    values: [0.0389, 0.0418, 0.0447, 0.0486, 0.0515, 0.0544, 0.0583, 0.0622, 0.0661, 0.07]
                },
                {
                    name: 'resolve_stacks_gained',
                    values: [0.15, 0.16, 0.16, 0.17, 0.17, 0.18, 0.18, 0.19, 0.19, 0.2]
                },
                {
                    name: 'hit_1',
                    values: [0.4474, 0.4779, 0.5084, 0.5491, 0.5796, 0.6151, 0.6609, 0.7066, 0.7524, 0.7982]
                },
                {
                    name: 'hit_2',
                    values: [0.4396, 0.4695, 0.4995, 0.5395, 0.5694, 0.6044, 0.6494, 0.6943, 0.7393, 0.7842]
                },
                {
                    name: 'hit_3',
                    values: [0.5382, 0.5749, 0.6116, 0.6605, 0.6972, 0.74, 0.7951, 0.8501, 0.9052, 0.9602]
                },
                {
                    name: 'hit_4',
                    values: [0.3089, 0.3299, 0.351, 0.3791, 0.4001, 0.4247, 0.4563, 0.4879, 0.5195, 0.5511]
                },
                {
                    name: 'hit_5',
                    values: [0.7394, 0.7899, 0.8403, 0.9075, 0.9579, 1.0167, 1.0924, 1.168, 1.2436, 1.3192]
                },
                {
                    name: 'charged_dmg',
                    values: [0.616, 0.658, 0.7, 0.756, 0.798, 0.847, 0.91, 0.973, 1.036, 1.099]
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
                    name: 'musou_isshin_energy_restoration',
                    values: [1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5]
                },
                {
                    name: 'musou_isshin_duration',
                    values: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
                },
                {
                    name: 'cd',
                    values: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
                },
                {
                    name: 'energy_cost',
                    values: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
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
    id: 'YaeMiko',
    enkaId: 10000057,
    rarity: RARITY.LEGENDARY,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '6-27',
    avatar_icon: 'assets/avatar-icon/yae.png',
    baseStats: {
        [STATS.HP]: [807.5, 2094.6, 4662, 6019.6, 7220.4, 8427.7, 9643.1, 10372.3],
        [STATS.ATK]: [26.4, 68.6, 152.7, 197.1, 236.4, 276, 315.8, 339.6],
        [STATS.DEF]: [44.3, 114.8, 255.6, 330.1, 395.9, 462.1, 528.8, 568.7]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'sea_ganoderma',
        common_enemy_drops: 'old_handguard',
        normal_boss_drops: 'dragonheirs_false_fin',
        talent_books: 'books_of_light',
        weekly_boss_drops: 'the_meaning_of_aeons'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3966, 0.4263, 0.4561, 0.4957, 0.5255, 0.5552, 0.5949, 0.6345, 0.6742, 0.7139]
                },
                {
                    name: 'hit_2',
                    values: [0.3852, 0.4141, 0.443, 0.4815, 0.5104, 0.5393, 0.5778, 0.6163, 0.6548, 0.6933]
                },
                {
                    name: 'hit_3',
                    values: [0.5689, 0.6116, 0.6542, 0.7111, 0.7538, 0.7964, 0.8533, 0.9102, 0.9671, 1.024]
                },
                {
                    name: 'charged_dmg',
                    values: [1.4289, 1.5361, 1.6433, 1.7862, 1.8934, 2.0005, 2.1434, 2.2863, 2.4292, 2.5721]
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
                    name: 'sesshou_sakura_dmg_level_1',
                    values: [0.6067, 0.6522, 0.6977, 0.7584, 0.8039, 0.8494, 0.9101, 0.9708, 1.0314, 1.0921]
                },
                {
                    name: 'sesshou_sakura_dmg_level_2',
                    values: [0.7584, 0.8153, 0.8722, 0.948, 1.0049, 1.0618, 1.1376, 1.2134, 1.2893, 1.3651]
                },
                {
                    name: 'sesshou_sakura_dmg_level_3',
                    values: [0.948, 1.0191, 1.0902, 1.185, 1.2561, 1.3272, 1.422, 1.5168, 1.6116, 1.7064]
                },
                {
                    name: 'sesshou_sakura_dmg_level_4',
                    values: [1.185, 1.2739, 1.3627, 1.4813, 1.5701, 1.659, 1.7775, 1.896, 2.0145, 2.133]
                },
                {
                    name: 'duration',
                    values: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14]
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
                    name: 'skill_dmg',
                    values: [2.6, 2.795, 2.99, 3.25, 3.445, 3.64, 3.9, 4.16, 4.42, 4.68]
                },
                {
                    name: 'tenko_thunderbolt_dmg',
                    values: [3.3382, 3.5885, 3.8389, 4.1727, 4.4231, 4.6734, 5.0072, 5.3411, 5.6749, 6.0087]
                },
                {
                    name: 'cd',
                    values: [22, 22, 22, 22, 22, 22, 22, 22, 22, 22]
                },
                {
                    name: 'energy_cost',
                    values: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
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
    id: 'Keqing',
    enkaId: 10000042,
    rarity: RARITY.LEGENDARY,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '11-20',
    avatar_icon: 'assets/avatar-icon/keqing.png',
    baseStats: {
        [STATS.HP]: [1020.1, 2646, 5889.4, 7604.4, 9121.4, 10646.6, 12182, 13103.1],
        [STATS.ATK]: [25.1, 65.2, 145.1, 187.4, 224.8, 262.4, 300.2, 322.9],
        [STATS.DEF]: [62.2, 161.4, 359.3, 463.9, 556.4, 649.4, 743.1, 799.3]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'cor_lapis',
        common_enemy_drops: 'whopperflower_nectar',
        normal_boss_drops: 'lightning_prism',
        talent_books: 'books_of_prosperity',
        weekly_boss_drops: 'ring_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4102, 0.4436, 0.477, 0.5247, 0.5581, 0.5962, 0.6487, 0.7012, 0.7537, 0.8109]
                },
                {
                    name: 'hit_2',
                    values: [0.4102, 0.4436, 0.477, 0.5247, 0.5581, 0.5962, 0.6487, 0.7012, 0.7537, 0.8109]
                },
                {
                    name: 'hit_3',
                    values: [0.5444, 0.5887, 0.633, 0.6963, 0.7406, 0.7913, 0.8609, 0.9305, 1.0001, 1.0761]
                },
                {
                    name: 'hit_4',
                    values: [0.3148, 0.3404, 0.366, 0.4026, 0.4282, 0.4575, 0.4978, 0.538, 0.5783, 0.6222]
                },
                {
                    name: 'hit_5',
                    values: [0.6699, 0.7245, 0.779, 0.8569, 0.9114, 0.9738, 1.0594, 1.1451, 1.2308, 1.3243]
                },
                {
                    name: 'charged_dmg',
                    values: [0.768, 0.8305, 0.893, 0.9823, 1.0448, 1.1163, 1.2145, 1.3127, 1.4109, 1.5181]
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
                    name: 'lightning_stiletto_dmg',
                    values: [0.504, 0.5418, 0.5796, 0.63, 0.6678, 0.7056, 0.756, 0.8064, 0.8568, 0.9072]
                },
                {
                    name: 'slashing_dmg',
                    values: [1.68, 1.806, 1.932, 2.1, 2.226, 2.352, 2.52, 2.688, 2.856, 3.024]
                },
                {
                    name: 'thunderclap_slash_dmg',
                    values: [0.84, 0.903, 0.966, 1.05, 1.113, 1.176, 1.26, 1.344, 1.428, 1.512]
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
                    values: [0.88, 0.946, 1.012, 1.1, 1.166, 1.232, 1.32, 1.408, 1.496, 1.584]
                },
                {
                    name: 'consecutive_slash_dmg',
                    values: [0.24, 0.258, 0.276, 0.3, 0.318, 0.336, 0.36, 0.384, 0.408, 0.432]
                },
                {
                    name: 'last_attack_dmg',
                    values: [1.888, 2.0296, 2.1712, 2.36, 2.5016, 2.6432, 2.832, 3.0208, 3.2096, 3.3984]
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
    id: 'Cyno',
    enkaId: 10000071,
    rarity: RARITY.LEGENDARY,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '6-23',
    avatar_icon: 'assets/avatar-icon/cyno.png',
    baseStats: {
        [STATS.HP]: [972.4, 2522.4, 5614.2, 7249, 8695.2, 10149.1, 11612.8, 12490.8],
        [STATS.ATK]: [24.8, 64.2, 143, 184.6, 221.4, 258.5, 295.7, 318.1],
        [STATS.DEF]: [66.9, 173.5, 386.2, 498.7, 598.1, 698.2, 798.8, 859.2]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'scarab',
        common_enemy_drops: 'divining_scroll',
        normal_boss_drops: 'thunderclap_fruitcore',
        talent_books: 'books_of_admonition',
        weekly_boss_drops: 'mudra_of_the_malefic_general'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4926, 0.5327, 0.5728, 0.63, 0.6701, 0.716, 0.779, 0.842, 0.905, 0.9737]
                },
                {
                    name: 'hit_2',
                    values: [0.4792, 0.5182, 0.5572, 0.6129, 0.6519, 0.6965, 0.7578, 0.8191, 0.8804, 0.9473]
                },
                {
                    name: 'hit_3',
                    values: [0.2931, 0.3169, 0.3408, 0.3748, 0.3987, 0.426, 0.4634, 0.5009, 0.5384, 0.5793]
                },
                {
                    name: 'hit_4',
                    values: [0.7589, 0.8207, 0.8825, 0.9707, 1.0325, 1.1031, 1.2001, 1.2972, 1.3943, 1.5002]
                },
                {
                    name: 'charged_dmg',
                    values: [1.2238, 1.3234, 1.423, 1.5653, 1.6649, 1.7788, 1.9353, 2.0918, 2.2483, 2.4191]
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
                    values: [1.304, 1.4018, 1.4996, 1.63, 1.7278, 1.8256, 1.956, 2.0864, 2.2168, 2.3472]
                },
                {
                    name: 'mortuary_rite_dmg',
                    values: [1.568, 1.6856, 1.8032, 1.96, 2.0776, 2.1952, 2.352, 2.5088, 2.6656, 2.8224]
                },
                {
                    name: 'pactsworn_pathclearer_duration_bonus',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                {
                    name: 'cd',
                    values: [7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5]
                },
                {
                    name: 'mortuary_rite_cd',
                    values: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7828, 0.8466, 0.9103, 1.0013, 1.065, 1.1378, 1.238, 1.3381, 1.4382, 1.5475]
                },
                {
                    name: 'hit_2',
                    values: [0.8247, 0.8918, 0.9589, 1.0548, 1.122, 1.1987, 1.3042, 1.4096, 1.5151, 1.6302]
                },
                {
                    name: 'hit_3',
                    values: [1.0463, 1.1315, 1.2167, 1.3383, 1.4235, 1.5208, 1.6547, 1.7885, 1.9223, 2.0683]
                },
                {
                    name: 'hit_4',
                    values: [0.5169, 0.559, 0.6011, 0.6612, 0.7033, 0.7514, 0.8175, 0.8836, 0.9497, 1.0219]
                },
                {
                    name: 'hit_5',
                    values: [1.3084, 1.4149, 1.5215, 1.6736, 1.7801, 1.9018, 2.0692, 2.2365, 2.4039, 2.5865]
                },
                {
                    name: 'charged_dmg',
                    values: [1.0105, 1.0928, 1.175, 1.2925, 1.3748, 1.4688, 1.598, 1.7273, 1.8565, 1.9975]
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
                },
                {
                    name: 'elemental_mastery_bonus',
                    values: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
                },
                {
                    name: 'basic_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
    id: 'Fischl',
    enkaId: 10000031,
    rarity: RARITY.EPIC,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '5-27',
    avatar_icon: 'assets/avatar-icon/fischl.png',
    baseStats: {
        [STATS.HP]: [770.5, 1979.3, 4235.9, 5417.6, 6462.9, 7507.5, 8552.9, 9189.3],
        [STATS.ATK]: [20.5, 52.6, 112.6, 144, 171.8, 199.6, 227.3, 244.3],
        [STATS.DEF]: [49.8, 127.9, 273.7, 350.1, 417.6, 485.1, 552.7, 593.8]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'small_lamp_grass',
        common_enemy_drops: 'firm_arrowhead',
        normal_boss_drops: 'lightning_prism',
        talent_books: 'books_of_ballad',
        weekly_boss_drops: 'spirit_locket_of_boreas'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4412, 0.4771, 0.513, 0.5643, 0.6002, 0.6413, 0.6977, 0.7541, 0.8105, 0.8721]
                },
                {
                    name: 'hit_2',
                    values: [0.4678, 0.5059, 0.544, 0.5984, 0.6365, 0.68, 0.7398, 0.7997, 0.8595, 0.9248]
                },
                {
                    name: 'hit_3',
                    values: [0.5814, 0.6287, 0.676, 0.7436, 0.7909, 0.845, 0.9194, 0.9937, 1.0681, 1.1492]
                },
                {
                    name: 'hit_4',
                    values: [0.5771, 0.624, 0.671, 0.7381, 0.7851, 0.8388, 0.9126, 0.9864, 1.0602, 1.1407]
                },
                {
                    name: 'hit_5',
                    values: [0.7207, 0.7793, 0.838, 0.9218, 0.9805, 1.0475, 1.1397, 1.2319, 1.324, 1.4246]
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
                    name: 'ozs_atk_dmg',
                    values: [0.888, 0.9546, 1.0212, 1.11, 1.1766, 1.2432, 1.332, 1.4208, 1.5096, 1.5984]
                },
                {
                    name: 'summoning_dmg',
                    values: [1.1544, 1.241, 1.3276, 1.443, 1.5296, 1.6162, 1.7316, 1.847, 1.9625, 2.0779]
                },
                {
                    name: 'ozs_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'cd',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'falling_thunder_dmg',
                    values: [2.08, 2.236, 2.392, 2.6, 2.756, 2.912, 3.12, 3.328, 3.536, 3.744]
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
    id: 'Beidou',
    enkaId: 10000024,
    rarity: RARITY.EPIC,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '2-14',
    avatar_icon: 'assets/avatar-icon/beidou.png',
    baseStats: {
        [STATS.HP]: [1094.1, 2810.9, 6015.5, 7693.6, 9178.1, 10661.6, 12146.1, 13049.9],
        [STATS.ATK]: [18.9, 48.5, 103.8, 132.7, 158.3, 183.9, 209.5, 225.1],
        [STATS.DEF]: [54.4, 139.7, 298.9, 382.3, 456, 529.7, 603.5, 648.4]
    },
    ascensionStat: STATS.ELECTRO_DMG,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'noctilucous_jade',
        common_enemy_drops: 'treasure_hoarder_insignia',
        normal_boss_drops: 'lightning_prism',
        talent_books: 'books_of_gold',
        weekly_boss_drops: 'dvalins_sigh'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7112, 0.7691, 0.827, 0.9097, 0.9676, 1.0338, 1.1247, 1.2157, 1.3067, 1.4059]
                },
                {
                    name: 'hit_2',
                    values: [0.7086, 0.7663, 0.824, 0.9064, 0.9641, 1.03, 1.1206, 1.2113, 1.3019, 1.4008]
                },
                {
                    name: 'hit_3',
                    values: [0.8832, 0.9551, 1.027, 1.1297, 1.2016, 1.2838, 1.3967, 1.5097, 1.6227, 1.7459]
                },
                {
                    name: 'hit_4',
                    values: [0.8652, 0.9356, 1.006, 1.1066, 1.177, 1.2575, 1.3682, 1.4788, 1.5895, 1.7102]
                },
                {
                    name: 'hit_5',
                    values: [1.1214, 1.2127, 1.304, 1.4344, 1.5257, 1.63, 1.7734, 1.9169, 2.0603, 2.2168]
                },
                {
                    name: 'charged_attack_cyclic_dmg',
                    values: [0.5624, 0.6082, 0.654, 0.7194, 0.7652, 0.8175, 0.8894, 0.9614, 1.0333, 1.1118]
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
                    name: 'shield_dmg_absorption',
                    values: [0.144, 0.1548, 0.1656, 0.18, 0.1908, 0.2016, 0.216, 0.2304, 0.2448, 0.2592]
                },
                {
                    name: 'base_dmg',
                    values: [1.216, 1.3072, 1.3984, 1.52, 1.6112, 1.7024, 1.824, 1.9456, 2.0672, 2.1888]
                },
                {
                    name: 'dmg_bonus_on_hit_taken',
                    values: [1.6, 1.72, 1.84, 2, 2.12, 2.24, 2.4, 2.56, 2.72, 2.88]
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
                    values: [1.216, 1.3072, 1.3984, 1.52, 1.6112, 1.7024, 1.824, 1.9456, 2.0672, 2.1888]
                },
                {
                    name: 'lightning_dmg',
                    values: [0.96, 1.032, 1.104, 1.2, 1.272, 1.344, 1.44, 1.536, 1.632, 1.728]
                },
                {
                    name: 'dmg_reduction',
                    values: [0.2, 0.21, 0.22, 0.24, 0.25, 0.26, 0.28, 0.3, 0.32, 0.34]
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
    id: 'KujouSara',
    rarity: RARITY.EPIC,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '7-14',
    avatar_icon: 'assets/avatar-icon/sara.png',
    baseStats: {
        [STATS.HP]: [802.4, 2061.3, 4411.3, 5642, 6730.6, 7818.5, 8907.2, 9569.9],
        [STATS.ATK]: [16.4, 42.1, 90.1, 115.2, 137.4, 159.6, 181.9, 195.4],
        [STATS.DEF]: [52.6, 135.3, 289.4, 370.2, 441.6, 513, 584.4, 627.9]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'dendrobium',
        common_enemy_drops: 'damaged_mask',
        normal_boss_drops: 'storm_beads',
        talent_books: 'books_of_elegance',
        weekly_boss_drops: 'ashen_heart'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3689, 0.399, 0.429, 0.4719, 0.5019, 0.5363, 0.5834, 0.6306, 0.6778, 0.7293]
                },
                {
                    name: 'hit_2',
                    values: [0.387, 0.4185, 0.45, 0.495, 0.5265, 0.5625, 0.612, 0.6615, 0.711, 0.765]
                },
                {
                    name: 'hit_3',
                    values: [0.485, 0.5245, 0.564, 0.6204, 0.6599, 0.705, 0.767, 0.8291, 0.8911, 0.9588]
                },
                {
                    name: 'hit_4',
                    values: [0.504, 0.545, 0.586, 0.6446, 0.6856, 0.7325, 0.797, 0.8614, 0.9259, 0.9962]
                },
                {
                    name: 'hit_5',
                    values: [0.5805, 0.6278, 0.675, 0.7425, 0.7897, 0.8438, 0.918, 0.9923, 1.0665, 1.1475]
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
                    name: 'tengu_juurai_ambush_dmg',
                    values: [1.2576, 1.3519, 1.4462, 1.572, 1.6663, 1.7606, 1.8864, 2.0122, 2.1379, 2.2637]
                },
                {
                    name: 'atk_bonus_ratio',
                    values: [0.4296, 0.4618, 0.494, 0.537, 0.5692, 0.6014, 0.6444, 0.6874, 0.7303, 0.7733]
                },
                {
                    name: 'atk_bonus_duration',
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
                    name: 'tengu_juurai_titanbreaker_dmg',
                    values: [4.096, 4.4032, 4.7104, 5.12, 5.4272, 5.7344, 6.144, 6.5536, 6.9632, 7.3728]
                },
                {
                    name: 'tengu_juurai_stormcluster_dmg',
                    values: [0.3412, 0.3668, 0.3924, 0.4265, 0.4521, 0.4777, 0.5118, 0.5459, 0.58, 0.6142]
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
    id: 'Razor',
    enkaId: 10000020,
    rarity: RARITY.EPIC,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '9-9',
    avatar_icon: 'assets/avatar-icon/razor.png',
    baseStats: {
        [STATS.HP]: [1003, 2576.6, 5514.2, 7052.5, 8413.3, 9773.1, 11134, 11962.4],
        [STATS.ATK]: [19.6, 50.3, 107.7, 137.7, 164.3, 190.9, 217.5, 233.6],
        [STATS.DEF]: [62.9, 161.7, 346.1, 442.6, 528, 613.4, 698.8, 750.8]
    },
    ascensionStat: STATS.PHYSICAL_DMG,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'wolfhook',
        common_enemy_drops: 'damaged_mask',
        normal_boss_drops: 'lightning_prism',
        talent_books: 'books_of_resistance',
        weekly_boss_drops: 'dvalins_claw'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.9592, 1.0246, 1.09, 1.1772, 1.2426, 1.3189, 1.417, 1.5151, 1.6132, 1.7113]
                },
                {
                    name: 'hit_2',
                    values: [0.8263, 0.8827, 0.939, 1.0141, 1.0705, 1.1362, 1.2207, 1.3052, 1.3897, 1.4742]
                },
                {
                    name: 'hit_3',
                    values: [1.0331, 1.1036, 1.174, 1.2679, 1.3384, 1.4205, 1.5262, 1.6319, 1.7375, 1.8432]
                },
                {
                    name: 'hit_4',
                    values: [1.3605, 1.4532, 1.546, 1.6697, 1.7624, 1.8707, 2.0098, 2.1489, 2.2881, 2.4272]
                },
                {
                    name: 'charged_attack_cyclic_dmg',
                    values: [0.6254, 0.6763, 0.7272, 0.7999, 0.8508, 0.909, 0.989, 1.069, 1.149, 1.2362]
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
                    values: [0.8205, 0.8872, 0.954, 1.0494, 1.1162, 1.1925, 1.2975, 1.4024, 1.5074, 1.6219]
                },
                {
                    name: 'low_high_plunge_dmg',
                    values: [1.6406, 1.7741, 1.9077, 2.0984, 2.232, 2.3846, 2.5944, 2.8043, 3.0141, 3.243]
                }
            ]
        },
        skill: {
            icon: '',
            stats: [
                {
                    name: 'press_skill_dmg',
                    values: [1.992, 2.1414, 2.2908, 2.49, 2.6394, 2.7888, 2.988, 3.1872, 3.3864, 3.5856]
                },
                {
                    name: 'hold_skill_dmg',
                    values: [2.952, 3.1734, 3.3948, 3.69, 3.9114, 4.1328, 4.428, 4.7232, 5.0184, 5.3136]
                },
                {
                    name: 'energy_recharge_bonus',
                    values: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
                },
                {
                    name: 'energy_regenerated',
                    values: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
                },
                {
                    name: 'electro_sigil_duration',
                    values: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
                },
                {
                    name: 'press_cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
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
                    name: 'burst_dmg',
                    values: [1.6, 1.72, 1.84, 2, 2.12, 2.24, 2.4, 2.56, 2.72, 2.88]
                },
                {
                    name: 'soul_companion_dmg',
                    values: [0.24, 0.258, 0.276, 0.3, 0.318, 0.336, 0.36, 0.384, 0.408, 0.432]
                },
                {
                    name: 'normal_atk_spd_bonus',
                    values: [0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.37, 0.38, 0.39, 0.4]
                },
                {
                    name: 'electro_res_bonus',
                    values: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8]
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
    id: 'Lisa',
    enkaId: 10000006,
    rarity: RARITY.EPIC,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '6-9',
    avatar_icon: 'assets/avatar-icon/lisa.png',
    baseStats: {
        [STATS.HP]: [802.4, 2061.3, 4411.3, 5642, 6730.6, 7818.5, 8907.2, 9569.9],
        [STATS.ATK]: [19.4, 49.9, 106.7, 136.5, 162.8, 189.1, 215.5, 231.5],
        [STATS.DEF]: [48.1, 123.5, 264.3, 338, 403.2, 468.4, 533.6, 573.3]
    },
    ascensionStat: STATS.ELEMENTAL_MASTERY,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'valberry',
        common_enemy_drops: 'slime_condensate',
        normal_boss_drops: 'lightning_prism',
        talent_books: 'books_of_ballad',
        weekly_boss_drops: 'dvalins_claw'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.396, 0.4257, 0.4554, 0.495, 0.5247, 0.5544, 0.594, 0.6336, 0.6732, 0.7128]
                },
                {
                    name: 'hit_2',
                    values: [0.3592, 0.3861, 0.4131, 0.449, 0.4759, 0.5029, 0.5388, 0.5747, 0.6106, 0.6466]
                },
                {
                    name: 'hit_3',
                    values: [0.428, 0.4601, 0.4922, 0.535, 0.5671, 0.5992, 0.642, 0.6848, 0.7276, 0.7704]
                },
                {
                    name: 'hit_4',
                    values: [0.5496, 0.5908, 0.632, 0.687, 0.7282, 0.7694, 0.8244, 0.8794, 0.9343, 0.9893]
                },
                {
                    name: 'charged_dmg',
                    values: [1.7712, 1.904, 2.0369, 2.214, 2.3468, 2.4797, 2.6568, 2.8339, 3.011, 3.1882]
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
                    name: 'press_dmg',
                    values: [0.8, 0.86, 0.92, 1, 1.06, 1.12, 1.2, 1.28, 1.36, 1.44]
                },
                {
                    name: 'press_cd',
                    values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                },
                {
                    name: 'non_conductive_hold_dmg',
                    values: [3.2, 3.44, 3.68, 4, 4.24, 4.48, 4.8, 5.12, 5.44, 5.76]
                },
                {
                    name: 'stack_1_conductive_hold_dmg',
                    values: [3.68, 3.956, 4.232, 4.6, 4.876, 5.152, 5.52, 5.888, 6.256, 6.624]
                },
                {
                    name: 'stack_2_conductive_hold_dmg',
                    values: [4.24, 4.558, 4.876, 5.3, 5.618, 5.936, 6.36, 6.784, 7.208, 7.632]
                },
                {
                    name: 'stack_3_conductive_hold_dmg',
                    values: [4.872, 5.2374, 5.6028, 6.09, 6.4554, 6.8208, 7.308, 7.7952, 8.2824, 8.7696]
                },
                {
                    name: 'holding_cd',
                    values: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'discharge_dmg',
                    values: [0.3656, 0.393, 0.4204, 0.457, 0.4844, 0.5118, 0.5484, 0.585, 0.6215, 0.6581]
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
    id: 'Dori',
    enkaId: 10000068,
    rarity: RARITY.EPIC,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '12-21',
    avatar_icon: 'assets/avatar-icon/dori.png',
    baseStats: {
        [STATS.HP]: [1039.4, 2670.3, 5714.7, 7308.9, 8719.2, 10128.5, 11538.8, 12397.4],
        [STATS.ATK]: [18.7, 48, 102.8, 131.5, 156.9, 182.2, 207.6, 223],
        [STATS.DEF]: [60.7, 155.8, 333.5, 426.5, 508.8, 591.1, 673.4, 723.5]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'kalpalata_lotus',
        common_enemy_drops: 'faded_red_satin',
        normal_boss_drops: 'thunderclap_fruitcore',
        talent_books: 'books_of_ingenuity',
        weekly_boss_drops: 'bloodjade_branch'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.9021, 0.9756, 1.049, 1.1539, 1.2273, 1.3113, 1.4266, 1.542, 1.6574, 1.7833]
                },
                {
                    name: 'hit_2',
                    values: [0.4107, 0.4442, 0.4776, 0.5254, 0.5588, 0.597, 0.6495, 0.7021, 0.7546, 0.8119]
                },
                {
                    name: 'hit_3',
                    values: [1.284, 1.3885, 1.493, 1.6423, 1.7468, 1.8663, 2.0305, 2.1947, 2.3589, 2.5381]
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
                    name: 'troubleshooter_shot_dmg',
                    values: [1.4728, 1.5833, 1.6937, 1.841, 1.9515, 2.0619, 2.2092, 2.3565, 2.5038, 2.651]
                },
                {
                    name: 'after_sales_service_round_dmg',
                    values: [0.3156, 0.3393, 0.3629, 0.3945, 0.4182, 0.4418, 0.4734, 0.505, 0.5365, 0.5681]
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
                    name: 'connector_dmg',
                    values: [0.1588, 0.1707, 0.1826, 0.1985, 0.2104, 0.2224, 0.2382, 0.2541, 0.27, 0.2859]
                },
                {
                    name: 'continuous_healing',
                    values: [0.0667, 0.0717, 0.0767, 0.0834, 0.0884, 0.0934, 0.1001, 0.1067, 0.1134, 0.1201]
                },
                {
                    name: 'energy_regeneration',
                    values: [1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5]
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
}
,
{
    id: 'Ororon',
    enkaId: 10000105,
    rarity: RARITY.EPIC,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '10-14',
    baseStats: {
        [STATS.HP]: [775, 1991, 4261, 5449.6, 6501.2, 7552, 8603.5, 9243.7],
        [STATS.ATK]: [20.5, 52.6, 112.6, 144, 171.8, 199.6, 227.3, 244.3],
        [STATS.DEF]: [49.2, 126.4, 270.6, 346, 412.8, 479.5, 546.3, 587]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'glowing_hornshroom',
        common_enemy_drops: 'juvenile_fang',
        normal_boss_drops: 'mark_of_the_binding_blessing',
        talent_books: 'books_of_kindling',
        weekly_boss_drops: 'lightless_silk_string'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5064, 0.5476, 0.5889, 0.6477, 0.689, 0.7361, 0.8008, 0.8656, 0.9304, 1.0011]
                },
                {
                    name: 'hit_2',
                    values: [0.4437, 0.4799, 0.516, 0.5676, 0.6037, 0.645, 0.7017, 0.7585, 0.8152, 0.8771]
                },
                {
                    name: 'hit_3',
                    values: [0.6982, 0.755, 0.8119, 0.8931, 0.9499, 1.0148, 1.1041, 1.1934, 1.2828, 1.3802]
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
                    name: 'spirit_orb_dmg',
                    values: [1.976, 2.1242, 2.2724, 2.47, 2.6182, 2.7664, 2.964, 3.1616, 3.3592, 3.5568]
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
                    name: 'ritual_dmg',
                    values: [1.7438, 1.8746, 2.0054, 2.1798, 2.3106, 2.4414, 2.6158, 2.7901, 2.9645, 3.1389]
                },
                {
                    name: 'soundwave_collision_dmg',
                    values: [0.332, 0.3569, 0.3818, 0.415, 0.4399, 0.4648, 0.498, 0.5312, 0.5644, 0.5976]
                },
                {
                    name: 'duration',
                    values: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
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
    id: 'Clorinde',
    enkaId: 10000098,
    rarity: RARITY.LEGENDARY,
    element: VISION.ELECTRO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '9-20',
    baseStats: {
        [STATS.HP]: [1008.6, 2616.3, 5823.3, 7519.1, 9019.1, 10527.2, 12045.4, 12956.2],
        [STATS.ATK]: [26.3, 68.1, 151.6, 195.7, 234.8, 274, 313.5, 337.2],
        [STATS.DEF]: [61, 158.3, 352.3, 455, 545.7, 637, 728.8, 783.9]
    },
    ascensionStat: STATS.CRIT_RATE,
    ascensionMaterials: {
        ascension_gems: 'vajrada_amethyst',
        local_specialties: 'lumitoile',
        common_enemy_drops: 'transoceanic_pearl',
        normal_boss_drops: 'fontemer_unihorn',
        talent_books: 'books_of_justice',
        weekly_boss_drops: 'everamber'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.5406, 0.5846, 0.6286, 0.6915, 0.7355, 0.7857, 0.8549, 0.924, 0.9932, 1.0686]
                },
                {
                    name: 'hit_2',
                    values: [0.5163, 0.5583, 0.6003, 0.6604, 0.7024, 0.7504, 0.8164, 0.8825, 0.9485, 1.0206]
                },
                {
                    name: 'hit_3',
                    values: [0.3419, 0.3697, 0.3975, 0.4373, 0.4651, 0.4969, 0.5406, 0.5843, 0.6281, 0.6758]
                },
                {
                    name: 'hit_4',
                    values: [0.2313, 0.2502, 0.269, 0.2959, 0.3147, 0.3363, 0.3658, 0.3954, 0.425, 0.4573]
                },
                {
                    name: 'hit_5',
                    values: [0.9001, 0.9734, 1.0466, 1.1513, 1.2246, 1.3083, 1.4234, 1.5385, 1.6537, 1.7793]
                },
                {
                    name: 'charged_dmg',
                    values: [1.2814, 1.3857, 1.49, 1.639, 1.7433, 1.8625, 2.0264, 2.1903, 2.3542, 2.533]
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
                    name: 'swift_hunt_dmg',
                    values: [0.2676, 0.2894, 0.3112, 0.3423, 0.3641, 0.389, 0.4232, 0.4575, 0.4917, 0.529]
                },
                {
                    name: 'swift_hunt_bond_of_life_gain',
                    values: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35]
                },
                {
                    name: 'impale_the_night_dmg',
                    values: [0.3297, 0.3566, 0.3834, 0.4217, 0.4486, 0.4793, 0.5214, 0.5636, 0.6058, 0.6518]
                },
                {
                    name: 'impale_the_night_healing',
                    values: [1.04, 1.04, 1.04, 1.04, 1.04, 1.04, 1.04, 1.04, 1.04, 1.04]
                },
                {
                    name: 'bond_of_life_conversion',
                    values: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8]
                },
                {
                    name: 'surging_blade_dmg',
                    values: [0.432, 0.4644, 0.4968, 0.54, 0.5724, 0.6048, 0.648, 0.6912, 0.7344, 0.7776]
                },
                {
                    name: 'surging_blade_interval',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'night_vigil_duration',
                    values: [7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5]
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
                    values: [1.2688, 1.364, 1.4591, 1.586, 1.6812, 1.7763, 1.9032, 2.0301, 2.157, 2.2838]
                },
                {
                    name: 'bond_of_life_gain',
                    values: [0.66, 0.72, 0.78, 0.84, 0.9, 0.96, 1.02, 1.08, 1.14, 1.2]
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
