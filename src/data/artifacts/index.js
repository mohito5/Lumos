
// Import all artifact set groups
import { bossDrops } from './boss_drops.js';
import { domainMondstadtLiyue } from './domain_mondstadt_liyue.js';
import { domainInazuma } from './domain_inazuma.js';
import { domainSumeru } from './domain_sumeru.js';
import { domainFontaine } from './domain_fontaine.js';

// Combine all imported sets into a single array
const allArtifactSets = [
  ...bossDrops,
  ...domainMondstadtLiyue,
  ...domainInazuma,
  ...domainSumeru,
  ...domainFontaine,
];

export default allArtifactSets;
