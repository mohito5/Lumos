import { enemyDropsInazuma } from './inazuma.js';
import { enemyDropsSumeru } from './sumeru.js';
import { enemyDropsCommon } from './common.js';
import { enemyDropsCommonHilichurl } from './common/hilichurl.js';
import { enemyDropsCommonTreasure } from './common/treasure-hoarder.js';
import { enemyDropsCommonSlimes } from './common/slimes.js';
import { enemyDropsCommonFatui } from './common/fatui.js';
import { enemyDropsCommonWhopperflower } from './common/whopperflower.js';

export const enemyDrops = [
    ...enemyDropsCommon,
    ...enemyDropsSumeru,
    ...enemyDropsInazuma,
    ...enemyDropsCommonHilichurl,
    ...enemyDropsCommonTreasure,
    ...enemyDropsCommonSlimes,
    ...enemyDropsCommonFatui,
    ...enemyDropsCommonWhopperflower
];
