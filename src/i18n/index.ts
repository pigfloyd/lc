import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCommon from './locales/zh/common.json';
import zhUnits from './locales/zh/units.json';
import jaCommon from './locales/ja/common.json';
import jaUnits from './locales/ja/units.json';

const savedLang = localStorage.getItem('lang') || 'zh';

i18n.use(initReactI18next).init({
  resources: {
    zh: { common: zhCommon, units: zhUnits },
    ja: { common: jaCommon, units: jaUnits },
  },
  lng: savedLang,
  fallbackLng: 'zh',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng);
});

export default i18n;
