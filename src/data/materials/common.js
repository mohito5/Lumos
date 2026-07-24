import { MATERIAL_GROUP, MATERIAL_TYPE, RARITY } from '../../app/constants';

export const common = [
    {
        id: 'mora',
        sid: 'm21',
        icon: "assets/mora.png",
        type: MATERIAL_TYPE.COMMON_CURRENCIES,
        rarity: RARITY.COMMON
    },
    {   // корона 
        id: 'crown_of_insight',
        sid: 'm22',
        icon: "assets/tmp256 (4).png",
        type: MATERIAL_TYPE.CHARACTER_TALENT,
        group: MATERIAL_GROUP.CROWN_OF_INSIGHT,
        rarity: RARITY.LEGENDARY
    },
    {
        id: 'wanderer,s_advice',
        sid: 'm23',
        icon: "assets/exp.png",
        type: MATERIAL_TYPE.CHARACTER_EXP,
        rarity: RARITY.UNCOMMON
    },
    {
        id: 'Adventurer,s_experience',
        sid: 'm24',
        icon: "assets/exp.png",
        type: MATERIAL_TYPE.CHARACTER_EXP,
        rarity: RARITY.RARE
    },
    {
        id: 'hero,s_wit',
        sid: 'm25',
        icon: "assets/exp.png",
        type: MATERIAL_TYPE.CHARACTER_EXP,
        rarity: RARITY.EPIC
    },

];