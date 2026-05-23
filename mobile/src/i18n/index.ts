import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import ka from './locales/ka.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    ka: { translation: ka },
    en: { translation: en },
  },
  lng: Localization.locale?.startsWith('ka') ? 'ka' : 'ka',
  fallbackLng: 'ka',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
