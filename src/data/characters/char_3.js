import { RARITY, VISION, WEAPON_TYPE } from "../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../shared/config/material_type.js";
import { STATS } from "../../shared/config/stats.js";

//  [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.VAYUDA_TURQUOISE,
//  [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.WOLFHOOK,
//  [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.PRISMATIC_SEVERED_TAIL,
//  [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_FREEDOM,
//  [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.SLIME_MATERIALS,
//  [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.ASCENDED_SAMPLE_QUEEN

export const char_3 = [
    {//jean
        id: 'Jean',
        enkaId: 10000003,
        rarity: RARITY.LEGENDARY,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: '3-14',
        avatar: 'assets/avatar/Jean_Profile.webp',
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
    {//Sucrose
        id: 'Sucrose',
        enkaId: 10000043,
        rarity: RARITY.EPIC,
        element: VISION.ANEMO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: '11-26',
        avatar: 'assets/avatar/Sucrose_Profile.webp',
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
        common_enemy_drops: 'whopperflower',
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
    {//Chongyun
        id: 'Chongyun',
        enkaId: 10000036,
        rarity: RARITY.EPIC,
        element: VISION.CRYO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: '9-7',
        avatar: 'assets/avatar/Chongyun_Profile.webp',
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
    },
    {//noelle
        id: 'Noelle',
        enkaId: 10000034,
        rarity: RARITY.EPIC,
        element: VISION.GEO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: '3-21',
        avatar: 'assets/avatar/Noelle_Profile.webp',
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
    {//Bennett
        id: 'Bennett',
        enkaId: 10000032,
        rarity: RARITY.EPIC,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: '2-29',
        avatar: 'assets/avatar/Bennett_Profile.webp',
        avatar_icon: 'assets/avatar-icon/bennett.png',
        baseStats: {
            [STATS.HP]: [1039.4, 2670.3, 5714.7, 7308.9, 8719.2, 10128.5, 11538.8, 12397.4],
            [STATS.ATK]: [16, 41.2, 88.1, 112.7, 134.4, 156.2, 177.9, 191.2],
            [STATS.DEF]: [64.7, 166.1, 355.5, 454.7, 542.4, 630.1, 717.8, 771.2]
        },
        ascensionStat: STATS.ENERGY_RECHARGE,
        ascensionMaterials: {
            ascension_gems: 'agnidus_agate',
            local_specialties: 'windwheel_aster',
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.TREASURE_HOARDER,
            normal_boss_drops: 'everflame_seed',
            talent_books: 'books_of_resistance',
            [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.DVALINS_PLUME
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4455, 0.4817, 0.518, 0.5698, 0.6061, 0.6475, 0.7045, 0.7615, 0.8184, 0.8806]
                },
                {
                    name: 'hit_2',
                    values: [0.4274, 0.4622, 0.497, 0.5467, 0.5815, 0.6213, 0.6759, 0.7306, 0.7853, 0.8449]
                },
                {
                    name: 'hit_3',
                    values: [0.5461, 0.5906, 0.635, 0.6985, 0.743, 0.7938, 0.8636, 0.9335, 1.0033, 1.0795]
                },
                {
                    name: 'hit_4',
                    values: [0.5968, 0.6454, 0.694, 0.7634, 0.812, 0.8675, 0.9438, 1.0202, 1.0965, 1.1798]
                },
                {
                    name: 'hit_5',
                    values: [0.719, 0.7775, 0.836, 0.9196, 0.9781, 1.045, 1.137, 1.2289, 1.3209, 1.4212]
                },
                {
                    name: 'charged_dmg',
                    values: [0.559, 0.6045, 0.65, 0.715, 0.7605, 0.8125, 0.884, 0.9555, 1.027, 1.105]
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
                    name: 'press_dmg',
                    values: [1.376, 1.4792, 1.5824, 1.72, 1.8232, 1.9264, 2.064, 2.2016, 2.3392, 2.4768]
                },
                {
                    name: 'charge_level_1_dmg',
                    values: [0.84, 0.903, 0.966, 1.05, 1.113, 1.176, 1.26, 1.344, 1.428, 1.512]
                },
                {
                    name: 'charge_level_2_dmg',
                    values: [0.88, 0.946, 1.012, 1.1, 1.166, 1.232, 1.32, 1.408, 1.496, 1.584]
                },
                {
                    name: 'explosion_dmg',
                    values: [1.32, 1.419, 1.518, 1.65, 1.749, 1.848, 1.98, 2.112, 2.244, 2.376]
                },
                {
                    name: 'cd',
                    values: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
                }
            ]
        },
        burst: {
            icon: '',
            stats: [
                {
                    name: 'skill_dmg',
                    values: [2.328, 2.5026, 2.6772, 2.91, 3.0846, 3.2592, 3.492, 3.7248, 3.9576, 4.1904]
                },
                {
                    name: 'continuous_regeneration_per_sec',
                    values: [0.06, 0.0645, 0.069, 0.075, 0.0795, 0.084, 0.09, 0.096, 0.102, 0.108]
                },
                {
                    name: 'atk_bonus_ratio',
                    values: [0.56, 0.602, 0.644, 0.7, 0.742, 0.784, 0.84, 0.896, 0.952, 1.008]
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
    },
]