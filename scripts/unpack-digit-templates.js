#!/usr/bin/env node
// ============================================================================
// unpack-digit-templates.js — раскладывает JSON-экспорт из
// DigitCalibrationPage (#/dev/digit-calibration) в файлы шаблонов:
//   public/assets/digits/<символ>/1.png, 2.png, ...
//
// Использование:
//   node scripts/unpack-digit-templates.js digit-templates-export.json
//
// "." называется папкой "dot" (само "." как имя папки — это текущая
// директория, а не литеральная точка, поэтому нужен безопасный алиас).
//
// ES-модуль (import, не require) — потому что package.json содержит
// "type": "module", из-за чего Node трактует ВСЕ .js файлы проекта как
// ES-модули, где require() не определён.
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAFE_NAMES = { '.': 'dot' };

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Использование: node scripts/unpack-digit-templates.js <export.json>');
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, 'utf-8');
const data = JSON.parse(raw);
const templates = data.templates || {};

const outDir = path.join(__dirname, '..', 'public', 'assets', 'digits');
fs.mkdirSync(outDir, { recursive: true });

let totalFiles = 0;
const manifest = {};

// Подхватываем уже существующий манифест (если докидываем образцы поверх
// предыдущей калибровки), чтобы не потерять count для символов, которые
// в ЭТОМ экспорте не участвовали.
const manifestPath = path.join(outDir, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  Object.assign(manifest, JSON.parse(fs.readFileSync(manifestPath, 'utf-8')));
}

for (const [char, dataUrls] of Object.entries(templates)) {
  const folderName = SAFE_NAMES[char] || char;
  const charDir = path.join(outDir, folderName);
  fs.mkdirSync(charDir, { recursive: true });

  // Не перезаписываем существующие файлы молча — нумеруем с продолжением,
  // чтобы можно было докидывать образцы из разных сессий калибровки.
  const existing = fs.readdirSync(charDir).filter(f => f.endsWith('.png'));
  let nextIndex = existing.length + 1;

  dataUrls.forEach((dataUrl) => {
    const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    const filePath = path.join(charDir, `${nextIndex}.png`);
    fs.writeFileSync(filePath, buffer);
    nextIndex++;
    totalFiles++;
  });

  manifest[char] = nextIndex - 1;
  console.log(`  ${char} → ${dataUrls.length} файлов в public/assets/digits/${folderName}/ (всего теперь ${manifest[char]})`);
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nManifest обновлён: ${manifestPath}`);
console.log(`Готово: ${totalFiles} новых файлов в ${outDir}`);
console.log('Не забудь закоммитить public/assets/digits/ в репозиторий.');
