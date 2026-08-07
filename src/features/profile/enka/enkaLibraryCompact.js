// ============================================================================
// enkaLibraryCompact.js — превращает build (результат extractFullBuild —
// см. enkaExtract.js) в компактную запись для накопительной библиотеки
// персонажей (см. useCharacterLibrary.js).
//
// НАМЕРЕННО не включает картинки/иконки (character.avatar, weapon.icon,
// artifact.icon, constIcons, character?.talents?.[key]?.icon) — только id +
// структурные данные (уровни, статы, состав артефактов). Экономит место в
// CloudStorage (чанкуется — см. saveKeyToCloudChunked в telegramSyncManager.ts)
// и не имеет смысла дублировать: иконки и так резолвятся по id через
// cdnIcon.js в момент отображения, а не хранятся вместе с данными.
// ============================================================================
/**
 * Бонусы комплектов артефактов (2pc/4pc) из компактной записи библиотеки —
 * нужно для карточек отряда (TeamCardExport.jsx). Считает по фактически
 * экипированным сетам, без обращения к каким-либо дополнительным данным.
 * @param {import('../../../core/services/telegramSyncManager').CompactLibraryEntry} entry
 * @returns {Array<{ setId: string, count: 2|4 }>}
 */
export function computeSetBonuses(entry) {
    const counts = {};
    for (const slot of ['flower', 'plume', 'sands', 'goblet', 'circlet']) {
        const set = entry.a?.[slot]?.set;
        if (set) counts[set] = (counts[set] || 0) + 1;
    }
    const bonuses = [];
    for (const [setId, count] of Object.entries(counts)) {
        if (count >= 4) bonuses.push({ setId, count: 4 });
        else if (count >= 2) bonuses.push({ setId, count: 2 });
    }
    return bonuses;
}

/**
 * @param {object} build — результат extractFullBuild(avatarInfo, {...})
 * @param {string} uid — из какого профиля Enka импортирован этот билд
 * @returns {import('../../../core/services/telegramSyncManager').CompactLibraryEntry|null}
 *   null, если character не сопоставлен с внутренними данными проекта
 *   (нет смысла хранить билд персонажа, которого мы не можем отобразить)
 */
export function compactLibraryEntry(build, uid) {
    const { character, level, ascension, constellationCount, friendshipLevel, weapon, artifacts, talents, finalStats } = build;

    if (!character) return null; // не сопоставлен — хранить нечего (см. enkaAvatarId в build, если нужно логировать)

    const compactArtifact = (a) => a && {
        set: a.set,
        lvl: a.level,
        ms: a.mainStat ? { t: a.mainStat, v: a.mainStatValue } : null,
        ss: (a.substats ?? []).map((s) => ({ t: s.type, v: s.value })),
    };

    return {
        id: character.id,
        lvl: level,
        asc: ascension,
        const: constellationCount,
        fr: friendshipLevel,
        w: weapon ? { id: weapon.weapon?.id ?? null, lvl: weapon.level, asc: weapon.ascension, r: weapon.refinement } : null,
        a: {
            flower: compactArtifact(artifacts.flower),
            plume: compactArtifact(artifacts.plume),
            sands: compactArtifact(artifacts.sands),
            goblet: compactArtifact(artifacts.goblet),
            circlet: compactArtifact(artifacts.circlet),
        },
        t: talents,
        stats: finalStats,
        ts: Date.now(),
        uid,
    };
}
