// ============================================================================
// js-print.mjs — минимальный сериализатор JS-значений в исходный код объектных
// литералов, в стиле, уже принятом в src/data/**: 4 пробела отступ, ключи без
// кавычек где это валидный идентификатор, строки в одинарных кавычках,
// ссылки на константы (RARITY.LEGENDARY, MATERIAL_GROUP.ASCENSION_GEMS и
// т.п.) — БЕЗ кавычек, как настоящий код, а не как текст.
//
// Обычный JSON.stringify тут не подходит: он всегда даёт двойные кавычки на
// ключах и не умеет писать "RARITY.LEGENDARY" без кавычек — а именно так
// заполнены существующие файлы в src/data/characters/**, и ломать это
// смешением стилей (часть объекта — как в проекте, часть — "как выдал
// JSON.stringify") не хочется.
// ============================================================================

const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** Обёртка над строкой — сериализатор напечатает её значение КАК ЕСТЬ (без
 *  кавычек), т.е. как ссылку на код: codeRef('RARITY.LEGENDARY') -> `RARITY.LEGENDARY`. */
export function codeRef(expr) {
    return { __codeRef: expr };
}
function isCodeRef(v) {
    return v && typeof v === 'object' && '__codeRef' in v;
}

/** Строковый литерал в одинарных кавычках с экранированием. */
function printString(s) {
    return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function printKey(k) {
    if (/^\[.+\]$/.test(k)) return k; // вычисляемый ключ, напр. "[STATS.HP]" -> печатаем как есть (без кавычек)
    return IDENT_RE.test(k) ? k : printString(k);
}

/**
 * @param {*} value
 * @param {number} indentLevel — текущий уровень вложенности (для отступов)
 * @param {{ indent?: string }} [opts]
 * @returns {string}
 */
export function printValue(value, indentLevel = 0, opts = {}) {
    const indent = opts.indent ?? '    ';
    const pad = indent.repeat(indentLevel);
    const padIn = indent.repeat(indentLevel + 1);

    if (isCodeRef(value)) return value.__codeRef;
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (typeof value === 'string') return printString(value);

    if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        const allPrimitive = value.every((v) => !v || typeof v !== 'object' || isCodeRef(v));
        const items = value.map((v) => printValue(v, indentLevel + 1, opts));
        if (allPrimitive && items.join(', ').length + pad.length < 100) {
            return `[${items.join(', ')}]`;
        }
        return `[\n${items.map((it) => `${padIn}${it}`).join(',\n')}\n${pad}]`;
    }

    if (typeof value === 'object') {
        const keys = Object.keys(value);
        if (keys.length === 0) return '{}';
        const lines = keys.map((k) => `${padIn}${printKey(k)}: ${printValue(value[k], indentLevel + 1, opts)}`);
        return `{\n${lines.join(',\n')}\n${pad}}`;
    }

    return JSON.stringify(value);
}

/** Печатает объект как тело литерала БЕЗ внешних фигурных скобок (удобно,
 *  когда нужно вставить набор полей внутрь уже существующих скобок при
 *  точечной замене конкретного объекта в файле). */
export function printObjectBody(obj, indentLevel = 0, opts = {}) {
    const full = printValue(obj, indentLevel, opts);
    return full.slice(1, -1).replace(/^\n/, '').replace(/\n[ \t]*$/, '');
}
