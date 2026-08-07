import { anemo } from './anemo.js';
import { electro } from './electro.js';
import { dendro } from './dendro.js';
import { geo } from './geo.js';
import { cryo } from './cryo.js';
import { pyro } from './pyro.js';
import { hydro } from './hydro.js';

/** @type {import('../types.js').Character[]} */
const allCharacters = [
    ...anemo,
    ...electro,
    ...dendro,
    ...geo,
    ...cryo,
    ...pyro,
    ...hydro
];

/**
 * Массив — для списка/фильтрации (CharacterListPage и т.п.), объект-Map —
 * для поиска конкретного персонажа по id (CharacterInfoPage, SaveCard,
 * PriorityList и т.д.). Тот же паттерн, что уже есть у materialsById в
 * data/materials/index.js. При ~100 персонажах .find() по массиву и так
 * незаметен по скорости (см. заметку в проекте) — Map добавлена не ради
 * производительности, а чтобы у поиска по id было единое, явное место,
 * а не N однотипных allCharacters.find(c => c.id === id) по всему проекту.
 * @type {Map<string, import('../types.js').Character>}
 */
export const charactersById = new Map(allCharacters.map((c) => [c.id, c]));

export default allCharacters;