import { useAppStore } from '../../../store/useAppStore';
import { useCallback } from 'react';

/**
 * Хук для работы с глобальным инвентарём (g_inventory).
 *
 * Инвентарь хранится как { [materialId: string]: number } — см. канонический
 * тип InventoryState в types/inventory.types.ts. Ключ — material.id (например
 * 'mora'), а НЕ material.sid (компактный sid используется только внутри
 * сейвов сборок — поля save.materials / save.lm — и нигде в самом инвентаре).
 * Так инвентарь реально пишут DraggableMaterialCard (ручной ввод) и
 * OCR-пайплайн (useOcrProcess → mergeInventory, ключи из OcrResult.materialId).
 * Никогда не изменяется напрямую — только через setData (который дебаунсом
 * синхронизирует в CloudStorage; в localStorage пишет немедленно — см. saveLocal
 * в telegramSyncManager.ts).
 */
export const useInventory = () => {
    const { appData, setData } = useAppStore();

    // Защита от null пока идёт инициализация
    const inventory: Record<string, number> = appData?.inventory ?? {};

    const setInventory = useCallback((newInventory: Record<string, number>, immediate = false) => {
        setData({ inventory: newInventory }, { immediate });
    }, [setData]);

    // Ручной посимвольный ввод количества — оставляем на debounce, чтобы не
    // дёргать Telegram CloudStorage API на каждое нажатие клавиши.
    const updateQuantity = useCallback((materialId: string, quantity: number) => {
        const newInventory = { ...inventory, [materialId]: Math.max(0, quantity) };
        setInventory(newInventory);
    }, [inventory, setInventory]);

    // Массовое обновление после OCR-скана — редкое, важное, дискретное
    // действие (пользователь только что отсканировал инвентарь); ждать
    // debounce здесь так же не должны, как и явное сохранение сборки.
    const mergeInventory = useCallback((updates: Record<string, number>) => {
        const newInventory = { ...inventory, ...updates };
        setInventory(newInventory, true);
    }, [inventory, setInventory]);

    return { inventory, updateQuantity, mergeInventory };
};
