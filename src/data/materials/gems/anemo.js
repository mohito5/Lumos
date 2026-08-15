import { RARITY, VISION } from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const gemsAnemo = [
    {
        id: 'vayuda_turquoise_sliver',
        sid: 'm36',
        icon: 'assets/gems/anemo/sl-anemo.png',
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'vayuda_turquoise_fragment',
        sid: 'm38',
        icon: 'assets/gems/anemo/fr-anemo.png',
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.RARE
    },
    {
        id: 'vayuda_turquoise_chunk',
        sid: 'm40',
        icon: 'assets/gems/anemo/ch-anemo.png',
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.EPIC
    },
    {
        id: 'vayuda_turquoise_gemstone',
        sid: 'm42',
        icon: 'assets/gems/anemo/ge-anemo.png',
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.LEGENDARY
    }
];
