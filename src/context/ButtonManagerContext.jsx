import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';

/**
 * Раньше это был один контекст на пять кусков состояния: buttonType,
 * backPath, isFilterPanelVisible + мёртвые characterFilters/weaponFilters
 * (см. ниже). value пересоздавался новым объектом на каждый рендер
 * провайдера, поэтому ЛЮБОЕ изменение (даже просто открыть/закрыть панель
 * фильтров) ре-рендерило вообще всех подписчиков — включая BackButton и
 * ActionButtons, которые buttonType/isFilterPanelVisible вместе не читают
 * никогда, а смонтированы (через Header/HeaderActions) на всё время жизни
 * приложения, а не на одну страницу.
 *
 * Разделено на два контекста по фактической частоте изменения:
 *   - NavChromeContext    — buttonType/backPath, меняются при переходах
 *     между страницами (каждая страница выставляет их в useEffect на
 *     монтировании).
 *   - FilterPanelContext  — isFilterPanelVisible, меняется только пока
 *     пользователь открывает/закрывает панель фильтров текущей страницы,
 *     к навигации отношения не имеет.
 * Плюс оба value теперь мемоизированы — не пересоздаются, если реально
 * ничего не изменилось.
 *
 * characterFilters/weaponFilters/setCharacterFilters/setWeaponFilters/
 * areFiltersActive были убраны в прошлом заходе: единственным местом, где
 * они читались, был src/features/characters/components/header-actions/
 * FilterButton.jsx — файл, который никогда никуда не импортировался
 * (мёртвый код, удалён), а areFiltersActive() из живого FilterButton.jsx
 * вызывался без аргумента и всегда возвращал false. Реальные фильтры на
 * страницах персонажей/оружия/тварей/артефактов/рыбы всегда жили локально
 * в самих страницах и в тот контекст не попадали.
 *
 * hasActiveFilters/registerFiltersReset/resetFilters — новая, на этот раз
 * реально работающая версия той же идеи (значок сброса рядом с иконкой
 * фильтра в шапке). Раз фильтры остаются локальным состоянием каждой
 * страницы (и форма у них у всех разная — rarity/element/weapon у
 * персонажей, rarity/type у оружия и т.д.), это не то состояние, которое
 * можно хранить прямо в контексте — вместо этого страница РЕГИСТРИРУЕТ
 * булev-флаг и функцию сброса, а кнопка в шапке зовёт её не зная, с какой
 * именно страницей сейчас имеет дело.
 */

const NavChromeContext = createContext(null);
const FilterPanelContext = createContext(null);

/** Только шапка: buttonType (какие кнопки показать) и backPath (куда вернуться). */
export const useNavChrome = () => useContext(NavChromeContext);

/** Только видимость модалки фильтров текущей страницы. */
export const useFilterPanel = () => useContext(FilterPanelContext);

export const ButtonManagerProvider = ({ children }) => {
    const [buttonType, setButtonType] = useState(null);
    const [backPath, setBackPath] = useState(null);
    const [isFilterPanelVisible, setFilterPanelVisible] = useState(false);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);
    // Функция сброса — не state с самой функцией (setState(fn) трактует fn как
    // updater), а ref: страница кладёт сюда актуальный на неё сброс при
    // монтировании/смене фильтров, кнопка в шапке зовёт его не зная деталей
    // конкретной страницы (у персонажей/оружия/тварей/артефактов/рыбы разная
    // форма фильтров).
    const filtersResetRef = useRef(null);

    const toggleFilterPanel = useCallback(() => {
        setFilterPanelVisible((prev) => !prev);
    }, []);

    // Явное закрытие (а не toggle) — нужно страницам, чтобы гарантированно
    // прятать панель фильтров при уходе со страницы, не полагаясь на то,
    // каким было isFilterPanelVisible в момент монтирования (единственный
    // источник этого значения — общий на всё приложение контекст, поэтому
    // "закрыть, если открыто" в cleanup-эффекте страницы должно опираться
    // на актуальное состояние, а не на снятый при монтировании снимок).
    const closeFilterPanel = useCallback(() => {
        setFilterPanelVisible(false);
    }, []);

    /** Страница вызывает это при монтировании/размонтировании и при каждой
     * смене своей функции сброса. Передать null — снять регистрацию. */
    const registerFiltersReset = useCallback((fn) => {
        filtersResetRef.current = fn;
    }, []);

    /** Кнопка-фильтр в шапке вызывает это по клику на маленькую иконку
     * закрытия — без открытия самой панели фильтров. */
    const resetFilters = useCallback(() => {
        filtersResetRef.current?.();
    }, []);

    const navChromeValue = useMemo(() => ({
        buttonType,
        setButtonType,
        backPath,
        setBackPath,
    }), [buttonType, backPath]);

    const filterPanelValue = useMemo(() => ({
        isFilterPanelVisible,
        toggleFilterPanel,
        closeFilterPanel,
        hasActiveFilters,
        setHasActiveFilters,
        registerFiltersReset,
        resetFilters,
    }), [isFilterPanelVisible, toggleFilterPanel, closeFilterPanel, hasActiveFilters, registerFiltersReset, resetFilters]);

    return (
        <NavChromeContext.Provider value={navChromeValue}>
            <FilterPanelContext.Provider value={filterPanelValue}>
                {children}
            </FilterPanelContext.Provider>
        </NavChromeContext.Provider>
    );
};
