
import React from 'react';
import MasonryGrid from '../../../../shared/ui/Masonry';
import WeaponHeader from '../../ui/WeaponHeader';
import FarmingScheduler from './FarmingScheduler';
import DeleteConfirmationModal from '../../../../shared/ui/common/DeleteConfirmationModal';
import LevelSelector from '../../../characters/materials/ui/LevelSelector';
import MaterialsGrid from '../../../characters/materials/ui/MaterialsGrid';

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
        <section className='flex-c wd gap-4'>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={onCloseDeleteModal}
                onConfirm={onConfirmDelete}
                itemName={weaponName}
                type="weapon"
            />
            <article key="header" className="grid-item">
                <WeaponHeader weapon={weapon} weaponName={weaponName} currentPage="materials" />
            </article>
            
            <article key="selectors" className="grid-item">
                <div className="selectors-container border radius-4 p-3">
                    <LevelSelector type="level" from={buildData.levelRange.from} to={buildData.levelRange.to} onChange={onRangeChange} t={t} isWeapon />
                </div>
            </article>

            <article key="materials" className="grid-item" column={2}>
                 <div className="action-buttons border radius-4 p-3">
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
                <h2>{t('weapons.pageMaterials.total')}</h2>
                <section className="all">
                     <MaterialsGrid 
                        materials={allMaterials} 
                        inventory={inventory}
                        onInventoryChange={onInventoryChange}
                     />
                </section>
            </article>
        </section>
    );
};

export default WeaponMaterialsPageView;
