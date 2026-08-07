import React from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    sortableKeyboardCoordinates,
    arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { charactersById } from '../../data/characters/index';
import { weaponsById } from '../../data/weapons/index';
import { resolveIconUrl } from '../../shared/lib/cdnIcon';
import characterIcons from '../../data/cdn/characterIcons.generated.json';

/**
 * PriorityList — единый список приоритетов (персонажи + оружие вместе).
 *
 * props:
 *  saves     — упорядоченный массив объектов сейвов (char и weapon вперемешку).
 *              Каждый элемент ОБЯЗАН нести `_type: 'character' | 'weapon'`
 *              (см. ProfilePage.jsx — allSaves уже проставляет это поле при
 *              сборке списка). Компонент СОЗНАТЕЛЬНО не пытается вывести тип
 *              из формы данных (было: save.ar !== undefined) — такая эвристика
 *              молча ломается при любом изменении компакт-формата, тогда как
 *              родитель уже надёжно знает тип и должен передавать его явно.
 *  onReorder — (newSaves: array) => void — вызывается после drag-and-drop
 *  onRemove  — (saveId: string) => void  — убрать из приоритета
 *  onAdd     — () => void                — открыть список для добавления
 */

const PriorityItem = ({ save, index, onRemove, t, navigate }) => {
    const id = save.i ?? save.ci;
    const type = save._type;

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    if (import.meta.env.DEV && type !== 'character' && type !== 'weapon') {
        // Сигнализируем громко: если это сработало, родитель прислал save
        // без _type — это баг на стороне вызывающего кода, а не повод
        // тихо гадать по форме данных.
        console.error(`[PriorityList] save "${id}" пришёл без корректного _type (получено: ${JSON.stringify(type)}). Родитель обязан проставлять _type в каждом элементе saves.`);
    }

    const item = type === 'character' ? charactersById.get(id) : weaponsById.get(id);
    const name = item
        ? t(`${id}.name`, { ns: type === 'character' ? 'characters' : 'weapons', defaultValue: id })
        : id;
    const avatar = item?.avatar ?? item?.icon;
    const typeIcon = type === 'character' ? '👤' : '⚔️';

    const handleOpen = () => {
        if (type === 'character') navigate(`/characters/${id}/mat`);
        else navigate(`/weapons/${id}/mat`);
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`priority-item border p-2 radius-4${isDragging ? ' dragging' : ''}`}
        >
            {/* Drag handle — attributes/listeners повешены только сюда, а не
                на весь ряд, чтобы клики по ✕/→ не запускали drag (так же
                вело себя dragHandleProps в react-beautiful-dnd версии). */}
            <div
                className="priority-drag-handle"
                {...attributes}
                {...listeners}
                title={t('profile.dragToReorder', 'Перетащи для изменения порядка')}
            >
                ⠿
            </div>

            {/* Номер в приоритете */}
            <div className="priority-rank">{index + 1}</div>

            {/* Аватар */}
            {avatar && (
                <img
                    src={resolveIconUrl({ enkaIconMap: characterIcons }, character.id, character.avatar_icon)}
                    alt={name}
                    className="priority-avatar"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            )}

            {/* Инфо */}
            <div className="priority-info">
                <span className="priority-type-icon">{typeIcon}</span>
                <span className="priority-name">{name}</span>
            </div>

            {/* Кнопки */}
            <div className="priority-actions">
                <button
                    className="priority-btn-open"
                    onClick={handleOpen}
                    title={t('buttons.open')}
                >
                    →
                </button>
                <button
                    className="priority-btn-remove"
                    onClick={() => onRemove(id)}
                    title={t('profile.removeFromPriority', 'Убрать из приоритета')}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

const PriorityList = ({ saves = [], onReorder, onRemove }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // distance-констрейнт на PointerSensor — без него любой клик (в т.ч. по
    // кнопкам открытия/удаления) на touch-устройствах может распознаться
    // как начало drag; 4px — стандартная рекомендация dnd-kit.
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const ids = saves.map((s) => s.i ?? s.ci);
        const oldIndex = ids.indexOf(active.id);
        const newIndex = ids.indexOf(over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        onReorder(arrayMove(saves, oldIndex, newIndex));
    };

    if (saves.length === 0) {
        return (
            <div className="priority-empty">
                <p style={{ opacity: 0.5, textAlign: 'center', padding: '16px 0' }}>
                    {t('profile.priorityEmpty', 'Нет сохранённых сборок. Сохрани сборку на странице улучшения — она появится здесь.')}
                </p>
            </div>
        );
    }

    const ids = saves.map((s) => s.i ?? s.ci);

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <div className="priority-list">
                    {saves.map((save, index) => (
                        <PriorityItem
                            key={save.i ?? save.ci}
                            save={save}
                            index={index}
                            onRemove={onRemove}
                            t={t}
                            navigate={navigate}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default PriorityList;
