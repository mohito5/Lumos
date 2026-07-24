#!/usr/bin/env node
// ============================================================================
// check-digit-templates.js — проверяет, что public/assets/digits/manifest.json
// существует, не пуст и содержит все 10 цифр (0-9) хотя бы с одним реальным
// PNG-файлом на символ.
//
// ЗАЧЕМ: без этого манифеста loadDigitTemplates() (digit-matching.ts) тихо
// возвращает {} и распознавание количества материалов молча не работает —
// пользователь узнаёт об этом только в рантайме (ocrLog.warn, видно лишь с
// OCR_DEBUG=true). Этот скрипт делает то же самое отсутствие заметным уже на
// этапе сборки/CI, а не только через уведомление внутри приложения.
//
// Подключён как первый шаг `npm run build` (см. package.json) — если
// манифест отсутствует/неполон, сборка падает с понятным сообщением,
// вместо того чтобы задеплоить рабочее приложение с неработающим OCR.
//
// Использование: node scripts/check-digit-templates.js
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIGITS_DIR = path.join(__dirname, '..', 'public', 'assets', 'digits');
const MANIFEST_PATH = path.join(DIGITS_DIR, 'manifest.json');

// Тот же алиас, что и в unpack-digit-templates.js/digit-matching.ts —
// на диске это не литеральная "." (текущая директория), а папка "dot".
const SAFE_FOLDER_NAMES = { '.': 'dot' };

// Минимально необходимый набор — без ЛЮБОЙ из этих 10 цифр распознавание
// чисел, содержащих её, гарантированно не сработает ни при каких условиях.
const REQUIRED_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function fail(message) {
  console.error(`\n❌ check-digit-templates: ${message}\n`);
  process.exit(1);
}

if (!fs.existsSync(MANIFEST_PATH)) {
  fail(
    `${path.relative(process.cwd(), MANIFEST_PATH)} не найден.\n` +
    `   Шаблоны цифр не откалиброваны — OCR не сможет распознавать количество материалов.\n` +
    `   Собери шаблоны через #/dev/digit-calibration → экспорт JSON →\n` +
    `   node scripts/unpack-digit-templates.js <export.json>`
  );
}

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
} catch (e) {
  fail(`${MANIFEST_PATH} содержит невалидный JSON: ${e.message}`);
}

const chars = Object.keys(manifest);
if (chars.length === 0) {
  fail(`${MANIFEST_PATH} пуст (нет ни одного символа).`);
}

const missing = [];
const emptyFolders = [];

for (const char of REQUIRED_CHARS) {
  const count = manifest[char];
  if (!count || count <= 0) {
    missing.push(char);
    continue;
  }

  const folder = SAFE_FOLDER_NAMES[char] || char;
  const folderPath = path.join(DIGITS_DIR, folder);
  const pngCount = fs.existsSync(folderPath)
    ? fs.readdirSync(folderPath).filter((f) => f.endsWith('.png')).length
    : 0;

  if (pngCount === 0) {
    emptyFolders.push(char);
  }
}

if (missing.length > 0) {
  fail(
    `в manifest.json отсутствуют или обнулены цифры: ${missing.join(', ')}\n` +
    `   Нужны ВСЕ 10 цифр (0-9) — без любой из них распознавание чисел,\n` +
    `   её содержащих, не сработает. Докалибруй недостающие символы через\n` +
    `   #/dev/digit-calibration.`
  );
}

if (emptyFolders.length > 0) {
  fail(
    `manifest.json заявляет образцы для цифр [${emptyFolders.join(', ')}], но реальных .png файлов в их папках нет.\n` +
    `   Манифест разошёлся с содержимым public/assets/digits/ — пересобери через unpack-digit-templates.js.`
  );
}

console.log(`✓ check-digit-templates: манифест на месте, все 10 цифр (0-9) откалиброваны (${chars.length} символ(ов) всего).`);
