
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { charactersById } from '../../data/characters/index';
import { weaponsById } from '../../data/weapons/index';
import artifactSets from '../../data/artifacts/index';
import { resolveIconUrl } from '../../shared/lib/cdnIcon';
import characterIcons from '../../data/cdn/characterIcons.generated.json';

const CalculatorSaveCard = ({ save, onDelete }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const character = charactersById.get(save.ci);
    const characterAvatarUrl = resolveIconUrl({ enkaIconMap: characterIcons }, save.ci, character?.avatar);
    const weapon = weaponsById.get(save.wi);
    
    const handleOpen = () => {
        navigate(`/profile/calculator/${save.ci}`);
    };

    const handleDelete = () => {
        onDelete(save.ci, 'calculate', save.bn || (character ? t(`${character.id}.name`, { ns: 'characters' }) : save.ci));
    };

    const artifactSetCounts = {};
    if (save.f) artifactSetCounts[save.f.sid] = (artifactSetCounts[save.f.sid] || 0) + 1;
    if (save.p) artifactSetCounts[save.p.sid] = (artifactSetCounts[save.p.sid] || 0) + 1;
    if (save.s) artifactSetCounts[save.s.sid] = (artifactSetCounts[save.s.sid] || 0) + 1;
    if (save.g) artifactSetCounts[save.g.sid] = (artifactSetCounts[save.g.sid] || 0) + 1;
    if (save.c) artifactSetCounts[save.c.sid] = (artifactSetCounts[save.c.sid] || 0) + 1;

    const sets = Object.entries(artifactSetCounts)
        .filter(([, count]) => count >= 2)
        .map(([sid, count]) => {
            const set = artifactSets.find(s => s.id === sid);
            return { name: set ? t(`${set.id}.name`, { ns: 'artifacts' }) : sid, count };
        });

    const characterName = character ? t(`${character.id}.name`, { ns: 'characters' }) : save.ci;
    // bn — необязательное пользовательское имя сборки (см. инпут в CalculatorPage.jsx),
    // без него карточка по-прежнему подписана именем персонажа, как и раньше.
    const displayName = save.bn || characterName;

    return (
        <div className="saved-material-card">
            <div className="card-header">
                <img loading="lazy" src={characterAvatarUrl} alt={character?.id} className="card-avatar" />
                <div className="card-title-group">
                    <h4>{displayName}</h4>
                    {save.bn && <div className="card-subtitle" style={{ opacity: 0.6, fontSize: '0.85em' }}>{characterName}</div>}
                    <div className="card-date">{new Date(save.ts).toLocaleDateString()}</div>
                </div>
            </div>
            <div className="card-body">
                <div className="card-stats">
                    {t('character.level')}: {save.cl ? save.cl + 1 : 1} | {weapon ? t(`${weapon.id}.name`, { ns: 'weapons' }) : ''}
                </div>
                <div className="artifact-sets">
                    {sets.map(s => `${s.count}-${s.name}`).join(', ')}
                </div>
            </div>
            <div className="card-actions">
                <button onClick={handleOpen} className="open-btn">{t('buttons.open')}</button>
                <button onClick={handleDelete} className="delete-btn">{t('buttons.delete')}</button>
            </div>
        </div>
    );
};

export default CalculatorSaveCard;
