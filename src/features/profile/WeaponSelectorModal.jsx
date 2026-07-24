
import React from 'react';
import { useTranslation } from 'react-i18next';

const WeaponSelectorModal = ({ isOpen, onClose, onSelect, weaponType, weapons }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    const filteredWeapons = weapons.filter(weapon => 
        weapon.type && weapon.type.toLowerCase() === weaponType.toLowerCase()
    );

    return (
        <div className="calculator-modal weapon-select-modal open">
            <div className="calculator-modal-content">
                <div className="modal-header">
                    <h2>{t('calculator.selectWeapon')}</h2>
                    <p className="modal-subtitle">{t(`weapons.types.${weaponType}`)}</p>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="weapons-grid">
                        {filteredWeapons.map(weapon => (
                            <div key={weapon.id} className="weapon-card-select" onClick={() => onSelect(weapon.id)}>
                                <div className="weapon-select-icon">
                                    <img loading="lazy" src={weapon.icon} alt={weapon.name} />
                                </div>
                                <div className="weapon-select-info">
                                    <h4>{weapon.name}</h4>
                                    <div className="weapon-select-meta">
                                        <span className="weapon-rarity">{'★'.repeat(weapon.rarity)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeaponSelectorModal;
