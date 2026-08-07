import { useCallback } from 'react';
import { useAppStore } from '../../../../shared/lib/store/useAppStore';
import { compactLibraryEntry } from '../../enka/enkaLibraryCompact';

// 32, а не изначально предложенные 16 — по итогам обсуждения: реальный
// лимит CloudStorage (1024 ключей × 4096 симв.) не является узким местом
// даже для полного ростера персонажей, ограничение здесь — про
// производительность синхронизации (меньше чанков = быстрее fetchAllCloud
// на каждом старте приложения) и простоту UX, а не про технический потолок.
export const CHARACTER_LIBRARY_MAX = 32;

/**
 * Накопительная библиотека персонажей — персонажи из Enka-импорта копятся
 * здесь между сессиями (обходя ограничение Enka в 8 персонажей на стенде за
 * раз), хранится компактно (см. enkaLibraryCompact.js — без картинок).
 */
export function useCharacterLibrary() {
    const appData = useAppStore((state) => state.appData);
    const setData = useAppStore((state) => state.setData);

    const library = appData?.characterLibrary ?? [];

    /**
     * Добавляет/обновляет пачку персонажей из свежего импорта. Существующий
     * по id персонаж — ОБНОВЛЯЕТСЯ целиком (не мёржится по полям: билд мог
     * полностью измениться в игре — свежие данные всегда важнее старых).
     * Новый персонаж поверх лимита — НЕ добавляется молча, считается в
     * skipped, чтобы вызывающий код (EnkaProfile.jsx) мог сообщить об этом.
     *
     * @param {object[]} builds — массив build (extractFullBuild output)
     * @param {string} uid
     * @returns {{ added: number, updated: number, skippedUnmatched: number, skippedCapped: number }}
     */
    const addOrUpdate = useCallback((builds, uid) => {
        const current = appData?.characterLibrary ?? [];
        const byId = new Map(current.map((e) => [e.id, e]));

        let added = 0;
        let updated = 0;
        let skippedUnmatched = 0;
        let skippedCapped = 0;

        for (const build of builds) {
            const entry = compactLibraryEntry(build, uid);
            if (!entry) { skippedUnmatched++; continue; } // character не сопоставлен с данными проекта

            const exists = byId.has(entry.id);
            if (!exists && byId.size >= CHARACTER_LIBRARY_MAX) {
                skippedCapped++;
                continue;
            }

            byId.set(entry.id, entry);
            if (exists) updated++; else added++;
        }

        if (added > 0 || updated > 0) {
            setData({ characterLibrary: Array.from(byId.values()) }, { immediate: true });
        }

        return { added, updated, skippedUnmatched, skippedCapped };
    }, [appData?.characterLibrary, setData]);

    const remove = useCallback((characterId) => {
        const current = appData?.characterLibrary ?? [];
        setData({ characterLibrary: current.filter((e) => e.id !== characterId) }, { immediate: true });
    }, [appData?.characterLibrary, setData]);

    const clear = useCallback(() => {
        setData({ characterLibrary: [] }, { immediate: true });
    }, [setData]);

    return { library, addOrUpdate, remove, clear, max: CHARACTER_LIBRARY_MAX };
}
