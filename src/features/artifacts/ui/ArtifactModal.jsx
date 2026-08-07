import React, { useState, useEffect, useMemo } from 'react';
import { artifactStatsData } from '../../../data/artifact-stats.js';
import { getPossibleSubstats } from '../../../data/artifactUtils.js';
import { useTranslation } from 'react-i18next';
import { getStatDisplayName } from '../../../shared/lib/calculatorUtils.js';
import { useBodyScrollLock } from '../../../shared/lib/hooks/useBodyScrollLock.js';

import '../../../core/styles/components/modal.css';

const memoizedSums = new Map();

const generateAllPossibleSums = (tiers) => {
    const tierKey = tiers.join(',');
    if (memoizedSums.has(tierKey)) {
        return memoizedSums.get(tierKey);
    }

    const allRolls = new Map();
    allRolls.set(1, new Set(tiers));

    for (let n = 2; n <= 6; n++) {
        const prevSums = allRolls.get(n - 1);
        const newSums = new Set();
        for (const prevSum of prevSums) {
            for (const tier of tiers) {
                newSums.add(parseFloat((prevSum + tier).toFixed(2)));
            }
        }
        allRolls.set(n, newSums);
    }

    memoizedSums.set(tierKey, allRolls);
    return allRolls;
};

const pieceKeys = ['flower', 'plume', 'sands', 'goblet', 'circlet'];

const getPieceIcon = (pieceType) => {
    const icons = {
        'flower': '🌸',
        'plume': '🪶',
        'sands': '⏳',
        'goblet': '🍷',
        'circlet': '👑'
    };
    return icons[pieceType] || '❓';
};

const getPossibleMainStats = (slot) => {
    return artifactStatsData.possibleMainStats[slot] || [];
};

const maxLevels = { 5: 20, 4: 16, 3: 12, 2: 8, 1: 4 };

const ArtifactModal = ({ artifactSet, onClose, onNavigate }) => {
    const { t } = useTranslation();
    const [currentPieceId, setCurrentPieceId] = useState('flower');
    const [currentLevel, setCurrentLevel] = useState(0);
    const [mainStatIndex, setMainStatIndex] = useState(0);
    const [showDescriptionView, setShowDescriptionView] = useState(false);
    const [currentRarity, setCurrentRarity] = useState(null);

    const possibleSubstats = useMemo(() => getPossibleSubstats(), []);

    useEffect(() => {
        if (artifactSet) {
            const highestRarity = Math.max(...artifactSet.rarity);
            setCurrentRarity(highestRarity);
            setCurrentPieceId('flower');
            setCurrentLevel(0);
            setMainStatIndex(0);
            setShowDescriptionView(false);
        }
    }, [artifactSet]);
    
    const maxLevel = useMemo(() => (currentRarity ? maxLevels[currentRarity] : 20), [currentRarity]);

    useBodyScrollLock(!!artifactSet);

    if (!artifactSet) return null;

    const setName = t(`artifacts:${artifactSet.id}.name`);

    const possibleMainStats = useMemo(() => getPossibleMainStats(currentPieceId), [currentPieceId]);
    const currentMainStat = possibleMainStats[mainStatIndex];

    const mainStatValue = useMemo(() => {
        if (!currentMainStat || !currentRarity || !artifactSet) return 0;

        const value = artifactStatsData.mainStatValuesByRarity?.[currentRarity]?.[currentMainStat]?.[currentLevel] || 0;
        
        return currentMainStat.includes('%') || ['critRate', 'critDmg', 'healingBonus'].includes(currentMainStat) 
            ? value.toFixed(1) 
            : Math.round(value);
    }, [currentRarity, currentMainStat, currentLevel]);

    const handleLevelChange = (e) => setCurrentLevel(parseInt(e.target.value, 10));

    const handleLevelButtonClick = (increment) => {
        setCurrentLevel(prev => {
            const newLevel = prev + increment;
            if (newLevel >= 0 && newLevel <= maxLevel) return newLevel;
            return prev;
        });
    };

    const handleRarityChange = (newRarity) => {
        if (currentRarity !== newRarity) {
            setCurrentRarity(newRarity);
            const newMaxLevel = maxLevels[newRarity];
            if (currentLevel > newMaxLevel) setCurrentLevel(newMaxLevel);
        }
    };
    
    const handleMainStatChange = (direction) => {
        setMainStatIndex(prevIndex => {
            const newIndex = prevIndex + direction;
            if (newIndex < 0) return possibleMainStats.length - 1;
            if (newIndex >= possibleMainStats.length) return 0;
            return newIndex;
        });
    };
    
    const handlePieceChange = (pieceId) => {
        setCurrentPieceId(pieceId);
        setMainStatIndex(0);
    }

    const renderMainStatSection = () => {
        if (!currentPieceId) return null;
        const value = mainStatValue;
        return (
            <div className="main-stat-section">
                <h4>{t('artifacts.mainStat')}</h4>
                <div className="main-stat-selector">
                    <button onClick={() => handleMainStatChange(-1)} disabled={possibleMainStats.length <= 1}>&lt;</button>
                    <div className="main-stat-display">
                        <div className="stat-name">{getStatDisplayName(currentMainStat)}</div>
                        <div className="stat-value">{value}{currentMainStat && (currentMainStat.includes('%') || ['critRate', 'critDmg', 'healingBonus'].includes(currentMainStat)) ? '%': ''}</div>
                    </div>
                    <button onClick={() => handleMainStatChange(1)} disabled={possibleMainStats.length <= 1}>&gt;</button>
                </div>
            </div>
        )
    };

    const renderRollsInfo = () => {
        if (currentRarity !== 5) {
            return (
                <div className="substats-info-container">
                    <p>{t('artifacts.rollsInfoOnlyFor5Star')}</p>
                </div>
            );
        }

        const upgrades = Math.floor(currentLevel / 4);
        const maxRollsPerSubstat = 1 + upgrades;

        if (maxRollsPerSubstat < 1 && currentLevel < 4) return null;

        return (
            <div className="substats-info-container">
                <h4>{t('artifacts.possibleSubstatValues')}</h4>
                <p className="rolls-info-header" dangerouslySetInnerHTML={{ __html: t('artifacts.rollsInfoHeader', { level: currentLevel, upgrades, maxRollsPerSubstat }) }} />
                <div className="substat-roll-list-container">
                    {Object.entries(artifactStatsData.substatRollsByRarity[5] || {}).map(([stat, tiers]) => {
                        const isPercent = stat.includes('%') || ['critRate', 'critDmg'].includes(stat);
                        const format = (val) => isPercent ? val.toFixed(1) : Math.round(val);
                        const allPossibleSums = generateAllPossibleSums(tiers);

                        return (
                            <div key={stat} className="substat-roll-block">
                                <h5>{getStatDisplayName(stat)}</h5>
                                <dl>
                                    {Array.from({ length: maxRollsPerSubstat }, (_, i) => i + 1).map(n => {
                                        const sumsSet = allPossibleSums.get(n);
                                        if (!sumsSet) return null;

                                        const sortedValues = [...sumsSet].sort((a, b) => a - b);
                                        const formattedValues = sortedValues.map(v => format(v) + (isPercent ? '%' : ''));
                                        const displayString = formattedValues.join(' / ');
                                        
                                        return (
                                            <React.Fragment key={n}>
                                                <dt>{t('artifacts.rolls', { count: n })}</dt>
                                                <dd title={displayString}>{displayString}</dd>
                                            </React.Fragment>
                                        );
                                    })}
                                </dl>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderDescriptionView = () => (
        <div className="artifact-description-view">
            <button className="back-btn" onClick={() => setShowDescriptionView(false)}>← {t('buttons.back')}</button>
            <h3>{setName}</h3>
            <div className="bonuses-container">
                <div className="bonus-block">
                    <h4>{t('artifacts.2pieceBonus')}</h4>
                    <p>{t(`artifacts.${artifactSet.id}.2-piece`)}</p>
                </div>
                <div className="bonus-block">
                    <h4>{t('artifacts.4pieceBonus')}</h4>
                    <p>{t(`artifacts.${artifactSet.id}.4-piece`)}</p>
                </div>
            </div>
        </div>
    );
    
    const renderRaritySelector = () => (
        <div className="rarity-selector">
            {artifactSet.rarity
                .sort((a, b) => a - b)
                .map(r => (
                    <button 
                        key={r} 
                        className={`rarity-btn ${currentRarity === r ? 'active' : ''}`}
                        onClick={() => handleRarityChange(r)}
                    >
                        {'★'.repeat(r)}
                    </button>
            ))}
        </div>
    );

    const renderMainView = () => (
        <>
            <div className='flex gap-1 overflow-h' style={{ flex: 1, }}>
                <div className="artifact-pieces-sidebar gap-2 p-2 flex-c background-bill radius-4">
                    {pieceKeys.map(pieceId => (
                        <button
                            key={pieceId}
                            className={`piece-icon-btn radius-2 p-1 border ${currentPieceId === pieceId ? 'active' : ''}`}
                            onClick={() => handlePieceChange(pieceId)}
                            title={t(`artifact_pieces.${pieceId}`)}
                        >
                            {getPieceIcon(pieceId)}
                        </button>
                    ))}
                </div>
                <div className="artifact-piece-details background-bill radius-4 p-2 scrollable-y">
                    {currentPieceId && (
                        <>
                            <div className="piece-header">
                                <h3>{t(`artifacts:${artifactSet.id}.pieces.${currentPieceId}`)}</h3>
                                <p>{t(`artifact_pieces.${currentPieceId}`)}</p>
                            </div>
                            <div className="level-section">
                                <h4>{t('artifacts:artifactLevel')}</h4>
                                <div className="level-control">
                                    <button onClick={() => handleLevelButtonClick(-1)} disabled={currentLevel <= 0}>-</button>
                                    <input type="range" min="0" max={maxLevel} value={currentLevel} onChange={handleLevelChange} />
                                    <button onClick={() => handleLevelButtonClick(1)} disabled={currentLevel >= maxLevel}>+</button>
                                </div>
                                <span>{currentLevel}/{maxLevel}</span>
                            </div>
                            {renderMainStatSection()}
                            {renderRollsInfo()}
                        </>
                    )}
                </div>
            </div>
            <div className="artifact-modal-footer background-bill radius-4 p-2">
                <button onClick={() => onNavigate(-1)}>&lt; {t('buttons.prevSet')}</button>
                <button className="description-toggle-btn" onClick={() => setShowDescriptionView(true)}>{t('buttons.setBonus')}</button>
                <button onClick={() => onNavigate(1)}>{t('buttons.nextSet')} &gt;</button>
            </div>
        </>
    );

    return (
        <div className="modal overlay" onClick={onClose}>
            <div className="content-modal flex-c gap-1 color-pine artifact-modal radius-4" onClick={e => e.stopPropagation()}>
                 <div className="flex background-bill radius-4 p-2">
                    <div>
                        <h2>{setName}</h2>
                        {renderRaritySelector()}
                    </div>
                    <button className="modal-close-btn flex radius-4 p-1 border" onClick={onClose}>
                        <svg className='icon-sm'><use href='#icon-close-mini'></use></svg>
                    </button>
                </div>
                {showDescriptionView ? renderDescriptionView() : renderMainView()}
            </div>
        </div>
    );
};

export default ArtifactModal;
