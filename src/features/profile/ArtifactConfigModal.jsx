
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { validateSubstatValue } from '../../shared/lib/calculatorUtils';

const SubstatInput = ({ index, substat, onSubstatChange, onSubstatDelete, validationResult, substatOptions, statNames }) => {
    const { t } = useTranslation();
    const result = validationResult || { isValid: true, rolls: 0 };

    const handleValueChange = (e) => {
        onSubstatChange(index, { ...substat, value: e.target.value });
    };

    const handleTypeChange = (e) => {
        onSubstatChange(index, { ...substat, type: e.target.value });
    };

    return (
        <div className={`substat-row ${!result.isValid ? 'invalid' : ''}`}>
            <select value={substat.type} onChange={handleTypeChange}>
                <option value="">{t('calculator.selectSubstat')}</option>
                {substatOptions.map(stat => (
                    <option key={stat} value={stat}>{statNames[stat]}</option>
                ))}
            </select>
            <div className="substat-input-wrapper">
                <input
                    type="text"
                    placeholder={t('calculator.value')}
                    value={substat.value}
                    onChange={handleValueChange}
                />
                {result.isValid && result.rolls > 1 && (
                    <span className="roll-indicator">x{result.rolls - 1}</span>
                )}
                {!result.isValid && substat.value && (
                    <span className="invalid-indicator" title={t('calculator.invalidValue')}>!</span>
                )}
            </div>
            <button onClick={() => onSubstatDelete(index)}>&times;</button>
        </div>
    );
};


const ArtifactConfigModal = ({ isOpen, onClose, onSave, slotType, selectedSet, currentArtifact, allArtifactStats, statNames }) => {
    const { t } = useTranslation();

    const possibleMainStats = allArtifactStats.possibleMainStats[slotType];
    const substatOptions = Object.keys(allArtifactStats.substatTiers);

    const [rarity, setRarity] = useState(currentArtifact ? currentArtifact.rarity : selectedSet.rarity[selectedSet.rarity.length - 1]);
    const [level, setLevel] = useState(currentArtifact ? currentArtifact.level : 0);
    const [mainStat, setMainStat] = useState(currentArtifact ? currentArtifact.mainStat : possibleMainStats[0]);
    const [substats, setSubstats] = useState(currentArtifact ? currentArtifact.substats : Array(4).fill({ type: '', value: '' }));
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);
    const [validationResults, setValidationResults] = useState(Array(4).fill({ isValid: true, rolls: 0 }));

    useEffect(() => {
        if (currentArtifact) {
            setRarity(currentArtifact.rarity);
            setLevel(currentArtifact.level);
            setMainStat(currentArtifact.mainStat);
            const currentSubstats = currentArtifact.substats || [];
            const paddedSubstats = [...currentSubstats, ...Array(4 - currentSubstats.length).fill({ type: '', value: '' })];
            setSubstats(paddedSubstats);
        } else {
            setRarity(selectedSet.rarity[selectedSet.rarity.length - 1]);
            setLevel(0);
            setMainStat(possibleMainStats[0]);
            setSubstats(Array(4).fill({ type: '', value: '' }));
        }
    }, [currentArtifact, isOpen, selectedSet, possibleMainStats]);

    useEffect(() => {
        const newValidationResults = substats.map(substat => 
            validateSubstatValue(substat.type, substat.value, rarity)
        );
        setValidationResults(newValidationResults);

        const hasInvalidSubstat = newValidationResults.some(result => !result?.isValid);
        const hasIncompleteSubstat = substats.some(sub => sub.type && sub.value.toString().trim() === '');
        setIsSaveDisabled(hasInvalidSubstat || hasIncompleteSubstat);

    }, [substats, rarity]);

    const handleSave = () => {
        const artifact = {
            set: selectedSet.id,
            setName: selectedSet.name,
            slot: slotType,
            rarity,
            level,
            mainStat,
            substats: substats.filter(s => s.type && s.value.toString().trim() !== '').map(s => ({...s, value: parseFloat(s.value)}))
        };
        onSave(artifact);
    };

    const handleSubstatChange = (index, newSubstat) => {
        const newSubstats = [...substats];
        newSubstats[index] = newSubstat;
        setSubstats(newSubstats);
    };

    const handleSubstatDelete = (index) => {
        const newSubstats = [...substats];
        newSubstats.splice(index, 1);
        newSubstats.push({ type: '', value: '' });
        setSubstats(newSubstats);
    };

    if (!isOpen) return null;

    return (
        <div className="calculator-modal overlay open">
            <div className="calculator-modal-content background-bill p-2 radius-4">
                 <div className="modal-header">
                    <h2>{selectedSet.name}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                     <div className="artifact-config-form">
                        <div className="config-row">
                            <label>{t('calculator.rarity')}</label>
                            <select value={rarity} onChange={e => setRarity(parseInt(e.target.value))}>
                                {selectedSet.rarity.map(r => <option key={r} value={r}>{'★'.repeat(r)}</option>)}
                            </select>
                        </div>
                        <div className="config-row">
                            <label>{t('calculator.level')}</label>
                            <input type="range" min="0" max={rarity * 4} value={level} onChange={e => setLevel(parseInt(e.target.value))} />
                            <span>+{level}</span>
                        </div>
                        <div className="config-row">
                            <label>{t('calculator.mainStat')}</label>
                            <select value={mainStat} onChange={e => setMainStat(e.target.value)}>
                                {possibleMainStats.map(stat => (
                                    <option key={stat} value={stat}>{statNames[stat]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="substats-editor">
                            <h4>{t('calculator.substats')}</h4>
                            {substats.map((substat, index) => (
                                <SubstatInput
                                    key={index}
                                    index={index}
                                    substat={substat}
                                    onSubstatChange={handleSubstatChange}
                                    onSubstatDelete={handleSubstatDelete}
                                    validationResult={validationResults[index]}
                                    substatOptions={substatOptions}
                                    statNames={statNames}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={handleSave} disabled={isSaveDisabled}>{t('common.save')}</button>
                </div>
            </div>
        </div>
    );
};

export default ArtifactConfigModal;
