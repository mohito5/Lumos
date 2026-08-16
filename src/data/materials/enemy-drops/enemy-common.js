import { RARITY } from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const enemyCommon = [
    {
        id: 'slime-condensate',
        sid: 'm29',
        icon: "assets/Slime_Condensate.webp",
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SLIME_MATERIALS],
        rarity: RARITY.COMMON
    },
    {
        id: 'slime-secretions',
        sid: 'm30',
        icon: "assets/Slime_Secretions.webp",
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SLIME_MATERIALS],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'slime-concentrate',
        sid: 'm31',
        icon: "assets/Slime_Concentrate.webp",
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SLIME_MATERIALS],
        rarity: RARITY.RARE
    },
    
    

]