import { RARITY, DIFFICULTY, BAIT_TYPE, REGION } from "../../shared/config/constants.js";


export const chasmFishes = [
  {
    id: 'divda_ray',
    rarity: RARITY.RARE,
    locations: {
      [REGION.THE_CHASM]: ['underground_mines_main_shaft', 'glowing_narrows'],
    },
    bait: BAIT_TYPE.FRUIT_PASTE,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'formalhaut_ray',
    rarity: RARITY.RARE,
    locations: {
        [REGION.THE_CHASM]: ['underground_mines_main_shaft', 'glowing_narrows_deep']
    },
    bait: BAIT_TYPE.FALSE_WORM,
    difficulty: DIFFICULTY.MEDIUM,
  }
];
