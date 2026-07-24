import { bows } from './bows.js';
import { claymores } from './claymores.js';
import { polearms } from './polearms.js';
import { swords } from './swords.js';
import { weapon_1 } from './weapon_1.js';

/** @type {import('../types.d.ts').Weapon[]} */
const weaponsData = [
    ...bows,
    ...claymores,
    ...polearms,
    ...swords,
    ...weapon_1,
  ];

/**
 * См. комментарий у charactersById в data/characters/index.js — тот же паттерн.
 * @type {Map<string, import('../types.d.ts').Weapon>}
 */
export const weaponsById = new Map(weaponsData.map((w) => [w.id, w]));

export default weaponsData;
