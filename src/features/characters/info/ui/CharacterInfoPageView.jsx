
import React from 'react';
import { useTranslation } from 'react-i18next';
import MasonryGrid from '../../../../shared/ui/Masonry.jsx';
import CharacterHeader from '../../ui/CharacterHeader.jsx';
import TalentSection from './TalentSection.jsx';
import MaterialCard from '../../../../shared/ui/materials/MaterialCard.jsx';
import { resolveMaterialDisplay } from '../../../../shared/lib/materialsCalculator.js';
import Range from '../../../../shared/ui/Range/Range.jsx';

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
                    <p className="description border radius-4 p-2" dangerouslySetInnerHTML={{ __html: charLocale.description }} />
                </article>
            )}

            <article key="stats" className="grid-item gap-4 flex-c">
                <h2>{t('ui:character.stats', 'Характеристики')}</h2>
                <div className="stats-sliders-section border radius-4 p-3 gap-2 flex-c">
                    <div className="slider-group flex-c gap-2">
                        <div className='justify-between flex'>
                            <h3>{t('ui:character.level', 'Уровень')}:</h3>
                            <h3>{displayLevel}</h3>
                        </div>
                        <Range
                            value={levelIndex}
                            min={0}
                            max={levelSteps.length - 1}
                            step={1}
                            onChange={handleLevelChange}                        
                        />
                    </div>
                    <div className="stats-display gap-1 flex-c">
                        <div className='justify-between border radius-1 p-1 flex'>
                            <p>{t('stats:hp')}:</p>
                            <p>{baseHp}</p>
                        </div>
                        <div className='justify-between border radius-1 p-1 flex'>
                            <p>{t('stats:atk')}:</p>
                            <p>{baseAtk}</p>
                        </div>
                        <div className='justify-between border radius-1 p-1 flex'>
                            <p>{t('stats:def')}:</p>
                            <p>{baseDef}</p>
                        </div>
                        {ascensionStat && 
                            <div className='justify-between border radius-1 p-1 flex'>
                                <p>{ascensionStat.label}:</p>
                                <p>{ascensionStat.value}</p>
                            </div>
                        }
                    </div>
                    <div className="ascension-calculator flex-c gap-2">
                        <h3 className="materials-title">{t('ui:character.ascensionMaterials', 'Материалы для возвышения')}</h3>
                        <div className="toggle-switch">
                            <label className="border br-4 p-1">
                                <input type="checkbox" checked={isRangeFromPrevious} onChange={handleRangeToggle} />
                                <span className="slider br-4"></span>
                            </label>
                            <span>{t('ui:calculator.fromPrevious', 'С предыдущего возвышения')}</span>
                        </div>
                        <div className="calculated-materials gap-1">
                            {Object.entries(calculatedMaterials).map(([id, amount]) => {
                                if (amount <= 0) return null;
                                const materialDetails = resolveMaterialDisplay(id, t);
                                if (!materialDetails) return null;
                                return (
                                    <MaterialCard key={id} material={materialDetails}>
                                        <span>{Math.ceil(amount)}</span>
                                    </MaterialCard>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </article>

            <article key="talents" className="grid-item flex-c gap-4" column={2}>
                <h2>{t('ui:character.skills', 'Таланты')}</h2>
                <div className="skills-section border radius-4 p-3 gap-2 flex-c">
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

            <article key="constellations" className="grid-item flex-c gap-4">
                <h2>{t('ui:character.constellations', 'Созвездия')}</h2>
                <div className="constellations-section border radius-4 p-3">
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
