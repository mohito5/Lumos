import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, MATERIAL_TIER, MATERIAL_FAMILY, REGION, BOSS_DROP_TYPE } from "../../../shared/config/constants.js";

export const booksSumeru = [
{
        id: 'teachings_of_admonition',
        sid: 'm12',
        icon: 'assets/book/admonition1.png',
        farmDays: ['monday', 'thursday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ADMONITION],
        family: MATERIAL_FAMILY.ADMONITION,
        region: REGION.SUMERU
    },
{
        id: 'teachings_of_ingenuity',
        sid: 'm13',
        icon: 'assets/book/ingenuity1.png',
        farmDays: ['tuesday', 'friday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_INGENUITY],
        family: MATERIAL_FAMILY.INGENUITY,
        region: REGION.SUMERU
    },
{
        id: 'teachings_of_praxis',
        sid: 'm14',
        icon: 'assets/book/praxis1.png',
        farmDays: ['wednesday', 'saturday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PRAXIS],
        family: MATERIAL_FAMILY.PRAXIS,
        region: REGION.SUMERU
    }
,
    {
        id: 'philosophies_of_ingenuity',
        sid: 'm133',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_INGENUITY],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_admonition',
        sid: 'm195',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ADMONITION],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_praxis',
        sid: 'm232',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PRAXIS],
        rarity: RARITY.EPIC
    }
];
