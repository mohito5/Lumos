// ============================================================================
// materials-catalog.mjs — сверка материалов, нужных персонажу (из
// genshin-db), с уже существующим каталогом src/data/materials/**, и
// добавление недостающих записей туда же + в data-locales/materials/**.
//
// ВАЖНО про иконки новых материалов: материалы в этом проекте — единственная
// категория, где иконка обязана быть локальным файлом (используется в
// OCR-пайплайне, см. src/data/cdn/README.md) — а не CDN-ссылкой. Скачать
// реальную картинку скрипт не может (сеть песочницы, в которой это
// писалось, не пропускает домены с картинками — только реестры пакетов).
// Поэтому у ВСЕХ новых материалов, добавленных этим скриптом, иконка —
// плейсхолдер (тот же приём уже используется в проекте: gems.js/common.js
// ссылаются на assets/tmp256*.png для ещё не отрисованных материалов) — и
// скрипт в конце печатает список того, что нужно дорисовать/скачать руками.
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MATERIAL_GROUP, MATERIAL_TYPE, RARITY, VISION } from '../../src/shared/config/constants.js';
import { materialsData } from '../../src/data/materials/index.js';
import { slugify, bookFamilySlug } from './project-schema-map.mjs';
import { printValue, codeRef } from './js-print.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const MAT_DIR = path.join(ROOT, 'src/data/materials');
const LOC_DIR = path.join(ROOT, 'src/data-locales/materials');

const PLACEHOLDER_ICON = 'assets/tmp256.png'; // тот же плейсхолдер, что уже используется в gems.js/common.js

// sid — короткий id для компакт-формата сохранений (см. type.d.ts) — ОБЯЗАН
// быть уникальным: коллизия на пустой строке однажды уже проявилась как
// падение тестов (несколько материалов "делили" один пустой sid, из-за чего
// инвентарные счётчики в компакт-формате перезаписывали друг друга). Схема
// нумерации в проекте — 'm' + порядковый номер; продолжаем с максимума среди
// уже присвоенных.
let nextSidNumber = 1 + Math.max(
    0,
    ...materialsData.map((m) => (/^m(\d+)$/.test(m.sid || '') ? Number(m.sid.slice(1)) : 0))
);
function nextSid() {
    return `m${nextSidNumber++}`;
}

const FOLDER_KIND_CONFIG = {
    gem: { folder: 'gems', prefix: 'gems', locFile: 'gems.json', dimension: 'element' },
    local_specialty: { folder: 'local-specialty', prefix: 'localSpecialty', locFile: 'common.json', dimension: 'region' },
    talent_book: { folder: 'books', prefix: 'books', locFile: 'books.json', dimension: 'region' },
    boss_material: { folder: 'boss-drops', prefix: 'bossDrops', locFile: 'boss-drops.json', dimension: 'region' },
    weekly_boss_material: { folder: 'boss-drops', prefix: 'bossDrops', locFile: 'boss-drops.json', dimension: 'region' },
    common_enemy_drop: { folder: 'enemy-drops', prefix: 'enemyDrops', locFile: 'common-enemies.json', dimension: 'region' },
};
// weapon_ascension_material сюда не входит — Сергей просил по папкам только
// материалы возвышения/талантов ПЕРСОНАЖЕЙ, оружейный camень остаётся
// плоским weapon-ascension.js как был (60 существующих записей, менять не
// просили).
const FLAT_KIND_TARGET = {
    weapon_ascension_material: { file: 'weapon-ascension.js', arrayName: 'weaponAscension', locFile: 'weapon-ascension.json' },
};

// dimension: 'region' -> подпапка = 'other', пока вызывающий код (см.
// project-schema-map.mjs: guessRegionFor*) не передаст конкретный регион
// через info.region. Если так и не передан — кладём в other.js, а не
// пытаемся угадывать (лучше явный "не знаю", чем тихая ошибка).
function resolveSubfileKey(kind, info) {
    const cfg = FOLDER_KIND_CONFIG[kind];
    if (cfg.dimension === 'element') return (info.element || 'unknown').toLowerCase();
    if (cfg.dimension === 'region') {
        // common_enemy_drop — единственный случай, где "регион не определён"
        // означает "общий, встречается везде" (common.js), а не "не знаю,
        // разберитесь сами" (other.js) — так и просил Сергей: "common.js
        // сохранять, если в нескольких регионах". Для местных
        // диковинок/книг/боссовых материалов регион всегда РОВНО один,
        // поэтому там неопределённость — честно other.js, а не common.
        if (kind === 'common_enemy_drop') return info.region || 'common';
        return info.region || 'other';
    }
    return 'other';
}
// live-каталог: то, что уже было в файлах на момент старта, ПЛЮС всё, что
// этот прогон уже добавил сам (чтобы не задублировать материал, если он
// нужен нескольким персонажам за один запуск).
const byName = new Map(materialsData.map((m) => [normName(m.__enName || ''), m]));
const byId = new Map(materialsData.map((m) => [m.id, m]));
const newlyAdded = []; // { kind, id, name_en, name_ru, rarity } — для финального отчёта
const newlyAddedConstants = []; // { key, tag } — новые MATERIAL_GROUP.*, добавленные в constants.js этим прогоном

const CONSTANTS_PATH = path.join(ROOT, 'src/shared/config/constants.js');

// Живое зеркало MATERIAL_GROUP: начинается с того, что реально в файле на
// старте (у Сергея там уже ~40 constant'ов, зарегистрированных заранее,
// раньше самих данных) + всё, что этот прогон сам добавляет — иначе
// повторный поиск в течение одного запуска не увидел бы то, что было
// добавлено чуть раньше в этом же прогоне.
const materialGroupCache = new Map(Object.entries(MATERIAL_GROUP));

/** BOOKS_OF_FREEDOM -> BOOKS_FREEDOM (так исторически называют константы
 *  книг талантов в этом проекте, "OF" выкидывается) — для остальных тегов
 *  просто UPPER_SNAKE_CASE как есть. */
function constantKeyFromTag(tag) {
    return tag.toUpperCase().replace(/^BOOKS_OF_/, 'BOOKS_');
}

/**
 * Ищет tag среди уже известных значений MATERIAL_GROUP (включая то, что этот
 * же прогон уже добавил) — если нашёл, возвращает имя константы. Если нет —
 * ДОБАВЛЯЕТ новую константу в src/shared/config/constants.js (не только в
 * памяти) и возвращает её имя. Раньше вместо этого просто писали сырую
 * строку в group[] — Сергею приходилось руками дополнять constants.js после
 * каждого прогона, что и является причиной этой правки.
 */
function ensureMaterialGroupConst(tag) {
    for (const [key, value] of materialGroupCache) {
        if (value === tag) return key;
    }
    const key = constantKeyFromTag(tag);
    if (materialGroupCache.has(key)) {
        // Имя константы занято под ДРУГОЕ значение — маловероятно, но на
        // всякий случай не перезаписываем чужое, различаем суффиксом.
        let n = 2;
        while (materialGroupCache.has(`${key}_${n}`)) n++;
        return ensureMaterialGroupConstRaw(`${key}_${n}`, tag);
    }
    return ensureMaterialGroupConstRaw(key, tag);
}

function ensureMaterialGroupConstRaw(key, tag) {
    materialGroupCache.set(key, tag);
    if (!DRY_RUN) {
        let content = fs.readFileSync(CONSTANTS_PATH, 'utf8');
        const startMatch = content.match(/export const MATERIAL_GROUP\s*=\s*\{/);
        if (!startMatch) throw new Error('не нашёл "export const MATERIAL_GROUP = {" в constants.js');
        const braceStart = startMatch.index + startMatch[0].length - 1;
        let depth = 0;
        let i = braceStart;
        for (; i < content.length; i++) {
            if (content[i] === '{') depth++;
            else if (content[i] === '}') { depth--; if (depth === 0) break; }
        }
        const braceEnd = i;
        const body = content.slice(braceStart + 1, braceEnd);
        const trimmedBody = body.replace(/,?\s*$/, '');
        const isEmpty = trimmedBody.trim() === '';
        const newBody = `${trimmedBody}${isEmpty ? '' : ','}\n  ${key}: '${tag}',\n`;
        content = content.slice(0, braceStart + 1) + newBody + content.slice(braceEnd);
        fs.writeFileSync(CONSTANTS_PATH, content);
    }
    newlyAddedConstants.push({ key, tag });
    return key;
}

export function getNewlyAddedConstantsReport() {
    return newlyAddedConstants;
}

function normName(s) {
    return String(s).trim().toLowerCase();
}

/**
 * Материалы в каталоге не хранят своё английское имя (только локализация в
 * data-locales), поэтому для матчинга по имени параллельно читаем
 * data-locales/materials/en/*.json и строим id -> englishName один раз.
 */
function loadEnglishNames() {
    const enDir = path.join(LOC_DIR, 'en');
    const map = new Map();
    for (const file of fs.readdirSync(enDir)) {
        if (!file.endsWith('.json') || file === 'groups.json') continue;
        const data = JSON.parse(fs.readFileSync(path.join(enDir, file), 'utf8'));
        for (const [id, entry] of Object.entries(data)) {
            if (entry && typeof entry === 'object' && entry.name) map.set(id, entry.name);
        }
    }
    return map;
}
const englishNames = loadEnglishNames();
for (const m of materialsData) {
    const en = englishNames.get(m.id);
    if (en) byName.set(normName(en), m);
}

/** Ищет уже существующий материал по точному (без учёта регистра) английскому имени. */
export function findExistingByName(exactEnglishName) {
    return byName.get(normName(exactEnglishName)) || null;
}

/** Ищет материал по семье (значение в group[]) и редкости — то же самое, что
 *  findMaterialId() в shared/lib/materialsCalculator.js, нужно скрипту для
 *  проверки "не хватает ли какого-то тира внутри уже известной семьи". */
export function findByFamilyAndRarity(familyTag, rarity) {
    for (const m of materialsData) {
        if (m.group?.includes(familyTag) && m.rarity === rarity) return m;
    }
    for (const m of newlyAdded) {
        if (m.group?.includes(familyTag) && m.rarity === rarity) return m;
    }
    return null;
}

let DRY_RUN = false;
/** Вызывается один раз из вызывающего скрипта, если он запущен с --dry-run —
 *  без этого ensureMaterial() всё равно писал файлы на диск даже в "сухом"
 *  прогоне (поймано на реальном использовании: --dry-run для нового
 *  персонажа должен был ничего не менять, а материалы для него всё равно
 *  дописывались в каталог). matchа/newlyAdded по-прежнему обновляются в
 *  памяти — отчёт "что было бы добавлено" в консоли остаётся честным. */
export function setDryRun(value) {
    DRY_RUN = value;
}

function appendObjectToArrayFile(fileName, arrayName, objSource) {
    if (DRY_RUN) return;
    const filePath = path.join(MAT_DIR, fileName);
    let content = fs.readFileSync(filePath, 'utf8');
    const closeMatch = content.match(/\]\s*;?\s*$/);
    if (!closeMatch) {
        throw new Error(`${fileName}: не нашёл закрывающее "]" в конце файла — формат файла не тот, что ожидался, ручная проверка`);
    }
    const beforeClose = content.slice(0, closeMatch.index);
    // На случай, если в файле уже был висячий разделитель "},\n" перед "]" —
    // срезаем его и добавляем ровно один свой, чтобы не задвоить запятую
    // (что превращает элемент массива в "дыру": [a,,b] — реальный баг,
    // словленный на этом самом скрипте при разработке).
    const trimmedBefore = beforeClose.replace(/,\s*$/, '');
    const isEmpty = /\[\s*$/.test(trimmedBefore);
    const indented = objSource.split('\n').map((l) => (l ? '    ' + l : l)).join('\n');
    content = `${trimmedBefore}${isEmpty ? '' : ','}\n${indented}\n];\n`;
    fs.writeFileSync(filePath, content);
}

/**
 * То же самое, что appendObjectToArrayFile, но для новой структуры "папка с
 * файлами по региону/элементу" (local-specialty/, books/, gems/,
 * boss-drops/, enemy-drops/) — если нужного файла региона/элемента ещё нет
 * (напр. первый материал из Натлана), создаёт его и дописывает импорт в
 * index.js папки. Если файл уже есть — досыпает в конец как
 * appendObjectToArrayFile.
 */
function appendToFolderStructure(folder, prefix, subfileKey, objSource) {
    if (DRY_RUN) return;
    const folderPath = path.join(MAT_DIR, folder);
    fs.mkdirSync(folderPath, { recursive: true });
    const subfilePath = path.join(folderPath, `${subfileKey}.js`);
    const varName = `${prefix}${subfileKey[0].toUpperCase()}${subfileKey.slice(1).replace(/[-_](\w)/g, (_, c) => c.toUpperCase())}`;

    if (!fs.existsSync(subfilePath)) {
        const header = `import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, REGION } from "../../../shared/config/constants.js";\n\nexport const ${varName} = [\n];\n`;
        fs.writeFileSync(subfilePath, header);

        const indexPath = path.join(folderPath, 'index.js');
        let indexContent = fs.readFileSync(indexPath, 'utf8');
        const importLine = `import { ${varName} } from './${subfileKey}.js';\n`;
        if (!indexContent.includes(importLine)) {
            indexContent = importLine + indexContent;
            indexContent = indexContent.replace(/(\.\.\.\w+,?\n)(\];)/, `$1    ...${varName},\n$2`);
            fs.writeFileSync(indexPath, indexContent);
        }
    }
    appendObjectToArrayFile(`${folder}/${subfileKey}.js`, varName, objSource);
}

function appendLocaleEntry(locFile, id, nameEn, nameRu) {
    if (DRY_RUN) return;
    for (const [lang, name] of [['en', nameEn], ['ru', nameRu]]) {
        const filePath = path.join(LOC_DIR, lang, locFile);
        const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : {};
        if (!data[id]) {
            data[id] = { name };
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n');
        }
    }
}

/**
 * Регистрирует материал в каталоге, если его там ещё нет (по точному
 * английскому имени). Возвращает { id, isNew }.
 *
 * @param {'gem'|'local_specialty'|'common_enemy_drop'|'boss_material'|'weekly_boss_material'|'talent_book'} kind
 * @param {{ nameEn: string, nameRu: string, rarity: number, familyTag: string, element?: string, isNewFamily?: boolean }} info
 */
export function ensureMaterial(kind, info) {
    const existing = findExistingByName(info.nameEn);
    if (existing) return { id: existing.id, isNew: false };

    const target = FLAT_KIND_TARGET[kind];
    const folderCfg = FOLDER_KIND_CONFIG[kind];
    if (!target && !folderCfg) throw new Error(`Неизвестный kind материала: ${kind}`);

    const id = slugify(info.nameEn);
    if (byId.has(id)) {
        const existingName = englishNames.get(id) || byId.get(id).__enName;
        if (existingName && normName(existingName) !== normName(info.nameEn)) {
            // редкий кейс: два РАЗНЫХ по имени материала дали одинаковый slug —
            // различаем численным суффиксом (не пробелом: slugify() всё равно
            // схлопывает лишние пробелы, из-за чего суффикс-пробел не менял id
            // и уходил в бесконечную рекурсию — поймано на реальном прогоне).
            let n = 2;
            while (byId.has(`${id}_${n}`)) n++;
            return ensureMaterial(kind, { ...info, __forceId: `${id}_${n}` });
        }
        return { id, isNew: false };
    }
    const finalId = info.__forceId || id;

    const genericGroupConst = {
        gem: 'MATERIAL_GROUP.ASCENSION_GEMS',
        local_specialty: 'MATERIAL_GROUP.LOCAL_SPECIALTIES',
        common_enemy_drop: 'MATERIAL_GROUP.COMMON_ENEMY_DROPS',
        boss_material: 'MATERIAL_GROUP.NORMAL_BOSS_DROPS',
        weekly_boss_material: 'MATERIAL_GROUP.WEEKLY_BOSS_DROPS',
        talent_book: 'MATERIAL_GROUP.TALENT_BOOKS',
        weapon_ascension_material: 'MATERIAL_GROUP.WEAPON_ASCENSION_MATERIALS',
    }[kind];

    const typeConst = {
        gem: 'MATERIAL_TYPE.CHARACTER_ASCENTION',
        local_specialty: 'MATERIAL_TYPE.LOCAL_SPECIALTY',
        common_enemy_drop: 'MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT',
        boss_material: 'MATERIAL_TYPE.CHARACTER_ASCENTION',
        weekly_boss_material: 'MATERIAL_TYPE.CHARACTER_TALENT',
        talent_book: 'MATERIAL_TYPE.CHARACTER_TALENT',
        // сверено с реальными записями weapon-ascension.js — там именно
        // WEAPON_ENHANCEMENT_MATERIALS, не CHARACTER_ASCENTION (моя более
        // ранняя догадка была неверна — файл содержал 60 готовых записей,
        // на которых это не проявлялось, пока не понадобился НОВЫЙ материал)
        weapon_ascension_material: 'MATERIAL_TYPE.WEAPON_ENHANCEMENT_MATERIALS',
    }[kind];

    // familyTag приходит как сырой slug (напр. 'sea_ganoderma') — ищем/
    // регистрируем для него константу MATERIAL_GROUP.* (не просто строку,
    // см. ensureMaterialGroupConst выше — раньше тут была сырая строка,
    // из-за чего Сергею приходилось дописывать constants.js руками).
    const familyKey = ensureMaterialGroupConst(info.familyTag);
    const familyValue = codeRef(`MATERIAL_GROUP.${familyKey}`);

    const obj = {
        id: finalId,
        sid: nextSid(),
        icon: PLACEHOLDER_ICON,
        type: codeRef(typeConst),
        // weapon-ascension.js — единственный файл, где group — ОДНО значение,
        // не [общее, конкретное] как везде (сверено на 60 существующих
        // записях: group: MATERIAL_GROUP.DANDELION_GLADIATOR, без массива).
        group: kind === 'weapon_ascension_material' ? familyValue : [codeRef(genericGroupConst), familyValue],
        rarity: codeRef(`RARITY.${Object.entries(RARITY).find(([, v]) => v === info.rarity)?.[0] ?? 'COMMON'}`),
    };
    if (info.element) {
        obj.element = codeRef(`VISION.${info.element}`);
    }

    const objSource = printValue(obj, 0);
    const locFile = target ? target.locFile : folderCfg.locFile;
    if (target) {
        appendObjectToArrayFile(target.file, target.arrayName, objSource);
    } else {
        const subfileKey = resolveSubfileKey(kind, info);
        appendToFolderStructure(folderCfg.folder, folderCfg.prefix, subfileKey, objSource);
        if (subfileKey === 'other') {
            console.warn(`  ⚠ "${info.nameEn}" -> data/materials/${folderCfg.folder}/other.js (регион не определён — переложите вручную, если знаете какой)`);
        }
    }
    appendLocaleEntry(locFile, finalId, info.nameEn, info.nameRu);

    const record = { id: finalId, group: [genericGroupConst.split('.')[1], info.familyTag], rarity: info.rarity, __enName: info.nameEn };
    newlyAdded.push({ kind, id: finalId, nameEn: info.nameEn, nameRu: info.nameRu, rarity: info.rarity });
    byName.set(normName(info.nameEn), record);
    byId.set(finalId, record);

    return { id: finalId, isNew: true };
}

export function getNewlyAddedReport() {
    return newlyAdded;
}
