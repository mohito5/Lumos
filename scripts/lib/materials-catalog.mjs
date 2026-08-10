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

const KIND_TARGET = {
    gem: { file: 'gems.js', arrayName: 'gems', locFile: 'gems.json' },
    local_specialty: { file: 'local-specialty.js', arrayName: 'localSpecialty', locFile: 'common.json' },
    common_enemy_drop: { file: 'enemy-drops.js', arrayName: 'enemyDrops', locFile: 'common-enemies.json' },
    boss_material: { file: 'boss-drops.js', arrayName: 'bossDrops', locFile: 'boss-drops.json' },
    weekly_boss_material: { file: 'boss-drops.js', arrayName: 'bossDrops', locFile: 'boss-drops.json' },
    talent_book: { file: 'books.js', arrayName: 'books', locFile: 'books.json' },
};

// live-каталог: то, что уже было в файлах на момент старта, ПЛЮС всё, что
// этот прогон уже добавил сам (чтобы не задублировать материал, если он
// нужен нескольким персонажам за один запуск).
const byName = new Map(materialsData.map((m) => [normName(m.__enName || ''), m]));
const byId = new Map(materialsData.map((m) => [m.id, m]));
const newlyAdded = []; // { kind, id, name_en, name_ru, rarity } — для финального отчёта

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

function appendObjectToArrayFile(fileName, arrayName, objSource) {
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

function appendLocaleEntry(locFile, id, nameEn, nameRu) {
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

    const target = KIND_TARGET[kind];
    if (!target) throw new Error(`Неизвестный kind материала: ${kind}`);

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
    }[kind];

    const typeConst = {
        gem: 'MATERIAL_TYPE.CHARACTER_ASCENTION',
        local_specialty: 'MATERIAL_TYPE.LOCAL_SPECIALTY',
        common_enemy_drop: 'MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT',
        boss_material: 'MATERIAL_TYPE.CHARACTER_ASCENTION',
        weekly_boss_material: 'MATERIAL_TYPE.CHARACTER_TALENT',
        talent_book: 'MATERIAL_TYPE.CHARACTER_TALENT',
    }[kind];

    // familyTag уже приходит как ГОТОВАЯ строка-значение (MATERIAL_GROUP.XXX
    // либо сырой slug для локал-специалити/босс-материала без отдельной
    // константы) — здесь просто решаем, писать ли его как ссылку на код.
    const familyIsRegisteredConst = Object.values(MATERIAL_GROUP).includes(info.familyTag)
        && Object.entries(MATERIAL_GROUP).some(([, v]) => v === info.familyTag);
    const familyValue = familyIsRegisteredConst
        ? codeRef(`MATERIAL_GROUP.${Object.entries(MATERIAL_GROUP).find(([, v]) => v === info.familyTag)[0]}`)
        : info.familyTag;

    const obj = {
        id: finalId,
        sid: nextSid(),
        icon: PLACEHOLDER_ICON,
        type: codeRef(typeConst),
        group: [codeRef(genericGroupConst), familyValue],
        rarity: codeRef(`RARITY.${Object.entries(RARITY).find(([, v]) => v === info.rarity)?.[0] ?? 'COMMON'}`),
    };
    if (info.element) {
        obj.element = codeRef(`VISION.${info.element}`);
    }

    const objSource = printValue(obj, 0);
    appendObjectToArrayFile(target.file, target.arrayName, objSource);
    appendLocaleEntry(target.locFile, finalId, info.nameEn, info.nameRu);

    const record = { id: finalId, group: [genericGroupConst.split('.')[1], info.familyTag], rarity: info.rarity, __enName: info.nameEn };
    newlyAdded.push({ kind, id: finalId, nameEn: info.nameEn, nameRu: info.nameRu, rarity: info.rarity });
    byName.set(normName(info.nameEn), record);
    byId.set(finalId, record);

    return { id: finalId, isNew: true };
}

export function getNewlyAddedReport() {
    return newlyAdded;
}
