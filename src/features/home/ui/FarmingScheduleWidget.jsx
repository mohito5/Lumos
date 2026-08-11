import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteConfirmationModal from '../../../shared/ui/common/DeleteConfirmationModal';
import { showSaveNotification } from '../../../shared/lib/notifications';
import { useFarmingSchedulePins } from '../lib/hooks/useFarmingSchedulePins';
import { usePinnedFarmingSchedules } from '../lib/hooks/usePinnedFarmingSchedules';
import FarmingDayAccordion from '../../../shared/ui/farming/FarmingDayAccordion';
import './FarmingScheduleWidget.css';

/**
 * Расписание каждого закреплённого персонажа/оружия теперь считается
 * ЖИВЬЁМ при каждом рендере (см. usePinnedFarmingSchedules) из текущей
 * сохранённой сборки и инвентаря — пин хранит только { type, itemId }, а
 * не застывший snapshot. Поэтому виджет всегда актуален, а удаление
 * персонажа/оружия само убирает и его виджет отсюда (запись просто
 * перестаёт находиться и подчищается).
 */
const FarmingScheduleWidget = () => {
    const { t } = useTranslation(['ui', 'notifications']);
    const { removePin } = useFarmingSchedulePins();
    const entries = usePinnedFarmingSchedules();
    const [scheduleToRemove, setScheduleToRemove] = useState(null);

    if (entries.length === 0) return null;

    const handleRemoveClick = (itemId, type, itemName) => setScheduleToRemove({ itemId, type, itemName });

    const confirmRemove = () => {
        if (scheduleToRemove) {
            removePin(scheduleToRemove.type, scheduleToRemove.itemId);
            showSaveNotification(t('scheduleRemoved', { ns: 'notifications' }), 'success');
        }
        setScheduleToRemove(null);
    };

    return (
        <div className="farming-schedule-widget gap-4 flex-c">
            <h2>{t('home.farmingSchedule.title', { ns: 'ui' })}</h2>
            {entries.map((entry) => (
                <div key={`${entry.type}-${entry.itemId}`} className="character-schedule border radius-4 p-3 gap-2 flex-c">
                    <div className='flex gap-2 item-info'>
                        <img loading="lazy" src={`${entry.itemIcon}`} alt="" className="item-icon border radius-1" />
                        <h3 className='border'>{entry.itemName}</h3>
                        <button
                            type="button"
                            onClick={() => handleRemoveClick(entry.itemId, entry.type, entry.itemName)}
                            className="remove-schedule-btn"
                            aria-label={t('buttons.unpin_from_home', { ns: 'ui' })}
                        >
                            &times;
                        </button>
                    </div>
                    <FarmingDayAccordion schedule={entry.schedule} />
                </div>
            ))}
            <DeleteConfirmationModal
                isOpen={scheduleToRemove !== null}
                onClose={() => setScheduleToRemove(null)}
                onConfirm={confirmRemove}
                itemName={scheduleToRemove?.itemName}
                type="schedule"
            />
        </div>
    );
};

export default FarmingScheduleWidget;
