import React, { useState, useEffect } from 'react';
import { WEAPON_TYPES, VISIONS } from '../../app/constants';
import { useTranslation } from 'react-i18next';

const FilterPanel = ({ initialFilters, onApply, isVisible, onClose }) => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        if (isVisible) {
            setFilters(initialFilters);
        }
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
        const resetFilters = { rarity: [], vision: [], weapon: [] };
        setFilters(resetFilters);
        onApply(resetFilters);
        onClose();
    };

    const renderFilterGroup = (title, group, options) => (
        <div className="filter-group f-c">
            <h3 className="ta-l m-0" data-i18n-key={`filters.${group}`}>{t(title)}</h3>
            <div className="filter-options f-r g-2">
                {options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleFilterChange(group, option)}
                        className={`filter-button b-l ${filters[group]?.includes(option) ? 'active' : ''} `}>
                        <p className='m-0'>{option}</p>
                    </button>
                ))}
            </div>
        </div>
    );

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <aside className="filter-panel br-6 p-3 f-c c-l out-d g-2 bg-n-b">
                <header className="filter-panel-header f-r">
                    <h2 data-i18n-key="filters.title">{t('filters.title')}</h2>
                    <button className="close-button br-3 c" onClick={onClose} aria-label={t('buttons.close')}>
                        <svg className='c-p'><use href="#close"></use></svg>
                    </button>
                </header>
                <div className="filter-section f-c g-2">
                    {renderFilterGroup('filters.rarity', 'rarity', ['5', '4'])}
                    {renderFilterGroup('filters.vision', 'vision', VISIONS)}
                    {renderFilterGroup('filters.weapon', 'weapon', WEAPON_TYPES)}
                </div>
                <footer className="filter-panel-footer f-r g-2 jc-sb">
                    <button onClick={handleReset} className="button reset secondary-button br-3 p-2 b-l c-p">
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

export default FilterPanel;
