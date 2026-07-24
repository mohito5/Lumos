import { RARITY, REGION } from '../../app/constants';
import { LOCATION } from '../../constants/locations';
import { BAIT_TYPE, DIFFICULTY, GAME_TIME } from '../../constants/fish';

export const mondstadtFishes = [
  {
    id: 'medaka',
    rarity: RARITY.RARE, 
    rarity_ornamental: RARITY.EPIC,
    icon: '/icons/fishes/golden_koi.png',
    icon_ornamental: '/icons/fishes/golden_koi_ornamental.png',
    region: [REGION.MONDSTADT, REGION.LIYUE, REGION.INAZUMA, REGION.SUMERU, REGION.FONTAINE, REGION.NATLAN, REGION.SNEZHNAYA],
    locations: {
        [REGION.MONDSTADT]: [LOCATION.STARFALL_LAKE],
        [REGION.LIYUE]: [LOCATION.QINGCE_VILLAGE]
    },
    bait: BAIT_TYPE.RAIN_WORM,
    difficulty: DIFFICULTY.VERY_EASY,
    game_time: GAME_TIME.ANY_TIME
  },
  {
    id: 'snow_strider',
    rarity: RARITY.RARE, 
    rarity_ornamental: RARITY.EPIC,
    locations: {
        [REGION.MONDSTADT]: [LOCATION.DRAGONSPINE]
    },
    bait: BAIT_TYPE.CRICKET,
    difficulty: DIFFICULTY.MEDIUM,
    game_time: GAME_TIME.ANY_TIME
  }
];