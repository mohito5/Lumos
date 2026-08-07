import { MATERIAL_TIER, MATERIAL_TYPE, MATERIAL_GROUP, RARITY } from "../../shared/config/constants.js";

export const localSpecialty = [
    {
        id: 'frostlamp_flower',
        sid: 'm43',
        localization: { en: { name: "Frostlamp Flower" }, ru: { name: "Морозно-лампаданый цветок" } },
        icon: "assets/localSpecial/frostlampFlower.webp",
        tier: MATERIAL_TIER.LOCAL_SPECIALTY
    },
    {
        id: 'wolfhook',
        sid: 'm44',
        localization: { en: { name: "Wolfhook" }, ru: { name: "Волчий клык" } },
        icon: "assets/local-spec/wolfhook.png",
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, MATERIAL_GROUP.WOLFHOOK],
        rarity : RARITY.COMMON,
        tier: MATERIAL_TIER.LOCAL_SPECIALTY
    }
];