import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBodyScrollLock } from '../../shared/lib/hooks/useBodyScrollLock';
import { resolveIconUrl } from '../../shared/lib/cdnIcon';
import characterIcons from '../../data/cdn/characterIcons.generated.json';
import './AvatarSelector.css';

const commonAvatars = [
    { src: 'assets/avatar-icon/default-user.png', name: 'Default' },
    // ... other common avatars like elements
];

const AvatarSelector = ({ isOpen, onClose, onSelect, charsData }) => {
    const { t } = useTranslation();
    const [avatars, setAvatars] = useState([]);
    useBodyScrollLock(isOpen);

    useEffect(() => {
        if (isOpen && charsData) {
            // charsData — уже плоский массив (allCharacters из data/characters/index.js),
            // Object.values() тут был лишним оборачиванием того же массива в самого себя.
            const characterAvatars = charsData.map(char => ({
                src: resolveIconUrl({ enkaIconMap: characterIcons }, char.id, char.avatar_icon),
                name: char.ru_name || char.en_name
            }));
            setAvatars([...commonAvatars, ...characterAvatars]);
        }
    }, [isOpen, charsData]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="avatar-selector-modal modal overlay">
            <div className="content-modal background-bill color-pine flex-c p-3 radius-6 gap-2">
                <div className="avatar-selector-header f-r jc-sb">
                    <h2>{t('ui:profile.selectAvatar')}</h2>
                    <button id="close-avatar-selector" onClick={onClose}>&times;</button>
                </div>
                <div className="cards-container gap-2 scrollable-y">
                    {avatars.map(avatar => (
                        <div key={avatar.src} className={`avatar-icon flex radius-3 border br-3 rarity-${character.rarity}`} onClick={() => onSelect(avatar.src)}>
                            <img loading="lazy" src={avatar.src} alt={avatar.name} title={avatar.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AvatarSelector;
