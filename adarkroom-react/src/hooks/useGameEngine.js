import { useEffect, useCallback, useRef } from 'react';
import { gameEngine } from '../services/gameEngine';
import { eventBus, EVENT_TYPES } from '../utils/eventBus';

/**
 * Hook: 使用游戏引擎
 */
export function useGameEngine() {
  const engineRef = useRef(gameEngine);

  useEffect(() => {
    // 初始化引擎
    if (!engineRef.current.initialized) {
      engineRef.current.init();
    }

    return () => {
      // 清理
      // 注意：我们不销毁引擎，因为它在应用的生命周期内需要持续运行
    };
  }, []);

  return engineRef.current;
}

/**
 * Hook: 监听游戏事件
 */
export function useGameEvent(eventType, callback) {
  useEffect(() => {
    const unsubscribe = eventBus.subscribe(eventType, callback);
    return unsubscribe;
  }, [eventType, callback]);
}

/**
 * Hook: 保存游戏
 */
export function useSaveGame() {
  const engine = useGameEngine();

  return useCallback(() => {
    engine.saveGame();
  }, [engine]);
}

/**
 * Hook: 加载游戏
 */
export function useLoadGame() {
  const engine = useGameEngine();

  return useCallback(() => {
    engine.loadGame();
  }, [engine]);
}

/**
 * Hook: 重新开始游戏
 */
export function useRestartGame() {
  const engine = useGameEngine();

  return useCallback(() => {
    engine.restartGame();
  }, [engine]);
}

/**
 * Hook: 导出游戏
 */
export function useExportGame() {
  const engine = useGameEngine();

  return useCallback(() => {
    engine.exportGame();
  }, [engine]);
}

/**
 * Hook: 导入游戏
 */
export function useImportGame() {
  const engine = useGameEngine();

  return useCallback((json) => {
    engine.importGame(json);
  }, [engine]);
}

/**
 * Hook: 分享游戏
 */
export function useShareGame() {
  const engine = useGameEngine();

  return useCallback(() => {
    engine.shareGame();
  }, [engine]);
}

/**
 * Hook: 切换音量
 */
export function useToggleVolume() {
  const engine = useGameEngine();

  return useCallback((enable) => {
    engine.toggleVolume(enable);
  }, [engine]);
}

/**
 * Hook: 切换灯光
 */
export function useToggleLights() {
  const engine = useGameEngine();

  return useCallback((off) => {
    engine.toggleLights(off);
  }, [engine]);
}

/**
 * Hook: 切换超级模式
 */
export function useToggleHyperMode() {
  const engine = useGameEngine();

  return useCallback((enable) => {
    engine.toggleHyperMode(enable);
  }, [engine]);
}

/**
 * Hook: 前往位置
 */
export function useTravelTo() {
  const engine = useGameEngine();

  return useCallback((location) => {
    engine.travelTo(location);
  }, [engine]);
}

export default {
  useGameEngine,
  useGameEvent,
  useSaveGame,
  useLoadGame,
  useRestartGame,
  useExportGame,
  useImportGame,
  useShareGame,
  useToggleVolume,
  useToggleLights,
  useToggleHyperMode,
  useTravelTo
};
