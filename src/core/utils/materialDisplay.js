import { materialsById } from '../../data/materials/index';
import i18n from '../i18n/i18n-config';

/**
 * В данных материалов исторически сложились две параллельные системы имён:
 *  1. Инлайн `material.localization.{ru,en}.name` — так делают часть
 *     books.js / enhancement-ores.js / local-specialty.js.
 *  2. Отдельный i18next namespace `materials` (src/i18n/materials/**),
 *     ключ = material.id, с вложенным `.name`.
 *
 * Компоненты FarmingScheduler раньше смотрели по пути `ui:materials.<id>`,
 * которого не существует ни в одной из этих систем, поэтому почти всегда
 * получали заглушку — сырой id материала («vayuda_turquoise_sliver» вместо
 * «Осколок бирюзы Вайюда»). Эта функция проверяет оба реальных источника и
 * только в конце красиво форматирует id, если перевода вообще нет нигде.
 */
export function getMaterialDisplayName(materialOrId, lang) {
    const material = typeof materialOrId === 'string'
        ? materialsById.get(materialOrId)
        : materialOrId;

    if (!material) {
        return typeof materialOrId === 'string' ? humanizeMaterialId(materialOrId) : '';
    }

    const currentLang = (lang || i18n.language || 'ru').startsWith('en') ? 'en' : 'ru';

    const inline = material.localization?.[currentLang]?.name;
    if (inline) return inline;

    const translated = i18n.t(`${material.id}.name`, {
        ns: 'materials',
        lng: currentLang,
        defaultValue: '',
    });
    if (translated) return translated;

    return humanizeMaterialId(material.id);
}

function humanizeMaterialId(id) {
    return id
        .replace(/[,_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Короткое название группы домена («Поэзия» вместо «Учения/Руководство/
 * Философия о Поэзии» по отдельности) — для книг талантов есть выделенный
 * словарь groups.json (их конечное число, регионы стабильны). Для доменов
 * материалов оружия такого словаря пока нет (их гораздо больше и они не
 * входят в тот же список), поэтому используется fallback — название
 * первого материала группы (уже корректно переводится через
 * getMaterialDisplayName), лучше показать что-то осмысленное, чем сырой
 * ключ группы вроде "dandelion_gladiator".
 */
export function getGroupDisplayName(groupKey, fallbackMaterial, lang) {
    const currentLang = (lang || i18n.language || 'ru').startsWith('en') ? 'en' : 'ru';
    const translated = i18n.t(`groups.${groupKey}.name`, {
        ns: 'materials',
        lng: currentLang,
        defaultValue: '',
    });
    if (translated) return translated;
    if (fallbackMaterial) return getMaterialDisplayName(fallbackMaterial, currentLang);
    return humanizeMaterialId(groupKey);
}
