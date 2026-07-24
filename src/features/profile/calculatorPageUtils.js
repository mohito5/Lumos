import { artifactStatsData } from '../../data/artifact-stats.js';

export const getArtifactSaveData = (artifact) => {
    if (!artifact) return null;
    // ArtifactConfigModal возвращает substats (lowercase),
    // загруженный из сейва артефакт может иметь subStats (camelCase)
    const subs = artifact.subStats ?? artifact.substats ?? [];
    // artifact.set может быть объектом (после выбора в модале) или строкой-id (после загрузки)
    const setId = typeof artifact.set === 'object' ? artifact.set?.id : artifact.set;
    return {
        sid: setId,
        r: artifact.rarity,
        lvl: artifact.level,
        ms: artifact.mainStat,
        ss: subs.map(s => ({ key: s.key ?? s.type, value: s.value })),
    };
};

/**
 * artifactSets ожидается уже плоским массивом (allArtifactSets в
 * data/artifacts/index.js собирается через spread) — раньше здесь был
 * artifactSets.flat(), хотя разворачивать уже нечего.
 */
export const getArtifactFromSave = (savedArtifact, artifactSets, slotType) => {
    if (!savedArtifact) return null;

    const set = artifactSets.find(s => s.id === savedArtifact.sid);
    if (!set) return null;

    // Старые сейвы (до этого фикса) не хранили rarity — 5★ разумный дефолт,
    // так как подавляющее большинство фармленых артефактов пятизвёздочные.
    const rarity = savedArtifact.r ?? 5;
    const mainStatValue = artifactStatsData.mainStatValuesByRarity[rarity]?.[savedArtifact.ms]?.[savedArtifact.lvl] ?? 0;

    // Форма объекта должна ТОЧНО совпадать с тем, что возвращает
    // ArtifactConfigModal.handleSave() — это единственная каноническая форма
    // "живого" артефакта, которую читают ArtifactSlot (setName, substats[].type
    // через фоллбэк) и calculateFinalStats (art.set как id-строка, art.substats
    // без фоллбэка, art.rarity). set здесь — id-строка, а не весь объект сета.
    return {
        set: set.id,
        setName: set.name,
        slot: slotType,
        rarity,
        level: savedArtifact.lvl,
        mainStat: savedArtifact.ms,
        mainStatValue,
        substats: (savedArtifact.ss || []).map(s => ({
            type: s.key,
            value: s.value,
        })),
    };
};
