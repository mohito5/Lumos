import { ENEMY_TYPE, FACTION, MATERIAL_GROUP, MATERIAL_TYPE } from "../../shared/config/constants.js";
import { STATS } from "../../shared/config/stats.js";
import { ENEMIES_TYPE, ELEMENT, FAMILY, GROUP } from "../../shared/config/creatures.js";

export const abyssOrder = [
    {
        id: "abyss_mage_pyro",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.ABYSS,
        description: "Маг Бездны, владеющий Пиро элементом и защищённый прочным щитом. Чтобы нанести урон, необходимо сначала разрушить его щит.",
        stats: {
            hp: [1500, 3500, 7000, 14000, 28000],
            attack: [80, 160, 320, 640, 1280],
            defense: [40, 80, 160, 320, 640],
            resistances: { pyro: 100, hydro: -50, electro: 0, cryo: 0, anemo: 0, geo: 0, dendro: 0, physical: 10 }
        },
        drops: ["Ветви ивового дерева", "Листья ивового дерева", "Побеги ивового дерева"],
        behavior: "Атакует огненными шарами и создаёт огненные столбы. После разрушения щита становится уязвимым и падает на землю.",
    },
    {
        id: "abyss_mage_hydro",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.ABYSS,
        description: "Маг Бездны, владеющий Гидро элементом. Его щит очень эффективен против большинства атак.",
        stats: {
            hp: [1500, 3500, 7000, 14000, 28000],
            attack: [80, 160, 320, 640, 1280],
            defense: [40, 80, 160, 320, 640],
            resistances: { pyro: 0, hydro: 100, electro: -50, cryo: -50, anemo: 0, geo: 0, dendro: 0, physical: 10 }
        },
        drops: ["Ветви ивового дерева", "Листья ивового дерева", "Побеги ивового дерева"],
        behavior: "Создаёт водяные пузыри, которые заключают в тюрьму. Щит быстро разрушается Крио и Электро атаками.",
    },
    {
        id: "abyss_herald_wicked_torrents",
        type: ENEMY_TYPE.ELITE,
        faction: FACTION.ABYSS,
        description: "Могущественный воин Ордена Бездны, использующий два клинка из чистой воды. Его атаки быстры и смертоносны.",
        stats: {
            hp: [4000, 9000, 18000, 36000, 72000],
            attack: [200, 400, 800, 1600, 3200],
            defense: [80, 160, 320, 640, 1280],
            resistances: { pyro: 0, hydro: 70, electro: -25, cryo: -25, anemo: 10, geo: 10, dendro: 10, physical: 30 }
        },
        drops: ["Сломанный нож охотника", "Заточенный нож охотника", "Легендарный нож охотника"],
        behavior: "Использует серию быстрых атак и водные лезвия. При низком уровне здоровья входит в состояние ярости, увеличивая свою скорость и силу.",
    }
];