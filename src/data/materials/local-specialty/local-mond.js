import { RARITY, REGION } from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";
export const localSpecialtyMond = [
    {
        id: 'wolfhook',
        sid: 'm44',
        icon: "assets/local-spec/wolfhook.png",
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, MATERIAL_GROUP.WOLFHOOK],
        rarity : RARITY.COMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'cecilia',
        sid: 'm120',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, MATERIAL_GROUP.CECILIA],
        rarity: RARITY.COMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'windwheel_aster',
        sid: 'm131',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'windwheel_aster'],
        rarity: RARITY.COMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'dandelion_seed',
        sid: 'm123',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'dandelion_seed'],
        rarity: RARITY.COMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'small_lamp_grass',
        sid: 'm171',
        icon: 'assets/local-spec/Small_Lamp_Grass.webp',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, MATERIAL_GROUP.SMALL_LAMP_GRASS],
        rarity: RARITY.COMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'valberry',
        sid: 'm182',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'valberry'],
        rarity: RARITY.COMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'calla_lily',
        sid: 'm240',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'calla_lily'],
        rarity: RARITY.COMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'philanemo_mushroom',
        sid: 'm254',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'philanemo_mushroom'],
        rarity: RARITY.COMMON,
        region: REGION.MONDSTADT
    },
    {
        id: 'etherwing_moth',
        sid: 'm308',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'etherwing_moth'],
        rarity: RARITY.COMMON,
        region: REGION.MONDSTADT
    }
]