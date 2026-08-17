import { RARITY, VISION, DAYS, REGION} from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const booksLiyue = [
    {
        id: 'teachings_of_prosperity',
        sid: 'm6',
        icon: 'assets/book/prosperity1.webp',
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PROSPERITY],
        rarity: RARITY.UNCOMMON,
        region: REGION.LIYUE
    },
    {
        id: 'guide_to_prosperity',
        sid: 'm373',
        icon: 'assets/book/prosperity2.webp',
        farmDays: [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PROSPERITY],
        rarity: RARITY.RARE,
        region: REGION.LIYUE
    },
    {
        id: 'philosophies_of_prosperity',
        sid: 'm182',
        icon: 'assets/book/prosperity3.webp',
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_PROSPERITY],
        rarity: RARITY.EPIC,
        region: REGION.LIYUE
    },

    {
        id: 'teachings_of_diligence',
        sid: 'm7',
        icon: 'assets/book/diligence1.webp',
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_DILIGENCE],
        rarity: RARITY.UNCOMMON,
        region: REGION.LIYUE
    },
    {
        id: 'guide_to_diligence',
        sid: 'm374',
        icon: 'assets/book/diligence2.webp',
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_DILIGENCE],
        rarity: RARITY.RARE,
        region: REGION.LIYUE
    },
    {
        id: 'philosophies_of_diligence',
        sid: 'm122',
        icon: 'assets/book/diligence3.webp',
        farmDays: [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_DILIGENCE],
        rarity: RARITY.EPIC,
        region: REGION.LIYUE
    },
{
        id: 'teachings_of_gold',
        sid: 'm8',
        icon: 'assets/book/gold1.png',
        farmDays: ['wednesday', 'saturday', 'sunday'],
        type: MATERIAL_TYPE.CHARACTER_TALENT,
      
        group: [MATERIAL_GROUP.TALENT_BOOKS, MATERIAL_GROUP.BOOKS_GOLD],
        
        region: REGION.LIYUE
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
];
