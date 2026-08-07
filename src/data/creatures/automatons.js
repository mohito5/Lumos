import { ENEMY_TYPE, FACTION, MATERIAL_GROUP, MATERIAL_TYPE } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";
import { ENEMIES_TYPE, ELEMENT, FAMILY, GROUP } from "../../shared/config/creatures.js";

export const automatons = [
    {
        id: "ruin_guard",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.AUTOMATONS,
        description: "Древний механизм, созданный давно исчезнувшей цивилизацией. Невероятно прочен и обладает разрушительной огневой мощью.",
        stats: {
            hp: [3000, 7000, 14000, 28000, 56000],
            attack: [150, 300, 600, 1200, 2400],
            defense: [70, 140, 280, 560, 1120],
            resistances: { pyro: 10, hydro: 10, electro: 10, cryo: 10, anemo: 10, geo: 10, dendro: 10, physical: 70 }
        },
        drops: ["Хаотичное устройство", "Хаотическая цепь", "Хаотический механизм"],
        behavior: "Атакует ракетами, вращающимися ударами и топотом. Уязвим в области ядра после определённых атак.",
    },
    {
        id: "ruin_hunter",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.AUTOMATONS,
        description: "Более продвинутая версия Стража руин, способная летать и атаковать с воздуха.",
        stats: {
            hp: [2800, 6500, 13000, 26000, 52000],
            attack: [140, 280, 560, 1120, 2240],
            defense: [65, 130, 260, 520, 1040],
            resistances: { pyro: 10, hydro: 10, electro: 10, cryo: 10, anemo: 10, geo: 10, dendro: 10, physical: 70 }
        },
        drops: ["Хаотичное устройство", "Хаотическая цепь", "Хаотический механизм"],
        behavior: "Может переключаться между наземным и воздушным режимами. В воздухе атакует ракетами. Уязвим в ядре после определённых атак.",
    }
];