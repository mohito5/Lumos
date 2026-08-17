import { RARITY} from "../../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../../shared/config/material_type.js";

export const enemyDropsCommonFatui = [
    {
        id: 'recruits_insignia',
        sid: 'm249',
        icon: 'assets/enemy/common/Recruits_Insignia.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FATUI_SKIRMISHER],
        rarity: RARITY.COMMON
        },
    {
        id: 'sergeants_insignia',
        sid: 'm250',
        icon: 'assets/enemy/common/Sergeants_Insignia.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FATUI_SKIRMISHER],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'lieutenants_insignia',
        sid: 'm251',
        icon: 'assets/enemy/common/Lieutenants_Insignia.webp',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FATUI_SKIRMISHER],
        rarity: RARITY.RARE
    }
    ,
]