import React from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import GenericFilterPanel from '../../../../shared/ui/common/FilterPanel';
import OcrImportModal from '../../components/OcrImportModal';
import DraggableMaterialCard from '../../components/DraggableMaterialCard';
import { SearchBar } from '../../../../shared/ui/SearchBar';

const InventoryPageView = ({ 
    t, i18n, inventory, filters, isFilterPanelOpen, isOcrModalOpen,
    cvLoadingStatus, ocrProgress, isProcessing, scanResult, allMaterials,
    onConfirmScan, onDiscardScan, onApplyFilters, onCloseFilterPanel,
    filterConfig, onOpenOcrModal, onCloseOcrModal, onOcrProcess, onOcrReset,
    filteredMaterials, handleQuantityChange,
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
            {/* Общий GenericFilterPanel (тот же, что на страницах персонажей
                и оружия) — сам решает isVisible/null внутри себя, без
                AnimatePresence (у него нет motion-переходов), поэтому не
                оборачиваем, как и на списках персонажей/оружия. */}
            <GenericFilterPanel
                initialFilters={filters}
                onApply={onApplyFilters}
                isVisible={isFilterPanelOpen}
                onClose={onCloseFilterPanel}
                filterConfig={filterConfig}
                translationNamespaces={['ui']}
            />

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
                            scanResult={scanResult}
                            allMaterials={allMaterials}
                            onConfirmScan={onConfirmScan}
                            onDiscardScan={onDiscardScan}
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