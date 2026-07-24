import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { resolveIconUrl } from '../../core/utils/cdnIcon';
import characterIcons from '../../data/cdn/characterIcons.generated.json';

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
        <div className="avatar-selector-modal overlay">
            <div className="avatar-selector bg-d f-c p-3 br-6 out-d c-l g-2">
                <div className="avatar-selector-header f-r jc-sb">
                    <h2>{t('pages.profile.selectAvatar')}</h2>
                    <button id="close-avatar-selector" onClick={onClose}>&times;</button>
                </div>
                <div className="avatar-grid g-2">
                    {avatars.map(avatar => (
                        <div key={avatar.src} className="avatar-item br-3 b-l" onClick={() => onSelect(avatar.src)}>
                            <img loading="lazy" src={avatar.src} alt={avatar.name} title={avatar.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AvatarSelector;
