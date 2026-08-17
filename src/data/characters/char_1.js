import { RARITY, VISION, WEAPON_TYPE } from "../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../shared/config/material_type.js";
import { STATS } from "../../shared/config/stats.js";

//  [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.VAYUDA_TURQUOISE,
//  [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.PRISMATIC_SEVERED_TAIL,
//  [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.WOLFHOOK,
//  [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_FREEDOM,
//  [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.SLIME_MATERIALS,
//  [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.ASCENDED_SAMPLE_QUEEN

export const char_1 = [
    { //razor
        id: 'Razor',
        enkaId: 10000020,
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: '9-9',
        avatar: 'assets/avatar/Razor_Profile.webp',
        avatar_icon: 'assets/avatar-icon/razor.png',
        baseStats: {
            [STATS.HP]: [1003, 2576.6, 5514.2, 7052.5, 8413.3, 9773.1, 11134, 11962.4],
            [STATS.ATK]: [19.6, 50.3, 107.7, 137.7, 164.3, 190.9, 217.5, 233.6],
            [STATS.DEF]: [62.9, 161.7, 346.1, 442.6, 528, 613.4, 698.8, 750.8]
        },
        ascensionStat: STATS.PHYSICAL_DMG,
        ascensionMaterials: {
            [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.VAJRADA_AMETHYST,
            [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.LIGHTNING_PRISM,
            [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.WOLFHOOK,
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_RESISTANCE,
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.DAMAGED_MASK,
            [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.DVALINS_CLAW
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
    { //barbara
        id: 'Barbara',
        enkaId: 10000014,
        rarity: RARITY.EPIC,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: '7-5',
        avatar: 'assets/avatar/Barbara_Profile.webp',
        avatar_icon: 'assets/avatar-icon/barbara.png',
        baseStats: {
            [STATS.HP]: [820.6, 2108.2, 4511.6, 5770.2, 6883.6, 7996.2, 9109.6, 9787.4],
            [STATS.ATK]: [13.4, 34.3, 73.4, 93.9, 112, 130.1, 148.3, 159.3],
            [STATS.DEF]: [56.1, 144.1, 308.3, 394.3, 470.4, 546.5, 622.5, 668.9]
        },
        ascensionStat: STATS.HP_PERCENT,
        ascensionMaterials: {
            [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.VARUNADA_LAZURITE,
            [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.PHILANEMO_MUSHROOM,
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.SAMACHURL,
            [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.CLEANSING_HEART,
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_FREEDOM,
            [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.RING_OF_BOREAS
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
    { //lisa
        id: 'Lisa',
        enkaId: 10000006,
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: '6-9',
        avatar: 'assets/avatar/Lisa_Profile.webp',
        avatar_icon: 'assets/avatar-icon/lisa.png',
        baseStats: {
            [STATS.HP]: [802.4, 2061.3, 4411.3, 5642, 6730.6, 7818.5, 8907.2, 9569.9],
            [STATS.ATK]: [19.4, 49.9, 106.7, 136.5, 162.8, 189.1, 215.5, 231.5],
            [STATS.DEF]: [48.1, 123.5, 264.3, 338, 403.2, 468.4, 533.6, 573.3]
        },
        ascensionStat: STATS.ELEMENTAL_MASTERY,
        ascensionMaterials: {
            [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.VAJRADA_AMETHYST,
            [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.VALBERRY,
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.SLIME_MATERIALS,
            [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.LIGHTNING_PRISM,
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_BALLAD,
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
    { // KAEYA
        id: 'Kaeya',
        enkaId: 10000015,
        rarity: RARITY.EPIC,
        element: VISION.CRYO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: '11-30',
        avatar: 'assets/avatar/Kaeya_Profile.webp',
        avatar_icon: 'assets/avatar-icon/kaeya.png',
        baseStats: {
            [STATS.HP]: [975.6, 2506.4, 5363.8, 6860.1, 8183.8, 9506.6, 10830.3, 11636.2],
            [STATS.ATK]: [18.7, 48, 102.8, 131.5, 156.9, 182.2, 207.6, 223],
            [STATS.DEF]: [66.4, 170.5, 365, 466.8, 556.8, 646.8, 736.9, 791.7]
        },
        ascensionStat: STATS.ENERGY_RECHARGE,
        ascensionMaterials: {
            [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.SHIVADA_JADE,
            [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.CALLA_LILY,
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.TREASURE_HOARDER,
            [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.HOARFROST_CORE,
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_BALLAD,
            [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.SPIRIT_LOCKET_OF_BOREAS
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
    { // amber
        id: 'Amber',
        enkaId: 10000021,
        rarity: RARITY.EPIC,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: '8-10',
        avatar: 'assets/avatar/Amber_Profile.webp',
        avatar_icon: 'assets/avatar-icon/amber.png',
        baseStats: {
            [STATS.HP]: [793.3, 2037.9, 4361.2, 5577.9, 6654.2, 7729.7, 8805.9, 9461.2],
            [STATS.ATK]: [18.7, 48, 102.8, 131.5, 156.9, 182.2, 207.6, 223],
            [STATS.DEF]: [50.4, 129.4, 276.9, 354.1, 422.4, 490.7, 559, 600.6]
        },
        ascensionStat: STATS.ATK_PERCENT,
        ascensionMaterials: {
            [MATERIAL_GROUP.ASCENSION_GEMS]: MATERIAL_GROUP.AGNIDUS_AGATE,
            [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.SMALL_LAMP_GRASS,
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.HILICHURL_SHOOTER,
            [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.EVERFLAME_SEED,
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_FREEDOM,
            [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.DVALINS_SIGH
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
                        values: [0.3612, 0.3906, 0.42, 0.462, 0.4914, 0.525, 0.5712, 0.6174, 0.6636, 0.714]
                    },
                    {
                        name: 'hit_3',
                        values: [0.4644, 0.5022, 0.54, 0.594, 0.6318, 0.675, 0.7344, 0.7938, 0.8532, 0.918]
                    },
                    {
                        name: 'hit_4',
                        values: [0.473, 0.5115, 0.55, 0.605, 0.6435, 0.6875, 0.748, 0.8085, 0.869, 0.935]
                    },
                    {
                        name: 'hit_5',
                        values: [0.5934, 0.6417, 0.69, 0.759, 0.8073, 0.8625, 0.9384, 1.0143, 1.0902, 1.173]
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
                        name: 'inherited_hp',
                        values: [0.4136, 0.4446, 0.4756, 0.517, 0.548, 0.579, 0.6204, 0.6618, 0.7031, 0.7445]
                    },
                    {
                        name: 'explosion_dmg',
                        values: [1.232, 1.3244, 1.4168, 1.54, 1.6324, 1.7248, 1.848, 1.9712, 2.0944, 2.2176]
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
                        name: 'fiery_rain_dmg_per_wave',
                        values: [0.2808, 0.3019, 0.3229, 0.351, 0.3721, 0.3931, 0.4212, 0.4493, 0.4774, 0.5054]
                    },
                    {
                        name: 'total_fiery_rain_dmg',
                        values: [5.0544, 5.4335, 5.8126, 6.318, 6.6971, 7.0762, 7.5816, 8.087, 8.5925, 9.0979]
                    },
                    {
                        name: 'duration',
                        values: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
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
]