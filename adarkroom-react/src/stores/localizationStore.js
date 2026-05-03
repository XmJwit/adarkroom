import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LANGUAGES } from '../constants/gameConstants';

/**
 * 多语言存储
 */
export const useLocalizationStore = create(
  persist(
    (set, get) => ({
      currentLanguage: LANGUAGES.ZH_CN || 'en',
      languages: {},
      
      // 设置当前语言
      setLanguage: (lang) => {
        set({ currentLanguage: lang });
        
        // 加载对应语言的翻译
        get().loadLanguage(lang);
      },
      
      // 加载语言文件
      loadLanguage: async (lang) => {
        try {
          // 从public/lang/{lang}/strings.js加载翻译
          const response = await fetch(`/lang/${lang}/strings.js`);
          // 这个实现需要解析JS文件，实际项目中可能需要转换为JSON
          // 暂时留作示例
        } catch (error) {
          console.warn(`Failed to load language ${lang}:`, error);
        }
      },
      
      // 获取翻译字符串
      getTranslation: (key) => {
        const { currentLanguage, languages } = get();
        return languages[currentLanguage]?.[key] || key;
      },
      
      // 设置翻译
      setTranslation: (lang, translations) => {
        set((state) => ({
          languages: {
            ...state.languages,
            [lang]: translations
          }
        }));
      },
      
      // 合并翻译
      mergeTranslations: (lang, translations) => {
        set((state) => ({
          languages: {
            ...state.languages,
            [lang]: {
              ...state.languages[lang],
              ...translations
            }
          }
        }));
      }
    }),
    {
      name: 'adarkroom-localization'
    }
  )
);

// 创建全局翻译函数（模仿原项目的_()函数）
export const _i18n = (key, defaultValue = null) => {
  const store = useLocalizationStore.getState();
  return store.getTranslation(key) || defaultValue || key;
};

// 别名
export const t = _i18n;

export default useLocalizationStore;
