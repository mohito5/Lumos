
import React from 'react';
import { useTranslation } from 'react-i18next';

const DeleteConfirmationModal = ({ show, onCancel, onConfirm, saveName, type }) => {
    const { t } = useTranslation();

    if (!show) {
        return null;
    }

    return (
        <div className="delete-confirm-modal">
            <div className="delete-modal-content bg-d out-d p-3 br-6 c-l f-c g-2">
                <h2>{t('modals.delete.title')}</h2>
                <p>{t('modals.delete.message', { name: saveName, type: t(`profile.${type}`) })}</p>
                
                <div className="warning-box">
                    <strong>{t('notification.warning')}:</strong> {t('modals.delete.warning')}
                </div>

                <div className="modal-actions f-r g-2 jc-sb">
                    <button onClick={onCancel} className="cancel-btn p-2">{t('buttons.cancel')}</button>
                    <button onClick={onConfirm} className="confirm-btn p-2">{t('buttons.delete')}</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
