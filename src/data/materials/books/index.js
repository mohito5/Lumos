import { booksOther } from './other.js';
import { booksMondstadt } from './mondstadt.js';
import { booksLiyue } from './liyue.js';
import { booksInazuma } from './inazuma.js';
import { booksSumeru } from './sumeru.js';
import { booksFontaine } from './fontaine.js';

export const books = [
    ...booksMondstadt,
    ...booksLiyue,
    ...booksInazuma,
    ...booksSumeru,
    ...booksFontaine,
    ...booksOther,
];
