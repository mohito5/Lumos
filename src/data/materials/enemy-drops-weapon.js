import { MATERIAL_TYPE, MATERIAL_GROUP, RARITY } from "../../shared/config/constants.js";

export const enemyDropsWeapon = [
    {
        id: 'chaos-device',
        sid: 'm26',
        icon: "assets/Chaos_Device.webp",
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.ELITE_ENEMY_DROPS, MATERIAL_GROUP.HUMANOID_RUIN_MACHINE],
        rarity: RARITY.COMMON
    },
    {
        id: 'chaos-circuit',
        sid: 'm27',
        icon: "assets/Chaos_Circuit.webp",
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HUMANOID_RUIN_MACHINE],
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'chaos-core',
        sid: 'm28',
        icon: "assets/Chaos_Core.webp",
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HUMANOID_RUIN_MACHINE],
        rarity: RARITY.RARE
    },
];
