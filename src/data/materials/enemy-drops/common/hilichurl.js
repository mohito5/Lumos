import { RARITY} from "../../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../../shared/config/material_type.js";

export const enemyDropsCommonHilichurl = [
    { //mask 
        id: 'damaged_mask',
        sid: 'm157',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DAMAGED_MASK],
        rarity: RARITY.COMMON
    },
    {
        id: 'stained_mask',
        sid: 'm159',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DAMAGED_MASK],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'ominous_mask',
        sid: 'm160',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DAMAGED_MASK],
        rarity: RARITY.RARE
    },
    { // arrowhead
        id: 'firm_arrowhead',
        sid: 'm210',
        icon: 'assets/enemy/common/Firm_Arrowhead.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HILICHURL_SHOOTER],
        rarity: RARITY.COMMON
    },
    {
        id: 'sharp_arrowhead',
        sid: 'm211',
        icon: 'assets/enemy/common/Item_Sharp_Arrowhead.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HILICHURL_SHOOTER],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'weathered_arrowhead',
        sid: 'm212',
        icon: 'assets/enemy/common/Weathered_Arrowhead.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HILICHURL_SHOOTER],
        rarity: RARITY.RARE
    },
]