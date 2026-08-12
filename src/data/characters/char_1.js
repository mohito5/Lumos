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
    { // KAEYA
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
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_BALLAD,
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
            normal_boss_drops: 'everflame_seed',
            [MATERIAL_GROUP.TALENT_BOOKS]:MATERIAL_GROUP.BOOKS_FREEDOM,
            weekly_boss_drops: 'dvalins_sigh',
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