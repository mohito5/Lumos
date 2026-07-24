import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { materialsById } from "../../data/materials/index.js";
import { STATS } from '../../app/stats.js';
import { MATERIAL_GROUP, MATERIAL_TYPE } from '../../app/constants.js';
import DropModal from '../../components/common/DropModal.jsx';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

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
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>{t('level')}</th>
                            {hpData.length > 0 && <th>{t('hp')}</th>}
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
            <table className="stats-table">
                <thead>
                    <tr>
                        {resistanceKeys.map(resKey => <th key={resKey}>{t(resKey.replace('_res', ''))}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {resistanceKeys.map(resKey => <td key={resKey}>{resistances[resKey]}%</td>)}
                    </tr>
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
            <div key={group} className="drop-group">
                <h4>{t(`materialGroups.${group}`)}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ textAlign: 'center', border: '1px solid #ccc', padding: '5px', cursor: 'pointer' }} onClick={() => handleDropClick(item)}>
                            <img loading="lazy" src={item.icon} alt={t(`materials.${item.id}.name`)} style={{ width: '50px', height: '50px' }} />
                            <p style={{ margin: '5px 0 0', fontSize: '12px' }}>{t(`materials.${item.id}.name`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content scrollable-y " onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    {creature.icon && <img loading="lazy" src={creature.icon} alt={creature.id} style={{ width: '50px', height: '50px', marginRight: '15px' }} />}
                    <h2>{t(`creatures.${creature.id}`)}</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    <div className="creature-details">
                        {creature.type && <p><strong>{t('type')}:</strong> {t(`enemyTypes.${creature.type}`)}</p>}
                        {creature.type_damage && <p><strong>{t('damageType')}:</strong> {t(`elements.${creature.type_damage}`)}</p>}
                        {creature.family && <p><strong>{t('family')}:</strong> {t(`families.${creature.family}`)}</p>}
                        {creature.group && <p><strong>{t('group')}:</strong> {t(`groups.${creature.group}`)}</p>}
                    </div>
                    {creature.stats &&
                        <div className="creature-stats">
                            <h3>{t('stats')}</h3>
                            {renderStatsTable()}
                            <h3>{t('resistances')}</h3>
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
