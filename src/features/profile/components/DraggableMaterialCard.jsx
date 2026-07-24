import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import '../InventoryPage.css';

const DraggableMaterialCard = ({ material, t, i18n, quantity, onQuantityChange }) => {
    // имя через неймспейс materials; ключи вида: { "slime-condensate": { "name": "..." } }
    const materialName = t(`${material.id}.name`, { ns: 'materials', defaultValue: material.id });

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: material.id,
        data: { materialId: material.id },
    });

    const rarityClass = `rarity-${material.rarity}`;
    const iconPath = `/${material.icon}`;

    const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={classNames('material-card b-d br-4 p-2 g-2 f-c', rarityClass, { 'dragging': isDragging })}
        >
            <div className="material-card-body bg-d br-2">
                <img src={iconPath} alt={materialName} className="material-image" loading="lazy" />
            </div>
            <div className="material-card-footer">
                <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) => onQuantityChange(material.id, parseInt(e.target.value, 10) || 0)}
                    // dnd-kit слушает pointerdown на всей карточке (drag на весь
                    // элемент, без отдельной "ручки" — как и было в react-dnd
                    // версии). Без stopPropagation клик по инпуту иногда
                    // перехватывался бы стартом drag вместо фокуса/ввода.
                    onPointerDown={(e) => e.stopPropagation()}
                    className="quantity-input p-1 bg-d"
                />
            </div>
        </div>
    );
};

export default DraggableMaterialCard;
