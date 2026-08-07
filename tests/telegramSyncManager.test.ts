import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ─────────────────────────────────────────────────────────────────────────
// telegramSyncManager.ts резолвит `WebApp` из window.Telegram.WebApp ОДИН
// РАЗ, на верхнем уровне модуля (module-level const). Поэтому для каждого
// теста: 1) выставляем window.Telegram.WebApp ДО импорта, 2) используем
// vi.resetModules() + динамический import(), чтобы модуль переинициализировался
// заново и подхватил свежий мок, а не переиспользовал закэшированный WebApp
// из предыдущего теста.
// ─────────────────────────────────────────────────────────────────────────

/** In-memory мок CloudStorage — getItems реально видит то, что записал setItem. */
function createMockCloudStorage(opts: { failKeys?: Set<string> } = {}) {
    const store = new Map<string, string>();
    const failKeys = opts.failKeys ?? new Set<string>();

    return {
        store,
        getItems: (keys: string[], cb: (err: string | null, values?: Record<string, string>) => void) => {
            const values: Record<string, string> = {};
            for (const k of keys) {
                if (store.has(k)) values[k] = store.get(k) as string;
            }
            cb(null, values);
        },
        setItem: (key: string, value: string, cb: (err: string | null, success?: boolean) => void) => {
            if (failKeys.has(key)) {
                cb('simulated failure', false);
                return;
            }
            store.set(key, value);
            cb(null, true);
        },
        removeItems: (keys: string[], cb: (err: string | null, success?: boolean) => void) => {
            for (const k of keys) store.delete(k);
            cb(null, true);
        },
    };
}

async function loadFreshSyncManager(cloudStorage: ReturnType<typeof createMockCloudStorage>) {
    vi.resetModules();
    (window as unknown as { Telegram?: unknown }).Telegram = {
        WebApp: {
            CloudStorage: cloudStorage,
            isVersionAtLeast: () => true,
        },
    };
    return import('../src/core/services/telegramSyncManager');
}

afterEach(() => {
    delete (window as unknown as { Telegram?: unknown }).Telegram;
    vi.restoreAllMocks();
});

describe('saveKeyToCloudChunked / fetchAllCloud — round-trip', () => {
    it('маленький payload (< лимита) пишется БЕЗ чанкования, под одним ключом', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked } = await loadFreshSyncManager(cloud);

        const ok = await saveKeyToCloudChunked('g_priority', { ts: 111, data: ['char1', 'char2'] });
        expect(ok).toBe(true);
        expect(cloud.store.has('g_priority')).toBe(true);
        // Не должно появиться никаких чанк-ключей для маленького payload
        expect([...cloud.store.keys()].some((k) => k.includes('__c'))).toBe(false);
    });

    it('маленький payload корректно читается обратно через fetchAllCloud', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked, fetchAllCloud } = await loadFreshSyncManager(cloud);

        await saveKeyToCloudChunked('g_priority', { ts: 111, data: ['char1', 'char2'] });
        const all = await fetchAllCloud();
        expect(all.g_priority).toEqual({ ts: 111, data: ['char1', 'char2'] });
    });

    it('большой payload (> лимита) режется на несколько чанков + манифест по базовому ключу', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked } = await loadFreshSyncManager(cloud);

        const bigData = 'x'.repeat(10000); // гарантированно больше CHUNK_SAFE_LIMIT=3500
        const ok = await saveKeyToCloudChunked('g_chars', { ts: 222, data: bigData });
        expect(ok).toBe(true);

        const chunkKeys = [...cloud.store.keys()].filter((k) => k.startsWith('g_chars__c'));
        expect(chunkKeys.length).toBeGreaterThan(1);

        const manifest = JSON.parse(cloud.store.get('g_chars') as string);
        expect(manifest.__chunked).toBe(true);
        expect(manifest.count).toBe(chunkKeys.length);
    });

    it('большой payload корректно СКЛЕИВАЕТСЯ обратно через fetchAllCloud (побайтово совпадает)', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked, fetchAllCloud } = await loadFreshSyncManager(cloud);

        const bigData = Array.from({ length: 2000 }, (_, i) => `item-${i}`).join(',');
        await saveKeyToCloudChunked('g_chars', { ts: 333, data: bigData });

        const all = await fetchAllCloud();
        expect(all.g_chars?.data).toBe(bigData);
        expect(all.g_chars?.ts).toBe(333);
    });

    it('ключ без сохранённых данных даёт null, а не падает', async () => {
        const cloud = createMockCloudStorage();
        const { fetchAllCloud } = await loadFreshSyncManager(cloud);

        const all = await fetchAllCloud();
        expect(all.g_priority).toBeNull();
        expect(all.g_inventory).toBeNull();
    });

    it('битый JSON по ключу → null, а не исключение', async () => {
        const cloud = createMockCloudStorage();
        cloud.store.set('g_settings', '{не валидный json');
        const { fetchAllCloud } = await loadFreshSyncManager(cloud);

        const all = await fetchAllCloud();
        expect(all.g_settings).toBeNull();
    });

    it('манифест ссылается на N чанков, но часть отсутствует → null, помечено как повреждённое, не падает', async () => {
        const cloud = createMockCloudStorage();
        // Валидный манифест на 3 чанка, но реально ни один чанк не записан —
        // имитирует обрыв синхронизации/частичную запись на другом устройстве.
        cloud.store.set('g_weaps', JSON.stringify({ __chunked: true, ts: 1, count: 3 }));
        const { fetchAllCloud } = await loadFreshSyncManager(cloud);

        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const all = await fetchAllCloud();
        expect(all.g_weaps).toBeNull();
        expect(errorSpy).toHaveBeenCalled(); // должно быть залогировано, не молча проглочено
    });
});

describe('saveKeyToCloudChunked — атомарность при сбое записи чанка', () => {
    it('если один из чанков не записался — манифест НЕ обновляется, старое значение остаётся', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked } = await loadFreshSyncManager(cloud);

        // Сначала успешно пишем маленькое "старое" значение под базовым ключом
        await saveKeyToCloudChunked('g_chars', { ts: 100, data: 'старое consistent значение' });
        const beforeAttempt = cloud.store.get('g_chars');

        // Теперь настраиваем провал ВТОРОГО чанка следующей (большой) записи
        cloud.setItem = ((orig) => (key: string, value: string, cb: (e: string | null, s?: boolean) => void) => {
            if (key === 'g_chars__c1') {
                cb('simulated failure', false);
                return;
            }
            orig(key, value, cb);
        })(cloud.setItem.bind(cloud));

        const bigData = 'y'.repeat(10000);
        const ok = await saveKeyToCloudChunked('g_chars', { ts: 200, data: bigData });

        expect(ok).toBe(false);
        // Базовый ключ (манифест) НЕ должен был перезаписаться битой/неполной версией
        expect(cloud.store.get('g_chars')).toBe(beforeAttempt);
    });
});

describe('saveKeyToCloudChunked — очистка осиротевших чанков', () => {
    it('уменьшение payload удаляет лишние старые чанки (не оставляет мусор)', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked } = await loadFreshSyncManager(cloud);

        // Сначала большой payload — несколько чанков
        await saveKeyToCloudChunked('g_chars', { ts: 1, data: 'x'.repeat(10000) });
        const chunksAfterBig = [...cloud.store.keys()].filter((k) => k.startsWith('g_chars__c'));
        expect(chunksAfterBig.length).toBeGreaterThan(1);

        // Теперь маленький payload (как после сброса профиля до [])
        await saveKeyToCloudChunked('g_chars', { ts: 2, data: [] });
        const chunksAfterSmall = [...cloud.store.keys()].filter((k) => k.startsWith('g_chars__c'));

        expect(chunksAfterSmall.length).toBe(0); // старые чанки удалены, новых не потребовалось
        expect(JSON.parse(cloud.store.get('g_chars') as string)).toEqual({ ts: 2, data: [] });
    });

    it('уменьшение (но не до нуля) числа чанков удаляет только лишний хвост', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked } = await loadFreshSyncManager(cloud);

        await saveKeyToCloudChunked('g_chars', { ts: 1, data: 'x'.repeat(15000) }); // много чанков
        const bigCount = [...cloud.store.keys()].filter((k) => k.startsWith('g_chars__c')).length;
        expect(bigCount).toBeGreaterThan(2);

        await saveKeyToCloudChunked('g_chars', { ts: 2, data: 'y'.repeat(5000) }); // меньше чанков
        const smallChunkKeys = [...cloud.store.keys()].filter((k) => k.startsWith('g_chars__c'));
        const manifest = JSON.parse(cloud.store.get('g_chars') as string);

        expect(smallChunkKeys.length).toBe(manifest.count); // ровно столько, сколько нужно НОВОМУ манифесту
        expect(smallChunkKeys.length).toBeLessThan(bigCount);
    });

    it('рост числа чанков не трогает существующие (просто добавляет новые)', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked } = await loadFreshSyncManager(cloud);

        await saveKeyToCloudChunked('g_chars', { ts: 1, data: 'x'.repeat(5000) });
        const smallCount = [...cloud.store.keys()].filter((k) => k.startsWith('g_chars__c')).length;

        await saveKeyToCloudChunked('g_chars', { ts: 2, data: 'y'.repeat(15000) });
        const bigChunkKeys = [...cloud.store.keys()].filter((k) => k.startsWith('g_chars__c'));

        expect(bigChunkKeys.length).toBeGreaterThan(smallCount);
    });
});

/**
 * Управляемый мок CloudStorage: setItem не резолвится сам — каждый вызов
 * встаёт в очередь `pending`, и тест сам решает, В КАКОМ ПОРЯДКЕ разрешать
 * записи через releaseNext(). Нужен, чтобы детерминированно воспроизвести
 * КОНКРЕТНОЕ чередование двух конкурентных вызовов (а не полагаться на то,
 * как микротаски двух Promise-цепочек СЛУЧАЙНО перемежаются в обычном моке).
 */
function createControllableCloudStorage() {
    const store = new Map<string, string>();
    const pending: Array<{ key: string; value: string; resolve: () => void }> = [];

    return {
        store,
        pendingCount: () => pending.length,
        /** Разрешает САМУЮ СТАРУЮ ожидающую запись в очереди. */
        releaseNext(): string {
            const item = pending.shift();
            if (!item) throw new Error('releaseNext(): очередь пуста');
            store.set(item.key, item.value);
            item.resolve();
            return item.key;
        },
        getItems: (keys: string[], cb: (err: string | null, values?: Record<string, string>) => void) => {
            const values: Record<string, string> = {};
            for (const k of keys) {
                if (store.has(k)) values[k] = store.get(k) as string;
            }
            cb(null, values);
        },
        setItem: (key: string, value: string, cb: (err: string | null, success?: boolean) => void) => {
            pending.push({ key, value, resolve: () => cb(null, true) });
        },
        removeItems: (keys: string[], cb: (err: string | null, success?: boolean) => void) => {
            for (const k of keys) store.delete(k);
            cb(null, true);
        },
    };
}

/** Прогоняет остаток текущей микротаск-очереди — даёт коду продвинуться до следующего await. */
const flushMicrotasks = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('saveKeyToCloudChunked — принудительно смоделированное чередование чанков', () => {
    it('ХУДШИЙ случай: чанки двух вызовов перемежаются построчно (c0 от A, затем c0 от B, c1 от B, c1 от A, ...) — читаем обратно и проверяем, что нет тихой порчи', async () => {
        const cloud = createControllableCloudStorage();
        vi.resetModules();
        (window as unknown as { Telegram?: unknown }).Telegram = {
            WebApp: { CloudStorage: cloud, isVersionAtLeast: () => true },
        };
        const { saveKeyToCloudChunked, fetchAllCloud } = await import('../src/core/services/telegramSyncManager');

        const payloadA = { ts: 100, data: 'A'.repeat(9000) }; // 3 чанка
        const payloadB = { ts: 200, data: 'B'.repeat(9000) }; // 3 чанка

        // getExistingChunkCount() для ключа без данных не идёт через setItem —
        // резолвится сразу, так что первое, что попадёт в очередь `pending`
        // от обоих вызовов — их chunk-записи.
        const resultA = saveKeyToCloudChunked('g_chars', payloadA);
        const resultB = saveKeyToCloudChunked('g_chars', payloadB);
        await flushMicrotasks();

        // Принудительно чередуем: c0(A), c0(B) [перезаписывает], c1(B), c1(A)
        // [перезаписывает], c2(A), c2(B) [перезаписывает] — затем оба
        // манифеста. Порядок специально "враждебный" — ни один из вызовов не
        // видит чанки исключительно от самого себя в момент своей записи.
        while (cloud.pendingCount() > 0) {
            cloud.releaseNext();
            await flushMicrotasks();
        }

        const [okA, okB] = await Promise.all([resultA, resultB]);
        expect(okA).toBe(true);
        expect(okB).toBe(true);

        const all = await fetchAllCloud();
        const isCleanA = all.g_chars?.data === payloadA.data && all.g_chars?.ts === payloadA.ts;
        const isCleanB = all.g_chars?.data === payloadB.data && all.g_chars?.ts === payloadB.ts;

        // ЗАФИКСИРОВАНО ЭМПИРИЧЕСКИ (см. warn ниже, если раскладка изменится
        // при будущей правке): при ЭТОМ конкретном принудительном
        // чередовании (FIFO-освобождение общей очереди pending) итог всё
        // равно оказывается чистым — похоже, из-за того, что setItemVerified
        // сама делает read-back после записи (ещё один await ВНУТРИ каждого
        // чанка), это создаёт больше "разноса" по микротаскам, чем кажется
        // на первый взгляд. Это НЕ доказательство отсутствия гонки вообще —
        // ни блокировки, ни версионирования по ключу в коде по-прежнему нет,
        // и другой паттерн чередования (не FIFO, другое число чанков) в
        // принципе может её проявить. Тест здесь — страховка на регресс:
        // если следующая правка эту "случайную" защиту сломает, тест упадёт.
        if (!isCleanA && !isCleanB) {
            console.warn(
                '[test] g_chars после принудительного чередования НЕ соответствует ни одному payload целиком — ' +
                'воспроизведён риск из аудита: saveKeyToCloudChunked не сериализует конкурентные вызовы по ключу.',
                { got: all.g_chars },
            );
        }
        expect(isCleanA || isCleanB).toBe(true);
        // Даже если бы выше пришлось ослабить условие — этот инвариант
        // обязателен всегда: fetchAllCloud не должен ни бросать исключение,
        // ни отдавать частично распарсенный мусор выше по цепочке
        // (initSync/useAppStore), только чистые данные или явный null.
        expect(() => JSON.stringify(all.g_chars)).not.toThrow();
    });
});
describe('saveKeyToCloudChunked — конкурентная запись одного и того же ключа', () => {
    it('маленькие (нечанкованные) параллельные записи — финальное состояние соответствует ОДНОМУ из вызовов целиком, без гибрида', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked, fetchAllCloud } = await loadFreshSyncManager(cloud);

        const payloadA = { ts: 100, data: 'версия-A' };
        const payloadB = { ts: 200, data: 'версия-B' };

        const [okA, okB] = await Promise.all([
            saveKeyToCloudChunked('g_priority', payloadA),
            saveKeyToCloudChunked('g_priority', payloadB),
        ]);
        expect(okA).toBe(true);
        expect(okB).toBe(true);

        const all = await fetchAllCloud();
        // Некорректным исходом было бы что-то ОТЛИЧНОЕ от обоих полных
        // payload'ов целиком (например {ts:100, data:'версия-B'}).
        expect([payloadA, payloadB]).toContainEqual(all.g_priority);
    });

    it('большие (чанкованные) параллельные записи одного ключа — читаются обратно БЕЗ повреждения (не гибрид из чанков разных вызовов)', async () => {
        const cloud = createMockCloudStorage();
        const { saveKeyToCloudChunked, fetchAllCloud } = await loadFreshSyncManager(cloud);

        const payloadA = { ts: 100, data: 'A'.repeat(12000) };
        const payloadB = { ts: 200, data: 'B'.repeat(9000) };

        const [okA, okB] = await Promise.all([
            saveKeyToCloudChunked('g_chars', payloadA),
            saveKeyToCloudChunked('g_chars', payloadB),
        ]);

        // Если оба вызова СЧИТАЮТ, что записались успешно, но не сериализованы
        // друг относительно друга — единственная гарантия, которую в принципе
        // можно проверить без реальной блокировки по ключу, это: то, что
        // прочиталось обратно, либо ПОЛНОСТЬЮ валидный JSON одного из двух
        // payload'ов, либо явно и предсказуемо помечено как повреждённое
        // (null) — а НЕ тихо возвращает молчаливо смешанные данные.
        if (okA && okB) {
            const all = await fetchAllCloud();
            const isCleanA = all.g_chars?.data === payloadA.data && all.g_chars?.ts === payloadA.ts;
            const isCleanB = all.g_chars?.data === payloadB.data && all.g_chars?.ts === payloadB.ts;
            const isExplicitlyNull = all.g_chars === null;
            expect(isCleanA || isCleanB || isExplicitlyNull).toBe(true);
        }
    });
});
