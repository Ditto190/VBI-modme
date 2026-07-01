import { createStore } from '@stencil/store'
import { type VBIChartDSL } from '@visactor/vbi'
import {
  VBI_DEFAULT_LIMIT,
  VBI_DEFAULT_LOCALE,
  VBI_DEFAULT_THEME,
  type VbiLocale,
  type VbiTheme,
} from 'src/constants/builder'
import { type ChartBuilderStore } from './builder'

export interface ChartConfigState {
  locale: VbiLocale
  theme: VbiTheme
  limit: number
  connectorId: string
}

export interface ChartConfigStore {
  state: ChartConfigState
  onChange: <Key extends keyof ChartConfigState>(propName: Key, cb: (newValue: ChartConfigState[Key]) => void) => void
  dispose: () => void
}

const normalizeLimit = (limit: number) => {
  return Math.max(1, Math.round(limit))
}

export function createChartConfigStore(chartBuilder: ChartBuilderStore): ChartConfigStore {
  const initialDSL = chartBuilder.builder.dsl.toJSON() as VBIChartDSL

  const { state, onChange, dispose } = createStore<ChartConfigState>({
    locale: initialDSL.locale ?? VBI_DEFAULT_LOCALE,
    theme: initialDSL.theme ?? VBI_DEFAULT_THEME,
    limit: normalizeLimit(initialDSL.limit || VBI_DEFAULT_LIMIT),
    connectorId: initialDSL.connectorId ?? '',
  })

  const syncFromDSL = (dsl: VBIChartDSL) => {
    state.locale = dsl.locale ?? VBI_DEFAULT_LOCALE
    state.theme = dsl.theme ?? VBI_DEFAULT_THEME
    state.limit = normalizeLimit(dsl.limit || VBI_DEFAULT_LIMIT)
    state.connectorId = dsl.connectorId ?? ''
  }

  chartBuilder.onChange('dsl', (dsl: VBIChartDSL) => {
    syncFromDSL(dsl)
  })

  return { state, onChange, dispose }
}
