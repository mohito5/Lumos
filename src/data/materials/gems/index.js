import { gemsGeo } from './geo.js';
import { gemsHydro } from './hydro.js';
import { gemsPyro } from './pyro.js';
import { gemsDendro } from './dendro.js';
import { gemsCryo } from './cryo.js';
import { gemsElectro } from './electro.js';
import { gemsAnemo } from './anemo.js';

export const gems = [
    ...gemsElectro,
    ...gemsAnemo,
    ...gemsCryo,
    ...gemsDendro,
    ...gemsPyro,
    ...gemsHydro,
    ...gemsGeo,
];
