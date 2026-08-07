
import React from 'react';
import { useTranslation } from 'react-i18next';

const CharacterSelectorModal = ({ isOpen, onClose, onSelect, characters }) => {
    const { t } = useTranslation(['characters, common']);

    if (!isOpen) return null;

    return (
        <div className="overlay modal open">
            <div className="modal-content background-bill p-2 color-pine radius-4">
                <div className="modal-header">
                    <h2>{t('calculator.selectCharacter', 'select')}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body border">
                    <div className="cards-container scrollable-y gap-2">
                        {characters.map(char => {
                            const iconUrl = char.avatar_icon || 'assets/default-avatar.png';
                            return (
                                <div key={char.id} className="character-card-select border radius-4" onClick={() => onSelect(char.id)}>
                                    <div className="char-select-avatar border radius-1">
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
