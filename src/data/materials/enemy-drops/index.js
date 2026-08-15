import { enemyDropsInazuma } from './inazuma.js';
import { enemyDropsSumeru } from './sumeru.js';
import { enemyDropsCommon } from './common.js';

export const enemyDrops = [
    ...enemyDropsCommon,
    ...enemyDropsSumeru,
    ...enemyDropsInazuma,
];
