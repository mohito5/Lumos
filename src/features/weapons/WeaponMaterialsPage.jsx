import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import weaponsData from '../../data/weapons/index';
import { LEVEL_MILESTONES } from '../../app/constants';
import { calculateWeaponMaterials } from '../../core/utils/materialsCalculator';
import { useDataManager } from '../../hooks/useDataManager';
import WeaponMaterialsPageView from './views/WeaponMaterialsPageView';
import { useInventory } from '../profile/hooks/useInventory';
import { useResourceAllocator } from '../profile/hooks/useResourceAllocator';
import { materialsById } from '../../data/materials';

const defaultBuildData = {
    levelRange: { from: 0, to: LEVEL_MILESTONES.length - 1 },
    useInventory: false,
    localMaterials: {},
};

const WeaponMaterialsPage = () => {
    const { id } = useParams();
    const { t } = useTranslation(['weapons', 'ui', 'notifications']);
    const { inventory } = useInventory();
    
    const weapon = useMemo(() => 
        weaponsData.find(w => w.id.toLowerCase() === id.toLowerCase()), 
    [id]);

    const weaponName = useMemo(() => {
        if (!weapon) return 'Weapon Not Found';
        return t(`${weapon.id}.name`);
    }, [weapon, t]);

    const [buildData, setBuildData] = useState(defaultBuildData);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const {
        saveExists,
        savedData,
        saveData,
        deleteData,
    } = useDataManager(weapon ? weapon.id : '', 'weapon', buildData, defaultBuildData, isDirty, setIsDirty);

    // Синхронизируем buildData только при смене оружия — не при каждом сохранении
    const lastLoadedWeapRef = useRef(null);
    useEffect(() => {
        if (lastLoadedWeapRef.current !== id) {
            lastLoadedWeapRef.current = id;
            setBuildData(savedData);
            setIsDirty(false);
        }
    }, [id, savedData]);

    const handleRangeChange = useCallback((type, field, value) => {
        setBuildData(prevData => {
            const newRange = { ...prevData.levelRange, [field]: value };
            if (field === 'from' && value > newRange.to) newRange.to = value;
            if (field === 'to' && value < newRange.from) newRange.from = value;
            return { ...prevData, levelRange: newRange };
        });
        setIsDirty(true);
    }, []);

    const handleLocalMaterialsChange = (materialId, newAmount) => {
        setBuildData(prevData => ({
            ...prevData,
            localMaterials: {
                ...(prevData.localMaterials || {}),
                [materialId]: newAmount,
            }
        }));
        setIsDirty(true);
    };

    const handleCheckboxChange = useCallback(() => {
        setBuildData(prevData => ({ ...prevData, useInventory: !prevData.useInventory }));
        setIsDirty(true);
    }, []);

    const handleDeleteClick = () => setDeleteModalOpen(true);

    const handleConfirmDelete = () => {
        deleteData();
        setBuildData(defaultBuildData);
        setDeleteModalOpen(false);
    };

    // allMaterials: { materialId → count } — для отображения
    const allMaterials = useMemo(
        () => calculateWeaponMaterials(weapon, buildData),
        [weapon, buildData]
    );

    // materialsBySid: { sid → count } — для useResourceAllocator и сохранения
    const materialsBySid = useMemo(() => {
        const result = {};
        for (const matId in allMaterials) {
            const mat = materialsById.get(matId);
            if (mat?.sid) {
                result[mat.sid] = (result[mat.sid] || 0) + allMaterials[matId];
            }
        }
        return result;
    }, [allMaterials]);

    // Синхронизируем materialsBySid в buildData чтобы useDataManager включил в сейв
    useEffect(() => {
        setBuildData(prev => {
            if (JSON.stringify(prev.materials) === JSON.stringify(materialsBySid)) return prev;
            return { ...prev, materials: materialsBySid };
        });
    }, [materialsBySid]);

    // Live-превью: пересчитываем распределение инвентаря по ЖИВЫМ (ещё не
    // сохранённым) потребностям этой сборки — см. комментарий в
    // CharacterMaterialsPage.jsx для полного объяснения.
    const liveOverride = useMemo(() => {
        if (!weapon?.id) return null;
        return { id: weapon.id, materialsBySid, useInventory: buildData.useInventory };
    }, [weapon?.id, materialsBySid, buildData.useInventory]);

    const { allocatedResources } = useResourceAllocator(liveOverride);

    // ВАЖНО: appData.inventory в реальности хранится по materialId (так его
    // пишут DraggableMaterialCard при ручном вводе и OCR-пайплайн), а НЕ
    // по sid — поэтому здесь нужен прямой доступ по matId.
    const inventoryToShow = useMemo(() => {
        if (!buildData.useInventory) {
            return buildData.localMaterials || {};
        }
        const allocated = allocatedResources[weapon?.id];
        if (allocated && Object.keys(allocated).length > 0) {
            return allocated;
        }
        // Сборка не сохранена — конвертируем инвентарь напрямую
        const result = {};
        for (const matId in allMaterials) {
            result[matId] = inventory[matId] ?? 0;
        }
        return result;
    }, [buildData.useInventory, buildData.localMaterials, allocatedResources, weapon?.id, allMaterials, inventory]);

    const inventoryChangeHandler = buildData.useInventory
        ? () => {}
        : handleLocalMaterialsChange;

    return (
        <WeaponMaterialsPageView
            weapon={weapon}
            weaponName={weaponName}
            isDeleteModalOpen={isDeleteModalOpen}
            onCloseDeleteModal={() => setDeleteModalOpen(false)}
            onConfirmDelete={handleConfirmDelete}
            buildData={buildData}
            onRangeChange={handleRangeChange}
            onSave={saveData}
            isDirty={isDirty}
            saveExists={saveExists}
            onDelete={handleDeleteClick}
            allMaterials={allMaterials}
            inventory={inventoryToShow}
            onInventoryChange={inventoryChangeHandler}
            onCheckboxChange={handleCheckboxChange}
            t={t}
        />
    );
};

export default WeaponMaterialsPage;
