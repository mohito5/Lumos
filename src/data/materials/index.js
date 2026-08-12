import { gems } from './gems.js';
import { vajrada } from './gemstone/vajrada.js';
import { common } from './common.js';
import { enemyDrops } from './enemy-drops.js';
import { books } from './books.js';
import { bossDrops } from './boss-drops.js';
import { localSpecialty } from './local-specialty.js';
import { localSpecialtyMond } from './local-specialty/local-mond.js';
import { enhancementOres } from './enhancement-ores.js';
import { weaponAscension } from './weapon-ascension.js';
import { enemyDropsWeapon } from './enemy-drops-weapon.js';

/** @type {import('./types.ts').Material[]} */
export const materialsData = [
    ...gems,
    ...vajrada,
    ...common,
    ...enemyDrops,
    ...books,
    ...bossDrops,
    ...localSpecialty,
    ...localSpecialtyMond,
    ...enhancementOres,
    ...weaponAscension,
    ...enemyDropsWeapon
];

/** @type {Map<string, import('./types.ts').Material>} */
export const materialsById = new Map(materialsData.map(m => [m.id, m]));