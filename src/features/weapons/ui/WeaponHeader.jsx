import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DitheredLandscape from '../../../shared/ui/DitheredLandscape';

const WeaponHeader = ({ weapon, weaponName, currentPage }) => {
    const { t } = useTranslation();

    const weaponUrlKey = weapon.id.toLowerCase();

    return (
        <header className="weapon-header flex-c radius-4 border p-3">
            <div className="weapon-profile flex gap-2">
                <div className={`radius-1 flex-c ov-h position-r rarity-${weapon.rarity}`}>
                    <img loading="lazy" src={`${weapon.icon}`} alt={weaponName} className="weapon-avatar wd br-1"/>
                    <DitheredLandscape/>
                </div>
                <div className="weapon-info">
                    <h1>{weaponName}</h1>
                    <div className="weapon-rarity">
                        {'★'.repeat(weapon.rarity)}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default WeaponHeader;