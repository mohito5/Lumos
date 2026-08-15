import { RARITY, VISION, DAYS, REGION} from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const booksMondstadt = [
    {
        id: 'teachings_of_freedom',
        sid: 'm1',
        icon: 'assets/book/freedom1.png',
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_FREEDOM],
        rarity: RARITY.UNCOMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'guide_of_freedom',
        sid: 'm2',
        icon: 'assets/book/freedom1.png',
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_FREEDOM],
        rarity: RARITY.RARE,
        region: REGION.MONDSTADT
    },
    {
        id: 'philosophies_of_freedom',
        sid: 'm3',
        icon: 'assets/book/freedom1.png',
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_FREEDOM],
        rarity: RARITY.EPIC,
        region: REGION.MONDSTADT
    },

    {
        id: 'teachings_of_resistance',
        sid: 'm4',
        icon: 'assets/book/resistance1.webp',
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_RESISTANCE],
        rarity: RARITY.UNCOMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'guide_of_resistance',
        sid: '',
        icon: 'assets/book/resistance2.webp',
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_RESISTANCE],
        rarity: RARITY.RARE,
        region: REGION.MONDSTADT
    },
    {
        id: 'philosophies_of_resistance',
        sid: '',
        icon: 'assets/book/resistance3.webp',
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_RESISTANCE],
        rarity: RARITY.EPIC,
        region: REGION.MONDSTADT
    },

    {
        id: 'teachings_of_ballad',
        sid: 'm5',
        icon: 'assets/book/ballad1.webp',
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_BALLAD],
        rarity: RARITY.UNCOMMON,
        region: REGION.MONDSTADT
    },

    {
        id: 'guide_of_ballad',
        sid: '',
        icon: 'assets/book/ballad2.webp',
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_BALLAD],
        rarity: RARITY.RARE,
        region: REGION.MONDSTADT
    },
    {
        id: 'philosophies_of_ballad',
        sid: '',
        icon: 'assets/book/ballad3.webp',
        farmDays: [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_BALLAD],
        rarity: RARITY.EPIC,
        region: REGION.MONDSTADT
    }
];
