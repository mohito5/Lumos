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
