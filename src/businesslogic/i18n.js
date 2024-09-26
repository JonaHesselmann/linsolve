import { createI18n } from 'vue-i18n'; 
import en from '../locales/en.json'; 
import de from '../locales/de.json'; 

// Define interfaces for the translation structure
/**
 * @typedef {Object} TranslationMessages
 * @property {Object} de
 * @property {string} de.language
 * @property {string} de.documentation
 * @property {string} de.aboutUs
 * @property {string} de.gtcs
 * @property {string} de.minimization
 * @property {string} de.maximization
 * @property {string} de.condition
 * @property {string} de.constraint
 * @property {string} de.addConstraint
 * @property {string} de.solve
 * @property {Object} en
 * @property {string} en.language
 * @property {string} en.documentation
 * @property {string} en.aboutUs
 * @property {string} en.gtcs
 * @property {string} en.minimization
 * @property {string} en.maximization
 * @property {string} en.condition
 * @property {string} en.constraint
 * @property {string} en.addConstraint
 * @property {string} en.solve
 */

/**
 * @type {import('vue-i18n').I18n<{messages: TranslationMessages, fallbackLocale: string, locale: string}>}
 */
let i18n = createI18n({
  locale: 'de', // The default locale is set to German
  fallbackLocale: 'de', // If a translation for the active locale is not found, fallback to German
  messages: {
    en, 
    de, 
  }, 
});

// Exporting the i18n instance so it can be used across the application
export default i18n; 

