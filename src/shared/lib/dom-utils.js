// js-o/utils/dom-utils.js

/**
 * Упрощенный селектор для элементов DOM.
 * @param {string} selector - CSS-селектор.
 * @param {Element} [scope=document] - Элемент, в котором искать.
 * @returns {Element|null} - Найденный элемент.
 */
export function $(selector, scope = document) {
    return scope.querySelector(selector);
}

/**
 * Упрощенный селектор для нескольких элементов DOM.
 * @param {string} selector - CSS-селектор.
 * @param {Element} [scope=document] - Элемент, в котором искать.
 * @returns {NodeListOf<Element>} - Коллекция найденных элементов.
 */
export function $$(selector, scope = document) {
    return scope.querySelectorAll(selector);
}
