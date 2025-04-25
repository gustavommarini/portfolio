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
import enEducation from './locales/en/education.json';
import esEducation from './locales/es/education.json';
import itEducation from './locales/it/education.json';
import enExperience from './locales/en/experience.json';
import esExperience from './locales/es/experience.json';
import itExperience from './locales/it/experience.json';
import enContact from './locales/en/contact.json';
import esContact from './locales/es/contact.json';
import itContact from './locales/it/contact.json';
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
    ns: ['home', 'navbar', 'about', 'education', 'experience', 'contact'], // Define your namespaces
    defaultNS: 'home', // Set a default namespace
    resources: {
      en: {
        home: enHome,
        about: enAbout,
        navbar: enNavbar,
        education: enEducation,
        experience: enExperience,
        contact: enContact,
      },
      es: {
        home: esHome,
        about: esAbout,
        navbar: esNavbar,
        education: esEducation,
        experience: esExperience,
        contact: esContact,
      },
      it: {
        home: itHome,
        about: itAbout,
        navbar: itNavbar,
        education: itEducation,
        experience: itExperience,
        contact: itContact,
      },
    },
  });

export default i18n;
