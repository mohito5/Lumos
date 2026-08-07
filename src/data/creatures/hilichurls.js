import { ENEMY_TYPE, FACTION, MATERIAL_GROUP, MATERIAL_TYPE } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";
import { ENEMIES_TYPE, ELEMENT, FAMILY, GROUP } from "../../shared/config/creatures.js";


export const hilichurls = [
    {
        id: "hilichurl",
        icon: "/assets/exp.png",
        type: ENEMIES_TYPE.COMMON,
        type_damage: ELEMENT.RHYSICAL,
        family: FAMILY.HILICHURLS,
        group: GROUP.HILICHURL_GUARDS,
        faction: FACTION.HILICHURLS,
        stats: {
            [STATS.HP]: [500, 1200, 2400, 4800, 9600],
            [STATS.ATK]: [30, 60, 120, 240, 480],
            [STATS.DEF]: [20, 40, 80, 160, 320],
            resistances: {
                [STATS.PYRO_RES]: 10,
                [STATS.HYDRO_RES]: 10,
                [STATS.ELECTRO_RES]: 10,
                [STATS.CRYO_RES]: 10,
                [STATS.ANEMO_RES]: 10,
                [STATS.GEO_RES]: 10,
                [STATS.DENDRO_RES]: 10,
                [STATS.PHYSICAL_RES]: 10
            }
        },
        drops: [MATERIAL_GROUP.HILICHURL_MASKS, MATERIAL_TYPE.COMMON_CURRENCIES, MATERIAL_GROUP.SLIME_MATERIALS]
    },
    {
        id: "hilichurl_fighter",
        type: ENEMY_TYPE.COMMON,
        faction: FACTION.HILICHURLS,
        stats: {
            hp: [600, 1400, 2800, 5600, 11200],
            attack: [35, 70, 140, 280, 560],
            defense: [25, 50, 100, 200, 400],
            resistances: { pyro: 10, hydro: 10, electro: 10, cryo: 10, anemo: 10, geo: 10, dendro: 10, physical: 10 }
        },
        drops: [MATERIAL_GROUP.HILICHURL_MASKS, MATERIAL_TYPE.COMMON_CURRENCIES]
    },
    {
        id: "hilichurl_grenadier",
        type: ENEMY_TYPE.COMMON,
        faction: FACTION.HILICHURLS,
        stats: {
            hp: [400, 1000, 2000, 4000, 8000],
            attack: [25, 50, 100, 200, 400],
            defense: [15, 30, 60, 120, 240],
            resistances: { pyro: 10, hydro: 10, electro: 10, cryo: 10, anemo: 10, geo: 10, dendro: 10, physical: 10 }
        },
        drops: [MATERIAL_GROUP.HILICHURL_MASKS, MATERIAL_TYPE.COMMON_CURRENCIES]
    },
    {
        id: "hilichurl_berserker",
        type: ENEMY_TYPE.COMMON,
        faction: FACTION.HILICHURLS,
        stats: {
            hp: [700, 1600, 3200, 6400, 12800],
            attack: [40, 80, 160, 320, 640],
            defense: [20, 40, 80, 160, 320],
            resistances: { pyro: 10, hydro: 10, electro: 10, cryo: 10, anemo: 10, geo: 10, dendro: 10, physical: 10 }
        },
        drops: [MATERIAL_GROUP.HILICHURL_MASKS, MATERIAL_TYPE.COMMON_CURRENCIES]
    },
    {
        id: "mitachurl_wooden_shield",
        icon: "assets/exp.png",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.HILICHURLS,
        stats: {
            hp: [2000, 4500, 9000, 18000, 36000],
            attack: [100, 200, 400, 800, 1600],
            defense: [50, 100, 200, 400, 800],
            resistances: { pyro: -50, hydro: 10, electro: 10, cryo: 10, anemo: 10, geo: 10, dendro: 10, physical: 30 }
        },
        drops: [MATERIAL_GROUP.HILICHURL_HORNS, MATERIAL_TYPE.COMMON_CURRENCIES]
    },
    {
        id: "lavachurl_stonehide",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.HILICHURLS,
        stats: {
            hp: [5000, 12000, 24000, 48000, 96000],
            attack: [250, 500, 1000, 2000, 4000],
            defense: [100, 200, 400, 800, 1600],
            resistances: { pyro: 10, hydro: 10, electro: 10, cryo: 10, anemo: 10, geo: 70, dendro: 10, physical: 50 }
        },
        drops: [MATERIAL_GROUP.HILICHURL_HORNS, MATERIAL_TYPE.COMMON_CURRENCIES]
    }
];