// ============================================================================
// OcrImportModal.jsx — модалка импорта инвентаря через скриншот
//
// Упрощённый флоу (сетка больше не нужна — авто-детекция):
//   1. Пользователь открывает модалку
//   2. Загружает скриншот (кнопка или drag & drop)
//   3. Нажимает «Сканировать»
//   4. Видит прогресс → результат
// ============================================================================

import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './OcrImportModal.css';

const OcrImportModal = ({
  isOpen,
  onClose,
  onProcess,
  cvLoadingStatus,
  ocrProgress,
  isProcessing,
  selectedFile,
  onFileChange,
  onReset,
}) => {
  const { t } = useTranslation('ui');
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // ── Состояния прогресса ────────────────────────────────────────────────
  const isDone       = !isProcessing && ocrProgress.progress === 100;
  const cvReady      = cvLoadingStatus === 'ready';
  const cvLoading    = cvLoadingStatus === 'loading' || cvLoadingStatus === 'unloaded';
  const cvError      = cvLoadingStatus === 'error';

  const canScan = cvReady && !!selectedFile && !isProcessing;

  // ── Drag & Drop ────────────────────────────────────────────────────────
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragOver(false), []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileChange(file);
    }
  }, [onFileChange]);

  const handleClose = () => {
    if (isProcessing) return;
    onReset?.();
    onClose();
  };

  const handleNewScan = () => {
    onReset?.();
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileChange(null);
  };

  if (!isOpen) return null;

  // ── Содержимое body в зависимости от состояния ─────────────────────────

  const renderBody = () => {
    // OpenCV ещё не загружен
    if (cvLoading) {
      return (
        <div className="cv-loading-notice">
          <div className="ocr-spinner" />
          <p>{t('ocr.cvLoading', 'Загрузка OpenCV...')}</p>
          <p className="cv-loading-note">
            {t('ocr.cvLoadingNote', 'Первая загрузка может занять несколько секунд')}
          </p>
        </div>
      );
    }

    if (cvError) {
      return (
        <div className="cv-loading-notice error">
          <p>{t('ocr.cvError', 'Не удалось загрузить OpenCV. Перезагрузите страницу.')}</p>
        </div>
      );
    }

    // Идёт сканирование
    if (isProcessing) {
      return (
        <div className="ocr-progress-notice">
          <h3>{t('ocr.processing', 'Сканирование...')}</h3>
          <progress value={ocrProgress.progress} max={100} />
          <p>{ocrProgress.status}</p>
        </div>
      );
    }

    // Сканирование завершено
    if (isDone) {
      // БАГ (найден при аудите): здесь был захардкожен `const count = 0`,
      // поэтому строка "Найдено материалов: {{count}}" всегда показывала 0,
      // даже если сканирование реально что-то нашло. Настоящее количество
      // и так корректно приходит в ocrProgress.status из useOcrProcess —
      // убираем дублирующую и неверную строку, оставляем только его.
      return (
        <div className="ocr-progress-notice">
          <h3>{t('ocr.done', 'Готово!')}</h3>
          <progress value={100} max={100} />
          <p className="complete-message">{ocrProgress.status}</p>
          <div className="modal-actions-centered">
            <button className="button-secondary" onClick={handleNewScan}>
              {t('ocr.scanAnother', 'Сканировать другой')}
            </button>
          </div>
        </div>
      );
    }

    // Основной экран — загрузка файла
    return (
      <>
        {/* Описание */}
        <p className="ocr-description">
          {t(
            'ocr.description',
            'Загрузите скриншот экрана материалов из Genshin Impact. ' +
            'Контейнеры материалов будут найдены автоматически.',
          )}
        </p>

        {/* Зона загрузки */}
        <div
          className={`file-input-wrapper${isDragOver ? ' drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            id="ocr-file-input"
            className="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          <label htmlFor="ocr-file-input" className="file-input-label">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            {t('ocr.chooseFile', 'Выбрать файл')}
          </label>

          {selectedFile
            ? <p className="file-name">✓ {selectedFile.name}</p>
            : <p className="file-name">
                {t('ocr.dropHint', 'или перетащите изображение сюда')}
              </p>
          }
        </div>

        {/* Подсказка форматов */}
        <p className="ocr-hint">
          {t('ocr.formats', 'PNG, JPG, WebP — любое разрешение')}
        </p>
      </>
    );
  };

  return (
    <div className="ocr-modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="ocr-modal">
        {/* Шапка */}
        <div className="filter-modal-header">
          <h2>{t('ocr.title', 'Импорт инвентаря')}</h2>
          <button
            className="close-button"
            onClick={handleClose}
            disabled={isProcessing}
            aria-label={t('common.close', 'Закрыть')}
          >
            ×
          </button>
        </div>

        {/* Тело */}
        <div className="filter-modal-body">
          {renderBody()}
        </div>

        {/* Подвал — кнопки действий */}
        {!isDone && (
          <div className="filter-modal-footer">
            <button
              className="button-secondary"
              onClick={handleClose}
              disabled={isProcessing}
            >
              {t('common.cancel', 'Отмена')}
            </button>
            <button
              className="button-primary"
              onClick={onProcess}
              disabled={!canScan}
            >
              {isProcessing
                ? t('ocr.scanning', 'Сканирование...')
                : t('ocr.scan', 'Сканировать')}
            </button>
          </div>
        )}

        {isDone && (
          <div className="filter-modal-footer">
            <button className="button-primary" onClick={handleClose}>
              {t('common.close', 'Закрыть')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OcrImportModal;