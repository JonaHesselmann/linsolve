/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/



import { defineStore } from 'pinia'; 
import i18n from './i18n';

/**
 * Defines a new languageStore
 * @type {StoreDefinition<"i18n", {locale: "de" | "en" | string | WritableComputedRef<string extends string ? string : Locale extends Locale ? (IsNever<PickupLocales<NonNullable<{de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}} extends Record<string, unknown> ? {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}} : {}>> | PickupLocales<NonNullable<{messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["datetimeFormats"] extends Record<string, unknown> ? {messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["datetimeFormats"] : {}>> | PickupLocales<NonNullable<{messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["numberFormats"] extends Record<string, unknown> ? {messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["numberFormats"] : {}>>> extends true ? Locale : (PickupLocales<NonNullable<{de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}} extends Record<string, unknown> ? {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}} : {}>> | PickupLocales<NonNullable<{messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["datetimeFormats"] extends Record<string, unknown> ? {messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["datetimeFormats"] : {}>> | PickupLocales<NonNullable<{messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["numberFormats"] extends Record<string, unknown> ? {messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["numberFormats"] : {}>>)) : (string extends string ? string : Locale | PickupLocales<NonNullable<{de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}} extends Record<string, unknown> ? {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}} : {}>> | PickupLocales<NonNullable<{messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["datetimeFormats"] extends Record<string, unknown> ? {messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["datetimeFormats"] : {}>> | PickupLocales<NonNullable<{messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["numberFormats"] extends Record<string, unknown> ? {messages: {de: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}, en: {language: string, documentation: string, aboutUs: string, gtcs: string, minimization: string, maximization: string, condition: string, constraint: string, addConstraint: string, solve: string}}, fallbackLocale: string, locale: string}["numberFormats"] : {}>>)>}, {}, {setLocale(locale): void}>}
 */
export const languageStore = defineStore('i18n', {
  // The `state` function returns an object that represents the reactive state of the store
  state: () => ({
    locale: i18n.global.locale, 
  }),
  
  // Actions section: methods that can modify the state or perform other logic
  actions: {
    // This action sets the new locale for both the store and the global i18n instance
    /**
     * setter for the locale
     * @param locale {locale} -the locale to change to
     */
    setLocale(locale) {
      this.locale = locale; 
      i18n.global.locale = locale; 
    },
  },
});

