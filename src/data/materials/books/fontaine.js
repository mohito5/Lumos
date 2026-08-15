import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, MATERIAL_TIER, MATERIAL_FAMILY, REGION, BOSS_DROP_TYPE } from "../../../shared/config/constants.js";

export const booksFontaine = [
{
        id: 'teachings_of_equity',
        sid: 'm15',
        icon: 'assets/book/equity1.png',
        farmDays: ['monday', 'thursday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_EQUITY],
        family: MATERIAL_FAMILY.EQUITY,
        region: REGION.FONTAINE
    },
{
        id: 'teachings_of_justice',
        sid: 'm16',
        icon: 'assets/book/justice1.png',
        farmDays: ['tuesday', 'friday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_JUSTICE],
        family: MATERIAL_FAMILY.JUSTICE,
        region: REGION.FONTAINE
    },
{
        id: 'teachings_of_order',
        sid: 'm17',
        icon: 'assets/book/order1.png',
        farmDays: ['wednesday', 'saturday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ORDER],
        family: MATERIAL_FAMILY.ORDER,
        region: REGION.FONTAINE
    }
];
