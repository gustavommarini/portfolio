import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import enHome from './locales/en/home.json';
import enIntroData from './locales/en/intro_data.json';
import enSinglePage from './locales/en/single_page.json';
import esHome from './locales/es/home.json';
import esSinglePage from './locales/es/single_page.json';
import esIntroData from './locales/es/intro_data.json';
import { AvailableLanguages } from './i18n.types';

i18n
  .use(HttpBackend) // Load translations from JSON files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    lng: AvailableLanguages.en, // Set the initial language of the App
    fallbackLng: AvailableLanguages.en, // Default language
    supportedLngs: [AvailableLanguages.en, AvailableLanguages.es], // Supported languages
    debug: true,
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    ns: ['home', 'single'], // Define your namespaces
    defaultNS: 'home', // Set a default namespace
    resources: {
      en: {
        home: enHome,
        single: enSinglePage,
        intro: enIntroData,
      },
      es: {
        home: esHome,
        single: esSinglePage,
        intro: esIntroData,
      },
    },
  });

export default i18n;
