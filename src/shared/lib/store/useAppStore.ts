import { create } from 'zustand';
import { initSync, saveLocal, saveToCloud, type AppData } from '../../../core/services/telegramSyncManager';
import { captureError } from '../../../core/services/errorTracking';
import { waitForContentNamespaces } from '../../../core/i18n/i18n-config';

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
    /**
     * Полный сброс ВСЕХ данных — персонажи/оружие/калькулятор/инвентарь/
     * приоритет/настройки/расписание фарма/библиотека персонажей/профиль.
     * НЕ то же самое, что setData({userProfile: undefined}) — setData мёржит
     * патч поверх текущих данных (спред ...current), так что патч с одним
     * полем оставляет ВСЁ остальное как было. resetAll заменяет appData
     * целиком на пустое состояние, ничего не наследуя из текущего.
     */
    resetAll: () => void;
}

const CLOUD_DEBOUNCE_MS = 1200;

// Единый источник "пустого" состояния — используется и как дефолт при
// патче в setData (если appData ещё не инициализирован), и как результат
// resetAll. Раньше эти дефолты были только инлайн внутри setData — не было
// общего места, откуда взять "полностью пустой" AppData целиком.
const EMPTY_APP_DATA: AppData = {
    savedChars:       [],
    savedWeaps:       [],
    savedCalculate:   [],
    inventory:        {},
    priority:         [],
    settings:         {},
    farmingSchedules: [],
    characterLibrary: [],
    teamCards:        [],
    userProfile:      undefined,
};

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
            captureError(err, { stage: 'useAppStore/runCloudSave' });
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
                // initSync (чтение Telegram CloudStorage/localStorage) и
                // content-неймспейсы i18next (см. i18n-config.js — запущены
                // фоном ещё до этого вызова) ждём параллельно: экран загрузки
                // и раньше не убирался, пока не готовы данные приложения, так
                // что ожидание ещё и переводов не добавляет НОВОЙ задержки
                // поверх уже существующей, но зато перевод/данные теперь
                // разные сетевые чанки, а не один огромный синхронный бандл.
                const [{ data, isCloudSupported }] = await Promise.all([
                    initSync(),
                    waitForContentNamespaces(),
                ]);
                set({
                    appData: data,
                    isCloudStorageSupported: isCloudSupported,
                    isLoading: false,
                    error: null,
                });
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err);
                console.error('[useAppStore] Init failed:', msg);
                captureError(err, { stage: 'useAppStore/initialize' });
                set({ isLoading: false, error: msg });
            }
        },

        setData: (patch, options) => {
            const current = get().appData;
            const next: AppData = {
                ...EMPTY_APP_DATA,
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

        resetAll: () => {
            const empty: AppData = { ...EMPTY_APP_DATA };
            set({ appData: empty });
            saveLocal(empty);
            flushCloudSave(empty);
        },
    };
});

export { useAppStore };
