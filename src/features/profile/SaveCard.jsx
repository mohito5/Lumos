
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { charactersById } from '../../data/characters/index';
import { weaponsById } from '../../data/weapons/index';
import { resolveIconUrl } from '../../core/utils/cdnIcon';
import characterIcons from '../../data/cdn/characterIcons.generated.json';

const SaveCard = ({ save, type, onDelete }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleOpen = () => {
        if (type === 'character') {
            navigate(`/characters/${save.i}/mat`);
        } else if (type === 'weapon') {
            navigate(`/weapons/${save.i}/mat`);
        }
    };

    const handleDelete = () => {
        onDelete(save.i, type, save.i);
    };

    const { title, avatar } = React.useMemo(() => {
        let item;
        if (type === 'character') {
            item = charactersById.get(save.i);
            return {
                title: item ? t(`${item.id}.name`, { ns: 'characters' }) : save.i,
                avatar: resolveIconUrl({ enkaIconMap: characterIcons }, save.i, item?.avatar),
            };
        } else if (type === 'weapon') {
            item = weaponsById.get(save.i);
            return { title: item ? t(`${item.id}.name`, { ns: 'weapons' }) : save.i, avatar: item?.icon };
        }
        return { title: save.i, avatar: '/assets/default-avatar.png' };
    }, [save.i, type, t]);

    const getTalentLevels = () => {
        if (!save.ar || !save.sr || !save.br) return '1/1/1';
        return `${save.ar.to || 1}/${save.sr.to || 1}/${save.br.to || 1}`;
    }

    return (
        <div className="saved-material-card">
            <div className="card-header">
                <img loading="lazy" src={avatar} alt={title} className="card-avatar" onError={(e) => { e.target.onerror = null; e.target.src = '/assets/default-avatar.png'; }} />
                <div className="card-title-group">
                    <h4>{title}</h4>
                    <div className="card-date">{new Date(save.ts).toLocaleDateString()}</div>
                </div>
            </div>
            <div className="card-body">
                {type === 'character' && (
                    <div className="card-stats">
                        {t('character.level')}: {save.lr?.to ? save.lr.to : 1} | {t('character.talents')}: {getTalentLevels()}
                    </div>
                )}
                {type === 'weapon' && (
                    <div className="card-stats">
                        {t('weapon.level')}: {save.lr?.to ? save.lr.to : 1}
                    </div>
                )}
            </div>
            <div className="card-actions">
                <button onClick={handleOpen} className="open-btn">{t('buttons.open')}</button>
                <button onClick={handleDelete} className="delete-btn">{t('buttons.delete')}</button>
            </div>
        </div>
    );
};

export default SaveCard;
