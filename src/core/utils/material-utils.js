
// js-o/core/utils/material-utils.js
import { materialsInfo } from '../../data/character-materials-data.js';

// Вспомогательная функция для получения имени материала на нужном языке
export function getMaterialName(materialKey, lang = 'ru') {
  const parts = materialKey.split('.');
  
  if (parts.length === 1) {
    const material = materialsInfo[materialKey];
    if (material && material.name) {
      return material.name[lang] || material.name.ru || materialKey;
    }
  } else if (parts.length === 2) {
    const [category, subKey] = parts;
    const material = materialsInfo[category]?.[subKey];
    if (material && material.name) {
      return material.name[lang] || material.name.ru || materialKey;
    }
  }
  
  return materialKey;
}

// Вспомогательная функция для получения иконки материала
export function getMaterialIcon(materialKey) {
  const parts = materialKey.split('.');
  
  if (parts.length === 1) {
    const material = materialsInfo[materialKey];
    if (material && material.icon) {
      return material.icon;
    }
  } else if (parts.length === 2) {
    const [category, subKey] = parts;
    const material = materialsInfo[category]?.[subKey];
    if (material && material.icon) {
      return material.icon;
    }
  }
  
  return 'assets/unknown.png';
}
