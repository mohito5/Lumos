import { MATERIAL_TIER, RARITY } from "../../shared/config/constants.js";
import { MATERIAL_TYPE, MATERIAL_GROUP } from "../../shared/config/material_type.js";

export const localSpecialty = [
    {
        id: 'frostlamp_flower',
        sid: 'm43',
        localization: { en: { name: "Frostlamp Flower" }, ru: { name: "Морозно-лампаданый цветок" } },
        icon: "assets/localSpecial/frostlampFlower.webp",
        tier: MATERIAL_TIER.LOCAL_SPECIALTY
    },
    {
        id: 'withering_purpurbloom',
        sid: 'm105',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'withering_purpurbloom'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'sea_ganoderma',
        sid: 'm113',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'sea_ganoderma'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'qingxin',
        sid: 'm128',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'qingxin'],
        rarity: RARITY.COMMON
    }
,

    {
        id: 'crystal_marrow',
        sid: 'm136',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'crystal_marrow'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'onikabuto',
        sid: 'm138',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'onikabuto'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'henna_berry',
        sid: 'm142',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'henna_berry'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'amakumo_fruit',
        sid: 'm155',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'amakumo_fruit'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'cor_lapis',
        sid: 'm162',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'cor_lapis'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'scarab',
        sid: 'm165',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'scarab'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'noctilucous_jade',
        sid: 'm175',
        icon: 'assets/local-spec/Small_Lamp_Grass.webp',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'noctilucous_jade'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'dendrobium',
        sid: 'm178',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'dendrobium'],
        rarity: RARITY.COMMON
    }
,
    
    {
        id: 'kalpalata_lotus',
        sid: 'm183',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'kalpalata_lotus'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'moonfall_silver',
        sid: 'm190',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'moonfall_silver'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'nilotpala_lotus',
        sid: 'm202',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'nilotpala_lotus'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'rukkhashava_mushrooms',
        sid: 'm204',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'rukkhashava_mushrooms'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'sand_grease_pupa',
        sid: 'm207',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'sand_grease_pupa'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'jueyun_chili',
        sid: 'm210',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'jueyun_chili'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'glaze_lily',
        sid: 'm224',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'glaze_lily'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'sango_pearl',
        sid: 'm228',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'sango_pearl'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'sakura_bloom',
        sid: 'm234',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'sakura_bloom'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'violetgrass',
        sid: 'm239',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'violetgrass'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'silk_flower',
        sid: 'm253',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'silk_flower'],
        rarity: RARITY.COMMON
    }
,
      {
        id: 'naku_weed',
        sid: 'm256',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'naku_weed'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'fluorescent_fungus',
        sid: 'm258',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'fluorescent_fungus'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'starconch',
        sid: 'm264',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'starconch'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'padisarah',
        sid: 'm266',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'padisarah'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'rainbow_rose',
        sid: 'm268',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'rainbow_rose'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'pine_amber',
        sid: 'm272',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'pine_amber'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'quenepa_berry',
        sid: 'm279',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'quenepa_berry'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'winter_icelea',
        sid: 'm281',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'winter_icelea'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'portable_bearing',
        sid: 'm284',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'portable_bearing'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'saurian_claw_succulent',
        sid: 'm285',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'saurian_claw_succulent'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'glowing_hornshroom',
        sid: 'm289',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'glowing_hornshroom'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'lumitoile',
        sid: 'm293',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'lumitoile'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'subdetection_unit',
        sid: 'm300',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'subdetection_unit'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'skysplit_gembloom',
        sid: 'm303',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'skysplit_gembloom'],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'brilliant_chrysanthemum',
        sid: 'm312',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.LOCAL_SPECIALTY,
        group: [MATERIAL_GROUP.LOCAL_SPECIALTIES, 'brilliant_chrysanthemum'],
        rarity: RARITY.COMMON
    }
];
