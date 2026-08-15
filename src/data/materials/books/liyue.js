import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, MATERIAL_TIER, MATERIAL_FAMILY, REGION, BOSS_DROP_TYPE } from "../../../shared/config/constants.js";

export const booksLiyue = [
{
        id: 'teachings_of_prosperity',
        sid: 'm6',
        icon: 'assets/book/prosperity1.png',
        farmDays: ['monday', 'thursday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PROSPERITY],
        family: MATERIAL_FAMILY.PROSPERITY,
        region: REGION.LIYUE
    },
{
        id: 'teachings_of_diligence',
        sid: 'm7',
        icon: 'assets/book/diligence1.png',
        farmDays: ['tuesday', 'friday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_DILIGENCE],
        family: MATERIAL_FAMILY.DILIGENCE,
        region: REGION.LIYUE
    },
{
        id: 'teachings_of_gold',
        sid: 'm8',
        icon: 'assets/book/gold1.png',
        farmDays: ['wednesday', 'saturday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_GOLD],
        family: MATERIAL_FAMILY.GOLD,
        region: REGION.LIYUE
    }
,
    {
        id: 'philosophies_of_diligence',
        sid: 'm122',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_DILIGENCE],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_gold',
        sid: 'm161',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_GOLD],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_prosperity',
        sid: 'm182',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PROSPERITY],
        rarity: RARITY.EPIC
    }
];
