#!/usr/bin/env node
// ============================================================================
// fetch-enka-icon-map.js — собирает маппинг enkaId → имя иконки Enka CDN
// (например "UI_AvatarIcon_Ayato") для персонажей/оружия проекта, используя
// уже существующие enkaId в src/data/characters/*.js и src/data/weapons/*.js.
//
// ⚠️ ПРОЧТИ ПЕРЕД ЗАПУСКОМ:
// Этот скрипт писался в песочнице без доступа к enka.network (сетевой
// allowlist там ограничен npm/pypi/github и т.п. пакетными реестрами) —
// поэтому CATALOG_URL ниже НЕ проверен вживую против реального ответа
// сервера. Сама схема (числовой id → IconName) верна и стабильна годами в
// экосистеме Enka, но точный URL/структура ответа МОГЛИ измениться.
// Перед первым запуском:
//   1. Открой CATALOG_URL в браузере, убедись что это JSON вида
//      { "10000066": { "Consts": [...], "SkillOrder": [...],
//                       "Costumes": {...} }, ... } с полем IconName
//      где-то на персонаже (обычно в связанном AvatarExcelConfigData —
//      если формат другой, поправь parseCatalogEntry() ниже).
//   2. Если 404/переехало — актуальный источник обычно можно найти через
//      https://github.com/EnkaNetwork/API-docs (документация их API) или
//      https://gitlab.com/Dimbreath/AnimeGameData (первоисточник, откуда
//      Enka сама берёт эти данные — AvatarExcelConfigData.json).
//
// Запуск: node scripts/fetch-enka-icon-map.js
// (нужен доступ в интернет — недоступно из песочницы, где писался проект)
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// См. предупреждение в шапке файла — не проверено вживую.
const CATALOG_URL = 'https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} при запросе ${url}`);
  return res.json();
}

/** Достаёт из одной записи каталога имя аватар-иконки. Поправь, если формат
 *  реального ответа отличается от ожидаемого (см. предупреждение в шапке). */
function parseCatalogEntry(entry) {
  return entry?.Icon || entry?.SideIconName?.replace('_Side', '') || null;
}

async function loadProjectEntities(globPattern, exportName) {
  // Простое построчное чтение вместо полноценного парсинга модулей —
  // избегаем необходимости транспилировать/импортировать .js с ESM в
  // отдельном контексте ради одного скрипта. Ищем `enkaId: <число>` и
  // ближайший `id: '...'` перед ним в том же объекте.
  const files = fs.readdirSync(path.join(ROOT, 'src/data', globPattern))
    .filter((f) => f.endsWith('.js') && f !== 'index.js');

  const entities = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(ROOT, 'src/data', globPattern, file), 'utf-8');
    const blocks = content.split(/(?=\{\s*\n\s*id:)/); // грубое разбиение по объектам персонажей/оружия
    for (const block of blocks) {
      const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
      const enkaIdMatch = block.match(/enkaId:\s*(\d+)/);
      if (idMatch && enkaIdMatch) {
        entities.push({ id: idMatch[1], enkaId: enkaIdMatch[1] });
      }
    }
  }
  return entities;
}

async function main() {
  console.log('Загружаю каталог Enka:', CATALOG_URL);
  const catalog = await fetchJson(CATALOG_URL);

  const characters = await loadProjectEntities('characters', 'enkaId');
  console.log(`Найдено ${characters.length} персонажей с enkaId в src/data/characters/`);

  const iconMap = {};
  let matched = 0;
  for (const { id, enkaId } of characters) {
    const entry = catalog[enkaId];
    const iconName = entry && parseCatalogEntry(entry);
    if (iconName) {
      iconMap[id] = iconName;
      matched++;
    } else {
      console.warn(`  ⚠ ${id} (enkaId=${enkaId}): не нашёл иконку в каталоге — оставлен локальный fallback`);
    }
  }

  const outPath = path.join(ROOT, 'src/data/cdn/characterIcons.generated.json');
  fs.writeFileSync(outPath, JSON.stringify(iconMap, null, 2) + '\n');
  console.log(`\nГотово: ${matched}/${characters.length} персонажей → ${outPath}`);
  console.log('Незамапленные id продолжат использовать локальные иконки (см. src/core/utils/cdnIcon.js).');
}

main().catch((e) => {
  console.error('\n❌ fetch-enka-icon-map:', e.message);
  console.error('   Проверь CATALOG_URL в шапке скрипта — см. предупреждение там же.');
  process.exit(1);
});
