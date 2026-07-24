import React from 'react';
import { STATS } from '../../../app/stats.js';

/**
 * Сопоставление STATS.* -> id символа в SVG-спрайте (index.html, <use href="#...">),
 * тем же способом, что и остальные иконки проекта (icon-star, icon-crit и т.д.).
 *
 * ВАЖНО: сами символы icon-stat-* в index.html — это ВРЕМЕННЫЕ простые
 * заглушки (не пиксель-арт), только чтобы блок статов/сабстатов не был
 * пустым. Их нужно заменить на нормальные иконки в стиле проекта — id
 * символов подобраны так, чтобы замена делалась только в index.html, без
 * изменений здесь и в EnkaBuildDetail.jsx.
 *
 * Крит. шанс и крит. урон временно используют один и тот же существующий
 * icon-crit — отдельной иконки под крit. урон в спрайте пока нет.
 *
 * Бонусы урона по стихиям используют ОДИН общий символ icon-stat-element,
 * а цвет — через CSS currentColor (var(--pyro)/var(--hydro)/...), чтобы не
 * плодить 7 почти одинаковых иконок-капель.
 */
const STAT_ICON_MAP = {
    [STATS.HP]: { id: 'icon-stat-hp' },
    [STATS.HP_PERCENT]: { id: 'icon-stat-hp' },
    [STATS.ATK]: { id: 'icon-stat-atk' },
    [STATS.ATK_PERCENT]: { id: 'icon-stat-atk' },
    [STATS.DEF]: { id: 'icon-stat-def' },
    [STATS.DEF_PERCENT]: { id: 'icon-stat-def' },
    [STATS.ELEMENTAL_MASTERY]: { id: 'icon-stat-em' },
    [STATS.ENERGY_RECHARGE]: { id: 'icon-stat-er' },
    [STATS.CRIT_RATE]: { id: 'icon-crit' },
    [STATS.CRIT_DMG]: { id: 'icon-crit' },
    [STATS.HEALING_BONUS]: { id: 'icon-stat-heal' },
    [STATS.PHYSICAL_DMG]: { id: 'icon-stat-physical' },
    [STATS.PYRO_DMG]: { id: 'icon-stat-element', color: 'var(--pyro)' },
    [STATS.HYDRO_DMG]: { id: 'icon-stat-element', color: 'var(--hydro)' },
    [STATS.ELECTRO_DMG]: { id: 'icon-stat-element', color: 'var(--electro)' },
    [STATS.CRYO_DMG]: { id: 'icon-stat-element', color: 'var(--cryo)' },
    [STATS.ANEMO_DMG]: { id: 'icon-stat-element', color: 'var(--anemo)' },
    [STATS.GEO_DMG]: { id: 'icon-stat-element', color: 'var(--geo)' },
    [STATS.DENDRO_DMG]: { id: 'icon-stat-element', color: 'var(--dendro)' },
};

/**
 * <svg><use></svg>-иконка стата. Возвращает null для неизвестного/резист-статов
 * (PHYSICAL_RES и т.п.) — для них в карте нарочно нет записи.
 */
export const StatIcon = ({ type, className = '', title }) => {
    const entry = STAT_ICON_MAP[type];
    if (!entry) return null;
    return (
        <svg
            className={`stat-icon${className ? ` ${className}` : ''}`}
            style={entry.color ? { color: entry.color } : undefined}
        >
            {title && <title>{title}</title>}
            <use href={`#${entry.id}`}></use>
        </svg>
    );
};

export default STAT_ICON_MAP;
