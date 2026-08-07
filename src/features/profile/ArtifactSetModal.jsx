
import React from 'react';
import { useTranslation } from 'react-i18next';

const ArtifactSetModal = ({ isOpen, onClose, onSelect, artifactSets }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="calculator-modal overlay artifact-set-modal open">
            <div className="modal-content background-bill radius-4 p-2">
                <div className="modal-header">
                    <h2>{t('calculator.selectArtifactSet')}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="sets-grid">
                        {artifactSets.map(set => {
                            const maxRarity = set.rarity ? Math.max(...set.rarity) : 5;
                            const rarityDisplay = '★'.repeat(maxRarity);

                            return (
                                <div key={set.id} className="set-card" onClick={() => onSelect(set.id)}>
                                    <div className="set-icon">{'⭐'}</div>
                                    <div className="set-name">{set.name}</div>
                                    <div className="set-rarity">{rarityDisplay}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtifactSetModal;
