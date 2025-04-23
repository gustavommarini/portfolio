import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enHome from './locales/en/home.json';
import esHome from './locales/es/home.json';

i18n.use(initReactI18next).init({
  lng: 'es',
  resources: {
    en: {
      home: enHome,
    },
    es: {
      home: esHome,
    },
  },
  fallbackLng: 'es',
  debug: false,
});

export default i18n;
