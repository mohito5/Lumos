import { VISION, RARITY } from "../../../shared/config/constants.js";
import {MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";


export const vajrada = [
    // ## камни электро
    {
        id: 'vajrada_amethyst_sliver',
        sid: 'm35',
        icon: "assets/tmp256.png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, MATERIAL_GROUP.VAJRADA_AMETHYST],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'vajrada_amethyst_fragment',
        sid: 'm37',
        icon: "assets/tmp256 (1).png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, MATERIAL_GROUP.VAJRADA_AMETHYST],
        rarity: RARITY.RARE
    },
    {
        id: 'vajrada_amethyst_chunk',
        sid: 'm39',
        icon: "assets/tmp256 (2).png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, MATERIAL_GROUP.VAJRADA_AMETHYST],
        rarity: RARITY.EPIC
    },
    {
        id: 'vajrada_amethyst_gemstone',
        sid: 'm41',
        icon: "assets/tmp256 (3).png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, MATERIAL_GROUP.VAJRADA_AMETHYST],
        rarity: RARITY.LEGENDARY
    }
]