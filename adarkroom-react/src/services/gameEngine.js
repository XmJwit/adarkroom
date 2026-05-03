/**
 * 游戏引擎核心服务
 * 替代原始JavaScript引擎
 */

import { eventBus, EVENT_TYPES } from '../utils/eventBus';
import useGameStore from '../stores/gameStore';
import { GAME_CONSTANTS, TIMERS } from '../constants/gameConstants';

class GameEngine {
  constructor() {
    this.initialized = false;
    this.gameOver = false;
    this.version = GAME_CONSTANTS.VERSION;
    this.maxStore = GAME_CONSTANTS.MAX_STORE;
    this.currentLocation = null;
    this.gameLoopInterval = null;
    this.audioContext = null;
    this.config = {
      soundOn: true,
      hyperMode: false,
      lightsOff: false
    };
  }

  /**
   * 初始化游戏
   */
  init() {
    if (this.initialized) return;

    const store = useGameStore.getState();

    // 初始化状态管理
    this.initializeState(store);

    // 加载游戏数据
    this.loadGame();

    // 初始化事件处理
    this.setupEventListeners();

    // 初始化音频系统
    this.initializeAudio();

    // 启动游戏循环
    this.startGameLoop();

    // 初始化位置和模块
    this.initializeModules(store);

    this.initialized = true;
    eventBus.publish(EVENT_TYPES.GAME_START);
  }

  /**
   * 初始化游戏状态
   */
  initializeState(store) {
    const requiredCategories = [
      'features',
      'stores',
      'character',
      'income',
      'timers',
      'game',
      'playStats',
      'previous',
      'outfit',
      'config',
      'wait',
      'cooldown'
    ];

    for (const category of requiredCategories) {
      if (!store.getState(category)) {
        store.setState(category, {}, true);
      }
    }

    // 设置初始配置
    if (!store.getState('config.soundOn')) {
      store.setState('config.soundOn', true, true);
    }
    if (!store.getState('config.hyperMode')) {
      store.setState('config.hyperMode', false, true);
    }
    if (!store.getState('config.lightsOff')) {
      store.setState('config.lightsOff', false, true);
    }
  }

  /**
   * 加载游戏
   */
  loadGame() {
    try {
      const savedState = localStorage.getItem('adarkroom-game-state');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.state) {
          useGameStore.getState().loadState(parsed.state);
          this.log('Game loaded successfully');
          eventBus.publish(EVENT_TYPES.GAME_LOAD);
        }
      }
    } catch (error) {
      this.log('Failed to load game:', error);
      this.createNewGame();
    }
  }

  /**
   * 创建新游戏
   */
  createNewGame() {
    const store = useGameStore.getState();
    store.setState('version', this.version, true);
    store.setState('stores.wood', 0, true);
    store.setState('stores.food', 0, true);
    store.setState('game.fireStarted', false, true);
    this.log('New game created');
    eventBus.publish('newGameStarted');
  }

  /**
   * 保存游戏
   */
  saveGame() {
    try {
      if (typeof Storage !== 'undefined' && localStorage) {
        this.notifySave();
        eventBus.publish(EVENT_TYPES.GAME_SAVE);
      }
    } catch (error) {
      this.log('Failed to save game:', error);
    }
  }

  /**
   * 显示保存通知
   */
  notifySave() {
    eventBus.publish(EVENT_TYPES.NOTIFICATION, {
      type: 'save',
      message: 'Game saved'
    });
  }

  /**
   * 设置事件监听器
   */
  setupEventListeners() {
    if (typeof window === 'undefined') return;

    // 键盘事件
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    // 状态更新事件
    eventBus.subscribe(EVENT_TYPES.STATE_UPDATE, this.handleStateUpdate.bind(this));
  }

  /**
   * 处理键盘按下
   */
  handleKeyDown(event) {
    const { key } = event;

    // 保存快捷键
    if ((event.ctrlKey || event.metaKey) && key === 's') {
      event.preventDefault();
      this.saveGame();
    }

    // 其他快捷键可以在这里添加
  }

  /**
   * 处理键盘释放
   */
  handleKeyUp(event) {
    // 可以在这里处理键盘释放事件
  }

  /**
   * 处理状态更新
   */
  handleStateUpdate(data) {
    this.saveGame();
  }

  /**
   * 初始化音频系统
   */
  initializeAudio() {
    try {
      if (typeof AudioContext !== 'undefined') {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
    } catch (error) {
      this.log('Audio initialization failed:', error);
    }
  }

  /**
   * 启用/禁用音量
   */
  toggleVolume(enable) {
    const store = useGameStore.getState();
    const newState = enable ?? !store.getState('config.soundOn');
    store.setState('config.soundOn', newState);
    eventBus.publish(EVENT_TYPES.STATE_UPDATE, { path: 'config.soundOn', value: newState });
  }

  /**
   * 关闭/打开灯光（深夜模式）
   */
  toggleLights(off) {
    const store = useGameStore.getState();
    const newState = off ?? !store.getState('config.lightsOff');
    store.setState('config.lightsOff', newState);
    
    if (newState) {
      document.body.classList.add('lights-off');
    } else {
      document.body.classList.remove('lights-off');
    }
  }

  /**
   * 启用/禁用超级模式
   */
  toggleHyperMode(enable) {
    const store = useGameStore.getState();
    const newState = enable ?? !store.getState('config.hyperMode');
    store.setState('config.hyperMode', newState);
    
    if (newState) {
      document.body.classList.add('hyper-mode');
    } else {
      document.body.classList.remove('hyper-mode');
    }
  }

  /**
   * 启动游戏循环
   */
  startGameLoop() {
    if (this.gameLoopInterval) {
      clearInterval(this.gameLoopInterval);
    }

    // 每100ms运行一次游戏逻辑
    this.gameLoopInterval = setInterval(() => {
      this.update();
    }, 100);
  }

  /**
   * 停止游戏循环
   */
  stopGameLoop() {
    if (this.gameLoopInterval) {
      clearInterval(this.gameLoopInterval);
      this.gameLoopInterval = null;
    }
  }

  /**
   * 游戏更新循环
   */
  update() {
    if (this.gameOver) return;

    const store = useGameStore.getState();

    // 更新游戏统计
    const playTime = (store.getState('playStats.totalTime') || 0) + 0.1;
    store.setState('playStats.totalTime', playTime, true);

    // 触发更新事件
    eventBus.publish(EVENT_TYPES.STATE_UPDATE, { path: 'playStats.totalTime' });
  }

  /**
   * 初始化模块
   */
  initializeModules(store) {
    // 检查是否已有游戏进度
    if (store.getState('stores.wood')) {
      // 游戏已经开始
      eventBus.publish('gameProgress');
    } else {
      // 新游戏
      eventBus.publish('newGame');
    }
  }

  /**
   * 前往特定位置
   */
  travelTo(location) {
    this.currentLocation = location;
    eventBus.publish(EVENT_TYPES.LOCATION_REACHED, { location });
  }

  /**
   * 重新开始游戏
   */
  restartGame() {
    if (confirm('Are you sure you want to restart?')) {
      const store = useGameStore.getState();
      store.resetState();
      this.createNewGame();
      this.travelTo('room');
    }
  }

  /**
   * 导出游戏存档
   */
  exportGame() {
    const store = useGameStore.getState();
    const gameState = store.getState();
    const json = JSON.stringify(gameState);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adarkroom-save-${Date.now()}.json`;
    a.click();
  }

  /**
   * 导入游戏存档
   */
  importGame(json) {
    try {
      const gameState = JSON.parse(json);
      const store = useGameStore.getState();
      store.loadState(gameState);
      this.log('Game imported successfully');
    } catch (error) {
      this.log('Failed to import game:', error);
      alert('Failed to import game: Invalid file format');
    }
  }

  /**
   * 分享游戏
   */
  shareGame() {
    if (navigator.share) {
      navigator.share({
        title: 'A Dark Room',
        text: 'Check out this minimalist text adventure!',
        url: 'http://adarkroom.doublespeakgames.com'
      });
    } else {
      alert('Check out A Dark Room: http://adarkroom.doublespeakgames.com');
    }
  }

  /**
   * 日志记录
   */
  log(...args) {
    console.log('[GameEngine]', ...args);
  }

  /**
   * 获取浏览器是否有效
   */
  isBrowserValid() {
    return typeof Storage !== 'undefined' && localStorage;
  }

  /**
   * 检查是否为移动设备
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  }

  /**
   * 销毁引擎
   */
  destroy() {
    this.stopGameLoop();
    this.initialized = false;
  }
}

// 导出单例
export const gameEngine = new GameEngine();

export default GameEngine;
