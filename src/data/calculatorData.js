export const substatTiers = {
    'hp%': { base: 4.1, increments: [0.5, 0.6, 0.7, 0.8] },
    'atk%': { base: 4.1, increments: [0.5, 0.6, 0.7, 0.8] },
    'def%': { base: 5.1, increments: [0.6, 0.7, 0.8, 0.9] },
    'er%': { base: 4.5, increments: [0.5, 0.6, 0.7, 0.8] },
    'em': { base: 16, increments: [2, 3, 4, 5] },
    'critRate%': { base: 2.7, increments: [0.3, 0.4, 0.5, 0.6] },
    'critDmg%': { base: 5.4, increments: [0.6, 0.7, 0.8, 0.9] },
    'hp': { base: 209, increments: [25, 30, 35, 40] },
    'atk': { base: 14, increments: [1, 2, 3, 4] },
    'def': { base: 16, increments: [2, 3, 4, 5] },
};

export const getStatDisplayName = (stat, lang) => {
    const names = {
        'hp%': 'HP%',
        'atk%': 'Сила атаки %',
        'def%': 'Защита %',
        'er%': 'Восст. энергии %',
        'em': 'Мастерство стихий',
        'critRate%': 'Шанс крит. попадания %',
        'critDmg%': 'Крит. урон %',
        'hp': 'HP',
        'atk': 'Сила атаки',
        'def': 'Защита',
        'pyro%': 'Бонус Пиро урона %',
        'hydro%': 'Бонус Гидро урона %',
        'electro%': 'Бонус Электро урона %',
        'cryo%': 'Бонус Крио урона %',
        'anemo%': 'Бонус Анемо урона %',
        'geo%': 'Бонус Гео урона %',
        'dendro%': 'Бонус Дендро урона %',
        'physical%': 'Бонус физ. урона %',
        'healing%': 'Бонус лечения %',
    };

    if (lang === 'ru') {
        return names[stat] || stat;
    }
    // Basic english fallback
    return stat.replace('%', ' Percent').replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
};