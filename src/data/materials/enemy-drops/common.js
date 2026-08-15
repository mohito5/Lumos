import { RARITY, VISION, WEAPON_TYPE, MATERIAL_TYPE, MATERIAL_GROUP, MATERIAL_TIER, MATERIAL_FAMILY, REGION, BOSS_DROP_TYPE } from "../../../shared/config/constants.js";

export const enemyDropsCommon = [
{
        id: 'slime-condensate',
        sid: 'm29',
        icon: 'assets/Slime_Condensate.webp',
        tier: null,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SLIME_MATERIALS],
        rarity: RARITY.COMMON
    },
{
        id: 'slime-secretions',
        sid: 'm30',
        icon: 'assets/Slime_Secretions.webp',
        tier: null,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SLIME_MATERIALS],
        rarity: RARITY.UNCOMMON
    },
{
        id: 'slime-concentrate',
        sid: 'm31',
        icon: 'assets/Slime_Concentrate.webp',
        tier: null,
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.SLIME_MATERIALS],
        rarity: RARITY.RARE
    },
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
        id: 'divining_scroll',
        sid: 'm146',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DIVINING_SCROLL],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'sealed_scroll',
        sid: 'm148',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DIVINING_SCROLL],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'forbidden_curse_scroll',
        sid: 'm149',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DIVINING_SCROLL],
        rarity: RARITY.RARE
    }
,
    {
        id: 'damaged_mask',
        sid: 'm157',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DAMAGED_MASK],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'stained_mask',
        sid: 'm159',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DAMAGED_MASK],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'ominous_mask',
        sid: 'm160',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.DAMAGED_MASK],
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
        id: 'treasure_hoarder_insignia',
        sid: 'm172',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.TREASURE_HOARDER_INSIGNIA],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'silver_raven_insignia',
        sid: 'm174',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.TREASURE_HOARDER_INSIGNIA],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'golden_raven_insignia',
        sid: 'm175',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.TREASURE_HOARDER_INSIGNIA],
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
        id: 'firm_arrowhead',
        sid: 'm210',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FIRM_ARROWHEAD],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'sharp_arrowhead',
        sid: 'm211',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FIRM_ARROWHEAD],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'weathered_arrowhead',
        sid: 'm212',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FIRM_ARROWHEAD],
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
        id: 'firm_arrowhead',
        sid: 'm326',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FIRM_ARROWHEAD],
        rarity: RARITY.COMMON
    }
,
    {
        id: 'sharp_arrowhead',
        sid: 'm328',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FIRM_ARROWHEAD],
        rarity: RARITY.UNCOMMON
    }
,
    {
        id: 'weathered_arrowhead',
        sid: 'm329',
        icon: 'assets/tmp256.png',
        type: MATERIAL_TYPE.CHARACTER_WEAPON_ENHANCEMENT,
        group: [MATERIAL_GROUP.COMMON_ENEMY_DROPS, MATERIAL_GROUP.FIRM_ARROWHEAD],
        rarity: RARITY.RARE
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
];
