import { createStore } from '@stencil/store'
import { type VBIChartDSL } from '@visactor/vbi'
import { VBI_DEFAULT_LOCALE, type VbiLocale } from 'src/constants/builder'
import { type ChartBuilderStore } from 'src/store/chart/builder'
import type { TranslationParams } from './types'
import { createTranslator } from './utils'

export interface TranslationState {
  locale: VbiLocale
  t: (key: string, params?: TranslationParams) => string
}

export interface TranslationStore {
  state: TranslationState
  onChange: <Key extends keyof TranslationState>(propName: Key, cb: (newValue: TranslationState[Key]) => void) => void
  setLocale: (locale: VbiLocale) => void
  dispose: () => void
}

export const createTranslationStore = (chartBuilder: ChartBuilderStore): TranslationStore => {
  const initialDSL = chartBuilder.builder.dsl.toJSON() as VBIChartDSL
  const initialLocale = (initialDSL.locale ?? VBI_DEFAULT_LOCALE) as VbiLocale

  const { state, onChange, dispose } = createStore<TranslationState>({
    locale: initialLocale,
    t: createTranslator(initialLocale),
  })

  const syncFromDSL = (dsl: VBIChartDSL) => {
    const newLocale = (dsl.locale ?? VBI_DEFAULT_LOCALE) as VbiLocale
    if (newLocale !== state.locale) {
      state.locale = newLocale
      state.t = createTranslator(newLocale)
    }
  }

  chartBuilder.onChange('dsl', (dsl: VBIChartDSL) => {
    syncFromDSL(dsl)
  })

  const setLocale = (newLocale: VbiLocale) => {
    chartBuilder.builder.locale?.setLocale(newLocale)
  }

  return { state, onChange, setLocale, dispose }
}
