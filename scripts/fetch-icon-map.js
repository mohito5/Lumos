#!/usr/bin/env node
// ============================================================================
// fetch-icon-map.js — генерирует src/data/cdn/*.generated.json для ВСЕХ
// категорий контента (персонажи + таланты/созвездия/пассивки, оружие,
// артефакты, существа, рыбы) одним запуском.
//
// Источник данных — пакет genshin-db (см. scripts/lib/genshin-db-bridge.mjs
// для объяснения, почему он, а не сам enka.network). Датасет статический
// (без сети в рантайме), так что для запуска нужен только `npm install`.
//
// Запуск:  node scripts/fetch-icon-map.js
// Только конкретные категории:  node scripts/fetch-icon-map.js characters weapons
// Категории: characters, weapons, artifacts, creatures, fish
//
// Формат выходных файлов — см. src/data/cdn/README.md:
//   простые:    { "id": "UI_AvatarIcon_Ayato" }
//   составные:  { "id:const:1": "...", "id:talent:attack": "..." }
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveEntity } from './lib/genshin-db-bridge.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CDN_DIR = path.join(ROOT, 'src/data/cdn');

const requestedCategories = process.argv.slice(2);
const shouldRun = (name) => requestedCategories.length === 0 || requestedCategories.includes(name);

function writeJson(fileName, obj) {
    const sorted = Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(path.join(CDN_DIR, fileName), JSON.stringify(sorted, null, 2) + '\n');
}

function report(label, matched, total, misses) {
    console.log(`  ${label}: ${matched}/${total}`);
    for (const m of misses) console.warn(`    ⚠ не нашёл в genshin-db: ${m}`);
}

// ---------------------------------------------------------------------------
async function runCharacters() {
    const characters = (await import('../src/data/characters/index.js')).default;
    const characterIcons = {};
    const constellationTalentIcons = {};
    let matched = 0;
    const misses = [];

    for (const char of characters) {
        const avatar = resolveEntity('characters', char.id, { resultLanguage: 'English' });
        const talents = resolveEntity('talents', char.id, { resultLanguage: 'English' });
        const consts = resolveEntity('constellations', char.id, { resultLanguage: 'English' });

        if (!avatar?.images?.filename_icon) {
            misses.push(char.id);
            continue;
        }
        matched++;
        characterIcons[char.id] = avatar.images.filename_icon;

        const t = talents?.images;
        if (t) {
            if (t.filename_combat1) constellationTalentIcons[`${char.id}:talent:attack`] = t.filename_combat1;
            if (t.filename_combat2) constellationTalentIcons[`${char.id}:talent:skill`] = t.filename_combat2;
            if (t.filename_combat3) constellationTalentIcons[`${char.id}:talent:burst`] = t.filename_combat3;
            if (t.filename_passive1) constellationTalentIcons[`${char.id}:passive:1`] = t.filename_passive1;
            if (t.filename_passive2) constellationTalentIcons[`${char.id}:passive:2`] = t.filename_passive2;
            if (t.filename_passive3) constellationTalentIcons[`${char.id}:passive:3`] = t.filename_passive3;
        }
        const c = consts?.images;
        if (c) {
            for (let i = 1; i <= 6; i++) {
                const key = `filename_c${i}`;
                if (c[key]) constellationTalentIcons[`${char.id}:const:${i}`] = c[key];
            }
        }
    }

    writeJson('characterIcons.generated.json', characterIcons);
    writeJson('constellationTalentIcons.generated.json', constellationTalentIcons);
    report('персонажи (аватар+таланты+созвездия)', matched, characters.length, misses);
}

// ---------------------------------------------------------------------------
async function runWeapons() {
    const weapons = (await import('../src/data/weapons/index.js')).default;
    const weaponIcons = {};
    let matched = 0;
    const misses = [];

    for (const w of weapons) {
        const entity = resolveEntity('weapons', w.id, { resultLanguage: 'English' });
        if (!entity?.images?.filename_icon) {
            misses.push(w.id);
            continue;
        }
        matched++;
        weaponIcons[w.id] = entity.images.filename_icon;
    }

    writeJson('weaponIcons.generated.json', weaponIcons);
    report('оружие', matched, weapons.length, misses);
}

// ---------------------------------------------------------------------------
async function runArtifacts() {
    const artifacts = (await import('../src/data/artifacts/index.js')).default;
    const artifactIcons = {};
    let matched = 0;
    const misses = [];
    const PIECES = ['flower', 'plume', 'sands', 'goblet', 'circlet'];

    for (const set of artifacts) {
        const entity = resolveEntity('artifacts', set.id, { resultLanguage: 'English' });
        const imgs = entity?.images;
        if (!imgs?.filename_flower) {
            misses.push(set.id);
            continue;
        }
        matched++;
        artifactIcons[set.id] = imgs.filename_flower; // представительская иконка сета (как в списке/карточке)
        for (const piece of PIECES) {
            const key = `filename_${piece}`;
            if (imgs[key]) artifactIcons[`${set.id}:piece:${piece}`] = imgs[key];
        }
    }

    writeJson('artifactIcons.generated.json', artifactIcons);
    report('артефакты (5 частей на сет)', matched, artifacts.length, misses);
}

// ---------------------------------------------------------------------------
async function runCreatures() {
    const creatures = (await import('../src/data/creatures/index.js')).default;
    const creatureIcons = {};
    let matched = 0;
    const misses = [];

    for (const cr of creatures) {
        const entity = resolveEntity('enemies', cr.id, { resultLanguage: 'English' });
        if (!entity?.images?.filename_icon) {
            misses.push(cr.id);
            continue;
        }
        matched++;
        creatureIcons[cr.id] = entity.images.filename_icon;
    }

    writeJson('creatureIcons.generated.json', creatureIcons);
    report('существа', matched, creatures.length, misses);
}

// ---------------------------------------------------------------------------
async function runFish() {
    // NB: и src/data/fishing/index.js, и региональные файлы под ним (напр.
    // mondstadt.js -> '../../shared/config/locations') импортируют друг
    // друга БЕЗ расширения ('./mondstadt', не './mondstadt.js'). Vite это
    // резолвит сам, но строгий Node ESM ("node scripts/...") — нет
    // (ERR_MODULE_NOT_FOUND). Чинить расширения по всему src/ — отдельная
    // задача вне этого скрипта; здесь просто вытаскиваем id рыб текстом,
    // как и старый scripts/fetch-enka-icon-map.js делал для персонажей.
    const fishDir = path.join(ROOT, 'src/data/fishing');
    const regionFiles = ['mondstadt.js', 'liyue.js', 'inazuma.js', 'sumeru.js', 'fontaine.js', 'chasm.js'];
    const fishes = [];
    for (const file of regionFiles) {
        const content = fs.readFileSync(path.join(fishDir, file), 'utf8');
        for (const m of content.matchAll(/id:\s*'([^']+)'/g)) fishes.push({ id: m[1] });
    }
    const fishIcons = {};
    let matched = 0;
    const misses = [];

    for (const f of fishes) {
        const entity = resolveEntity('animals', f.id, { resultLanguage: 'English' });
        if (!entity?.images?.filename_icon) {
            misses.push(f.id);
            continue;
        }
        matched++;
        fishIcons[f.id] = entity.images.filename_icon;
    }

    writeJson('fishIcons.generated.json', fishIcons);
    report('рыбы', matched, fishes.length, misses);
}

// ---------------------------------------------------------------------------
async function main() {
    console.log('Генерирую src/data/cdn/*.generated.json из genshin-db...\n');
    if (shouldRun('characters')) await runCharacters();
    if (shouldRun('weapons')) await runWeapons();
    if (shouldRun('artifacts')) await runArtifacts();
    if (shouldRun('creatures')) await runCreatures();
    if (shouldRun('fish')) await runFish();
    console.log('\nГотово. Незамапленные id (если есть, см. предупреждения выше) продолжат');
    console.log('использовать локальные иконки — резолвер в src/core/utils/cdnIcon.js');
    console.log('откатывается на них автоматически, приложение не ломается.');
}

main().catch((e) => {
    console.error('\n❌ fetch-icon-map:', e.stack || e.message);
    process.exit(1);
});
