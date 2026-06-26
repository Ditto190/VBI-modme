import type { VbiLocale } from 'src/constants/builder'
import type { VBIStoreApi } from '../store/vbi-store'
import type { TranslationParams } from './types'
import { createTranslator } from './utils'

export interface TranslationResult {
  locale: VbiLocale
  setLocale: (locale: VbiLocale) => void
  t: (key: string, params?: TranslationParams) => string
}

export const createTranslation = (store: VBIStoreApi): TranslationResult => {
  const locale = (store.state.builder?.locale?.getLocale() || 'zh-CN') as VbiLocale
  const t = createTranslator(locale)

  const setLocale = (newLocale: VbiLocale) => {
    store.state.builder?.locale?.setLocale(newLocale)
  }

  return {
    locale,
    setLocale,
    t,
  }
}
