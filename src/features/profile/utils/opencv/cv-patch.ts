// ============================================================================
// cv-patch.ts — патч недостающих констант в текущей сборке opencv.js
//
// Проблема: WASM содержит все функции и коды, но JS-обёртка не экспортирует
// числовые значения констант (COLOR_BGR2HSV, THRESH_BINARY и т.д.).
// Это решается простым присвоением стандартных значений из спецификации OpenCV.
//
// НАЙДЕНО ПРИ АУДИТЕ OCR (июль): в public/opencv.js ТАКЖЕ отсутствуют
// TM_* (matchTemplate) и GC_* (grabCut) — их не было в исходном списке ниже,
// хотя template-matching.ts и background-removal.ts на них полагаются.
// Из-за этого matchTemplate(..., cv.TM_CCOEFF_NORMED, ...) реально вызывался
// как matchTemplate(..., undefined, ...) — сравнение иконок либо кидало
// исключение внутри WASM-биндинга, либо считало ерунду. Проверено:
// grep по public/opencv.js на TM_CCOEFF_NORMED/GC_BGD и т.д. — 0 вхождений.
//
// Вызвать ОДИН РАЗ сразу после того как window.cv стал доступен.
// После установки кастомной сборки этот файл не нужен — можно удалить.
// ============================================================================

import { ocrLog } from './ocr-logger';

export const patchCvConstants = (): void => {
    const cv = window.cv;
    if (!cv) return;

    const missing: Record<string, number> = {
        // ── Цветовые конвертации ──────────────────────────────────────────
        COLOR_BGR2BGRA:          0,
        COLOR_BGRA2BGR:          1,
        COLOR_BGR2RGBA:          2,
        COLOR_RGBA2BGR:          3,   // RGBA(4ch) → BGR(3ch)
        COLOR_BGR2RGB:           4,
        COLOR_BGRA2RGBA:         5,
        COLOR_BGR2GRAY:          6,
        COLOR_GRAY2BGR:          8,
        COLOR_BGRA2GRAY:        10,
        // COLOR_RGBA2GRAY      11    ← уже есть в обёртке
        COLOR_BGR2HSV:          40,   // ← главная причина ошибок
        COLOR_RGB2HSV:          41,
        COLOR_HSV2BGR:          54,
        COLOR_HSV2RGB:          55,
        COLOR_BGR2HLS:          52,
        COLOR_RGB2HLS:          53,
        COLOR_HLS2BGR:          60,
        COLOR_HLS2RGB:          61,
        COLOR_BGR2Lab:          44,
        COLOR_RGB2Lab:          45,

        // ── Пороговые операции ────────────────────────────────────────────
        THRESH_BINARY:           0,
        THRESH_BINARY_INV:       1,
        THRESH_TRUNC:            2,
        THRESH_TOZERO:           3,
        THRESH_TOZERO_INV:       4,
        THRESH_OTSU:             8,
        THRESH_TRIANGLE:        16,
        ADAPTIVE_THRESH_MEAN_C:      0,
        ADAPTIVE_THRESH_GAUSSIAN_C:  1,

        // ── Форма структурирующего элемента (getStructuringElement) ───────
        MORPH_RECT:              0,
        MORPH_CROSS:             1,
        MORPH_ELLIPSE:           2,

        // ── Морфологические операции (morphologyEx) ───────────────────────
        MORPH_ERODE:             0,
        MORPH_DILATE:            1,
        MORPH_OPEN:              2,
        MORPH_CLOSE:             3,
        MORPH_GRADIENT:          4,
        MORPH_TOPHAT:            5,
        MORPH_BLACKHAT:          6,

        // ── Режимы поиска контуров (findContours) ─────────────────────────
        RETR_EXTERNAL:           0,   // только внешние контуры
        RETR_LIST:               1,
        RETR_CCOMP:              2,
        RETR_TREE:               3,

        // ── Аппроксимация контуров ────────────────────────────────────────
        CHAIN_APPROX_NONE:       1,
        CHAIN_APPROX_SIMPLE:     2,   // ← использовать это
        CHAIN_APPROX_TC89_L1:    3,
        CHAIN_APPROX_TC89_KCOS:  4,

        // ── Типы границ ───────────────────────────────────────────────────
        BORDER_CONSTANT:         0,
        BORDER_REPLICATE:        1,
        BORDER_REFLECT:          2,
        BORDER_WRAP:             3,
        BORDER_REFLECT_101:      4,
        BORDER_DEFAULT:          4,   // алиас для REFLECT_101

        // ── Интерполяция (resize) ─────────────────────────────────────────
        INTER_NEAREST:           0,
        INTER_LINEAR:            1,
        INTER_CUBIC:             2,
        INTER_AREA:              3,
        INTER_LANCZOS4:          4,

        // ── Флаги для рисования контуров ─────────────────────────────────
        FILLED:                 -1,
        LINE_4:                  4,
        LINE_8:                  8,
        LINE_AA:                16,

        // ── Template matching (matchTemplate) ──────────────────────────────
        // ОТСУТСТВОВАЛИ ЦЕЛИКОМ в этой сборке — см. комментарий в шапке файла.
        TM_SQDIFF:               0,
        TM_SQDIFF_NORMED:        1,
        TM_CCORR:                2,
        TM_CCORR_NORMED:         3,
        TM_CCOEFF:               4,
        TM_CCOEFF_NORMED:        5,   // ← использует template-matching.ts

        // ── GrabCut ──────────────────────────────────────────────────────
        // ОТСУТСТВОВАЛИ ЦЕЛИКОМ в этой сборке — см. комментарий в шапке файла.
        GC_BGD:                  0,   // точно фон
        GC_FGD:                  1,   // точно объект
        GC_PR_BGD:               2,   // вероятно фон
        GC_PR_FGD:               3,   // вероятно объект
        GC_INIT_WITH_RECT:       0,   // режим инициализации по прямоугольнику
        GC_INIT_WITH_MASK:       1,
        GC_EVAL:                 2,
    };

    // OpenCvInstance — интерфейс с конкретными сигнатурами методов, поэтому
    // прямой `as Record<string, unknown>` TS считает недостаточно
    // "пересекающимся" (что и есть, конкретные сигнатуры функций против
    // unknown) — идём через unknown, как и рекомендует сама ошибка TS.
    const cvBag = cv as unknown as Record<string, unknown>;

    let patched = 0;
    const patchedNames: string[] = [];
    for (const [key, value] of Object.entries(missing)) {
        if (cvBag[key] === undefined) {
            cvBag[key] = value;
            patched++;
            patchedNames.push(key);
        }
    }

    if (patched > 0) {
        ocrLog.info('cv-patch', `добавлено ${patched} недостающих констант`, { patchedNames });
    } else {
        ocrLog.warn('cv-patch', 'ни одна константа не патчилась — сборка opencv.js уже содержит их все?');
    }
};
