import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getGameDay } from '../../lib/gameDay';
import { ALL_DAYS, getDayItems } from '../../lib/farmingSchedule';
import './FarmingDayAccordion.css';

const DRAG_THRESHOLD_PX = 3;
const SCROLL_STEP_RATIO = 0.8;
const WIDTH_TRANSITION_MS = 380;

const MaterialRow = ({ material }) => {
    const { t } = useTranslation(['ui']);
    return (
        <li className="farming-accordion-material">
            <img loading="lazy" src={`/${material.icon}`} alt="" className="farming-accordion-material-icon" />
            <span className="farming-accordion-material-name">
                {material.name}
                {material.category === 'weeklyBoss' && (
                    <span className="farming-accordion-material-tag">{t('materials_page.weekly_tag')}</span>
                )}
            </span>
            {material.needed != null && (
                <span className="farming-accordion-material-needed">×{material.needed}</span>
            )}
        </li>
    );
};

/**
 * Image accordion для расписания фарма — тот же паттерн раскрытия панелей,
 * что и в EnkaCharacterAccordion (см. features/profile/enka/), только вместо
 * портретов персонажей — дни недели: свёрнутая панель показывает только
 * день (вертикальная подпись), раскрытая — день целиком и список того, что
 * нужно фармить (переиспользует раскладку из buildFarmingSchedule() — этот
 * компонент только отрисовывает результат, как и раньше, одинаково для
 * страницы персонажа, оружия и виджета на главной).
 *
 * Полоса с панелями — обычный overflow-x:auto (скроллится тачем/трекпадом
 * из коробки), поверх него добавлены две вещи, которых у обычного
 * overflow-скролла нет: кнопки-стрелки (появляются только когда контент
 * реально не помещается) и перетаскивание СТРОГО мышью (тач не трогаем —
 * там нативный скролл уже работает и своя реализация только мешала бы).
 */
const FarmingDayAccordion = ({ schedule }) => {
    const { t } = useTranslation(['ui']);
    const todayKey = getGameDay();

    const [activeIndex, setActiveIndex] = useState(() => Math.max(0, ALL_DAYS.indexOf(todayKey)));
    const [hasOverflow, setHasOverflow] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const panelRefs = useRef([]);
    const dragRef = useRef({ active: false, pointerId: null, startX: 0, startScrollLeft: 0, moved: false });

    const updateScrollState = useCallback(() => {
        const el = viewportRef.current;
        if (!el) return;
        const overflow = el.scrollWidth - el.clientWidth > 1;
        setHasOverflow(overflow);
        setCanScrollLeft(el.scrollLeft > 1);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }, []);

    // Наблюдаем и за вьюпортом (внешний ресайз — окно, модалка), и за треком
    // (внутренняя ширина контента — раскрытие/схлопывание панели меняет её,
    // а clientWidth вьюпорта при этом не трогается, ResizeObserver на нём
    // одном такое изменение не поймает).
    useEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport) return undefined;

        updateScrollState();
        const ro = new ResizeObserver(updateScrollState);
        ro.observe(viewport);
        if (track) ro.observe(track);
        return () => ro.disconnect();
    }, [updateScrollState]);

    // Ширина активной панели меняется по CSS-transition, а не мгновенно —
    // пересчитываем ещё раз после его завершения, чтобы кнопки-стрелки и
    // автоскролл к выбранному дню опирались на финальную геометрию.
    useEffect(() => {
        updateScrollState();
        const panel = panelRefs.current[activeIndex];
        panel?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        const id = setTimeout(updateScrollState, WIDTH_TRANSITION_MS);
        return () => clearTimeout(id);
    }, [activeIndex, updateScrollState]);

    const scrollByStep = useCallback((direction) => {
        const el = viewportRef.current;
        if (!el) return;
        el.scrollBy({ left: direction * el.clientWidth * SCROLL_STEP_RATIO, behavior: 'smooth' });
    }, []);

    const handlePointerDown = useCallback((e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        // Начало драга внутри списка материалов раскрытой панели — это попытка
        // проскроллить список ПО ВЕРТИКАЛИ, а не потащить всю полосу дней.
        if (e.target.closest('.farming-accordion-content')) return;
        const el = viewportRef.current;
        if (!el) return;
        dragRef.current = { active: true, pointerId: e.pointerId, startX: e.clientX, startScrollLeft: el.scrollLeft, moved: false };
        el.setPointerCapture(e.pointerId);
        el.classList.add('is-dragging');
    }, []);

    const handlePointerMove = useCallback((e) => {
        const drag = dragRef.current;
        if (!drag.active) return;
        const el = viewportRef.current;
        if (!el) return;
        const dx = e.clientX - drag.startX;
        if (Math.abs(dx) > DRAG_THRESHOLD_PX) drag.moved = true;
        el.scrollLeft = drag.startScrollLeft - dx;
    }, []);

    const endDrag = useCallback((e) => {
        const drag = dragRef.current;
        if (!drag.active) return;
        drag.active = false;
        const el = viewportRef.current;
        if (el) {
            el.classList.remove('is-dragging');
            if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
        }
    }, []);

    const handlePanelClick = useCallback((index) => {
        // Клик, которому предшествовал драг мышью — не выбор дня, а конец скролла.
        if (dragRef.current.moved) return;
        setActiveIndex(index);
    }, []);

    return (
        <div className="farming-accordion-wrap">
            <div className="farming-accordion-controls">
                {hasOverflow && (
                    <button
                        type="button"
                        className="farming-accordion-nav-btn prev"
                        onClick={() => scrollByStep(-1)}
                        disabled={!canScrollLeft}
                        aria-label={t('materials_page.scroll_prev')}
                    >
                        <svg className="farming-accordion-nav-icon"><use href="#icon-arrow-back"></use></svg>
                    </button>
                )}

                <div
                    className="farming-accordion-viewport"
                    ref={viewportRef}
                    onScroll={updateScrollState}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onPointerLeave={endDrag}
                >
                    <div className="farming-accordion-track" ref={trackRef} role="tablist" aria-label={t('materials_page.farming_schedule')}>
                        {ALL_DAYS.map((day, index) => {
                            const isActive = index === activeIndex;
                            const isToday = day === todayKey;
                            const items = getDayItems(schedule[day]);

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    ref={(el) => { panelRefs.current[index] = el; }}
                                    className={`farming-accordion-panel${isActive ? ' is-active' : ''}${isToday ? ' is-today' : ''}`}
                                    onClick={() => handlePanelClick(index)}
                                >
                                    <span className="farming-accordion-daylabel">
                                        {t(isActive ? `days.${day}` : `days_short.${day}`)}
                                    </span>
                                    {isToday && <span className="farming-accordion-today-dot" aria-hidden="true" />}

                                    {isActive && (
                                        <div className="farming-accordion-content">
                                            {items.length === 0 ? (
                                                <p className="farming-accordion-empty">{t('materials_page.no_materials_for_this_day')}</p>
                                            ) : (
                                                <ul className="farming-accordion-list">
                                                    {items.map((m) => <MaterialRow key={m.id} material={m} />)}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {hasOverflow && (
                    <button
                        type="button"
                        className="farming-accordion-nav-btn next"
                        onClick={() => scrollByStep(1)}
                        disabled={!canScrollRight}
                        aria-label={t('materials_page.scroll_next')}
                    >
                        <svg className="farming-accordion-nav-icon"><use href="#icon-arrow-back"></use></svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default FarmingDayAccordion;
