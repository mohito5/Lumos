import { gems } from './gems/index.js';
import { localSpecialty } from './local-specialty/index.js';
import { enemyDrops } from './enemy-drops/index.js';
import { bossDrops } from './boss-drops/index.js';
import { weeklyBossDrops } from './weekly-boss-drops/index.js';
import { books } from './books/index.js';

import { common } from './common.js';
//import { enemyDrops } from './enemy-drops.js';
//import { enemyCommon } from './enemy-drops/enemy-common.js';
//import { books } from './books.js';
//import { bossDrops } from './boss-drops.js';
import { enhancementOres } from './enhancement-ores.js';
import { weaponAscension } from './weapon-ascension.js';
import { enemyDropsWeapon } from './enemy-drops-weapon.js';

/** @type {import('./types.ts').Material[]} */
export const materialsData = [
    ...gems,
    ...common,
    ...enemyDrops,
    ...books,
    ...bossDrops,
    ...weeklyBossDrops,
    ...localSpecialty,
    ...enhancementOres,
    ...weaponAscension,
    ...enemyDropsWeapon
];

/** @type {Map<string, import('./types.ts').Material>} */
export const materialsById = new Map(materialsData.map(m => [m.id, m]));