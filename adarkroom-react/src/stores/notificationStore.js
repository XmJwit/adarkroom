import { create } from 'zustand';
import { eventBus, EVENT_TYPES } from '../utils/eventBus';

/**
 * 通知存储
 */
export const useNotificationStore = create((set, get) => ({
  notifications: [],
  queue: {},

  /**
   * 添加通知
   */
  addNotification: (message, options = {}) => {
    const {
      id = Date.now(),
      type = 'info',
      duration = 3000,
      noQueue = false,
      module = null
    } = options;

    const notification = {
      id,
      message: message.endsWith('.') ? message : message + '.',
      type,
      duration,
      module
    };

    // 检查是否应该排队
    if (module && !noQueue) {
      set((state) => ({
        queue: {
          ...state.queue,
          [module]: [...(state.queue[module] || []), notification]
        }
      }));
    } else {
      set((state) => ({
        notifications: [notification, ...state.notifications]
      }));

      // 如果设置了持续时间，自动删除
      if (duration > 0) {
        setTimeout(() => {
          get().removeNotification(id);
        }, duration);
      }
    }

    eventBus.publish(EVENT_TYPES.NOTIFICATION, { notification });
  },

  /**
   * 移除通知
   */
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }));
  },

  /**
   * 清空所有通知
   */
  clearNotifications: () => {
    set({ notifications: [] });
  },

  /**
   * 清空模块队列并显示通知
   */
  printQueue: (module) => {
    set((state) => {
      const queue = state.queue[module] || [];
      const newNotifications = [...queue, ...state.notifications];

      return {
        notifications: newNotifications,
        queue: { ...state.queue, [module]: [] }
      };
    });
  },

  /**
   * 清空队列
   */
  clearQueue: (module) => {
    set((state) => ({
      queue: { ...state.queue, [module]: [] }
    }));
  },

  /**
   * 清空所有队列中超出视口的通知（优化性能）
   */
  clearHidden: () => {
    // 在React中，我们通过List虚拟化来处理这个问题
    // 这个方法在此保留以兼容性
  }
}));

export default useNotificationStore;
