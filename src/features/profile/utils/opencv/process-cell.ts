// ============================================================================
// process-cell.ts — обработка ОДНОЙ ячейки инвентаря: слот → контейнер →
// иконка/звёзды/число → материал + количество.
//
// Вынесено из useOcrProcess.ts (было ~190 строк тела цикла внутри
// 442-строчного файла, см. историю в его шапке) в отдельную чистую функцию —
// не трогает React-состояние, принимает всё через аргументы, возвращает
// результат явно. Так можно unit-тестировать разбор одной ячейки без
// монтирования хука и мока всего пайплайна сканирования целиком.
//
// "continue" построчного цикла в useOcrProcess.ts превратился здесь в
// ранний `return { rowLog, match: null }` — вызывающий код (сам цикл) просто
// переходит к следующей итерации, поведение то же самое.
// ============================================================================

import type {
  CvMat,
  TemplateCache,
  DigitTemplateCache,
  SlotRect,
} from '../../types/inventory.types';

import { safeDeleteAll } from './mat-utils';
import { removeBackground } from './background-removal';
import { getColorHistogram } from './histogram';
import { matchIcon } from './template-matching';
import { recognizeQuantityByTemplate } from './digit-matching';
import { goldPixelFraction, MIN_GOLD_FRACTION } from './auto-detection';
import { REGION_DEFAULTS } from './region-calibration';
import { ocrLog } from './ocr-logger';

// БЫЛО: порог `confidence >= 30` от Tesseract. ПРОБЛЕМА (см. реальный лог
// теста): confidence оказался РОВНО 0 во всех 8/8 случаях, где OCR вообще
// дошёл до распознавания — даже там, где текст читался похоже на правду.
// Дальнейшее расследование показало, что сам Tesseract (движок общего
// назначения, обучен на документах) на 32 реальных ячейках с известным
// ответом ни в одной из ~10 проверенных конфигураций (LSTM/legacy/combined,
// 3 разных traineddata, разные PSM) не дал больше 2/32 верных — так что
// дело не в пороге уверенности, а в самом движке для этой задачи. Заменено
// на digit-matching.ts (сравнение с шаблонами символов, как для иконок).
//
// CLEAN_NUMBER_PATTERN — дополнительная проверка поверх digit-matching:
// та уже отсекает совсем неопознанные символы (см. `?` в recognizeQuantity-
// ByTemplate), а этот паттерн ловит валидные-по-набору-символов, но
// странные по ФОРМЕ строки (например несколько точек подряд).
const CLEAN_NUMBER_PATTERN = /^\d{1,3}(\.\d{1,2})?[kK]$|^\d{1,6}$/;

export interface CellMatch {
  materialId: string;
  quantity: number;
}

export interface CellResult {
  /** Строка сводной таблицы для ocrLog.table — заполняется независимо от исхода. */
  rowLog: Record<string, unknown>;
  /** null, если ячейка пропущена/отклонена на любом из этапов. */
  match: CellMatch | null;
}

/**
 * Обрабатывает одну ячейку сетки: вырезает контейнер → иконку/звёзды/число →
 * определяет материал по шаблону иконки и количество по шаблонам цифр.
 *
 * @param slot            прямоугольник ячейки в координатах ИСХОДНОГО скриншота
 * @param index            0-based индекс ячейки (для лога и rowLog['#'])
 * @param totalSlots       общее число ячеек (только для текста ошибки в логе)
 * @param mat              весь скриншот (CvMat), из него вырезается slot.roi()
 * @param templateCache    кэш шаблонов иконок материалов (matchIcon)
 * @param digitTemplateCache кэш шаблонов цифр (recognizeQuantityByTemplate)
 */
export function processCell(
  slot: SlotRect,
  index: number,
  totalSlots: number,
  mat: CvMat,
  templateCache: TemplateCache,
  digitTemplateCache: DigitTemplateCache
): CellResult {
  const SW = mat.cols;
  const SH = mat.rows;
  const matsToClean: CvMat[] = [];
  const rowLog: Record<string, unknown> = {
    '#': index + 1,
    x: Math.round(slot.x),
    y: Math.round(slot.y),
    итог: '—',
  };

  try {
    const sx = Math.max(0, Math.round(slot.x));
    const sy = Math.max(0, Math.round(slot.y));
    const sw = Math.min(Math.round(slot.width), SW - sx);
    const sh = Math.min(Math.round(slot.height), SH - sy);

    if (sw <= 10 || sh <= 10) {
      rowLog.итог = 'слот вне границ изображения';
      return { rowLog, match: null };
    }

    const slotMat = mat.roi(new window.cv.Rect(sx, sy, sw, sh)).clone();
    matsToClean.push(slotMat);

    // Пропускаем тёмные/пустые ячейки
    const brightness = window.cv.mean(slotMat)[2];
    if (brightness < 20) {
      rowLog.итог = `пусто (V=${brightness.toFixed(0)})`;
      return { rowLog, match: null };
    }

    // Регионы внутри ячейки — все проценты из region-calibration.ts (общий
    // источник для этого файла / digit-matching.ts / DigitCalibrationPage.tsx,
    // см. историю дублирования там). Раньше контейнер (8%-92%) обрезал
    // число снизу ДО того, как под-области вообще применялись — проблема
    // была не в процентах внутри контейнера, а в границах самого контейнера.
    const H = slotMat.rows;
    const W = slotMat.cols;
    const bx = Math.round(W * REGION_DEFAULTS.containerXInset);
    const containerTop = Math.round(H * REGION_DEFAULTS.containerTop);
    const containerBottom = Math.round(H * REGION_DEFAULTS.containerBottom);
    const by = containerTop;
    const bw = Math.round(W * REGION_DEFAULTS.containerWidth);
    const bh = containerBottom - containerTop;

    const containerMat = slotMat.roi(new window.cv.Rect(bx, by, bw, bh)).clone();
    matsToClean.push(containerMat);
    const CH = containerMat.rows;

    const iconH = Math.round(CH * REGION_DEFAULTS.iconH);
    const starsY = Math.round(CH * REGION_DEFAULTS.starsY);
    const starsH = Math.round(CH * REGION_DEFAULTS.starsH);
    // Полоса с числом — важно, чтобы калибровка шаблонов (DigitCalibrationPage)
    // и реальный скан резали ячейку ОДИНАКОВО, иначе шаблоны будут
    // сравниваться не с тем, на чём их собирали.
    const numY = Math.round(CH * REGION_DEFAULTS.numY);
    // clamp, а не просто Math.round(CH * REGION_DEFAULTS.numH) — при
    // округлении сумма Y+H может на 1px вылезти за CH (ровно это и ломало
    // калибровку раньше). roi() с прямоугольником за границей Mat кидает
    // исключение, а здесь это привело бы к тому, что КАЖДАЯ ячейка на скане
    // ловила бы ошибку в catch и количество никогда бы не читалось.
    const numH = Math.min(Math.round(CH * REGION_DEFAULTS.numH), CH - numY);
    if (iconH < 10) {
      rowLog.итог = 'ячейка слишком мала (iconH < 10px)';
      return { rowLog, match: null };
    }

    // Проверка "похоже ли это вообще на карточку материала" — делается ДО
    // дорогой обработки иконки (removeBackground, template matching), чтобы
    // не тратить время на заведомый мусор.
    //
    // ЗАЧЕМ: экстраполированная сетка (см. extrapolateGrid в
    // auto-detection.ts) иногда достаёт до соседних UI-элементов — шапки
    // экрана или панели описания предмета справа (проверено на реальном
    // скриншоте — рамки ячеек накладывались на текст описания).
    // Геометрически такие ячейки неотличимы от настоящих, но у КАЖДОЙ
    // настоящей карточки материала есть строка золотых звёзд рейтинга, а у
    // шапки/панели её нет.
    let starsMat: CvMat | null = null;
    if (starsH > 5) {
      starsMat = containerMat
        .roi(new window.cv.Rect(0, starsY, containerMat.cols, starsH))
        .clone();
      matsToClean.push(starsMat);

      const goldFraction = goldPixelFraction(starsMat);
      rowLog.золото = goldFraction.toFixed(3);
      if (goldFraction < MIN_GOLD_FRACTION) {
        rowLog.итог = `не похоже на карточку материала (золото=${goldFraction.toFixed(3)} < ${MIN_GOLD_FRACTION})`;
        return { rowLog, match: null };
      }
    }

    // Определяем редкость по цвету полоски звёзд.
    // ВНИМАНИЕ (уже отмечено в предыдущем аудите): эвристика по среднему
    // цвету чувствительна к JPEG-артефактам и сжатию Telegram при пересылке
    // скриншотов — если рарность определяется неверно, removeBackground
    // пойдёт не по тому пути (HSV/GrabCut). В логах ниже видно, какая
    // рарность была определена на каждой ячейке — если систематически
    // неверно, эти пороги (150/150) стоит подправить под реальные скриншоты.
    let rarity = 1;
    if (starsMat) {
      const meanColor = window.cv.mean(starsMat);
      if (meanColor[0] > 150) rarity = 5; // красноватый = золото
      else if (meanColor[2] > 150) rarity = 4; // синеватый = фиолет
      else rarity = 3;
    }
    rowLog.редкость = rarity;

    // Иконка → удаляем фон → гистограмма + grayscale
    const iconMat = containerMat.roi(new window.cv.Rect(0, 0, containerMat.cols, iconH)).clone();
    matsToClean.push(iconMat);

    const cleanIcon = removeBackground(iconMat, rarity);
    matsToClean.push(cleanIcon);
    if (cleanIcon.empty()) {
      rowLog.итог = 'removeBackground вернул пустой Mat';
      return { rowLog, match: null };
    }

    const iconHist = getColorHistogram(cleanIcon);
    const histSum = iconHist.reduce((a, b) => a + b, 0);
    if (histSum < 0.05) {
      rowLog.итог = `иконка невалидна (гистограмма ${histSum.toFixed(3)})`;
      return { rowLog, match: null };
    }

    const iconGray = new window.cv.Mat();
    window.cv.cvtColor(cleanIcon, iconGray, window.cv.COLOR_RGBA2GRAY);
    matsToClean.push(iconGray);

    // Сравниваем с шаблонами
    const match = matchIcon(iconGray, iconHist, templateCache);
    if (match?.runnerUp) {
      rowLog.второй_кандидат = `${match.runnerUp.id} (${match.runnerUp.score.toFixed(2)})`;
      rowLog.отрыв = (match.score - match.runnerUp.score).toFixed(3);
    }
    if (!match?.isConfident) {
      rowLog.итог = match
        ? `неуверенно (${match.id}, score=${match.score.toFixed(2)})`
        : 'совпадений нет';
      return { rowLog, match: null };
    }
    rowLog.материал = match.id;
    rowLog.score = match.score.toFixed(2);

    // Область количества — полоса на всю ширину контейнера. Раньше (для
    // Tesseract) X сужали до 30-90%, но собственная сегментация
    // digit-matching.ts (segmentGlyphs) уже фильтрует шумовые блоки по форме
    // сама — сужение по X было костылём под Tesseract и мешало бы
    // одинаковости с DigitCalibrationPage (там тоже полная ширина). Берём
    // весь containerMat.cols.
    const numW = containerMat.cols;
    const numX = 0;
    if (numH < 5 || numW < 10) {
      rowLog.итог = 'область числа слишком мала';
      return { rowLog, match: null };
    }

    const numMat = containerMat.roi(new window.cv.Rect(numX, numY, numW, numH)).clone();
    matsToClean.push(numMat);

    const { quantity, text, avgScore } = recognizeQuantityByTemplate(numMat, digitTemplateCache);
    rowLog.ocr_текст = text || '(пусто)';
    rowLog.средний_score = avgScore.toFixed(2);

    if (quantity > 0 && CLEAN_NUMBER_PATTERN.test(text)) {
      rowLog.количество = quantity;
      rowLog.итог = 'принято ✓';
      return { rowLog, match: { materialId: match.id, quantity } };
    }

    rowLog.итог = `отклонено (текст="${text}", qty=${quantity})`;
    return { rowLog, match: null };
  } catch (err) {
    ocrLog.error('slot', `ячейка ${index + 1}/${totalSlots}: необработанная ошибка`, err);
    rowLog.итог = `ошибка: ${String(err)}`;
    return { rowLog, match: null };
  } finally {
    safeDeleteAll(...matsToClean);
  }
}
