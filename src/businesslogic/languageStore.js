// languageStore.js

import { reactive } from 'vue';

/**
 * @typedef {Object} LocaleOptions
 * @property {"de" | "en" | string} locale - The current language code.
 */

/**
 * @typedef {Object} LanguageStoreMethods
 * @property {Function} setLocale - Function to set the current language.
 */

/**
 * @typedef {Object} LanguageStore
 * @property {LocaleOptions} state - The current language options state.
 * @property {LanguageStoreMethods} methods - Methods to manipulate language options.
 */

/**
 * A composable function that provides a reactive language store.
 * 
 * @returns {LanguageStore} - A reactive language store with state and methods.
 */
export function useLanguageStore() {
    const state = reactive({
        locale: 'de' // Default set to German
    });

    /**
     * Sets the current language.
     * 
     * @param {string} locale - The new language code, e.g., 'de' or 'en'.
     */
    function setLocale(locale) {
        state.locale = locale;
    }

    return {
        state,
        methods: {
            setLocale
        }
    };
}


