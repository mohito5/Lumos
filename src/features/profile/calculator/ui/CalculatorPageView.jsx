import React from 'react';
import CharacterSelector from '../../CharacterSelector.jsx';
import WeaponSelector from '../../WeaponSelector.jsx';
import ArtifactSlot from '../../ArtifactSlot.jsx';
import FinalStats from '../lib/FinalStats.jsx';
import MasonryGrid from '../../../../shared/ui/Masonry.jsx';
import LevelSlider from '../../LevelSlider.jsx';

const CalculatorPageView = ({
    t,
    character, weapon, artifacts, finalStats, activeSetBonuses,
    level, weaponLevel,
    characters, weapons, artifactSets, allArtifactStats, statNames,
    buildName, onBuildNameChange,
    saveExists, isDirty, isLoading,
    onCharacterSelect, onLevelChange, onWeaponSelect, onWeaponLevelChange,
    onArtifactSave, onSaveBuild, onDeleteBuild, onReset,
}) => {
    return (
        <div className="page wd">
            <MasonryGrid>
                <h1 className="grid-item" column={1}>{t('calculator.title')}</h1>

                <div className="calculator-left grid-item" column={1}>
                    <section className="calculator-section border radius-4 p-2">
                        <h2>{t('calculator.selectCharacter')}</h2>
                        <CharacterSelector
                            onSelect={onCharacterSelect}
                            selectedCharacter={character}
                            characters={characters}
                        />

                        {character && (
                            <>
                                <section>
                                    <label className="calculator-build-name-label" htmlFor="calculator-build-name">
                                        {t('calculator.buildName', 'Build name')}
                                    </label>
                                    <input
                                        id="calculator-build-name"
                                        type="text"
                                        className="calculator-build-name-input"
                                        value={buildName}
                                        onChange={(e) => onBuildNameChange(e.target.value)}
                                        placeholder={t(`${character.id}.name`, { ns: 'characters', defaultValue: character.name })}
                                        maxLength={40}
                                    />
                                </section>
                                <section>
                                    <h4>{t('calculator.level')}</h4>
                                    <LevelSlider
                                        selectedLevel={level}
                                        onLevelChange={onLevelChange}
                                    />
                                </section>
                            </>
                        )}
                    </section>
                    <section className="calculator-section grid-item border p-2 radius-4" column={1}>
                        <h2>{t('calculator.selectWeapon')}</h2>
                        <WeaponSelector
                            character={character}
                            onSelect={onWeaponSelect}
                            selectedWeapon={weapon}
                            weapons={weapons}
                        />
                    </section>
                    {weapon && (
                        <section className="calculator-section">
                            <h2>{t('calculator.weaponLevel')}</h2>
                            <LevelSlider
                                selectedLevel={weaponLevel}
                                onLevelChange={onWeaponLevelChange}
                            />
                        </section>
                    )}
                </div>

                <div className="calculator-right grid-item" column={2}>
                    <section className="calculator-section artifacts-section border radius-4 p-2">
                        <h2>{t('calculator.selectArtifacts')}</h2>
                        <div className="artifacts-slots">
                            {Object.keys(artifacts).map(slot => (
                                <ArtifactSlot
                                    key={slot}
                                    slotType={slot}
                                    onSave={onArtifactSave}
                                    artifact={artifacts[slot]}
                                    character={character}
                                    artifactSets={artifactSets}
                                    allArtifactStats={allArtifactStats}
                                    statNames={statNames}
                                />
                            ))}
                        </div>
                        <div className="set-bonuses">
                            <h3>{t('calculator.setBonuses')}</h3>
                            {activeSetBonuses.length > 0 ? (
                                <ul>
                                    {activeSetBonuses.map(bonus => (
                                        <li key={`${bonus.setName}-${bonus.piece}`}>
                                            <strong>{bonus.setName} ({bonus.piece}-pc):</strong> {bonus.effect}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{t('calculator.noActiveBonuses')}</p>
                            )}
                        </div>
                    </section>
                </div>

                <section className="calculator-section final-stats-section border radius-4 p-2" column={1,2}>
                    <h2>{t('calculator.finalStats')}</h2>
                    <FinalStats stats={finalStats} statNames={statNames} />
                </section>

                <div className="calculator-controls border">
                    <button className="calc-btn secondary" onClick={onReset}>{t('calculator.reset')}</button>
                    {saveExists && <button className="calc-btn" onClick={onDeleteBuild}>{t('calculator.deleteBuild')}</button>}

                    {saveExists && isDirty ? (
                        <button className="calc-btn primary" onClick={onSaveBuild} disabled={!character || isLoading}>{t('calculator.updateBuild')}</button>
                    ) : (
                        <button className="calc-btn primary" onClick={onSaveBuild} disabled={!character || isLoading || (saveExists && !isDirty)}>{t('calculator.saveBuild')}</button>
                    )}
                </div>
            </MasonryGrid>
        </div>
    );
};

export default CalculatorPageView;
