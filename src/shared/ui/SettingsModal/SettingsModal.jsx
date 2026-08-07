import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import { useAppStore } from '../../lib/store/useAppStore';
import { showSaveNotification } from '../../lib/notifications';
import { useBodyScrollLock } from '../../lib/hooks/useBodyScrollLock';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation(['ui', 'notifications']);
  const resetAll = useAppStore((state) => state.resetAll);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  useBodyScrollLock(isOpen);

  if (!isOpen) {
    return null;
  }

  const handleDeleteProfile = () => {
    // Полный сброс ВСЕХ данных — персонажи/оружие/калькулятор/инвентарь/
    // приоритет/настройки/расписание фарма/библиотека персонажей/профиль
    // (ник/аватар/Enka-привязка). Раньше setData({userProfile: undefined})
    // очищал ТОЛЬКО профиль — setData мёржит патч поверх текущих данных, так
    // что остальные категории просто сохранялись как были. resetAll (см.
    // useAppStore.ts) заменяет appData целиком, ничего не наследуя.
    resetAll();
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
        type="profile"
      />
    </>
  );
};

export default SettingsModal;
