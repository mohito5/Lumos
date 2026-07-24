
import i18n from '../../core/i18n/i18n-config';
import allArtifactSets from '../../data/artifacts';
import { artifactStatsData } from '../../data/artifact-stats';
import { attackCurves, secondaryStatCurves } from '../../data/weapon-stats-curves';
import { STATS } from '../../app/stats';
import { LEVEL_MILESTONES } from '../../app/constants';

const artifactsData = allArtifactSets.reduce((acc, set) => {
    acc[set.id] = set;
    return acc;
}, {});

export const getStatAtLevel = (statArray, levelSliderIndex) => {
    if (!statArray || statArray.length === 0) return 0;
    
    const index = Math.min(levelSliderIndex, statArray.length - 1);
    
    return statArray[index];
};


export const getStatDisplayName = (stat) => {
    const t = i18n.t;
    const statNames = {
        [STATS.HP]: t('character.hp', { ns: 'ui', defaultValue: 'HP' }),
        [STATS.ATK]: t('character.attack', { ns: 'ui', defaultValue: 'ATK' }),
        [STATS.DEF]: t('character.defense', { ns: 'ui', defaultValue: 'DEF' }),
        [STATS.HP_PERCENT]: t('character.hp', { ns: 'ui', defaultValue: 'HP' }) + '%',
        [STATS.ATK_PERCENT]: t('character.attack', { ns: 'ui', defaultValue: 'ATK' }) + '%',
        [STATS.DEF_PERCENT]: t('character.defense', { ns: 'ui', defaultValue: 'DEF' }) + '%',
        [STATS.ELEMENTAL_MASTERY]: t('calculator.elementalMastery', { ns: 'ui', defaultValue: 'Elemental Mastery' }),
        [STATS.ENERGY_RECHARGE]: t('calculator.energyRecharge', { ns: 'ui', defaultValue: 'Energy Recharge' }),
        [STATS.CRIT_RATE]: t('calculator.critRate', { ns: 'ui', defaultValue: 'CRIT Rate' }),
        [STATS.CRIT_DMG]: t('calculator.critDmg', { ns: 'ui', defaultValue: 'CRIT DMG' }),
        [STATS.HEALING_BONUS]: t('calculator.healingBonus', { ns: 'ui', defaultValue: 'Healing Bonus' }),
        [STATS.PYRO_DMG]: t('calculator.pyroDmg', { ns: 'ui', defaultValue: 'Pyro DMG Bonus' }),
        [STATS.HYDRO_DMG]: t('calculator.hydroDmg', { ns: 'ui', defaultValue: 'Hydro DMG Bonus' }),
        [STATS.ELECTRO_DMG]: t('calculator.electroDmg', { ns: 'ui', defaultValue: 'Electro DMG Bonus' }),
        [STATS.CRYO_DMG]: t('calculator.cryoDmg', { ns: 'ui', defaultValue: 'Cryo DMG Bonus' }),
        [STATS.ANEMO_DMG]: t('calculator.anemoDmg', { ns: 'ui', defaultValue: 'Anemo DMG Bonus' }),
        [STATS.GEO_DMG]: t('calculator.geoDmg', { ns: 'ui', defaultValue: 'Geo DMG Bonus' }),
        [STATS.DENDRO_DMG]: t('calculator.dendroDmg', { ns: 'ui', defaultValue: 'Dendro DMG Bonus' }),
        [STATS.PHYSICAL_DMG]: t('calculator.physicalDmg', { ns: 'ui', defaultValue: 'Physical DMG Bonus' })
    };
    return statNames[stat] || stat;
};

export const parseSubstatValue = (value, statType) => {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string') {
        const numericalValue = parseFloat(value.replace('%', '').trim());
        return isNaN(numericalValue) ? 0 : numericalValue;
    }
    return 0;
};

const findRolls = (target, numRolls, possibleValues, memo) => {
    const tolerance = 0.05;
    const key = `${target.toFixed(2)}|${numRolls}`;
    
    if (key in memo) {
        return memo[key];
    }
    
    if (numRolls === 1) {
        const result = possibleValues.some(val => Math.abs(target - val) < tolerance);
        memo[key] = result;
        return result;
    }
    
    for (const rollValue of possibleValues) {
        if (target > rollValue) {
            if (findRolls(target - rollValue, numRolls - 1, possibleValues, memo)) {
                memo[key] = true;
                return true;
            }
        }
    }

    memo[key] = false;
    return false;
};

export const validateSubstatValue = (statType, value, rarity) => {
    if (!statType || value === '' || value === null) {
        return { isValid: true, rolls: 0 };
    }

    const effectiveRarity = rarity || '5';

    const parsedValue = parseSubstatValue(value, statType);
    if (isNaN(parsedValue) || parsedValue <= 0) {
        return { isValid: parsedValue === 0, rolls: 0 };
    }

    const possibleRollValues = artifactStatsData.substatRollsByRarity[effectiveRarity]?.[statType];

    if (!possibleRollValues || possibleRollValues.length === 0) {
        return { isValid: false, rolls: 0 };
    }
    
    const memo = {};

    for (let numRolls = 6; numRolls >= 1; numRolls--) {
        if (findRolls(parsedValue, numRolls, possibleRollValues, memo)) {
            return { isValid: true, rolls: numRolls };
        }
    }

    return { isValid: false, rolls: 0 };
};

export const formatNumber = (value, lang = 'en', options = {}) => {
    if (isNaN(value)) {
        return '0';
    }
    return new Intl.NumberFormat(lang, options).format(value);
};

export const calculateFinalStats = ({ character, weapon, artifacts, level, levelSliderIndex, weaponLevelSliderIndex }) => {
    if (!character || !character.baseStats || !Array.isArray(character.baseStats[STATS.HP]) || character.baseStats[STATS.HP].length === 0) {
        return {
            finalStats: {
                [STATS.HP]: 0,
                [STATS.ATK]: 0,
                [STATS.DEF]: 0,
                [STATS.ELEMENTAL_MASTERY]: 0,
                [STATS.ENERGY_RECHARGE]: 100,
                [STATS.CRIT_RATE]: 5,
                [STATS.CRIT_DMG]: 50,
                critValue: 60,
                [STATS.HEALING_BONUS]: 0,
                [STATS.PYRO_DMG]: 0,
                [STATS.HYDRO_DMG]: 0,
                [STATS.ELECTRO_DMG]: 0,
                [STATS.CRYO_DMG]: 0,
                [STATS.ANEMO_DMG]: 0,
                [STATS.GEO_DMG]: 0,
                [STATS.DENDRO_DMG]: 0,
                [STATS.PHYSICAL_DMG]: 0,
            },
            bonuses: []
        };
    }

    const accumulatedStats = {
        [STATS.HP]: 0,
        [STATS.HP_PERCENT]: 0,
        [STATS.ATK]: 0,
        [STATS.ATK_PERCENT]: 0,
        [STATS.DEF]: 0,
        [STATS.DEF_PERCENT]: 0,
        [STATS.CRIT_RATE]: 5.0,
        [STATS.CRIT_DMG]: 50.0,
        [STATS.ENERGY_RECHARGE]: 100.0,
        [STATS.ELEMENTAL_MASTERY]: 0,
        [STATS.HEALING_BONUS]: 0,
        [STATS.PYRO_DMG]: 0,
        [STATS.HYDRO_DMG]: 0,
        [STATS.ELECTRO_DMG]: 0,
        [STATS.CRYO_DMG]: 0,
        [STATS.ANEMO_DMG]: 0,
        [STATS.GEO_DMG]: 0,
        [STATS.DENDRO_DMG]: 0,
        [STATS.PHYSICAL_DMG]: 0,
    };

    const charLevelIndex = levelSliderIndex !== undefined ? levelSliderIndex : 13;
    const weaponIndex = weaponLevelSliderIndex !== undefined ? weaponLevelSliderIndex : 13;

    const baseCharHP = getStatAtLevel(character.baseStats[STATS.HP], charLevelIndex);
    const baseCharATK = getStatAtLevel(character.baseStats[STATS.ATK], charLevelIndex);
    const baseCharDEF = getStatAtLevel(character.baseStats[STATS.DEF], charLevelIndex);

    let baseWeaponATK = 0;
    if (weapon?.base_attack_curve) {
        const curve = Array.isArray(weapon.base_attack_curve)
            ? weapon.base_attack_curve
            : attackCurves[weapon.base_attack_curve];

        if (curve && curve.length > weaponIndex) {
            baseWeaponATK = curve[weaponIndex];
        }
    }
    
    const totalBaseHP = baseCharHP;
    const totalBaseATK = baseCharATK + baseWeaponATK;
    const totalBaseDEF = baseCharDEF;

    const addStat = (statType, value) => {
        if (statType && value !== undefined && value !== null && accumulatedStats.hasOwnProperty(statType)) {
            accumulatedStats[statType] += Number(value);
        }
    };

    if (weapon && weapon.main_stat) {
        const statType = weapon.main_stat.stat;
        const curveType = weapon.main_stat.curve;
        
        if (statType && curveType && secondaryStatCurves[statType] && secondaryStatCurves[statType][curveType]) {
            const curve = secondaryStatCurves[statType][curveType];
            if (curve && curve.length > weaponIndex) {
                const value = curve[weaponIndex];
                addStat(statType, value);
            }
        }
    }
    
    Object.values(artifacts).forEach(art => {
        if (!art) return;

        const mainStatValue = artifactStatsData.mainStatValuesByRarity[art.rarity || '5']?.[art.mainStat]?.[art.level] || 0;
        addStat(art.mainStat, mainStatValue);

        art.substats.forEach(sub => {
            const subValue = parseFloat(sub.value) || 0;
            addStat(sub.type, subValue);
        });
    });
    
    const setCounts = Object.values(artifacts).reduce((acc, art) => {
        if(art) acc[art.set] = (acc[art.set] || 0) + 1;
        return acc;
    }, {});

    Object.entries(setCounts).forEach(([setKey, count]) => {
        const setData = artifactsData[setKey];
        if(!setData || !setData.bonuses) return;

        if (count >= 2 && setData.bonuses[2]) {
            addStat(setData.bonuses[2].stat, setData.bonuses[2].value);
        }
        if (count >= 4 && setData.bonuses[4]) {
            addStat(setData.bonuses[4].stat, setData.bonuses[4].value);
        }
    });

    const finalHP = totalBaseHP * (1 + accumulatedStats[STATS.HP_PERCENT] / 100) + accumulatedStats[STATS.HP];
    const finalATK = totalBaseATK * (1 + accumulatedStats[STATS.ATK_PERCENT] / 100) + accumulatedStats[STATS.ATK];
    const finalDEF = totalBaseDEF * (1 + accumulatedStats[STATS.DEF_PERCENT] / 100) + accumulatedStats[STATS.DEF];

    return {
        finalStats: {
            [STATS.HP]: finalHP, 
            [STATS.ATK]: finalATK, 
            [STATS.DEF]: finalDEF,
            [STATS.ELEMENTAL_MASTERY]: accumulatedStats[STATS.ELEMENTAL_MASTERY],
            [STATS.ENERGY_RECHARGE]: accumulatedStats[STATS.ENERGY_RECHARGE],
            [STATS.CRIT_RATE]: accumulatedStats[STATS.CRIT_RATE],
            [STATS.CRIT_DMG]: accumulatedStats[STATS.CRIT_DMG],
            critValue: (accumulatedStats[STATS.CRIT_RATE] * 2) + accumulatedStats[STATS.CRIT_DMG],
            [STATS.HEALING_BONUS]: accumulatedStats[STATS.HEALING_BONUS],
            [STATS.PYRO_DMG]: accumulatedStats[STATS.PYRO_DMG],
            [STATS.HYDRO_DMG]: accumulatedStats[STATS.HYDRO_DMG],
            [STATS.ELECTRO_DMG]: accumulatedStats[STATS.ELECTRO_DMG],
            [STATS.CRYO_DMG]: accumulatedStats[STATS.CRYO_DMG],
            [STATS.ANEMO_DMG]: accumulatedStats[STATS.ANEMO_DMG],
            [STATS.GEO_DMG]: accumulatedStats[STATS.GEO_DMG],
            [STATS.DENDRO_DMG]: accumulatedStats[STATS.DENDRO_DMG],
            [STATS.PHYSICAL_DMG]: accumulatedStats[STATS.PHYSICAL_DMG],
        },
        bonuses: []
    };
};
