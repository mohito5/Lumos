// ============================================================================
// OcrImportModal.jsx — модалка импорта инвентаря через скриншот
//
// Флоу (см. аудит, раздел "OCR-сканирование: ожидания пользователя vs
// фактический сценарий" — реализованы все три предложенных варианта разом):
//   1. Пользователь открывает модалку, видит краткую заметку о том, что
//      большой инвентарь можно сканировать по частям (вариант А).
//   2. Загружает скриншот (кнопка или drag & drop), жмёт «Сканировать».
//   3. Видит прогресс.
//   4. Скан найден что-то → ЭКРАН ПРОВЕРКИ результата (вариант С): список
//      найденных материалов с количествами, каждое можно поправить вручную
//      или удалить строку целиком, прежде чем это попадёт в инвентарь —
//      особенно важно, пока "k"-количества ("1.5k" и т.п.) распознаванием
//      ещё не поддерживаются (см. digit-matching.ts) и такие ячейки либо
//      отклоняются целиком, либо (реже) могут быть спутаны с другим числом.
//   5. Подтверждение → сохранено в инвентарь → экран «Готово» с кнопкой
//      «Сканировать ещё» ПРЯМО здесь (вариант B) — не нужно закрывать
//      модалку и открывать её заново, чтобы отсканировать следующую часть
//      инвентаря; плюс кнопка «Закрыть».
// ============================================================================

import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  scanResult,
  allMaterials,
  onConfirmScan,
  onDiscardScan,
}) => {
  const { t } = useTranslation(['ui', 'materials']);
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  // Черновик результата скана — редактируемая копия scanResult (см.
  // useOcrProcess.ts). Живёт локально в модалке: подтверждение/правка
  // количеств — чисто презентационная забота, самому хуку не нужно об этом
  // знать, ему передаётся только финальная версия при confirmScan().
  const [draftRows, setDraftRows] = useState([]);
  // Отдельно от isDone/scanResult — после подтверждения scanResult снова
  // становится null (тот же сигнал, что и у "ничего не найдено"), поэтому
  // нужен свой флаг, чтобы показать именно экран "сохранено", а не
  // провалиться в экран "ничего не найдено".
  const [justSaved, setJustSaved] = useState(false);
  const [justSavedCount, setJustSavedCount] = useState(0);

  // ── Состояния прогресса ────────────────────────────────────────────────
  const isDone       = !isProcessing && ocrProgress.progress === 100;
  const needsReview  = isDone && !justSaved && !!scanResult;
  const cvReady      = cvLoadingStatus === 'ready';
  const cvLoading    = cvLoadingStatus === 'loading' || cvLoadingStatus === 'unloaded';
  const cvError      = cvLoadingStatus === 'error';

  const canScan = cvReady && !!selectedFile && !isProcessing;

  // Синхронизируем черновик, когда приходит новый результат скана.
  useEffect(() => {
    if (scanResult) {
      setDraftRows(Object.entries(scanResult).map(([materialId, quantity]) => ({ materialId, quantity })));
    }
  }, [scanResult]);

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
    onDiscardScan?.();
    onReset?.();
    setJustSaved(false);
    onClose();
  };

  const handleNewScan = () => {
    onDiscardScan?.();
    onReset?.();
    setJustSaved(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileChange(null);
  };

  // ── Экран проверки (вариант C) ──────────────────────────────────────────
  const handleRowQuantityChange = (materialId, value) => {
    const qty = Math.max(0, Number(value) || 0);
    setDraftRows((rows) => rows.map((r) => (r.materialId === materialId ? { ...r, quantity: qty } : r)));
  };

  const handleRemoveRow = (materialId) => {
    setDraftRows((rows) => rows.filter((r) => r.materialId !== materialId));
  };

  const handleConfirmReview = () => {
    const finalResult = draftRows.reduce((acc, r) => {
      if (r.quantity > 0) acc[r.materialId] = r.quantity;
      return acc;
    }, {});
    onConfirmScan?.(finalResult);
    setJustSavedCount(Object.keys(finalResult).length);
    setJustSaved(true);
  };

  const handleDiscardReview = () => {
    onDiscardScan?.();
    handleNewScan();
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

    // Экран проверки результата — вариант C: ничего не применяется в
    // инвентарь, пока пользователь явно не подтвердит (или не поправит
    // 1-2 значения перед этим).
    if (needsReview) {
      return (
        <div className="ocr-review">
          <h3 className="ocr-review-title">
            {t('ocr.reviewTitle', 'Проверьте результат')}
          </h3>
          <p className="ocr-hint ocr-review-hint">
            {t('ocr.reviewHint', 'Поправьте количество там, где OCR ошибся, или удалите лишнюю строку.')}
          </p>
          <ul className="ocr-review-list scrollable-y">
            {draftRows.map(({ materialId, quantity }) => {
              const material = allMaterials?.find((m) => m.id === materialId);
              const name = t(`${materialId}.name`, { ns: 'materials', defaultValue: materialId });
              return (
                <li key={materialId} className="ocr-review-row">
                  {material?.icon && (
                    <img src={material.icon} alt="" className="ocr-review-icon" />
                  )}
                  <span className="ocr-review-name" title={name}>{name}</span>
                  <input
                    type="number"
                    min="0"
                    className="ocr-review-qty"
                    value={quantity}
                    onChange={(e) => handleRowQuantityChange(materialId, e.target.value)}
                    aria-label={t('ocr.reviewQtyLabel', 'Количество')}
                  />
                  <button
                    type="button"
                    className="ocr-review-remove"
                    onClick={() => handleRemoveRow(materialId)}
                    aria-label={t('ocr.reviewRemove', 'Убрать из результата')}
                    title={t('ocr.reviewRemove', 'Убрать из результата')}
                  >
                    ×
                  </button>
                </li>
              );
            })}
            {draftRows.length === 0 && (
              <li className="ocr-review-empty">
                {t('ocr.reviewEmpty', 'Все строки удалены — сохранять нечего.')}
              </li>
            )}
          </ul>
        </div>
      );
    }

    // Сканирование завершено и подтверждено — экран "Готово" с кнопкой
    // "Сканировать ещё" (вариант B), не требующей закрыть модалку заново.
    if (justSaved) {
      return (
        <div className="ocr-progress-notice">
          <h3>{t('ocr.done', 'Готово!')}</h3>
          <progress value={100} max={100} />
          <p className="complete-message">
            {justSavedCount > 0
              ? t('ocr.savedCount', 'Сохранено в инвентарь: {{count}} видов материалов.', { count: justSavedCount })
              : t('ocr.savedNone', 'Ничего не сохранено — все строки были удалены.')}
          </p>
        </div>
      );
    }

    // Скан завершён, но ничего не найдено (нечего проверять/сохранять)
    if (isDone) {
      return (
        <div className="ocr-progress-notice">
          <h3>{t('ocr.done', 'Готово!')}</h3>
          <progress value={100} max={100} />
          <p className="complete-message">{ocrProgress.status}</p>
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
        {/* Вариант A: инвентарь большой — можно сканировать по частям */}
        <p className="ocr-hint ocr-tip">
          {t(
            'ocr.multiPartTip',
            'Инвентарь большой — сканируйте по частям, результаты скана суммируются автоматически.',
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

        {/* Подвал — кнопки действий, разные по состояниям */}
        {!isDone && !needsReview && (
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

        {needsReview && (
          <div className="filter-modal-footer">
            <button className="button-secondary" onClick={handleDiscardReview}>
              {t('ocr.reviewDiscard', 'Отменить')}
            </button>
            <button
              className="button-primary"
              onClick={handleConfirmReview}
              disabled={draftRows.length === 0}
            >
              {t('ocr.reviewConfirm', 'Сохранить в инвентарь')}
            </button>
          </div>
        )}

        {isDone && !needsReview && (
          <div className="filter-modal-footer">
            {/* Вариант B: сканировать следующую часть, не закрывая модалку */}
            <button className="button-secondary" onClick={handleNewScan}>
              {t('ocr.scanAnother', 'Сканировать ещё')}
            </button>
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