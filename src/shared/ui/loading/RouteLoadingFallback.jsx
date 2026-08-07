import React from 'react';

/**
 * Фолбэк для React.lazy()-страниц (см. App.jsx). Показывается только на
 * время скачивания чанка страницы — для уже закэшированных в браузере
 * чанков (повторный визит) обычно не успевает даже промелькнуть.
 *
 * Инлайн-стили, не CSS-класс — тот же подход, что и в ErrorBoundary.jsx для
 * полноэкранных состояний уровня приложения. Специально НЕ переиспользует
 * .cv-loading-indicator/.cv-loading-spinner (CvLoaderContext.jsx) — та
 * вёрстка ссылается на var(--dark)/var(--light), которых нет в палитре
 * (core/styles/base.css) и без fallback-значения в var(), так что реально
 * рендерится с цветом браузера по умолчанию, а не задуманным — см. общую
 * находку по ~90 таким местам в CSS. Не тащим этот баг в новый компонент.
 */
function RouteLoadingFallback() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                padding: '24px',
            }}
            role="status"
            aria-live="polite"
        >
            <span
                style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '3px solid var(--border, rgba(128,128,128,0.25))',
                    borderTopColor: 'var(--pineberry, #5c7aad)',
                    animation: 'route-loading-spin 0.8s linear infinite',
                }}
                aria-hidden="true"
            />
            <style>{`@keyframes route-loading-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default RouteLoadingFallback;
