import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { buildFarmingSchedule } from '../../../core/utils/farmingSchedule';
import { useFarmingSchedulePins } from '../../../hooks/useFarmingSchedulePins';
import { showSaveNotification } from '../../../core/utils/notifications';
import FarmingDayAccordion from '../../../components/farming/FarmingDayAccordion';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import '../../characters/components/FarmingScheduler.css';

/**
 * Кнопка + модалка расписания фарма материалов оружия.
 *
 * Логика категоризации/раскладки по дням теперь общая с страницей
 * персонажа (core/utils/farmingSchedule.js) — раньше это был отдельный,
 * слегка отличающийся код прямо в этом файле, и именно такое дублирование
 * дало версии на странице персонажа разъехаться и сломаться независимо.
 * Закрепление на главной теперь идёт через Zustand (useFarmingSchedulePins),
 * а не через localStorage.setItem('farmingSchedules', ...) напрямую.
 */
const FarmingScheduler = ({ allMaterials, inventory, weapon, canPin = true }) => {
    const { t } = useTranslation(['weapons', 'ui', 'notifications']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isPinned, savePin, removePin } = useFarmingSchedulePins();
    useBodyScrollLock(isModalOpen);

    const schedule = useMemo(
        () => buildFarmingSchedule(allMaterials, inventory),
        [allMaterials, inventory]
    );

    if (!weapon) return null;

    const pinned = isPinned('weapon', weapon.id);
    // См. аналогичный комментарий в характерной версии этого компонента:
    // без сохранённой сборки пин ссылается в пустоту и молча схлопывается
    // на главной, поэтому закрепление доступно только при canPin.
    const pinBlocked = !pinned && !canPin;

    const handleTogglePin = () => {
        if (pinned) {
            removePin('weapon', weapon.id);
            showSaveNotification(t('scheduleRemoved', { ns: 'notifications' }), 'success');
            return;
        }
        if (!canPin) {
            showSaveNotification(t('scheduleSaveRequired', { ns: 'notifications' }), 'info');
            return;
        }
        // Сохраняется только ссылка {type, itemId} — само расписание
        // виджет на главной посчитает живьём из текущей сборки и
        // инвентаря (см. usePinnedFarmingSchedules).
        savePin('weapon', weapon.id);
        showSaveNotification(t('scheduleAdded', { ns: 'notifications' }), 'success');
    };

    return (
        <>
            <button type="button" className="farming-scheduler-trigger" onClick={() => setIsModalOpen(true)}>
                {t('materials_page.view_schedule', { ns: 'ui' })}
            </button>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{t('materials_page.farming_schedule', { ns: 'ui' })}</h2>

                        <FarmingDayAccordion schedule={schedule} />

                        <div className="modal-actions">
                            <button
                                type="button"
                                className={`primary${pinBlocked ? ' is-disabled' : ''}`}
                                onClick={handleTogglePin}
                                aria-disabled={pinBlocked}
                            >
                                {pinned
                                    ? t('buttons.unpin_from_home', { ns: 'ui' })
                                    : t('buttons.pin_to_home', { ns: 'ui' })}
                            </button>
                            <button type="button" onClick={() => setIsModalOpen(false)}>
                                {t('buttons.close', { ns: 'ui' })}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FarmingScheduler;
