/**
 * getCharacterStat (CharacterInfoPage.jsx) и getWeaponStat (WeaponInfoPage.jsx)
 * были двумя байт-в-байт идентичными копиями одной и той же интерполяции —
 * персонажи и оружие используют один и тот же набор ключевых уровней
 * (1/20/40/50/60/70/80/90), поэтому линейная интерполяция между ними для
 * обоих устроена одинаково. Вынесено сюда одной функцией.
 *
 * Не путать с getStatAtLevel из core/utils/calculatorUtils.js — та работает
 * в ДРУГОЙ системе координат: berёт значение по ПРЯМОМУ индексу заранее
 * посчитанного 14-элементного массива (для калькулятора сборки), а не
 * интерполирует между контрольными точками по произвольному игровому
 * уровню 1-90 (для страниц персонажа/оружия). Это разные задачи с разными
 * входами, объединять их не стоит.
 */

export const KEY_LEVELS = [1, 20, 40, 50, 60, 70, 80, 90];

export const LEVEL_STEPS = [1, 20, '20+', 40, '40+', 50, '50+', 60, '60+', 70, '70+', 80, '80+', 90];

export function interpolateStatAtLevel(statArray, currentLevel) {
    if (!statArray || statArray.length === 0) return 0;
    if (currentLevel <= 1) return statArray[0];
    if (currentLevel >= 90) return statArray[statArray.length - 1];

    let lowerLevelIndex = -1;
    for (let i = 0; i < KEY_LEVELS.length; i++) {
        if (KEY_LEVELS[i] <= currentLevel) {
            lowerLevelIndex = i;
        } else {
            break;
        }
    }

    if (lowerLevelIndex === -1) return statArray[0];
    if (lowerLevelIndex === KEY_LEVELS.length - 1 || KEY_LEVELS[lowerLevelIndex] === currentLevel) {
        return statArray[lowerLevelIndex];
    }

    const lowerKeyLevel = KEY_LEVELS[lowerLevelIndex];
    const upperKeyLevel = KEY_LEVELS[lowerLevelIndex + 1];
    const lowerStat = statArray[lowerLevelIndex];
    const upperStat = statArray[lowerLevelIndex + 1];

    const levelFraction = (currentLevel - lowerKeyLevel) / (upperKeyLevel - lowerKeyLevel);
    return lowerStat + levelFraction * (upperStat - lowerStat);
}
