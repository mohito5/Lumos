export const materialCategories = {
    character: {
        level: {
            "20+": { mora: 20000, localSpecialty: 3, sliver: 1, enemyDropsSt1: 3 },
            "40+": { mora: 40000, fragment: 3, bossMaterial: 2, localSpecialty: 10, enemyDropsSt1: 15 },
            "50+": { mora: 60000, fragment: 6, bossMaterial: 4, localSpecialty: 20, enemyDropsSt2: 12 },
            "60+": { mora: 80000, chunk: 3, bossMaterial: 8, localSpecialty: 30, enemyDropsSt2: 18 },
            "70+": { mora: 100000, chunk: 6, bossMaterial: 12, localSpecialty: 45, enemyDropsSt3: 12 },
            "80+": { mora: 120000, gemstone: 6, bossMaterial: 20, localSpecialty: 60, enemyDropsSt3: 24, experience: 421 },
        },
        attack: {
            2: { mora: 12500, enemyDropsSt1: 6, teachings: 3 },
            3: { mora: 17500, enemyDropsSt2: 3, guide: 2 },
            4: { mora: 25000, enemyDropsSt2: 4, guide: 4 },
            5: { mora: 30000, enemyDropsSt2: 6, guide: 6 },
            6: { mora: 37500, enemyDropsSt2: 9, guide: 9 },
            7: { mora: 120000, enemyDropsSt3: 4, philosophies: 4, weeklyBossDrops: 1 },
            8: { mora: 260000, enemyDropsSt3: 6, philosophies: 6, weeklyBossDrops: 1 },
            9: { mora: 450000, enemyDropsSt3: 9, philosophies: 12, weeklyBossDrops: 2 },
            10: { mora: 700000, enemyDropsSt3: 12, philosophies: 16, weeklyBossDrops: 2, crown: 1 },
        },
        skill: {
            2: { mora: 12500, enemyDropsSt1: 6, teachings: 3 },
            3: { mora: 17500, enemyDropsSt2: 3, guide: 2 },
            4: { mora: 25000, enemyDropsSt2: 4, guide: 4 },
            5: { mora: 30000, enemyDropsSt2: 6, guide: 6 },
            6: { mora: 37500, enemyDropsSt2: 9, guide: 9 },
            7: { mora: 120000, enemyDropsSt3: 4, philosophies: 4, weeklyBossDrops: 1 },
            8: { mora: 260000, enemyDropsSt3: 6, philosophies: 6, weeklyBossDrops: 1 },
            9: { mora: 450000, enemyDropsSt3: 9, philosophies: 12, weeklyBossDrops: 2 },
            10: { mora: 700000, enemyDropsSt3: 12, philosophies: 16, weeklyBossDrops: 2, crown: 1 },
        },
        burst: {
            2: { mora: 12500, enemyDropsSt1: 6, teachings: 3 },
            3: { mora: 17500, enemyDropsSt2: 3, guide: 2 },
            4: { mora: 25000, enemyDropsSt2: 4, guide: 4 },
            5: { mora: 30000, enemyDropsSt2: 6, guide: 6 },
            6: { mora: 37500, enemyDropsSt2: 9, guide: 9 },
            7: { mora: 120000, enemyDropsSt3: 4, philosophies: 4, weeklyBossDrops: 1 },
            8: { mora: 260000, enemyDropsSt3: 6, philosophies: 6, weeklyBossDrops: 1 },
            9: { mora: 450000, enemyDropsSt3: 9, philosophies: 12, weeklyBossDrops: 2 },
            10: { mora: 700000, enemyDropsSt3: 12, philosophies: 16, weeklyBossDrops: 2, crown: 1 },
        },
    },
    weapon: {
        "5": {
            "20+": { mora: 10000, primary: 5, secondary: 5, common: 3 },
            "40+": { mora: 20000, primary: 5, secondary: 18, common: 12 },
            "50+": { mora: 30000, primary: 9, secondary: 9, common: 9 },
            "60+": { mora: 45000, primary: 5, secondary: 18, common: 14 },
            "70+": { mora: 60000, primary: 9, secondary: 14, common: 11 },
            "80+": { mora: 80000, primary: 6, secondary: 27, common: 18 }
        },
        "4": {
            "20+": { mora: 7000, primary: 3, secondary: 3, common: 2 },
            "40+": { mora: 14000, primary: 3, secondary: 12, common: 8 },
            "50+": { mora: 21000, primary: 6, secondary: 6, common: 6 },
            "60+": { mora: 31500, primary: 3, secondary: 12, common: 10 },
            "70+": { mora: 42000, primary: 6, secondary: 10, common: 8 },
            "80+": { mora: 56000, primary: 4, secondary: 18, common: 12 }
        },
        "3": {
            "20+": { mora: 5000, primary: 2, secondary: 2, common: 1 },
            "40+": { mora: 10000, primary: 2, secondary: 9, common: 6 },
            "50+": { mora: 15000, primary: 4, secondary: 4, common: 4 },
            "60+": { mora: 22500, primary: 2, secondary: 9, common: 7 },
            "70+": { mora: 30000, primary: 4, secondary: 7, common: 5 },
            "80+": { mora: 40000, primary: 3, secondary: 13, common: 9 }
        }
    }
};

export const weaponAscensionCosts = {
    "5": {
        "20+": { mora: 10000, primary: 5, secondary: 5, common: 3 },
        "40+": { mora: 20000, primary: 5, secondary: 18, common: 12 },
        "50+": { mora: 30000, primary: 9, secondary: 9, common: 9 },
        "60+": { mora: 45000, primary: 5, secondary: 18, common: 14 },
        "70+": { mora: 60000, primary: 9, secondary: 14, common: 11 },
        "80+": { mora: 80000, primary: 6, secondary: 27, common: 18 }
    },
    "4": {
        "20+": { mora: 5000, primary: 3, secondary: 3, common: 2 },
        "40+": { mora: 15000, primary: 3, secondary: 12, common: 8 },
        "50+": { mora: 20000, primary: 6, secondary: 6, common: 6 },
        "60+": { mora: 30000, primary: 3, secondary: 12, common: 9 },
        "70+": { mora: 35000, primary: 6, secondary: 9, common: 7 },
        "80+": { mora: 45000, primary: 4, secondary: 18, common: 12 }
    }
};

export const materialsData = {
    mora: {
        localization: { en: { name: "Mora" }, ru: { name: "Мора" } },
        icon: "assets/mora.png"
    },
    crown: {
        localization: { en: { name: "Crown of Insight" }, ru: { name: "Корона прозрения" } },
        icon: "assets/tmp256 (4).png"
    },
    sliver: {
        Electro: { localization: { en: { name: "Vajrada Amethyst Sliver" }, ru: { name: "Осколок аметиста Ваджрада" } }, icon: "assets/tmp256.png" },
        Anemo: { localization: { en: { name: "Vayuda Turquoise Sliver" }, ru: { name: "Осколок бирюзы Вайюда" } }, icon: "assets/gems/anemo/sl-anemo.png" },
    },
    fragment: {
        Electro: { localization: { en: { name: "Vajrada Amethyst Fragment" }, ru: { name: "Фрагмент аметиста Ваджрада" } }, icon: "assets/tmp256 (1).png" },
        Anemo: { localization: { en: { name: "Vayuda Turquoise Fragment" }, ru: { name: "Фрагмент бирюзы Вайюда" } }, icon: "assets/gems/anemo/fr-anemo.png" },
    },
    chunk: {
        Electro: { localization: { en: { name: "Vajrada Amethyst Chunk" }, ru: { name: "Кусок аметиста Ваджрада" } }, icon: "assets/tmp256 (2).png" },
        Anemo: { localization: { en: { name: "Vayuda Turquoise Chunk" }, ru: { name: "Кусок бирюзы Вайюда" } }, icon: "assets/gems/anemo/ch-anemo.png" },
    },
    gemstone: {
        Electro: { localization: { en: { name: "Vajrada Amethyst Gemstone" }, ru: { name: "Драгоценный аметист Ваджрада" } }, icon: "assets/tmp256 (3).png" },
        Anemo: { localization: { en: { name: "Vayuda Turquoise Gemstone" }, ru: { name: "Драгоценная бирюза Вайюда" } }, icon: "assets/gems/anemo/ge-anemo.png" },
    },
    enemyDropsSt1: {
        Shaft: { localization: { en: { name: "Broken Drive Shaft" }, ru: { name: "Сломанный приводной вал" } }, icon: "assets/drops/shaft1.webp" },
    },
    enemyDropsSt2: {
        Shaft: { localization: { en: { name: "Reinforced Drive Shaft" }, ru: { name: "Усиленный приводной вал" } }, icon: "assets/drops/shaft2.webp" },
    },
    enemyDropsSt3: {
        Shaft: { localization: { en: { name: "Precision Drive Shaft" }, ru: { name: "Точный приводной вал" } }, icon: "assets/drops/shaft3.webp" },
    },
    teachings: {
        Freedom: { localization: { en: { name: "Teachings of Freedom" }, ru: { name: "Учения о Свободе" } }, icon: "assets/book/freedom1.png", farmDays: ['monday', 'thursday', 'sunday'] },
        vagrancy: { localization: { en: { name: "Teachings of Vagrancy" }, ru: { name: "Учения странствий" } }, icon: "assets/talent/teaching_of_vagrancy.webp", farmDays: ['tuesday', 'friday', 'sunday'] },
    },
    guide: {
        Freedom: { localization: { en: { name: "Guide to Freedom" }, ru: { name: "Руководство о Свободе" } }, icon: "assets/book/freedom2.png", farmDays: ['monday', 'thursday', 'sunday'] }, // Corrected icon path
        vagrancy: { localization: { en: { name: "Guide to Vagrancy" }, ru: { name: "Руководство по странствиям" } }, icon: "assets/talent/guide_of_vagrancy.webp", farmDays: ['tuesday', 'friday', 'sunday'] }, // Corrected icon path
    },
    philosophies: {
        Freedom: { localization: { en: { name: "Philosophies of Freedom" }, ru: { name: "Философия о Свободе" } }, icon: "assets/book/freedom3.png", farmDays: ['monday', 'thursday', 'sunday'] },
        vagrancy: { localization: { en: { name: "Philosophies of Vagrancy" }, ru: { name: "Философия странствий" } }, icon: "assets/talent/philosophies_of_vagrancy.webp", farmDays: ['tuesday', 'friday', 'sunday'] }, // Corrected icon path
    },
    weeklyBossDrops: {
        AscendedSampleQueen: { localization: { en: { name: "Ascended Sample: Queen" }, ru: { name: "Вознесённый образец: Королева" } }, icon: "assets/1.webp" },
    },
    bossMaterial: {
        kuuvyaka: { localization: { en: { name: "Kuuvayaka Stamp Mold" }, ru: { name: "Штамповочная форма Кууваяки" } }, icon: "assets/SHtampovochnaya-forma-kuuvyaki.webp" },
        drugkrumkake: { localization: { en: { name: "Drugkrumkake" }, ru: { name: "Другкрумкаке" } }, icon: "assets/drugkrumkake.png" },
    },
    localSpecialty: {
        frostlampFlower: { localization: { en: { name: "Frostlamp Flower" }, ru: { name: "Морозно-лампаданый цветок" } }, icon: "assets/localSpecial/frostlampFlower.webp" },
        Wolfhook: { localization: { en: { name: "Wolfhook" }, ru: { name: "Волчий клык" } }, icon: "assets/local-spec/wolfhook.png" },
    },
    experience: {
        localization: { en: { name: "Experience" }, ru: { name: "Опыт" } },
        icon: "assets/exp.png"
    }
};