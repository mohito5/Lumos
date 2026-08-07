import { showNotification, updateNotification, dismissNotification } from '../../shared/lib/notifications';
import { captureError } from './errorTracking';

// ─── Telegram WebApp interface ────────────────────────────────────────────────

interface TelegramWebApp {
    CloudStorage: {
        getItems: (
            keys: string[],
            callback: (error: string | null, values?: Record<string, string>) => void
        ) => void;
        setItem: (
            key: string,
            value: string,
            callback: (error: string | null, success?: boolean) => void
        ) => void;
        removeItems: (
            keys: string[],
            callback: (error: string | null, success?: boolean) => void
        ) => void;
    };
    isVersionAtLeast: (version: string) => boolean;
}

const WebApp: TelegramWebApp = (window as unknown as { Telegram?: { WebApp: TelegramWebApp } })
    .Telegram?.WebApp ?? {
    CloudStorage: {
        getItems: (_keys, cb) => { cb(null, {}); },
        setItem: (_key, _val, cb) => { cb(null, true); },
        removeItems: (_keys, cb) => { cb(null, true); },
    },
    isVersionAtLeast: () => false,
};

// ─── Constants ────────────────────────────────────────────────────────────────

// Диагностические console.log ниже полезны при отладке синхронизации, но не
// нужны в проде — завязываем на DEV-сборку вместо ручного флага, чтобы не
// забыть выключить (см. аналогичный OCR_DEBUG в ocr-logger.ts). console.error/
// console.warn НЕ фильтруются этим флагом — это настоящие сбои, их видно
// всегда, вне зависимости от режима сборки.
const DEBUG = import.meta.env.DEV;
const debugLog = (...args: unknown[]): void => {
    if (DEBUG) console.log(...args);
};

const LS_PREFIX = 'g_sync_';

/**
 * Каждый ключ — одна логическая категория данных.
 *
 * Официальный лимит Telegram CloudStorage — 4096 символов НА ОДНО значение.
 * Разбивка на КАТЕГОРИИ (g_chars/g_weaps/...) сама по себе не гарантирует,
 * что значение одной категории уложится в лимит — по мере роста количества
 * сохранённых сборок один g_chars легко может превысить 4096 символов.
 * Именно поэтому ниже (saveKeyToCloudChunked/fetchAllCloud) добавлен
 * прозрачный чанкинг: если сериализованное значение категории не помещается,
 * оно автоматически режется на несколько under-the-hood CloudStorage-ключей
 * и склеивается обратно при чтении.
 */
const CLOUD_KEYS = [
    'g_chars',
    'g_weaps',
    'g_calculate',
    'g_inventory',
    'g_priority',
    'g_settings',
    'g_farm_sched',
    'g_profile',
    'g_char_library',
    'g_team_cards',
] as const;

type CloudKey = typeof CLOUD_KEYS[number];

/** Маппинг CloudKey → поле в AppData */
const KEY_TO_FIELD: Record<CloudKey, keyof AppData> = {
    g_chars:      'savedChars',
    g_weaps:      'savedWeaps',
    g_calculate:  'savedCalculate',
    g_inventory:  'inventory',
    g_priority:   'priority',
    g_settings:   'settings',
    g_farm_sched: 'farmingSchedules',
    g_profile:    'userProfile',
    g_char_library: 'characterLibrary',
    g_team_cards: 'teamCards',
};

/** Дефолтные значения при отсутствии данных */
const EMPTY_VALUES: Record<CloudKey, unknown> = {
    g_chars:      [],
    g_weaps:      [],
    g_calculate:  [],
    g_inventory:  {},
    g_priority:   [],
    g_settings:   {},
    g_farm_sched: [],
    g_profile:    undefined,
    g_char_library: [],
    g_team_cards: [],
};

// ─── Notification labels ─────────────────────────────────────────────────────

const KEY_LABELS: Record<CloudKey, { ru: string; en: string }> = {
    g_chars:      { ru: 'Персонажи',        en: 'Characters'      },
    g_weaps:      { ru: 'Оружие',           en: 'Weapons'         },
    g_calculate:  { ru: 'Калькулятор',      en: 'Calculator'      },
    g_inventory:  { ru: 'Инвентарь',        en: 'Inventory'       },
    g_priority:   { ru: 'Приоритеты',       en: 'Priority'        },
    g_settings:   { ru: 'Настройки',        en: 'Settings'        },
    g_farm_sched: { ru: 'Расписание фарма', en: 'Farming schedule' },
    g_profile:    { ru: 'Профиль',          en: 'Profile'         },
    g_char_library: { ru: 'Библиотека персонажей', en: 'Character library' },
    g_team_cards: { ru: 'Карточки отряда',  en: 'Team cards' },
};

/** Текущий язык — берём из window.__i18n_lang__ (проставляется i18n-config) */
const getLang = (): 'ru' | 'en' => {
    try {
        const lng = (window as unknown as Record<string, string>)['__i18n_lang__'] ?? 'ru';
        return lng.startsWith('en') ? 'en' : 'ru';
    } catch {
        return 'ru';
    }
};

const label = (key: CloudKey): string => KEY_LABELS[key][getLang()];

// ─── Public types ─────────────────────────────────────────────────────────────

export interface EnkaLink {
    uid: string;
    linkedAt: number;
    lastFetchedAt: number;
    nickname: string;
    adventureRank: number | null;
    worldLevel: number | null;
    /** Например "12-3", null если игрок не включил показ бездны в витрине */
    abyssFloor: string | null;
}

export interface UserProfile {
    username: string;
    avatar: string;
    /** Присутствует только если профиль привязан к Enka.Network по UID */
    enka?: EnkaLink;
}

/**
 * Накопительная библиотека персонажей (см. enkaLibraryCompact.js) — компактно,
 * БЕЗ картинок/иконок (только id + структурные данные). Enka отдаёт максимум
 * 8 персонажей со стенда за раз; библиотека копится через повторные импорты
 * (пользователь меняет стенд в игре → импортирует снова), с ограничением по
 * количеству (см. CHARACTER_LIBRARY_MAX в useCharacterLibrary.js).
 */
export interface CompactLibraryArtifact {
    set: string | null;
    lvl: number;
    ms: { t: string; v: number } | null;
    ss: Array<{ t: string; v: number }>;
}

export interface CompactLibraryEntry {
    id: string;
    lvl: number;
    asc: number;
    const: number;
    fr: number;
    w: { id: string | null; lvl: number; asc: number; r: number } | null;
    a: Record<'flower' | 'plume' | 'sands' | 'goblet' | 'circlet', CompactLibraryArtifact | null>;
    t: { attack: number | null; skill: number | null; burst: number | null };
    stats: Array<{ type: string; value: number }>;
    ts: number;
    uid: string;
}

/**
 * Карточка отряда — ссылается на персонажей из characterLibrary по id,
 * НЕ дублирует их данные (см. комментарий в useTeamCards.js). До этого поля
 * teamCards не было ни здесь, ни в CLOUD_KEYS/EMPTY_APP_DATA — useTeamCards.js
 * читал/писал appData.teamCards, которого не существовало ни в персистентности,
 * ни в дефолтах, так что созданные отряды жили только в памяти zustand-стора
 * и терялись при перезапуске Mini App (что для Telegram — частый сценарий).
 */
export interface TeamCard {
    id: string;
    name: string;
    characterIds: string[];
    createdAt: number;
}

export interface AppData {
    savedChars:     unknown[];
    savedWeaps:     unknown[];
    savedCalculate: unknown[];
    inventory:      Record<string, number>;
    /** Упорядоченный массив id сборок — источник правды для приоритизации */
    priority:       string[];
    /** Настройки приложения (на будущее) */
    settings:       Record<string, unknown>;
    /** Закреплённые на главной расписания фарма (персонажи/оружие) */
    farmingSchedules: unknown[];
    /** Профиль пользователя — сохраняется локально, не в CloudStorage */
    userProfile?:   UserProfile;
    /** Накопительная библиотека персонажей — см. комментарий у CompactLibraryEntry */
    characterLibrary: CompactLibraryEntry[];
    /** Карточки отряда — см. комментарий у TeamCard */
    teamCards: TeamCard[];
}

// ─── Internal types ───────────────────────────────────────────────────────────

interface StoredPayload {
    ts: number;
    data: unknown;
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

const getLocal = (key: CloudKey): StoredPayload | null => {
    const raw = localStorage.getItem(`${LS_PREFIX}${key}`);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        if (typeof parsed.ts === 'number' && 'data' in parsed) {
            return parsed as unknown as StoredPayload;
        }
        return null;
    } catch {
        return null;
    }
};

const setLocal = (key: CloudKey, payload: StoredPayload): void => {
    localStorage.setItem(`${LS_PREFIX}${key}`, JSON.stringify(payload));
};

// ─── CloudStorage helpers ─────────────────────────────────────────────────────

const parsePayload = (raw: string | undefined): StoredPayload | null => {
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        if (typeof parsed.ts === 'number' && 'data' in parsed) {
            return parsed as unknown as StoredPayload;
        }
        return null;
    } catch {
        return null;
    }
};

const fetchRaw = (keys: string[]): Promise<Record<string, string>> =>
    new Promise((resolve) => {
        WebApp.CloudStorage.getItems(keys, (error, values) => {
            resolve(error ? {} : (values ?? {}));
        });
    });

/** Best-effort — если удаление не удалось, это не критично (см. вызов ниже:
 *  осиротевшие чанки не влияют на корректность fetchAllCloud, только на
 *  занятое место, так что не блокируем на этом основной поток записи). */
const removeItemsRaw = (keys: string[]): Promise<void> =>
    new Promise((resolve) => {
        if (keys.length === 0) { resolve(); return; }
        WebApp.CloudStorage.removeItems(keys, (error) => {
            if (error) console.warn(`[sync] removeItems не удалось (не критично):`, error, keys);
            resolve();
        });
    });

/**
 * Записать одно значение в CloudStorage и СРАЗУ ЖЕ прочитать его обратно,
 * чтобы подтвердить, что запись реально прошла именно с этим содержимым.
 *
 * Это не паранойя: setItem(key, value, callback) с callback(null, true)
 * означает только "нативный мост подтвердил приём запроса", а не
 * обязательно "значение сохранилось побайтово так, как мы его отправили".
 * Без этой проверки любое расхождение (например, из-за платформенной
 * особенности WebView) осталось бы полностью незамеченным — ровно то,
 * что нужно исключить в коде, отвечающем за пользовательские данные.
 */
const setItemVerified = (key: string, value: string): Promise<boolean> =>
    new Promise((resolve) => {
        WebApp.CloudStorage.setItem(key, value, (error, success) => {
            if (error || !success) {
                console.error(`[sync] setItem('${key}') отклонён нативным мостом:`, error, `len=${value.length}`);
                resolve(false);
                return;
            }
            WebApp.CloudStorage.getItems([key], (readErr, values) => {
                const readBack = values?.[key];
                if (readErr || readBack !== value) {
                    console.error(
                        `[sync] setItem('${key}') read-back mismatch:`,
                        readErr, `expected_len=${value.length}`, `got_len=${readBack?.length}`
                    );
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    });

/**
 * Безопасный запас под лимит CloudStorage в 4096 символов на значение
 * (официальная документация Telegram Bot API). Запас оставлен под
 * накладные расходы обёртки {ts,data} и JSON-манифеста чанков.
 */
const CHUNK_SAFE_LIMIT = 3500;

const chunkKey = (key: string, index: number): string => `${key}__c${index}`;

interface ChunkManifest {
    __chunked: true;
    ts: number;
    count: number;
}

/**
 * Запись значения в CloudStorage с прозрачным чанкингом, если сериализованный
 * payload превышает безопасный лимит на одно значение.
 *
 * ВАЖНО про порядок записи: сначала пишутся ЧАНКИ С ДАННЫМИ, и только когда
 * ВСЕ они подтверждённо записаны (см. setItemVerified) — пишется манифест
 * по базовому ключу, который на них ссылается. Если что-то из чанков не
 * запишется, манифест НЕ обновляется, и по базовому ключу остаётся ПРЕДЫДУЩЕЕ
 * консистентное значение — а не наполовину записанные новые данные, которые
 * на чтении дали бы неполную/битую реконструкцию.
 */
// экспортирован ради unit-тестов — это самая критичная для сохранности
// данных пользователя логика во всём проекте (см. tests/telegramSyncManager.test.ts)
export const saveKeyToCloudChunked = async (key: CloudKey, payload: StoredPayload): Promise<boolean> => {
    // Сколько чанков было ДО этой записи — чтобы после записи нового
    // (возможно, требующего меньше чанков или не требующего их вообще —
    // например, после сброса профиля до []) удалить "хвост" из тех, что
    // больше не нужны. Без этого они остаются в CloudStorage навсегда:
    // fetchAllCloud их не видит (читает по НОВОМУ манифесту), но место в
    // лимите 1024 ключей они продолжают занимать.
    const previousChunkCount = await getExistingChunkCount(key);

    const json = JSON.stringify(payload);
    let newChunkCount = 0;

    if (json.length <= CHUNK_SAFE_LIMIT) {
        const ok = await setItemVerified(key, json);
        if (!ok) return false;
    } else {
        const chunks: string[] = [];
        for (let i = 0; i < json.length; i += CHUNK_SAFE_LIMIT) {
            chunks.push(json.slice(i, i + CHUNK_SAFE_LIMIT));
        }
        newChunkCount = chunks.length;

        debugLog(`[sync] '${key}': ${json.length} символов, режем на ${chunks.length} чанков`);

        // Пишем строго последовательно (не Promise.all) — избегаем возможных
        // проблем с конкурентными вызовами нативного моста Telegram.
        for (let i = 0; i < chunks.length; i++) {
            const ok = await setItemVerified(chunkKey(key, i), chunks[i]);
            if (!ok) {
                console.error(`[sync] '${key}': не удалось записать чанк ${i}/${chunks.length}, манифест НЕ обновлён`);
                return false;
            }
        }

        const manifest: ChunkManifest = { __chunked: true, ts: payload.ts, count: chunks.length };
        const ok = await setItemVerified(key, JSON.stringify(manifest));
        if (!ok) return false;
    }

    if (previousChunkCount > newChunkCount) {
        const staleKeys: string[] = [];
        for (let i = newChunkCount; i < previousChunkCount; i++) staleKeys.push(chunkKey(key, i));
        // Best-effort, не блокируем возврат успеха записи на этом.
        void removeItemsRaw(staleKeys);
    }

    return true;
};

/** Сколько чанков сейчас числится за ключом (0, если значение прямое/не найдено). */
async function getExistingChunkCount(key: CloudKey): Promise<number> {
    const raw = (await fetchRaw([key]))[key];
    if (!raw) return 0;
    try {
        const parsed = JSON.parse(raw) as Partial<ChunkManifest>;
        return parsed?.__chunked === true && typeof parsed.count === 'number' ? parsed.count : 0;
    } catch {
        return 0;
    }
}

/**
 * Прочитать все ключи разом. Для значений, оказавшихся чанкованными
 * (манифест с __chunked:true), дочитывает и склеивает все части —
 * для остального кода (initSync) чанкинг полностью прозрачен: он просто
 * получает готовый StoredPayload, как будто лимита не существует.
 */
// экспортирован ради unit-тестов
export const fetchAllCloud = async (): Promise<Record<CloudKey, StoredPayload | null>> => {
    const baseValues = await fetchRaw([...CLOUD_KEYS]);
    const result = {} as Record<CloudKey, StoredPayload | null>;

    for (const key of CLOUD_KEYS) {
        const raw = baseValues[key];
        if (!raw) { result[key] = null; continue; }

        let parsedRaw: unknown;
        try {
            parsedRaw = JSON.parse(raw);
        } catch {
            result[key] = null;
            continue;
        }

        const maybeManifest = parsedRaw as Partial<ChunkManifest>;
        if (maybeManifest && maybeManifest.__chunked === true && typeof maybeManifest.count === 'number') {
            const chunkKeys = Array.from({ length: maybeManifest.count }, (_, i) => chunkKey(key, i));
            const chunkValues = await fetchRaw(chunkKeys);

            let reassembled = '';
            let complete = true;
            for (const ck of chunkKeys) {
                const part = chunkValues[ck];
                if (!part) { complete = false; break; }
                reassembled += part;
            }

            if (!complete) {
                console.error(`[sync] '${key}': манифест ссылается на ${maybeManifest.count} чанков, но не все найдены — игнорируем как повреждённые`);
                result[key] = null;
                continue;
            }

            result[key] = parsePayload(reassembled);
        } else {
            result[key] = parsePayload(raw);
        }
    }

    return result;
};

// ─── Feature detection ────────────────────────────────────────────────────────

/**
 * CloudStorage появился в Bot API 6.9 (не 6.1 — это было ошибкой в предыдущей
 * версии этой проверки: '6.1' — версия появления самого WebApp API, а не
 * CloudStorage конкретно). На клиенте с версией 6.1–6.8 WebApp.CloudStorage
 * физически не существует; при неверной проверке это привело бы к попытке
 * вызвать .setItem/.getItems на undefined и полному, ПОЛНОСТЬЮ МОЛЧАЛИВОМУ
 * провалу синхронизации (единственное место, ловящее такое исключение —
 * useAppStore.runCloudSave, который делает только console.error, без единого
 * уведомления пользователю).
 *
 * Дополнительно проверяем, что WebApp.CloudStorage реально существует со
 * всеми нужными методами — НЕ полагаясь только на isVersionAtLeast(), на
 * случай расхождений между заявленной и фактической поддержкой API на
 * разных платформах/сборках Telegram-клиентов (такое бывает).
 */
const checkCloudSupported = (): boolean => {
    if (!WebApp.isVersionAtLeast('6.9')) return false;
    return !!(
        WebApp.CloudStorage &&
        typeof WebApp.CloudStorage.setItem === 'function' &&
        typeof WebApp.CloudStorage.getItems === 'function'
    );
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Инициализация: гибридная синхронизация localStorage ↔ CloudStorage.
 * Запускается один раз при старте приложения.
 *
 * Логика для каждого ключа:
 *  - Облако новее  → берём облако, обновляем localStorage
 *  - Локальные новее → берём локальные, ставим в очередь загрузку в облако
 *  - Только облако  → берём облако, сохраняем локально
 *  - Только локальные → берём локальные, ставим в очередь загрузку
 *  - Нигде нет     → пустое значение по умолчанию
 */
export const initSync = async (): Promise<{ data: AppData; isCloudSupported: boolean }> => {
    const isRu = getLang() === 'ru';

    // Спиннер-уведомление — висит до конца инициализации
    const loadingId = showNotification(
        isRu ? 'Загрузка данных…' : 'Loading data…',
        'loading',
        null  // не закрывать автоматически
    );

    const cloudAvailable = checkCloudSupported();
    const finalData: Partial<AppData> = {};

    if (!cloudAvailable) {
        // Offline-режим: только localStorage
        debugLog('[sync] initSync: облако недоступно (не Telegram или старый клиент) — офлайн-режим на localStorage');
        for (const key of CLOUD_KEYS) {
            const local = getLocal(key);
            const field = KEY_TO_FIELD[key];
            (finalData as unknown as Record<string, unknown>)[field] = local?.data ?? EMPTY_VALUES[key];

            debugLog(
                `[sync] offline '${key}': localStorage['${LS_PREFIX}${key}'] `,
                local ? `ts=${local.ts}, найдено` : 'ПУСТО (ключа нет или не распарсился)'
            );

            if (local?.data) {
                showNotification(
                    isRu
                        ? `${label(key)} загружены локально`
                        : `${label(key)} loaded from cache`,
                    'info',
                    3000
                );
            }
        }

        dismissNotification(loadingId);
        showNotification(
            isRu ? 'Облако недоступно — работаем офлайн' : 'Cloud unavailable — offline mode',
            'info',
            4000
        );

        return { data: finalData as AppData, isCloudSupported: false };
    }

    // Online-режим: берём все данные из облака
    updateNotification(
        loadingId,
        isRu ? 'Синхронизация с облаком…' : 'Syncing with cloud…',
        'loading',
        null
    );

    let allCloud: Record<CloudKey, StoredPayload | null>;
    try {
        allCloud = await fetchAllCloud();
    } catch (err) {
        // Не должны оставлять приложение в вечном экране ошибки из-за сбоя
        // именно облачного запроса — деградируем к офлайн-режиму на localStorage,
        // как будто cloudAvailable был false с самого начала.
        console.error('[sync] fetchAllCloud() выбросил исключение, откат к офлайн-режиму:', err);
        captureError(err, { stage: 'initSync/fetchAllCloud' });
        for (const key of CLOUD_KEYS) {
            const local = getLocal(key);
            const field = KEY_TO_FIELD[key];
            (finalData as unknown as Record<string, unknown>)[field] = local?.data ?? EMPTY_VALUES[key];
        }
        dismissNotification(loadingId);
        showNotification(
            isRu ? 'Ошибка облака — работаем с локальными данными' : 'Cloud error — using local data',
            'error',
            5000
        );
        return { data: finalData as AppData, isCloudSupported: false };
    }

    const uploadQueue: Promise<boolean>[] = [];

    for (const key of CLOUD_KEYS) {
        const local = getLocal(key);
        const cloud = allCloud[key];
        let chosen: unknown;
        let notifMsg = '';
        let notifType: 'success' | 'info' = 'info';

        debugLog(`[sync] initSync '${key}': local.ts=${local?.ts ?? 'нет'} cloud.ts=${cloud?.ts ?? 'нет'}`);

        if (cloud && (!local || cloud.ts >= local.ts)) {
            // Облако новее или равное
            setLocal(key, cloud);
            chosen = cloud.data;
            notifMsg = isRu
                ? `${label(key)} загружены из облака`
                : `${label(key)} loaded from cloud`;
            notifType = 'success';
        } else if (local) {
            // Локальные новее
            chosen = local.data;
            if (!cloud || local.ts > cloud.ts) {
                uploadQueue.push(saveKeyToCloudChunked(key, local));
                notifMsg = isRu
                    ? `${label(key)} — локальные данные новее, синхронизируем…`
                    : `${label(key)} — local data newer, syncing…`;
                notifType = 'info';
            } else {
                notifMsg = isRu
                    ? `${label(key)} загружены (актуальны)`
                    : `${label(key)} loaded (up to date)`;
                notifType = 'success';
            }
        } else if (cloud) {
            // Только в облаке
            setLocal(key, cloud);
            chosen = cloud.data;
            notifMsg = isRu
                ? `${label(key)} получены из облака`
                : `${label(key)} fetched from cloud`;
            notifType = 'success';
        } else {
            // Нет нигде
            chosen = EMPTY_VALUES[key];
            notifMsg = isRu
                ? `${label(key)} — данных нет`
                : `${label(key)} — no data found`;
            notifType = 'info';
        }

        const field = KEY_TO_FIELD[key];
        (finalData as unknown as Record<string, unknown>)[field] = chosen;

        // Показываем уведомление только для значимых данных (не пустых)
        const isEmpty = Array.isArray(chosen)
            ? (chosen as unknown[]).length === 0
            : Object.keys(chosen as object).length === 0;

        if (!isEmpty || cloud === null) {
            showNotification(notifMsg, notifType, 3500);
        }
    }

    // Закрываем спиннер — показываем итоговый статус
    dismissNotification(loadingId);
    showNotification(
        isRu ? 'Данные загружены ✓' : 'Data loaded ✓',
        'success',
        3000
    );

    // Фоновая загрузка устаревших ключей в облако
    if (uploadQueue.length > 0) {
        Promise.all(uploadQueue).then(() => {
            showNotification(
                isRu ? 'Облако синхронизировано' : 'Cloud synced',
                'success',
                2500
            );
        }).catch((err) => {
            console.warn('[initSync] Background cloud upload failed:', err);
            showNotification(
                isRu ? 'Ошибка синхронизации с облаком' : 'Cloud sync failed',
                'error',
                5000
            );
        });
    }

    return { data: finalData as AppData, isCloudSupported: true };
};

/**
 * Немедленное сохранение в localStorage — синхронно, БЕЗ debounce.
 *
 * Вызывается на каждое изменение из useAppStore.setData. Раньше localStorage
 * писался внутри saveToCloud, которая сама вызывалась дебаунсированно — из-за
 * этого локальная запись откладывалась на те же 1200мс, что и облачная.
 * Если Telegram Mini App сворачивался/закрывался до срабатывания debounce
 * (WebView может быть выгружен почти мгновенно), несработавший setTimeout
 * пропадал целиком — не сохранялось НИ локально, НИ в облако, хотя
 * уведомление об успешном сохранении уже было показано пользователю.
 *
 * Теперь локальная запись ничем не отложена: даже если WebView убьют через
 * 10мс после правки, последнее состояние уже лежит в localStorage, и при
 * следующем initSync() сработает ветка "локальные новее облака".
 */
export const saveLocal = (appData: AppData): void => {
    const ts = Date.now();

    for (const key of CLOUD_KEYS) {
        const field = KEY_TO_FIELD[key];
        const data = (appData as unknown as Record<string, unknown>)[field];
        if (data !== undefined) {
            setLocal(key, { ts, data });
            debugLog(`[sync] saveLocal '${key}' → localStorage['${LS_PREFIX}${key}'] записано, ts=${ts}`);
        }
    }
};

/**
 * Асинхронная отправка в CloudStorage.
 *
 * localStorage уже обновлён синхронно через saveLocal — эта функция отвечает
 * только за облако и вызывается дебаунсированно (или немедленно для явных
 * действий) из useAppStore.
 *
 * Пишет ключи ПОСЛЕДОВАТЕЛЬНО, а не через Promise.all — так как нативный мост
 * Telegram WebView не документирует поведение при параллельных вызовах
 * CloudStorage.setItem, последовательная запись — самый безопасный вариант.
 *
 * Обёрнуто в try/catch целиком: раньше исключение (например, обращение к
 * WebApp.CloudStorage, если объект неожиданно отсутствует) ловилось только
 * в useAppStore.runCloudSave через console.error — пользователь не видел
 * НИ ОДНОГО уведомления об ошибке. Теперь любой сбой — брошенное исключение
 * или false в результатах — гарантированно показывает уведомление.
 */
export const saveToCloud = async (appData: AppData): Promise<boolean[]> => {
    if (!checkCloudSupported()) {
        return [true];
    }

    const isRu = getLang() === 'ru';

    try {
        const ts = Date.now();
        const results: boolean[] = [];

        for (const key of CLOUD_KEYS) {
            const field = KEY_TO_FIELD[key];
            const data = (appData as unknown as Record<string, unknown>)[field];
            if (data === undefined) continue;

            const ok = await saveKeyToCloudChunked(key, { ts, data });
            debugLog(`[sync] saveToCloud('${key}') → ${ok ? 'OK' : 'ОШИБКА'}`);
            results.push(ok);
        }

        const anyFailed = results.some(r => !r);
        if (anyFailed) {
            showNotification(
                isRu
                    ? 'Не удалось сохранить в облако (данные сохранены локально)'
                    : 'Cloud save failed (data saved locally)',
                'error',
                7000
            );
        }
        return results;
    } catch (err) {
        console.error('[sync] saveToCloud выбросил исключение:', err);
        captureError(err, { stage: 'saveToCloud' });
        showNotification(
            isRu ? 'Ошибка сохранения в облако (данные сохранены локально)' : 'Cloud save error (data saved locally)',
            'error',
            7000
        );
        return [false];
    }
};
