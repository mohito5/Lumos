
// js-o/telegram-webapp.js
// Provides helper functions for interacting with the Telegram Web App.

const telegramHelper = {
    isInTelegram: function() {
        return typeof window.Telegram !== 'undefined' && window.Telegram.WebApp;
    }
};

export default telegramHelper;
