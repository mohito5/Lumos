import { bossDropsFontaine } from './fontaine.js';
import { bossDropsMondstadt } from './mondstadt.js';
import { bossDropsSumeru } from './sumeru.js';
import { bossDropsLiyue } from './liyue.js';
import { bossDropsInazuma } from './inazuma.js';
import { bossDropsOther } from './other.js';

export const bossDrops = [
    ...bossDropsInazuma,
    ...bossDropsOther,
    ...bossDropsLiyue,
    ...bossDropsSumeru,
    ...bossDropsMondstadt,
    ...bossDropsFontaine,
];
