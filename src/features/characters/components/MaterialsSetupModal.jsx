
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Helper functions to determine levels based on a range slider
function getCustomNumber(value) {
    const val = parseInt(value);
    if (val >= 70) return 90;
    if (val >= 60) return 80;
    if (val >= 50) return 70;
    if (val >= 40) return 60;
    if (val >= 30) return 50;
    if (val >= 20) return 40;
    if (val >= 10) return 20;
    return 1;
}

function getMaxLevel(rangeVal) {
    const val = parseInt(rangeVal);
    if (val >= 70) return 10;
    if (val >= 60) return 8;
    if (val >= 50) return 6;
    if (val >= 40) return 4;
    if (val >= 30) return 2;
    return 1;
}

const MaterialsSetupModal = ({ character, onClose, onBack }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [rangeVal, setRangeVal] = useState(0);
    const [level, setLevel] = useState(1);
    const [attackLevel, setAttackLevel] = useState(1);
    const [skillLevel, setSkillLevel] = useState(1);
    const [burstLevel, setBurstLevel] = useState(1);

    const handleRangeChange = (e) => {
        const newRangeVal = parseInt(e.target.value);
        setRangeVal(newRangeVal);
        const newLevel = getCustomNumber(newRangeVal);
        setLevel(newLevel);

        const maxTalentLevel = getMaxLevel(newRangeVal);
        if (attackLevel > maxTalentLevel) setAttackLevel(maxTalentLevel);
        if (skillLevel > maxTalentLevel) setSkillLevel(maxTalentLevel);
        if (burstLevel > maxTalentLevel) setBurstLevel(maxTalentLevel);
    };

    const handleTalentChange = (talent, operation) => {
        const maxLevel = getMaxLevel(rangeVal);
        const setters = { attack: setAttackLevel, skill: setSkillLevel, burst: setBurstLevel };
        const values = { attack: attackLevel, skill: skillLevel, burst: burstLevel };

        let currentValue = values[talent];
        if (operation === 'increment' && currentValue < maxLevel) {
            setters[talent](currentValue + 1);
        } else if (operation === 'decrement' && currentValue > 1) {
            setters[talent](currentValue - 1);
        }
    };

    const handleContinue = () => {
        const characterId = character.id.toLowerCase();
        const dataToSave = {
            charName: character.localization[i18n.language]?.name || character.localization.en.name,
            charKey: character.id,
            rangeVal,
            level,
            attackLevel,
            skillLevel,
            explosionLevel: burstLevel,
            timestamp: Date.now(),
            characterData: character,
            lang: i18n.language,
        };
        localStorage.setItem('characterLevelData', JSON.stringify(dataToSave));
        // The following two are likely for backward compatibility with the old JS code
        localStorage.setItem('characterData', JSON.stringify(dataToSave));
        localStorage.setItem('selectedCharacter', JSON.stringify({ key: character.id, data: character, lang: i18n.language }));

        navigate(`/characters/${characterId}/mat`);
        onClose(); // Close the modal after navigation
    };

    return (
        <div className="materials-setup-modal" onClick={onClose}>
            <div className="modal-content bg-d out-d br-6 p-3 c-l" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header b-l p-2 g-2">
                    <img loading="lazy" src={`/${character.avatar_icon}`} alt={character.localization[i18n.language]?.name} />
                    <h3>{`${character.localization[i18n.language]?.name} - ${t('talentsModal.title')}`}</h3>
                    <button className="close-btn2" onClick={onClose}><svg><use href="#icon-close"></use></svg></button>
                </div>
                <div className="sec">
                    <article className="level f-c">
                        <div className="level-text f-r jc-sb">
                            <h2>{t('talentsModal.characterLevel')}</h2>
                            <h2 className="current-level-display">{level}</h2>
                        </div>
                        <div className="range f-r">
                            <button onClick={() => handleRangeChange({ target: { value: Math.max(0, rangeVal - 10) } })}><svg><use href="#icon-minus"></use></svg></button>
                            <div>
                                <input type="range" min="0" max="70" value={rangeVal} step="10" onChange={handleRangeChange} />
                            </div>
                            <button onClick={() => handleRangeChange({ target: { value: Math.min(70, rangeVal + 10) } })}><svg><use href="#icon-plus"></use></svg></button>
                        </div>
                        <div className="basic_stat">
                            <h2>{t('talentsModal.talents')}</h2>
                            <TalentControlSection talent="attack" level={attackLevel} character={character} onLevelChange={handleTalentChange} />
                            <TalentControlSection talent="skill" level={skillLevel} character={character} onLevelChange={handleTalentChange} />
                            <TalentControlSection talent="burst" level={burstLevel} character={character} onLevelChange={handleTalentChange} />
                        </div>
                    </article>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', padding: '20px', borderTop: '1px solid #eee' }}>
                    <button onClick={onBack} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '5px', cursor: 'pointer' }}>
                        {t('talentsModal.backButton')}
                    </button>
                    <button onClick={handleContinue} style={{ background: '#2196F3', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {t('talentsModal.continueButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const TalentControlSection = ({ talent, level, character, onLevelChange }) => {
    const { t, i18n } = useTranslation();
    const talentName = character.localization[i18n.language]?.[`talent_${talent}_name`] || `Talent ${talent}`;
    const talentIcon = character.talents?.[talent]?.icon;

    return (
        <div className="section" data-group={talent}>
            {talentIcon && (
                <div id={`char-${talent}-icon`}>
                    <img loading="lazy" src={`/${talentIcon}`} alt={`${talent} icon`} />
                </div>
            )}
            <div className="hp_icon">
                <p>{t(`talentsModal.${talent}`)}</p>
                <h3>{talentName}</h3>
            </div>
            <div className="level-group">
                <button className="arrow left" onClick={() => onLevelChange(talent, 'decrement')}>&lt;</button>
                <span className="level-value">{level}</span>
                <button className="arrow right" onClick={() => onLevelChange(talent, 'increment')}>&gt;</button>
            </div>
        </div>
    );
};

export default MaterialsSetupModal;

