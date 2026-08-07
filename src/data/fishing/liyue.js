import { RARITY, DIFFICULTY, BAIT_TYPE, REGION } from "../../shared/config/constants.js";

export const liyueFishes = [
  {
    id: 'medaka',
    rarity: RARITY.COMMON,
    locations: {
      [REGION.LIYUE]: ['dihua_marsh', 'wangshu_inn', 'bishui_river', 'guili_plains', 'mt_hulao'],
    },
    bait: BAIT_TYPE.FRUIT_PASTE,
    difficulty: DIFFICULTY.EASY,
  },
  {
    id: 'sweet_flower_medaka',
    rarity: RARITY.COMMON,
    locations: {
        [REGION.LIYUE]: ['qingce_village', 'dihua_marsh', 'tianqiu_valley']
    },
    bait: BAIT_TYPE.FRUIT_PASTE,
    difficulty: DIFFICULTY.EASY,
  },
  {
    id: 'brown_shirakodai',
    rarity: RARITY.RARE,
    locations: {
        [REGION.LIYUE]: ['wangshu_inn', 'guili_plains', 'luhua_pool']
    },
    bait: BAIT_TYPE.FALSE_WORM,
    difficulty: DIFFICULTY.MEDIUM,
  },
    {
    id: 'abiding_angelfish',
    rarity: RARITY.RARE,
    locations: {
        [REGION.LIYUE]: ['mt_hulao', 'celestial_voyage']
    },
    bait: BAIT_TYPE.FALSE_WORM,
    difficulty: DIFFICULTY.HARD,
  },
  {
    id: 'betta',
    rarity: RARITY.RARE,
    locations: {
        [REGION.LIYUE]: ['luhua_pool', 'tianqiu_valley']
    },
    bait: BAIT_TYPE.REDROT,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'rusty_koi',
    rarity: RARITY.RARE,
    locations: {
        [REGION.LIYUE]: ['luhua_pool', 'wangshu_inn', 'dihua_marsh'],
    },
    bait: BAIT_TYPE.RAIN_WORM,
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: 'pufferfish',
    rarity: RARITY.RARE,
    locations: {
        [REGION.LIYUE]: ['qingce_village', 'dihua_marsh']
    },
    bait: BAIT_TYPE.FAKE_FLY,
    difficulty: DIFFICULTY.MEDIUM,
  }
];
