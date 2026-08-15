import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, REGION } from "../../../shared/config/constants.js";

export const localSpecialtyOther = [

    {
        id: 'moonfall_silver',
        sid: 'm221',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, MATERIAL_GROUP.MOONFALL_SILVER],
        rarity: RARITY.COMMON
    },
    {
        id: 'frostlamp_flower',
        sid: 'm43',
        localization: {
            en: {
                name: 'Frostlamp Flower'
            },
            ru: {
                name: 'Морозно-лампаданый цветок'
            }
        },
        icon: 'assets/localSpecial/frostlampFlower.webp',
        tier: MATERIAL_TYPE.LOCAL_SPECIALTY
    },
    {
        id: 'winter_icelea',
        sid: 'm331',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, MATERIAL_GROUP.WINTER_ICELEA],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'pine_amber',
        sid: 'm339',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, MATERIAL_GROUP.PINE_AMBER],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'portable_bearing',
        sid: 'm342',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, MATERIAL_GROUP.PORTABLE_BEARING],
        rarity: RARITY.COMMON
    }
];
