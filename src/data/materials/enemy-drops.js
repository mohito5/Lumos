import { MATERIAL_TIER, MATERIAL_TYPE, MATERIAL_GROUP, RARITY } from '../../app/constants';

export const enemyDrops = [
    {
        id: 'slime-condensate',
        sid: 'm29',
        icon: "assets/Slime_Condensate.webp",
        tier: MATERIAL_TIER.ENEMY_MAT_1_T1,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SLIME_MATERIALS],
        rarity: RARITY.COMMON
    },
    {
        id: 'slime-secretions',
        sid: 'm30',
        icon: "assets/Slime_Secretions.webp",
        tier: MATERIAL_TIER.ENEMY_MAT_1_T2,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SLIME_MATERIALS],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'slime-concentrate',
        sid: 'm31',
        icon: "assets/Slime_Concentrate.webp",
        tier: MATERIAL_TIER.ENEMY_MAT_1_T3,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SLIME_MATERIALS],
        rarity: RARITY.RARE
    },
];
