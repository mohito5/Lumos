
import { STORAGE_KEYS, DEFAULT_LANGUAGE } from './constants.js';

/**
 * Retrieves the current language from localStorage.
 * @returns {string} The current language code (e.g., 'ru', 'en').
 */
export const getCurrentLanguage = () => {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || DEFAULT_LANGUAGE;
};

/**
 * Sets the current language in localStorage.
 * @param {string} lang - The language code to set.
 */
export const setCurrentLanguage = (lang) => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
};
