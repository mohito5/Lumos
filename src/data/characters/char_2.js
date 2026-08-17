import { RARITY, VISION, WEAPON_TYPE } from "../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../shared/config/material_type.js";
import { STATS } from "../../shared/config/stats.js";

//  [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.VAYUDA_TURQUOISE,
//  [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.WOLFHOOK,
//  [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.PRISMATIC_SEVERED_TAIL,
//  [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_FREEDOM,
//  [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.SLIME_MATERIALS,
//  [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.ASCENDED_SAMPLE_QUEEN

export const char_2 = [
    {
        id: 'Fischl',
        enkaId: 10000031,
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.BOW,
        birthday: '5-27',
        avatar: 'assets/avatar/Fischl_Profile.webp',
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
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.HILICHURL_SHOOTER,
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
    {//Ningguang
        id: 'Ningguang',
        enkaId: 10000027,
        rarity: RARITY.EPIC,
        element: VISION.GEO,
        weapon: WEAPON_TYPE.CATALYST,
        birthday: '8-26',
        avatar: 'assets/avatar/Ningguang_Profile.webp',
        avatar_icon: 'assets/avatar-icon/ningguang.png',
        baseStats: {
            [STATS.HP]: [820.6, 2108.2, 4511.6, 5770.2, 6883.6, 7996.2, 9109.6, 9787.4],
            [STATS.ATK]: [17.8, 45.7, 97.9, 125.2, 149.4, 173.5, 197.7, 212.4],
            [STATS.DEF]: [48.1, 123.5, 264.3, 338, 403.2, 468.4, 533.6, 573.3]
        },
        ascensionStat: STATS.GEO_DMG,
        ascensionMaterials: {
            normal_boss_drops: 'basalt_pillar',
            
           
            [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.PRITHIVA_TOPAZ,
            [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.GLAZE_LILY,
//  [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.PRISMATIC_SEVERED_TAIL,
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_PROSPERITY,
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.FATUI_SKIRMISHER,
            [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.SPIRIT_LOCKET_OF_BOREAS
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
    { //Xingqiu
        id: 'Xingqiu',
        enkaId: 10000025,
        rarity: RARITY.EPIC,
        element: VISION.HYDRO,
        weapon: WEAPON_TYPE.SWORD,
        birthday: '10-9',
        avatar: 'assets/avatar/Xingqiu_Profile.webp',
        avatar_icon: 'assets/avatar-icon/xingqiu.png',
        baseStats: {
            [STATS.HP]: [857.1, 2201.8, 4712.1, 6026.7, 7189.5, 8351.6, 9514.5, 10222.4],
            [STATS.ATK]: [16.9, 43.5, 93, 119, 141.9, 164.8, 187.8, 201.8],
            [STATS.DEF]: [63.5, 163.2, 349.2, 446.6, 532.8, 618.9, 705.1, 757.6]
        },
        ascensionStat: STATS.ATK_PERCENT,
        ascensionMaterials: {
            [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.VARUNADA_LAZURITE,
            [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.SILK_FLOWER,
            [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.CLEANSING_HEART,
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_GOLD,
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.DAMAGED_MASK,
            [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.TAIL_OF_BOREAS
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
    { //Beidou
        id: 'Beidou',
        enkaId: 10000024,
        rarity: RARITY.EPIC,
        element: VISION.ELECTRO,
        weapon: WEAPON_TYPE.CLAYMORE,
        birthday: '2-14',
        avatar: 'assets/avatar/Beidou_Profile.webp',
        avatar_icon: 'assets/avatar-icon/beidou.png',
        baseStats: {
            [STATS.HP]: [1094.1, 2810.9, 6015.5, 7693.6, 9178.1, 10661.6, 12146.1, 13049.9],
            [STATS.ATK]: [18.9, 48.5, 103.8, 132.7, 158.3, 183.9, 209.5, 225.1],
            [STATS.DEF]: [54.4, 139.7, 298.9, 382.3, 456, 529.7, 603.5, 648.4]
        },
        ascensionStat: STATS.ELECTRO_DMG,
        ascensionMaterials: {
            [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.VAJRADA_AMETHYST,
            [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.NOCTILUCOUS_JADE,
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.TREASURE_HOARDER,
            [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.LIGHTNING_PRISM,
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_GOLD,
            [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.DVALINS_SIGH
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
    { //Xiangling
        id: 'Xiangling',
        enkaId: 10000023,
        rarity: RARITY.EPIC,
        element: VISION.PYRO,
        weapon: WEAPON_TYPE.POLEARM,
        birthday: '11-2',
        avatar: 'assets/avatar/Xiangling_Profile.webp',
        avatar_icon: 'assets/avatar-icon/xiangling.png',
        baseStats: {
            [STATS.HP]: [911.8, 2342.4, 5012.9, 6411.3, 7648.5, 8884.7, 10121.8, 10874.9],
            [STATS.ATK]: [18.9, 48.5, 103.8, 132.7, 158.3, 183.9, 209.5, 225.1],
            [STATS.DEF]: [56.1, 144.1, 308.3, 394.3, 470.4, 546.5, 622.5, 668.9]
        },
        ascensionStat: STATS.ELEMENTAL_MASTERY,
        ascensionMaterials: {
            [MATERIAL_GROUP.ASCENSION_GEMS] : MATERIAL_GROUP.AGNIDUS_AGATE,
            [MATERIAL_GROUP.LOCAL_SPECIALTIES]: MATERIAL_GROUP.JUEYUN_CHILI,
            [MATERIAL_GROUP.COMMON_ENEMY_DROPS] : MATERIAL_GROUP.SLIME_MATERIALS,
            [MATERIAL_GROUP.NORMAL_BOSS_DROPS]: MATERIAL_GROUP.EVERFLAME_SEED,
            talent_books: 'books_of_diligence',
            [MATERIAL_GROUP.WEEKLY_BOSS_DROPS] : MATERIAL_GROUP.DVALINS_CLAW
    },
    talents: {
        attack: {
            icon: '',
            stats: [
                {
                    name: 'hit_1',
                    values: [0.4205, 0.4548, 0.489, 0.5379, 0.5721, 0.6113, 0.665, 0.7188, 0.7726, 0.8313]
                },
                {
                    name: 'hit_2',
                    values: [0.4214, 0.4557, 0.49, 0.539, 0.5733, 0.6125, 0.6664, 0.7203, 0.7742, 0.833]
                },
                {
                    name: 'hit_3',
                    values: [0.2606, 0.2818, 0.303, 0.3333, 0.3545, 0.3787, 0.4121, 0.4454, 0.4787, 0.5151]
                },
                {
                    name: 'hit_4',
                    values: [0.141, 0.1525, 0.164, 0.1804, 0.1919, 0.205, 0.223, 0.2411, 0.2591, 0.2788]
                },
                {
                    name: 'hit_5',
                    values: [0.7104, 0.7682, 0.826, 0.9086, 0.9664, 1.0325, 1.1234, 1.2142, 1.3051, 1.4042]
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
                    name: 'flame_dmg',
                    values: [1.1128, 1.1963, 1.2797, 1.391, 1.4745, 1.5579, 1.6692, 1.7805, 1.8918, 2.003]
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
                    name: '1_hit_swing_dmg',
                    values: [0.72, 0.774, 0.828, 0.9, 0.954, 1.008, 1.08, 1.152, 1.224, 1.296]
                },
                {
                    name: '2_hit_swing_dmg',
                    values: [0.88, 0.946, 1.012, 1.1, 1.166, 1.232, 1.32, 1.408, 1.496, 1.584]
                },
                {
                    name: '3_hit_swing_dmg',
                    values: [1.096, 1.1782, 1.2604, 1.37, 1.4522, 1.5344, 1.644, 1.7536, 1.8632, 1.9728]
                },
                {
                    name: 'pyronado_dmg',
                    values: [1.12, 1.204, 1.288, 1.4, 1.484, 1.568, 1.68, 1.792, 1.904, 2.016]
                },
                {
                    name: 'duration',
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
]