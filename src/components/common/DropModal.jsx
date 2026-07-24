import React from 'react';
import './modal.css';
import { useTranslation } from 'react-i18next';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

const DropModal = ({ drop, onClose }) => {
  const { t } = useTranslation(['materials', 'ui']);
  useBodyScrollLock(!!drop);

  if (!drop) return null;

  const dropName = t(drop.id + '.name', { ns: 'materials' });
  const dropDescription = t(drop.id + '.description', { ns: 'materials' });

  return (
    <div className="drop-modal-overlay" onClick={onClose}>
      <div className="modal-content drop-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>

        <div className="drop-modal-body">
          <div className="drop-modal-header">
            <div className="drop-image-container">
              <img loading="lazy"
                src={drop.icon}
                alt={dropName}
                className="drop-icon-large"
              />
              <div className="rarity-container">
                {Array(drop.rarity).fill('*').join('')}
              </div>
            </div>
            <div className="drop-modal-info">
              <h2>{dropName}</h2>
            </div>
          </div>

          <div className="drop-modal-description">
            <p>{dropDescription}</p>
          </div>

          {drop.source && (
            <div className="drop-modal-section">
              <h3>{t('modal.source.title', { ns: 'ui' })}</h3>
              <p>{t(drop.source, { ns: 'creatures' })}</p>
            </div>
          )}

          {drop.usage && (
            <div className="drop-modal-section">
              <h3>{t('modal.usage.title', { ns: 'ui' })}</h3>
              <ul>
                {drop.usage.map((use, index) => (
                  <li key={index}>{t(use, { ns: 'ui' })}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropModal;
