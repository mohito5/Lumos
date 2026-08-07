import { MATERIAL_TIER, VISION, MATERIAL_TYPE, MATERIAL_GROUP, RARITY } from "../../shared/config/constants.js";

export const gems = [
    {
        id: 'vajrada_amethyst_sliver',
        sid: 'm35',
        icon: "assets/tmp256.png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, VISION.ELECTRO],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'vayuda_turquoise_sliver',
        sid: 'm36',
        icon: "assets/gems/anemo/sl-anemo.png",
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'vajrada_amethyst_fragment',
        sid: 'm37',
        icon: "assets/tmp256 (1).png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, VISION.ELECTRO],
        rarity: RARITY.RARE
    },
    {
        id: 'vayuda_turquoise_fragment',
        sid: 'm38',
        icon: "assets/gems/anemo/fr-anemo.png",
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.RARE
    },
    {
        id: 'vajrada_amethyst_chunk',
        sid: 'm39',
        icon: "assets/tmp256 (2).png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, VISION.ELECTRO],
        rarity: RARITY.EPIC
    },
    {
        id: 'vayuda_turquoise_chunk',
        sid: 'm40',
        icon: "assets/gems/anemo/ch-anemo.png",
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.EPIC
    },
    {
        id: 'vajrada_amethyst_gemstone',
        sid: 'm41',
        icon: "assets/tmp256 (3).png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, VISION.ELECTRO],
        rarity: RARITY.LEGENDARY
    },
    {
        id: 'vayuda_turquoise_gemstone',
        sid: 'm42',
        icon: "assets/gems/anemo/ge-anemo.png",
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.LEGENDARY
    }
];