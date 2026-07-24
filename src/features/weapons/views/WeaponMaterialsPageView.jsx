
import React from 'react';
import MasonryGrid from '../../../components/masonry';
import WeaponHeader from '../WeaponHeader';
import FarmingScheduler from '../components/FarmingScheduler';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import LevelSelector from '../../characters/components/LevelSelector';
import MaterialsGrid from '../../characters/components/MaterialsGrid';

const WeaponMaterialsPageView = ({
    weapon,
    weaponName,
    isDeleteModalOpen,
    onCloseDeleteModal,
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
    t
}) => {
    if (!weapon) {
        return <div>{t('weapon.notFound')}</div>;
    }

    return (
        <MasonryGrid>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={onCloseDeleteModal}
                onConfirm={onConfirmDelete}
                itemName={weaponName}
            />
            <article key="header" className="grid-item">
                <WeaponHeader weapon={weapon} weaponName={weaponName} currentPage="materials" />
            </article>
            
            <article key="selectors" className="grid-item">
                <div className="selectors-container b-d br-4 p-2">
                    <LevelSelector type="level" from={buildData.levelRange.from} to={buildData.levelRange.to} onChange={onRangeChange} t={t} isWeapon />
                </div>
            </article>

            <article key="materials" className="grid-item" column={2}>
                 <div className="action-buttons">
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
                    <FarmingScheduler allMaterials={allMaterials} inventory={inventory} weapon={weapon} canPin={saveExists} />
                </div>
                <h2 data-i18n-key="pages.weapons.pageMaterials.total">{t('pages.weapons.pageMaterials.total')}</h2>
                <section className="all">
                     <MaterialsGrid 
                        materials={allMaterials} 
                        inventory={inventory}
                        onInventoryChange={onInventoryChange}
                     />
                </section>
            </article>
        </MasonryGrid>
    );
};

export default WeaponMaterialsPageView;
