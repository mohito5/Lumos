
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './core/i18n/i18n-config';
import App from './App.jsx';
import { useAppStore } from './store/useAppStore';
import telegramHelper from './core/services/telegram.js';

import './assets/styles/home.css'
import './assets/styles/main.css';
import './assets/styles/themes.css';
import './assets/styles/list.css';
import './assets/styles/header.css';

// ─────────────────────────────────────────────────────────────────────────────
// Telegram-мини-приложение при запуске дописывает в window.location.hash
// собственные launch-параметры — например
// «#tgWebAppData=...&tgWebAppVersion=...&tgWebAppPlatform=...».
// Скрипт telegram-web-app.js (см. index.html, подключён синхронно ДО этого
// модуля) к этому моменту уже считал их в window.Telegram.WebApp, так что
// сам hash нам для данных Telegram больше не нужен.
//
// Проблема в том, что HashRouter использует ровно тот же location.hash для
// СВОЕГО роутинга. В результате при запуске из Telegram путь оказывается не
// «/» и не «/home», а буквально «tgWebAppData=...&...» — он не совпадает ни
// с одним <Route>, поэтому рендерится пустой NotFoundPage. Header при этом
// живёт вне <Routes> и продолжает рисоваться — отсюда «видна только
// навигация, а страницы нет».
// Чистим hash до монтирования HashRouter, если он не похож на наш маршрут
// (наши всегда начинаются с «#/»).
if (window.location.hash && !window.location.hash.startsWith('#/')) {
    window.location.hash = '/home';
}

const AppWrapper = () => {
    // 1. Get the initialization function
    const initialize = useAppStore(state => state.initialize);

    // 2. Separate selectors for each piece of state. This is the key fix.
    const isLoading = useAppStore(state => state.isLoading);
    const error = useAppStore(state => state.error);

    // 3. Call initialize only once when the component mounts
    useEffect(() => {
        initialize();
    }, [initialize]);

    // Сообщаем Telegram, что интерфейс готов к показу, и разворачиваем
    // мини-приложение на весь экран. Раньше эти вызовы существовали только
    // в дебаг-моке (telegram-debug.js) и никогда не выполнялись в реальном
    // Telegram.WebApp — из-за этого мини-апп мог оставаться в «половинном»
    // экране/на заглушке загрузки Telegram дольше, чем нужно.
    useEffect(() => {
        if (telegramHelper.isInTelegram()) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
        }
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2em' }}>
                Загрузка...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
                <h1>Произошла ошибка</h1>
                <p>{error}</p>
                <p>Пожалуйста, попробуйте обновить страницу.</p>
            </div>
        );
    }

    return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('content'));

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AppWrapper />
    </I18nextProvider>
  </React.StrictMode>
);
