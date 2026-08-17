import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, MATERIAL_TIER, MATERIAL_FAMILY, REGION, BOSS_DROP_TYPE } from "../../../shared/config/constants.js";

export const enemyDropsCommon = [
    
{
        id: 'rift_core',
        sid: 'm107',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.RIFT_CORE],
        rarity: RARITY.UNCOMMON
    },
{
        id: 'meshing_gear',
        sid: 'm108',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.MEShing_GEAR],
        rarity: RARITY.COMMON
    },
{
        id: 'foreign_synapse',
        sid: 'm109',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FOREIGN_SYNAPSE],
        rarity: RARITY.RARE
    },
{
        id: 'mechanical_spur_gear',
        sid: 'm110',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.MECHANICAL_SPUR_GEAR],
        rarity: RARITY.UNCOMMON
    },
{
        id: 'alien_life_core',
        sid: 'm111',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.ALIEN_LIFE_CORE],
        rarity: RARITY.EPIC
    },
{
        id: 'artificed_dynamic_gear',
        sid: 'm112',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.ARTIFICED_DYNAMIC_GEAR],
        rarity: RARITY.RARE
    }
,
    {
        id: 'fungal_spores',
        sid: 'm129',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FUNGAL_SPORES],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'luminescent_pollen',
        sid: 'm131',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FUNGAL_SPORES],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'crystalline_cyst_dust',
        sid: 'm132',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FUNGAL_SPORES],
        rarity: RARITY.RARE
    }
,
    {
        id: 'juvenile_fang',
        sid: 'm164',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.JUVENILE_FANG],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'seasoned_fang',
        sid: 'm166',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.JUVENILE_FANG],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'tyrants_fang',
        sid: 'm167',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.JUVENILE_FANG],
        rarity: RARITY.RARE
    }
,

    {
        id: 'whopperflower_nectar',
        sid: 'm184',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.WHOPPERFLOWER_NECTAR],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'shimmering_nectar',
        sid: 'm185',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.WHOPPERFLOWER_NECTAR],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'energy_nectar',
        sid: 'm186',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.WHOPPERFLOWER_NECTAR],
        rarity: RARITY.RARE
    }
,
    {
        id: 'tattered_warrant',
        sid: 'm222',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.TATTERED_WARRANT],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'immaculate_warrant',
        sid: 'm224',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.TATTERED_WARRANT],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'frost_etched_warrant',
        sid: 'm225',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.TATTERED_WARRANT],
        rarity: RARITY.RARE
    }
,
    {
        id: 'spectral_husk',
        sid: 'm240',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SPECTRAL_HUSK],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'spectral_heart',
        sid: 'm242',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SPECTRAL_HUSK],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'spectral_nucleus',
        sid: 'm243',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SPECTRAL_HUSK],
        rarity: RARITY.RARE
    }
,
    {
        id: 'recruits_insignia',
        sid: 'm249',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.RECRUITS_INSIGNIA],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'sergeants_insignia',
        sid: 'm250',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.RECRUITS_INSIGNIA],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'lieutenants_insignia',
        sid: 'm251',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.RECRUITS_INSIGNIA],
        rarity: RARITY.RARE
    }
,
    {
        id: 'dead_ley_line_branch',
        sid: 'm267',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DEAD_LEY_LINE_BRANCH],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'dead_ley_line_leaves',
        sid: 'm268',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DEAD_LEY_LINE_LEAVES],
        rarity: RARITY.RARE
    }
,
    {
        id: 'ley_line_sprout',
        sid: 'm269',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.LEY_LINE_SPROUT],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'hunters_sacrificial_knife',
        sid: 'm270',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HUNTERS_SACRIFICIAL_KNIFE],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'agents_sacrificial_knife',
        sid: 'm271',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.AGENTS_SACRIFICIAL_KNIFE],
        rarity: RARITY.RARE
    }
,
    {
        id: 'inspectors_sacrificial_knife',
        sid: 'm272',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.INSPECTORS_SACRIFICIAL_KNIFE],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'heavy_horn',
        sid: 'm273',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HEAVY_HORN],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'black_bronze_horn',
        sid: 'm274',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.BLACK_BRONZE_HORN],
        rarity: RARITY.RARE
    }
,
    {
        id: 'black_crystal_horn',
        sid: 'm275',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.BLACK_CRYSTAL_HORN],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'chaos_axis',
        sid: 'm350',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CHAOS_AXIS],
        rarity: RARITY.RARE
    }
,
    {
        id: 'chaos_bolt',
        sid: 'm351',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CHAOS_BOLT],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'chaos_module',
        sid: 'm352',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CHAOS_MODULE],
        rarity: RARITY.RARE
    }
,
    {
        id: 'chaos_oculus',
        sid: 'm353',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CHAOS_OCULUS],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'chaos_storage',
        sid: 'm354',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CHAOS_STORAGE],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'dead_ley_line_branch',
        sid: 'm350',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DEAD_LEY_LINE_BRANCH],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'dead_ley_line_leaves',
        sid: 'm352',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DEAD_LEY_LINE_LEAVES],
        rarity: RARITY.RARE
    }
,
    {
        id: 'ley_line_sprout',
        sid: 'm354',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.LEY_LINE_SPROUT],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'hunters_sacrificial_knife',
        sid: 'm356',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HUNTERS_SACRIFICIAL_KNIFE],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'agents_sacrificial_knife',
        sid: 'm357',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.AGENTS_SACRIFICIAL_KNIFE],
        rarity: RARITY.RARE
    }
,
    {
        id: 'inspectors_sacrificial_knife',
        sid: 'm358',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.INSPECTORS_SACRIFICIAL_KNIFE],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'heavy_horn',
        sid: 'm359',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HEAVY_HORN],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'black_bronze_horn',
        sid: 'm360',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.BLACK_BRONZE_HORN],
        rarity: RARITY.RARE
    }
,
    {
        id: 'black_crystal_horn',
        sid: 'm361',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.BLACK_CRYSTAL_HORN],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'concealed_claw',
        sid: 'm350',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CONCEALED_CLAW],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'concealed_unguis',
        sid: 'm351',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CONCEALED_UNGUIS],
        rarity: RARITY.RARE
    }
,
    {
        id: 'concealed_talon',
        sid: 'm352',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CONCEALED_TALON],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'chaos_axis',
        sid: 'm350',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CHAOS_AXIS],
        rarity: RARITY.RARE
    }
,
    {
        id: 'chaos_oculus',
        sid: 'm351',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.CHAOS_OCULUS],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'faded_flaming_hilt',
        sid: 'm356',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FADED_FLAMING_HILT],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'fractured_flaming_hilt',
        sid: 'm357',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FRACTURED_FLAMING_HILT],
        rarity: RARITY.RARE
    }
,
    {
        id: 'jeweled_flaming_hilt',
        sid: 'm358',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.JEWELED_FLAMING_HILT],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'gloomy_statuette',
        sid: 'm359',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.GLOOMY_STATUETTE],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'dark_statuette',
        sid: 'm360',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DARK_STATUETTE],
        rarity: RARITY.RARE
    }
,
    {
        id: 'deathly_statuette',
        sid: 'm361',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DEATHLY_STATUETTE],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'axis_of_the_secret_source',
        sid: 'm366',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.AXIS_OF_THE_SECRET_SOURCE],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'sheath_of_the_secret_source',
        sid: 'm367',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SHEATH_OF_THE_SECRET_SOURCE],
        rarity: RARITY.RARE
    }
,
    {
        id: 'heart_of_the_secret_source',
        sid: 'm368',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.HEART_OF_THE_SECRET_SOURCE],
        rarity: RARITY.EPIC
    }
,
    {
        id: 'refractive_bud',
        sid: 'm369',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.REFRACTIVE_BUD],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'bewildering_broadleaf',
        sid: 'm370',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.BEWILDERING_BROADLEAF],
        rarity: RARITY.RARE
    }
,
    {
        id: 'illusory_leafcoil',
        sid: 'm371',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.ILLUSORY_LEAFCOIL],
        rarity: RARITY.EPIC
    }
,
];
