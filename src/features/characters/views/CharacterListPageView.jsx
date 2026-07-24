
import React from 'react';
import ItemCard from '../../../components/common/ItemCard';
import { SearchBar } from '../../../components/SearchBar';

const CharacterListPageView = ({ 
    t, 
    searchTerm, 
    setSearchTerm, 
    filteredCharacters,
    onCardClick,
    avatarUrl
}) => (
    <div className="page characters">
        <main className="main-content g-2 f-c">
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
                            icon={avatarUrl}
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
