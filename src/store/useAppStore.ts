import { create } from 'zustand';
import { initSync, saveLocal, saveToCloud, type AppData } from '../core/services/telegramSyncManager';

// ─── State ────────────────────────────────────────────────────────────────────

interface AppState {
    appData: AppData | null;
    isLoading: boolean;
    isSaving: boolean;
    isCloudStorageSupported: boolean;
    error: string | null;

    initialize: () => Promise<void>;
    // options.immediate=true пропускает debounce и сохраняет в облако сразу —
    // используется для явных, редких действий пользователя (Сохранить/Обновить
    // сборку, Удалить, изменение приоритета), где 1200мс задержка неприемлема.
    setData: (patch: Partial<AppData>, options?: { immediate?: boolean }) => void;
}

const CLOUD_DEBOUNCE_MS = 1200;

// ─── Store ────────────────────────────────────────────────────────────────────

const useAppStore = create<AppState>((set, get) => {

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let pendingCloudData: AppData | null = null;

    const runCloudSave = async (data: AppData) => {
        set({ isSaving: true });
        try {
            await saveToCloud(data);
        } catch (err) {
            console.error('[useAppStore] Cloud save failed:', err);
        } finally {
            set({ isSaving: false });
        }
    };

    /**
     * Немедленное сохранение в облако, в обход debounce.
     *
     * ВАЖНО: раньше ЛЮБОЕ изменение (включая клик по кнопке "Обновить") уходило
     * в облако только через 1200мс debounce вместе со всеми остальными
     * изменениями. Если Telegram Mini App закрывали быстрее (что для discrete-
     * действия вроде "нажал Сохранить и сразу вышел" — обычное дело), CloudStorage
     * так и не получал свежие данные, хотя localStorage уже был обновлён через
     * saveLocal. Проблема в том, что localStorage внутри WebView Telegram
     * ненадёжен как постоянное хранилище на некоторых платформах — именно
     * поэтому Telegram и даёт CloudStorage API. Explicit-действия (Save/Delete/
     * priority) теперь используют этот путь, минуя debounce полностью.
     */
    const flushCloudSave = (data: AppData) => {
        if (debounceTimer !== null) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }
        pendingCloudData = null;
        return runCloudSave(data);
    };

    // Откладывает сохранение в облако — только для частых малозначимых
    // изменений (например, посимвольный ввод количества в инвентаре), чтобы
    // не дёргать Telegram CloudStorage API на каждое нажатие клавиши.
    const scheduleCloudSave = (data: AppData) => {
        pendingCloudData = data;
        if (debounceTimer !== null) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            debounceTimer = null;
            const toSave = pendingCloudData;
            pendingCloudData = null;
            if (toSave) runCloudSave(toSave);
        }, CLOUD_DEBOUNCE_MS);
    };

    // Страховка для оставшихся debounce-путей: если Mini App сворачивают или
    // закрывают, пока отложенное сохранение ещё не сработало — дожимаем его
    // немедленно. visibilitychange надёжнее pagehide в WebView Telegram (при
    // сворачивании pagehide может не сработать вовсе).
    if (typeof document !== 'undefined') {
        const flushPending = () => {
            if (pendingCloudData === null) return;
            const data = pendingCloudData;
            if (debounceTimer !== null) {
                clearTimeout(debounceTimer);
                debounceTimer = null;
            }
            pendingCloudData = null;
            runCloudSave(data);
        };
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') flushPending();
        });
        window.addEventListener('pagehide', flushPending);
    }

    return {
        appData: null,
        isLoading: true,
        isSaving: false,
        isCloudStorageSupported: false,
        error: null,

        initialize: async () => {
            // Не запускать повторно если уже загружено
            if (get().appData !== null) return;

            set({ isLoading: true, error: null });

            try {
                const { data, isCloudSupported } = await initSync();
                set({
                    appData: data,
                    isCloudStorageSupported: isCloudSupported,
                    isLoading: false,
                    error: null,
                });
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err);
                console.error('[useAppStore] Init failed:', msg);
                set({ isLoading: false, error: msg });
            }
        },

        setData: (patch, options) => {
            const current = get().appData;
            const next: AppData = {
                savedChars:       [],
                savedWeaps:       [],
                savedCalculate:   [],
                inventory:        {},
                priority:         [],
                settings:         {},
                farmingSchedules: [],
                ...(current ?? {}),
                ...patch,
            };
            set({ appData: next });
            // Локально — сразу и синхронно, всегда (см. saveLocal).
            saveLocal(next);
            // В облако — немедленно для явных действий, иначе с debounce.
            if (options?.immediate) {
                flushCloudSave(next);
            } else {
                scheduleCloudSave(next);
            }
        },
    };
});

export { useAppStore };
