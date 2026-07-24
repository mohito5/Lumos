// ═══════════════════════════════════════════════════════════════════════════
// ВАЖНО: этот модуль — ТОЛЬКО ПРЕВЬЮ/ОТОБРАЖЕНИЕ.
//
// allocateResources()/useResourceAllocator() вычисляют, КАК распределились бы
// материалы инвентаря между сборками по приоритету — но НИЧЕГО не пишут и не
// списывают. appData.inventory не изменяется, в CloudStorage/localStorage
// ничего не сохраняется. Это чистая функция от текущего состояния для
// MaterialsGrid — реальное списание материалов происходит только на странице
// апгрейда персонажа/оружия (через useDataManager), когда пользователь явно
// подтверждает трату. Если понадобится РЕАЛЬНОЕ списание — это отдельная,
// пока не реализованная функциональность, а не то, что делает этот хук.
// ═══════════════════════════════════════════════════════════════════════════

import { useMemo } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { materialsData, materialsById } from '../../../data/materials';

// Обратный маппинг: sid → все материалы с этим sid
// (sid группирует материалы-аналоги, но у каждого sid обычно один materialId)
const sidToMaterialId = new Map(
    materialsData.map(m => [m.sid, m.id])
);

/**
 * Чистая (без React) версия распределения — вынесена из хука отдельно, чтобы
 * её можно было unit-тестировать без рендера компонентов/мока useAppStore.
 * useResourceAllocator ниже — тонкая обёртка: просто подставляет appData из
 * стора в useMemo.
 *
 * Алгоритм (spec new_sync_architecture.txt §3.1):
 *  1. Создаём временную копию инвентаря (tempInventory): { sid → count }
 *  2. Обходим сборки в порядке g_priority.
 *  3. ui=false → возвращаем lm (localMaterials) — { sid → count } — конвертируем в { materialId → count }
 *  4. ui=true  → берём save.materials ({ sid → needed }), выделяем из tempInventory
 *  5. Сборки не в priority — в конце.
 *
 * ВАЖНО: g_inventory (appData.inventory) в реальности хранится как
 * { materialId → count } — так его пишут DraggableMaterialCard (ручной ввод)
 * и OCR-пайплайн (useOcrProcess/template-matching). Только save.materials и
 * save.lm внутри сейвов сборок используют компактный sid-формат. Поэтому
 * ниже инвентарь конвертируется в sid-форму перед сопоставлением.
 * Возвращаемый allocatedResources[id] — { materialId → count } для MaterialsGrid.
 *
 * @param {object} appData — весь appData из useAppStore (inventory/savedChars/savedWeaps/priority)
 * @param {{ id: string, materialsBySid: Record<string, number>, useInventory: boolean } | null} [liveOverride]
 *   Позволяет странице улучшения, которую сейчас редактируют, подставить СВОИ
 *   живые (ещё не сохранённые) потребности в материалах вместо замороженного
 *   save.materials из последнего сохранения — например, при изменении уровня
 *   прокачки инвентарь на странице сразу пересчитывается, без клика "Сохранить".
 *   Остальные сборки в цепочке приоритета по-прежнему считаются по своим
 *   последним сохранённым данным (мы не знаем их live-состояние).
 * @returns {Record<string, Record<string, number>>} allocatedResources
 */
export const allocateResources = (appData, liveOverride = null) => {
    if (!appData) return {};

    // appData.inventory хранится как { materialId → count } (см. комментарий
    // выше) — конвертируем в { sid → count }, чтобы сравнивать с save.materials/save.lm
    const inventoryByMaterialId = appData.inventory || {};
    const inventory = {};
    for (const matId in inventoryByMaterialId) {
        const mat = materialsById.get(matId);
        if (mat?.sid) {
            inventory[mat.sid] = inventoryByMaterialId[matId];
        }
    }

    const savedChars = appData.savedChars || [];
    const savedWeaps = appData.savedWeaps || [];
    const priority = appData.priority || [];

    const allSaves = [...savedChars, ...savedWeaps];

    // Временная копия инвентаря: { sid → remainingCount }
    const tempInventory = { ...inventory };
    const result = {};

    /**
     * Конвертировать { sid → count } → { materialId → count }
     * для отображения в MaterialsGrid.
     */
    const sidMapToMaterialId = (sidMap) => {
        const out = {};
        for (const sid in sidMap) {
            const matId = sidToMaterialId.get(sid);
            if (matId) out[matId] = sidMap[sid];
        }
        return out;
    };

    const processSave = (save) => {
        const id = save.i ?? save.ci;
        if (!id) return;

        const isLive = liveOverride && liveOverride.id === id;
        const effectiveUi = isLive ? liveOverride.useInventory : (save.ui !== false);

        if (!effectiveUi) {
            // Локальные материалы — lm хранится как { sid → count }.
            // Для live-превью с выключенным чекбоксом эта ветка не нужна —
            // вызывающая страница в этом случае вообще не смотрит в allocatedResources.
            result[id] = sidMapToMaterialId(save.lm || {});
            return;
        }

        // ui=true: materials = { sid → needed }, выделяем из tempInventory.
        // Для редактируемой сейчас сборки берём ЖИВЫЕ потребности вместо
        // замороженных save.materials — вот что даёт динамический пересчёт
        // при изменении уровня прокачки без пересохранения.
        const required = isLive ? liveOverride.materialsBySid : (save.materials || {});
        const providedBySid = {};

        for (const sid in required) {
            const needed = required[sid];
            const available = tempInventory[sid] || 0;
            const canGive = Math.min(needed, available);
            providedBySid[sid] = canGive;
            if (canGive > 0) {
                tempInventory[sid] = available - canGive;
            }
        }

        // Конвертируем { sid → allocatedCount } → { materialId → allocatedCount }
        result[id] = sidMapToMaterialId(providedBySid);
    };

    // Шаг 1: сборки из priority (по порядку приоритета)
    const prioritySet = new Set(priority);
    for (const id of priority) {
        const save = allSaves.find(s => (s.i ?? s.ci) === id);
        if (save) processSave(save);
    }

    // Шаг 2: остальные сборки (не в priority), в порядке сохранения
    for (const save of allSaves) {
        const id = save.i ?? save.ci;
        if (id && !prioritySet.has(id)) processSave(save);
    }

    return result;
};

/**
 * @param {{ id: string, materialsBySid: Record<string, number>, useInventory: boolean } | null} [liveOverride]
 * @returns {{ allocatedResources: Record<string, Record<string, number>> }}
 */
export const useResourceAllocator = (liveOverride = null) => {
    const { appData } = useAppStore();

    const allocatedResources = useMemo(
        () => allocateResources(appData, liveOverride),
        [appData, liveOverride]
    );

    return { allocatedResources };
};
