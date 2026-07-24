import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { charactersById } from '../../data/characters/index.js';
import { WEAPON_TYPE_TO_IMG_SRC, VISION_TYPE_TO_IMG_SRC } from '../../app/constants';

const CharacterDetailPage = () => {
    const { characterId } = useParams();
    const { t } = useTranslation(['characters', 'ui']); 
    
    const character = charactersById.get(characterId);

    if (!character) {
        return (
            <div>
                <h2>{t('characterNotFound', { ns: 'ui', defaultValue: 'Character not found' })}</h2>
                <Link to="/characters">{t('backToList', { ns: 'ui', defaultValue: 'Back to list' })}</Link>
            </div>
        );
    }

    const { rarity, element, weapon, avatar_icon } = character; 
    
    const name = t(`${character.id}.name`);
    const description = t(`${character.id}.description`);

    return (
        <div className="character-detail-page">
            <div className="character-detail-header">
                <img loading="lazy" className="character-detail-icon" src={`/${avatar_icon}`} alt={name} />
                <div className="character-detail-title">
                    <h1>{name}</h1>
                    <div className="character-detail-meta">
                        <span className={`rarity-${rarity}`}>{rarity} Stars</span>
                        <span><img loading="lazy" src={VISION_TYPE_TO_IMG_SRC[element]} alt={element} /> {element}</span>
                        <span><img loading="lazy" src={WEAPON_TYPE_TO_IMG_SRC[weapon]} alt={weapon} /> {weapon}</span>
                    </div>
                </div>
            </div>

            <div className="character-detail-content">
                <p>{description}</p>
            </div>
             <Link to="/characters">{t('backToList', { ns: 'ui', defaultValue: 'Back to character list' })}</Link>
        </div>
    );
};

export default CharacterDetailPage;