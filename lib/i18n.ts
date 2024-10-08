import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../public/locales/en/common.json'; // Cargar archivos manualmente
import es from '../public/locales/es/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      es: { common: es },
    },
    lng: 'es', // Idioma predeterminado
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
