import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBodyScrollLock } from '../../lib/hooks/useBodyScrollLock';

import '../../../core/styles/components/scrollbar.css'
import '../../../core/styles/components/modal.css'

const GenericFilterPanel = ({
  initialFilters,
  onApply,
  isVisible,
  onClose,
  filterConfig, // e.g. [{ title: 'filters.rarity', group: 'rarity', options: ['5', '4'] }]
  translationNamespaces = ['ui']
}) => {
  const { t } = useTranslation(translationNamespaces);
  const [filters, setFilters] = useState(initialFilters);
  useBodyScrollLock(isVisible);

  // isVisible остаётся в зависимостях — открытие панели (false → true) всё
  // ещё обязано сбросить локальный черновик к актуальным initialFilters,
  // даже если сам initialFilters с последнего открытия не поменялся (иначе
  // несохранённые правки, брошенные закрытием без Apply, пережили бы
  // повторное открытие). Но раньше здесь был if (isVisible) — из-за него,
  // если initialFilters менялся СНАРУЖИ, пока панель была закрыта, filters
  // не подхватывал новое значение: эффект отрабатывал (isVisible есть в
  // deps), но setFilters внутри if пропускался, и локальное состояние
  // молча расходилось с тем, что панель должна была показать при следующем
  // открытии. Теперь синхронизация ничем не обусловлена — работает и при
  // закрытой панели тоже.
  useEffect(() => {
    setFilters(initialFilters);
  }, [isVisible, initialFilters]);

  const handleFilterChange = (group, value) => {
    setFilters(prevFilters => {
      const newGroupValues = new Set(prevFilters[group]);
      if (newGroupValues.has(value)) {
        newGroupValues.delete(value);
      } else {
        newGroupValues.add(value);
      }
      return { ...prevFilters, [group]: Array.from(newGroupValues) };
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = filterConfig.reduce((acc, conf) => {
      acc[conf.group] = [];
      return acc;
    }, {});
    setFilters(prev => ({ ...prev, ...resetFilters }));
    onApply(resetFilters);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderFilterGroup = (config) => {
    const { title, group, options, optionsNamespace } = config;
    const currentFilters = filters[group] || [];

    return (
      <div className="filter-group f-c gap-2" key={group}>
        <h3 className="ta-l">{t(title)}</h3>
        <div className="filter-options flex-r gap-2">
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleFilterChange(group, option)}
              className={`filter-button radius-2 color-pine p-2 ${currentFilters.includes(option) ? 'active' : ''}`}>
              <span>{t(`${group}.${option}`, { ns: optionsNamespace || group, defaultValue: option })}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="modal overlay" onClick={handleOverlayClick}>
      <aside className=" content-modal radius-4 p-2 flex-c color-pine gap-4 background-bill">
        <header className="filter-panel-header f-r justify-between">
          <h2>{t('filters.title')}</h2>
          <button className="close-button radius-2 c-p flex p-2" onClick={onClose} aria-label={t('buttons.close')}>
            <svg className='icon-mini'><use href="#icon-close-mini"></use></svg>
          </button>
        </header>
        <div className="filter-section flex-c gap-4 scrollable-y hd">
          {filterConfig.map(renderFilterGroup)}
        </div>
        <footer className="filter-panel-footer flex-r gap-2 jc-sb">
          <button onClick={handleReset} className="reset-btn wd radius-2 p-2 border">
            {t('buttons.reset')}
          </button>
          <button onClick={handleApply} className="apply-btn wd radius-2 p-2 border">
            {t('buttons.apply')}
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default GenericFilterPanel;
