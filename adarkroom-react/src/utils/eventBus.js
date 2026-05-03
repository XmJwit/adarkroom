/**
 * 事件系统 - 替代原始jQuery的事件系统
 * 支持发布/订阅模式
 */

class EventBus {
  constructor() {
    this.events = {};
  }

  /**
   * 订阅事件
   * @param {string} eventName - 事件名称
   * @param {Function} callback - 回调函数
   * @returns {Function} 取消订阅函数
   */
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    // 返回取消订阅函数
    return () => {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    };
  }

  /**
   * 只订阅一次事件
   * @param {string} eventName - 事件名称
   * @param {Function} callback - 回调函数
   */
  subscribeOnce(eventName, callback) {
    const unsubscribe = this.subscribe(eventName, (data) => {
      callback(data);
      unsubscribe();
    });

    return unsubscribe;
  }

  /**
   * 发布事件
   * @param {string} eventName - 事件名称
   * @param {*} data - 事件数据
   */
  publish(eventName, data) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for ${eventName}:`, error);
      }
    });
  }

  /**
   * 取消订阅所有事件或特定事件的所有监听器
   * @param {string} eventName - 事件名称（可选）
   */
  unsubscribeAll(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  /**
   * 获取特定事件的监听器数量
   * @param {string} eventName - 事件名称
   * @returns {number} 监听器数量
   */
  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

// 创建全局事件总线实例
export const eventBus = new EventBus();

// 事件名称常量
export const EVENT_TYPES = {
  // 状态相关
  STATE_UPDATE: 'stateUpdate',
  GAME_START: 'gameStart',
  GAME_OVER: 'gameOver',
  GAME_LOAD: 'gameLoad',
  GAME_SAVE: 'gameSave',

  // 通知相关
  NOTIFICATION: 'notification',
  STATUS_UPDATE: 'statusUpdate',

  // 房间相关
  ROOM_UPDATE: 'roomUpdate',
  FIRE_STOKED: 'fireStoked',
  BUILDING_CONSTRUCTED: 'buildingConstructed',
  WORKER_ASSIGNED: 'workerAssigned',

  // 外部相关
  OUTSIDE_UPDATE: 'outsideUpdate',
  HUNT_START: 'huntStart',
  HUNT_END: 'huntEnd',
  ENCOUNTER: 'encounter',

  // 世界相关
  WORLD_UPDATE: 'worldUpdate',
  LOCATION_REACHED: 'locationReached',
  PATH_UPDATE: 'pathUpdate',

  // 太空相关
  SHIP_UPDATE: 'shipUpdate',
  SPACE_UPDATE: 'spaceUpdate',

  // 系统相关
  AUDIO_PLAY: 'audioPlay',
  LANGUAGE_CHANGE: 'languageChange'
};

export default eventBus;
