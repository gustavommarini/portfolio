import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import enHome from './locales/en/home.json';
import esHome from './locales/es/home.json';
import itHome from './locales/it/home.json';
import enAbout from './locales/en/about.json';
import esAbout from './locales/es/about.json';
import itAbout from './locales/it/about.json';
import enNavbar from './locales/en/navbar.json';
import esNavbar from './locales/es/navbar.json';
import itNavbar from './locales/it/navbar.json';
import { AvailableLanguages } from './i18n.types';

i18n
  .use(HttpBackend) // Load translations from JSON files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    lng: AvailableLanguages.en, // Set the initial language of the App
    fallbackLng: AvailableLanguages.en, // Default language
    supportedLngs: [
      AvailableLanguages.en,
      AvailableLanguages.es,
      AvailableLanguages.it,
    ], // Supported languages
    debug: true,
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    ns: ['home', 'navbar', 'about'], // Define your namespaces
    defaultNS: 'home', // Set a default namespace
    resources: {
      en: {
        home: enHome,
        about: enAbout,
        navbar: enNavbar,
      },
      es: {
        home: esHome,
        about: esAbout,
        navbar: esNavbar,
      },
      it: {
        home: itHome,
        about: itAbout,
        navbar: itNavbar,
      },
    },
  });

export default i18n;
