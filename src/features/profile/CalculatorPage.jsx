import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './CalculatorPage.css';
import CalculatorPageView from './CalculatorPageView.jsx';
import useCalculatorData from './useCalculatorData.js';
import { useDataManager } from '../../hooks/useDataManager.js';
import { calculateFinalStats } from '../../core/utils/calculatorUtils.js';
import { LEVEL_MILESTONES as ASCENSION_LEVELS } from '../../app/constants.js';
import { getArtifactSaveData, getArtifactFromSave } from './calculatorPageUtils.js';

const DEFAULT_BUILD_DATA = {};

const CalculatorPage = () => {
    const { t } = useTranslation();
    const { buildId } = useParams();
    const { characters, weapons, artifactSets, allArtifactStats, statNames } = useCalculatorData();

    const [characterId, setCharacterId] = useState(buildId);
    const [character, setCharacter] = useState(null);
    const [weapon, setWeapon] = useState(null);
    const [artifacts, setArtifacts] = useState({ flower: null, plume: null, sands: null, goblet: null, circlet: null });
    const [finalStats, setFinalStats] = useState({});
    const [activeSetBonuses, setActiveSetBonuses] = useState([]);
    const [level, setLevel] = useState(ASCENSION_LEVELS[ASCENSION_LEVELS.length - 1]);
    const [levelSliderIndex, setLevelSliderIndex] = useState(ASCENSION_LEVELS.length - 1);
    const [weaponLevel, setWeaponLevel] = useState(ASCENSION_LEVELS[ASCENSION_LEVELS.length - 1]);
    const [weaponLevelSliderIndex, setWeaponLevelSliderIndex] = useState(ASCENSION_LEVELS.length - 1);
    // bn — необязательное пользовательское имя сборки. Раньше сборка всегда
    // подписывалась именем персонажа (см. CalculatorSaveCard.jsx) без
    // возможности переименовать — теперь можно, но поле необязательное:
    // пустое значение по-прежнему показывает имя персонажа (см. placeholder
    // в CalculatorPageView и фоллбэк в CalculatorSaveCard).
    const [buildName, setBuildName] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [isBuildLoaded, setIsBuildLoaded] = useState(false);

    useEffect(() => {
        setCharacterId(buildId);
        setIsBuildLoaded(false);
    }, [buildId]);

    const buildData = useMemo(() => ({
        ci: character?.id,
        cl: levelSliderIndex,
        wi: weapon?.id,
        wl: weaponLevelSliderIndex,
        bn: buildName || undefined,
        f: getArtifactSaveData(artifacts.flower),
        p: getArtifactSaveData(artifacts.plume),
        s: getArtifactSaveData(artifacts.sands),
        g: getArtifactSaveData(artifacts.goblet),
        c: getArtifactSaveData(artifacts.circlet),
    }), [character, levelSliderIndex, weapon, weaponLevelSliderIndex, artifacts, buildName]);

    const {
        saveExists,
        savedData,
        isLoading,
        saveData,
        deleteData
    } = useDataManager(characterId, 'calculate', buildData, DEFAULT_BUILD_DATA, isDirty, setIsDirty);

    useEffect(() => {
        if (savedData && Object.keys(savedData).length > 0 && !isBuildLoaded) {
            // Не savedData.ci — expandBuildData() в materialsCalculator.js специально
            // вырезает ci (как и i/lr/ar/sr/br/ui/lm/ts) из результата: функция писалась
            // для страниц персонажа/оружия, где id уже известен из URL и его не нужно
            // задваивать внутри buildData. Для калькулятора это тот же самый id — он же
            // characterId, полученный из :buildId маршрута (см. useEffect выше). Раньше
            // здесь читалось savedData.ci, оно всегда было undefined после раскрытия,
            // char не находился, и весь эффект молча выходил по `if (!char) return`,
            // так и не заполнив ни оружие, ни артефакты, ни остальное.
            const char = characters.find(c => c.id === characterId);
            if (!char) return;
            setCharacter(char);

            if (savedData.wi) {
                const wep = weapons.find(w => w.id === savedData.wi);
                setWeapon(wep);
            }

            const savedArtifacts = {
                flower: getArtifactFromSave(savedData.f, artifactSets, 'flower'),
                plume: getArtifactFromSave(savedData.p, artifactSets, 'plume'),
                sands: getArtifactFromSave(savedData.s, artifactSets, 'sands'),
                goblet: getArtifactFromSave(savedData.g, artifactSets, 'goblet'),
                circlet: getArtifactFromSave(savedData.c, artifactSets, 'circlet'),
            }

            setArtifacts(savedArtifacts);
            setBuildName(savedData.bn || '');

            if (savedData.cl) {
                setLevelSliderIndex(savedData.cl);
                setLevel(ASCENSION_LEVELS[savedData.cl]);
            }

            if (savedData.wl) {
                setWeaponLevelSliderIndex(savedData.wl);
                setWeaponLevel(ASCENSION_LEVELS[savedData.wl]);
            }
            setIsBuildLoaded(true);
        }
    }, [savedData, characters, weapons, artifactSets, isBuildLoaded, characterId]);

    useEffect(() => {
        const { finalStats, bonuses } = calculateFinalStats({ character, weapon, artifacts, level, levelSliderIndex, weaponLevel, weaponLevelSliderIndex });
        setFinalStats(finalStats || {});
        setActiveSetBonuses(bonuses || []);
    }, [character, weapon, artifacts, level, levelSliderIndex, weaponLevel, weaponLevelSliderIndex]);

    const handleCharacterSelect = (charId) => {
        setCharacterId(charId);
        const selectedChar = characters.find(c => c.id === charId);
        setCharacter(selectedChar);
        setWeapon(null);
        setArtifacts({ flower: null, plume: null, sands: null, goblet: null, circlet: null });
        setLevel(ASCENSION_LEVELS[ASCENSION_LEVELS.length - 1]);
        setLevelSliderIndex(ASCENSION_LEVELS.length - 1);
        setBuildName('');
        setIsBuildLoaded(false);
    };

    const handleLevelChange = (newLevel, newIndex) => {
        setLevel(newLevel);
        setLevelSliderIndex(newIndex);
    };

    const handleWeaponLevelChange = (newLevel, newIndex) => {
        setWeaponLevel(newLevel);
        setWeaponLevelSliderIndex(newIndex);
    };

    const handleWeaponSelect = (weaponId) => {
        const selectedWeapon = weapons.find(w => w.id === weaponId);
        setWeapon(selectedWeapon);
        setWeaponLevel(ASCENSION_LEVELS[ASCENSION_LEVELS.length - 1]);
        setWeaponLevelSliderIndex(ASCENSION_LEVELS.length - 1);
    };

    const handleArtifactSave = (slot, art) => {
        setArtifacts(prev => ({ ...prev, [slot]: art }));
    };

    const handleSaveBuild = () => {
        saveData();
    };

    const resetAll = () => {
        setCharacter(null);
        setWeapon(null);
        setArtifacts({ flower: null, plume: null, sands: null, goblet: null, circlet: null });
        setCharacterId(null);
        setBuildName('');
        setIsBuildLoaded(false);
    };

    return (
        <CalculatorPageView
            t={t}
            character={character}
            weapon={weapon}
            artifacts={artifacts}
            finalStats={finalStats}
            activeSetBonuses={activeSetBonuses}
            level={level}
            weaponLevel={weaponLevel}
            characters={characters}
            weapons={weapons}
            artifactSets={artifactSets}
            allArtifactStats={allArtifactStats}
            statNames={statNames}
            buildName={buildName}
            onBuildNameChange={setBuildName}
            saveExists={saveExists}
            isDirty={isDirty}
            isLoading={isLoading}
            onCharacterSelect={handleCharacterSelect}
            onLevelChange={handleLevelChange}
            onWeaponSelect={handleWeaponSelect}
            onWeaponLevelChange={handleWeaponLevelChange}
            onArtifactSave={handleArtifactSave}
            onSaveBuild={handleSaveBuild}
            onDeleteBuild={deleteData}
            onReset={resetAll}
        />
    );
};

export default CalculatorPage;
