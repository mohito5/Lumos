
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import './InventoryFilterPanel.css';

const InventoryFilterPanel = ({ isOpen, onClose, filters, onFilterChange, categories, rarities }) => {
    const { t } = useTranslation();
    useBodyScrollLock(isOpen);

    // Обрабатывает изменение состояния чекбокса
    const handleCheckboxChange = (group, value) => {
        const newFilters = { ...filters };
        if (!newFilters[group]) {
            newFilters[group] = [];
        }

        const stringValue = String(value);

        // Добавляет или удаляет значение из массива фильтров
        if (newFilters[group].includes(stringValue)) {
            newFilters[group] = newFilters[group].filter(item => item !== stringValue);
        } else {
            newFilters[group].push(stringValue);
        }
        onFilterChange(newFilters);
    };

    if (!isOpen) return null;

    return (
        <div className="filter-modal-overlay">
            <div className="filter-modal">
                <div className="filter-modal-header">
                    <h2>{t('filter.title', 'Filters')}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="filter-modal-body">
                    {/* Секция фильтров по категориям */}
                    <div className="filter-group">
                        <h3>{t('filter.category', 'Category')}</h3>
                        {categories && categories.map(category => (
                            <label key={category}>
                                <input
                                    type="checkbox"
                                    checked={filters.category?.includes(category) || false}
                                    onChange={() => handleCheckboxChange('category', category)}
                                />
                                {t(`filter.categories.${category}`, category)}
                            </label>
                        ))}
                    </div>
                    {/* Секция фильтров по редкости */}
                    <div className="filter-group">
                        <h3>{t('filter.rarity', 'Rarity')}</h3>
                        {rarities && rarities.map(rarity => (
                            <label key={rarity}>
                                <input
                                    type="checkbox"
                                    checked={filters.rarity?.includes(String(rarity)) || false}
                                    onChange={() => handleCheckboxChange('rarity', rarity)}
                                />
                                {'⭐'.repeat(rarity)}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="filter-modal-footer">
                    <button onClick={onClose}>{t('buttons.close', 'Close')}</button>
                </div>
            </div>
        </div>
    );
};

export default InventoryFilterPanel;
