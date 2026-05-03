import { useEffect, useCallback } from 'react';
import { useLocalizationStore, _i18n } from '../stores/localizationStore';
import { eventBus, EVENT_TYPES } from '../utils/eventBus';

/**
 * Hook: 使用翻译
 * @param {string} key - 翻译键
 * @param {any} defaultValue - 默认值
 * @returns {string} - 翻译字符串
 */
export function useTranslation(key, defaultValue = null) {
  const currentLanguage = useLocalizationStore((state) => state.currentLanguage);
  const getTranslation = useLocalizationStore((state) => state.getTranslation);

  return getTranslation(key) || defaultValue || key;
}

/**
 * Hook: 获取翻译函数（类似原项目的_()）
 * @returns {Function} - 翻译函数
 */
export function useI18n() {
  return useCallback((key, defaultValue = null) => {
    return _i18n(key, defaultValue);
  }, []);
}

/**
 * Hook: 监听语言变化
 * @param {Function} callback - 回调函数
 */
export function useLanguageChange(callback) {
  useEffect(() => {
    const unsubscribe = eventBus.subscribe(EVENT_TYPES.LANGUAGE_CHANGE, callback);
    return unsubscribe;
  }, [callback]);
}

/**
 * Hook: 获取可用语言列表
 * @returns {Array} - 语言列表
 */
export function useAvailableLanguages() {
  const languages = useLocalizationStore((state) => state.languages);
  return Object.keys(languages);
}

/**
 * Hook: 获取和设置当前语言
 * @returns {[string, Function]} - [当前语言, 设置语言函数]
 */
export function useCurrentLanguage() {
  const currentLanguage = useLocalizationStore((state) => state.currentLanguage);
  const setLanguage = useLocalizationStore((state) => state.setLanguage);

  const handleSetLanguage = useCallback((lang) => {
    setLanguage(lang);
    eventBus.publish(EVENT_TYPES.LANGUAGE_CHANGE, { language: lang });
  }, [setLanguage]);

  return [currentLanguage, handleSetLanguage];
}

export default {
  useTranslation,
  useI18n,
  useLanguageChange,
  useAvailableLanguages,
  useCurrentLanguage
};
