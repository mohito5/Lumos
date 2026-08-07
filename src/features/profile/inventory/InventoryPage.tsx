// ============================================================================
// InventoryPage.tsx — главный компонент инвентаря
//
// Задача: только связать хуки с View.
// Вся логика — в useInventory, useOcrProcess, CvLoaderContext (статус OpenCV
// теперь общий на всё приложение — см. src/context/CvLoaderContext.jsx).
// Всё отображение — в InventoryPageView.
// ============================================================================

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { materialsData }  from '../../../data/materials/index.js';
import { useNavChrome, useFilterPanel } from '../../../shared/lib/context/ButtonManagerContext.jsx';
import { useCvStatus } from '../../../shared/lib/context/CvLoaderContext.jsx';
import InventoryPageView from './ui/InventoryPageView.jsx';

import { useInventory } from '../hooks/useInventory.js';
import { useOcrProcess } from '../hooks/useOcrProcess.js';


import type { FilterState, InventoryState, MaterialItem } from '../types/inventory.types.js';

// ─────────────────────────────────────────────────────────────────────────────

const InventoryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { setButtonType, setBackPath } = useNavChrome();
  const { isFilterPanelVisible, closeFilterPanel } = useFilterPanel();

  // Кнопка фильтра в хедере
  React.useEffect(() => {
    setButtonType(['back','filter']);
    setBackPath('/profile');
    return () => {
      setButtonType(null);
      setBackPath(null);
      closeFilterPanel();
    }
  }, [setButtonType, setBackPath, closeFilterPanel]);

  // ── Локальный UI-стейт ─────────────────────────────────────────────────
  const [filters, setFilters] = useState<FilterState>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isOcrModalOpen, setOcrModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Скрытый img для загрузки скриншота в cv.Mat
  const imgRef = useRef<HTMLImageElement>(null);

  // ── Хуки ──────────────────────────────────────────────────────────────
  const { inventory, updateQuantity, mergeInventory } = useInventory();
  const { status: cvLoadingStatus, ensureLoaded } = useCvStatus();

  // Инвентарь — одна из двух точек входа, которым реально нужен OpenCV
  // (вторая — DigitCalibrationPage). ensureLoaded() идемпотентен: если
  // загрузка уже идёт/завершена (например, пользователь уже открывал
  // калибровку), повторный вызов ничего не запускает заново.
  useEffect(() => {
    ensureLoaded();
  }, [ensureLoaded]);

  const { ocrProgress, isProcessing, scanResult, runOcr, resetProgress, confirmScan, discardScan } = useOcrProcess({
    allMaterials: materialsData as MaterialItem[],
    imgRef,
    onComplete: (result: InventoryState) => mergeInventory(result),
  });

  // ── OCR ───────────────────────────────────────────────────────────────
  const handleOcrProcess = async (): Promise<void> => {
    if (cvLoadingStatus !== 'ready' || !selectedFile) return;
    await runOcr(selectedFile);
  };

  const handleOcrReset = (): void => {
    resetProgress();
    setSelectedFile(null);
  };

  // ── Фильтрация материалов ──────────────────────────────────────────────
  const filteredMaterials = useMemo(() => {
    const lo = searchTerm.toLowerCase();
    return (materialsData as MaterialItem[]).filter((m) => {
      const matchCat = !filters.category || filters.category.includes(m.type);
      const matchRar = !filters.rarity || filters.rarity.includes(String(m.rarity));
      const name = String(t(`${m.id}.name`, { ns: 'materials', defaultValue: m.id }));
      const matchSearch = !searchTerm || name.toLowerCase().includes(lo);
      return matchCat && matchRar && matchSearch;
    });
  }, [filters, searchTerm, i18n.language]);

  // Уникальные значения для фильтр-панели
  const categories = useMemo(
    () => [...new Set((materialsData as MaterialItem[]).map((m) => m.type))],
    [],
  );
  const rarities = useMemo(
    () => [...new Set((materialsData as MaterialItem[]).map((m) => String(m.rarity)))],
    [],
  );

  // РАНЬШЕ: инвентарь использовал собственный InventoryFilterPanel (чекбоксы
  // с мгновенным применением) — единственная страница со списком, не
  // использующая общий GenericFilterPanel (см. CharacterListPage/
  // WeaponListPage — тот же паттерн: filterConfig + черновик + Применить/
  // Сбросить). Теперь инвентарь ведёт себя так же, как и остальные списки.
  const filterConfig = useMemo(
    () => [
      { title: 'filters.category', group: 'category', options: categories, optionsNamespace: 'ui' },
      { title: 'filters.rarity', group: 'rarity', options: rarities, optionsNamespace: 'ui' },
    ],
    [categories, rarities],
  );

  return (
    <>
      {/* Скрытый img-элемент для cv.imread */}
      <img ref={imgRef} style={{ display: 'none' }} alt="OCR Target" />

      <InventoryPageView
        t={t}
        inventory={inventory}
        filters={filters}
        isFilterPanelOpen={isFilterPanelVisible}
        isOcrModalOpen={isOcrModalOpen}
        cvLoadingStatus={cvLoadingStatus}
        ocrProgress={ocrProgress}
        isProcessing={isProcessing}
        scanResult={scanResult}
        allMaterials={materialsData as MaterialItem[]}
        onConfirmScan={confirmScan}
        onDiscardScan={discardScan}
        onApplyFilters={setFilters}
        onCloseFilterPanel={closeFilterPanel}
        filterConfig={filterConfig}
        onOpenOcrModal={() => { handleOcrReset(); setOcrModalOpen(true); }}
        onCloseOcrModal={() => setOcrModalOpen(false)}
        onOcrProcess={handleOcrProcess}
        onOcrReset={handleOcrReset}
        filteredMaterials={filteredMaterials}
        handleQuantityChange={updateQuantity}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
    </>
  );
};

export default InventoryPage;