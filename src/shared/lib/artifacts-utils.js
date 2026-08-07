
// js-o/core/utils/artifacts-utils.js
import { artifactsData } from '../../data/artifacts-data.js';

// Функция для получения главной статы по уровню
export function getArtifactStatByLevel(slot, stat, level) {
  return artifactsData.getMainStatByLevel(slot, stat, level);
}

// Функция для расчета субстата
export function getSubstatValue(substatType, upgrades = 0, rollIndex = 0) {
  return artifactsData.calculateSubstatValue(substatType, upgrades, rollIndex);
}

// Возможные уровни артефактов
export function getArtifactLevels() {
  return artifactsData.artifactLevels;
}

// Максимальное количество субстатов
export function getMaxSubstats() {
  return artifactsData.maxSubstats;
}

// Возможные значения одного апгрейда (roll) для каждого субстата
export function getPossibleRolls(substatType) {
    const substat = artifactsData.substatValues[substatType];
    if (!substat) return [];
    
    return substat.increments.map((value, index) => ({
      value: value,
      index: index,
      display: substatType.includes('%') ? 
        `${value.toFixed(1)}%` : 
        Math.round(value)
    }));
  }
