
import React from 'react';
import ItemCard from '../../../components/common/ItemCard';
import { SearchBar } from '../../../components/SearchBar';

const WeaponListPageView = ({ 
    t, 
    searchTerm, 
    setSearchTerm, 
    filteredWeapons,
    onCardClick
}) => (
    <div className="page weapons">
        <main className="main-content g-2 f-c">
            <header className="page-header f-c">
                <h1>{t('pages.weapons.title')}</h1>
                <p>{t('ui:pages.weapons.description')}</p>
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                />
            </header>
            <section className="cards-container g-2">
                {filteredWeapons.length > 0 ? (
                    filteredWeapons.map(weapon => (
                        <ItemCard 
                            key={weapon.id} 
                            item={weapon} 
                            icon={weapon.icon}
                            onClick={() => onCardClick(weapon)}
                            name={t(`${weapon.id}.name`, { ns: 'weapons' })}
                            rarity={weapon.rarity}
                            baseClass="weapon-card"
                        />
                    ))
                ) : (
                    <div className="no-results">
                        <p>{t('list.no_results')}</p>
                    </div>
                )}
            </section>
        </main>
    </div>
);

export default WeaponListPageView;
