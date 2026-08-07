import { useCallback, useMemo } from 'react';
import { useAppStore } from '../../../../shared/lib/store/useAppStore';

/**
 * Управляет расписаниями фарма, закреплёнными на главной странице.
 *
 * Пин хранит ТОЛЬКО ссылку — { type, itemId, pinnedAt } — а не весь
 * посчитанный snapshot расписания. Раньше здесь лежал полный объект
 * { type, itemId, itemName, itemIcon, schedule }, из-за чего:
 *  1. запись в Telegram CloudStorage была тяжелее, чем нужно (там жёсткий
 *     лимит на ключ, для больших расписаний включалось чанкование);
 *  2. виджет показывал застывшие цифры — они обновлялись только когда
 *     пользователь ЗАХОДИЛ на страницу материалов этого персонажа/оружия
 *     повторно, а не при каждом реальном изменении инвентаря/сборки;
 *  3. пин никак не был связан с самой сохранённой сборкой персонажа/оружия
 *     — при удалении персонажа виджет на главной оставался сиротой.
 *
 * Теперь фактическое расписание считается заново при каждом рендере (см.
 * usePinnedFarmingSchedules) из текущего appData.savedChars/savedWeaps +
 * appData.inventory — это одновременно чинит все три проблемы: данные
 * всегда свежие, хранится всего пара десятков байт на пин, а «удалить
 * страницу → пропадает и виджет» получается само собой, т.к.
 * usePinnedFarmingSchedules просто не находит сборку по itemId и
 * подчищает такой пин через prunePins.
 */
export function useFarmingSchedulePins() {
    const appData = useAppStore((state) => state.appData);
    const setData = useAppStore((state) => state.setData);

    // Нормализация на чтение: старые пины (сохранённые до этого фикса) несут
    // с собой лишние itemName/itemIcon/schedule — они больше не нужны и не
    // используются, но раз уж читаем — сразу приводим к компактной форме.
    const pins = useMemo(() => {
        const raw = appData?.farmingSchedules || [];
        return raw.map((p) => ({ type: p.type, itemId: p.itemId, pinnedAt: p.pinnedAt || 0 }));
    }, [appData?.farmingSchedules]);

    const isPinned = useCallback(
        (type, itemId) => pins.some((p) => p.type === type && p.itemId === itemId),
        [pins]
    );

    const savePin = useCallback((type, itemId) => {
        const next = pins.filter((p) => !(p.type === type && p.itemId === itemId));
        next.push({ type, itemId, pinnedAt: Date.now() });
        // immediate:true — явное действие пользователя (клик «Закрепить»),
        // как и остальные явные действия в приложении (см. useAppStore.setData).
        setData({ farmingSchedules: next }, { immediate: true });
    }, [pins, setData]);

    const removePin = useCallback((type, itemId) => {
        const next = pins.filter((p) => !(p.type === type && p.itemId === itemId));
        setData({ farmingSchedules: next }, { immediate: true });
    }, [pins, setData]);

    /**
     * Массовая чистка «осиротевших» пинов за один setData (а не по одному
     * removePin в цикле — несколько синхронных removePin подряд читают один
     * и тот же устаревший pins из замыкания и затирают правки друг друга).
     * keepFn(pin) → true, если пин нужно оставить.
     */
    const prunePins = useCallback((keepFn) => {
        const next = pins.filter(keepFn);
        if (next.length !== pins.length) {
            setData({ farmingSchedules: next }, { immediate: true });
        }
    }, [pins, setData]);

    return { pins, isPinned, savePin, removePin, prunePins };
}
