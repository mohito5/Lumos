
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import WeaponSelectorModal from './WeaponSelectorModal.jsx';

const WeaponSelector = ({ character, onSelect, selectedWeapon, weapons }) => {
    const { t } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSelect = (weaponId) => {
        onSelect(weaponId);
        setModalOpen(false);
    };

    const isDisabled = !character;

    return (
        <div className="weapon-selector-container">
            <button onClick={() => setModalOpen(true)} className="select-button wd p-1 radius-2 border" disabled={isDisabled}>
                {selectedWeapon ? (
                    <div className="selected-weapon-info flex">
                        <img className='border' radius-2 loading="lazy" src={selectedWeapon.icon} alt={selectedWeapon.name} />
                        <span>{selectedWeapon.name}</span>
                    </div>
                ) : (
                    <span>{isDisabled ? t('calculator.selectCharacterFirst') : t('calculator.clickToSelect')}</span>
                )}
            </button>

            {!isDisabled && (
                <WeaponSelectorModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSelect={handleSelect}
                    weaponType={character.weapon}
                    weapons={weapons}
                />
            )}
        </div>
    );
};

export default WeaponSelector;
