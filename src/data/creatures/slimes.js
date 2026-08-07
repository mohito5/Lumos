import { ENEMY_TYPE, FACTION, MATERIAL_GROUP, MATERIAL_TYPE } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";
import { ENEMIES_TYPE, ELEMENT, FAMILY, GROUP } from "../../shared/config/creatures.js";

export const slimes = [
    {
        id: "pyro_slime",
        type: ENEMY_TYPE.COMMON,
        faction: FACTION.SLIMES,
        description: "Маленькое существо, состоящее из Пиро элемента. При поражении Гидро атакой временно ослабевает.",
        stats: {
            hp: [400, 900, 1800, 3600, 7200],
            attack: [20, 40, 80, 160, 320],
            defense: [10, 20, 40, 80, 160],
            resistances: { pyro: 100, hydro: -25, electro: 0, cryo: 0, anemo: 0, geo: 0, dendro: 0, physical: 10 }
        },
        drops: ["Конденсат слайма", "Слизь слайма", "Концентрат слайма"],
        behavior: "Плюётся огненными шарами. Если находится рядом с источником огня (например, факелом), может взорваться при уничтожении.",
    },
    {
        id: "hydro_slime",
        type: ENEMY_TYPE.COMMON,
        faction: FACTION.SLIMES,
        description: "Маленькое существо, состоящее из Гидро элемента. Может заключать персонажей в пузыри.",
        stats: {
            hp: [400, 900, 1800, 3600, 7200],
            attack: [20, 40, 80, 160, 320],
            defense: [10, 20, 40, 80, 160],
            resistances: { pyro: 0, hydro: 100, electro: -25, cryo: -25, anemo: 0, geo: 0, dendro: 0, physical: 10 }
        },
        drops: ["Конденсат слайма", "Слизь слайма", "Концентрат слайма"],
        behavior: "Атакует, выпуская водяные пузыри, которые могут временно обездвижить цель.",
    },
    {
        id: "electro_slime",
        type: ENEMY_TYPE.COMMON,
        faction: FACTION.SLIMES,
        description: "Маленькое существо, состоящее из Электро элемента. Может создавать электрические разряды между другими Электро слаймами.",
        stats: {
            hp: [400, 900, 1800, 3600, 7200],
            attack: [20, 40, 80, 160, 320],
            defense: [10, 20, 40, 80, 160],
            resistances: { pyro: -25, hydro: 0, electro: 100, cryo: -25, anemo: 0, geo: 0, dendro: 0, physical: 10 }
        },
        drops: ["Конденсат слайма", "Слизь слайма", "Концентрат слайма"],
        behavior: "Создаёт электрическую дугу с другими Электро слаймами поблизости, нанося периодический урон.",
    }
];