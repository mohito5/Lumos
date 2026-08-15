import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, MATERIAL_TIER, MATERIAL_FAMILY, REGION, BOSS_DROP_TYPE } from "../../../shared/config/constants.js";

export const booksInazuma = [
{
        id: 'teachings_of_transience',
        sid: 'm9',
        icon: 'assets/book/transience1.png',
        farmDays: ['monday', 'thursday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_TRANSIENCE],
        family: MATERIAL_FAMILY.TRANSIENCE,
        region: REGION.INAZUMA
    },
{
        id: 'teachings_of_elegance',
        sid: 'm10',
        icon: 'assets/book/elegance1.png',
        farmDays: ['tuesday', 'friday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ELEGANCE],
        family: MATERIAL_FAMILY.ELEGANCE,
        region: REGION.INAZUMA
    },
{
        id: 'teachings_of_light',
        sid: 'm11',
        icon: 'assets/book/light1.png',
        farmDays: ['wednesday', 'saturday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_LIGHT],
        family: MATERIAL_FAMILY.LIGHT,
        region: REGION.INAZUMA
    }
,
    {
        id: 'philosophies_of_transience',
        sid: 'm150',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_TRANSIENCE],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_light',
        sid: 'm189',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_LIGHT],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_elegance',
        sid: 'm216',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ELEGANCE],
        rarity: RARITY.EPIC
    }
];
