import { ENEMY_TYPE, FACTION, MATERIAL_GROUP, MATERIAL_TYPE } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";
import { ENEMIES_TYPE, ELEMENT, FAMILY, GROUP } from "../../shared/config/creatures.js";

export const fatui = [
    {
        id: "fatui_skirmisher_pyro_slinger",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.FATUI,
        description: "Солдат Фатуи, вооружённый огнемётом. Может создавать Пиро щит для своей защиты.",
        stats: {
            hp: [1800, 4000, 8000, 16000, 32000],
            attack: [90, 180, 360, 720, 1440],
            defense: [45, 90, 180, 360, 720],
            resistances: { pyro: 50, hydro: -50, electro: 0, cryo: 0, anemo: 0, geo: 0, dendro: 0, physical: 10 }
        },
        drops: ["Эмблема новобранца", "Эмблема сержанта", "Эмблема офицера"],
        behavior: "Атакует очередями из огнемёта. После получения урона может активировать Пиро щит, который разрушается Гидро атаками.",
    },
    {
        id: "fatui_agent_pyro",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.FATUI,
        description: "Элитный шпион Фатуи, использующий два кинжала и Пиро элемент. Способен становиться невидимым.",
        stats: {
            hp: [2500, 5500, 11000, 22000, 44000],
            attack: [120, 240, 480, 960, 1920],
            defense: [60, 120, 240, 480, 960],
            resistances: { pyro: 50, hydro: -25, electro: 0, cryo: 0, anemo: 10, geo: 10, dendro: 10, physical: 25 }
        },
        drops: ["Сломанный нож охотника", "Заточенный нож охотника", "Легендарный нож охотника"],
        behavior: "Быстро перемещается по полю боя, становится невидимым и наносит внезапные удары. Атаки оставляют на цели метку, которая взрывается через некоторое время.",
    },
    {
        id: "cicin_mage_electro",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.FATUI,
        description: "Маг Фатуи, который управляет цицинами - маленькими летающими Электро духами. Может телепортироваться и создавать Электро щит.",
        stats: {
            hp: [1600, 3600, 7200, 14400, 28800],
            attack: [85, 170, 340, 680, 1360],
            defense: [40, 80, 160, 320, 640],
            resistances: { pyro: 0, hydro: 0, electro: 50, cryo: -50, anemo: 0, geo: 0, dendro: 0, physical: 10 }
        },
        drops: ["Туманная трава", "Пыльца туманной травы", "Королевский скипетр туманной травы"],
        behavior: "Призывает цицинов для атаки. Может телепортироваться на короткие расстояния. При низком здоровье создаёт Электро щит.",
    }
];