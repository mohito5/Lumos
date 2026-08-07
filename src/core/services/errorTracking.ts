// ============================================================================
// errorTracking.ts — единая точка входа для мониторинга ошибок в production.
//
// ЗАЧЕМ: до этого catch-блоки в telegramSyncManager/useOcrProcess и
// ErrorBoundary.componentDidCatch писали только в console.error — то есть
// ошибка фактически терялась молча: Lumos живёт внутри Telegram WebView, где
// у пользователя нет открытой консоли браузера, и единственный способ узнать
// о проблеме — дождаться, пока он сам напишет и опишет, что сломалось. Задача
// не "ловить больше багов логикой", а узнавать, что они произошли, не
// дожидаясь жалобы — то есть просто пробрасывать те же самые ошибки туда,
// где их видно за пределами одной сессии одного пользователя.
//
// ПОДКЛЮЧЕНИЕ SENTRY: без VITE_SENTRY_DSN всё в этом файле — управляемый
// no-op (ничего никуда не уходит, но и не падает, и не шумит в консоль
// production-сборки). Чтобы реально включить сбор ошибок:
//   1. Завести проект на sentry.io (бесплатного тарифа достаточно для старта;
//      self-hosted GlitchTip тоже подходит — протокол совместим).
//   2. Положить DSN в .env (локально, см. .env.example) и в переменные
//      окружения Cloudflare Pages (Settings → Environment variables) под
//      именем VITE_SENTRY_DSN — ключ должен начинаться с VITE_, иначе Vite
//      не пробросит его в клиентский бандл (см. документацию Vite про env).
//   3. Всё остальное уже подключено — конкретные вызовы captureError см. в
//      ErrorBoundary.jsx, telegramSyncManager.ts, useOcrProcess.ts,
//      useAppStore.ts.
//
// @sentry/browser импортируется ДИНАМИЧЕСКИ, а не в начале файла — пока DSN
// не задан (весь текущий момент, до настройки Sergey), код Sentry вообще не
// загружается и не занимает место в основном бандле; та же логика, что и у
// остального code-splitting в проекте (см. vite.config.js manualChunks).
// ============================================================================

type SentryModule = typeof import('@sentry/browser');

const dsn = (import.meta.env.VITE_SENTRY_DSN as string | undefined)?.trim() || '';

let sentryModulePromise: Promise<SentryModule> | null = null;
let initAttempted = false;

function loadSentry(): Promise<SentryModule> {
  if (!sentryModulePromise) {
    sentryModulePromise = import('@sentry/browser');
  }
  return sentryModulePromise;
}

/**
 * Вызывается один раз при старте приложения (main.jsx). No-op, если DSN
 * не задан — тогда даже не пытается загрузить @sentry/browser.
 */
export async function initErrorTracking(): Promise<void> {
  if (initAttempted) return;
  initAttempted = true;

  if (!dsn) {
    if (import.meta.env.DEV) {
      console.info(
        '[errorTracking] VITE_SENTRY_DSN не задан — мониторинг ошибок выключен. ' +
        'Это ожидаемо в разработке; см. комментарий в errorTracking.ts, чтобы включить.'
      );
    }
    return;
  }

  try {
    const Sentry = await loadSentry();
    Sentry.init({
      dsn,
      environment: import.meta.env.MODE,
      // Полноценный трейсинг/session replay ради размера бандла сознательно
      // не подключаем — задача была "узнавать об ошибках", не APM.
      tracesSampleRate: 0,
    });
  } catch (err) {
    // Мониторинг ошибок не должен сам становиться новым источником ошибок —
    // если сеть недоступна или DSN невалиден, тихо остаёмся без него.
    console.warn('[errorTracking] инициализация Sentry не удалась, остаёмся без мониторинга:', err);
  }
}

/**
 * Отправляет исключение в трекер. Безопасна для вызова ВСЕГДА — без DSN
 * (или до успешной инициализации) просто ничего не делает сверх того
 * console.error/ocrLog.error, что уже стоит рядом на месте вызова.
 */
export function captureError(error: unknown, context?: Record<string, unknown>): void {
  if (!dsn) return;
  void loadSentry()
    .then((Sentry) => {
      Sentry.captureException(error, context ? { extra: context } : undefined);
    })
    .catch(() => {
      // см. комментарий в initErrorTracking — сам трекинг не должен шуметь
    });
}
