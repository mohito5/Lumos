import React from 'react';
import { useTranslation } from 'react-i18next';
import DitheredLandscape from '../../../shared/ui/DitheredLandscape';
import { resolveIconUrl } from '../../../shared/lib/cdnIcon';
import characterIcons from '../../../data/cdn/characterIcons.generated.json';

import './CharacterHeader.css';

const CharacterHeader = ({ character, charName, currentPage }) => {
    const { t } = useTranslation('characters');
    const avatarUrl = resolveIconUrl({ enkaIconMap: characterIcons }, character.id, character.avatar);

    return (
        <header className="character-header-sub flex-c radius-4 border p-3">
            <div className="character-profile-sub flex-c">
                <div className={`radius-1 flex-c ov-h p-r vision-${character.element}`}>
                    <DitheredLandscape />
                    <img loading="lazy" src={character.avatar} alt={charName} className="character-avatar-sub wd"/>
                    <div className="character-rarity border background p-1 radius-1 flex-c gap-2">
                        {Array.from({ length: character.rarity || 1 }).map((_, index) => (
                            <svg className="icon-md color" key={index}><use href="#icon-star-mini"></use></svg>
                        ))}
                    </div>
                </div>
                <div className="character-info-sub">
                    <h1 className='m-1-0'>{charName}</h1>
                </div>
            </div>
        </header>
    );
};

export default CharacterHeader;
