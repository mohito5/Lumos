
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { materialsById } from '../../../data/materials/index.js';
import { calculateCharacterCostRange } from '../../../core/utils/materialsCalculator.js';
import MaterialCard from '../../../components/materials/MaterialCard.jsx';

const TalentSection = ({ talentType, character, talentData }) => {
    const { t } = useTranslation(['materials', 'characters', 'ui', 'common']);
    const [level, setLevel] = useState(10);
    const [isTotalCost, setIsTotalCost] = useState(false);

    const talentName = t(`${character.id}.talent_${talentType}_name`, { 
        ns: 'characters', 
        defaultValue: t('common:unknown_talent_name')
    });
    const talentDescription = t(`${character.id}.talent_${talentType}_desc`, { 
        ns: 'characters', 
        defaultValue: t('common:unknown_talent_description') 
    });

    const handleLevelChange = (increment) => {
        setLevel(prev => Math.max(1, Math.min(10, prev + increment)));
    }

    // «Всего с 1 уровня» — [1, level), «с предыдущего уровня» — [level-1, level).
    // Тот же смысл диапазона [from, to), что и у calculateCharacterCostRange
    // для уровня персонажа в CharacterInfoPage.jsx — раньше это была третья,
    // отдельно написанная копия той же по сути идеи (через levelsToCalculate
    // + Array.from вместо простого from/to).
    const calculatedMaterials = useMemo(() => {
        if (level <= 1) return {};
        const from = isTotalCost ? 1 : level - 1;
        return calculateCharacterCostRange(talentType, from, level, character);
    }, [level, isTotalCost, character, talentType]);

    return (
        <div className="skill" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem'}}>
            {talentData.icon && <img loading="lazy" src={`/${talentData.icon}`} alt={talentName} style={{ width: '48px', height: '48px', marginRight: '1rem' }} />}
            <div style={{width: '100%'}}>
                <h3>{talentName}</h3>
                <p dangerouslySetInnerHTML={{ __html: talentDescription }}></p>

                <div className="talent-calculator-section">
                    <div className="talent-level-controls">
                        <span>{t('ui:character.talentLevel', 'Уровень таланта')}:</span>
                        <div className="level-buttons">
                            <button onClick={() => handleLevelChange(-1)} disabled={level === 1}>-</button>
                            <span>{level}</span>
                            <button onClick={() => handleLevelChange(1)} disabled={level === 10}>+</button>
                        </div>
                    </div>
                    
                    {talentData.stats && Array.isArray(talentData.stats) && (
                         <div className="talent-stats-display">
                             <h4>{t('ui:character.talentStats', 'Атрибуты таланта')}</h4>
                             {talentData.stats.map((stat, index) => (
                                 <p key={index}>
                                     {t(`common:${stat.name}`, { defaultValue: stat.name })}: 
                                     <span style={{color: '#C59553'}}>{stat.values[level - 1]}</span>
                                </p>
                            ))}
                        </div>
                    )}

                    <div className="talent-materials-display">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                            <h4>{t('ui:character.upgradeMaterials', 'Материалы для улучшения')}</h4>
                            <div className="toggle-switch" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>{isTotalCost ? t('ui:calculator.totalFromFirst', 'Всего с 1 уровня') : t('ui:calculator.fromPrevious', 'С предыдущего уровня')}</span>
                                <label className="b-d br-4 p-1" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" checked={isTotalCost} onChange={() => setIsTotalCost(!isTotalCost)} style={{ display: 'none' }} />
                                    <div style={{ 
                                        width: '40px', 
                                        height: '20px', 
                                        background: isTotalCost ? '#C59553' : '#333', 
                                        borderRadius: '10px', 
                                        position: 'relative',
                                        transition: '0.3s'
                                    }}>
                                        <div style={{ 
                                            width: '16px', 
                                            height: '16px', 
                                            background: '#fff', 
                                            borderRadius: '50%', 
                                            position: 'absolute', 
                                            top: '2px', 
                                            left: isTotalCost ? '22px' : '2px',
                                            transition: '0.3s'
                                        }}></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        {Object.keys(calculatedMaterials).length > 0 ? (
                            <div className="calculated-materials">
                                {Object.entries(calculatedMaterials).map(([materialId, amount]) => {
                                    const material = materialsById.get(materialId);
                                    if (!material) return <div key={materialId}>Cannot find material for id {materialId}</div>;
                                    return (
                                        <MaterialCard key={material.id} material={material}>
                                             <span className="material-amount">{amount}</span>
                                        </MaterialCard>
                                    );
                                })}
                             </div>
                        ) : (
                            <p>{level === 1 ? t('ui:character.noUpgradeNeeded', 'Улучшение не требуется') : t('ui:character.error', 'Ошибка расчета')}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TalentSection;
