
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useBodyScrollLock } from '../../lib/hooks/useBodyScrollLock';
import '../../../core/styles/components/modal.css';

/**
 * Единая модалка подтверждения удаления для всего проекта — раньше
 * существовало два разных компонента с этим именем (этот, generic-only, и
 * features/profile/DeleteConfirmationModal.jsx с недостающими i18n-ключами
 * profile.character/profile.weapon — тот второй молча показывал текст
 * ключа вместо перевода). Теперь один компонент, с опциональным type для
 * контекстного текста ("Удалить персонажа?" вместо общего "Удалить X?").
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {() => void} onConfirm
 * @param {string} itemName — имя удаляемой сущности, подставляется в текст
 * @param {'character'|'weapon'|'calculate'|'schedule'|'profile'} [type] —
 *   если не передан или для него нет перевода — используется общий текст
 *   (обратная совместимость, ничего не сломается для будущих вызовов без type)
 */
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName, type }) => {
    const { t } = useTranslation(['ui']);
    useBodyScrollLock(isOpen);

    if (!isOpen) {
        return null;
    }

    const title = type
        ? t(`deleteConfirmation.types.${type}.title`, { defaultValue: t('deleteConfirmation.title') })
        : t('deleteConfirmation.title');
    const message = type
        ? t(`deleteConfirmation.types.${type}.message`, { itemName, defaultValue: t('deleteConfirmation.message', { itemName }) })
        : t('deleteConfirmation.message', { itemName });

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onClose} className="cancel-button">
                        {t('buttons.cancel')}
                    </button>
                    <button onClick={onConfirm} className="confirm-button">
                        {t('buttons.delete')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
