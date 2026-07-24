import { gems } from './gems.js';
import { common } from './common.js';
import { enemyDrops } from './enemy-drops.js';
import { books } from './books.js';
import { bossDrops } from './boss-drops.js';
import { localSpecialty } from './local-specialty.js';
import { enhancementOres } from './enhancement-ores.js';
import { weaponAscension } from './weapon-ascension.js';
import { enemyDropsWeapon } from './enemy-drops-weapon.js';

/** @type {import('../types.d.ts').Material[]} */
export const materialsData = [
    ...gems,
    ...common,
    ...enemyDrops,
    ...books,
    ...bossDrops,
    ...localSpecialty,
    ...enhancementOres,
    ...weaponAscension,
    ...enemyDropsWeapon
];

/** @type {Map<string, import('./types.d.ts').Material>} */
export const materialsById = new Map(materialsData.map(m => [m.id, m]));