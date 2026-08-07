/**
 * Cloudflare Pages Function: GET /api/uid/:uid
 *
 * Прокси к https://enka.network/api/uid/{uid} — фронтенд не может дёрнуть
 * его напрямую (enka.network не отдаёт Access-Control-Allow-Origin, запрос
 * из браузера падает на CORS). В dev-режиме это скрывал прокси самого
 * Vite (см. vite.config.js), но в проде Vite dev-server не существует —
 * отсюда и был нерабочий импорт после деплоя. Этот файл — прямая замена
 * ровно под тот же путь /api/uid/:uid, ничего в фронтенде менять не нужно.
 *
 * Важно: это НЕ отдельный Worker и не отдельный проект/тариф. Любой файл
 * в /functions автоматически становится serverless-функцией ТОГО ЖЕ самого
 * Pages-деплоя — работает на бесплатном тарифе Cloudflare Pages без каких-
 * либо доп. действий (просто деплоите папку functions вместе с dist).
 * Бесплатный лимит Workers, на которых работают Pages Functions, — 100 000
 * запросов в день, для персонального проекта такого масштаба с огромным
 * запасом (и CPU-время, которое реально лимитируется, не считает время
 * ожидания fetch() к Enka — сама функция почти всё время просто ждёт
 * ответа апстрима, а не считает).
 *
 * Кэш на edge на основе поля ttl из ответа Enka: сами Enka в доке по
 * рейт-лимитам просят не дёргать эндпоинт чаще, чем ttl секунд для одного
 * UID, иначе рано или поздно 429. Это заодно снижает и число реальных
 * походов к Enka с одного и того же UID от разных посетителей, и (чуть
 * менее важно) число активных вызовов самой функции.
 */

const ENKA_BASE = 'https://enka.network/api/uid/';
const USER_AGENT = 'Lumos-Genshin-Companion/1.0 (+https://github.com/; Telegram Mini App)';
const DEFAULT_TTL_SECONDS = 60;
const UID_PATTERN = /^\d{6,12}$/;

function corsHeaders(extra = {}) {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        ...extra,
    };
}

function jsonError(status, error) {
    return new Response(JSON.stringify({ error }), {
        status,
        headers: corsHeaders({ 'Content-Type': 'application/json' }),
    });
}

export async function onRequestOptions() {
    return new Response(null, { headers: corsHeaders() });
}

export async function onRequestGet(context) {
    const { params, request } = context;
    const uid = String(params.uid || '').trim();

    if (!UID_PATTERN.test(uid)) {
        return jsonError(400, 'invalid_uid');
    }

    const cache = caches.default;
    const cacheKey = new Request(new URL(request.url).toString(), request);

    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    let upstream;
    try {
        upstream = await fetch(`${ENKA_BASE}${uid}/`, {
            headers: { 'User-Agent': USER_AGENT },
        });
    } catch (err) {
        return jsonError(502, 'upstream_unreachable');
    }

    // 424 — сервер игры на обслуживании, 429 — рейт-лимит Enka, 400/404 —
    // такого UID нет или профиль закрыт. Пробрасываем статус и тело как
    // есть, чтобы фронтенд мог показать осмысленное сообщение, а не общее
    // «профиль не найден» на всё подряд.
    if (!upstream.ok) {
        const body = await upstream.text();
        return new Response(body, {
            status: upstream.status,
            headers: corsHeaders({ 'Content-Type': 'application/json' }),
        });
    }

    const data = await upstream.json();
    const enkaTtl = Number(data.ttl);
    const usedFallback = !(enkaTtl > 0);
    const ttl = usedFallback ? DEFAULT_TTL_SECONDS : enkaTtl;

    if (usedFallback) {
        // Enka не прислала валидный ttl в теле ответа (ожидается почти
        // никогда — это защитный fallback). Логируем в Cloudflare Function
        // Logs, чтобы частоту можно было отследить, если Enka когда-нибудь
        // перестанет отдавать ttl вообще, а не подбирать значение вслепую.
        console.warn(`[api/uid] fallback ttl=${DEFAULT_TTL_SECONDS}s: Enka не вернула валидный ttl (получено: ${JSON.stringify(data.ttl)}) для uid=${uid}`);
    }

    const response = new Response(JSON.stringify(data), {
        status: 200,
        headers: corsHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': `public, max-age=${ttl}`,
            // Диагностический заголовок: видно прямо в devtools/curl, не
            // нужно лезть в логи функции ради частого случая проверки.
            'X-Ttl-Source': usedFallback ? 'fallback' : 'enka',
        }),
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
}
