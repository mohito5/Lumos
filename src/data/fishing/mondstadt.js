import { RARITY, REGION } from "../../shared/config/constants.js";
import { LOCATION } from '../../shared/config/locations';
import { BAIT_TYPE, DIFFICULTY, GAME_TIME } from '../../shared/config/fish';

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