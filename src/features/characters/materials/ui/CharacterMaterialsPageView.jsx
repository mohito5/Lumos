
import React from 'react';
import MasonryGrid from '../../../../shared/ui/Masonry';
import CharacterHeader from '../../ui/CharacterHeader';
import FarmingScheduler from './FarmingScheduler';
import DeleteConfirmationModal from '../../../../shared/ui/common/DeleteConfirmationModal';
import LevelSelector from './LevelSelector';
import MaterialsGrid from './MaterialsGrid';

const CharacterMaterialsPageView = ({
    character,
    charName,
    isDeleteModalOpen,
    onDeleteModalClose,
    onConfirmDelete,
    buildData,
    onRangeChange,
    onSave,
    isDirty,
    saveExists,
    onDelete,
    allMaterials,
    inventory,
    onInventoryChange,
    onCheckboxChange,
    lang,
    t
}) => {
    if (!character) {
        return <div>{t('character.notFound')}</div>;
    }

    return (
        <MasonryGrid>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                onConfirm={onConfirmDelete}
                itemName={charName}
                type="character"
            />
            <article key="header" className="grid-item">
                <CharacterHeader character={character} charName={charName} currentPage="materials" />
            </article>
            
            <article key="selectors" className="grid-item">
                <div className="selectors-container border radius-4 p-2">
                    <LevelSelector type="level" from={buildData.levelRange.from} to={buildData.levelRange.to} onChange={onRangeChange} t={t} />
                    <LevelSelector type="attack" from={buildData.attackRange.from} to={buildData.attackRange.to} onChange={onRangeChange} t={t} />
                    <LevelSelector type="skill" from={buildData.skillRange.from} to={buildData.skillRange.to} onChange={onRangeChange} t={t} />
                    <LevelSelector type="burst" from={buildData.burstRange.from} to={buildData.burstRange.to} onChange={onRangeChange} t={t} />
                </div>
            </article>

            <article key="button" className="grid-item" column={1}>
                <div className="action-buttons border flex p-2 radius-4 items-center gap-2">
                    <div className="use-inventory-checkbox">
                        <input 
                            type="checkbox" 
                            id="use-inventory-checkbox" 
                            checked={buildData.useInventory}
                            onChange={onCheckboxChange} 
                        />
                        <label htmlFor="use-inventory-checkbox">{t('ui.useInventory')}</label>
                    </div>
                    <button onClick={onSave} disabled={!isDirty}>
                        {saveExists ? t('buttons.update') : t('buttons.save')}
                    </button>
                    {saveExists && (
                        <button onClick={onDelete} className="delete-button">
                            {t('buttons.delete')}
                        </button>
                    )}
                    <FarmingScheduler allMaterials={allMaterials} inventory={inventory} character={character} canPin={saveExists} />
                </div>
            </article>

            <article key="materials" className="grid-item" column={2}>
                <h2>{t('character.materials.total', {ns: 'ui'})}</h2>
                <section className="all">
                     <MaterialsGrid 
                        materials={allMaterials} 
                        inventory={inventory}
                        onInventoryChange={onInventoryChange}
                        lang={lang} 
                     />
                </section>
            </article>
        </MasonryGrid>
    );
};

export default CharacterMaterialsPageView;
