import { RARITY, VISION } from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const gemsCryo = [
    {
        id: 'shivada_jade_sliver',
        sid: 'm113',
        icon: 'assets/gems/cryo/Shivada_Sliver.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.SHIVADA_JADE],
        rarity: RARITY.UNCOMMON,
        element: VISION.CRYO
    },
    {
        id: 'shivada_jade_fragment',
        sid: 'm114',
        icon: 'assets/gems/cryo/Shivada_Fragment.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.SHIVADA_JADE],
        rarity: RARITY.RARE,
        element: VISION.CRYO
    },
    {
        id: 'shivada_jade_chunk',
        sid: 'm115',
        icon: 'assets/gems/cryo/Shivada_Chunk.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.SHIVADA_JADE],
        rarity: RARITY.EPIC,
        element: VISION.CRYO
    }
,
    {
        id: 'shivada_jade_gemstone',
        sid: 'm116',
        icon: 'assets/gems/cryo/Shivada_Gemstone.webp',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.SHIVADA_JADE],
        rarity: RARITY.LEGENDARY,
        element: VISION.CRYO
    }
];
