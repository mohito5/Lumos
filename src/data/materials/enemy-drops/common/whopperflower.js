import { RARITY} from "../../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../../shared/config/material_type.js";

export const enemyDropsCommonWhopperflower = [
    {
        id: 'whopperflower_nectar',
        sid: 'm184',
        icon: 'assets/enemy/common/Whopperflower_Nectar.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.WHOPPERFLOWER],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'shimmering_nectar',
        sid: 'm185',
        icon: 'assets/enemy/common/Shimmering_Nectar.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.WHOPPERFLOWER],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'energy_nectar',
        sid: 'm186',
        icon: 'assets/enemy/common/Energy_Nectar.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.WHOPPERFLOWER],
        rarity: RARITY.RARE
    }
,
]