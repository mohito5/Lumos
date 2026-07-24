import { RARITY, DIFFICULTY, BAIT_TYPE, REGION } from '../../app/constants';

export const fontaineFishes = [
  {
    id: 'maintenance_mek_initial_configuration',
    rarity: RARITY.RARE,
    locations: {
      [REGION.FONTAINE]: ['fontaine_sewers_north', 'fontaine_sewers_south'],
    },
    bait: BAIT_TYPE.FRUIT_PASTE,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'maintenance_mek_water_body_simulator',
    rarity: RARITY.RARE,
    locations: {
        [REGION.FONTAINE]: ['annapausis_underwater', 'elinnyas_underwater']
    },
    bait: BAIT_TYPE.FALSE_WORM,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'maintenance_mek_situational_control',
    rarity: RARITY.LEGENDARY,
    locations: {
        [REGION.FONTAINE]: ['fontaine_city_outskirts', 'elinnyas_peak']
    },
    bait: BAIT_TYPE.RAIN_WORM,
    difficulty: DIFFICULTY.HARD,
  },
  {
    id: 'streaming_axe_marlin',
    rarity: RARITY.RARE,
    locations: {
        [REGION.FONTAINE]: ['annapausis_west', 'salacia_plain']
    },
    bait: BAIT_TYPE.SUGARDU,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'rippling_heartfeather_bass',
    rarity: RARITY.RARE,
    locations: {
        [REGION.FONTAINE]: ['fontaine_city_waterfront', 'salacia_plain_east'],
    },
    bait: BAIT_TYPE.FAKE_FLY,
    difficulty: DIFFICULTY.MEDIUM,
  }
];
