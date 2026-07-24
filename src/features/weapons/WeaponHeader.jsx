import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WeaponHeader = ({ weapon, weaponName, currentPage }) => {
    const { t } = useTranslation();

    const weaponUrlKey = weapon.id.toLowerCase();

    return (
        <header className="weapon-header f-c br-4 b-d p-3">
            <div className="weapon-profile f-c">
                <div className='bg-d br-1 f-c'>
                    <img loading="lazy" src={`${weapon.icon}`} alt={weaponName} className="weapon-avatar wd br-1"/>
                </div>
                <div className="weapon-info">
                    <h1>{weaponName}</h1>
                    <div className="weapon-rarity">
                        {'★'.repeat(weapon.rarity)}
                    </div>
                </div>
            </div>
            <nav className="weapon-nav">
                <Link 
                    to={`/weapon/${weaponUrlKey}/info`}
                    className={currentPage === 'info' ? 'active' : ''}
                >
                    {t('weapon.info')}
                </Link>
                <Link 
                    to={`/weapon/${weaponUrlKey}/guide`}
                    className={currentPage === 'guide' ? 'active' : ''}
                >
                    {t('weapon.guide')}
                </Link>
                <Link 
                    to={`/weapon/${weaponUrlKey}/mat`}
                    className={currentPage === 'mat' ? 'active' : ''}
                >
                    {t('weapon.materials')}
                </Link>
            </nav>
        </header>
    );
};

export default WeaponHeader;