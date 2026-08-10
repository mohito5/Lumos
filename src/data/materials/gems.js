import { MATERIAL_TIER, VISION, MATERIAL_TYPE, MATERIAL_GROUP, RARITY } from "../../shared/config/constants.js";

export const gems = [
    // ## камни электро
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
        id: 'vajrada_amethyst_fragment',
        sid: 'm37',
        icon: "assets/tmp256 (1).png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, VISION.ELECTRO],
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
        id: 'vajrada_amethyst_gemstone',
        sid: 'm41',
        icon: "assets/tmp256 (3).png",
        element: VISION.ELECTRO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ASCENSION_GEMS, VISION.ELECTRO],
        rarity: RARITY.LEGENDARY
    },
    // # камни анемо
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
        id: 'vayuda_turquoise_fragment',
        sid: 'm38',
        icon: "assets/gems/anemo/fr-anemo.png",
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.RARE
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
        id: 'vayuda_turquoise_gemstone',
        sid: 'm42',
        icon: "assets/gems/anemo/ge-anemo.png",
        element: VISION.ANEMO,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, MATERIAL_GROUP.VAYUDA_TURQUOISE],
        rarity: RARITY.LEGENDARY
    },
    {
        id: 'nagadus_emerald_sliver',
        sid: 'm186',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'nagadus_emerald'],
        rarity: RARITY.UNCOMMON,
        element: VISION.DENDRO
    }
,
    {
        id: 'nagadus_emerald_fragment',
        sid: 'm187',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'nagadus_emerald'],
        rarity: RARITY.RARE,
        element: VISION.DENDRO
    }
,
    {
        id: 'nagadus_emerald_chunk',
        sid: 'm188',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'nagadus_emerald'],
        rarity: RARITY.EPIC,
        element: VISION.DENDRO
    }
,
    {
        id: 'nagadus_emerald_gemstone',
        sid: 'm189',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'nagadus_emerald'],
        rarity: RARITY.LEGENDARY,
        element: VISION.DENDRO
    }
,
    {
        id: 'prithiva_topaz_sliver',
        sid: 'm212',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'prithiva_topaz'],
        rarity: RARITY.UNCOMMON,
        element: VISION.GEO
    }
,
    {
        id: 'prithiva_topaz_fragment',
        sid: 'm213',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'prithiva_topaz'],
        rarity: RARITY.RARE,
        element: VISION.GEO
    }
,
    {
        id: 'prithiva_topaz_chunk',
        sid: 'm214',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'prithiva_topaz'],
        rarity: RARITY.EPIC,
        element: VISION.GEO
    }
,
    {
        id: 'prithiva_topaz_gemstone',
        sid: 'm215',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'prithiva_topaz'],
        rarity: RARITY.LEGENDARY,
        element: VISION.GEO
    }
,
    {
        id: 'shivada_jade_sliver',
        sid: 'm230',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'shivada_jade'],
        rarity: RARITY.UNCOMMON,
        element: VISION.CRYO
    }
,
    {
        id: 'shivada_jade_fragment',
        sid: 'm231',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'shivada_jade'],
        rarity: RARITY.RARE,
        element: VISION.CRYO
    }
,
    {
        id: 'shivada_jade_chunk',
        sid: 'm232',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'shivada_jade'],
        rarity: RARITY.EPIC,
        element: VISION.CRYO
    }
,
    {
        id: 'shivada_jade_gemstone',
        sid: 'm233',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'shivada_jade'],
        rarity: RARITY.LEGENDARY,
        element: VISION.CRYO
    }
,
    {
        id: 'agnidus_agate_sliver',
        sid: 'm242',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'agnidus_agate'],
        rarity: RARITY.UNCOMMON,
        element: VISION.PYRO
    }
,
    {
        id: 'agnidus_agate_fragment',
        sid: 'm243',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'agnidus_agate'],
        rarity: RARITY.RARE,
        element: VISION.PYRO
    }
,
    {
        id: 'agnidus_agate_chunk',
        sid: 'm244',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'agnidus_agate'],
        rarity: RARITY.EPIC,
        element: VISION.PYRO
    }
,
    {
        id: 'agnidus_agate_gemstone',
        sid: 'm245',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'agnidus_agate'],
        rarity: RARITY.LEGENDARY,
        element: VISION.PYRO
    }
,
    {
        id: 'varunada_lazurite_sliver',
        sid: 'm259',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'varunada_lazurite'],
        rarity: RARITY.UNCOMMON,
        element: VISION.HYDRO
    }
,
    {
        id: 'varunada_lazurite_fragment',
        sid: 'm260',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'varunada_lazurite'],
        rarity: RARITY.RARE,
        element: VISION.HYDRO
    }
,
    {
        id: 'varunada_lazurite_chunk',
        sid: 'm261',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'varunada_lazurite'],
        rarity: RARITY.EPIC,
        element: VISION.HYDRO
    }
,
    {
        id: 'varunada_lazurite_gemstone',
        sid: 'm262',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_ASCENTION,
        group: [MATERIAL_GROUP.ASCENSION_GEMS, 'varunada_lazurite'],
        rarity: RARITY.LEGENDARY,
        element: VISION.HYDRO
    }
];
