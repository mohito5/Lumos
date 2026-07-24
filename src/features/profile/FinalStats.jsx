
import React from 'react';
import { useTranslation } from 'react-i18next';
import { STATS } from '../../app/stats';

const StatRow = ({ label, value, isPercent, lang }) => {
    const options = isPercent ? { style: 'percent', minimumFractionDigits: 1 } : { maximumFractionDigits: 0 };
    const displayValue = isPercent ? value / 100 : value;
    
    const formattedValue = new Intl.NumberFormat(lang, options).format(isNaN(displayValue) ? 0 : displayValue);

    return (
        <div className="stat-row">
            <span className="stat-label">{label}</span>
            <span className="stat-value">{formattedValue}</span>
        </div>
    );
};

const FinalStats = ({ stats, statNames }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    if (!statNames || !stats || Object.keys(statNames).length === 0) {
        return <div className="final-stats-container">{t('common.loading')}</div>;
    }

    const statMapping = [
        { key: STATS.HP, label: statNames[STATS.HP], isPercent: false },
        { key: STATS.ATK, label: statNames[STATS.ATK], isPercent: false },
        { key: STATS.DEF, label: statNames[STATS.DEF], isPercent: false },
        { key: STATS.ELEMENTAL_MASTERY, label: statNames[STATS.ELEMENTAL_MASTERY], isPercent: false },
        { key: STATS.ENERGY_RECHARGE, label: statNames[STATS.ENERGY_RECHARGE], isPercent: true },
        { key: STATS.CRIT_RATE, label: statNames[STATS.CRIT_RATE], isPercent: true },
        { key: STATS.CRIT_DMG, label: statNames[STATS.CRIT_DMG], isPercent: true },
        { key: 'critValue', label: t('calculator.critValue'), isPercent: false },
        { key: STATS.HEALING_BONUS, label: statNames[STATS.HEALING_BONUS], isPercent: true },
    ];

    const elementalStats = [
        STATS.PYRO_DMG,
        STATS.HYDRO_DMG,
        STATS.ELECTRO_DMG,
        STATS.CRYO_DMG,
        STATS.ANEMO_DMG,
        STATS.GEO_DMG,
        STATS.DENDRO_DMG,
        STATS.PHYSICAL_DMG,
    ];

    return (
        <div className="final-stats-container">
            <div className="main-stats">
                {statMapping.map(stat => (
                    <StatRow
                        key={stat.key}
                        label={stat.label}
                        value={stats?.[stat.key] ?? 0}
                        isPercent={stat.isPercent}
                        lang={lang}
                    />
                ))}
            </div>
            <div className="elemental-bonuses">
                <h4>{t('calculator.elementalBonuses')}</h4>
                {elementalStats.map(statKey => (
                    <StatRow
                        key={statKey}
                        label={statNames[statKey]}
                        value={stats?.[statKey] ?? 0}
                        isPercent={true}
                        lang={lang}
                    />
                ))}
            </div>
        </div>
    );
};

export default FinalStats;
