import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFilterPanel } from '../../context/ButtonManagerContext';

import '../../assets/styles/tooltip.css'

/**
 * Значок сброса рядом с иконкой фильтра — раньше был на мёртвом
 * areFiltersActive()/setFilters (см. историю в ButtonManagerContext.jsx),
 * теперь на реально работающих hasActiveFilters/resetFilters: страница
 * сама регистрирует, активны ли у неё сейчас фильтры и как их сбросить
 * (см. registerFiltersReset в CharacterListPage.jsx и аналогичных).
 *
 * stopPropagation на клике по значку сброса — обязателен: значок лежит
 * внутри той же кнопки, что открывает панель фильтров, и без остановки
 * всплытия клик одновременно и сбросил бы фильтры, и открыл/закрыл панель.
 */
const FilterButton = () => {
    const { t } = useTranslation('ui');
    const { toggleFilterPanel, isFilterPanelVisible, hasActiveFilters, resetFilters } = useFilterPanel();

    // The button has 'f-c' which is a flex container, so items will appear in a row.
    const buttonClasses = [
        'button tooltip f-c p-2 b br-4 bg-bl',
        isFilterPanelVisible ? 'active' : ''
    ].filter(Boolean).join(' ');

    const handleReset = (e) => {
        e.stopPropagation();
        resetFilters();
    };

    return (
        <button 
            className={buttonClasses} 
            onClick={toggleFilterPanel}
            aria-label={t('ui:buttons.filterTooltip')}
        >
            <svg className='i c-p'><use href="#icon-filter"></use></svg>
            <span className='tooltip-text bg-bl br-4 p-1'><p className='m-0 c-p'>{t('ui:buttons.filterTooltip')}</p></span>

            {hasActiveFilters && (
                <div className="tooltip filter-reset-icon" onClick={handleReset}>
                    <svg className='c-p'><use href="#icon-close-mini"></use></svg>
                    <span className='tooltip-text bg-bl br-4 p-1'>
                        <p className='m-0 c-p'>{t('ui:buttons.resetTooltip')}</p>
                    </span>
                </div>
            )}
        </button>
    );
};

export default FilterButton;
