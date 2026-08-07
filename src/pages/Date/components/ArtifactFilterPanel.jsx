import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { artifactsData } from '../../../data/artifacts-data';

const ArtifactFilterPanel = ({ initialFilters, onApply, isVisible, onClose }) => {
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
        const resetFilters = { sets: [], rarity: [] };
        setFilters(resetFilters);
        onApply(resetFilters);
        onClose();
    };

    const renderFilterGroup = (title, group, options) => (
        <div className="filter-group f-c">
            <h3 className="ta-l">{t(title)}</h3>
            <div className="filter-options f-r g-2">
                {options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleFilterChange(group, option)}
                        className={`filter-button b-l ${filters[group]?.includes(option) ? 'active' : ''} `}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );

    if (!isVisible) return null;

    const artifactSets = Object.keys(artifactsData.sets);
    const rarities = [...new Set(Object.values(artifactsData.sets).flatMap(s => s.rarity))].map(String);

    return (
        <div className="modal-overlay">
            <aside className="filter-panel br-6 p-3 f-c c-l out-d g-2">
                <header className="filter-panel-header f-r">
                    <h2>{t('filters.title')}</h2>
                    <button className="close-button br-3" onClick={onClose} aria-label={t('buttons.close')}>
                        <svg><use href="#icon-close"></use></svg>
                    </button>
                </header>
                <div className="filter-section f-c">
                    {renderFilterGroup('filters.rarity', 'rarity', rarities)}
                </div>
                <footer className="filter-panel-footer f-r g-2 jc-sb">
                    <button onClick={handleReset} className="button reset secondary-button br-3 p-2 b-l c-l">{t('buttons.reset')}</button>
                    <button onClick={handleApply} className="button apply primary-button br-3 p-2 c-d">{t('buttons.apply')}</button>
                </footer>
            </aside>
        </div>
    );
};

export default ArtifactFilterPanel;
