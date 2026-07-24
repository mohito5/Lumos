
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import './modal.css';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    const { t } = useTranslation(['ui']);
    useBodyScrollLock(isOpen);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{t('deleteConfirmation.title')}</h2>
                <p>{t('deleteConfirmation.message', { itemName })}</p>
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
