
// telegram-debug.js

// Этот модуль предназначен для эмуляции объекта Telegram WebApp в среде, где он отсутствует (например, в обычном браузере).
// Это упрощает разработку и тестирование UI/UX без необходимости постоянно загружать приложение в Telegram.

export function initTelegramDebug() {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.log("Telegram WebApp not found, initializing debug mock.");

        const mockWebApp = {
            // --- Properties ---
            colorScheme: "light", // 'light' or 'dark'
            headerColor: "#ffffff",
            backgroundColor: "#ffffff",
            isClosingConfirmationEnabled: false,
            isExpanded: true,
            platform: "weba", // Example platform, e.g., 'tdesktop', 'android', 'ios'
            viewportHeight: 800, // Example height
            viewportStableHeight: 800,

            // --- User Data ---
            // ВНИМАНИЕ: Эти данные являются моковыми и должны использоваться только для разработки.
            // Никогда не используйте реальные данные пользователей в этом объекте.
            initDataUnsafe: {
                user: {
                    id: 123456789,
                    first_name: "Debug",
                    last_name: "User",
                    username: "debug_user",
                    language_code: "en",
                    is_premium: true,
                },
                // Другие поля, если они необходимы для тестирования
            },

            // --- Methods (with logging) ---
            ready: () => console.log("[Debug] Telegram.WebApp.ready() called."),
            expand: () => console.log("[Debug] Telegram.WebApp.expand() called."),
            close: () => console.log("[Debug] Telegram.WebApp.close() called."),

            // MainButton
            MainButton: {
                text: "DEFAULT",
                color: "#5288c1",
                textColor: "#ffffff",
                isVisible: false,
                isActive: false,
                show() { this.isVisible = true; console.log("[Debug] MainButton.show()"); },
                hide() { this.isVisible = false; console.log("[Debug] MainButton.hide()"); },
                enable() { this.isActive = true; console.log("[Debug] MainButton.enable()"); },
                disable() { this.isActive = false; console.log("[Debug] MainButton.disable()"); },
                showProgress(leaveActive) { console.log(`[Debug] MainButton.showProgress(${leaveActive})`); },
                hideProgress() { console.log("[Debug] MainButton.hideProgress()"); },
                setText(text) { this.text = text; console.log(`[Debug] MainButton.setText('${text}')`); },
                setParams(params) { console.log("[Debug] MainButton.setParams()", params); },
                onClick(callback) { console.log("[Debug] MainButton.onClick setup."); this._clickCallback = callback; },
                offClick(callback) { console.log("[Debug] MainButton.offClick setup."); this._clickCallback = null; },
                _clickCallback: null, // For simulation
                // Helper to simulate click
                _simulateClick() { 
                    if (this.isVisible && this.isActive && this._clickCallback) { 
                        console.log("[Debug] Simulating MainButton click.");
                        this._clickCallback();
                    } else {
                        console.log("[Debug] Cannot simulate click. Button is not visible, not active, or has no callback.");
                    }
                }
            },

            // Other methods can be mocked here as needed...
            showAlert: (message) => alert(`[Debug Alert] ${message}`),
            showConfirm: (message, callback) => {
                const result = confirm(`[Debug Confirm] ${message}`);
                if (callback) callback(result);
            },
            // ... и так далее для других методов API.
        };

        // Assign the mock to the global window object
        window.Telegram = { WebApp: mockWebApp };

        // You can add a global helper for convenience, e.g., to simulate a main button click:
        window.simulateMainButtonClick = () => window.Telegram.WebApp.MainButton._simulateClick();

        console.log("Debug mock for Telegram WebApp has been initialized.");
    }
}
