// ============================================================================
// cdnIcon.js — гибридная загрузка иконок: материалы — из проекта (нужны
// локально для OCR-пайплайна digit-matching.ts/template-matching.ts, которые
// матчат иконки в скриншотах инвентаря против ЭТИХ ЖЕ файлов — CDN тут не
// подходит в принципе, сравнение идёт с конкретными байтами конкретного
// файла). Остальной игровой контент, который только ПОКАЗЫВАЕТСЯ пользователю
// и никогда не участвует в OCR-сравнении (аватары, созвездия, таланты,
// существа, рыбы, артефакты) — с CDN, чтобы не раздувать бандл/установку
// сотнями PNG, которые не нужны для функциональности приложения.
//
// CDN: https://enka.network/ui/{IconName}.png — тот же паттерн, что УЖЕ
// используется в проекте для артефактов в EnkaBuildDetail.jsx (там IconName
// приходит прямо в ответе Enka API на конкретный профиль). Для статических
// данных проекта (страницы персонажей/оружия вне контекста чьего-то
// профиля) такого имени в ответе API взяться неоткуда — его нужно один раз
// сопоставить с существующими enkaId (см. scripts/fetch-enka-icon-map.js) и
// сохранить в src/data/cdn/*.generated.json.
//
// ВАЖНО, ПОЧЕМУ FALLBACK, А НЕ ЖЁСТКИЙ ПЕРЕХОД: у меня (Claude, в песочнице
// без доступа к enka.network) нет возможности прямо сейчас сходить и
// проверить/заполнить реальные Enka-имена иконок для всех персонажей/
// оружия/артефактов — это должно быть сделано отдельным шагом (см. README
// в scripts/fetch-enka-icon-map.js) на машине с доступом в интернет. Чтобы
// не сломать существующие локальные иконки прямо сейчас волевым решением
// "просто переключить на CDN", резолвер:
//   1. Смотрит на *.generated.json (если сгенерирован — есть маппинг)
//   2. Если для конкретного id маппинга нет — использует локальный путь
//      как и раньше (item.avatar/item.icon и т.д.), приложение не ломается.
// Как только src/data/cdn/*.generated.json будет реально сгенерирован
// (Sergey запускает скрипт у себя) — иконки конкретных персонажей начнут
// подтягиваться с CDN САМИ, без дополнительных правок кода здесь.
// ============================================================================

const CDN_BASE = 'https://enka.network/ui/';

/**
 * @param {string} localPath — относительный путь как хранится в данных
 *   проекта (например "assets/avatar/ayato.png")
 * @returns {string} — абсолютный путь от корня ("/assets/avatar/ayato.png")
 */
export function localIconUrl(localPath) {
  if (!localPath) return null;
  return localPath.startsWith('/') ? localPath : `/${localPath}`;
}

/**
 * @param {string} enkaIconName — например "UI_AvatarIcon_Ayato"
 */
export function cdnIconUrl(enkaIconName) {
  if (!enkaIconName) return null;
  return `${CDN_BASE}${enkaIconName}.png`;
}

/**
 * Главная функция резолвинга — используй её вместо ручного `/${item.icon}`
 * везде, где иконка НЕ участвует в OCR-сравнении (т.е. везде, КРОМЕ
 * DraggableMaterialCard.jsx и самого OCR-пайплайна).
 *
 * @param {{ enkaIconMap?: Record<string, string> }} params
 * @param {string} id — id сущности в данных проекта (character.id, weapon.id, artifact.id...)
 * @param {string} localFallback — item.avatar / item.icon и т.п. — используется,
 *   пока в enkaIconMap нет записи для этого id (см. комментарий модуля выше)
 */
export function resolveIconUrl({ enkaIconMap }, id, localFallback) {
  const enkaName = enkaIconMap?.[id];
  return enkaName ? cdnIconUrl(enkaName) : localIconUrl(localFallback);
}
