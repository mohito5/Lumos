import React from 'react';
import { useTranslation } from 'react-i18next';
import EnkaBuildDetail from './EnkaBuildDetail.jsx';
import './EnkaCharacterAccordion.css';

/**
 * Горизонтальный image accordion для выбора персонажа из витрины Enka +
 * полная карточка билда активного персонажа (EnkaBuildDetail, с кнопкой
 * "Скачать PNG") прямо под ним — по месту, без отдельного компонента-соседа
 * где-то ниже на странице.
 *
 * Каждая панель — портрет персонажа. Неактивные панели сжаты до узкой
 * полосы (виден только срез картинки + вертикальное имя), активная —
 * разворачивается и показывает уровень/созвездие поверх портрета.
 *
 * Кликабельно (не только hover) — заменяет исходную плоскую сетку иконок
 * ("витрину"/"стенд" персонажей).
 */
const EnkaCharacterAccordion = ({ items, activeIndex, onSelect }) => {
    const { t } = useTranslation('characters');
    const activeItem = items[activeIndex] ?? null;

    return (
        <div className="enka-accordion-block wd b">
            <div className="enka-accordion b" role="tablist" aria-label="Витрина персонажей">
                {items.map((item, index) => {
                    const isActive = index === activeIndex;
                    const { character, level, constellationCount } = item;
                    const portrait = character?.avatar ?? character?.avatar_icon;
                    const displayName = character ? t(`${character.id}.name`) : `#${item.enkaAvatarId}`;

                    return (
                        <button
                            key={item.enkaAvatarId ?? index}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`enka-accordion-panel${isActive ? ' is-active' : ''}${!character ? ' is-unmapped' : ''}`}
                            onClick={() => onSelect(index)}
                        >
                            {portrait ? (
                                <img src={portrait} alt={displayName} className="enka-accordion-img" loading="lazy" />
                            ) : (
                                <div className="enka-accordion-placeholder">?</div>
                            )}

                            <div className="enka-accordion-scrim" />

                            {constellationCount > 0 && (
                                <span className="enka-accordion-constellation">C{constellationCount}</span>
                            )}

                            <span className="enka-accordion-level">Ур. {level}</span>

                            <span className="enka-accordion-name">{displayName}</span>
                            
                        </button>
                    );
                })}
            </div>

            {activeItem && <EnkaBuildDetail build={activeItem} />}
        </div>
    );
};

export default EnkaCharacterAccordion;
