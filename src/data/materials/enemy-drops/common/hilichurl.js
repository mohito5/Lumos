import { RARITY} from "../../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../../shared/config/material_type.js";

export const enemyDropsCommonHilichurl = [
    { //mask 
        id: 'damaged_mask',
        sid: 'm157',
        icon: 'assets/enemy/common/Damaged_Mask.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DAMAGED_MASK],
        rarity: RARITY.COMMON
    },
    {
        id: 'stained_mask',
        sid: 'm159',
        icon: 'assets/enemy/common/Stained_Mask.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DAMAGED_MASK],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'ominous_mask',
        sid: 'm160',
        icon: 'assets/enemy/common/Ominous_Mask.webp',
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
    {
        id: 'divining_scroll',
        sid: 'm146',
        icon: 'assets/enemy/common/Divining_Scroll.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SAMACHURL],
        rarity: RARITY.COMMON
    },
    {
        id: 'sealed_scroll',
        sid: 'm148',
        icon: 'assets/enemy/common/Sealed_Scroll.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SAMACHURL],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'forbidden_curse_scroll',
        sid: 'm149',
        icon: 'assets/enemy/common/Forbidden_Curse_Scroll.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SAMACHURL],
        rarity: RARITY.RARE
    },
]