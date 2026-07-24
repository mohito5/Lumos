import React, { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react';
import { showNotification } from '../core/utils/notifications';
import { patchCvConstants } from '../features/profile/utils/opencv/cv-patch';

/**
 * РАНЬШЕ: useCvLoader.ts вызывался НЕЗАВИСИМО в InventoryPage.tsx и
 * DigitCalibrationPage.tsx — у каждого свой useEffect, свой useState.
 * Работало (window.cv кэшируется глобально, повторный вызов быстро находит
 * уже готовый модуль), но статус загрузки не был виден нигде, кроме этих
 * двух страниц — пользователь, ушедший со страницы инвентаря посреди
 * загрузки 7+ МБ wasm, не видел вообще никакого индикатора где-либо ещё в
 * приложении.
 *
 * Плюс index.html раньше грузил /opencv.js СИНХРОННО через
 * <script async> при КАЖДОМ старте приложения, для КАЖДОГО пользователя —
 * даже для тех, кто ни разу не откроет инвентарь/сканирование. Теперь
 * скрипт инжектится динамически через ensureLoaded() — только когда его
 * реально запросили (см. вызовы в InventoryPage.tsx/DigitCalibrationPage.tsx).
 *
 * ТЕПЕРЬ: один экземпляр состояния на всё приложение (этот контекст),
 * ensureLoaded() — идемпотентный триггер (повторные вызовы из разных
 * компонентов не запускают повторную загрузку), статус читается откуда
 * угодно через useCvStatus(), плюс лёгкий индикатор в правом верхнем углу,
 * видимый на любой странице, пока идёт загрузка.
 */

const CvLoaderContext = createContext(null);

/** @returns {{ status: 'unloaded'|'loading'|'ready'|'error', ensureLoaded: () => void }} */
export const useCvStatus = () => useContext(CvLoaderContext);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Инжектит <script src="/opencv.js"> динамически, один раз (проверяет и уже
 *  идущую загрузку — на случай двух параллельных вызовов ensureLoaded). */
function injectOpenCvScript() {
    return new Promise((resolve, reject) => {
        if (window.cv) { resolve(); return; }

        const existing = document.querySelector('script[data-opencv]');
        if (existing) {
            existing.addEventListener('load', () => resolve(), { once: true });
            existing.addEventListener('error', () => reject(new Error('opencv.js: скрипт не загрузился (повторная попытка)')), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = '/opencv.js';
        script.async = true;
        script.dataset.opencv = 'true';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('opencv.js: скрипт не загрузился'));
        document.head.appendChild(script);
    });
}

export const CvLoaderProvider = ({ children }) => {
    const [status, setStatus] = useState('unloaded');
    // Идемпотентность: InventoryPage и DigitCalibrationPage оба зовут
    // ensureLoaded() на монтировании — не должно запускать загрузку дважды.
    const startedRef = useRef(false);

    const ensureLoaded = useCallback(() => {
        if (startedRef.current) return;
        startedRef.current = true;
        setStatus('loading');

        (async () => {
            // ── 1. Скрипт → window.cv (фабрика или готовый модуль) ─────────
            await injectOpenCvScript();

            let attempts = 0;
            while (!window.cv) {
                if (attempts++ > 100) throw new Error('opencv.js не загрузился за 10 сек');
                await wait(100);
            }

            // ── 2. Определяем тип билда (см. историю в старом useCvLoader.ts) ─
            if (typeof window.cv === 'function') {
                const factory = window.cv;
                const module = await factory({
                    locateFile: (filename) => (filename.endsWith('.wasm') ? '/opencv.wasm' : '/' + filename),
                });
                window.cv = module;
            } else {
                let attempts2 = 0;
                while (!window.cv?.imread) {
                    if (attempts2++ > 100) throw new Error('cv.imread не появился');
                    await wait(100);
                }
            }

            // ── 3. Патчим недостающие числовые константы ────────────────────
            patchCvConstants();
            setStatus('ready');
        })().catch((e) => {
            console.error('[CvLoaderContext] ошибка инициализации OpenCV:', e);
            setStatus('error');
            showNotification('Ошибка загрузки OpenCV — сканирование недоступно', 'error', 6000);
        });
    }, []);

    const value = useMemo(() => ({ status, ensureLoaded }), [status, ensureLoaded]);

    return (
        <CvLoaderContext.Provider value={value}>
            {children}
            {status === 'loading' && <CvLoadingIndicator />}
        </CvLoaderContext.Provider>
    );
};

/** Тонкая некликабельная плашка в углу — видна на ЛЮБОЙ странице приложения,
 *  пока идёт загрузка ~7МБ wasm. Не блокирует интерфейс. */
const CvLoadingIndicator = () => (
    <div className="cv-loading-indicator f-r ai-c g-1" role="status" aria-live="polite">
        <span className="cv-loading-spinner" aria-hidden="true" />
        <span>OpenCV…</span>
    </div>
);
