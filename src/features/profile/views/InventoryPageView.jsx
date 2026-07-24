import React from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import InventoryFilterPanel from '../components/InventoryFilterPanel';
import OcrImportModal from '../components/OcrImportModal';
import DraggableMaterialCard from '../components/DraggableMaterialCard';
import { SearchBar } from '../../../components/SearchBar';

const InventoryPageView = ({ 
    t, i18n, inventory, filters, isFilterPanelOpen, isOcrModalOpen,
    cvLoadingStatus, ocrProgress, isProcessing, onFilterChange, onCloseFilterPanel,
    onOpenOcrModal, onCloseOcrModal, onOcrProcess, onOcrReset,
    filteredMaterials, handleQuantityChange, categories, rarities, 
    searchTerm, setSearchTerm, clearCalibration, gridDetectionMethod, 
    selectedFile, setSelectedFile, onCalibrationComplete
}) => {

    const mainContentClass = classNames('main-content f-c', { 'filter-panel-open': isFilterPanelOpen });

    // distance-констрейнт: карточка материала целиком draggable (см.
    // DraggableMaterialCard) и внутри неё есть number-инпут — небольшой
    // порог движения не даёт обычному клику/тапу по инпуту запускать drag.
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    );

    return (
        <DndContext sensors={sensors}>
            <AnimatePresence>
                {isFilterPanelOpen && (
                    <InventoryFilterPanel 
                        isOpen={isFilterPanelOpen}
                        onClose={onCloseFilterPanel}
                        filters={filters}
                        onFilterChange={onFilterChange}
                        categories={categories}
                        rarities={rarities}
                        t={t}
                    />
                )}
            </AnimatePresence>

            <div className="page-container inventory-page">
                <main className={mainContentClass}>
                    <div className="main-header">
                        <h1>{t('pages.inventory.title', 'Inventory')}</h1>
                        <button onClick={onOpenOcrModal} className="action-button primary-button">
                            {t('inventory.ocr.scanButton', 'Scan Screenshot')}
                        </button>
                    </div>
                    <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} t={t} />
                    <div className="material-grid g-2">
                        {filteredMaterials.map(material => (
                            <DraggableMaterialCard 
                                key={material.id}
                                material={material}
                                t={t}
                                i18n={i18n}
                                quantity={inventory[material.id] || 0}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))}
                    </div>
                </main>

                <AnimatePresence>
                    {isOcrModalOpen && 
                        <OcrImportModal 
                            isOpen={isOcrModalOpen}
                            onClose={onCloseOcrModal} 
                            onProcess={onOcrProcess}
                            onReset={onOcrReset}
                            cvLoadingStatus={cvLoadingStatus}
                            ocrProgress={ocrProgress}
                            isProcessing={isProcessing}
                            clearCalibration={clearCalibration}
                            gridDetectionMethod={gridDetectionMethod}
                            selectedFile={selectedFile}
                            onFileChange={setSelectedFile}
                            onCalibrationComplete={onCalibrationComplete}
                        />
                    }
                </AnimatePresence>
            </div>
        </DndContext>
    );
};

export default InventoryPageView;