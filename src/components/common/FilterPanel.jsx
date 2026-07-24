import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

import '../../assets/styles/modal.css'
import '../../assets/styles/scrollbar.css'

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
      <div className="filter-group f-c g-2" key={group}>
        <h3 className="ta-l">{t(title)}</h3>
        <div className="filter-options f-r g-2">
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleFilterChange(group, option)}
              className={`filter-button b-l br-4 c-p p-2 ${currentFilters.includes(option) ? 'active' : ''}`}>
              <p className='m-0'>{t(`${group}.${option}`, { ns: optionsNamespace || group, defaultValue: option })}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <aside className="filter-panel modal-content br-4 p-3 f-c c-l out-d g-2 bg-bl">
        <header className="filter-panel-header f-r">
          <h2>{t('filters.title')}</h2>
          <button className="close-button br-3 c-p" onClick={onClose} aria-label={t('buttons.close')}>
            <svg className='i-reg'><use href="#icon-close"></use></svg>
          </button>
        </header>
        <div className="filter-section f-c scrollable-y hd">
          {filterConfig.map(renderFilterGroup)}
        </div>
        <footer className="filter-panel-footer f-r g-2 jc-sb">
          <button onClick={handleReset} className="button reset secondary-button br-3 p-2 b-l c-l">
            <p className='m-0'>{t('buttons.reset')}</p>
          </button>
          <button onClick={handleApply} className="button apply primary-button br-3 p-2 c-d">
            <p className='m-0'>{t('buttons.apply')}</p>
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default GenericFilterPanel;
