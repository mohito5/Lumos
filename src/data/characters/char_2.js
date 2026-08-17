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