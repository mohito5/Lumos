import { BOSS_DROP_TYPE, MATERIAL_TIER, MATERIAL_TYPE, MATERIAL_GROUP, RARITY } from '../../app/constants';

export const bossDrops = [
    {
        id: 'ascended_sample_queen',
        sid: 'm18',
        icon: "assets/1.webp",
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.WEEKLY_BOSS_DROPS, MATERIAL_GROUP.ASCENDED_SAMPLE_QUEEN],
        rarity: RARITY.LEGENDARY,
    },
    {
        id: 'kuuvyaka_stamp_mold',
        sid: 'm19',
        icon: "assets/SHtampovochnaya-forma-kuuvyaki.webp",
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.NORMAL_BOSS_DROPS, MATERIAL_GROUP.PRISMATIC_SEVERED_TAIL],
        rarity: RARITY.EPIC,
    },
    {
        id: 'drugkrumkake',
        sid: 'm20',
        icon: "assets/drugkrumkake.png",
        type: BOSS_DROP_TYPE.REGULAR,
        group: MATERIAL_GROUP.NORMAL_BOSS_DROPS,
        tier: MATERIAL_TIER.BOSS_MATERIAL
    }
];