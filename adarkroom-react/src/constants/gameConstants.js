/**
 * 游戏常量定义
 */

// 时间常量（毫秒）
export const TIMERS = {
  FIRE_COOL_DELAY: 5 * 60 * 1000,        // 火焰冷却延迟
  ROOM_WARM_DELAY: 30 * 1000,            // 房间温度更新延迟
  BUILDER_STATE_DELAY: 0.5 * 60 * 1000,  // 建造者状态更新延迟
  STOKE_COOLDOWN: 10,                    // 生火冷却时间
  NEED_WOOD_DELAY: 15 * 1000             // 需要木材延迟
};

// 游戏常数
export const GAME_CONSTANTS = {
  MAX_STORE: 99999999999999,
  VERSION: 1.4,
  SAVE_DISPLAY: 30 * 1000
};

// 建筑类型
export const BUILDING_TYPES = {
  TRAP: 'trap',
  CART: 'cart',
  HUT: 'hut',
  LODGE: 'lodge',
  ARMORY: 'armory',
  LIBRARY: 'library',
  TAVERN: 'tavern'
};

// 建筑配置
export const BUILDINGS_CONFIG = {
  trap: {
    name: 'trap',
    maximum: 10,
    type: 'building'
  },
  cart: {
    name: 'cart',
    maximum: 1,
    type: 'building'
  },
  hut: {
    name: 'hut',
    maximum: 20,
    type: 'building'
  },
  lodge: {
    name: 'lodge',
    maximum: 5,
    type: 'building'
  },
  armory: {
    name: 'armory',
    maximum: 1,
    type: 'building'
  },
  library: {
    name: 'library',
    maximum: 1,
    type: 'building'
  },
  tavern: {
    name: 'tavern',
    maximum: 1,
    type: 'building'
  }
};

// 项目/物品类型
export const ITEM_TYPES = {
  CONSUMABLE: 'consumable',
  EQUIPMENT: 'equipment',
  WEAPON: 'weapon',
  RESOURCE: 'resource'
};

// 资源类型
export const RESOURCES = {
  WOOD: 'wood',
  FOOD: 'food',
  WATER: 'water',
  LEATHER: 'leather',
  IRON: 'iron',
  STEEL: 'steel',
  SCALES: 'scales',
  TEETH: 'teeth',
  FUR: 'fur',
  CLOTH: 'cloth',
  HERBS: 'herbs',
  OIL: 'oil',
  COAL: 'coal',
  SULPHUR: 'sulphur',
  POTASSIUM_NITRATE: 'potassium_nitrate'
};

// 武器类型
export const WEAPON_TYPES = {
  HANDS: 'hands',
  STICK: 'stick',
  SPEAR: 'spear',
  SWORD: 'sword',
  IRON_SWORD: 'iron sword',
  STEEL_SWORD: 'steel sword',
  RIFLE: 'rifle'
};

// 防具类型
export const ARMOR_TYPES = {
  NONE: 'none',
  LEATHER: 'leather',
  IRON: 'iron',
  STEEL: 'steel'
};

// 特性/Perks定义
export const PERKS = {
  BOXER: 'boxer',
  MARTIAL_ARTIST: 'martial artist',
  UNARMED_MASTER: 'unarmed master',
  BARBARIAN: 'barbarian',
  SLOW_METABOLISM: 'slow metabolism',
  DESERT_RAT: 'desert rat',
  EVASIVE: 'evasive',
  PRECISE: 'precise',
  SCOUT: 'scout',
  FINDER: 'finder',
  RANGER: 'ranger',
  BRAWLER: 'brawler',
  WARLORD: 'warlord',
  PHYSICIAN: 'physician',
  ENGINEER: 'engineer',
  ARMORER: 'armorer'
};

// 游戏位置/场景
export const LOCATIONS = {
  ROOM: 'room',
  OUTSIDE: 'outside',
  WORLD: 'world',
  PATH: 'path',
  SHIP: 'ship',
  SPACE: 'space'
};

// 动物类型
export const ANIMALS = {
  HUMAN: 'human',
  RAT: 'rat',
  RABBIT: 'rabbit',
  COYOTE: 'coyote',
  WOLF: 'wolf',
  ZOMBIE: 'zombie',
  WALKER: 'walker',
  SHAMBLER: 'shambler',
  CORPSE_EATER: 'corpse eater',
  BLOOD_DRINKER: 'blood drinker',
  INFECTED: 'infected'
};

// 游戏难度
export const DIFFICULTY = {
  EASY: 'easy',
  NORMAL: 'normal',
  HARD: 'hard',
  NIGHTMARE: 'nightmare'
};

// 声望等级
export const PRESTIGE_LEVELS = {
  NONE: 0,
  SCAVENGER: 1,
  WANDERER: 2,
  NOMAD: 3,
  VETERAN: 4,
  LEGEND: 5
};

// 快捷键
export const HOTKEYS = {
  SAVE: 'ctrl+s',
  LOAD: 'ctrl+l',
  RESTART: 'ctrl+r',
  PAUSE: 'space',
  SETTINGS: 'esc'
};

// 语言配置
export const LANGUAGES = {
  EN: 'en',
  ZH_CN: 'zh_cn',
  ZH_TW: 'zh_tw',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  RU: 'ru',
  JA: 'ja',
  KO: 'ko',
  PT: 'pt',
  PT_BR: 'pt_br'
};

// API端点
export const API_ENDPOINTS = {
  SITE_URL: 'http://adarkroom.doublespeakgames.com',
  GITHUB_REPO: 'https://github.com/doublespeakgames/adarkroom'
};

export default {
  TIMERS,
  GAME_CONSTANTS,
  BUILDING_TYPES,
  BUILDINGS_CONFIG,
  ITEM_TYPES,
  RESOURCES,
  WEAPON_TYPES,
  ARMOR_TYPES,
  PERKS,
  LOCATIONS,
  ANIMALS,
  DIFFICULTY,
  PRESTIGE_LEVELS,
  HOTKEYS,
  LANGUAGES,
  API_ENDPOINTS
};
