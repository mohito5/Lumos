import React from 'react';
import { useTranslation } from 'react-i18next';
import DitheredLandscape from '../../../shared/ui/DitheredLandscape';
import { resolveIconUrl } from '../../../shared/lib/cdnIcon';
import characterIcons from '../../../data/cdn/characterIcons.generated.json';

const CharacterHeader = ({ character, charName, currentPage }) => {
    const { t } = useTranslation('characters');
    const avatarUrl = resolveIconUrl({ enkaIconMap: characterIcons }, character.id, character.avatar);

    return (
        <header className="character-header-sub flex-c radius-4 border p-3">
            <div className="character-profile-sub flex-c">
                <div className={`radius-1 flex-c ov-h p-r vision-${character.element}`}>
                    <DitheredLandscape />
                    <img loading="lazy" src={avatarUrl} alt={charName} className="character-avatar-sub wd"/>
                </div>
                <div className="character-info-sub">
                    <h1 className='m-1-0'>{charName}</h1>
                    <div className="character-rarity-sub">
                        {Array.from({ length: character.rarity || 1 }).map((_, index) => (
                            <svg className="icon-sm color" style={{ width: '4vh' }} key={index}><use href="#icon-star"></use></svg>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CharacterHeader;
