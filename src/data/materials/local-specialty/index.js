import { localSpecialtyFontaine } from './fontaine.js';
import { localSpecialtyOther } from './other.js';
import { localSpecialtyNatlan } from './natlan.js';
import { localSpecialtyInazuma } from './inazuma.js';
import { localSpecialtySumeru } from './sumeru.js';
import { localSpecialtyLiyue } from './liyue.js';
import { localSpecialtyMondstadt } from './mondstadt.js';

export const localSpecialty = [
    ...localSpecialtyMondstadt,
    ...localSpecialtyLiyue,
    ...localSpecialtySumeru,
    ...localSpecialtyInazuma,
    ...localSpecialtyNatlan,
    ...localSpecialtyOther,
    ...localSpecialtyFontaine,
];
