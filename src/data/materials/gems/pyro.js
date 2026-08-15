import { RARITY, VISION } from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const gemsPyro = [
    {
        id: 'agnidus_agate_sliver',
        sid: 'm141',
        icon: 'assets/gems/pyro/Agnidus_Sliver.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.AGNIDUS_AGATE],
        rarity: RARITY.UNCOMMON,
        element: VISION.PYRO
    },
    {
        id: 'agnidus_agate_fragment',
        sid: 'm142',
        icon: 'assets/gems/pyro/Agnidus_Fragment.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.AGNIDUS_AGATE],
        rarity: RARITY.RARE,
        element: VISION.PYRO
    },
    {
        id: 'agnidus_agate_chunk',
        sid: 'm143',
        icon: 'assets/gems/pyro/Agnidus_Chunk.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.AGNIDUS_AGATE],
        rarity: RARITY.EPIC,
        element: VISION.PYRO
    },
    {
        id: 'agnidus_agate_gemstone',
        sid: 'm144',
        icon: 'assets/gems/pyro/Agnidus_Gemstone.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.AGNIDUS_AGATE],
        rarity: RARITY.LEGENDARY,
        element: VISION.PYRO
    }
];
