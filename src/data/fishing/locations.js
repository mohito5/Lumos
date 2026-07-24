import { REGION } from "../../app/constants";
import { LOCATION } from "../../constants/locations";

export const fishingLocations = {
  [LOCATION.STARFALL_LAKE]: {
    name_key: 'location.starfall_lake',
    region: REGION.MONDSTADT,
    image: '/assets/locations/starfall_lake.png'
  },
  [LOCATION.CIDER_LAKE]: {
    name_key: 'location.cider_lake',
    region: REGION.MONDSTADT,
    image: '/assets/locations/cider_lake.png'
  },
  [LOCATION.DRAGONSPINE]: {
    name_key: 'location.dragonspine',
    region: REGION.MONDSTADT,
    image: '/assets/locations/dragonspine.png'
  },
  [LOCATION.QINGCE_VILLAGE]: {
    name_key: 'location.qingce_village',
    region: REGION.LIYUE,
    image: '/assets/locations/qingce_village.png'
  }
};
