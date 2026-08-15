import { RARITY, VISION } from "../../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../../shared/config/material_type.js";

export const gemsDendro = [
    {
        id: 'nagadus_emerald_sliver',
        sid: 'm124',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.NAGADUS_EMERALD],
        rarity: RARITY.UNCOMMON,
        element: VISION.DENDRO
    },
    {
        id: 'nagadus_emerald_fragment',
        sid: 'm125',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.NAGADUS_EMERALD],
        rarity: RARITY.RARE,
        element: VISION.DENDRO
    },
    {
        id: 'nagadus_emerald_chunk',
        sid: 'm126',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.NAGADUS_EMERALD],
        rarity: RARITY.EPIC,
        element: VISION.DENDRO
    },
    {
        id: 'nagadus_emerald_gemstone',
        sid: 'm127',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.NAGADUS_EMERALD],
        rarity: RARITY.LEGENDARY,
        element: VISION.DENDRO
    }
];
