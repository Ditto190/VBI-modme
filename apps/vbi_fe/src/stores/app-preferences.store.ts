import { create } from 'zustand'
import type { AppLocale } from '../i18n'

export type AppThemeMode = 'light' | 'dark'

type AppPreferencesState = {
  locale: AppLocale
  themeMode: AppThemeMode
  setLocale(locale: AppLocale): void
  setThemeMode(themeMode: AppThemeMode): void
}

export const useAppPreferencesStore = create<AppPreferencesState>((set) => ({
  locale: 'zh-CN',
  themeMode: 'light',
  setLocale: (locale) => set((state) => (state.locale === locale ? state : { locale })),
  setThemeMode: (themeMode) => set((state) => (state.themeMode === themeMode ? state : { themeMode })),
}))
