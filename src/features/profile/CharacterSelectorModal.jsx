
import React from 'react';
import { useTranslation } from 'react-i18next';

const CharacterSelectorModal = ({ isOpen, onClose, onSelect, characters }) => {
    const { t } = useTranslation(['common']);

    if (!isOpen) return null;

    return (
        <div className="calculator-modal character-select-modal open">
            <div className="calculator-modal-content">
                <div className="modal-header">
                    <h2>{t('calculator.selectCharacter')}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="characters-grid">
                        {characters.map(char => {
                            const iconUrl = char.avatar_icon || 'assets/default-avatar.png';
                            return (
                                <div key={char.id} className="character-card-select" onClick={() => onSelect(char.id)}>
                                    <div className="char-select-avatar">
                                        <img loading="lazy" src={iconUrl} alt={char.name} />
                                    </div>
                                    <div className="char-select-info">
                                        <h4>{char.name}</h4>
                                        <div className="char-select-meta">
                                            <span className={`char-element ${char.element?.toLowerCase()}`}>{char.element}</span>
                                            <span className="char-weapon">{t(`weapons.${char.weapon?.toLowerCase()}`)}</span>
                                            <span className="char-rarity">{'★'.repeat(char.rarity)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterSelectorModal;
