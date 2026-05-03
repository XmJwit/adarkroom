import { useEffect, useCallback, useRef } from 'react';
import useGameStore from '../stores/gameStore';
import { eventBus } from '../utils/eventBus';

/**
 * Hook: 获取和设置游戏状态
 * @param {string} statePath - 状态路径（如 'stores.wood'）
 * @returns {[any, Function]} - [值, 设置函数]
 */
export function useGameState(statePath) {
  const store = useGameStore();
  const value = store.getState(statePath);

  const setValue = useCallback((newValue) => {
    if (typeof newValue === 'function') {
      const currentValue = store.getState(statePath);
      store.setState(statePath, newValue(currentValue));
    } else {
      store.setState(statePath, newValue);
    }
  }, [statePath, store]);

  return [value, setValue];
}

/**
 * Hook: 监听状态变化
 * @param {string} statePath - 状态路径或数组路径列表
 * @param {Function} callback - 回调函数
 */
export function useGameStateWatch(statePath, callback) {
  const store = useGameStore();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const unsubscribe = eventBus.subscribe('stateUpdate', (data) => {
      if (typeof statePath === 'string') {
        if (data.path === statePath || data.path.startsWith(statePath.split('.')[0])) {
          callbackRef.current(store.getState(statePath));
        }
      } else if (Array.isArray(statePath)) {
        for (const path of statePath) {
          if (data.path === path || data.path.startsWith(path.split('.')[0])) {
            callbackRef.current(store.getState(path));
            break;
          }
        }
      }
    });

    return unsubscribe;
  }, [statePath, store]);
}

/**
 * Hook: 增加状态值
 * @param {string} statePath - 状态路径
 * @returns {Function} - 增加函数
 */
export function useGameStateAdd(statePath) {
  const store = useGameStore();

  return useCallback((value) => {
    store.addToState(statePath, value);
  }, [statePath, store]);
}

/**
 * Hook: 定时器钩子
 * @param {Function} callback - 回调函数
 * @param {number} interval - 间隔（毫秒）
 * @param {boolean} enabled - 是否启用
 */
export function useGameTimer(callback, interval, enabled = true) {
  const callbackRef = useRef(callback);
  const timerRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      callbackRef.current();
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [interval, enabled]);
}

/**
 * Hook: 监听事件
 * @param {string} eventName - 事件名称
 * @param {Function} callback - 回调函数
 */
export function useGameEvent(eventName, callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const unsubscribe = eventBus.subscribe(eventName, (data) => {
      callbackRef.current(data);
    });

    return unsubscribe;
  }, [eventName]);
}

/**
 * Hook: 获取整个游戏状态
 * @returns {Object} - 整个游戏状态对象
 */
export function useGameStateSnapshot() {
  const store = useGameStore();
  const {
    getState,
    setState,
    setMultiple,
    addToState,
    addToMultiple,
    resetState,
    loadState,
    ...snapshot
  } = store;

  return snapshot;
}

/**
 * Hook: 获取特定类别的状态
 * @param {string} category - 类别名称（如 'stores', 'character'等）
 * @returns {Object} - 该类别的状态对象
 */
export function useGameStateCategory(category) {
  const store = useGameStore();
  return store.getState(category) || {};
}

/**
 * Hook: 批量设置状态
 * @param {string} parentPath - 父路径
 * @returns {Function} - 批量设置函数
 */
export function useGameStateSetMultiple(parentPath) {
  const store = useGameStore();

  return useCallback((updates) => {
    store.setMultiple(parentPath, updates);
  }, [parentPath, store]);
}

/**
 * Hook: 批量增加状态
 * @param {string} parentPath - 父路径
 * @returns {Function} - 批量增加函数
 */
export function useGameStateAddMultiple(parentPath) {
  const store = useGameStore();

  return useCallback((updates) => {
    store.addToMultiple(parentPath, updates);
  }, [parentPath, store]);
}

/**
 * Hook: 发布事件
 * @returns {Function} - 发布函数
 */
export function usePublishEvent() {
  return useCallback((eventName, data = null) => {
    eventBus.publish(eventName, data);
  }, []);
}

/**
 * Hook: 游戏保存
 * @returns {Function} - 保存函数
 */
export function useGameSave() {
  const store = useGameStore();
  const publishEvent = usePublishEvent();

  return useCallback(() => {
    // Zustand的persist中间件会自动保存到localStorage
    publishEvent('gameSave');
  }, [store, publishEvent]);
}

/**
 * Hook: 游戏加载
 * @returns {Function} - 加载函数
 */
export function useGameLoad() {
  const store = useGameStore();
  const publishEvent = usePublishEvent();

  return useCallback(() => {
    publishEvent('gameLoad');
  }, [store, publishEvent]);
}

/**
 * Hook: 游戏重置
 * @returns {Function} - 重置函数
 */
export function useGameReset() {
  const store = useGameStore();
  const publishEvent = usePublishEvent();

  return useCallback(() => {
    store.resetState();
    publishEvent('gameLoad');
  }, [store, publishEvent]);
}

export default {
  useGameState,
  useGameStateWatch,
  useGameStateAdd,
  useGameTimer,
  useGameEvent,
  useGameStateSnapshot,
  useGameStateCategory,
  useGameStateSetMultiple,
  useGameStateAddMultiple,
  usePublishEvent,
  useGameSave,
  useGameLoad,
  useGameReset
};
