import { RARITY, VISION } from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const gemsGeo = [
    {
        id: 'prithiva_topaz_sliver',
        sid: 'm236',
        icon: 'assets/gems/geo/Prithiva_Sliver.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.PRITHIVA_TOPAZ],
        rarity: RARITY.UNCOMMON,
        element: VISION.GEO
    },
    {
        id: 'prithiva_topaz_fragment',
        sid: 'm237',
        icon: 'assets/gems/geo/Prithiva_Fragment.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.PRITHIVA_TOPAZ],
        rarity: RARITY.RARE,
        element: VISION.GEO
    },
    {
        id: 'prithiva_topaz_chunk',
        sid: 'm238',
        icon: 'assets/gems/geo/Prithiva_Chunk.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.PRITHIVA_TOPAZ],
        rarity: RARITY.EPIC,
        element: VISION.GEO
    },
    {
        id: 'prithiva_topaz_gemstone',
        sid: 'm239',
        icon: 'assets/gems/geo/Prithiva_Gemstone.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.PRITHIVA_TOPAZ],
        rarity: RARITY.LEGENDARY,
        element: VISION.GEO
    }
];
