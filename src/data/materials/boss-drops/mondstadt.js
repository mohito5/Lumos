import { RARITY, VISION, REGION } from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const bossDropsMondstadt = [
    {
        id: 'hoarfrost_core',
        sid: 'm235',
        icon: 'assets/normal-boss/Hoarfrost_Core.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.HOARFROST_CORE],
        rarity: RARITY.EPIC
    },
    {
        id: 'lightning_prism',
        sid: 'm163',
        icon: 'assets/normal-boss/Lightning_Prism.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.LIGHTNING_PRISM],
        rarity: RARITY.EPIC
    },
    {
            id: 'hurricane_seed',
            sid: 'm178',
            icon: 'assets/normal-boss/Hurricane_Seed.webp',
            type: MATERIAL_TYPE.CHARACTER_ASCENTION,
            group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.HURRICANE_SEED],
            rarity: RARITY.EPIC
        }
    ,


    
];
