import React from 'react';
import { useTranslation } from 'react-i18next';
import DitheredLandscape from '../../components/DitheredLandscape';
import { resolveIconUrl } from '../../core/utils/cdnIcon';
import characterIcons from '../../data/cdn/characterIcons.generated.json';

const CharacterHeader = ({ character, charName, currentPage }) => {
    const { t } = useTranslation('characters');
    const avatarUrl = resolveIconUrl({ enkaIconMap: characterIcons }, character.id, character.avatar);

    return (
        <header className="character-header-sub f-c br-4 b p-2">
            <div className="character-profile-sub f-c">
                <div className='bg-bl br-2 f-c ov-h p-r'>
                    <DitheredLandscape />
                    <img loading="lazy" src={avatarUrl} alt={charName} className="character-avatar-sub wd"/>
                </div>
                <div className="character-info-sub">
                    <h1 className='m-1-0'>{charName}</h1>
                    <div className="character-rarity-sub">
                        {Array.from({ length: character.rarity || 1 }).map((_, index) => (
                            <svg className="i c" style={{ width: '4vh',color:'black' }} key={index}><use href="#icon-star"></use></svg>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CharacterHeader;
