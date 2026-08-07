
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArtifactSetModal from './ArtifactSetModal.jsx';
import ArtifactConfigModal from './ArtifactConfigModal.jsx';

const ArtifactSlot = ({ slotType, onSave, artifact, character, artifactSets, allArtifactStats, statNames }) => {
    const { t } = useTranslation();
    const [isSetModalOpen, setSetModalOpen] = useState(false);
    const [isConfigModalOpen, setConfigModalOpen] = useState(false);
    const [selectedSet, setSelectedSet] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSetSelect = (setId) => {
        const set = artifactSets.find(s => s.id === setId);
        setSelectedSet(set);
        setSetModalOpen(false);
        setConfigModalOpen(true);
    };

    const handleConfigSave = (configuredArtifact) => {
        onSave(slotType, configuredArtifact);
        setConfigModalOpen(false);
        setSelectedSet(null);
        setIsEditing(false);
    };

    const handleConfigClose = () => {
        setConfigModalOpen(false);
        setSelectedSet(null);
        setIsEditing(false);
    };

    const handleEdit = () => {
        if (!artifact) return;
        setIsEditing(true);
        // artifact.set может быть объектом (только что выбранный) или строкой id (из сейва)
        const setId = typeof artifact.set === 'object' ? artifact.set?.id : artifact.set;
        const set = artifactSets.find(s => s.id === setId);
        setSelectedSet(set);
        setConfigModalOpen(true);
    };

    const handleAdd = () => {
        if (!character) return;
        setIsEditing(false);
        setSetModalOpen(true);
    };

    const slotIcons = { flower: '🌸', plume: '🪶', sands: '⏳', goblet: '🍶', circlet: '👑' };

    return (
        <div className={`artifact-slot ${artifact ? 'filled' : ''}`}>
            <div className="slot-header">
                <div className="slot-icon">{slotIcons[slotType]}</div>
                <h4>{t(`calculator.${slotType}`)}</h4>
            </div>
            <div className="artifact-preview" onClick={artifact ? handleEdit : handleAdd}>
                {artifact ? (
                    <div className="artifact-mini-preview">
                        <div className="artifact-set-name">{artifact.setName}</div>
                        <div className="artifact-main-stat">
                             <span>{t('calculator.lvl')} +{artifact.level}</span>
                            <strong>{statNames[artifact.mainStat]}</strong>
                        </div>
                        <ul className="artifact-substats-preview">
                            {(artifact.substats ?? artifact.subStats ?? []).map((s, i) => <li key={i}>{statNames[s.key ?? s.type]}: {s.value}</li>)}
                        </ul>
                    </div>
                ) : (
                    <div className="empty-state small">
                        <p>{t('calculator.notSelected')}</p>
                    </div>
                )}
            </div>
            <button className="select-artifact-btn" onClick={artifact ? handleEdit : handleAdd} disabled={!character}>
                {artifact ? t('common.edit') : t('common.select')}
            </button>

            <ArtifactSetModal 
                isOpen={isSetModalOpen}
                onClose={() => setSetModalOpen(false)}
                onSelect={handleSetSelect}
                artifactSets={artifactSets}
            />

            {(isConfigModalOpen && selectedSet) && (
                <ArtifactConfigModal
                    isOpen={isConfigModalOpen}
                    onClose={handleConfigClose}
                    onSave={handleConfigSave}
                    slotType={slotType}
                    selectedSet={selectedSet}
                    currentArtifact={isEditing ? artifact : null}
                    allArtifactStats={allArtifactStats}
                    statNames={statNames}
                />
            )}
        </div>
    );
};

export default ArtifactSlot;
