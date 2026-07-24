
import { useTranslation } from 'react-i18next';
import allCharacters from '../../data/characters/index.js';
import weaponsData from '../../data/weapons/index.js';
import allArtifactSets from '../../data/artifacts/index.js';
import { artifactStatsData } from '../../data/artifact-stats.js';
import { substatTiers } from '../../data/calculatorData.js';
import { STATS } from '../../app/stats.js';
import { getStatDisplayName } from '../../core/utils/calculatorUtils.js';

const useCalculatorData = () => {
    const { t } = useTranslation();

    const characters = allCharacters.map(c => ({
        ...c,
        name: t(`characters.${c.id}`),
    }));

    const weapons = weaponsData.map(w => ({
        ...w,
        name: t(`weapons.${w.id}`),
    }));

    const artifactSets = allArtifactSets.map(a => ({
        ...a,
        name: t(`artifacts.${a.id}.name`),
        bonuses: {
            2: a.bonuses && a.bonuses[2] ? t(`artifacts.${a.id}.2-piece_bonus`) : undefined,
            4: a.bonuses && a.bonuses[4] ? t(`artifacts.${a.id}.4-piece_bonus`) : undefined,
        }
    }));
    
    const statNames = Object.keys(STATS).reduce((acc, key) => {
        acc[STATS[key]] = getStatDisplayName(STATS[key]);
        return acc;
    }, {});

    const allArtifactStats = {
        ...artifactStatsData,
        substatTiers,
    };

    return { 
        characters, 
        weapons, 
        artifactSets, 
        allArtifactStats,
        statNames
    };
};

export default useCalculatorData;
