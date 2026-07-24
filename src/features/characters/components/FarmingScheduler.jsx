import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { buildFarmingSchedule } from '../../../core/utils/farmingSchedule';
import { useFarmingSchedulePins } from '../../../hooks/useFarmingSchedulePins';
import { showSaveNotification } from '../../../core/utils/notifications';
import FarmingDayAccordion from '../../../components/farming/FarmingDayAccordion';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import './FarmingScheduler.css';

/**
 * Кнопка + модалка расписания фарма материалов персонажа.
 *
 * Раньше категоризация материалов сравнивала info.group (который для книг
 * талантов — МАССИВ, например [TALENT_BOOKS, BOOKS_FREEDOM]) со строковыми
 * константами через === — такое сравнение никогда не совпадает. Плюс сами
 * константы MATERIAL_GROUP.BOSS_DROPS / COMMON_ENEMIES / WEEKLY_BOSSES
 * попросту не существовали (undefined). В сумме все 4 корзины
 * (talentBooks/bossMaterials/enemyMaterials/weeklyBossMaterials) навсегда
 * оставались пустыми — расписание показывало «нет материалов» для любого
 * персонажа в любой день недели.
 *
 * Теперь вся категоризация и раскладка по дням — в общей утилите
 * core/utils/farmingSchedule.js (используется и здесь, и на странице
 * оружия), а отрисовка — в общем FarmingDayAccordion.
 */
const FarmingScheduler = ({ allMaterials, inventory, character, canPin = true }) => {
    const { t } = useTranslation(['characters', 'ui', 'notifications']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isPinned, savePin, removePin } = useFarmingSchedulePins();
    useBodyScrollLock(isModalOpen);

    const schedule = useMemo(
        () => buildFarmingSchedule(allMaterials, inventory),
        [allMaterials, inventory]
    );

    if (!character) return null;

    const pinned = isPinned('character', character.id);
    // Пин хранит только {type, itemId} — usePinnedFarmingSchedules на
    // главной досчитывает расписание из appData.savedChars по itemId. Если
    // сборка ни разу не сохранена, там нечего искать: пин молча схлопнется
    // на ближайшем рендере виджета (см. usePinnedFarmingSchedules), а
    // пользователь так и не поймёт, почему "закреплённое" никогда не
    // появляется на главной. Поэтому закрепление недоступно, пока
    // saveExists === false — кнопка выглядит неактивной, но остаётся
    // кликабельной, чтобы объяснить, что нужно сделать (native disabled
    // здесь не подходит — тогда click вообще не дошёл бы до notification).
    const pinBlocked = !pinned && !canPin;

    const handleTogglePin = () => {
        if (pinned) {
            removePin('character', character.id);
            showSaveNotification(t('scheduleRemoved', { ns: 'notifications' }), 'success');
            return;
        }
        if (!canPin) {
            showSaveNotification(t('scheduleSaveRequired', { ns: 'notifications' }), 'info');
            return;
        }
        // Сохраняется только ссылка {type, itemId} — само расписание
        // виджет на главной посчитает живьём из текущей сборки и
        // инвентаря (см. usePinnedFarmingSchedules), а не из того, что
        // здесь сейчас в schedule.
        savePin('character', character.id);
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
