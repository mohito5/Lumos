import { useCallback, useState, useEffect } from 'react';
import { useAppStore } from '../../../../shared/lib/store/useAppStore';

// Не долбить прокси/Enka чаще раза в минуту при обычном «Обновить» — сам
// Enka просит уважать ttl из ответа, здесь фиксированный разумный минимум
// на стороне клиента (сама Cloudflare Function дополнительно кэширует
// ответ на edge по их же ttl, см. functions/api/uid/[uid].js).
const MIN_REFRESH_COOLDOWN_MS = 60 * 1000;
const UID_PATTERN = /^\d{6,12}$/;

// ============================================================================
// ЕДИНАЯ ТОЧКА ВХОДА для Enka: раньше useEnkaProfile.js (лёгкая сводка
// профиля, сохраняется в CloudStorage) и EnkaProfile.jsx/страница импорта
// (полная витрина персонажей, свой независимый fetch по тому же uid) были
// двумя не связанными друг с другом местами — привязка профиля на
// ProfilePage и заход на страницу импорта каждый раз делали ОТДЕЛЬНЫЙ
// запрос к /api/uid/{uid}, даже если uid один и тот же.
//
// Теперь: rawCache — модульный (НЕ Zustand/CloudStorage) кэш последнего
// полного ответа Enka, общий для всех компонентов через этот хук. Полный
// ответ (до 8 персонажей, у каждого — таланты/артефакты/статы) — это
// десятки КБ; хранить его в CloudStorage ради данных, которые нужны только
// пока открыта вкладка импорта, — не нужно (в отличие от НАКОПИТЕЛЬНОГО
// импорта — там персистентное хранение обсуждается отдельно, это другая,
// более крупная задача). Здесь — только в памяти текущей сессии,
// переживает переход между ProfilePage/EnkaProfile (разные компоненты),
// но не переживает закрытие Mini App.
// ============================================================================

let rawCache = null; // { uid, data, fetchedAt } | null
const rawCacheListeners = new Set();

function setRawCache(next) {
    rawCache = next;
    rawCacheListeners.forEach((cb) => cb(next));
}

function extractProfileSummary(enkaData, uid) {
    const info = enkaData?.playerInfo || {};
    let abyssFloor = null;
    // towerFloorIndex/towerLevelIndex присутствуют, только если игрок сам
    // включил показ данных бездны в витрине персонажей — у части
    // пользователей этих полей просто не будет.
    if (info.towerFloorIndex && info.towerLevelIndex) {
        abyssFloor = `${info.towerFloorIndex}-${info.towerLevelIndex}`;
    }
    return {
        nickname: info.nickname || uid,
        adventureRank: typeof info.level === 'number' ? info.level : null,
        worldLevel: typeof info.worldLevel === 'number' ? info.worldLevel : null,
        abyssFloor,
    };
}

const ERROR_CODES = new Set(['rate_limited', 'game_maintenance', 'invalid_uid', 'not_found']);

async function fetchEnkaRaw(uid) {
    // Без завершающего слэша — так же, как маппится файл-роут Cloudflare
    // Pages Function functions/api/uid/[uid].js.
    const response = await fetch(`/api/uid/${uid}`);
    if (!response.ok) {
        if (response.status === 429) throw new Error('rate_limited');
        if (response.status === 424) throw new Error('game_maintenance');
        if (response.status === 400) throw new Error('invalid_uid');
        throw new Error('not_found');
    }
    return response.json();
}

/**
 * Управляет привязкой профиля к Enka.Network по UID И служит общим
 * источником полных данных витрины для страницы импорта — см. пояснение
 * в шапке файла.
 *
 * В CloudStorage сохраняется не весь ответ Enka, а только маленькая сводка
 * (ник/AR/мировой уровень/этаж бездны) — несколько десятков байт вместо
 * десятков килобайт. Полный ответ доступен через `fullData`/`fetchFull`
 * ниже, но живёт только в памяти текущей сессии.
 */
export function useEnkaProfile() {
    const appData = useAppStore((state) => state.appData);
    const setData = useAppStore((state) => state.setData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fullData, setFullDataState] = useState(rawCache);

    useEffect(() => {
        rawCacheListeners.add(setFullDataState);
        return () => rawCacheListeners.delete(setFullDataState);
    }, []);

    const enka = appData?.userProfile?.enka || null;
    const canRefresh = !enka || (Date.now() - enka.lastFetchedAt) >= MIN_REFRESH_COOLDOWN_MS;

    /**
     * Полные данные витрины по uid — общая точка входа и для "привязать как
     * профиль" (link ниже), и для страницы импорта. Если для ЭТОГО uid уже
     * есть кэш и forceRefresh не передан — отдаёт кэш без сетевого запроса.
     * @returns {Promise<object|null>} сырой ответ Enka или null при ошибке (см. error)
     */
    const fetchFull = useCallback(async (uidInput, { forceRefresh = false } = {}) => {
        const uid = String(uidInput || '').trim();
        setError(null);

        if (!UID_PATTERN.test(uid)) {
            setError('invalid_uid');
            return null;
        }

        if (!forceRefresh && rawCache?.uid === uid) {
            return rawCache.data;
        }

        setIsLoading(true);
        try {
            const data = await fetchEnkaRaw(uid);
            setRawCache({ uid, data, fetchedAt: Date.now() });
            if (!data.avatarInfoList || data.avatarInfoList.length === 0) {
                setError('empty_showcase');
            }
            return data;
        } catch (err) {
            const code = err instanceof Error ? err.message : '';
            setError(ERROR_CODES.has(code) ? code : 'network_error');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * "Привязать этот uid как мой профиль" — переиспользует fetchFull под
     * капотом (тот же общий кэш/запрос), плюс сохраняет лёгкую сводку в
     * CloudStorage через useAppStore.
     */
    const link = useCallback(async (uidInput, { forceRefresh = false } = {}) => {
        const uid = String(uidInput || '').trim();
        const data = await fetchFull(uid, { forceRefresh });
        if (!data) return false;

        const summary = extractProfileSummary(data, uid);
        const now = Date.now();
        const currentProfile = appData?.userProfile || {};
        const wasLinkedToSameUid = currentProfile.enka?.uid === uid;

        setData({
            userProfile: {
                ...currentProfile,
                enka: {
                    uid,
                    linkedAt: wasLinkedToSameUid ? currentProfile.enka.linkedAt : now,
                    lastFetchedAt: now,
                    ...summary,
                },
            },
        }, { immediate: true });
        return true;
    }, [appData?.userProfile, setData, fetchFull]);

    const refresh = useCallback(() => {
        if (!enka || !canRefresh) return Promise.resolve(false);
        return link(enka.uid, { forceRefresh: true });
    }, [enka, canRefresh, link]);

    const unlink = useCallback(() => {
        const currentProfile = appData?.userProfile || {};
        const { enka: droppedEnka, ...rest } = currentProfile;
        setData({ userProfile: rest }, { immediate: true });
        // Кэш чистим, только если в нём именно отвязываемый uid — если
        // пользователь до этого просматривал ЧУЖОЙ uid на странице импорта
        // (см. fetchFull без link), тот просмотр отвязка профиля не должна трогать.
        if (rawCache?.uid === droppedEnka?.uid) setRawCache(null);
    }, [appData?.userProfile, setData]);

    return {
        enka,
        isLoading,
        error,
        canRefresh,
        link,
        refresh,
        unlink,
        // ── Общий источник для страницы импорта ──
        fullData,   // { uid, data, fetchedAt } | null — что реально загружено прямо сейчас
        fetchFull,  // (uid, { forceRefresh }) => Promise<rawData | null>
    };
}
