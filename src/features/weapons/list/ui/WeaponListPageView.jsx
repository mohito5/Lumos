
import React from 'react';
import ItemCard from '../../../../shared/ui/common/ItemCard';
import { SearchBar } from '../../../../shared/ui/SearchBar';
import { resolveIconUrl } from '../../../../shared/lib/cdnIcon';
import weaponIcons from '../../../../data/cdn/weaponIcons.generated.json';

const WeaponListPageView = ({ 
    t, 
    searchTerm, 
    setSearchTerm, 
    filteredWeapons,
    onCardClick
}) => (
    <div className="page weapons">
        <main className=" wd gap-4 flex-c">
            <header className="page-header flex-c gap-2">
                <h1>{t('pages.weapons.title')}</h1>
                <p>{t('ui:pages.weapons.description')}</p>
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                />
            </header>
            <section className="cards-container gap-2">
                {filteredWeapons.length > 0 ? (
                    filteredWeapons.map(weapon => (
                        <ItemCard 
                            key={weapon.id} 
                            item={weapon} 
                            icon={resolveIconUrl({ enkaIconMap: weaponIcons }, weapon.id, weapon.icon)}
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
