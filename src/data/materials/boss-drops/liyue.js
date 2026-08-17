import { RARITY, VISION, REGION } from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const bossDropsLiyue = [
    {
        id: 'everflame_seed',
        sid: 'm255',
        icon: 'assets/normal-boss/Everflame_Seed.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.EVERFLAME_SEED],
        rarity: RARITY.EPIC,
        region : REGION.LIYUE
    },
    {
        id: 'cleansing_heart',
        sid: 'm265',
        icon: 'assets/normal-boss/Cleansing_Heart.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.CLEANSING_HEART],
        rarity: RARITY.EPIC,
        region : REGION.LIYUE
    },
    {
            id: 'basalt_pillar',
            sid: 'm221',
            icon: 'assets/normal-boss/Basalt_Pillar.webp',
            type: MATERIAL_TYPE.CHARACTER_ASCENTION,
            group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, 'basalt_pillar'],
            rarity: RARITY.EPIC,
            region : REGION.LIYUE
        }
    ,



    {
        id: 'shadow_of_the_warrior',
        sid: 'm123',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.WEEKLY_BOSS_DROPS, MATERIAL_GROUP.SHADOW_OF_THE_WARRIOR],
        rarity: RARITY.LEGENDARY
    }
,
    {
        id: 'dragon_lords_crown',
        sid: 'm151',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.WEEKLY_BOSS_DROPS, MATERIAL_GROUP.DRAGON_LORDS_CROWN],
        rarity: RARITY.LEGENDARY
    }
,
    {
        id: 'cleansing_heart',
        sid: 'm158',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.CLEANSING_HEART],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'gilded_scale',
        sid: 'm176',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.WEEKLY_BOSS_DROPS, MATERIAL_GROUP.GILDED_SCALE],
        rarity: RARITY.LEGENDARY
    }
,
    {
        id: 'bloodjade_branch',
        sid: 'm220',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.WEEKLY_BOSS_DROPS, MATERIAL_GROUP.BLOODJADE_BRANCH],
        rarity: RARITY.LEGENDARY
    }
,
    {
        id: 'tusk_of_monoceros_caeli',
        sid: 'm246',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.WEEKLY_BOSS_DROPS, MATERIAL_GROUP.TUSK_OF_MONOCEROS_CAELI],
        rarity: RARITY.LEGENDARY
    }
,
    {
        id: 'shard_of_a_foul_legacy',
        sid: 'm259',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.WEEKLY_BOSS_DROPS, MATERIAL_GROUP.SHARD_OF_A_FOUL_LEGACY],
        rarity: RARITY.LEGENDARY
    }
];
