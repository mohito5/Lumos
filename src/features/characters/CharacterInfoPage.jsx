
import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CharacterInfoPageView from './views/CharacterInfoPageView';
import allCharacters from '../../data/characters/index.js';
import { ASCENSION_STATS_VALUES } from '../../data/ascension-stats.js';
import { STATS } from '../../app/stats.js';
import { LEVEL_STEPS, interpolateStatAtLevel } from '../../core/utils/levelCurve.js';
import { findMaterial, calculateCharacterCostRange } from '../../core/utils/materialsCalculator.js';

const levelSteps = LEVEL_STEPS;

const CharacterInfoPage = () => {
    const { characterId } = useParams();
    const { t } = useTranslation(['characters', 'ui', 'stats', 'materials']);
    const location = useLocation();

    const [levelIndex, setLevelIndex] = useState(0);
    const [isRangeFromPrevious, setIsRangeFromPrevious] = useState(false);

    const character = useMemo(() => 
        allCharacters.find(c => c.id.toLowerCase() === characterId.toLowerCase()),
    [characterId]);

    const { numericLevel, displayLevel } = useMemo(() => {
        const currentStep = levelSteps[levelIndex];
        return {
            numericLevel: parseInt(currentStep, 10),
            displayLevel: currentStep,
        };
    }, [levelIndex]);

    const charLocale = useMemo(() => {
        if (!character) return {};
        return t(character.id, { ns: 'characters', returnObjects: true }) || {};
    }, [character, t]);

    // «С предыдущего»: диапазон [levelIndex-1, levelIndex) — стоимость только
    // последнего перехода. «С начала»: [0, levelIndex) — суммарная стоимость.
    // Раньше это был отдельный useEffect+setState с полностью продублированной
    // (посимвольно совпадающей с calculateCharacterCostRange) логикой поиска
    // материалов — вычисление чисто производное от character/levelIndex/
    // isRangeFromPrevious, дополнительный useEffect/useState тут не нужен.
    const calculatedMaterials = useMemo(() => {
        const startLevelIndex = isRangeFromPrevious ? levelIndex - 1 : 0;
        return calculateCharacterCostRange('level', startLevelIndex, levelIndex, character);
    }, [character, levelIndex, isRangeFromPrevious]);

    const baseHp = useMemo(() => Math.round(interpolateStatAtLevel(character?.baseStats?.[STATS.HP] || [], numericLevel)), [character, numericLevel]);
    const baseAtk = useMemo(() => Math.round(interpolateStatAtLevel(character?.baseStats?.[STATS.ATK] || [], numericLevel)), [character, numericLevel]);
    const baseDef = useMemo(() => Math.round(interpolateStatAtLevel(character?.baseStats?.[STATS.DEF] || [], numericLevel)), [character, numericLevel]);

    const ascensionStat = useMemo(() => {
        if (!character?.ascensionStat) return null;
    
        const statKey = character.ascensionStat;
        const statValues = ASCENSION_STATS_VALUES[statKey];
    
        if (!statValues) return null;
    
        const rawValue = interpolateStatAtLevel(statValues, numericLevel);

        const isPercent = statKey.includes('%');
        const displayValue = isPercent ? `${rawValue.toFixed(1)}%` : Math.round(rawValue);

        return {
            label: t(`stats:${statKey}`),
            value: displayValue
        };
    }, [character, numericLevel, t]);
    
    const handleLevelChange = useCallback((index) => {
        setLevelIndex(index);
    }, []);

    const handleRangeToggle = useCallback(() => {
        setIsRangeFromPrevious(p => !p);
    }, []);

    const currentPage = location.pathname.split('/').pop();

    return (
        <CharacterInfoPageView
            character={character}
            charLocale={charLocale}
            currentPage={currentPage}
            displayLevel={displayLevel}
            levelIndex={levelIndex}
            levelSteps={levelSteps}
            baseHp={baseHp}
            baseAtk={baseAtk}
            baseDef={baseDef}
            ascensionStat={ascensionStat}
            isRangeFromPrevious={isRangeFromPrevious}
            calculatedMaterials={calculatedMaterials}
            handleLevelChange={handleLevelChange}
            handleRangeToggle={handleRangeToggle}
            findMaterial={findMaterial}
        />
    );
};

export default CharacterInfoPage;
