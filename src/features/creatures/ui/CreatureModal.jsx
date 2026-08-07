import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { materialsById } from "../../../data/materials/index.js";
import { STATS } from '../../../shared/config/stats.js';
import { MATERIAL_GROUP, MATERIAL_TYPE } from '../../../shared/config/constants.js';
import DropModal from '../../../shared/ui/common/DropModal.jsx';
import { useBodyScrollLock } from '../../../shared/lib/hooks/useBodyScrollLock.js';

import './CreatureModal.css';

const CreatureModal = ({ creature, onClose }) => {
    const { t } = useTranslation();
    const [selectedDrop, setSelectedDrop] = useState(null);
    useBodyScrollLock(!!creature);

    if (!creature) return null;

    const handleDropClick = (item) => {
        setSelectedDrop(item);
    };

    const renderStatsTable = () => {
        if (!creature.stats) return <p>No stats available for this creature.</p>;

        const hpData = creature.stats[STATS.HP];
        const hasLevelStats = hpData && Array.isArray(hpData);

        if (hasLevelStats) {
            const levels = Array.from({ length: hpData.length }, (_, i) => i + 1);
            const atkData = creature.stats[STATS.ATK] || [];
            const defData = creature.stats[STATS.DEF] || [];

            return (
                <table className="stats-table border radius-2">
                    <thead className='border'>
                        <tr className='border'>
                            <th><span>{t('ui:stats.level')}</span></th>
                            {hpData.length > 0 && <th><span>{t('ui:stats.hp')}</span></th>}
                            {atkData.length > 0 && <th>{t('attack')}</th>}
                            {defData.length > 0 && <th>{t('defense')}</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {levels.map((level, index) => (
                            <tr key={level}>
                                <td>{level}</td>
                                {hpData.length > 0 && <td>{hpData[index]}</td>}
                                {atkData.length > 0 && <td>{atkData[index]}</td>}
                                {defData.length > 0 && <td>{defData[index]}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
             return (
                <div>
                    {Object.entries(creature.stats).map(([stat, value]) => {
                         if (typeof value !== 'object' || value === null) {
                            return <p key={stat}><strong>{t(stat)}:</strong> {value}</p>;
                        }
                    })}
                </div>
            );
        }
    };
    
    const renderResistancesTable = () => {
        if (!creature.stats || !creature.stats.resistances) return null;
    
        const resistances = creature.stats.resistances;
        const resistanceKeys = Object.keys(resistances);
    
        return (
            <table className="resistance-table border radius-2 flex-c">
                <tbody className='gap-1 items-center'>
                    <tr className='gap-1 wd'>
                        {resistanceKeys.map(resKey => <th className='p-1 radius-1' key={resKey}>{t(resKey.replace('_res', ''))}</th>)}
                    </tr>
                    <td className='gap-1 wd'>
                        {resistanceKeys.map(resKey => <td className='p-1' key={resKey}>{resistances[resKey]}%</td>)}
                    </td>
                </tbody>
            </table>
        );
    };

    const renderDrops = () => {
        const dropGroups = {};

        if (creature.drops) {
            creature.drops.forEach(groupConst => {
                const materials = Array.from(materialsById.values());
                let groupMaterials;

                if (Object.values(MATERIAL_GROUP).includes(groupConst)) {
                    groupMaterials = materials.filter(m => 
                        Array.isArray(m.group) ? m.group.includes(groupConst) : m.group === groupConst
                    );
                } else if (Object.values(MATERIAL_TYPE).includes(groupConst)) {
                    groupMaterials = materials.filter(m => m.type === groupConst);
                } else {
                    const material = materialsById.get(groupConst);
                    groupMaterials = material ? [material] : [];
                }

                if (groupMaterials.length > 0) {
                    if (!dropGroups[groupConst]) {
                        dropGroups[groupConst] = [];
                    }
                    dropGroups[groupConst].push(...groupMaterials);
                }
            });
        }

        return Object.entries(dropGroups).map(([group, items]) => (
            <div key={group} className="drop-group border">
                <h4>{t(`materialGroups.${group}`)}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {items.map(item => (
                        <div key={item.id} className='border items-center radius-2 p-1 gap-1 flex' style={{ cursor: 'pointer' }} onClick={() => handleDropClick(item)}>
                            <img loading="lazy" className={`icon-md border radius-1 rarity-${item.rarity}`} src={item.icon} alt={t(`materials:${item.id}.name`)}/>
                            <span>{t(`materials:${item.id}.name`)}</span>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    const creatureName = t([`creatures:${creature.id}.name`, 'common:unknown_creature_name']);

    return (
        <div className="modal overlay" onClick={onClose}>
            <div className="content-modal background-bill gap-2 flex-c color-pine radius-4 p-2" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header gap-2">
                    {creature.icon && <img loading="lazy" src={creature.icon} alt={creature.id} className='border radius-2 icon-xl' />}
                    <h3 className='wd border'>{creatureName}</h3>
                    <button onClick={onClose} className="close-button color-pine">
                        <svg><use href='#icon-close-mini'></use></svg>
                    </button>
                </div>
                <div className="modal-body scrollable-y">
                    <div className="creature-details border gap-2 flex-c">
                        {creature.type && <p><strong>{t('type')}:</strong> {t(`creatures:enemyTypes.${creature.type}`)}</p>}
                        {creature.type_damage && <p><strong>{t('damageType')}:</strong> {t(`creatures:elements.${creature.type_damage}`)}</p>}
                        {creature.family && <p><strong>{t('family')}:</strong> {t(`families.${creature.family}`)}</p>}
                        {creature.group && <p><strong>{t('group')}:</strong> {t(`groups.${creature.group}`)}</p>}
                    </div>
                    {creature.stats &&
                        <div className="creature-stats flex-c gap-2">
                            <h3>{t('ui:stats')}</h3>
                            {renderStatsTable()}
                            <h3>{t('ui:resistances')}</h3>
                            {renderResistancesTable()}
                        </div>
                    }
                    {creature.drops &&
                        <div className="creature-drops">
                            <h3>{t('drops')}</h3>
                            {renderDrops()}
                        </div>
                    }
                </div>
            </div>
            {selectedDrop && <DropModal drop={selectedDrop} onClose={() => setSelectedDrop(null)} />}
        </div>
    );
};

export default CreatureModal;
