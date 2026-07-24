// navigation-utils.js - Финальная версия, основанная на реальной структуре HTML.

/**
 * Находит наиболее подходящую ссылку <a>, устанавливает на нее класс .active 
 * и запускает перемещение подсветки.
 */
export function updateActiveNav() {
    const currentHash = window.location.hash || '#/home';
    // Находим все навигационные ссылки, которые являются .nav-item
    const navItems = document.querySelectorAll('a.nav-item[href]');
    let bestMatch = null;

    // 1. Сначала убираем класс .active со всех ссылок.
    navItems.forEach(item => item.classList.remove('active'));

    // 2. Ищем наиболее подходящую ссылку (самое длинное совпадение).
    navItems.forEach(item => {
        const linkHash = item.getAttribute('href');
        if (currentHash.startsWith(linkHash)) {
            if (!bestMatch || linkHash.length > bestMatch.getAttribute('href').length) {
                bestMatch = item;
            }
        }
    });
    
    // 3. Если совпадений не найдено, по умолчанию выбираем 'home'.
    if (!bestMatch) {
        bestMatch = document.querySelector('a.nav-item[href="#/home"]');
    }

    // 4. Устанавливаем класс .active на лучшую найденную ссылку и двигаем подсветку.
    if (bestMatch) {
        bestMatch.classList.add('active');
        requestAnimationFrame(moveHighlight);
    } else {
        console.warn('Не удалось найти активную ссылку для навигации.');
    }
}


/**
 * Перемещает элемент подсветки (.nav-highlight) под активный элемент .nav-item.active.
 */
export function moveHighlight() {
    const highlight = document.querySelector('.nav-highlight');
    // Теперь цель - это просто a.nav-item.active
    const activeItem = document.querySelector('a.nav-item.active');
    const navList = document.querySelector('.nav-links');

    if (!highlight || !activeItem || !navList) {
        if (highlight) highlight.style.opacity = '0'; // Скрываем подсветку, если нет цели
        return;
    }

    const navRect = navList.getBoundingClientRect();
    const activeRect = activeItem.getBoundingClientRect();

    // Расчеты теперь всегда верны, так как основаны на правильном элементе.
    highlight.style.left = `${activeRect.left - navRect.left}px`;
    highlight.style.top = `${activeRect.top - navRect.top}px`;
    highlight.style.width = `${activeRect.width}px`;
    highlight.style.height = `${activeRect.height}px`;
    highlight.style.opacity = '1';
}

/**
 * Ожидает загрузки всех изображений внутри родительского элемента.
 */
function waitForImages(parentElement) {
    if (!parentElement) return Promise.resolve();
    const images = Array.from(parentElement.getElementsByTagName('img'));
    const promises = images.map(img => {
        return new Promise((resolve) => {
            if (img.complete) {
                resolve();
            } else {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
            }
        });
    });
    return Promise.all(promises);
}

/**
 * Запускает `moveHighlight` после того, как все изображения на странице загрузятся.
 */
export function updateAfterImagesLoad() {
    const content = document.getElementById('content');
    waitForImages(content).then(() => {
        // Небольшая задержка для гарантии, что все рендеры завершены
        setTimeout(() => requestAnimationFrame(moveHighlight), 50);
    });
}

/**
 * Устанавливает обработчики событий для навигации.
 */
export function setupNavigationListeners() {
    // Следим за изменением размера окна для корректного отображения подсветки
    window.addEventListener('resize', moveHighlight);
    window.addEventListener('orientationchange', () => setTimeout(moveHighlight, 100));
}
