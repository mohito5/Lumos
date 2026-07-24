
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CharacterSelectorModal from './CharacterSelectorModal.jsx';

const CharacterSelector = ({ onSelect, selectedCharacter, characters }) => {
    const { t } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSelect = (characterId) => {
        onSelect(characterId);
        setModalOpen(false);
    };

    return (
        <div className="character-selector-container">
            <button onClick={() => setModalOpen(true)} className="select-button">
                {selectedCharacter ? (
                    <div className="selected-char-info">
                        <img loading="lazy" src={selectedCharacter.avatar_icon} alt={selectedCharacter.name} />
                        <span>{selectedCharacter.name}</span>
                    </div>
                ) : (
                    <span>{t('calculator.clickToSelect')}</span>
                )}
            </button>

            <CharacterSelectorModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSelect={handleSelect}
                characters={characters}
            />
        </div>
    );
};

export default CharacterSelector;
