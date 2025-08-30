import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { AvailableLanguages } from './i18n.types';

i18n
  .use(HttpBackend) // Load translations from external JSON files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Connect with React
  .init({
    fallbackLng: AvailableLanguages.en, // Default language
    supportedLngs: [
      AvailableLanguages.en,
      AvailableLanguages.es,
      AvailableLanguages.it,
    ],
    debug: false,
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // URL path to load translations
    },
    ns: [
      'home',
      'navbar',
      'about',
      'education',
      'experience',
      'contact',
      'cookie-consent',
    ],
    defaultNS: 'home',
  });

export default i18n;
