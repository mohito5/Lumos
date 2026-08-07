// ============================================================================
// useOcrProcess.ts — хук, оркестрирующий весь OCR-пайплайн
//
// ИЗМЕНЕНО ПРИ АУДИТЕ (июль):
//   1. КРИТИЧНО: раньше вызывался detectSingleContainer — он ищет ОДИН
//      самый крупный квадратный контур (10–90% площади кадра). Для
//      скриншота инвентаря (сетка из десятков мелких иконок) это почти
//      никогда не давало осмысленного результата. Теперь пайплайн работает
//      в три уровня:
//        1) autoDetectContainers — настоящая CV-детекция каждой ячейки
//           (Canny → контуры → кластеризация в сетку). Уже была написана
//           полностью, но нигде не вызывалась.
//        2) detectSingleContainer — на случай, если пользователь загрузил
//           не сетку, а один предмет крупным планом.
//        3) detectSlots + loadCalibration — сохранённая ручная калибровка
//           или примерная сетка 8×5 под типичный инвентарь. Тоже была
//           написана полностью и нигде не подключена.
//   2. КРИТИЧНО: обработка ячейки была написана как один блок с ранними
//      `return` (пропустить тёмную ячейку / нет уверенного совпадения / и
//      т.д.). Внутри цикла по ОДНОЙ ячейке это работало как "выйти из
//      функции", а не "перейти к следующей ячейке" — из-за чего скан
//      молча завершался ДО onComplete()/setStep(100, ...), и модалка
//      просто откатывалась на экран загрузки файла без единой ошибки в
//      логах. Теперь это цикл for со `continue` вместо `return`.
//   3. Подробное логирование на каждом шаге — см. ocr-logger.ts.
//   4. КРИТИЧНО (найдено при тестировании на реальных скриншотах):
//      Tesseract OCR оказался фундаментально ненадёжен для мелкого игрового
//      шрифта — проверено на 32 реальных ячейках с известным правильным
//      ответом, ~10 конфигураций (LSTM/legacy/combined движок, 3 разных
//      traineddata, разные PSM) — максимум 2/32 правильных. Заменено на
//      сравнение с шаблонами символов (та же идея, что уже работает для
//      иконок материалов) — см. digit-matching.ts. Шаблоны собираются один
//      раз через #/dev/digit-calibration, а не скачиваются как шрифт.
// ============================================================================

import { useState, useRef, useCallback } from 'react';
import { showNotification } from '../../../shared/lib/notifications';
import type {
  OcrProgress,
  InventoryState,
  TemplateCache,
  DigitTemplateCache,
  GridDetectionMethod,
  GridCalibration,
  MaterialItem,
  SlotRect,
  CvMat,
} from '../types/inventory.types';

import { loadImageToMat, safeDeleteAll } from '../utils/opencv/mat-utils';
import { detectSlots } from '../utils/opencv/grid-detection';
import { loadTemplates } from '../utils/opencv/template-matching';
import { loadDigitTemplates } from '../utils/opencv/digit-matching';
import { autoDetectContainers, detectSingleContainer } from '../utils/opencv/auto-detection';
import { loadCalibration } from '../utils/calibration';
import { ocrLog } from '../utils/opencv/ocr-logger';
import { processCell } from '../utils/opencv/process-cell';
import { captureError } from '../../../core/services/errorTracking';

interface UseOcrProcessParams {
  allMaterials: MaterialItem[];
  imgRef: React.RefObject<HTMLImageElement>;
  onComplete: (result: InventoryState) => void;
}

interface UseOcrProcessReturn {
  ocrProgress: OcrProgress;
  gridDetectionMethod: GridDetectionMethod;
  isProcessing: boolean;
  /**
   * Сырой результат скана (materialId → количество), ожидающий подтверждения
   * пользователем — см. confirmScan/discardScan. null, пока скан не завершён
   * или уже подтверждён/сброшен.
   *
   * РАНЬШЕ: runOcr вызывал onComplete(result) сразу по завершении цикла
   * обработки ячеек — результат применялся к инвентарю МГНОВЕННО, без
   * возможности проверить/поправить 1-2 неверно распознанных значения
   * (особенно critично для "k"-количеств — см. digit-matching.ts, где
   * calibration для "k"/"K"/"." пока отсутствует, и такие ячейки сейчас
   * просто отклоняются с quantity=0, а не распознаются неверно — но другие
   * ошибки template-matching в принципе возможны). Теперь runOcr
   * останавливается на scanResult, а сохранение в инвентарь — отдельный,
   * явный шаг.
   */
  scanResult: InventoryState | null;
  runOcr: (file: File) => Promise<void>;
  resetProgress: () => void;
  /** Подтверждает результат (возможно, отредактированный пользователем) и сохраняет в инвентарь. */
  confirmScan: (finalResult: InventoryState) => void;
  /** Отклоняет результат без сохранения — например, чтобы отсканировать заново. */
  discardScan: () => void;
}

const INITIAL_PROGRESS: OcrProgress = { progress: 0, status: '' };

export const useOcrProcess = ({
  allMaterials,
  imgRef,
  onComplete,
}: UseOcrProcessParams): UseOcrProcessReturn => {
  const [ocrProgress, setProgress] = useState<OcrProgress>(INITIAL_PROGRESS);
  const [gridMethod, setGridMethod] = useState<GridDetectionMethod>('none');
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResult, setScanResult] = useState<InventoryState | null>(null);

  // Кэш шаблонов живёт между запусками (не сбрасывается при повторном скане)
  const tplCache = useRef<TemplateCache>({});
  const digitTplCache = useRef<DigitTemplateCache>({});

  const setStep = useCallback((progress: number, status: string): void => {
    setProgress({ progress, status });
  }, []);

  const runOcr = useCallback(async (file: File): Promise<void> => {
    // БЫЛО: тихий `return` без лога/уведомления — если imgRef ещё не
    // смонтирован или window.cv не успел загрузиться, пользователь жмёт
    // «Сканировать» и не видит вообще ничего, как будто клик не сработал.
    if (!imgRef.current || !window.cv?.imread) {
      const reason = !imgRef.current ? 'imgRef не готов (модалка не смонтирована?)' : 'window.cv не загружен';
      ocrLog.error('run', `не удалось начать скан: ${reason}`);
      showNotification('OCR ещё не готов, попробуйте через пару секунд', 'error', 4000);
      return;
    }
    setIsProcessing(true);
    setStep(0, 'Запуск...');
    ocrLog.info('run', `старт скана: ${file.name} (${Math.round(file.size / 1024)}KB)`);
    const stopTotalTimer = ocrLog.time('run', 'весь скан целиком');

    const url = URL.createObjectURL(file);
    let mainMat: CvMat | null = null;

    try {
      // ── 1. Загрузка изображения ────────────────────────────────────────
      await new Promise<void>((res, rej) => {
        if (!imgRef.current) return rej(new Error('imgRef не найден'));
        // ПОРЯДОК ВАЖЕН: сначала вешаем обработчики, потом ставим src
        imgRef.current.onload = () => res();
        imgRef.current.onerror = () => rej(new Error('Изображение не загрузилось'));
        imgRef.current.src = url;
      });

      mainMat = await loadImageToMat(imgRef.current);
      // Локальная non-null ссылка: mainMat снаружи остаётся `CvMat | null`
      // (нужен для очистки в finally), а внутри функции удобнее работать
      // с гарантированно не-null значением.
      const mat: CvMat = mainMat;
      const SW = mat.cols;
      const SH = mat.rows;
      ocrLog.info('run', `изображение загружено: ${SW}×${SH}px`);

      // ── 2. Загрузка шаблонов (только если кэш пустой) ─────────────────
      if (Object.keys(tplCache.current).length === 0) {
        setStep(5, 'Загрузка шаблонов иконок...');
        tplCache.current = await loadTemplates(allMaterials, (loaded, total) => {
          setStep(5 + (loaded / total) * 8, `Шаблоны иконок: ${loaded}/${total}`);
        });
      } else {
        ocrLog.info('run', `используем уже загруженный кэш шаблонов иконок (${Object.keys(tplCache.current).length} шт.)`);
      }

      if (Object.keys(digitTplCache.current).length === 0) {
        setStep(13, 'Загрузка шаблонов цифр...');
        digitTplCache.current = await loadDigitTemplates();
      }
      const digitCharsLoaded = Object.keys(digitTplCache.current).length;
      if (digitCharsLoaded === 0) {
        // Не блокируем скан — иконки материалов всё равно можно найти —
        // но количества гарантированно не распознаются, и человек должен
        // понимать причину сразу, а не после скана с нулём результатов.
        ocrLog.error('run', 'шаблоны цифр не загружены — калибровка не проводилась (см. #/dev/digit-calibration)');
        showNotification('Шаблоны цифр не откалиброваны — количества распознаны не будут', 'error', 6000);
      }

      // ── 3. Определение сетки контейнеров (три уровня, см. шапку файла) ─
      setStep(15, 'Поиск контейнеров материалов...');

      let slots: SlotRect[] = autoDetectContainers(mat);
      let method: GridDetectionMethod = slots.length > 0 ? 'auto' : 'none';

      if (slots.length === 0) {
        ocrLog.warn('detect', 'уровень 1 (autoDetectContainers) ничего не нашёл → пробуем уровень 2 (detectSingleContainer)');
        const single = detectSingleContainer(mat);
        if (single) {
          slots = [single];
          method = 'single';
        }
      }

      if (slots.length === 0) {
        ocrLog.warn('detect', 'уровень 2 (detectSingleContainer) тоже пусто → уровень 3 (калибровка/примерная сетка)');
        const calibration: GridCalibration | null = loadCalibration(SW, SH);
        const fallback = detectSlots(SW, SH, calibration);
        slots = fallback.slots;
        method = fallback.method;
      }

      setGridMethod(method);

      if (slots.length === 0) {
        // Такое в теории невозможно, т.к. уровень 3 всегда возвращает
        // непустую сетку, но проверяем на случай будущих изменений.
        ocrLog.error('detect', 'все три уровня детекции вернули пустой список слотов');
        setStep(100, 'Не удалось найти контейнеры материалов на скриншоте.');
        showNotification('Не удалось найти материалы на скриншоте', 'error', 5000);
        return;
      }

      ocrLog.info('detect', `метод детекции: "${method}", ячеек к обработке: ${slots.length}`);

      // ── 4. Обработка всех ячеек ────────────────────────────────────────
      const result: InventoryState = {};
      // Строка сводной таблицы на каждую ячейку — в конце выводим всё разом
      // через console.table, чтобы сразу видеть, где и почему что-то не
      // распозналось, не листая логи по одному.
      const slotLogs: Array<Record<string, unknown>> = [];

      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        const pct = 20 + (i / slots.length) * 75; // 20%..95%
        setStep(pct, `Обработка ячейки ${i + 1}/${slots.length}...`);

        // Вся обработка одной ячейки (слот → контейнер → иконка/звёзды/число
        // → материал+количество) — в process-cell.ts. "continue" построчного
        // цикла превратился там в ранний return { rowLog, match: null } —
        // поведение то же: переходим к следующей ячейке.
        const { rowLog, match } = processCell(slot, i, slots.length, mat, tplCache.current, digitTplCache.current);
        slotLogs.push(rowLog);
        if (match) {
          result[match.materialId] = (result[match.materialId] ?? 0) + match.quantity;
        }
      }

      ocrLog.table('summary', `Итог по ${slots.length} ячейкам (метод: ${method})`, slotLogs);

      setStep(99, 'Завершение...');

      // ── 5. Готово ──────────────────────────────────────────────────────
      // РАНЬШЕ здесь стоял onComplete(result) — сохранение в инвентарь
      // происходило мгновенно, без шанса проверить результат. Теперь: если
      // ничего не найдено — сохранять нечего, репортим как и раньше сразу;
      // если что-то нашли — останавливаемся на scanResult и ждём
      // confirmScan() (см. OcrImportModal.jsx — экран проверки результата).
      const count = Object.keys(result).length;
      ocrLog.info('run', `скан завершён: ${count} материалов найдено из ${slots.length} ячеек`);

      if (count === 0) {
        setStep(100, `Готово. Метод: ${method}. Материалы не найдены (ячеек обработано: ${slots.length}).`);
        showNotification('Сканирование завершено, материалы не найдены', 'info', 4000);
      } else {
        setStep(100, `Готово. Метод: ${method}. Найдено: ${count} видов материалов (ячеек обработано: ${slots.length}).`);
        setScanResult(result);
      }
    } catch (err) {
      ocrLog.error('run', 'критическая ошибка', err);
      captureError(err, { stage: 'useOcrProcess/runOcr' });
      setStep(100, 'Произошла ошибка во время сканирования.');
      showNotification('Ошибка сканирования инвентаря', 'error', 5000);
    } finally {
      stopTotalTimer();
      if (mainMat) safeDeleteAll(mainMat);
      URL.revokeObjectURL(url);
      setIsProcessing(false);
    }
  }, [allMaterials, imgRef, setStep]);

  const resetProgress = (): void => {
    setProgress(INITIAL_PROGRESS);
    setScanResult(null);
  };

  const confirmScan = useCallback((finalResult: InventoryState): void => {
    onComplete(finalResult);
    setScanResult(null);
    const count = Object.keys(finalResult).length;
    showNotification(
      count > 0
        ? `Инвентарь обновлён: ${count} видов материалов`
        : 'Нечего сохранять — все строки были удалены из результата',
      count > 0 ? 'success' : 'info',
      4000,
    );
    ocrLog.info('run', `результат подтверждён пользователем: ${count} материалов сохранено в инвентарь`);
  }, [onComplete]);

  const discardScan = useCallback((): void => {
    ocrLog.info('run', 'результат скана отклонён пользователем без сохранения');
    setScanResult(null);
  }, []);

  return {
    ocrProgress,
    gridDetectionMethod: gridMethod,
    isProcessing,
    scanResult,
    runOcr,
    resetProgress,
    confirmScan,
    discardScan,
  };
};
