// ============================================================================
// calibration.ts — сохранение и загрузка ручной калибровки сетки
// ============================================================================

import type { GridCalibration } from '../types/inventory.types';
import { ocrLog } from './opencv/ocr-logger';

const STORAGE_KEY = 'inventoryGridCalibration';

/** Допустимое отклонение размера экрана при загрузке калибровки (5%) */
const SCREEN_TOLERANCE = 0.05;

export const saveCalibration = (calibration: GridCalibration): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(calibration));
    ocrLog.info('calibration', 'калибровка сохранена', calibration);
  } catch (e) {
    ocrLog.error('calibration', 'ошибка сохранения', e);
  }
};

/**
 * Загружает калибровку если размер экрана совпадает с сохранённым (±5%).
 * Возвращает null если калибровки нет или экран изменился.
 */
export const loadCalibration = (screenW: number, screenH: number): GridCalibration | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      ocrLog.info('calibration', 'сохранённой калибровки нет в localStorage');
      return null;
    }

    const cal: GridCalibration = JSON.parse(raw);
    const wDiff = Math.abs(cal.screenW - screenW) / screenW;
    const hDiff = Math.abs(cal.screenH - screenH) / screenH;

    if (wDiff < SCREEN_TOLERANCE && hDiff < SCREEN_TOLERANCE) {
      ocrLog.info('calibration', 'найдена подходящая калибровка', cal);
      return cal;
    }

    ocrLog.warn('calibration', `калибровка есть, но экран изменился (было ${cal.screenW}×${cal.screenH}, сейчас ${screenW}×${screenH}) — игнорируем`);
  } catch (e) {
    ocrLog.error('calibration', 'ошибка загрузки/парсинга', e);
  }
  return null;
};

export const clearCalibration = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
