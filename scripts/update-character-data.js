#!/usr/bin/env node
// ============================================================================
// update-character-data.js — наполняет src/data/characters/*.js и
// src/data-locales/characters/{en,ru}/*.json настоящими данными персонажей
// (имя, описание, редкость, элемент, оружие, базовые характеристики,
// тексты/множители обычной атаки-скилла-ульты, названия и тексты
// созвездий и пассивных талантов, материалы возвышения/талантов) вместо
// плейсхолдеров — по одному запуску скрипта.
//
// Источник — genshin-db (см. scripts/lib/genshin-db-bridge.mjs), локально,
// без сети в рантайме.
//
// Запуск:            node scripts/update-character-data.js
// Только один герой:  node scripts/update-character-data.js --only=Ganyu
// Без записи файлов:  node scripts/update-character-data.js --dry-run
//
// Персонажей из SKIP_IDS (уже заполнены вручную) скрипт НЕ трогает —
// решение сознательное, см. обсуждение с Сергеем: у Varka/Mavuika/Flins
// данные уже введены руками, перезаписывать их не нужно.
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import genshindb, { resolveEntity } from './lib/genshin-db-bridge.mjs';
import {
    rarityRef, visionRef, visionKey, weaponTypeRef, ascensionStatRef,
    gemFamilyForElement, slugify, bookFamilySlug, classifyMaterialKind,
} from './lib/project-schema-map.mjs';
import { ensureMaterial, getNewlyAddedReport } from './lib/materials-catalog.mjs';
import { printValue, codeRef } from './lib/js-print.mjs';
import { MATERIAL_GROUP } from '../src/shared/config/constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CHAR_DIR = path.join(ROOT, 'src/data/characters');
const LOC_DIR = path.join(ROOT, 'src/data-locales/characters');
const COMMON_I18N_DIR = path.join(ROOT, 'src/core/i18n');

// см. шапку файла
const SKIP_IDS = new Set(['Varka', 'Mavuika', 'Flins']);

const ELEMENT_FILES = ['anemo', 'electro', 'dendro', 'geo', 'cryo', 'pyro', 'hydro'];

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const ONLY = args.find((a) => a.startsWith('--only='))?.split('=')[1];

// ---------------------------------------------------------------------------
// Базовые характеристики: 8 контрольных уровней (KEY_LEVELS в
// core/utils/levelCurve.js) и ступень возвышения, актуальная НА этом уровне
// (см. обсуждение в истории разработки — уровни "40/50/60/70/80" без "+"
// показываются с бонусом уже пройденного на этом уровне возвышения, т.к.
// именно так их линейно интерполирует interpolateStatAtLevel()).
const KEY_LEVELS = [1, 20, 40, 50, 60, 70, 80, 90];
const ASCEND_PHASES = [0, 0, 2, 3, 4, 5, 6, 6];

function buildBaseStats(enChar) {
    const hp = [];
    const atk = [];
    const def = [];
    KEY_LEVELS.forEach((lvl, i) => {
        const s = enChar.stats(lvl, ASCEND_PHASES[i]);
        hp.push(Math.round(s.hp * 10) / 10);
        atk.push(Math.round(s.attack * 10) / 10);
        def.push(Math.round(s.defense * 10) / 10);
    });
    return {
        '[STATS.HP]': hp,
        '[STATS.ATK]': atk,
        '[STATS.DEF]': def,
    };
}

// ---------------------------------------------------------------------------
// Множители талантов: превращаем attributes[] (genshin-db) в [{name, values}]
// — формат, который реально читает TalentSection.jsx (stat.values[level-1]).
// name — ключ в общем неймспейсе common:* (см. core/i18n/common.*.json),
// один и тот же для однотипных строк у РАЗНЫХ персонажей (напр. "cd" у всех
// скиллов с перезарядкой) — определяем по тексту англ. лейбла genshin-db.
const LABEL_PATTERNS = [
    [/^(\d+)-Hit DMG$/i, (m) => `hit_${m[1]}`],
    [/^(\d+)-Hit\s*\/?\s*Segment DMG$/i, (m) => `hit_${m[1]}`],
    [/^Charged Attack DMG$/i, () => 'charged_dmg'],
    [/^Charged Attack CRIT DMG$/i, () => 'charged_crit_dmg'],
    [/^Charged Attack Stamina Cost$/i, () => 'charged_stamina_cost'],
    [/^(?:Plunge Attack DMG|Plunge DMG)$/i, () => 'plunge_dmg'],
    [/^Low Plunge Attack DMG$/i, () => 'low_plunge_dmg'],
    [/^High Plunge Attack DMG$/i, () => 'high_plunge_dmg'],
    [/^CD$/i, () => 'cd'],
    [/^Duration$/i, () => 'duration'],
    [/^Energy Cost$/i, () => 'energy_cost'],
    [/^Press DMG$/i, () => 'press_dmg'],
    [/^Hold DMG$/i, () => 'hold_dmg'],
    [/^Skill DMG$/i, () => 'skill_dmg'],
    [/^DMG$/i, () => 'dmg'],
    [/^(?:DoT|Continuous DMG)$/i, () => 'dot_dmg'],
    [/^AoE DMG$/i, () => 'aoe_dmg'],
    [/^(?:Healing|HP Restored)$/i, () => 'heal_amount'],
    [/^(?:Shield Absorption|Max Absorption|Base DMG Absorbed)$/i, () => 'shield_absorption'],
];

const newCommonLabels = new Map(); // slug -> { en, ru } — для финального отчёта + записи в common.*.json

function labelToStatKey(labelEn, labelRu) {
    for (const [re, fn] of LABEL_PATTERNS) {
        const m = labelEn.match(re);
        if (m) return fn(m);
    }
    const slug = slugify(labelEn);
    if (!newCommonLabels.has(slug)) newCommonLabels.set(slug, { en: labelEn, ru: labelRu || labelEn });
    return slug;
}

/** genshin-db attributes = {labels:[...], parameters:{param1:[...15], ...}}
 *  -> [{name, values}], по 10 значений (уровни 1-10). Лейбл вида
 *  "3-Hit DMG|{param3:F1P}+{param4:F1P}" ссылается на НЕСКОЛЬКО параметров
 *  разом (комбо-удар из двух частей) — берём первый как представительное
 *  значение: для процентников второе слагаемое обычно того же порядка, а
 *  городить отдельную строку на "часть удара" ради точности не стоит. */
function buildTalentStats(combatEn, combatRu) {
    const labelsEn = combatEn?.attributes?.labels || [];
    const labelsRu = combatRu?.attributes?.labels || [];
    const params = combatEn?.attributes?.parameters || {};
    const out = [];
    labelsEn.forEach((rawLabel, i) => {
        const paramMatch = rawLabel.match(/\{(param\d+):/);
        if (!paramMatch) return;
        const values = params[paramMatch[1]];
        if (!values?.length) return;

        const labelEn = rawLabel.split('|')[0].trim();
        const labelRu = (labelsRu[i] || '').split('|')[0].trim();
        const name = labelToStatKey(labelEn, labelRu);
        const sliced = values.slice(0, 10).map((v) => Math.round(v * 10000) / 10000);
        while (sliced.length < 10) sliced.push(sliced[sliced.length - 1] ?? 0);
        out.push({ name, values: sliced });
    });
    return out;
}

// ---------------------------------------------------------------------------
// Материалы возвышения/талантов — см. scripts/lib/materials-catalog.mjs для
// того, как регистрируются недостающие записи каталога.
function classifyAndRegister(kind, itemName, rarity, familyTag, elementKeyForGem) {
    const infoRu = genshindb.materials(itemName, { resultLanguage: 'Russian' });
    const { id } = ensureMaterial(kind, {
        nameEn: itemName,
        nameRu: infoRu?.name || itemName,
        rarity,
        familyTag,
        element: elementKeyForGem,
    });
    return id;
}

function buildAscensionMaterials(enChar, elementKey, talentsEn) {
    const result = {};

    // Камни возвышения — детерминированно по элементу персонажа (см.
    // gemFamilyForElement) — гарантированно нужны все 4 тира, регистрируем
    // сразу все (ensureMaterial сам пропустит то, что уже есть в каталоге).
    const gemFam = gemFamilyForElement(elementKey);
    const GEM_DISPLAY = {
        VAYUDA_TURQUOISE: 'Vayuda Turquoise', VAJRADA_AMETHYST: 'Vajrada Amethyst',
        SHIVADA_JADE: 'Shivada Jade', AGNIDUS_AGATE: 'Agnidus Agate',
        VARUNADA_LAZURITE: 'Varunada Lazurite', PRITHIVA_TOPAZ: 'Prithiva Topaz',
        NAGADUS_EMERALD: 'Nagadus Emerald',
    };
    const gemTiers = [['Sliver', 2], ['Fragment', 3], ['Chunk', 4], ['Gemstone', 5]];
    for (const [word, rarity] of gemTiers) {
        classifyAndRegister('gem', `${GEM_DISPLAY[gemFam.constGroupKey]} ${word}`, rarity, gemFam.slug, elementKey);
    }
    result[MATERIAL_GROUP.ASCENSION_GEMS] = gemFam.slug;

    // Остальное — по факту того, что запрашивает costs.ascendN у genshin-db.
    let enemyDropFamilyTag = null;
    for (let i = 1; i <= 6; i++) {
        for (const item of enChar.costs?.[`ascend${i}`] || []) {
            if (item.name === 'Mora') continue;
            const info = genshindb.materials(item.name);
            const kind = classifyMaterialKind(info, 'ascension');
            if (kind === 'local_specialty') {
                const tag = slugify(item.name);
                classifyAndRegister('local_specialty', item.name, info.rarity, tag);
                result[MATERIAL_GROUP.LOCAL_SPECIALTIES] = tag;
            } else if (kind === 'boss_material') {
                const tag = slugify(item.name);
                classifyAndRegister('boss_material', item.name, info.rarity, tag);
                result[MATERIAL_GROUP.NORMAL_BOSS_DROPS] = tag;
            } else if (kind === 'common_enemy_drop') {
                if (!enemyDropFamilyTag) enemyDropFamilyTag = slugify(item.name);
                classifyAndRegister('common_enemy_drop', item.name, info.rarity, enemyDropFamilyTag);
                result[MATERIAL_GROUP.COMMON_ENEMY_DROPS] = enemyDropFamilyTag;
            }
            // kind === 'gem' — уже покрыто выше; 'currency' (Mora) — пропущена явно.
        }
    }

    // Книги талантов + материал с недельного босса — из costs таланта
    // (одинаковы для attack/skill/burst одного персонажа, достаточно одного).
    const costsSource = talentsEn?.costs;
    if (costsSource) {
        for (let i = 2; i <= 10; i++) {
            for (const item of costsSource[`lvl${i}`] || []) {
                if (item.name === 'Mora' || item.name === 'Crown of Insight') continue;
                const info = genshindb.materials(item.name);
                const kind = classifyMaterialKind(info, 'talent');
                if (kind === 'talent_book') {
                    const family = bookFamilySlug(item.name);
                    if (family) {
                        const tag = `books_of_${family}`;
                        classifyAndRegister('talent_book', item.name, info.rarity, tag);
                        result[MATERIAL_GROUP.TALENT_BOOKS] = tag;
                    }
                } else if (kind === 'weekly_boss_material') {
                    const tag = slugify(item.name);
                    classifyAndRegister('weekly_boss_material', item.name, info.rarity, tag);
                    result[MATERIAL_GROUP.WEEKLY_BOSS_DROPS] = tag;
                } else if (kind === 'common_enemy_drop') {
                    if (!enemyDropFamilyTag) enemyDropFamilyTag = slugify(item.name);
                    classifyAndRegister('common_enemy_drop', item.name, info.rarity, enemyDropFamilyTag);
                    result[MATERIAL_GROUP.COMMON_ENEMY_DROPS] = enemyDropFamilyTag;
                }
            }
        }
    }

    return result;
}

// ---------------------------------------------------------------------------
// Извлечение полей, которые нужно СОХРАНИТЬ из уже существующего блока
// персонажа (id/enkaId/birthday/avatar_icon и т.п.) — этот скрипт заполняет
// геймплейные данные, но не трогает то, что уже настроено руками (иконки,
// даты рождения) вне зоны своей ответственности.
function extractField(blockText, fieldName) {
    const re = new RegExp(`\\b${fieldName}:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)"|(-?\\d+(?:\\.\\d+)?))`);
    const m = blockText.match(re);
    if (!m) return undefined;
    if (m[3] !== undefined) return Number(m[3]);
    return (m[1] ?? m[2])?.replace(/\\(.)/g, '$1');
}

function findCharacterBlock(fileContent, characterId) {
    // Форматирование между файлами персонажей отличается (где-то 4 пробела
    // отступа и одинарные кавычки, где-то 6 пробелов и двойные — см. историю
    // разработки), поэтому регулярка терпима и к отступу, и к стилю кавычек.
    const blocks = fileContent.split(/(?=\{\s*\n\s*id:\s*["'])/);
    for (let i = 0; i < blocks.length; i++) {
        const idMatch = blocks[i].match(/^\{\s*\n\s*id:\s*["']([^"']+)["']/);
        if (idMatch && idMatch[1] === characterId) {
            return { index: i, text: blocks[i] };
        }
    }
    return null;
}

/** text начинается с '{' (открывающая скобка объекта персонажа) — считает
 *  вложенность и возвращает индекс СРАЗУ ПОСЛЕ соответствующей закрывающей
 *  '}'. Нужно, чтобы корректно отделить "хвост" после объекта — для
 *  последнего персонажа в файле это "\n];\n" (закрытие массива), для
 *  остальных — просто ",\n" перед следующим блоком; попытка угадать хвост
 *  регуляркой вместо честного подсчёта скобок роняла "];" у последнего
 *  персонажа файла (словлено на реальном прогоне — все 7 файлов лишились
 *  закрывающей скобки массива). */
function findMatchingBraceEnd(text) {
    let depth = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') {
            depth--;
            if (depth === 0) return i + 1;
        }
    }
    throw new Error('не нашёл закрывающую скобку объекта персонажа (несбалансированные {})');
}

// ---------------------------------------------------------------------------
function mergeLocaleFile(filePath, characterId, entry) {
    let data = {};
    if (fs.existsSync(filePath)) {
        try { data = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch { /* пустой/битый файл — начинаем с {} */ }
    }
    data[characterId] = { ...data[characterId], ...entry };
    if (!DRY_RUN) fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n');
}

function mergeCommonI18n() {
    if (newCommonLabels.size === 0) return;
    for (const lang of ['en', 'ru']) {
        const filePath = path.join(COMMON_I18N_DIR, `common.${lang}.json`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        for (const [slug, names] of newCommonLabels) {
            if (!data[slug]) data[slug] = names[lang];
        }
        if (!DRY_RUN) fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n');
    }
}

// ---------------------------------------------------------------------------
async function processCharacter(existingChar, fileName, fileContent) {
    const id = existingChar.id;

    const enChar = resolveEntity('characters', id, { resultLanguage: 'English' });
    if (!enChar) return { id, status: 'not_found' };
    const ruChar = resolveEntity('characters', id, { resultLanguage: 'Russian' });
    const enTalents = resolveEntity('talents', id, { resultLanguage: 'English' });
    const ruTalents = resolveEntity('talents', id, { resultLanguage: 'Russian' });
    const enConsts = resolveEntity('constellations', id, { resultLanguage: 'English' });
    const ruConsts = resolveEntity('constellations', id, { resultLanguage: 'Russian' });

    const elementKey = visionKey(enChar.elementText);

    // --- поля персонажа (data/characters/*.js) ---
    const block = findCharacterBlock(fileContent, id);
    const preserved = {
        id,
        enkaId: extractField(block?.text || '', 'enkaId'),
        birthday: extractField(block?.text || '', 'birthday'),
        avatar_icon: extractField(block?.text || '', 'avatar_icon'),
    };

    const ascensionMaterials = buildAscensionMaterials(enChar, elementKey, { costs: enTalents?.costs });

    const talentBlock = (combatEn, combatRu, localIconFallback) => ({
        icon: localIconFallback || '',
        stats: buildTalentStats(combatEn, combatRu),
    });

    const newCharObj = {
        id: preserved.id,
        ...(preserved.enkaId !== undefined ? { enkaId: preserved.enkaId } : {}),
        rarity: rarityRef(enChar.rarity),
        element: visionRef(enChar.elementText),
        weapon: weaponTypeRef(enChar.weaponText),
        ...(preserved.birthday ? { birthday: preserved.birthday } : {}),
        ...(preserved.avatar_icon ? { avatar_icon: preserved.avatar_icon } : {}),
        baseStats: buildBaseStats(enChar),
        ...(enChar.substatType ? { ascensionStat: ascensionStatRef(enChar.substatType) } : {}),
        ascensionMaterials,
        talents: {
            attack: talentBlock(enTalents?.combat1, ruTalents?.combat1),
            skill: talentBlock(enTalents?.combat2, ruTalents?.combat2),
            burst: talentBlock(enTalents?.combat3, ruTalents?.combat3),
        },
        constellations: Object.fromEntries(
            [1, 2, 3, 4, 5, 6].map((n) => [`c${n}`, { icon: '' }])
        ),
        passives: Object.fromEntries(
            [1, 2, 3]
                .filter((n) => enTalents?.[`passive${n}`]?.name)
                .map((n) => [`passive${n}`, { icon: '' }])
        ),
    };

    return {
        id, status: 'ok', elementKey, block, newCharObj,
        localeEn: buildLocaleEntry(enChar, enTalents, enConsts),
        localeRu: buildLocaleEntry(ruChar, ruTalents, ruConsts),
    };
}

function buildLocaleEntry(char, talents, consts) {
    if (!char) return null;
    const entry = {
        name: char.name,
        description: char.description,
    };
    const combatKeyMap = { attack: 'combat1', skill: 'combat2', burst: 'combat3' };
    for (const [projKey, gdbKey] of Object.entries(combatKeyMap)) {
        const c = talents?.[gdbKey];
        if (c) {
            entry[`talent_${projKey}_name`] = c.name;
            entry[`talent_${projKey}_desc`] = c.description;
        }
    }
    for (let i = 1; i <= 6; i++) {
        const c = consts?.[`c${i}`];
        if (c) {
            entry[`c${i}_name`] = c.name;
            entry[`c${i}_desc`] = c.description;
        }
    }
    for (let i = 1; i <= 3; i++) {
        const p = talents?.[`passive${i}`];
        if (p?.name) {
            entry[`passive${i}_name`] = p.name;
            entry[`passive${i}_desc`] = p.description;
        }
    }
    return entry;
}

// ---------------------------------------------------------------------------
async function main() {
    const results = { ok: [], skipped: [], not_found: [], errors: [] };

    for (const fileName of ELEMENT_FILES) {
        const filePath = path.join(CHAR_DIR, `${fileName}.js`);
        let fileContent = fs.readFileSync(filePath, 'utf8');
        const mod = await import(`../src/data/characters/${fileName}.js`);
        const characters = mod[fileName];

        for (const existingChar of characters) {
            if (ONLY && existingChar.id !== ONLY) continue;
            if (SKIP_IDS.has(existingChar.id)) {
                results.skipped.push(existingChar.id);
                continue;
            }

            let outcome;
            try {
                outcome = await processCharacter(existingChar, fileName, fileContent);
            } catch (e) {
                results.errors.push({ id: existingChar.id, error: e.message });
                console.error(`  ❌ ${existingChar.id}: ${e.stack || e.message}`);
                continue;
            }

            if (outcome.status === 'not_found') {
                results.not_found.push(existingChar.id);
                console.warn(`  ⚠ ${existingChar.id}: не нашёл в genshin-db, пропускаю`);
                continue;
            }
            if (!outcome.block) {
                results.errors.push({ id: existingChar.id, error: 'не нашёл блок персонажа в файле для замены' });
                console.error(`  ❌ ${existingChar.id}: не нашёл исходный блок в ${fileName}.js — пропускаю запись`);
                continue;
            }

            // --- запись data/characters/{file}.js: точечная замена блока ---
            const oldBlockText = outcome.block.text;
            const objEnd = findMatchingBraceEnd(oldBlockText);
            const tail = oldBlockText.slice(objEnd); // ",\n" перед следующим блоком ИЛИ "\n];\n" если это последний персонаж файла
            const newObjSource = printValue(outcome.newCharObj, 0);
            const replacement = newObjSource + tail;
            fileContent = fileContent.slice(0, fileContent.indexOf(oldBlockText))
                + replacement
                + fileContent.slice(fileContent.indexOf(oldBlockText) + oldBlockText.length);

            // --- запись data-locales/characters/{en,ru}/{file}.json ---
            if (outcome.localeEn) mergeLocaleFile(path.join(LOC_DIR, 'en', `${fileName}.json`), existingChar.id, outcome.localeEn);
            if (outcome.localeRu) mergeLocaleFile(path.join(LOC_DIR, 'ru', `${fileName}.json`), existingChar.id, outcome.localeRu);

            results.ok.push(existingChar.id);
            console.log(`  ✓ ${existingChar.id}`);
        }

        if (!DRY_RUN) fs.writeFileSync(filePath, fileContent);
    }

    mergeCommonI18n();

    console.log('\n=== Итог ===');
    console.log(`Заполнено: ${results.ok.length}`);
    console.log(`Пропущено (в SKIP_IDS): ${results.skipped.length} — ${[...SKIP_IDS].join(', ')}`);
    if (results.not_found.length) console.log(`Не нашёл в genshin-db (${results.not_found.length}): ${results.not_found.join(', ')}`);
    if (results.errors.length) {
        console.log(`Ошибки (${results.errors.length}):`);
        for (const e of results.errors) console.log(`  - ${e.id}: ${e.error}`);
    }
    const newMats = getNewlyAddedReport();
    if (newMats.length) {
        console.log(`\nДобавлено новых материалов в каталог (${newMats.length}), у ВСЕХ плейсхолдер-иконка assets/tmp256.png — нужно дорисовать/скачать руками:`);
        for (const m of newMats) console.log(`  - ${m.id} (${m.kind}): "${m.nameEn}" / "${m.nameRu}"`);
    }
    if (newCommonLabels.size) {
        console.log(`\nНовые ключи в common.en/ru.json (${newCommonLabels.size}) — нет готового общего названия, использован слаг лейбла genshin-db:`);
        for (const [slug, names] of newCommonLabels) console.log(`  - ${slug}: "${names.en}" / "${names.ru}"`);
    }
    if (DRY_RUN) console.log('\n(--dry-run: файлы НЕ записаны)');
}

main().catch((e) => {
    console.error('\n❌ update-character-data:', e.stack || e.message);
    process.exit(1);
});
