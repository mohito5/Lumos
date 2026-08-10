// ============================================================================
// genshin-db-bridge.mjs — общий слой сопоставления id проекта с записями
// пакета genshin-db (https://www.npmjs.com/package/genshin-db).
//
// Почему genshin-db, а не сам enka.network: enka.network недоступен из
// песочницы, в которой это писалось (сетевой allowlist ограничен пакетными
// реестрами) — но npm ИМ доступен, а genshin-db — это статически собранный
// (без обращений в сеть в рантайме) датасет игровых данных с полной
// локализацией на все языки, которые поддерживает сама игра, включая
// русский. Проверено вживую при разработке: имена/описания/талант-тексты на
// EN и RU резолвятся корректно и совпадают по смыслу с официальными.
//
// id проекта (например "KamisatoAyaka", "aquila-favonia", "hilichurl_fighter")
// не совпадает буквально ни с одним полем genshin-db — там всё матчится по
// отображаемому имени ("Kamisato Ayaka", "Aquila Favonia") через fuzzysort.
// resolveEntity() ниже перебирает несколько вариантов нормализации id и
// несколько наборов опций матчинга, чтобы устойчиво найти нужную запись.
// ============================================================================

import genshindb from 'genshin-db';

/**
 * Из id проекта строит несколько вариантов поискового запроса, от самого
 * точного к самому общему.
 *   "KamisatoAyaka"      -> ["KamisatoAyaka", "Kamisato Ayaka"]
 *   "aquila-favonia"     -> ["aquila-favonia", "aquila favonia"]
 *   "hilichurl_fighter"  -> ["hilichurl_fighter", "hilichurl fighter"]
 * @param {string} projectId
 * @returns {string[]}
 */
const ELEMENT_WORDS = ['anemo', 'geo', 'electro', 'dendro', 'hydro', 'pyro', 'cryo'];

export function queryVariants(projectId) {
    const raw = projectId;
    const spaced = projectId
        .replace(/[-_]/g, ' ')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .trim();
    const variants = [raw, spaced];

    // "abyss_mage_pyro" -> "pyro abyss mage": у элементных вариантов монстров
    // (Pyro Abyss Mage, Electro Cicin и т.п.) официальное имя ставит элемент
    // ПЕРВЫМ словом, а id проекта обычно — последним.
    const words = spaced.split(' ');
    const last = words[words.length - 1].toLowerCase();
    if (words.length > 1 && ELEMENT_WORDS.includes(last)) {
        variants.push([words[words.length - 1], ...words.slice(0, -1)].join(' '));
    }

    return [...new Set(variants)];
}

const DEFAULT_OPTION_SETS = [
    {},
    { matchNames: true, matchAltNames: true, matchAliases: true },
];

/** Убирает вообще все не-буквенно-цифровые символы и приводит к нижнему
 *  регистру — используется как ПОСЛЕДНИЙ рубеж матчинга (см. ниже), когда
 *  обычный fuzzysort-подбор genshin-db не справляется с составными словами
 *  вроде "Winged-Spear"/"Ocean-Hued": дефис внутри официального имени и
 *  дефис-разделитель в id проекта неразличимы на уровне самого id, поэтому
 *  сравниваем, вообще выкинув все разделители с обеих сторон. */
function bareAlnum(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Кэш полного списка имён по категории — bareAlnum-фоллбэк использует его,
// без кэша пришлось бы дёргать fn('names', {matchCategories:true}) на каждый
// промах, а промахов (специфичные составные названия) хватает.
const namesCache = new Map();
function allNamesFor(category) {
    if (!namesCache.has(category)) {
        namesCache.set(category, genshindb[category]('names', { matchCategories: true }) || []);
    }
    return namesCache.get(category);
}

/**
 * Ищет одну запись в указанной категории genshin-db, перебирая варианты
 * запроса × наборы опций матчинга, возвращает первое найденное совпадение.
 * Если обычный путь не сработал — последний рубеж: точное сравнение по
 * bareAlnum() со ВСЕМИ именами категории (см. bareAlnum() выше).
 *
 * @param {string} category — имя метода genshin-db: 'characters' | 'talents' |
 *   'constellations' | 'weapons' | 'artifacts' | 'materials' | 'enemies' | 'animals'
 * @param {string} projectId — id сущности в данных проекта
 * @param {{ resultLanguage?: string, optionSets?: object[] }} [opts]
 * @returns {object|null}
 */
export function resolveEntity(category, projectId, opts = {}) {
    const fn = genshindb[category];
    if (typeof fn !== 'function') {
        throw new Error(`genshin-db: неизвестная категория "${category}"`);
    }
    const { resultLanguage = 'English', optionSets = DEFAULT_OPTION_SETS } = opts;

    for (const variant of queryVariants(projectId)) {
        for (const extra of optionSets) {
            let res;
            try {
                res = fn(variant, { ...extra, resultLanguage });
            } catch {
                continue; // fuzzysort иногда кидает на "странных" строках — пробуем следующий вариант
            }
            if (res && !Array.isArray(res)) return res;
        }
    }

    const targetBare = bareAlnum(projectId);
    const exactName = allNamesFor(category).find((n) => bareAlnum(n) === targetBare);
    if (exactName) {
        try {
            const res = fn(exactName, { matchExactOnly: true, resultLanguage });
            if (res && !Array.isArray(res)) return res;
        } catch {
            // падает ниже, к null
        }
    }
    return null;
}

/**
 * То же самое, что resolveEntity(), но сразу на английском И русском —
 * одним и тем же запросом (меняется только resultLanguage, сам матчинг от
 * языка вывода не зависит, поэтому оба вызова резолвятся в одну и ту же
 * запись; на всякий случай сверяем числовой id и предупреждаем, если вдруг
 * разошлись).
 *
 * @returns {{ en: object, ru: object|null, id: number|string }|null}
 */
export function resolveBilingual(category, projectId, opts = {}) {
    const en = resolveEntity(category, projectId, { ...opts, resultLanguage: 'English' });
    if (!en) return null;

    const ru = resolveEntity(category, projectId, { ...opts, resultLanguage: 'Russian' });
    if (ru && ru.id !== en.id) {
        console.warn(`  ⚠ ${category}/${projectId}: EN и RU резолвились в разные записи (id ${en.id} vs ${ru.id}) — беру EN-вариант, RU игнорирую`);
        return { en, ru: null, id: en.id };
    }
    return { en, ru: ru || null, id: en.id };
}

export default genshindb;
