import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import DeleteConfirmationModal from './common/DeleteConfirmationModal';
import { useAppStore } from '../store/useAppStore';
import { showSaveNotification } from '../core/utils/notifications';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation(['ui', 'notifications']);
  const setData = useAppStore((state) => state.setData);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  useBodyScrollLock(isOpen);

  if (!isOpen) {
    return null;
  }

  const handleDeleteProfile = () => {
    // Полный сброс профиля — и вручную заданные ник/аватар, и Enka-привязку
    // (если только нужно отвязать Enka, оставив ник/аватар — для этого
    // отдельная кнопка «Отвязать» прямо на странице профиля).
    setData({ userProfile: undefined }, { immediate: true });
    showSaveNotification(t('profile.deleteProfileSuccess', { ns: 'ui' }), 'success');
    setConfirmingDelete(false);
    onClose();
  };

  return (
    <>
      <div className="settings-modal-overlay" onClick={onClose}>
        <div className="settings-modal-content" onClick={e => e.stopPropagation()}>
          <div className="settings-modal-header">
            <h2>{t('settings.title', { ns: 'ui', defaultValue: 'Настройки' })}</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="settings-modal-body">
            <ThemeToggle />
            <div className="settings-danger-zone">
              <button
                type="button"
                className="settings-delete-profile-btn"
                onClick={() => setConfirmingDelete(true)}
              >
                {t('profile.deleteProfileButton', { ns: 'ui', defaultValue: 'Удалить профиль' })}
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={confirmingDelete}
        onClose={() => setConfirmingDelete(false)}
        onConfirm={handleDeleteProfile}
        itemName={t('profile.deleteProfileButton', { ns: 'ui', defaultValue: 'Удалить профиль' })}
      />
    </>
  );
};

export default SettingsModal;
