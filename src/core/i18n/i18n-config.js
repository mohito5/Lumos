
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// UI Translations — маленькие (~32КБ на оба языка вместе), нужны для
// шапки/навигации/кнопок на КАЖДОЙ странице с первого кадра — держим eager.
import uiRu from './ui.ru.json';
import uiEn from './ui.en.json';
import commonRu from './common.ru.json';
import commonEn from './common.en.json';
import notificationsRu from './notifications.ru.json';
import notificationsEn from './notifications.en.json';

// РАНЬШЕ: characters/weapons/creatures/fishing/materials (~300КБ JSON на
// оба языка суммарно — см. Performance-раздел аудита) импортировались так
// же синхронно, как ui/common/notifications выше, и попадали ПРЯМО в
// главный бандл — значит парсились и исполнялись ДО того, как приложение
// вообще могло начать что-либо рендерить, независимо от того, дойдёт ли
// пользователь в этой сессии хоть раз до страницы персонажей/оружия.
//
// ТЕПЕРЬ: эти 5 неймспейсов грузятся динамическим import() — Rollup/Vite
// автоматически выносит их в отдельные чанки (см. dist/assets/*.js после
// сборки), которые запрашиваются по сети ПАРАЛЛЕЛЬНО с остальной загрузкой,
// а не сериализуются в одну строку разбора основного бандла. Запускаем это
// сразу же (не дожидаясь конкретной страницы) — see loadContentNamespaces()
// ниже и её использование в useAppStore.ts initialize(): экран загрузки
// приложения и так уже ждёт initSync(), так что ждать заодно и эти чанки
// не даёт новой задержки поверх того, что уже было, но перестаёт держать
// их внутри самого тяжёлого для разбора JS-файла.
const CONTENT_NAMESPACES = ['characters', 'weapons', 'creatures', 'fishing', 'materials'];

const CONTENT_LOADERS = {
  en: {
    characters: () => import('../../data-locales/characters/character.en.js'),
    weapons: () => import('../../data-locales/weapons/weapons.en.js'),
    creatures: () => import('../../data-locales/creatures/en/index.js'),
    fishing: () => import('../../data-locales/fishing/en/translation.json'),
    materials: () => import('../../data-locales/materials/en/index.js'),
  },
  ru: {
    characters: () => import('../../data-locales/characters/character.ru.js'),
    weapons: () => import('../../data-locales/weapons/weapons.ru.js'),
    creatures: () => import('../../data-locales/creatures/ru/index.js'),
    fishing: () => import('../../data-locales/fishing/ru/translation.json'),
    materials: () => import('../../data-locales/materials/ru/index.js'),
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { ui: uiEn, common: commonEn, notifications: notificationsEn },
      ru: { ui: uiRu, common: commonRu, notifications: notificationsRu },
    },
    lng: "ru", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: false,
    // Полный список ВСЕХ неймспейсов (включая те, что загрузятся позже
    // асинхронно) — useTranslation('characters') и т.п. по коду продолжают
    // работать как раньше, просто до resolve loadContentNamespaces() данные
    // для них ещё не заполнены.
    ns: ['ui', 'common', 'notifications', ...CONTENT_NAMESPACES],
    defaultNS: 'ui',

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    react: {
      useSuspense: false
    },
    fallbackValue: false, // Prevents i18next from rendering the key as a fallback
    // returnEmptyString: false, // It might be useful to return an useful string instead of the key
  });

  // Синхронизируем текущий язык в window для использования вне React
  window.__i18n_lang__ = i18n.language;
  i18n.on('languageChanged', (lng) => {
    window.__i18n_lang__ = lng;
  });

// Запускается СРАЗУ при загрузке модуля (не ждёт вызова initialize() в
// useAppStore) — чем раньше стартуют сетевые запросы за чанками, тем
// вероятнее, что к моменту, когда useAppStore.initialize() дойдёт до их
// ожидания, они уже частично или полностью загружены параллельно с
// initSync() (чтением из Telegram CloudStorage/localStorage).
const contentNamespacesPromise = (async () => {
  const lang = 'ru'; // текущий lng всегда 'ru' на старте (см. i18n.init выше)
  const otherLang = 'en';

  const entries = await Promise.all(
    CONTENT_NAMESPACES.flatMap((ns) => [
      CONTENT_LOADERS[lang][ns]().then((mod) => [lang, ns, mod.default]),
      CONTENT_LOADERS[otherLang][ns]().then((mod) => [otherLang, ns, mod.default]),
    ]),
  );

  for (const [lng, ns, data] of entries) {
    i18n.addResourceBundle(lng, ns, data, true, true);
  }
})().catch((err) => {
  // Не должно ронять приложение целиком, даже если один из data-locale
  // чанков не подгрузился (например офлайн на подключении) — приложение
  // остаётся рабочим, просто часть текста на страницах персонажей/оружия
  // будет отображаться как ключ до перезагрузки/повторной попытки.
  console.error('[i18n] не удалось загрузить content-неймспейсы:', err);
});

/**
 * Промис, который резолвится, когда все content-неймспейсы (characters/
 * weapons/creatures/fishing/materials) загружены и зарегистрированы в
 * i18next для ОБОИХ языков. См. использование в useAppStore.ts — экран
 * загрузки приложения ждёт этот промис наравне с initSync(), так что
 * переключение языка на лету (см. useTheme.js / LanguageSwitcher) не может
 * попасть в состояние "часть текста ещё не переведена".
 */
export const waitForContentNamespaces = () => contentNamespacesPromise;

  export default i18n;
