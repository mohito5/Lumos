import i18n from '../core/i18n/i18n-config.js';
import { artifactStatsData } from './artifact-stats.js';

// Функция для получения отображаемого имени стата
export const getStatDisplayName = (stat, lang = 'ru') => {
    const key = `stats.${stat}`;
    const translated = i18n.t(key);
    // Если перевод не найден, i18next вернёт ключ. В этом случае, просто возвращаем исходный stat.
    return translated === key ? stat : translated;
};

// Преобразует данные о тирах сабстатов в нужный формат
export const getPossibleSubstats = () => {
    const { substatTiers } = artifactStatsData;
    if (!substatTiers) {
        console.error("В файле artifact-stats.js не найдены данные substatTiers");
        return {};
    }

    const formattedSubstats = {};
    Object.keys(substatTiers).forEach(stat => {
        const tierData = substatTiers[stat];
        if (tierData.base && tierData.increments) {
            // Объединяем базовое значение и три тира улучшений
            formattedSubstats[stat] = [tierData.base, ...tierData.increments];
        }
    });
    return formattedSubstats;
};
