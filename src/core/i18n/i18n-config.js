
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// UI Translations
import uiRu from './ui.ru.json';
import uiEn from './ui.en.json';

// Data Translations
import charsRu from '../../i18n/characters/character.ru';
import charsEn from '../../i18n/characters/character.en';

import weaponsRu from '../../i18n/weapons/weapons.ru.js';
import weaponsEn from '../../i18n/weapons/weapons.en.js';

import creaturesRu from '../../i18n/creatures/ru';
import creaturesEn from '../../i18n/creatures/en';
import fishingRu from '../../i18n/fishing/ru/translation.json';
import fishingEn from '../../i18n/fishing/en/translation.json';
import materialsRu from '../../i18n/materials/ru';
import materialsEn from '../../i18n/materials/en';
import commonRu from './common.ru.json';
import commonEn from './common.en.json';
import notificationsRu from './notifications.ru.json';
import notificationsEn from './notifications.en.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        ui: uiEn,
        characters: charsEn,
        weapons: weaponsEn,
        creatures: creaturesEn,
        fishing: fishingEn,
        materials: materialsEn,
        common: commonEn,
        notifications: notificationsEn
      },
      ru: {
        ui: uiRu,
        characters: charsRu,
        weapons: weaponsRu,
        creatures: creaturesRu,
        fishing: fishingRu,
        materials: materialsRu,
        common: commonRu,
        notifications: notificationsRu
      }
    },
    lng: "ru", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: false,
    ns: ['ui', 'characters', 'weapons', 'creatures', 'fishing', 'materials', 'common', 'notifications'],
    defaultNS: 'ui',

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    react: {
      useSuspense: false
    },
    fallbackValue: false, // Prevents i18next from rendering the key as a fallback
    // returnEmptyString: false, // It might be useful to return an empty string instead of the key
  });

  // Синхронизируем текущий язык в window для использования вне React
  window.__i18n_lang__ = i18n.language;
  i18n.on('languageChanged', (lng) => {
    window.__i18n_lang__ = lng;
  });

  export default i18n;
