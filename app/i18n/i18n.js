// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import en from './en.json';
// import de from './de.json';

// i18n.use(initReactI18next).init({
//   compatibilityJSON: 'v3',
//   lng: 'en',
//   fallbackLng: 'en',
//   resources: {
//     en: { translation: en },
//     de: { translation: de },
//   },
// });

// export default i18n;


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import de from './de.json';

const LANGUAGE_KEY = 'APP_LANGUAGE';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    callback(savedLang || 'en');
  },
  init: () => {},
  cacheUserLanguage: async lang => {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
  });

export default i18n;
