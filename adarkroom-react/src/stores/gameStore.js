import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 初始状态结构，基于原始JavaScript版本的StateManager
const initialState = {
  // 大功能特性：建筑、位置可用性、解锁等
  features: {},
  
  // 小物品、武器等
  stores: {},
  
  // 玩家角色统计：特性等
  character: {},
  
  // 收入相关
  income: {},
  
  // 定时器
  timers: {},
  
  // 游戏相关：火焰温度、工作人员、人口、世界地图等
  game: {},
  
  // 游戏统计：游戏时间、加载次数等
  playStats: {},
  
  // 前置条件：声望、得分、奖杯、成就等
  previous: {},
  
  // 临时存储路径上要携带的物品
  outfit: {},
  
  // 配置
  config: {},
  
  // 神秘流浪者返回
  wait: {},
  
  // 冷却按钮的残留值
  cooldown: {}
};

// 创建Zustand store
export const useGameStore = create(
  persist(
    (set, get) => ({
      // 初始状态
      ...initialState,
      
      // 获取状态值（支持路径获取，如 "stores.wood"）
      getState: (path, defaultReturn = undefined) => {
        const state = get();
        if (!path) return state;
        
        const keys = path.split(/[.\[\]'"]+/).filter(k => k !== '');
        let current = state;
        
        for (const key of keys) {
          if (current && typeof current === 'object' && key in current) {
            current = current[key];
          } else {
            return defaultReturn;
          }
        }
        
        return current;
      },
      
      // 设置单个状态
      setState: (path, value, noEvent = false) => {
        set((state) => {
          const newState = JSON.parse(JSON.stringify(state));
          const keys = path.split(/[.\[\]'"]+/).filter(k => k !== '');
          
          // 确保值不超过最大值
          let finalValue = value;
          if (typeof finalValue === 'number' && finalValue > 99999999999999) {
            finalValue = 99999999999999;
          }
          
          // 导航到正确的位置并设置值
          let current = newState;
          for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
              current[keys[i]] = {};
            }
            current = current[keys[i]];
          }
          
          current[keys[keys.length - 1]] = finalValue;
          
          // stores 类别的值不能为负数
          if (path.startsWith('stores') && current[keys[keys.length - 1]] < 0) {
            current[keys[keys.length - 1]] = 0;
          }
          
          return newState;
        });
        
        // 触发保存（如果noEvent为false）
        if (!noEvent && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('stateUpdate', { detail: { path } }));
        }
      },
      
      // 批量设置状态
      setMultiple: (parentPath, updates, noEvent = false) => {
        set((state) => {
          const newState = JSON.parse(JSON.stringify(state));
          
          for (const [key, value] of Object.entries(updates)) {
            const path = parentPath ? `${parentPath}.${key}` : key;
            const keys = path.split(/[.\[\]'"]+/).filter(k => k !== '');
            
            let current = newState;
            for (let i = 0; i < keys.length - 1; i++) {
              if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
                current[keys[i]] = {};
              }
              current = current[keys[i]];
            }
            
            current[keys[keys.length - 1]] = value;
          }
          
          return newState;
        });
        
        if (!noEvent && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('stateUpdate', { detail: { path: parentPath } }));
        }
      },
      
      // 给数值状态加上一个值
      addToState: (path, value, noEvent = false) => {
        const currentValue = get()[path] || 0;
        
        if (typeof currentValue !== 'number' || typeof value !== 'number') {
          console.error(`Cannot add to ${path}: not a number`);
          return false;
        }
        
        get().setState(path, currentValue + value, noEvent);
        return true;
      },
      
      // 批量增加状态值
      addToMultiple: (parentPath, updates, noEvent = false) => {
        for (const [key, value] of Object.entries(updates)) {
          const path = parentPath ? `${parentPath}.${key}` : key;
          get().addToState(path, value, true);
        }
        
        if (!noEvent && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('stateUpdate', { detail: { path: parentPath } }));
        }
      },
      
      // 重置所有状态
      resetState: () => {
        set(initialState);
      },
      
      // 加载保存的状态
      loadState: (savedState) => {
        set(savedState);
      }
    }),
    {
      name: 'adarkroom-game-state', // localStorage key
      partialize: (state) => {
        // 排除某些不需要持久化的字段（如果需要）
        const { getState, setState, setMultiple, addToState, addToMultiple, resetState, loadState, ...persistedState } = state;
        return persistedState;
      }
    }
  )
);

export default useGameStore;
