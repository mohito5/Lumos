import { MATERIAL_TIER, MATERIAL_FAMILY, REGION, DAYS, MATERIAL_TYPE, MATERIAL_GROUP, RARITY } from "../../shared/config/constants.js";

export const books = [
   
    // # Ли Юэ
    {
        id: 'teachings_of_gold',
        sid: 'm8',
        icon: "assets/book/gold1.png",
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_GOLD],
        family: MATERIAL_FAMILY.GOLD,
        region: REGION.LIYUE
    },
    {
        id: 'teachings_of_transience',
        sid: 'm9',
        icon: "assets/book/transience1.png",
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_TRANSIENCE],
        family: MATERIAL_FAMILY.TRANSIENCE,
        region: REGION.INAZUMA
    },
    {
        id: 'teachings_of_elegance',
        sid: 'm10',
        icon: "assets/book/elegance1.png",
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ELEGANCE],
        family: MATERIAL_FAMILY.ELEGANCE,
        region: REGION.INAZUMA
    },
    {
        id: 'teachings_of_light',
        sid: 'm11',
        icon: "assets/book/light1.png",
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_LIGHT],
        family: MATERIAL_FAMILY.LIGHT,
        region: REGION.INAZUMA
    },
    {
        id: 'teachings_of_admonition',
        sid: 'm12',
        icon: "assets/book/admonition1.png",
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ADMONITION],
        family: MATERIAL_FAMILY.ADMONITION,
        region: REGION.SUMERU
    },
    {
        id: 'teachings_of_ingenuity',
        sid: 'm13',
        icon: "assets/book/ingenuity1.png",
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_INGENUITY],
        family: MATERIAL_FAMILY.INGENUITY,
        region: REGION.SUMERU
    },
    {
        id: 'teachings_of_praxis',
        sid: 'm14',
        icon: "assets/book/praxis1.png",
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PRAXIS],
        family: MATERIAL_FAMILY.PRAXIS,
        region: REGION.SUMERU
    },
    {
        id: 'teachings_of_equity',
        sid: 'm15',
        icon: "assets/book/equity1.png",
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_EQUITY],
        family: MATERIAL_FAMILY.EQUITY,
        region: REGION.FONTAINE
    },
    {
        id: 'teachings_of_justice',
        sid: 'm16',
        icon: "assets/book/justice1.png",
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_JUSTICE],
        family: MATERIAL_FAMILY.JUSTICE,
        region: REGION.FONTAINE
    },
    {
        id: 'teachings_of_order',
        sid: 'm17',
        icon: "assets/book/order1.png",
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ORDER],
        family: MATERIAL_FAMILY.ORDER,
        region: REGION.FONTAINE
    },
    {
        id: 'teachings_of_conflict',
        sid: 'm110',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_conflict'],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'philosophies_of_conflict',
        sid: 'm111',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_conflict'],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_light',
        sid: 'm137',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_LIGHT],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_transience',
        sid: 'm140',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_TRANSIENCE],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_admonition',
        sid: 'm147',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ADMONITION],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'teachings_of_vagrancy',
        sid: 'm153',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_vagrancy'],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'philosophies_of_vagrancy',
        sid: 'm154',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_vagrancy'],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_gold',
        sid: 'm176',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_GOLD],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_elegance',
        sid: 'm179',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ELEGANCE],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_ingenuity',
        sid: 'm184',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_INGENUITY],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'teachings_of_moonlight',
        sid: 'm195',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_moonlight'],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'philosophies_of_moonlight',
        sid: 'm196',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_moonlight'],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_praxis',
        sid: 'm205',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PRAXIS],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'teachings_of_contention',
        sid: 'm250',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_contention'],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'philosophies_of_contention',
        sid: 'm251',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_contention'],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_order',
        sid: 'm270',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_ORDER],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'teachings_of_elysium',
        sid: 'm274',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_elysium'],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'philosophies_of_elysium',
        sid: 'm275',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_elysium'],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'teachings_of_kindling',
        sid: 'm291',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_kindling'],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'philosophies_of_kindling',
        sid: 'm292',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, 'books_of_kindling'],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_equity',
        sid: 'm298',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_EQUITY],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'philosophies_of_justice',
        sid: 'm309',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_JUSTICE],
        rarity: RARITY.EPIC
    }
];
