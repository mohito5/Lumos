import { FIGHT_PROP_TO_STAT, FIGHT_PROP_MAP_TO_STAT, EQUIP_TYPE_TO_SLOT, PROP_TYPE, normalizeStatValue } from './enkaMappings.js';
import ENKA_TALENT_DATA from './enkaTalentData.js';

/**
 * Строит индекс enkaId -> внутренний объект для быстрого поиска.
 * Используется для персонажей, оружия и сетов артефактов одинаково —
 * все три сущности используют один и тот же паттерн (числовой ID игры
 * Enka -> наш собственный kebab-case id).
 */
function buildEnkaIndex(items) {
    const index = new Map();
    for (const item of items) {
        if (item.enkaId != null) {
            index.set(item.enkaId, item);
        }
    }
    return index;
}

/**
 * Достаёт значение mainStat/substat из "плоского" (уже разрешённого Enka)
 * представления { <mainPropId|appendPropId>: "FIGHT_PROP_...", statValue }.
 * Возвращает null, если тип статы нам неизвестен (лучше явно потерять один
 * статик, чем молча записать undefined-ключ в объект билда).
 */
function readFlatStat(flatStatEntry) {
    if (!flatStatEntry) return null;
    const propName = flatStatEntry.mainPropId ?? flatStatEntry.appendPropId;
    const statKey = FIGHT_PROP_TO_STAT[propName];
    if (!statKey) {
        console.warn(`[enka] Неизвестный FightProp: "${propName}" — статистика пропущена`);
        return null;
    }
    return { type: statKey, value: normalizeStatValue(statKey, flatStatEntry.statValue) };
}

/**
 * Извлекает базовую информацию о персонаже.
 *
 * @param {object} avatarInfo — один элемент avatarInfoList из ответа Enka
 * @param {Array} allCharacters — плоский массив персонажей проекта (allCharacters.flat())
 * @returns {{
 *   character: object|null,       — найденный объект персонажа проекта (null если enkaId не сопоставлен)
 *   enkaAvatarId: number,
 *   level: number,
 *   ascension: number,
 *   constellationCount: number,   — 0-6, из talentIdList.length
 *   friendshipLevel: number,
 *   skillLevelMap: Record<string, number>, — СЫРЫЕ таланты (skillId -> уровень),
 *                                              БЕЗ привязки к attack/skill/burst —
 *                                              см. комментарий ниже.
 * }}
 */
export function extractCharacterInfo(avatarInfo, allCharacters) {
    const charIndex = buildEnkaIndex(allCharacters);
    const character = charIndex.get(avatarInfo.avatarId) ?? null;

    if (!character) {
        console.warn(`[enka] Персонаж с avatarId=${avatarInfo.avatarId} не найден в базе проекта (нет enkaId сопоставления)`);
    }

    const propMap = avatarInfo.propMap ?? {};
    const level = Number(propMap[PROP_TYPE.LEVEL]?.val ?? propMap[PROP_TYPE.LEVEL]?.ival ?? 1);
    const ascension = Number(propMap[PROP_TYPE.ASCENSION]?.val ?? propMap[PROP_TYPE.ASCENSION]?.ival ?? 0);

    return {
        character,
        enkaAvatarId: avatarInfo.avatarId,
        level,
        ascension,
        constellationCount: avatarInfo.talentIdList?.length ?? 0,
        friendshipLevel: avatarInfo.fetterInfo?.expLevel ?? 1,
        // Сырая карта тоже отдаём (вдруг пригодится для отладки) — но для
        // отображения используй extractTalentLevels() ниже: skillLevelMap
        // сам по себе НЕ говорит, какой skillId — атака/навык/взрыв, это
        // решается через ENKA_TALENT_DATA (см. её комментарий).
        skillLevelMap: avatarInfo.skillLevelMap ?? {},
    };
}

/**
 * Уровни таланов персонажа (обычная атака / элем. навык / элем. взрыв),
 * ПРАВИЛЬНО сопоставленные с конкретными skillId — раньше это было
 * невозможно без отдельной таблицы (skillLevelMap сам по себе отдаёт
 * { skillId: уровень } без указания, что есть что). Порядок skillId берём
 * из ENKA_TALENT_DATA (см. её комментарий про верифицированный источник).
 *
 * @returns {{attack: number|null, skill: number|null, burst: number|null}}
 *   null для конкретного таланта, если по этому avatarId нет записи в
 *   ENKA_TALENT_DATA (не должно случаться для персонажей, известных Enka)
 *   или skillLevelMap не содержит такой skillId.
 */
export function extractTalentLevels(avatarInfo) {
    const talentData = ENKA_TALENT_DATA[avatarInfo.avatarId];
    const levelMap = avatarInfo.skillLevelMap ?? {};
    if (!talentData) {
        console.warn(`[enka] Нет данных о порядке талантов для avatarId=${avatarInfo.avatarId} в ENKA_TALENT_DATA`);
        return { attack: null, skill: null, burst: null };
    }
    const [attackId, skillId, burstId] = talentData.skillOrder;
    return {
        attack: levelMap[attackId] ?? null,
        skill: levelMap[skillId] ?? null,
        burst: levelMap[burstId] ?? null,
    };
}

/**
 * Иконки всех 6 созвездий персонажа (C1..C6), по порядку, независимо от
 * того, сколько из них активировано — активность решается отдельно через
 * constellationCount (созвездия открываются строго по порядку C1->C6, так
 * что "активно" всегда означает "индекс < constellationCount").
 *
 * @returns {string[]|null} — 6 bare-имён иконок (см. ENKA_TALENT_DATA) или
 *   null, если по этому avatarId нет записи (не должно случаться для
 *   персонажей, известных Enka).
 */
export function extractConstellationIcons(avatarId) {
    return ENKA_TALENT_DATA[avatarId]?.constIcons ?? null;
}

/**
 * Итоговые (расчётные) статы персонажа целиком — то, что раньше читалось
 * напрямую из fightPropMap в EnkaCharacterCard.jsx. Приводим к тому же
 * виду {type, value}, что и mainStat/substat артефактов, чтобы можно было
 * рендерить тем же StatRow/StatIcon.
 *
 * @returns {Array<{type: string, value: number}>}
 */
export function extractFinalStats(fightPropMap) {
    if (!fightPropMap) return [];
    return FIGHT_PROP_MAP_TO_STAT
        .map(([propId, statKey]) => {
            // fightPropMap — плоские числа (в отличие от propMap с {val, type}),
            // сверено с рабочим кодом в (теперь удалённом) EnkaCharacterCard.jsx.
            const raw = fightPropMap[propId];
            if (raw == null) return null;
            // ВАЖНО: тут своё масштабирование, а НЕ общий normalizeStatValue.
            // normalizeStatValue калиброван под flat.reliquarySubstats/weaponStats
            // (там проценты уже в готовом виде, напр. 6.6 = 6.6%), а fightPropMap
            // хранит процентные статы КАК ДОЛЮ (0.311 = 31.1%) — сверено с
            // рабочим кодом EnkaCharacterCard.jsx: critRate = fightPropMap['20'] * 100.
            const isPercent = typeof statKey === 'string' && statKey.endsWith('%');
            const value = isPercent ? Math.round(raw * 1000) / 10 : Math.round(raw);
            return { type: statKey, value };
        })
        .filter(Boolean);
}

/**
 * Извлекает оружие персонажа.
 *
 * @returns {object|null} — null если у персонажа почему-то нет оружия в equipList
 *   { weapon: объект проекта|null, enkaItemId, level, ascension, refinement (0-4, т.е. Р1-Р5),
 *     rarity, baseAtk: {type,value}|null, subStat: {type,value}|null }
 */
export function extractWeaponInfo(equipList, allWeapons) {
    const weaponIndex = buildEnkaIndex(allWeapons);
    const equip = equipList?.find(e => e.flat?.itemType === 'ITEM_WEAPON');
    if (!equip) return null;

    const weapon = weaponIndex.get(equip.itemId) ?? null;
    if (!weapon) {
        console.warn(`[enka] Оружие с itemId=${equip.itemId} не найдено в базе проекта (нет enkaId сопоставления)`);
    }

    // affixMap — объект вида { "affixId": refinementIndex }, refinementIndex 0-4 = Р1-Р5.
    // У 4-5★ оружия ровно один ключ; берём первое (и единственное) значение.
    const affixValues = Object.values(equip.weapon?.affixMap ?? {});
    const refinement = affixValues.length > 0 ? affixValues[0] : 0;

    const weaponStats = equip.flat?.weaponStats ?? [];
    // У оружия ДВЕ записи в weaponStats: FIGHT_PROP_BASE_ATTACK (всегда) +
    // один саб-стат (crit rate/def%/em/... в зависимости от оружия).
    const baseAtkEntry = weaponStats.find(s => s.appendPropId === 'FIGHT_PROP_BASE_ATTACK');
    const subStatEntry = weaponStats.find(s => s.appendPropId !== 'FIGHT_PROP_BASE_ATTACK');

    return {
        weapon,
        enkaItemId: equip.itemId,
        icon: equip.flat?.icon,
        level: equip.weapon?.level ?? 1,
        ascension: equip.weapon?.promoteLevel ?? 0,
        refinement,
        rarity: equip.flat?.rankLevel ?? weapon?.rarity ?? null,
        baseAtk: baseAtkEntry ? { type: 'atk', value: Math.round(baseAtkEntry.statValue) } : null,
        subStat: readFlatStat(subStatEntry),
    };
}

/**
 * Извлекает один артефакт (реликвию) в ГОТОВОМ для калькулятора виде —
 * форма ОБЪЕКТА в точности соответствует тому, что возвращает
 * ArtifactConfigModal.handleSave() / getArtifactFromSave() в CalculatorPage.jsx,
 * чтобы это можно было напрямую подставить в build.artifacts[slot].
 *
 * @returns {object|null} — null если это не артефакт (itemType !== ITEM_RELIQUARY)
 *   или его equipType не входит в 5 известных слотов.
 */
export function extractArtifact(equip, allArtifactSets) {
    if (equip?.flat?.itemType !== 'ITEM_RELIQUARY') return null;

    const slot = EQUIP_TYPE_TO_SLOT[equip.flat.equipType];
    if (!slot) {
        console.warn(`[enka] Неизвестный equipType артефакта: "${equip.flat.equipType}"`);
        return null;
    }

    const setIndex = buildEnkaIndex(allArtifactSets);
    const setId = equip.flat.setId ?? null;
    const set = setId != null ? (setIndex.get(setId) ?? null) : null;
    if (setId != null && !set) {
        console.warn(`[enka] Сет артефакта с setId=${setId} не найден в базе проекта (нет enkaId сопоставления)`);
    }

    const mainStat = readFlatStat(equip.flat.reliquaryMainstat);
    const substats = (equip.flat.reliquarySubstats ?? [])
        .map(readFlatStat)
        .filter(Boolean);

    return {
        set: set?.id ?? null,
        setName: set?.name ?? null,
        enkaSetId: setId,
        slot,
        rarity: equip.flat.rankLevel,
        icon: equip.flat.icon,
        // Enka хранит level как 1-21 (1 = "+0"); остальной калькулятор
        // (ArtifactConfigModal и т.д.) работает с уровнем в игровом виде
        // "+N", т.е. 0-20 — вычитаем 1, сверено по формату savedArtifact.lvl
        // в CalculatorPage.jsx (там lvl приходит из того же ArtifactConfigModal).
        level: (equip.reliquary?.level ?? 1) - 1,
        mainStat: mainStat?.type ?? null,
        mainStatValue: mainStat?.value ?? null,
        substats,
    };
}

/**
 * Извлекает все 5 артефактов персонажа, уже разложенные по слотам.
 * @returns {{flower: object|null, plume: object|null, sands: object|null, goblet: object|null, circlet: object|null}}
 */
export function extractAllArtifacts(equipList, allArtifactSets) {
    const result = { flower: null, plume: null, sands: null, goblet: null, circlet: null };
    for (const equip of equipList ?? []) {
        const artifact = extractArtifact(equip, allArtifactSets);
        if (artifact) {
            result[artifact.slot] = artifact;
        }
    }
    return result;
}

/**
 * Полное извлечение одного персонажа из avatarInfoList — объединяет
 * персонажа, оружие и артефакты в единую структуру, готовую и для
 * отображения, и для дальнейшего сохранения в билд калькулятора.
 */
export function extractFullBuild(avatarInfo, { allCharacters, allWeapons, allArtifactSets }) {
    const charInfo = extractCharacterInfo(avatarInfo, allCharacters);
    const weaponInfo = extractWeaponInfo(avatarInfo.equipList, allWeapons);
    const artifacts = extractAllArtifacts(avatarInfo.equipList, allArtifactSets);

    return {
        ...charInfo,
        weapon: weaponInfo,
        artifacts,
        // Уровни атаки/навыка/взрыва (attack/skill/burst), иконки всех 6
        // созвездий и итоговые статы персонажа — см. комментарии к функциям.
        talents: extractTalentLevels(avatarInfo),
        constIcons: extractConstellationIcons(avatarInfo.avatarId),
        finalStats: extractFinalStats(avatarInfo.fightPropMap),
    };
}
