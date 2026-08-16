import { RARITY} from "../../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../../shared/config/material_type.js";

export const enemyDropsCommonTreasure = [
    {
        id: 'treasure_hoarder_insignia',
        sid: 'm172',
        icon: 'assets/enemy/common/Treasure_Hoarder_Insignia.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.TREASURE_HOARDER],
        rarity: RARITY.COMMON
    },
    {
        id: 'silver_raven_insignia',
        sid: 'm174',    
        icon: 'assets/enemy/common/Silver_Raven_Insignia.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.TREASURE_HOARDER],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'golden_raven_insignia',
        sid: 'm175',
        icon: 'assets/enemy/common/Golden_Raven_Insignia.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.TREASURE_HOARDER],
        rarity: RARITY.RARE
    }
]