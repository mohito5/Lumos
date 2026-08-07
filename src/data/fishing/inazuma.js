import { RARITY, DIFFICULTY, BAIT_TYPE, REGION } from "../../shared/config/constants.js";

export const inazumaFishes = [
  {
    id: 'glaze_medaka',
    rarity: RARITY.COMMON,
    locations: {
      [REGION.INAZUMA]: ['nazuchi_beach', 'suigetsu_pool', 'sangonomiya_shrine'],
    },
    bait: BAIT_TYPE.FRUIT_PASTE,
    difficulty: DIFFICULTY.EASY,
  },
  {
    id: 'lunged_stickleback',
    rarity: RARITY.RARE,
    locations: {
        [REGION.INAZUMA]: ['nazuchi_beach', 'koseki_village', 'fort_mumei']
    },
    bait: BAIT_TYPE.REDROT,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'purple_shirakodai',
    rarity: RARITY.RARE,
    locations: {
        [REGION.INAZUMA]: ['koseki_village', 'suigetsu_pool', 'sangonomiya_shrine']
    },
    bait: BAIT_TYPE.FALSE_WORM,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'raimei_angelfish',
    rarity: RARITY.LEGENDARY,
    locations: {
        [REGION.INAZUMA]: ['kujou_encampment_shipwreck']
    },
    bait: BAIT_TYPE.FALSE_WORM,
    difficulty: DIFFICULTY.HARD,
  },
  {
    id: 'golden_koi',
    rarity: RARITY.RARE,
    locations: {
        [REGION.INAZUMA]: ['koseki_village', 'suigetsu_pool'],
    },
    bait: BAIT_TYPE.RAIN_WORM,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'bitter_pufferfish',
    rarity: RARITY.RARE,
    locations: {
        [REGION.INAZUMA]: ['nazuchi_beach', 'koseki_village']
    },
    bait: BAIT_TYPE.FAKE_FLY,
    difficulty: DIFFICULTY.MEDIUM,
  }
];
