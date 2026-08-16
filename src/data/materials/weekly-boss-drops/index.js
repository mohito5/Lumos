import { weeklyBossDropsFontaine } from './fontaine.js';
import { weeklyBossDropsMondstadt } from './mondstadt.js';
import { weeklyBossDropsSumeru } from './sumeru.js';
import { weeklyBossDropsLiyue } from './liyue.js';
import { weeklyBossDropsInazuma } from './inazuma.js';
import { weeklyBossDropsOther } from './other.js';

export const weeklyBossDrops = [
    ...weeklyBossDropsInazuma,
    ...weeklyBossDropsOther,
    ...weeklyBossDropsLiyue,
    ...weeklyBossDropsSumeru,
    ...weeklyBossDropsMondstadt,
    ...weeklyBossDropsFontaine,
];
