
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import allCharacters from '../../data/characters/index';
import { LEVEL_MILESTONES } from '../../app/constants';
import { calculateCharacterMaterials } from '../../core/utils/materialsCalculator';
import './CharacterMaterialsPage.css';
import { useDataManager } from '../../hooks/useDataManager';
import CharacterMaterialsPageView from './views/CharacterMaterialsPageView';
import { useInventory } from '../profile/hooks/useInventory';
import { useResourceAllocator } from '../profile/hooks/useResourceAllocator';
import { materialsById } from '../../data/materials';

const defaultBuildData = {
    levelRange: { from: 0, to: LEVEL_MILESTONES.length - 1 },
    attackRange: { from: 1, to: 10 },
    skillRange: { from: 1, to: 10 },
    burstRange: { from: 1, to: 10 },
    useInventory: false,
    localMaterials: {},
};

const CharacterMaterialsPage = () => {
    const { characterId } = useParams();
    const { t, i18n } = useTranslation(['characters', 'ui', 'notifications']);
    const { inventory } = useInventory();

    const [character, setCharacter] = useState(null);
    const [buildData, setBuildData] = useState(defaultBuildData);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const {
        saveExists,
        savedData,
        saveData,
        deleteData,
    } = useDataManager(characterId, 'character', buildData, defaultBuildData, isDirty, setIsDirty);

    useEffect(() => {
        const charData = allCharacters.find(c => c.id.toLowerCase() === characterId.toLowerCase());
        setCharacter(charData);
    }, [characterId]);

    // buildData инициализируем из savedData только при смене персонажа (characterId).
    // НЕ синхронизируем при каждом изменении savedData — иначе при сохранении
    // appData меняется → savedData пересчитывается → useEffect сбрасывает
    // текущий buildData пользователя (в т.ч. чекбокс useInventory).
    const lastLoadedCharRef = useRef(null);
    useEffect(() => {
        if (lastLoadedCharRef.current !== characterId) {
            lastLoadedCharRef.current = characterId;
            setBuildData(savedData);
            setIsDirty(false);
        }
    }, [characterId, savedData]);  // savedData в deps чтобы дождаться загрузки из стора

    const handleRangeChange = useCallback((type, field, value) => {
        setBuildData(prevData => {
            const setters = { level: 'levelRange', attack: 'attackRange', skill: 'skillRange', burst: 'burstRange' };
            const rangeKey = setters[type];
            const currentRange = prevData[rangeKey];
            const newRange = { ...currentRange, [field]: value };

            if (field === 'from' && value > newRange.to) newRange.to = value;
            if (field === 'to' && value < newRange.from) newRange.from = value;

            return { ...prevData, [rangeKey]: newRange };
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

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteData();
        setBuildData(defaultBuildData);
        setDeleteModalOpen(false);
    };

    const charName = useMemo(() => t(`${characterId}.name`, { ns: 'characters' }), [characterId, t]);

    // allMaterials: { materialId → count } — для отображения списка материалов
    const allMaterials = useMemo(
        () => calculateCharacterMaterials(character, buildData),
        [character, buildData]
    );

    // materialsBySid: { sid → count } — для useResourceAllocator и сохранения в стор
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
            // Сравниваем JSON чтобы не вызывать лишние ре-рендеры
            if (JSON.stringify(prev.materials) === JSON.stringify(materialsBySid)) return prev;
            return { ...prev, materials: materialsBySid };
        });
    }, [materialsBySid]);

    // Live-превью для useResourceAllocator: пока страница открыта — даже без
    // клика "Сохранить" — используем ТЕКУЩИЕ (живые) потребности в материалах
    // вместо замороженных данных последнего сохранения. Благодаря этому смена
    // диапазона уровня/талантов сразу отражается в отображаемом инвентаре.
    const liveOverride = useMemo(() => {
        if (!character?.id) return null;
        return { id: character.id, materialsBySid, useInventory: buildData.useInventory };
    }, [character?.id, materialsBySid, buildData.useInventory]);

    const { allocatedResources } = useResourceAllocator(liveOverride);

    // При useInventory=true — показываем сколько есть в глобальном инвентаре
    // для каждого материала из allMaterials (по materialId).
    // ВАЖНО: appData.inventory в реальности хранится по materialId (так его
    // пишут DraggableMaterialCard при ручном вводе и OCR-пайплайн в
    // useOcrProcess/template-matching) — это НЕ { sid → count }, поэтому
    // здесь нужен прямой доступ по matId, без похода через mat.sid.
    const inventoryToShow = useMemo(() => {
        if (!buildData.useInventory) {
            return buildData.localMaterials || {};
        }
        // Используем allocatedResources если сборка сохранена, иначе — прямой доступ к инвентарю
        const allocated = allocatedResources[character?.id];
        if (allocated && Object.keys(allocated).length > 0) {
            return allocated;
        }
        // Сборка не сохранена — конвертируем инвентарь напрямую для материалов из allMaterials
        const result = {};
        for (const matId in allMaterials) {
            result[matId] = inventory[matId] ?? 0;
        }
        return result;
    }, [buildData.useInventory, buildData.localMaterials, allocatedResources, character?.id, allMaterials, inventory]);

    // При useInventory=true — поле только для чтения, no-op чтобы MaterialProgressCard не падал
    const inventoryChangeHandler = buildData.useInventory
        ? () => {}
        : handleLocalMaterialsChange;

    return (
        <CharacterMaterialsPageView
            character={character}
            charName={charName}
            isDeleteModalOpen={isDeleteModalOpen}
            onDeleteModalClose={() => setDeleteModalOpen(false)}
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
            lang={i18n.language}
            t={t}
        />
    );
};

export default CharacterMaterialsPage;
