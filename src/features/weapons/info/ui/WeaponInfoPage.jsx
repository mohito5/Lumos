
import React, { useState, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import weaponsData from '../../../../data/weapons/index';
import { STATS } from '../../../../shared/config/stats.js';
import { attackCurves, secondaryStatCurves } from '../../../../data/weapon-stats-curves.js';
import { LEVEL_STEPS, interpolateStatAtLevel } from '../../../../shared/lib/levelCurve.js';
import { calculateWeaponMaterials } from '../../../../shared/lib/materialsCalculator.js';

import WeaponInfoPageView from './WeaponInfoPageView.jsx';

const levelSteps = LEVEL_STEPS;

const WeaponInfoPage = () => {
    const { id } = useParams();
    const { t } = useTranslation(['weapons', 'ui', 'stats', 'materials']);
    const location = useLocation();

    const [levelIndex, setLevelIndex] = useState(0);
    const [isRangeFromPrevious, setIsRangeFromPrevious] = useState(false);
    const [refinementLevel, setRefinementLevel] = useState(1);

    const weapon = useMemo(() =>
        weaponsData.find(w => w.id.toLowerCase() === id.toLowerCase()),
    [id]);

    const weaponLocale = useMemo(() => {
        if (!weapon) return {};
        return t(weapon.id, { ns: 'weapons', returnObjects: true }) || {};
    }, [weapon, t]);
    
    const { numericLevel, displayLevel } = useMemo(() => {
        const currentStep = levelSteps[levelIndex];
        return {
            numericLevel: parseInt(currentStep, 10),
            displayLevel: currentStep,
        };
    }, [levelIndex]);

    // Тот же паттерн диапазона, что и в CharacterInfoPage.jsx: «с предыдущего»
    // — [levelIndex-1, levelIndex), «с начала» — [0, levelIndex). Раньше здесь
    // был отдельный useEffect, который для isRangeFromPrevious сначала искал
    // prevAscIndex (последний индекс levelSteps, оканчивающийся на '+'), а
    // затем всё равно считал только i === levelIndex — то есть prevAscIndex
    // ни на что не влиял, это был мёртвый код, отличавшийся от простого и
    // рабочего startLevelIndex-подхода в характерной версии без всякой
    // смысловой причины. calculateWeaponMaterials уже умеет считать диапазон
    // [from, to) — используем её вместо параллельной локальной копии.
    const calculatedMaterials = useMemo(() => {
        const startIndex = isRangeFromPrevious ? levelIndex - 1 : 0;
        return calculateWeaponMaterials(weapon, { levelRange: { from: startIndex, to: levelIndex } });
    }, [weapon, levelIndex, isRangeFromPrevious]);

    const baseAtk = useMemo(() => {
        if (!weapon?.base_attack_curve) return 0;
        const curve = typeof weapon.base_attack_curve === 'string'
            ? attackCurves[weapon.base_attack_curve]
            : weapon.base_attack_curve;
        if (!curve) return 0;
        return Math.round(interpolateStatAtLevel(curve, numericLevel));
    }, [weapon, numericLevel]);

    const subStatValue = useMemo(() => {
        if (!weapon?.main_stat?.stat || !weapon.main_stat.curve) return '0';
        const statType = weapon.main_stat.stat;
        const curveName = weapon.main_stat.curve;

        if (!secondaryStatCurves[statType] || !secondaryStatCurves[statType][curveName]) return '0';

        const curve = secondaryStatCurves[statType][curveName];
        const rawValue = interpolateStatAtLevel(curve, numericLevel);
        
        const isPercent = ![STATS.ATK, STATS.HP, STATS.DEF, STATS.ELEM_MASTERY].includes(statType);

        return isPercent ? `${rawValue.toFixed(1)}%` : Math.round(rawValue);
    }, [weapon, numericLevel]);

    const formattedPassiveDescription = useMemo(() => {
        const rawDesc = weaponLocale.passiveDescription;
        if (!rawDesc) return '';
        if (!weapon?.passive || weapon.passive.length === 0) return rawDesc;

        const passiveValues = weapon.passive[refinementLevel - 1];
        if (!passiveValues) return rawDesc;

        let desc = rawDesc;
        passiveValues.forEach((value, index) => {
            const placeholder = new RegExp(`\\{${index}\\}`, 'g');
            desc = desc.replace(placeholder, `<strong>${value}</strong>`);
        });

        return desc;
    }, [weapon, weaponLocale.passiveDescription, refinementLevel]);

    const currentPage = location.pathname.split('/').pop();

    return (
        <WeaponInfoPageView 
            t={t}
            weapon={weapon}
            weaponLocale={weaponLocale}
            baseAtk={baseAtk}
            subStatValue={subStatValue}
            displayLevel={displayLevel}
            levelIndex={levelIndex}
            levelSteps={levelSteps}
            refinementLevel={refinementLevel}
            formattedPassiveDescription={formattedPassiveDescription}
            calculatedMaterials={calculatedMaterials}
            isRangeFromPrevious={isRangeFromPrevious}
            onLevelChange={setLevelIndex}
            onRefinementChange={setRefinementLevel}
            onIsRangeFromPreviousChange={setIsRangeFromPrevious}
            currentPage={currentPage}
        />
    )
}

export default WeaponInfoPage;
