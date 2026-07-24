// ============================================================================
// ocr-logger.ts — единый логгер OCR-пайплайна
//
// ЗАЧЕМ ОТДЕЛЬНЫЙ МОДУЛЬ:
//   До этого каждый файл писал в консоль как хотел (разные префиксы,
//   разный формат), поэтому по логам было невозможно понять, на каком
//   именно шаге пайплайн замолчал. Теперь весь пайплайн пишет через
//   ocrLog, формат единый: [OCR:стадия] сообщение { данные }.
//
// КАК ЧИТАТЬ ЛОГИ:
//   1. Открыть консоль браузера, отфильтровать по "OCR:"
//   2. [OCR:cv-patch]   — какие константы opencv.js пришлось патчить
//   3. [OCR:templates]  — сколько шаблонов иконок загрузилось/не загрузилось
//   4. [OCR:detect]     — какой уровень детекции сетки сработал (auto/single/fallback/manual)
//   5. [OCR:slot N/M]   — обработка отдельной ячейки (свёрнуто, кликнуть чтобы раскрыть)
//   6. [OCR:summary]    — таблица по всем ячейкам в конце скана (console.table)
//
// OCR_DEBUG = false отключит подробные info/group/table логи, но warn/error
// всегда остаются включены — их не имеет смысла прятать.
// ============================================================================

// OCR_DEBUG завязан на DEV-сборку, а не на ручной флаг — раньше был
// `= true` с комментарием "выключить, когда пайплайн стабилизируется",
// что держится только на том, чтобы не забыть сделать это руками перед
// продовым релизом. import.meta.env.DEV сам становится false в
// production-сборке (npm run build), так что подробные логи автоматически
// не попадут на прод независимо от того, вспомнили об этом или нет.
export const OCR_DEBUG = import.meta.env.DEV;

// unknown, а не Record<string, unknown> — так можно передавать и обычные
// interface-объекты (например GridCalibration), у которых нет index
// signature и которые иначе не проходили бы структурную проверку типов.
type LogData = unknown;

const tag = (stage: string): string => `[OCR:${stage}]`;

export const ocrLog = {
  /** Обычная информация о ходе пайплайна. Отключается через OCR_DEBUG. */
  info(stage: string, msg: string, data?: LogData): void {
    if (!OCR_DEBUG) return;
    if (data !== undefined) console.log(tag(stage), msg, data);
    else console.log(tag(stage), msg);
  },

  /** Что-то пошло не так, но пайплайн продолжает работу (fallback, пропуск). */
  warn(stage: string, msg: string, data?: LogData): void {
    if (data !== undefined) console.warn(tag(stage), msg, data);
    else console.warn(tag(stage), msg);
  },

  /** Настоящая ошибка — всегда видна, даже если OCR_DEBUG = false. */
  error(stage: string, msg: string, err?: unknown): void {
    if (err !== undefined) console.error(tag(stage), msg, err);
    else console.error(tag(stage), msg);
  },

  /** Свёрнутая группа в консоли — удобно для логов одной ячейки. */
  group(stage: string, label: string): void {
    if (!OCR_DEBUG) return;
    console.groupCollapsed(`${tag(stage)} ${label}`);
  },

  groupEnd(): void {
    if (!OCR_DEBUG) return;
    console.groupEnd();
  },

  /** Итоговая таблица — например, по одной строке на каждую ячейку скана.
   *  Сама таблица гасится через OCR_DEBUG, как info/group — раньше этой
   *  проверки тут не было вообще, и таблица печаталась бы даже при
   *  OCR_DEBUG=false. Предупреждение о пустых rows — это warn(), поэтому
   *  видно всегда, независимо от OCR_DEBUG (см. философию warn выше). */
  table(stage: string, label: string, rows: ReadonlyArray<Record<string, unknown>>): void {
    if (rows.length === 0) {
      ocrLog.warn(stage, `${label}: нет строк для таблицы`);
      return;
    }
    if (!OCR_DEBUG) return;
    console.log(tag(stage), label);
    // console.table поддерживается всеми основными браузерами; если вдруг
    // недоступен (очень старый WebView внутри Telegram) — просто выводим JSON.
    if (typeof console.table === 'function') {
      console.table(rows);
    } else {
      console.log(JSON.stringify(rows, null, 2));
    }
  },

  /** Замер времени шага. Использование: const done = ocrLog.time('detect'); ... done(); */
  time(stage: string, label: string): () => void {
    const start = performance.now();
    return () => {
      const ms = Math.round(performance.now() - start);
      ocrLog.info(stage, `${label}: ${ms}мс`);
    };
  },
};
