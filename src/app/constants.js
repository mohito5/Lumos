
// js-r/src/app/constants.js
// Файл для хранения глобальных констант приложения

// Ключи для localStorage
export const STORAGE_KEYS = {
    CURRENT_PAGE: 'currentPage',
    LANGUAGE: 'lang',
    SELECTED_CHARACTER: 'selectedCharacter',
    CHARACTER_LEVEL_DATA: 'characterLevelData',
    SAVED_MATERIALS: 'savedMaterials',
    SELECTED_WEAPON: 'selectedWeapon',
    WEAPON_LEVEL_DATA: 'weaponLevelData',
    WEAPON_DATA: 'weaponData',
    SAVED_WEAPON_MATERIALS: 'savedWeaponMaterials',
};

// Идентификаторы страниц (для роутера и навигации)
export const PAGE_IDS = {
    HOME: 'home',
    HOME_SETTINGS: 'home/settings',
    CHARACTERS: 'characters',
    CHARACTERS_INFO: 'characters/info',
    CHARACTERS_MATERIALS: 'characters/mat',
    WEAPON: 'weapon',
    WEAPON_INFO: 'weapon/info',
    WEAPON_MATERIALS: 'weapon/materials',
    WEAPON_REFINEMENT: 'weapon/refinement',
    DATE: 'date',
    DATE_FISHING: 'date/fishing',
    PROFILE: 'profile',
    PROFILE_CALCULATOR: 'profile/calculator',
};

// Другие константы
export const DEFAULT_LANGUAGE = 'ru';

export const VISION_TYPE_TO_IMG_SRC = {
    Anemo: '/assets/elements/Element_Anemo.svg',
    Electro: '/assets/elements/Element_Electro.svg',
    Geo: '/assets/elements/Element_Geo.svg',
    Cryo: '/assets/elements/Element_Cryo.svg',
    Pyro: '/assets/elements/Element_Pyro.svg',
    Hydro: '/assets/elements/Element_Hydro.svg',
    Dendro: '/assets/elements/Element_Dendro.svg',
};

export const WEAPON_TYPE_TO_IMG_SRC = {
    Sword: '/assets/weapon-icons/Sword.svg',
    Claymore: '/assets/weapon-icons/Claymore.svg',
    Polearm: '/assets/weapon-icons/Polearm.svg',
    Bow: '/assets/weapon-icons/Bow.svg',
    Catalyst: '/assets/weapon-icons/Catalyst.svg',
};

export const VISIONS = ['Anemo', 'Electro', 'Geo', 'Cryo', 'Pyro', 'Hydro', 'Dendro'];
export const WEAPON_TYPES = ['Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];

export const RARITY = {
  COMMON: 1,
  UNCOMMON: 2,
  RARE: 3,
  EPIC: 4,
  LEGENDARY: 5,
};

export const RARITY_DATA = {
  [RARITY.COMMON]: { stars: '★', name_key: 'rarity.common' },
  [RARITY.UNCOMMON]: { stars: '★★', name_key: 'rarity.uncommon' },
  [RARITY.RARE]: { stars: '★★★', name_key: 'rarity.rare' },
  [RARITY.EPIC]: { stars: '★★★★', name_key: 'rarity.epic' },
  [RARITY.LEGENDARY]: { stars: '★★★★★', name_key: 'rarity.legendary' },
};

export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const DIFFICULTY_DATA = {
    [DIFFICULTY.EASY]: { name_key: 'difficulty.easy' },
    [DIFFICULTY.MEDIUM]: { name_key: 'difficulty.medium' },
    [DIFFICULTY.HARD]: { name_key: 'difficulty.hard' },
};

export const VISION = {
  ANEMO: 'Anemo',
  PYRO: 'Pyro',
  GEO: 'Geo',
  ELECTRO: 'Electro',
  CRYO: 'Cryo',
  HYDRO: 'Hydro',
  DENDRO: 'Dendro',
};

export const ELEMENT = {
  ANEMO: 'anemo',
  PYRO: 'pyro',
  GEO: 'geo',
  ELECTRO: 'electro',
  CRYO: 'cryo',
  HYDRO: 'hydro',
  DENDRO: 'dendro',
};

export const WEAPON_TYPE = {
    SWORD: 'Sword',
    CLAYMORE: 'Claymore',
    POLEARM: 'Polearm',
    BOW: 'Bow',
    CATALYST: 'Catalyst',
};

export const REGION = {
  MONDSTADT: 'mondstadt',
  LIYUE: 'liyue',
  INAZUMA: 'inazuma',
  SUMERU: 'sumeru',
  FONTAINE: 'fontaine',
  NATLAN: 'natlan',
  SNEZHNAYA: 'snezhnaya',
};

export const ENEMY_TYPE = {
  COMMON: 'common',
  ELITE: 'elite',
  BOSS: 'boss',
};

export const ENEMY_TYPE_DATA = {
  [ENEMY_TYPE.COMMON]: { name_key: 'enemy_type.common' },
  [ENEMY_TYPE.ELITE]: { name_key: 'enemy_type.elite' },
  [ENEMY_TYPE.BOSS]: { name_key: 'enemy_type.boss' },
};

export const BAIT_TYPE = {
  RAIN_WORM: 'rain_worm',
  CRICKET: 'cricket',
  STINK_FLY: 'stink_fly',
  BLOOD_WORM: 'blood_worm',
};

export const BAIT_TYPE_DATA = {
    [BAIT_TYPE.RAIN_WORM]: { name_key: 'bait.rain_worm' },
    [BAIT_TYPE.CRICKET]: { name_key: 'bait.cricket' },
    [BAIT_TYPE.STINK_FLY]: { name_key: 'bait.stink_fly' },
    [BAIT_TYPE.BLOOD_WORM]: { name_key: 'bait.blood_worm' },
};

export const FACTION = {
  HILICHURLS: 'hilichurls',
  SLIMES: 'slimes',
  WHOOPERFLOWERS: 'whooperflowers',
  SPECTERS: 'specters',
  ABYSS: 'abyss',
  FATUI: 'fatui',
};

export const FACTION_DATA = {
  [FACTION.HILICHURLS]: { name_key: 'faction.hilichurls' },
  [FACTION.SLIMES]: { name_key: 'faction.slimes' },
  [FACTION.WHOOPERFLOWERS]: { name_key: 'faction.whooperflowers' },
  [FACTION.SPECTERS]: { name_key: 'faction.specters' },
  [FACTION.ABYSS]: { name_key: 'faction.abyss' },
  [FACTION.FATUI]: { name_key: 'faction.fatui' },
};

export const MATERIAL_TIER = {
    MORA: 'mora',
    SLIVER: 'sliver',
    FRAGMENT: 'fragment',
    CHUNK: 'chunk',
    GEMSTONE: 'gemstone',
    ENEMY_T1: 'st1',
    ENEMY_T2: 'st2',
    ENEMY_T3: 'st3',
    BOOK_T1: 'teachings',
    BOOK_T2: 'guide',
    BOOK_T3: 'philosophies',
    EXP_BOOK_T1: 'exp_book_t1',
    EXP_BOOK_T2: 'exp_book_t2',
    EXP_BOOK_T3: 'exp_book_t3',
    LOCAL_SPECIALTY: 'localSpecialty',
    BOSS_MATERIAL: 'bossMaterial',
    CROWN: 'crown',
    WEEKLY_BOSS_MATERIAL: 'weeklyBossMaterial',
    ENHANCEMENT_ORE: 'enhancementOre',
    FINE_ENHANCEMENT_ORE: 'fineEnhancementOre',
    MYSTIC_ENHANCEMENT_ORE: 'mysticEnhancementOre',
};

export const MATERIAL_FAMILY = {
    FREEDOM: 'freedom',
    VAGRANCY: 'vagrancy',
    SHAFT: 'shaft',
    RESISTANCE: 'resistance',
    BALLAD: 'ballad',
    PROSPERITY: 'prosperity',
    DILIGENCE: 'diligence',
    GOLD: 'gold',
    TRANSIENCE: 'transience',
    ELEGANCE: 'elegance',
    LIGHT: 'light',
    ADMONITION: 'admonition',
    INGENUITY: 'ingenuity',
    PRAXIS: 'praxis',
    EQUITY: 'equity',
    JUSTICE: 'justice',
    ORDER: 'order',
};

export const BOSS_DROP_TYPE = {
    WEEKLY: 'weekly',
    REGULAR: 'regular',
};

export const STAT_TYPES = {
  HP: 'hp',
  ATTACK: 'attack',
  DEFENSE: 'defense',
};

export const ASCENSION_STAT_TYPES = {
  HP_PERCENT: 'hp_percent',
  ATTACK_PERCENT: 'attack_percent',
  DEFENSE_PERCENT: 'defense_percent',
  CRIT_RATE: 'crit_rate',
  CRIT_DAMAGE: 'crit_damage',
  ELEMENTAL_MASTERY: 'elemental_mastery',
  ENERGY_RECHARGE: 'energy_recharge',
  HEALING_BONUS: 'healing_bonus',
  ANEMO_DMG_BONUS: 'anemo_dmg_bonus',
  GEO_DMG_BONUS: 'geo_dmg_bonus',
  ELECTRO_DMG_BONUS: 'electro_dmg_bonus',
  HYDRO_DMG_BONUS: 'hydro_dmg_bonus',
  PYRO_DMG_BONUS: 'pyro_dmg_bonus',
  CRYO_DMG_BONUS: 'cryo_dmg_bonus',
  DENDRO_DMG_BONUS: 'dendro_dmg_bonus',
  PHYSICAL_DMG_BONUS: 'physical_dmg_bonus',
};

export const DAYS = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday',
};

export const BOOK_GROUPS = {
  MONDAY_THURSDAY: [DAYS.MONDAY, DAYS.THURSDAY],
  TUESDAY_FRIDAY: [DAYS.TUESDAY, DAYS.FRIDAY],
  WEDNESDAY_SATURDAY: [DAYS.WEDNESDAY, DAYS.SATURDAY],
};

export const MATERIAL_TYPE = {
  COMMON_CURRENCIES: 'common_currencies',
  CHARACTER_WEAPON_ENHANCEMENT: 'character_weapon_enhancement',
  CHARACTER_TALENT: 'character_talent',
  WEAPON_ENHANCEMENT_MATERIALS: 'weapon_enhancement_materials',
  LOCAL_SPECIALTY: 'local_specialty',
  CHARACTER_EXP: 'character_exp',
  CHARACTER_ASCENTION: 'character_ascention'
};

export const MATERIAL_GROUP = {
  // General Groups
  COMMON_ENEMY_DROPS: 'common_enemy_drops',
  ELITE_ENEMY_DROPS: 'elite_enemy_drops',
  WEAPON_ASCENSION_MATERIALS: 'weapon_ascension_materials',
  TALENT_BOOKS: 'talent_books',
  ASCENSION_GEMS: 'ascension_gems',
  COMMON_ASCENSION_GEMS: 'common_ascension_gems',
  LOCAL_SPECIALTIES: 'local_specialties',
  WEEKLY_BOSS_DROPS: 'weekly_boss_drops',
  NORMAL_BOSS_DROPS: 'normal_boss_drops',
  CROWN_OF_INSIGHT: 'crown_of_insight',

  // Specific ascension gems 
  VAYUDA_TURQUOISE: 'vayuda_turquoise',

  // Specific Enemy Drop Groups
  NOBUSHI_HANDGUARDS: 'nobushi_handguards',
  HILICHURL_MASKS: 'hilichurl_masks',
  HILICHURL_ARROWHEADS: 'hilichurl_arrowheads',
  SAMACHURL_SCROLLS: 'samachurl_scrolls',
  SLIME_MATERIALS: 'slime_materials',
  HUMANOID_RUIN_MACHINE: 'humanoid_ruin_machine',
  TREASURE_HOARDER_INSIGNIAS: 'treasure_hoarder_insignias',
  FATUI_INSIGNIAS: 'fatui_insignias',
  WHOOPERFLOWER_NECTAR: 'whooperflower_nectar',
  SPECTRAL_HUSKS: 'spectral_husks',
  FUNGAL_SPORES: 'fungal_spores',
  INACTIVATED_FUNGAL_NUCLEUS: 'inactivated_fungal_nucleus',
  CONSECRATED_BEAST_PARTS: 'consecrated_beast_parts',
  DESICCATED_SHELLS: 'desiccated_shells',
  CLOCKWORK_GEARS: 'clockwork_gears',
  MEShing_GEAR: 'meshing_gear',
  FATUI_KNIVES: 'fatui_knives',

  // Specific Weapon Ascension Material Groups
  DECARABIAN: 'decarabian',
  BOREAL_WOLF: 'boreal_wolf',
  DANDELION_GLADIATOR: 'dandelion_gladiator',
  GUYUN: 'guyun',
  MIST_VEILED: 'mist_veiled',
  AEROSIDERITE: 'aerosiderite',
  NARUKAMI: 'narukami',
  MASK_OF_THE_WICKED: 'mask_of_the_wicked',
  CORAL_BRANCH: 'coral_branch',
  FOREST_DEW: 'forest_dew',
  OASIS_GARDEN: 'oasis_garden',
  SCORCHING_MIGHT: 'scorching_might',
  ANCIENT_CHORD: 'ancient_chord',
  PURE_SACRED_DEWDROP: 'pure_sacred_dewdrop',
  BROKEN_GOBLET: 'broken_goblet',

  ENHANCEMENT_ORE: 'enhancement_ore',
  FINE_ENHANCEMENT_ORE: 'fine_enhancement_ore',
  MYSTIC_ENHANCEMENT_ORE: 'weapon_enhancement_ore',

  // Weapon Cost Slots (Placeholders for weapon_materials_data)
  WEAPON_ASCENSION_SLOT: 'weapon_ascension_slot',
  COMMON_ENEMY_DROPS_SLOT_1: 'common_enemy_drops_slot_1',
  COMMON_ENEMY_DROPS_SLOT_2: 'common_enemy_drops_slot_2',

  // Local speciality
  WOLFHOOK: 'wolfhook',

  // Specific talent books group
  BOOKS_FREEDOM: 'books_of_freedom',
  BOOKS_RESISTANCE: 'books_of_resistance',
  BOOKS_BALLAD: 'books_of_ballad',
  BOOKS_PROSPERITY: 'books_of_prosperity',
  BOOKS_DILIGENCE: 'books_of_diligence',
  BOOKS_GOLD: 'books_of_gold',
  BOOKS_TRANSIENCE: 'books_of_transience',
  BOOKS_ELEGANCE: 'books_of_elegance',
  BOOKS_LIGHT: 'books_of_light',
  BOOKS_ADMONITION: 'books_of_admonition',
  BOOKS_INGENUITY: 'books_of_ingenuity',
  BOOKS_PRAXIS: 'books_of_praxis',
  BOOKS_EQUITY: 'books_of_equity',
  BOOKS_JUSTICE: 'books_of_justice',
  BOOKS_ORDER: 'books_of_order',


  // Specific normal boss drops group
  PRISMATIC_SEVERED_TAIL: 'prismatic_severed_tail',
  ASCENDED_SAMPLE_QUEEN: 'ascended_sample_queen'
};

export const LEVEL_MILESTONES = [
    { lvl: 1, asc: false, label: '1' }, { lvl: 20, asc: false, label: '20' }, { lvl: 20, asc: true, label: '20+' },
    { lvl: 40, asc: false, label: '40' }, { lvl: 40, asc: true, label: '40+' }, { lvl: 50, asc: false, label: '50' },
    { lvl: 50, asc: true, label: '50+' }, { lvl: 60, asc: false, label: '60' }, { lvl: 60, asc: true, label: '60+' },
    { lvl: 70, asc: false, label: '70' }, { lvl: 70, asc: true, label: '70+' }, { lvl: 80, asc: false, label: '80' },
    { lvl: 80, asc: true, label: '80+' }, { lvl: 90, asc: false, label: '90' }
];

export const TALENT_LEVELS = Array.from({ length: 10 }, (_, i) => i + 1);
