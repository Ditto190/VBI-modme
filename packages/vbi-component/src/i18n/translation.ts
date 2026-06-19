import type { VBIStoreApi } from '../store/vbi-store'
import type { Locale, TranslationParams } from './types'
import { createTranslator } from './utils'

export interface TranslationResult {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: TranslationParams) => string
}

export const createTranslation = (store: VBIStoreApi): TranslationResult => {
  const locale = (store.state.builder?.locale?.getLocale() || 'zh-CN') as Locale
  const t = createTranslator(locale)

  const setLocale = (newLocale: Locale) => {
    store.state.builder?.locale?.setLocale(newLocale)
  }

  return {
    locale,
    setLocale,
    t,
  }
}
