import { MATERIAL_TIER, MATERIAL_TYPE, MATERIAL_GROUP, RARITY } from '../../app/constants';

export const enhancementOres = [
    {
        id: 'enhancement_ore',
        sid: 'm32',
        localization: { en: { name: "Enhancement Ore" }, ru: { name: "Руда усиления" } },
        icon: "assets/image.png",
        tier: MATERIAL_TIER.ENHANCEMENT_ORE,
        type: MATERIAL_TYPE.WEAPON_ENHANCEMENT_MATERIALS,
        group: MATERIAL_GROUP.ENHANCEMENT_ORE,
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'fine_enhancement_ore',
        sid: 'm33',
        localization: { en: { name: "Fine Enhancement Ore" }, ru: { name: "Превосходная руда усиления" } },
        icon: "assets/fine.webp",
        tier: MATERIAL_TIER.FINE_ENHANCEMENT_ORE,
        type: MATERIAL_TYPE.WEAPON_ENHANCEMENT_MATERIALS,
        group: MATERIAL_GROUP.ENHANCEMENT_ORE,
        rarity: RARITY.RARE
    },
    {
        id: 'mystic_enhancement_ore',
        sid: 'm34',
        localization: { en: { name: "Mystic Enhancement Ore" }, ru: { name: "Волшебная руда усиления" } },
        icon: "assets/mystic.webp",
        tier: MATERIAL_TIER.MYSTIC_ENHANCEMENT_ORE,
        type: MATERIAL_TYPE.WEAPON_ENHANCEMENT_MATERIALS,
        group: MATERIAL_GROUP.ENHANCEMENT_ORE,
        rarity: RARITY.EPIC
    }
];
