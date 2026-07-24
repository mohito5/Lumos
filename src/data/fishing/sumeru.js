import { RARITY, DIFFICULTY, BAIT_TYPE, REGION } from '../../app/constants';

export const sumeruFishes = [
  {
    id: 'peach_of_the_deep_waves',
    rarity: RARITY.RARE,
    locations: {
      [REGION.SUMERU]: ['yazadaha_pond', 'apam_woods', 'cinamongomery_palace'],
    },
    bait: BAIT_TYPE.FRUIT_PASTE,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'lazurite_herring',
    rarity: RARITY.RARE,
    locations: {
        [REGION.SUMERU]: ['yazadaha_pond', 'apam_woods', 'chinvat_ravine']
    },
    bait: BAIT_TYPE.FALSE_WORM,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'halcyon_jade_axe_marlin',
    rarity: RARITY.LEGENDARY,
    locations: {
        [REGION.SUMERU]: ['chinvat_ravine', 'devantaka_mountains_north']
    },
    bait: BAIT_TYPE.RAIN_WORM,
    difficulty: DIFFICULTY.HARD,
  },
  {
    id: 'sunset_cloud_angler',
    rarity: RARITY.RARE,
    locations: {
        [REGION.SUMERU]: ['apam_woods', 'chinvat_ravine']
    },
    bait: BAIT_TYPE.SUGARDU,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'sandstorm_angler',
    rarity: RARITY.RARE,
    locations: {
        [REGION.SUMERU]: ['desert_oasis', 'eye_of_the_sands'],
    },
    bait: BAIT_TYPE.SUGARDU,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'true_fruit_angler',
    rarity: RARITY.LEGENDARY,
    locations: {
        [REGION.SUMERU]: ['apam_woods_lake', 'chinvat_ravine_waterfall']
    },
    bait: BAIT_TYPE.SUGARDU,
    difficulty: DIFFICULTY.HARD,
  }
];
