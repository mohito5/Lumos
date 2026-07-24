import { RARITY, REGION } from "../../app/constants";
import { STATS } from "../../app/stats";

export const bossDrops = [
  {
    id: "gladiators-finale",
    enkaId: 15001,
    sid: "a1",
    rarity:[RARITY.EPIC,RARITY.LEGENDARY],
    region: [REGION.MONDSTADT, REGION.LIYUE, REGION.INAZUMA, REGION.SUMERU, REGION.FONTAINE, REGION.NATLAN, REGION.SNEZHNAYA],
    bonuses: {
      2: { stat: STATS.ATK_PERCENT, value: 18 }
    }
  },
  {
    id: "wanderers-troupe",
    enkaId: 15003,
    sid: "a2",
    rarity: [RARITY.EPIC, RARITY.LEGENDARY],
    bonuses: {
      2: { stat: STATS.ELEMENTAL_MASTERY, value: 80 }
    }
  }
];
