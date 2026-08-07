import { MATERIAL_TIER, MATERIAL_FAMILY, REGION, DAYS, MATERIAL_TYPE, MATERIAL_GROUP, RARITY } from "../../shared/config/constants.js";

export const books = [
    // # книги мондштадта
    // свобода
    {
        id: 'teachings_of_freedom',
        sid: 'm1',
        icon: "assets/book/freedom1.png", 
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_FREEDOM],
        rarity: RARITY.UNCOMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'guide_of_freedom',
        sid: 'm2',
        icon: "assets/book/freedom1.png", 
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_FREEDOM],
        rarity: RARITY.RARE,
        region: REGION.MONDSTADT
    },
    {
        id: 'philosophies_of_freedom',
        sid: 'm3',
        icon: "assets/book/freedom1.png", 
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_FREEDOM],
        rarity: RARITY.EPIC,
        region: REGION.MONDSTADT
    },
    {
        id: 'teachings_of_resistance',
        sid: 'm4',
        icon: "assets/book/resistance1.webp",
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_RESISTANCE],
        rarity: RARITY.UNCOMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'guide_of_resistance',
        sid: '',
        icon: "assets/book/resistance2.webp",
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_RESISTANCE],
        rarity: RARITY.RARE,
        region: REGION.MONDSTADT
    },
    {
        id: 'philosophies_of_resistance',
        sid: '',
        icon: "assets/book/resistance3.webp",
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_RESISTANCE],
        rarity: RARITY.EPIC,
        region: REGION.MONDSTADT
    },
    {
        id: 'teachings_of_ballad',
        sid: 'm5',
        icon: "assets/book/ballad1.webp",
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_BALLAD],
        family: MATERIAL_FAMILY.BALLAD,
        rarity: RARITY.UNCOMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'guide_of_ballad',
        sid: '',
        icon: "assets/book/ballad2.webp",
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_BALLAD],
        family: MATERIAL_FAMILY.BALLAD,
        rarity: RARITY.RARE,
        region: REGION.MONDSTADT
    },
    {
        id: 'philosophies_of_ballad',
        sid: '',
        icon: "assets/book/ballad3.webp",
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_BALLAD],
        family: MATERIAL_FAMILY.BALLAD,
        rarity: RARITY.EPIC,
        region: REGION.MONDSTADT
    },
    {
        id: 'teachings_of_prosperity',
        sid: 'm6',
        icon: "assets/book/prosperity1.png",
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PROSPERITY],
        family: MATERIAL_FAMILY.PROSPERITY,
        region: REGION.LIYUE
    },
    {
        id: 'teachings_of_diligence',
        sid: 'm7',
        icon: "assets/book/diligence1.png",
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        tier: MATERIAL_TIER.BOOK_T1,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_DILIGENCE],
        family: MATERIAL_FAMILY.DILIGENCE,
        region: REGION.LIYUE
    },
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
];
