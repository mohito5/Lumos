
import React from 'react';
import { useTranslation } from 'react-i18next';
import MasonryGrid from '../../../components/masonry';
import CharacterHeader from '../CharacterHeader';
import TalentSection from '../components/TalentSection';
import MaterialCard from '../../../components/materials/MaterialCard';
import { materialsData } from '../../../data/materials/index.js';

const CharacterInfoPageView = ({
    character,
    charLocale,
    currentPage,
    displayLevel,
    levelIndex,
    levelSteps,
    baseHp,
    baseAtk,
    baseDef,
    ascensionStat,
    isRangeFromPrevious,
    calculatedMaterials,
    handleLevelChange,
    handleRangeToggle,
}) => {
    const { t } = useTranslation(['ui', 'stats', 'materials', 'characters']);

    if (!character) {
        return <div className="page-placeholder">{t('ui:character.notFound', 'Персонаж не найден')}</div>;
    }

    const charName = charLocale.name || character.id;
    const talentTypes = ['attack', 'skill', 'burst'];

    return (
        <MasonryGrid>
            <article key="header" className="grid-item">
                <CharacterHeader character={character} charName={charName} currentPage={currentPage} />
            </article>

            {charLocale.description && (
                <article key="description" className="grid-item">
                    <p className="description b-d br-4 p-2 mar-b-4" dangerouslySetInnerHTML={{ __html: charLocale.description }} />
                </article>
            )}

            <article key="stats" className="grid-item">
                <div className="stats-sliders-section b-d br-4 p-3">
                    <h2>{t('ui:character.stats', 'Характеристики')}</h2>
                    <div className="slider-group f-c">
                        <label>{t('ui:character.level', 'Уровень')}: {displayLevel}</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                            <button onClick={() => handleLevelChange(levelIndex - 1)} disabled={levelIndex <= 0}>-</button>
                            <input type="range" min="0" max={levelSteps.length - 1} value={levelIndex} onChange={e => handleLevelChange(parseInt(e.target.value, 10))} style={{ flexGrow: 1 }} />
                            <button onClick={() => handleLevelChange(levelIndex + 1)} disabled={levelIndex >= levelSteps.length - 1}>+</button>
                        </div>
                    </div>
                    <div className="stats-display">
                        <p>{t('stats:hp')}: {baseHp}</p>
                        <p>{t('stats:atk')}: {baseAtk}</p>
                        <p>{t('stats:def')}: {baseDef}</p>
                        {ascensionStat && <p>{ascensionStat.label}: {ascensionStat.value}</p>}
                    </div>
                    <div className="ascension-calculator f-c g-2 mar-t-4">
                        <h3 className="materials-title">{t('ui:character.ascensionMaterials', 'Материалы для возвышения')}</h3>
                        <div className="toggle-switch">
                            <label className="b-d br-4 p-1">
                                <input type="checkbox" checked={isRangeFromPrevious} onChange={handleRangeToggle} />
                                <span className="slider br-4"></span>
                            </label>
                            <span>{t('ui:calculator.fromPrevious', 'С предыдущего возвышения')}</span>
                        </div>
                        <div className="calculated-materials g-2">
                            {Object.entries(calculatedMaterials).map(([id, amount]) => {
                                if (amount <= 0) return null;
                                const materialDetails = materialsData.find(m => m.id === id);
                                if (!materialDetails) return null;
                                return (
                                    <MaterialCard key={id} material={materialDetails}>
                                        <span className="material-amount">{Math.ceil(amount)}</span>
                                    </MaterialCard>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </article>

            <article key="talents" className="grid-item" column={2}>
                <div className="skills-section b-d br-4 p-3">
                    <h2>{t('ui:character.skills', 'Таланты')}</h2>
                    {character.talents && talentTypes.map(type => {
                        const talentData = character.talents[type];
                        if (!talentData) return null;
                        
                        return (
                            <TalentSection
                                key={type}
                                talentType={type}
                                character={character}
                                talentData={talentData}
                            />
                        );
                    })}
                </div>
            </article>

            <article key="constellations" className="grid-item">
                <div className="constellations-section b-d br-4 p-3">
                    <h2>{t('ui:character.constellations', 'Созвездия')}</h2>
                    {character.constellations ? (
                        Object.keys(character.constellations).map((constKey, index) => {
                            const constellation = character.constellations[constKey];
                            const constName = charLocale[`${constKey}_name`];
                            const constDesc = charLocale[`${constKey}_desc`];
                            if (!constName || !constDesc) return null;
                            return (
                                <div key={constKey} className="skill" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    {constellation.icon && <img loading="lazy" src={`/${constellation.icon}`} alt={constName} style={{ width: '48px', height: '48px', marginRight: '1rem' }} />}
                                    <div>
                                        <h3>{`${t('ui:character.constellation', 'Созвездие')} ${index + 1}: ${constName}`}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: constDesc }} />
                                    </div>
                                </div>
                            );
                        })
                    ) : <p>{t('ui:character.noConstellations', 'Информация о созвездиях недоступна.')}</p>}
                </div>
            </article>
        </MasonryGrid>
    );
};

export default CharacterInfoPageView;
