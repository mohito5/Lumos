import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, MATERIAL_TIER, MATERIAL_FAMILY, REGION, BOSS_DROP_TYPE } from "../../../shared/config/constants.js";

export const bossDropsInazuma = [
{
        id: 'ascended_sample_queen',
        sid: 'm18',
        icon: 'assets/1.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.WEEKLY_BOSS_DROPS, MATERIAL_GROUP.ASCENDED_SAMPLE_QUEEN],
        rarity: RARITY.LEGENDARY
    }
,
    {
        id: 'marionette_core',
        sid: 'm173',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.MARIONETTE_CORE],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'storm_beads',
        sid: 'm198',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.STORM_BEADS],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'riftborn_regalia',
        sid: 'm247',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.RIFTBORN_REGALIA],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'perpetual_heart',
        sid: 'm253',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.PERPETUAL_HEART],
        rarity: RARITY.EPIC
    }
];
