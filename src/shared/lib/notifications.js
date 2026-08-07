/**
 * Система уведомлений Lumos
 *
 * Особенности:
 *  - Уведомления накапливаются снизу вверх: новые появляются СНИЗУ стека.
 *  - Когда верхнее исчезает — остальные плавно поднимаются.
 *  - Тип 'loading' — висит до явного вызова dismissNotification(id).
 *  - Возвращает id, по которому можно закрыть уведомление досрочно.
 */

let notifContainer = null;
let notifIdCounter = 0;

// ─── CSS ────────────────────────────────────────────────────────────────────

const injectStyles = () => {
    if (document.getElementById('lumos-notif-styles')) return;
    const style = document.createElement('style');
    style.id = 'lumos-notif-styles';
    style.textContent = `
        #lumos-notif-container {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
            z-index: 10000;
            pointer-events: none;
        }

        .lumos-notif {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 11px 16px;
            border-radius: 8px;
            color: #fff;
            font-size: var(--font-small);
            font-weight: 500;
            pointer-events: all;
            min-width: 200px;
            max-width: 300px;
            animation: lumos-slide-in 0.28s cubic-bezier(.4,0,.2,1) forwards;
            will-change: transform, opacity;
            line-height: 1.4;
        }

        .lumos-notif.removing {
            animation: lumos-slide-out 0.25s cubic-bezier(.4,0,.2,1) forwards;
        }

        .lumos-notif.success  { background: var(--lime); }
        .lumos-notif.error    { background: var(--cherry); }
        .lumos-notif.info     { background: var(--blueberry); }
        .lumos-notif.loading  { background: #3a3a4a; }

        .lumos-notif-icon {
            flex-shrink: 0;
            font-size: 15px;
            line-height: 1;
        }

        .lumos-notif-spinner {
            flex-shrink: 0;
            width: 14px;
            height: 14px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: lumos-spin 0.7s linear infinite;
        }

        .lumos-notif-text {
            flex: 1;
        }

        @keyframes lumos-spin {
            to { transform: rotate(360deg); }
        }

        @keyframes lumos-slide-in {
            from { transform: translateX(110%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
        }

        @keyframes lumos-slide-out {
            from { transform: translateX(0);    opacity: 1; }
            to   { transform: translateX(110%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
};

// ─── Container ───────────────────────────────────────────────────────────────

const getContainer = () => {
    if (!notifContainer) {
        injectStyles();
        notifContainer = document.createElement('div');
        notifContainer.id = 'lumos-notif-container';
        document.body.appendChild(notifContainer);
    }
    return notifContainer;
};

// ─── Core ────────────────────────────────────────────────────────────────────

const ICONS = {
    success: '✓',
    error:   '✕',
    info:    'ℹ',
};

const AUTO_DISMISS_MS = 4000;

/**
 * Показать уведомление.
 * @param {string} message
 * @param {'success'|'error'|'info'|'loading'} type
 * @param {number|null} duration  мс до авто-закрытия; null = не закрывать
 * @returns {number} id уведомления
 */
export const showNotification = (message, type = 'info', duration = AUTO_DISMISS_MS) => {
    const container = getContainer();
    const id = ++notifIdCounter;

    const el = document.createElement('div');
    el.className = `lumos-notif ${type}`;
    el.dataset.id = String(id);

    // Иконка или спиннер
    if (type === 'loading') {
        const spinner = document.createElement('div');
        spinner.className = 'lumos-notif-spinner';
        el.appendChild(spinner);
    } else {
        const icon = document.createElement('span');
        icon.className = 'lumos-notif-icon';
        icon.textContent = ICONS[type] ?? 'ℹ';
        el.appendChild(icon);
    }

    const text = document.createElement('span');
    text.className = 'lumos-notif-text';
    text.textContent = message;
    el.appendChild(text);

    // Новые уведомления — в конец (визуально снизу, т.к. flex-direction: column)
    container.appendChild(el);

    if (duration !== null) {
        setTimeout(() => dismissNotification(id), duration);
    }

    return id;
};

/**
 * Закрыть уведомление по id.
 * @param {number} id
 */
export const dismissNotification = (id) => {
    const container = getContainer();
    const el = container.querySelector(`[data-id="${id}"]`);
    if (!el) return;

    el.classList.add('removing');
    el.addEventListener('animationend', () => {
        if (el.parentNode) el.parentNode.removeChild(el);
    }, { once: true });
};

/**
 * Обновить текст уже существующего уведомления (например, «загрузка» → «готово»).
 * @param {number} id
 * @param {string} newMessage
 * @param {'success'|'error'|'info'|'loading'} newType
 * @param {number|null} duration
 */
export const updateNotification = (id, newMessage, newType = 'success', duration = AUTO_DISMISS_MS) => {
    const container = getContainer();
    const el = container.querySelector(`[data-id="${id}"]`);
    if (!el) {
        // Уведомление уже закрылось — показываем новое
        showNotification(newMessage, newType, duration);
        return;
    }

    // Меняем тип
    el.className = `lumos-notif ${newType}`;

    // Меняем иконку/спиннер
    const firstChild = el.firstElementChild;
    if (firstChild) el.removeChild(firstChild);

    if (newType === 'loading') {
        const spinner = document.createElement('div');
        spinner.className = 'lumos-notif-spinner';
        el.insertBefore(spinner, el.firstChild);
    } else {
        const icon = document.createElement('span');
        icon.className = 'lumos-notif-icon';
        icon.textContent = ICONS[newType] ?? 'ℹ';
        el.insertBefore(icon, el.firstChild);
    }

    // Меняем текст
    const textEl = el.querySelector('.lumos-notif-text');
    if (textEl) textEl.textContent = newMessage;

    if (duration !== null) {
        setTimeout(() => dismissNotification(id), duration);
    }
};

// ─── Обратная совместимость (useDataManager использует showSaveNotification) ──

/**
 * @deprecated Используй showNotification напрямую
 */
export const showSaveNotification = (message, type = 'success') => {
    showNotification(message, type);
};
