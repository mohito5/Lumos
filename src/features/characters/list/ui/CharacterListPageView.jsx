
import React from 'react';
import ItemCard from '../../../../shared/ui/common/ItemCard';
import { SearchBar } from '../../../../shared/ui/SearchBar';
import { resolveIconUrl } from '../../../../shared/lib/cdnIcon';
import characterIcons from '../../../../data/cdn/characterIcons.generated.json';

const CharacterListPageView = ({ 
    t, 
    searchTerm, 
    setSearchTerm, 
    filteredCharacters,
    onCardClick
}) => (
    <div className="page characters wd">
        <main className="main-content g-2 f-c wd">
            <header className="page-header f-c g-2 c">
                <h1 data-i18n-key="pages.characters.title">{t('pages.characters.title')}</h1>
                <p>{t('characters.description', { ns: 'ui' })}</p>
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                />
            </header>
            <section className="characters-cards-container g-2">
                {filteredCharacters.length > 0 ? (
                    filteredCharacters.map(character => (
                        <ItemCard 
                            key={character.id} 
                            item={character} 
                            icon={resolveIconUrl({ enkaIconMap: characterIcons }, character.id, character.avatar_icon)}
                            onClick={() => onCardClick(character)}
                            name={t(`${character.id}.name`, { ns: 'characters' })}
                            rarity={character.rarity}
                            baseClass="character-card"
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

export default CharacterListPageView;
