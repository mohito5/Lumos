import React from 'react';
import MasonryGrid from '../../../../shared/ui/Masonry';
import WeaponHeader from '../../ui/WeaponHeader';
import MaterialCard from '../../../../shared/ui/materials/MaterialCard';
import { resolveMaterialDisplay } from '../../../../shared/lib/materialsCalculator.js';

const WeaponInfoPageView = ({ 
    t,
    weapon,
    weaponLocale,
    baseAtk,
    subStatValue,
    displayLevel,
    levelIndex,
    levelSteps,
    refinementLevel,
    formattedPassiveDescription,
    calculatedMaterials,
    isRangeFromPrevious,
    onLevelChange,
    onRefinementChange,
    onIsRangeFromPreviousChange,
    currentPage,
 }) => {

    if (!weapon) {
        return <div className="page-placeholder">{t('ui:weapon.notFound', 'Оружие не найдено')}</div>;
    }

    return (
        <MasonryGrid>
            <article key="header" className="grid-item">
                <WeaponHeader weapon={weapon} weaponName={weaponLocale.name || weapon.id} currentPage={currentPage} />
            </article>

            {weaponLocale.description && (
                <article key="description" className="grid-item">
                    <p className="description b-d br-4 p-2 mar-b-4" dangerouslySetInnerHTML={{ __html: weaponLocale.description }} />
                </article>
            )}

            <article key="stats" className="grid-item">
                <div className="stats-sliders-section b-d br-4 p-3">
                    <h2>{t('ui:weapon.stats', 'Характеристики')}</h2>
                    <div className="slider-group f-c">
                        <label>{t('ui:weapon.level', 'Уровень')}: {displayLevel}</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                            <button onClick={() => onLevelChange(levelIndex - 1)} disabled={levelIndex <= 0}>-</button>
                            <input type="range" min="0" max={levelSteps.length - 1} value={levelIndex} onChange={e => onLevelChange(parseInt(e.target.value, 10))} style={{ flexGrow: 1 }} />
                            <button onClick={() => onLevelChange(levelIndex + 1)} disabled={levelIndex >= levelSteps.length - 1}>+</button>
                        </div>
                    </div>
                    <div className="stats-display">
                        <p>{t('stats:base_atk')}: {baseAtk}</p>
                        {weapon.main_stat?.stat && <p>{t(`stats:${weapon.main_stat.stat}`)}: {subStatValue}</p>}
                    </div>
                    <div className="ascension-calculator f-c g-2 mar-t-4">
                        <h3 className="materials-title">{t('ui:character.ascensionMaterials', 'Материалы для возвышения')}</h3>
                        <div className="toggle-switch">
                            <label className="b-d br-4 p-1">
                                <input type="checkbox" checked={isRangeFromPrevious} onChange={() => onIsRangeFromPreviousChange(p => !p)} />
                                <span className="slider br-4"></span>
                            </label>
                            <span>{t('ui:calculator.fromPrevious', 'С предыдущего возвышения')}</span>
                        </div>
                        <div className="calculated-materials g-2 f-r f-w">
                            {Object.entries(calculatedMaterials).map(([id, amount]) => {
                                if (amount <= 0) return null;
                                const material = resolveMaterialDisplay(id, t);
                                if (!material) return null;

                                return (
                                    <MaterialCard key={id} material={material}>
                                        <div className="material-amount-overlay">{Math.ceil(amount)}</div>
                                    </MaterialCard>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </article>

            <article key="passive" className="grid-item" column={2}>
                <div className="skills-section b-d br-4 p-3">
                    <h2>{weaponLocale.passiveName}</h2>
                    {weapon.passive && weapon.passive.length > 0 && (
                        <div className="slider-group f-c mar-b-2">
                             <label>{t('ui:weapon.refinement', 'Пробуждение')}: {refinementLevel}</label>
                            <div className="refinement-buttons" style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                                {[1, 2, 3, 4, 5].map(r => (
                                    <button
                                        key={r}
                                        className={`btn-sm ${refinementLevel === r ? 'btn-active' : ''}`}
                                        onClick={() => onRefinementChange(r)}
                                        style={{ flex: 1 }}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {formattedPassiveDescription && <p dangerouslySetInnerHTML={{ __html: formattedPassiveDescription }} />}
                </div>
            </article>
        </MasonryGrid>
    )
}

export default WeaponInfoPageView;
