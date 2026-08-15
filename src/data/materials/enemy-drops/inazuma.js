import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, REGION } from "../../../shared/config/constants.js";

export const enemyDropsInazuma = [

    {
        id: 'old_handguard',
        sid: 'm197',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.OLD_HANDGUARD],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'kageuchi_handguard',
        sid: 'm199',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.OLD_HANDGUARD],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'famed_handguard',
        sid: 'm200',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.OLD_HANDGUARD],
        rarity: RARITY.RARE
    }
];
