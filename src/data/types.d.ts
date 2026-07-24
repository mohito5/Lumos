/**
 * Типизированная основа для слоя данных (src/data/**).
 *
 * Сознательный компромисс: сами .js-файлы с данными (characters/*.js,
 * weapons/*.js, materials/*.js и т.д.) НЕ переведены на TypeScript — это
 * десятки файлов и тысячи строк вложенных структур, полноценная миграция
 * тянет на отдельную задачу. tsconfig.json не включает allowJs/checkJs,
 * поэтому .jsx-файлы им и так не типчекаются компилятором — но IDE
 * (VSCode/WebStorm) подхватывает такие .d.ts для автодополнения и
 * подсказок при наведении даже в .jsx, и именно под это они и рассчитаны:
 * как типизированная база под конкретные места, которые в неё оборачивают
 * (см. JSDoc @type у characterArray/weaponArray), а не как полная типизация
 * всего проекта.
 *
 * Что НЕ описано подробно и почему: talents[].stats — массив с сильно
 * разной по персонажам формой (см. character-типа переменные valueKey),
 * passive/main_stat у оружия — тоже вариативны между файлами. Здесь они
 * оставлены как Record<string, unknown> / unknown[] — типизировать это
 * точно означало бы читать все data-файлы построчно ради проекта, который
 * явно не об этом просили.
 */

export type Rarity = 1 | 2 | 3 | 4 | 5;

export interface AscensionMaterials {
    /** Ключ — обобщённая группа (см. MATERIAL_GROUP в app/constants.js),
     * значение — конкретная под-группа для этого персонажа/оружия
     * (например ASCENSION_GEMS → VAYUDA_TURQUOISE). */
    [genericGroup: string]: string;
}

export interface CharacterTalentBlock {
    icon: string;
    stats: unknown[];
}

export interface Character {
    id: string;
    rarity: Rarity;
    element: string;
    weapon: string;
    birthday?: string;
    avatar: string;
    avatar_icon?: string;
    /** [STATS.HP]/[STATS.ATK]/[STATS.DEF] → массив из 8 значений,
     * по одному на KEY_LEVELS (core/utils/levelCurve.js). */
    baseStats: Record<string, number[]>;
    /** Ключ статы (см. app/stats.js), раскрывающейся при возвышении.
     * Может отсутствовать, если данные по персонажу ещё не заполнены. */
    ascensionStat?: string;
    ascensionMaterials: AscensionMaterials;
    talents?: {
        attack?: CharacterTalentBlock;
        skill?: CharacterTalentBlock;
        burst?: CharacterTalentBlock;
        [key: string]: CharacterTalentBlock | undefined;
    };
}

export interface Weapon {
    id: string;
    enkaId?: number;
    rarity: Rarity;
    type: string;
    icon: string;
    base_attack_curve: unknown;
    main_stat?: { stat: string; curve: string };
    passive?: unknown[];
    ascensionMaterials: AscensionMaterials;
}

/**
 * "Сырой" материал — ровно то, что лежит в data/materials/*.js. Имени
 * (`name`) здесь нет: отображаемое имя всегда строится отдельно через
 * перевод по id (см. getMaterialDisplayName в core/utils/materialDisplay.js
 * и entry.name в core/utils/farmingSchedule.js) — это НЕ то же самое, что
 * "обогащённые" объекты материала с уже готовым name/needed, которые
 * возвращает, например, buildFarmingSchedule().
 */
export interface Material {
    id: string;
    /** Короткий id для компактного формата сохранений (см. useDataManager.js). */
    sid: string;
    icon: string;
    element?: string;
    type: string;
    /** Материал может входить в несколько групп — например [ASCENSION_GEMS, VISION.ELECTRO]. */
    group: string[];
    rarity: Rarity;
}

export interface ArtifactSet {
    id: string;
    bonuses?: Record<number, unknown>;
}

/** Диапазон прокачки в verbose-формате (levelRange/attackRange/... из BuildData). */
export interface LevelRange {
    from: number;
    to: number;
}

/**
 * Verbose-форма сборки, с которой работают компоненты (в сторе она живёт
 * в компактном виде — lr/ar/sr/br/ui/lm, см. expandBuildData/маппинг в
 * useDataManager.saveData).
 */
export interface BuildData {
    levelRange?: LevelRange;
    attackRange?: LevelRange;
    skillRange?: LevelRange;
    burstRange?: LevelRange;
    useInventory?: boolean;
    localMaterials?: Record<string, number>;
    materials?: Record<string, number>;
    [key: string]: unknown;
}
