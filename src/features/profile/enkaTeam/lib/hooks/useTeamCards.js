import { useCallback } from 'react';
import { useAppStore } from '../../../../../shared/lib/store/useAppStore';

// 2-4 команды обсуждались — беру верхнюю границу для гибкости (пользователь
// сам решает, сколько реально использовать, лимит — просто защита от
// разрастания, не жёсткое ограничение "на всех хватит только 2").
export const TEAM_CARDS_MAX = 4;
export const TEAM_SIZE = 4;

const genId = () => `team_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

/**
 * Карточки отряда — ссылаются на персонажей из useCharacterLibrary по id,
 * НЕ дублируют их данные (см. TeamCard в telegramSyncManager.ts).
 */
export function useTeamCards() {
    const appData = useAppStore((state) => state.appData);
    const setData = useAppStore((state) => state.setData);

    const teams = appData?.teamCards ?? [];

    /** @returns {string|null} id новой команды или null, если лимит достигнут */
    const create = useCallback((name, characterIds) => {
        const current = appData?.teamCards ?? [];
        if (current.length >= TEAM_CARDS_MAX) return null;

        const team = {
            id: genId(),
            name: name || '',
            characterIds: characterIds.slice(0, TEAM_SIZE),
            createdAt: Date.now(),
        };
        setData({ teamCards: [...current, team] }, { immediate: true });
        return team.id;
    }, [appData?.teamCards, setData]);

    const update = useCallback((teamId, patch) => {
        const current = appData?.teamCards ?? [];
        setData({
            teamCards: current.map((t) => (t.id === teamId ? { ...t, ...patch } : t)),
        }, { immediate: true });
    }, [appData?.teamCards, setData]);

    const remove = useCallback((teamId) => {
        const current = appData?.teamCards ?? [];
        setData({ teamCards: current.filter((t) => t.id !== teamId) }, { immediate: true });
    }, [appData?.teamCards, setData]);

    return { teams, create, update, remove, max: TEAM_CARDS_MAX, teamSize: TEAM_SIZE };
}
