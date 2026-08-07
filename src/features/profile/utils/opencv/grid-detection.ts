// ============================================================================
// grid-detection.ts — определение ячеек сетки инвентаря
// ============================================================================

import type { GridCalibration, SlotRect } from '../../types/inventory.types';
import { ocrLog } from './ocr-logger';

interface DetectSlotsResult {
  slots: SlotRect[];
  method: 'manual' | 'fallback';
}

/**
 * Возвращает список ячеек инвентаря на скриншоте размером sw×sh.
 * Сначала пробует ручную калибровку, затем — примерную автоматическую сетку.
 *
 * Автоматические проценты подобраны для типичного 16:9 инвентаря Genshin.
 * Для другого разрешения нужна ручная калибровка.
 */
export const detectSlots = (
  sw: number,
  sh: number,
  calibration: GridCalibration | null,
): DetectSlotsResult => {
  // ── Ручная калибровка ─────────────────────────────────────────────────
  if (calibration) {
    const { startX, startY, slotW, slotH, rows, cols } = calibration;
    const slots: SlotRect[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        slots.push({
          x: startX + c * slotW,
          y: startY + r * slotH,
          width: slotW,
          height: slotH,
        });
      }
    }

    ocrLog.info('detect-grid', `используем сохранённую ручную калибровку: ${rows}×${cols} = ${slots.length} ячеек`, calibration);
    return { slots, method: 'manual' };
  }

  // ── Автоматическая сетка (примерная) ─────────────────────────────────
  const cfg = {
    sx: sw * 0.048,   // отступ слева
    sy: sh * 0.108,   // отступ сверху
    sw: sw * 0.078,   // ширина ячейки
    sh: sh * 0.125,   // высота ячейки
    gx: sw * 0.002,   // горизонтальный зазор
    gy: sh * 0.002,   // вертикальный зазор
    cols: 8,
    rows: 5,
  };

  const slots: SlotRect[] = [];
  for (let r = 0; r < cfg.rows; r++) {
    for (let c = 0; c < cfg.cols; c++) {
      slots.push({
        x: cfg.sx + c * (cfg.sw + cfg.gx),
        y: cfg.sy + r * (cfg.sh + cfg.gy),
        width: cfg.sw,
        height: cfg.sh,
      });
    }
  }

  ocrLog.warn(
    'detect-grid',
    `калибровки нет — используем примерную сетку ${cfg.cols}×${cfg.rows} = ${slots.length} ячеек ` +
    `(подходит только для типичного 16:9 инвентаря; для другого разрешения нужна ручная калибровка)`,
  );
  return { slots, method: 'fallback' };
};
