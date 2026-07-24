
// ============================================================================
// auto-detection.ts — автоматическое обнаружение контейнеров материалов
//
// Алгоритм (без пользовательской сетки):
//   1. Grayscale → GaussianBlur → Canny (границы)
//   2. findContours → фильтр квадратных регионов одинакового размера
//   3. Кластеризация → инференс сетки → заполнение пропусков
//   4. Сортировка: строка за строкой, слева направо
//
// Требует: cv-patch.ts должен быть применён до вызова этих функций.
// ============================================================================

import type { CvMat, CvMatVector, SlotRect } from '../../types/inventory.types';
import { safeDeleteAll } from './mat-utils';
import { ocrLog } from './ocr-logger';

// ── Вспомогательные функции ───────────────────────────────────────────────

/** Медиана массива чисел */
const median = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    const s = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

/** Группирует числа в кластеры с допуском tolerance */
const cluster = (values: number[], tolerance: number): number[][] => {
    const sorted = [...values].sort((a, b) => a - b);
    const groups: number[][] = [];
    for (const v of sorted) {
        const g = groups.find(gr => Math.abs(gr[gr.length - 1] - v) <= tolerance);
        if (g) g.push(v);
        else groups.push([v]);
    }
    return groups;
};

/** Среднее значение массива */
const avg = (arr: number[]): number =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

/**
 * Достраивает список центров строк/столбцов в обе стороны с уже
 * подтверждённым шагом — покрывает всё видимое изображение, а не только
 * те позиции, где контур реально прошёл фильтры.
 *
 * ЗАЧЕМ (проверено на реальном скриншоте пользователя): не все иконки
 * одинаково хорошо ловятся Canny. У предметов со сложным силуэтом
 * (свитки с бахромой и т.п.) bounding box контура заметно мельче
 * консенсусного размера ячейки — и вся такая строка отсеивается фильтром
 * консистентности размера на предыдущем шаге. Но раз шаг сетки уже точно
 * известен по строкам/столбцам, которые распознались уверенно, остальные
 * позиции можно просто досчитать геометрически.
 *
 * Это же автоматически решает вопрос разных соотношений сторон экрана:
 * чем шире картинка при том же вертикальном разрешении — тем больше
 * столбцов будет достроено вправо, без каких-либо допущений о конкретном
 * количестве строк/столбцов.
 */
const extrapolateGrid = (
    centers: number[],
    cellHalfSize: number,
    imgSize: number,
    // maxExtra=1 (было 2). На реальном скриншоте пользователя с maxExtra=2
    // экстраполяция по столбцам ДОТЯНУЛАСЬ до правой инфопанели материала
    // (рамки ячеек наложились на текст описания) — предсказанный риск
    // подтвердился на практике, не только в теории. maxExtra=1 всё ещё
    // достаточно, чтобы вернуть единственную реально терявшуюся строку
    // (свитки — контур мельче консенсуса, см. комментарий выше), но короче
    // дотягивается вбок. Полностью риск не убирает — если понадобится
    // больше строк/столбцов, это единственная константа, которую нужно
    // подвинуть, но тогда стоит перепроверить на широких скриншотах, не
    // заезжает ли сетка за пределы реальной области инвентаря.
    maxExtra = 1,
): { centers: number[]; addedBefore: number; addedAfter: number } => {
    const sorted = [...centers].sort((a, b) => a - b);
    if (sorted.length < 2) {
        // Меньше двух точек — шаг посчитать не из чего, оставляем как есть.
        return { centers: sorted, addedBefore: 0, addedAfter: 0 };
    }

    const steps = sorted.slice(1).map((v, i) => v - sorted[i]);
    const step = median(steps);
    if (step <= cellHalfSize) {
        // Аномально маленький шаг (клетки почти слиплись) — не рискуем.
        return { centers: sorted, addedBefore: 0, addedAfter: 0 };
    }

    const result = [...sorted];
    let addedBefore = 0;
    let addedAfter = 0;

    let prev = sorted[0] - step;
    while (prev + cellHalfSize > 0 && addedBefore < maxExtra) {
        result.unshift(prev);
        addedBefore++;
        prev -= step;
    }

    let next = sorted[sorted.length - 1] + step;
    while (next - cellHalfSize < imgSize && addedAfter < maxExtra) {
        result.push(next);
        addedAfter++;
        next += step;
    }

    return { centers: result, addedBefore, addedAfter };
};

// ── Основная функция ──────────────────────────────────────────────────────

/**
 * Автоматически находит все контейнеры материалов на скриншоте.
 * Не требует ручной настройки сетки пользователем.
 *
 * @param src - RGBA Mat скриншота (результат imread)
 * @returns массив SlotRect, отсортированный строка за строкой
 */
export const autoDetectContainers = (src: CvMat): SlotRect[] => {
    if (!src || src.isDeleted() || src.empty()) {
        ocrLog.error('detect-auto', 'на вход пришёл пустой/удалённый Mat');
        return [];
    }

    const SW = src.cols;
    const SH = src.rows;
    ocrLog.info('detect-auto', `старт, размер скриншота ${SW}×${SH}`);
    const done = ocrLog.time('detect-auto', 'autoDetectContainers');

    let gray: CvMat | null = null;
    let blurred: CvMat | null = null;
    let edges: CvMat | null = null;
    let dilated: CvMat | null = null;
    let contours: CvMatVector | null = null;
    let hierarchy: CvMat | null = null;
    let kernel: CvMat | null = null;

    try {
        const cv = window.cv;
        gray     = new cv.Mat();
        blurred  = new cv.Mat();
        edges    = new cv.Mat();
        dilated  = new cv.Mat();
        contours = new cv.MatVector();
        hierarchy = new cv.Mat();

        // ── 1. Предобработка ───────────────────────────────────────────
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
        cv.Canny(blurred, edges, 30, 90);

        kernel = cv.Mat.ones(3, 3, cv.CV_8U);
        cv.dilate(edges, dilated, kernel);

        // ── 2. Поиск контуров ──────────────────────────────────────────
        cv.findContours(dilated, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        const imgArea = SW * SH;
        const MIN_AREA = imgArea * 0.003;
        const MAX_AREA = imgArea * 0.04;
        ocrLog.info('detect-auto', `найдено контуров (сырых): ${contours.size()}`, {
            MIN_AREA: Math.round(MIN_AREA),
            MAX_AREA: Math.round(MAX_AREA),
        });

        // ── 3. Фильтрация прямоугольных регионов ──────────────────────
        const boxes: Array<{ x: number; y: number; w: number; h: number }> = [];
        // Счётчики отсева — чтобы в логе было видно, какой критерий рубит
        // больше всего кандидатов (полезно для подбора порогов под новый
        // тип скриншота).
        const rejected = { area: 0, aspect: 0, fill: 0, margin: 0 };

        for (let i = 0; i < contours.size(); i++) {
            const cnt = contours.get(i);

            const area = cv.contourArea(cnt);
            if (area < MIN_AREA || area > MAX_AREA) {
                rejected.area++;
                continue;
            }

            const rect = cv.boundingRect(cnt);
            const { x, y, width: w, height: h } = rect;
            const ar = w / h;

            if (ar < 0.65 || ar > 1.35) {
                rejected.aspect++;
                continue;
            }

            const fillRatio = area / (w * h);
            if (fillRatio < 0.25) {
                rejected.fill++;
                continue;
            }

            if (x < SW * 0.02 || y < SH * 0.02 ||
                x + w > SW * 0.98 || y + h > SH * 0.98) {
                rejected.margin++;
                continue;
            }

            boxes.push({ x, y, w, h });
        }

        ocrLog.info('detect-auto', `после фильтра прямоугольников: ${boxes.length} кандидатов`, { rejected });

        if (boxes.length < 4) {
            ocrLog.warn('detect-auto', `найдено слишком мало контуров (${boxes.length} < 4) — возвращаем []`, { rejected });
            done();
            return [];
        }

        // ── 4. Находим консенсусный размер ────────────────────────────
        const medW = Math.round(median(boxes.map(b => b.w)));
        const medH = Math.round(median(boxes.map(b => b.h)));
        const tolW = medW * 0.20;
        const tolH = medH * 0.20;

        const filtered = boxes.filter(
            b => Math.abs(b.w - medW) <= tolW && Math.abs(b.h - medH) <= tolH,
        );

        ocrLog.info('detect-auto', `консенсусный размер ячейки: ${medW}×${medH} (допуск ±20%)`, {
            прошло_фильтр: filtered.length,
            отсеяно_по_размеру: boxes.length - filtered.length,
        });

        if (filtered.length < 4) {
            ocrLog.warn('detect-auto', `после фильтрации по размеру осталось ${filtered.length} (< 4) — возвращаем []`);
            done();
            return [];
        }

        // ── 5. Инференс сетки ──────────────────────────────────────────
        const yCenters = filtered.map(b => b.y + b.h / 2).sort((a, b) => a - b);
        const yGroups = cluster(yCenters, medH * 0.5);
        const rowCentersDetected = yGroups.map(g => avg(g)).sort((a, b) => a - b);

        const xCenters = filtered.map(b => b.x + b.w / 2).sort((a, b) => a - b);
        const xGroups = cluster(xCenters, medW * 0.5);
        const colCentersDetected = xGroups.map(g => avg(g)).sort((a, b) => a - b);

        if (rowCentersDetected.length < 1 || colCentersDetected.length < 1) {
            ocrLog.warn('detect-auto', 'rows/cols < 1 после кластеризации — возвращаем []');
            done();
            return [];
        }

        // ── 5b. Достраиваем сетку геометрически (см. комментарий у extrapolateGrid) ─
        const rowResult = extrapolateGrid(rowCentersDetected, medH / 2, SH);
        const colResult = extrapolateGrid(colCentersDetected, medW / 2, SW);
        const rowCenters = rowResult.centers;
        const colCenters = colResult.centers;

        if (rowResult.addedBefore + rowResult.addedAfter + colResult.addedBefore + colResult.addedAfter > 0) {
            ocrLog.info('detect-auto', 'сетка достроена экстраполяцией по уже известному шагу', {
                строк_по_контуру: rowCentersDetected.length,
                строк_достроено: `+${rowResult.addedBefore} сверху / +${rowResult.addedAfter} снизу`,
                столбцов_по_контуру: colCentersDetected.length,
                столбцов_достроено: `+${colResult.addedBefore} слева / +${colResult.addedAfter} справа`,
            });
        }

        const rows = rowCenters.length;
        const cols = colCenters.length;
        ocrLog.info('detect-auto', `итоговая сетка: ${rows} строк × ${cols} столбцов = ${rows * cols} потенциальных ячеек`);

        // ── 6. Строим полную сетку (заполняем пропуски) ────────────────
        const slots: SlotRect[] = [];
        const halfW = Math.round(medW / 2);
        const halfH = Math.round(medH / 2);

        for (const ry of rowCenters) {
            for (const rx of colCenters) {
                const x = Math.max(0, Math.round(rx - halfW));
                const y = Math.max(0, Math.round(ry - halfH));
                const w = Math.min(medW, SW - x);
                const h = Math.min(medH, SH - y);
                if (w > 10 && h > 10) {
                    slots.push({ x, y, width: w, height: h });
                }
            }
        }

        ocrLog.info('detect-auto', `готово: ${slots.length} ячеек построено`);
        done();
        return slots;
    } catch (e) {
        ocrLog.error('detect-auto', 'необработанная ошибка', e);
        done();
        return [];
    } finally {
        safeDeleteAll(gray, blurred, edges, dilated, hierarchy, kernel);
        contours?.delete();
    }
};

/**
 * Detects a single material container in an image.
 *
 * @param src - RGBA Mat of the image
 * @returns a SlotRect for the container, or null if not found
 */
export const detectSingleContainer = (src: CvMat): SlotRect | null => {
    if (!src || src.isDeleted() || src.empty()) {
        ocrLog.error('detect-single', 'на вход пришёл пустой/удалённый Mat');
        return null;
    }

    const SW = src.cols;
    const SH = src.rows;
    ocrLog.info('detect-single', `старт, размер скриншота ${SW}×${SH}`);

    let gray: CvMat | null = null;
    let blurred: CvMat | null = null;
    let edges: CvMat | null = null;
    let dilated: CvMat | null = null;
    let contours: CvMatVector | null = null;
    let hierarchy: CvMat | null = null;
    let kernel: CvMat | null = null;
    // Объявлено здесь (не внутри try), чтобы finally мог освободить клон.
    let bestContour: CvMat | null = null;

    try {
        const cv = window.cv;
        gray = new cv.Mat();
        blurred = new cv.Mat();
        edges = new cv.Mat();
        dilated = new cv.Mat();
        contours = new cv.MatVector();
        hierarchy = new cv.Mat();

        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
        cv.Canny(blurred, edges, 30, 90);
        kernel = cv.Mat.ones(3, 3, cv.CV_8U);
        cv.dilate(edges, dilated, kernel);
        cv.findContours(dilated, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        const imgArea = SW * SH;
        const MIN_AREA = imgArea * 0.1;
        const MAX_AREA = imgArea * 0.9;
        ocrLog.info('detect-single', `найдено контуров: ${contours.size()}`, {
            MIN_AREA: Math.round(MIN_AREA),
            MAX_AREA: Math.round(MAX_AREA),
        });

        let maxArea = 0;

        for (let i = 0; i < contours.size(); i++) {
            const cnt = contours.get(i);
            const area = cv.contourArea(cnt);
            if (area > MIN_AREA && area < MAX_AREA && area > maxArea) {
                const rect = cv.boundingRect(cnt);
                const ar = rect.width / rect.height;
                if (ar > 0.7 && ar < 1.3) {
                    bestContour?.delete();
                    bestContour = cnt.clone();
                    maxArea = area;
                }
            }
        }

        if (bestContour) {
            const rect = cv.boundingRect(bestContour);
            ocrLog.info('detect-single', 'контейнер найден', { rect, areaPct: Math.round((maxArea / imgArea) * 100) });
            return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        } else {
            ocrLog.warn('detect-single', 'подходящий контур не найден (нет квадратного блока 10–90% площади)');
            return null;
        }
    } catch (e) {
        ocrLog.error('detect-single', 'необработанная ошибка', e);
        return null;
    } finally {
        safeDeleteAll(gray, blurred, edges, dilated, hierarchy, kernel, bestContour);
        contours?.delete();
    }
};

// ── Валидация: похоже ли на настоящую карточку материала ──────────────────

/**
 * Доля "золотых" пикселей (цвет звёзд рейтинга) в области.
 *
 * ЗАЧЕМ: экстраполированная сетка (см. extrapolateGrid выше) иногда
 * достаёт до соседних UI-элементов (шапка экрана, панель описания
 * предмета) — геометрически они неотличимы от настоящей ячейки. Но у
 * КАЖДОЙ настоящей карточки материала есть строка золотых звёзд рейтинга,
 * а у шапки/панели её нет. Это дешёвая и специфичная проверка: считаем
 * долю пикселей в HSV-диапазоне золотого/жёлтого цвета звёзд.
 *
 * Диапазон подобран под цвет звёзд Genshin (примерно RGB 255,200,50) —
 * если после реальных тестов звёзды не ловятся, здесь единственное место,
 * которое нужно подправить.
 */
export const goldPixelFraction = (starsMat: CvMat): number => {
    if (!starsMat || starsMat.isDeleted() || starsMat.empty()) return 0;

    let bgr: CvMat | null = null;
    let hsv: CvMat | null = null;
    try {
        const cv = window.cv;
        bgr = new cv.Mat();
        hsv = new cv.Mat();
        cv.cvtColor(starsMat, bgr, cv.COLOR_RGBA2BGR);
        cv.cvtColor(bgr, hsv, cv.COLOR_BGR2HSV);

        const H_LO = 15, H_HI = 35, S_LO = 90, V_LO = 140;
        let goldCount = 0;
        const total = hsv.rows * hsv.cols;
        for (let y = 0; y < hsv.rows; y++) {
            for (let x = 0; x < hsv.cols; x++) {
                const p = hsv.ucharPtr(y, x);
                if (p[0] >= H_LO && p[0] <= H_HI && p[1] >= S_LO && p[2] >= V_LO) {
                    goldCount++;
                }
            }
        }
        return total > 0 ? goldCount / total : 0;
    } catch (e) {
        ocrLog.warn('detect-validate', 'ошибка проверки золотых пикселей', { error: String(e) });
        return 0;
    } finally {
        safeDeleteAll(bgr, hsv);
    }
};

/** Порог доли золотых пикселей, ниже которого ячейка бракуется как "не похоже на карточку материала". */
export const MIN_GOLD_FRACTION = 0.03;
