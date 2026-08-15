import { RARITY, VISION, WEAPON_TYPE, MATERIAL_FAMILY, MATERIAL_GROUP } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";

export const dendro = [
    {
    id: 'Lauma',
    rarity: RARITY.LEGENDARY,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '2-1',
    avatar_icon: 'assets/avatar-icon/lauma_icon.png',
    baseStats: {
        [STATS.HP]: [829.4, 2151.4, 4788.6, 6183, 7416.5, 8656.6, 9905, 10653.9],
        [STATS.ATK]: [19.8, 51.5, 114.6, 148, 177.5, 207.2, 237, 255],
        [STATS.DEF]: [52.1, 135, 300.5, 388, 465.5, 543.3, 621.6, 668.6]
    },
    ascensionStat: STATS.ELEMENTAL_MASTERY,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'moonfall_silver',
        common_enemy_drops: 'tattered_warrant',
        normal_boss_drops: 'lightbearing_scale_feather',
        talent_books: 'books_of_moonlight',
        weekly_boss_drops: 'eroded_scale_feather'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.337, 0.3623, 0.3876, 0.4213, 0.4466, 0.4718, 0.5055, 0.5392, 0.5729, 0.6066]
                },
                {
                    name: 'hit_2',
                    values: [0.318, 0.3419, 0.3658, 0.3976, 0.4214, 0.4453, 0.4771, 0.5089, 0.5407, 0.5725]
                },
                {
                    name: 'hit_3',
                    values: [0.445, 0.4783, 0.5117, 0.5562, 0.5896, 0.623, 0.6675, 0.7119, 0.7564, 0.8009]
                },
                {
                    name: 'spirit_envoy_form_movement_stamina_cost',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
                },
                {
                    name: 'spirit_envoy_form_jumping_stamina_cost',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'spirit_envoy_form_max_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'spirit_envoy_metamorphosis_cd',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                {
                    name: 'spiritcall_prayer_stamina_cost',
                    values: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
                },
                {
                    name: 'spiritcall_prayer_dmg',
                    values: [1.2904, 1.3872, 1.484, 1.613, 1.7098, 1.8066, 1.9356, 2.0646, 2.1937, 2.3227]
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
                    values: [1.216, 1.3072, 1.3984, 1.52, 1.6112, 1.7024, 1.824, 1.9456, 2.0672, 2.1888]
                },
                {
                    name: '1_hit_hold_dmg',
                    values: [1.5808, 1.6994, 1.8179, 1.976, 2.0946, 2.2131, 2.3712, 2.5293, 2.6874, 2.8454]
                },
                {
                    name: '2_hit_hold_dmg',
                    values: [1.52, 1.634, 1.748, 1.9, 2.014, 2.128, 2.28, 2.432, 2.584, 2.736]
                },
                {
                    name: 'frostgrove_sanctuary_attack_dmg',
                    values: [0.96, 1.032, 1.104, 1.2, 1.272, 1.344, 1.44, 1.536, 1.632, 1.728]
                },
                {
                    name: 'frostgrove_sanctuary_duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'moon_song_duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                    name: 'elemental_res_decrease',
                    values: [0.025, 0.05, 0.075, 0.1, 0.125, 0.15, 0.175, 0.2, 0.225, 0.25]
                },
                {
                    name: 'elemental_res_decrease_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
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
                    name: 'pale_hymn_stacks_gained_from_elemental_burst',
                    values: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
                },
                {
                    name: 'moon_song_to_pale_hymn_conversion',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                },
                {
                    name: 'bloom_hyperbloom_and_burgeon_dmg_increase',
                    values: [2.7776, 2.9859, 3.1942, 3.472, 3.6803, 3.8886, 4.1664, 4.4442, 4.7219, 4.9997]
                },
                {
                    name: 'lunar_bloom_dmg_increase',
                    values: [2.2224, 2.3891, 2.5558, 2.778, 2.9447, 3.1114, 3.3336, 3.5558, 3.7781, 4.0003]
                },
                {
                    name: 'pale_hymn_duration',
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
    id: 'Nahida',
    enkaId: 10000073,
    rarity: RARITY.LEGENDARY,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '10-27',
    avatar_icon: 'assets/avatar-icon/nahida.png',
    baseStats: {
        [STATS.HP]: [806.5, 2092.1, 4656.5, 6012.4, 7211.9, 8417.8, 9631.8, 10360],
        [STATS.ATK]: [23.3, 60.4, 134.4, 173.5, 208.1, 242.9, 278, 299],
        [STATS.DEF]: [49.1, 127.3, 283.3, 365.7, 438.7, 512.1, 585.9, 630.2]
    },
    ascensionStat: STATS.ELEMENTAL_MASTERY,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'kalpalata_lotus',
        common_enemy_drops: 'fungal_spores',
        normal_boss_drops: 'quelled_creeper',
        talent_books: 'books_of_ingenuity',
        weekly_boss_drops: 'puppet_strings'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.403, 0.4333, 0.4635, 0.5038, 0.534, 0.5643, 0.6046, 0.6449, 0.6852, 0.7255]
                },
                {
                    name: 'hit_2',
                    values: [0.3697, 0.3975, 0.4252, 0.4622, 0.4899, 0.5176, 0.5546, 0.5916, 0.6286, 0.6655]
                },
                {
                    name: 'hit_3',
                    values: [0.4587, 0.4932, 0.5276, 0.5734, 0.6078, 0.6422, 0.6881, 0.734, 0.7799, 0.8257]
                },
                {
                    name: 'hit_4',
                    values: [0.5841, 0.6279, 0.6717, 0.7301, 0.7739, 0.8177, 0.8761, 0.9345, 0.9929, 1.0513]
                },
                {
                    name: 'charged_dmg',
                    values: [1.32, 1.419, 1.518, 1.65, 1.749, 1.848, 1.98, 2.112, 2.244, 2.376]
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
                    values: [0.984, 1.0578, 1.1316, 1.23, 1.3038, 1.3776, 1.476, 1.5744, 1.6728, 1.7712]
                },
                {
                    name: 'hold_dmg',
                    values: [1.304, 1.4018, 1.4996, 1.63, 1.7278, 1.8256, 1.956, 2.0864, 2.2168, 2.3472]
                },
                {
                    name: 'tri_karma_purification_dmg',
                    values: [1.032, 1.1094, 1.1868, 1.29, 1.3674, 1.4448, 1.548, 1.6512, 1.7544, 1.8576]
                },
                {
                    name: 'tri_karma_purification_trigger_interval',
                    values: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
                },
                {
                    name: 'seed_of_skandha_duration',
                    values: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
                },
                {
                    name: 'press_cd',
                    values: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
                },
                {
                    name: 'hold_cd',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'pyro_dmg_bonus',
                    values: [0.1488, 0.16, 0.1711, 0.186, 0.1972, 0.2083, 0.2232, 0.2381, 0.253, 0.2678]
                },
                {
                    name: 'pyro_dmg_bonus',
                    values: [0.2232, 0.2399, 0.2567, 0.279, 0.2957, 0.3125, 0.3348, 0.3571, 0.3794, 0.4018]
                },
                {
                    name: 'electro_trigger_interval_decrease',
                    values: [0.248, 0.2666, 0.2852, 0.31, 0.3286, 0.3472, 0.372, 0.3968, 0.4216, 0.4464]
                },
                {
                    name: 'electro_trigger_interval_decrease',
                    values: [0.372, 0.3999, 0.4278, 0.465, 0.4929, 0.5208, 0.558, 0.5952, 0.6324, 0.6696]
                },
                {
                    name: 'hydro_duration_extension',
                    values: [3.344, 3.5948, 3.8456, 4.18, 4.4308, 4.6816, 5.016, 5.3504, 5.6848, 6.0192]
                },
                {
                    name: 'hydro_duration_extension',
                    values: [5.016, 5.3922, 5.7684, 6.27, 6.6462, 7.0224, 7.524, 8.0256, 8.5272, 9.0288]
                },
                {
                    name: 'base_duration',
                    values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
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
    id: 'Tighnari',
    enkaId: 10000069,
    rarity: RARITY.LEGENDARY,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '12-29',
    avatar_icon: 'assets/avatar-icon/tighnari.png',
    baseStats: {
        [STATS.HP]: [844.6, 2191, 4876.6, 6296.7, 7552.9, 8815.8, 10087.2, 10849.9],
        [STATS.ATK]: [20.9, 54.1, 120.4, 155.5, 186.5, 217.7, 249, 267.9],
        [STATS.DEF]: [49.1, 127.3, 283.3, 365.7, 438.7, 512.1, 585.9, 630.2]
    },
    ascensionStat: STATS.DENDRO_DMG,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'nilotpala_lotus',
        common_enemy_drops: 'fungal_spores',
        normal_boss_drops: 'majestic_hooked_beak',
        talent_books: 'books_of_admonition',
        weekly_boss_drops: 'the_meaning_of_aeons'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4463, 0.4827, 0.519, 0.5709, 0.6072, 0.6488, 0.7058, 0.7629, 0.82, 0.8823]
                },
                {
                    name: 'hit_2',
                    values: [0.4197, 0.4538, 0.488, 0.5368, 0.571, 0.61, 0.6637, 0.7174, 0.771, 0.8296]
                },
                {
                    name: 'hit_3',
                    values: [0.2645, 0.286, 0.3075, 0.3383, 0.3598, 0.3844, 0.4182, 0.452, 0.4859, 0.5228]
                },
                {
                    name: 'hit_4',
                    values: [0.6863, 0.7421, 0.798, 0.8778, 0.9337, 0.9975, 1.0853, 1.1731, 1.2608, 1.3566]
                },
                {
                    name: 'aimed_shot',
                    values: [0.4386, 0.4743, 0.51, 0.561, 0.5967, 0.6375, 0.6936, 0.7497, 0.8058, 0.867]
                },
                {
                    name: 'level_1_aimed_shot',
                    values: [1.24, 1.333, 1.426, 1.55, 1.643, 1.736, 1.86, 1.984, 2.108, 2.232]
                },
                {
                    name: 'wreath_arrow_dmg',
                    values: [0.872, 0.9374, 1.0028, 1.09, 1.1554, 1.2208, 1.308, 1.3952, 1.4824, 1.5696]
                },
                {
                    name: 'clusterbloom_arrow_dmg',
                    values: [0.386, 0.415, 0.4439, 0.4825, 0.5115, 0.5404, 0.579, 0.6176, 0.6562, 0.6948]
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
                    values: [1.496, 1.6082, 1.7204, 1.87, 1.9822, 2.0944, 2.244, 2.3936, 2.5432, 2.6928]
                },
                {
                    name: 'vijnana_khanda_field_duration',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: 'vijnana_suffusion_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
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
                    name: 'tanglevine_shaft_dmg',
                    values: [0.5562, 0.5979, 0.6396, 0.6953, 0.737, 0.7787, 0.8343, 0.8899, 0.9455, 1.0012]
                },
                {
                    name: 'secondary_tanglevine_shaft_dmg',
                    values: [0.6798, 0.7308, 0.7818, 0.8498, 0.9007, 0.9517, 1.0197, 1.0877, 1.1557, 1.2236]
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
    id: 'Collei',
    enkaId: 10000067,
    rarity: RARITY.EPIC,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.BOW,
    birthday: '8-18',
    avatar_icon: 'assets/avatar-icon/collei.png',
    baseStats: {
        [STATS.HP]: [820.6, 2108.2, 4511.6, 5770.2, 6883.6, 7996.2, 9109.6, 9787.4],
        [STATS.ATK]: [16.7, 43, 92, 117.7, 140.4, 163.1, 185.8, 199.7],
        [STATS.DEF]: [50.4, 129.4, 276.9, 354.1, 422.4, 490.7, 559, 600.6]
    },
    ascensionStat: STATS.ATK_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'rukkhashava_mushrooms',
        common_enemy_drops: 'firm_arrowhead',
        normal_boss_drops: 'majestic_hooked_beak',
        talent_books: 'books_of_praxis',
        weekly_boss_drops: 'tears_of_the_calamitous_god'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.436, 0.4715, 0.507, 0.5577, 0.5932, 0.6338, 0.6895, 0.7453, 0.8011, 0.8619]
                },
                {
                    name: 'hit_2',
                    values: [0.4266, 0.4613, 0.496, 0.5456, 0.5803, 0.62, 0.6746, 0.7291, 0.7837, 0.8432]
                },
                {
                    name: 'hit_3',
                    values: [0.5409, 0.585, 0.629, 0.6919, 0.7359, 0.7863, 0.8554, 0.9246, 0.9938, 1.0693]
                },
                {
                    name: 'hit_4',
                    values: [0.6803, 0.7356, 0.791, 0.8701, 0.9255, 0.9888, 1.0758, 1.1628, 1.2498, 1.3447]
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
                    values: [1.512, 1.6254, 1.7388, 1.89, 2.0034, 2.1168, 2.268, 2.4192, 2.5704, 2.7216]
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
                    name: 'explosion_dmg',
                    values: [2.0182, 2.1696, 2.321, 2.5228, 2.6742, 2.8255, 3.0274, 3.2292, 3.431, 3.6328]
                },
                {
                    name: 'leap_dmg',
                    values: [0.4325, 0.4649, 0.4974, 0.5406, 0.573, 0.6055, 0.6487, 0.692, 0.7352, 0.7785]
                },
                {
                    name: 'duration',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
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
    id: 'Alhaitham',
    enkaId: 10000078,
    rarity: RARITY.LEGENDARY,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '2-11',
    avatar_icon: 'assets/avatar-icon/alhaitham.png',
    baseStats: {
        [STATS.HP]: [1039.1, 2695.5, 5999.5, 7746.5, 9291.9, 10845.6, 12409.7, 13348],
        [STATS.ATK]: [24.4, 63.3, 140.8, 181.8, 218.1, 254.6, 291.3, 313.3],
        [STATS.DEF]: [60.8, 157.8, 351.3, 453.6, 544.1, 635.1, 726.7, 781.6]
    },
    ascensionStat: STATS.DENDRO_DMG,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'sand_grease_pupa',
        common_enemy_drops: 'faded_red_satin',
        normal_boss_drops: 'pseudo_stamens',
        talent_books: 'books_of_ingenuity',
        weekly_boss_drops: 'mirror_of_mushin'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4953, 0.5356, 0.5759, 0.6335, 0.6738, 0.7199, 0.7832, 0.8465, 0.9099, 0.979]
                },
                {
                    name: 'hit_2',
                    values: [0.5075, 0.5488, 0.5901, 0.6491, 0.6904, 0.7376, 0.8026, 0.8675, 0.9324, 1.0032]
                },
                {
                    name: 'hit_3',
                    values: [0.3418, 0.3696, 0.3974, 0.4372, 0.465, 0.4968, 0.5405, 0.5842, 0.6279, 0.6756]
                },
                {
                    name: 'hit_4',
                    values: [0.6677, 0.722, 0.7764, 0.854, 0.9084, 0.9705, 1.0559, 1.1413, 1.2267, 1.3198]
                },
                {
                    name: 'hit_5',
                    values: [0.8385, 0.9068, 0.975, 1.0725, 1.1408, 1.2188, 1.326, 1.4333, 1.5405, 1.6575]
                },
                {
                    name: 'charged_dmg',
                    values: [0.5526, 0.5975, 0.6425, 0.7068, 0.7517, 0.8031, 0.8738, 0.9445, 1.0152, 1.0923]
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
                    name: 'rush_attack_dmg',
                    values: [1.936, 2.0812, 2.2264, 2.42, 2.5652, 2.7104, 2.904, 3.0976, 3.2912, 3.4848]
                },
                {
                    name: 'projection_attack_interval',
                    values: [1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6]
                },
                {
                    name: '1_mirror_projection_attack_dmg',
                    values: [0.672, 0.7224, 0.7728, 0.84, 0.8904, 0.9408, 1.008, 1.0752, 1.1424, 1.2096]
                },
                {
                    name: '2_mirror_projection_attack_dmg',
                    values: [0.672, 0.7224, 0.7728, 0.84, 0.8904, 0.9408, 1.008, 1.0752, 1.1424, 1.2096]
                },
                {
                    name: '3_mirror_projection_attack_dmg',
                    values: [0.672, 0.7224, 0.7728, 0.84, 0.8904, 0.9408, 1.008, 1.0752, 1.1424, 1.2096]
                },
                {
                    name: 'chisel_light_mirror_removal_interval',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
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
                    name: 'single_instance_dmg',
                    values: [1.216, 1.3072, 1.3984, 1.52, 1.6112, 1.7024, 1.824, 1.9456, 2.0672, 2.1888]
                },
                {
                    name: 'basic_attack_instances',
                    values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                {
                    name: '1_mirror_attack_instances',
                    values: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
                },
                {
                    name: '2_mirror_attack_instances',
                    values: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                },
                {
                    name: '3_mirror_attack_instances',
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
    id: 'Yaoyao',
    enkaId: 10000077,
    rarity: RARITY.EPIC,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '3-6',
    avatar_icon: 'assets/avatar-icon/yaoyao.png',
    baseStats: {
        [STATS.HP]: [1030.3, 2646.9, 5664.6, 7244.8, 8642.8, 10039.7, 11437.6, 12288.7],
        [STATS.ATK]: [17.8, 45.7, 97.9, 125.2, 149.4, 173.5, 197.7, 212.4],
        [STATS.DEF]: [62.9, 161.7, 346.1, 442.6, 528, 613.4, 698.8, 750.8]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'jueyun_chili',
        common_enemy_drops: 'slime_condensate',
        normal_boss_drops: 'quelled_creeper',
        talent_books: 'books_of_diligence',
        weekly_boss_drops: 'dakas_bell'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.51, 0.5515, 0.593, 0.6523, 0.6939, 0.7413, 0.8065, 0.8718, 0.937, 1.0082]
                },
                {
                    name: 'hit_2',
                    values: [0.4744, 0.513, 0.5517, 0.6068, 0.6454, 0.6896, 0.7503, 0.8109, 0.8716, 0.9378]
                },
                {
                    name: 'hit_3',
                    values: [0.3138, 0.3393, 0.3649, 0.4013, 0.4269, 0.4561, 0.4962, 0.5363, 0.5765, 0.6202]
                },
                {
                    name: 'hit_4',
                    values: [0.7793, 0.8427, 0.9062, 0.9968, 1.0602, 1.1327, 1.2324, 1.3321, 1.4318, 1.5405]
                },
                {
                    name: 'charged_dmg',
                    values: [1.1266, 1.2183, 1.31, 1.441, 1.5327, 1.6375, 1.7816, 1.9257, 2.0698, 2.227]
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
                    name: 'white_jade_radish_dmg',
                    values: [0.2992, 0.3216, 0.3441, 0.374, 0.3964, 0.4189, 0.4488, 0.4787, 0.5086, 0.5386]
                },
                {
                    name: 'white_jade_radish_healing',
                    values: [0.0171, 0.0184, 0.0197, 0.0214, 0.0227, 0.024, 0.0257, 0.0274, 0.0291, 0.0309]
                },
                {
                    name: 'yuegui_throwing_mode_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'white_jade_radish_duration',
                    values: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
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
                    values: [1.1456, 1.2315, 1.3174, 1.432, 1.5179, 1.6038, 1.7184, 1.833, 1.9475, 2.0621]
                },
                {
                    name: 'adeptal_legacy_white_jade_radish_dmg',
                    values: [0.7216, 0.7757, 0.8298, 0.902, 0.9561, 1.0102, 1.0824, 1.1546, 1.2267, 1.2989]
                },
                {
                    name: 'adeptal_legacy_white_jade_radish_healing',
                    values: [0.0202, 0.0217, 0.0232, 0.0252, 0.0267, 0.0282, 0.0303, 0.0323, 0.0343, 0.0363]
                },
                {
                    name: 'dendro_res_bonus',
                    values: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
                },
                {
                    name: 'adeptal_legacy_duration',
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
}
,
{
    id: 'Baizhu',
    enkaId: 10000082,
    rarity: RARITY.LEGENDARY,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '4-25',
    baseStats: {
        [STATS.HP]: [1039.1, 2695.5, 5999.5, 7746.5, 9291.9, 10845.6, 12409.7, 13348],
        [STATS.ATK]: [15, 38.9, 86.5, 111.7, 134, 156.4, 179, 192.5],
        [STATS.DEF]: [38.9, 100.9, 224.5, 289.9, 347.8, 405.9, 464.4, 499.6]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'violetgrass',
        common_enemy_drops: 'fungal_spores',
        normal_boss_drops: 'evergloom_ring',
        talent_books: 'books_of_gold',
        weekly_boss_drops: 'worldspan_fern'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3737, 0.4017, 0.4298, 0.4671, 0.4952, 0.5232, 0.5606, 0.5979, 0.6353, 0.6727]
                },
                {
                    name: 'hit_2',
                    values: [0.3642, 0.3916, 0.4189, 0.4553, 0.4826, 0.5099, 0.5464, 0.5828, 0.6192, 0.6556]
                },
                {
                    name: 'hit_3',
                    values: [0.2254, 0.2423, 0.2592, 0.2818, 0.2987, 0.3156, 0.3381, 0.3607, 0.3832, 0.4057]
                },
                {
                    name: 'hit_4',
                    values: [0.5414, 0.582, 0.6226, 0.6767, 0.7173, 0.7579, 0.8121, 0.8662, 0.9203, 0.9745]
                },
                {
                    name: 'charged_dmg',
                    values: [1.2104, 1.3012, 1.392, 1.513, 1.6038, 1.6946, 1.8156, 1.9366, 2.0577, 2.1787]
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
                    values: [0.792, 0.8514, 0.9108, 0.99, 1.0494, 1.1088, 1.188, 1.2672, 1.3464, 1.4256]
                },
                {
                    name: 'heal_amount',
                    values: [0.08, 0.086, 0.092, 0.1, 0.106, 0.112, 0.12, 0.128, 0.136, 0.144]
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
                    name: 'seamless_shield_dmg_absorption',
                    values: [0.008, 0.0086, 0.0092, 0.01, 0.0106, 0.0112, 0.012, 0.0128, 0.0136, 0.0144]
                },
                {
                    name: 'seamless_shield_duration',
                    values: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
                },
                {
                    name: 'seamless_shield_healing',
                    values: [0.052, 0.0559, 0.0598, 0.065, 0.0689, 0.0728, 0.078, 0.0832, 0.0884, 0.0936]
                },
                {
                    name: 'spiritvein_dmg',
                    values: [0.9706, 1.0434, 1.1162, 1.2133, 1.2861, 1.3589, 1.456, 1.553, 1.6501, 1.7472]
                },
                {
                    name: 'pulsing_clarity_duration',
                    values: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14]
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
    id: 'Emilie',
    enkaId: 10000099,
    rarity: RARITY.LEGENDARY,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.POLEARM,
    birthday: '9-22',
    baseStats: {
        [STATS.HP]: [1056.3, 2740, 6098.6, 7874.5, 9445.4, 11024.7, 12614.7, 13568.5],
        [STATS.ATK]: [26.1, 67.6, 150.5, 194.3, 233.1, 272.1, 311.3, 334.8],
        [STATS.DEF]: [56.8, 147.4, 328.2, 423.7, 508.3, 593.2, 678.8, 730.1]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'lakelight_lily',
        common_enemy_drops: 'meshing_gear',
        normal_boss_drops: 'fragment_of_a_golden_melody',
        talent_books: 'books_of_order',
        weekly_boss_drops: 'silken_feather'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4856, 0.5251, 0.5647, 0.6211, 0.6607, 0.7058, 0.7679, 0.8301, 0.8922, 0.9599]
                },
                {
                    name: 'hit_2',
                    values: [0.449, 0.4855, 0.522, 0.5742, 0.6108, 0.6526, 0.71, 0.7674, 0.8248, 0.8875]
                },
                {
                    name: 'hit_3',
                    values: [0.593, 0.6413, 0.6895, 0.7585, 0.8068, 0.8619, 0.9378, 1.0136, 1.0895, 1.1722]
                },
                {
                    name: 'hit_4',
                    values: [0.751, 0.8122, 0.8733, 0.9606, 1.0217, 1.0916, 1.1877, 1.2837, 1.3798, 1.4846]
                },
                {
                    name: 'charged_dmg',
                    values: [0.9133, 0.9877, 1.062, 1.1682, 1.2425, 1.3275, 1.4443, 1.5611, 1.678, 1.8054]
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
                    values: [0.4708, 0.5061, 0.5414, 0.5885, 0.6238, 0.6591, 0.7062, 0.7533, 0.8004, 0.8474]
                },
                {
                    name: 'level_1_lumidouce_case_attack_dmg',
                    values: [0.396, 0.4257, 0.4554, 0.495, 0.5247, 0.5544, 0.594, 0.6336, 0.6732, 0.7128]
                },
                {
                    name: 'level_2_lumidouce_case_attack_dmg',
                    values: [0.84, 0.903, 0.966, 1.05, 1.113, 1.176, 1.26, 1.344, 1.428, 1.512]
                },
                {
                    name: 'lumidouce_case_duration',
                    values: [22, 22, 22, 22, 22, 22, 22, 22, 22, 22]
                },
                {
                    name: 'spiritbreath_thorn_dmg',
                    values: [0.3852, 0.4141, 0.443, 0.4815, 0.5104, 0.5393, 0.5778, 0.6163, 0.6548, 0.6934]
                },
                {
                    name: 'spiritbreath_thorn_interval',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'skill_cd',
                    values: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'level_3_lumidouce_case_attack_dmg',
                    values: [2.172, 2.3349, 2.4978, 2.715, 2.8779, 3.0408, 3.258, 3.4752, 3.6924, 3.9096]
                },
                {
                    name: 'level_3_lumidouce_case_duration',
                    values: [2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8]
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
    id: 'Kaveh',
    enkaId: 10000081,
    rarity: RARITY.EPIC,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '7-9',
    baseStats: {
        [STATS.HP]: [1003, 2576.6, 5514.2, 7052.5, 8413.3, 9773.1, 11134, 11962.4],
        [STATS.ATK]: [19.6, 50.3, 107.7, 137.7, 164.3, 190.9, 217.5, 233.6],
        [STATS.DEF]: [62.9, 161.7, 346.1, 442.6, 528, 613.4, 698.8, 750.8]
    },
    ascensionStat: STATS.ELEMENTAL_MASTERY,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'mourning_flower',
        common_enemy_drops: 'fungal_spores',
        normal_boss_drops: 'quelled_creeper',
        talent_books: 'books_of_ingenuity',
        weekly_boss_drops: 'primordial_greenbloom'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.7619, 0.8239, 0.8859, 0.9745, 1.0365, 1.1074, 1.2048, 1.3022, 1.3997, 1.506]
                },
                {
                    name: 'hit_2',
                    values: [0.6964, 0.7531, 0.8098, 0.8907, 0.9474, 1.0122, 1.1013, 1.1903, 1.2794, 1.3766]
                },
                {
                    name: 'hit_3',
                    values: [0.8426, 0.9112, 0.9798, 1.0778, 1.1463, 1.2247, 1.3325, 1.4403, 1.5481, 1.6656]
                },
                {
                    name: 'hit_4',
                    values: [1.0269, 1.1105, 1.1941, 1.3135, 1.397, 1.4926, 1.6239, 1.7553, 1.8866, 2.0299]
                },
                {
                    name: 'charged_attack_cyclic_dmg',
                    values: [0.5315, 0.5747, 0.618, 0.6798, 0.7231, 0.7725, 0.8405, 0.9085, 0.9764, 1.0506]
                },
                {
                    name: 'charged_attack_final_dmg',
                    values: [0.9615, 1.0397, 1.118, 1.2298, 1.3081, 1.3975, 1.5205, 1.6435, 1.7664, 1.9006]
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
                    values: [2.04, 2.193, 2.346, 2.55, 2.703, 2.856, 3.06, 3.264, 3.468, 3.672]
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
                    values: [1.6, 1.72, 1.84, 2, 2.12, 2.24, 2.4, 2.56, 2.72, 2.88]
                },
                {
                    name: 'duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'dendro_core_burst_dmg_bonus',
                    values: [0.2749, 0.2955, 0.3161, 0.3436, 0.3642, 0.3848, 0.4123, 0.4398, 0.4673, 0.4948]
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
    id: 'Kinich',
    enkaId: 10000101,
    rarity: RARITY.LEGENDARY,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.CLAYMORE,
    birthday: '11-11',
    baseStats: {
        [STATS.HP]: [1001, 2596.6, 5779.3, 7462.3, 8950.9, 10447.6, 11954.3, 12858.2],
        [STATS.ATK]: [25.9, 67.1, 149.4, 192.9, 231.4, 270.1, 309.1, 332.5],
        [STATS.DEF]: [62.4, 161.9, 360.3, 465.2, 558, 651.3, 745.3, 801.6]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'saurian_claw_succulent',
        common_enemy_drops: 'juvenile_fang',
        normal_boss_drops: 'overripe_flamegranate',
        talent_books: 'books_of_kindling',
        weekly_boss_drops: 'denial_and_judgment'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.9899, 1.0704, 1.151, 1.2661, 1.3467, 1.4388, 1.5654, 1.692, 1.8186, 1.9567]
                },
                {
                    name: 'hit_2',
                    values: [0.829, 0.8965, 0.964, 1.0604, 1.1279, 1.205, 1.311, 1.4171, 1.5231, 1.6388]
                },
                {
                    name: 'hit_3',
                    values: [1.235, 1.3355, 1.436, 1.5796, 1.6801, 1.795, 1.953, 2.1109, 2.2689, 2.4412]
                },
                {
                    name: 'mid_air_normal_attack_dmg',
                    values: [1.677, 1.8135, 1.95, 2.145, 2.2815, 2.4375, 2.652, 2.8665, 3.081, 3.315]
                },
                {
                    name: 'charged_dmg',
                    values: [0.4842, 0.5236, 0.563, 0.6193, 0.6587, 0.7038, 0.7657, 0.8276, 0.8895, 0.9571]
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
                    name: 'loop_shot_dmg',
                    values: [0.5728, 0.6158, 0.6587, 0.716, 0.759, 0.8019, 0.8592, 0.9165, 0.9738, 1.031]
                },
                {
                    name: 'scalespiker_cannon_dmg',
                    values: [6.8744, 7.39, 7.9056, 8.593, 9.1086, 9.6242, 10.3116, 10.999, 11.6865, 12.3739]
                },
                {
                    name: 'nightsoul_point_limit',
                    values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
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
                    values: [1.34, 1.4405, 1.541, 1.675, 1.7755, 1.876, 2.01, 2.144, 2.278, 2.412]
                },
                {
                    name: 'dragon_breath_dmg',
                    values: [1.2074, 1.2979, 1.3885, 1.5092, 1.5998, 1.6903, 1.811, 1.9318, 2.0525, 2.1732]
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
}
,
{
    id: 'Kirara',
    enkaId: 10000061,
    rarity: RARITY.EPIC,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.SWORD,
    birthday: '1-22',
    baseStats: {
        [STATS.HP]: [1021.2, 2623.5, 5614.4, 7180.7, 8566.3, 9950.8, 11336.4, 12179.9],
        [STATS.ATK]: [18.7, 48, 102.8, 131.5, 156.9, 182.2, 207.6, 223],
        [STATS.DEF]: [45.8, 117.6, 251.7, 321.9, 384, 446.1, 508.2, 546]
    },
    ascensionStat: STATS.HP_PERCENT,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'amakumo_fruit',
        common_enemy_drops: 'spectral_husk',
        normal_boss_drops: 'evergloom_ring',
        talent_books: 'books_of_transience',
        weekly_boss_drops: 'everamber'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.479, 0.518, 0.557, 0.6127, 0.6517, 0.6963, 0.7575, 0.8188, 0.8801, 0.9469]
                },
                {
                    name: 'hit_2',
                    values: [0.4635, 0.5013, 0.539, 0.5929, 0.6306, 0.6738, 0.733, 0.7923, 0.8516, 0.9163]
                },
                {
                    name: 'hit_3',
                    values: [0.2542, 0.2749, 0.2956, 0.3252, 0.3459, 0.3695, 0.402, 0.4345, 0.467, 0.5025]
                },
                {
                    name: 'hit_4',
                    values: [0.7327, 0.7924, 0.852, 0.9372, 0.9968, 1.065, 1.1587, 1.2524, 1.3462, 1.4484]
                },
                {
                    name: 'charged_dmg',
                    values: [0.2238, 0.242, 0.2602, 0.2862, 0.3044, 0.3253, 0.3539, 0.3825, 0.4111, 0.4423]
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
                    name: 'tail_flicking_flying_kick_dmg',
                    values: [1.04, 1.118, 1.196, 1.3, 1.378, 1.456, 1.56, 1.664, 1.768, 1.872]
                },
                {
                    name: 'shield_dmg_absorption',
                    values: [0.1, 0.1075, 0.115, 0.125, 0.1325, 0.14, 0.15, 0.16, 0.17, 0.18]
                },
                {
                    name: 'max_shield_dmg_absorption',
                    values: [0.16, 0.172, 0.184, 0.2, 0.212, 0.224, 0.24, 0.256, 0.272, 0.288]
                },
                {
                    name: 'shield_duration',
                    values: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                },
                {
                    name: 'urgent_neko_parcel_hit_dmg',
                    values: [0.336, 0.3612, 0.3864, 0.42, 0.4452, 0.4704, 0.504, 0.5376, 0.5712, 0.6048]
                },
                {
                    name: 'max_urgent_neko_parcel_duration',
                    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                },
                {
                    name: 'flipclaw_strike_dmg',
                    values: [1.44, 1.548, 1.656, 1.8, 1.908, 2.016, 2.16, 2.304, 2.448, 2.592]
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
                    name: 'skill_dmg',
                    values: [5.7024, 6.1301, 6.5578, 7.128, 7.5557, 7.9834, 8.5536, 9.1238, 9.6941, 10.2643]
                },
                {
                    name: 'cat_grass_cardamom_explosion_dmg',
                    values: [0.3564, 0.3831, 0.4099, 0.4455, 0.4722, 0.499, 0.5346, 0.5702, 0.6059, 0.6415]
                },
                {
                    name: 'cat_grass_cardamom_duration',
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
    id: 'Nefer',
    enkaId: 10000122,
    rarity: RARITY.LEGENDARY,
    element: VISION.DENDRO,
    weapon: WEAPON_TYPE.CATALYST,
    birthday: '5-9',
    baseStats: {
        [STATS.HP]: [989, 2565.4, 5710, 7372.7, 8843.5, 10322.2, 11810.9, 12703.9],
        [STATS.ATK]: [26.8, 69.6, 154.8, 199.9, 239.8, 279.8, 320.2, 344.4],
        [STATS.DEF]: [62.2, 161.4, 359.3, 463.9, 556.4, 649.4, 743.1, 799.3]
    },
    ascensionStat: STATS.CRIT_DMG,
    ascensionMaterials: {
        ascension_gems: 'nagadus_emerald',
        local_specialties: 'moonfall_silver',
        common_enemy_drops: 'tattered_warrant',
        normal_boss_drops: 'radiant_antler',
        talent_books: 'books_of_elysium',
        weekly_boss_drops: 'ascended_sample_rook'
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.3807, 0.4093, 0.4378, 0.4759, 0.5044, 0.533, 0.5711, 0.6091, 0.6472, 0.6853]
                },
                {
                    name: 'hit_2',
                    values: [0.3756, 0.4038, 0.432, 0.4696, 0.4977, 0.5259, 0.5635, 0.601, 0.6386, 0.6762]
                },
                {
                    name: 'hit_3',
                    values: [0.2524, 0.2713, 0.2903, 0.3155, 0.3344, 0.3534, 0.3786, 0.4038, 0.4291, 0.4543]
                },
                {
                    name: 'hit_4',
                    values: [0.6099, 0.6557, 0.7014, 0.7624, 0.8082, 0.8539, 0.9149, 0.9759, 1.0369, 1.0979]
                },
                {
                    name: 'charged_dmg',
                    values: [1.3088, 1.407, 1.5051, 1.636, 1.7342, 1.8323, 1.9632, 2.0941, 2.225, 2.3558]
                },
                {
                    name: 'charged_attack_charging_stamina_drain',
                    values: [18.15, 18.15, 18.15, 18.15, 18.15, 18.15, 18.15, 18.15, 18.15, 18.15]
                },
                {
                    name: 'charged_stamina_cost',
                    values: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
                },
                {
                    name: 'shadow_dance_charged_attack_stamina_cost',
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
                    values: [0.7638, 0.8211, 0.8784, 0.9548, 1.0121, 1.0694, 1.1458, 1.2221, 1.2985, 1.3749]
                },
                {
                    name: 'phantasm_performance_1_hit_dmg_nefer',
                    values: [0.2464, 0.2649, 0.2834, 0.308, 0.3265, 0.345, 0.3696, 0.3942, 0.4189, 0.4435]
                },
                {
                    name: 'phantasm_performance_2_hit_dmg_nefer',
                    values: [0.3203, 0.3443, 0.3684, 0.4004, 0.4244, 0.4484, 0.4805, 0.5125, 0.5445, 0.5766]
                },
                {
                    name: 'phantasm_performance_1_hit_dmg_shades',
                    values: [0.96, 1.032, 1.104, 1.2, 1.272, 1.344, 1.44, 1.536, 1.632, 1.728]
                },
                {
                    name: 'phantasm_performance_2_hit_dmg_shades',
                    values: [0.96, 1.032, 1.104, 1.2, 1.272, 1.344, 1.44, 1.536, 1.632, 1.728]
                },
                {
                    name: 'phantasm_performance_3_hit_dmg_shades',
                    values: [1.28, 1.376, 1.472, 1.6, 1.696, 1.792, 1.92, 2.048, 2.176, 2.304]
                },
                {
                    name: 'phantasm_performance_charges',
                    values: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
                },
                {
                    name: 'shadow_dance_duration',
                    values: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
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
                    name: 'hit_1',
                    values: [2.2464, 2.4149, 2.5834, 2.808, 2.9765, 3.145, 3.3696, 3.5942, 3.8189, 4.0435]
                },
                {
                    name: 'hit_2',
                    values: [3.3696, 3.6223, 3.875, 4.212, 4.4647, 4.7174, 5.0544, 5.3914, 5.7283, 6.0653]
                },
                {
                    name: 'dmg_bonus',
                    values: [0.13, 0.16, 0.19, 0.22, 0.25, 0.28, 0.31, 0.34, 0.37, 0.4]
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
