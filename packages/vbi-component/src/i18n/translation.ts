import type { VbiLocale } from 'src/constants/builder'
import type { ChartStore } from 'src/store/chart'
import type { TranslationParams } from './types'
import { createTranslator } from './utils'

export interface TranslationResult {
  locale: VbiLocale
  setLocale: (locale: VbiLocale) => void
  t: (key: string, params?: TranslationParams) => string
}

export const createTranslation = (store: ChartStore): TranslationResult => {
  const locale = (store.chartBuilder.builder.locale?.getLocale() || 'zh-CN') as VbiLocale
  const t = createTranslator(locale)

  const setLocale = (newLocale: VbiLocale) => {
    store.chartBuilder.builder.locale?.setLocale(newLocale)
  }

  return {
    locale,
    setLocale,
    t,
  }
}
