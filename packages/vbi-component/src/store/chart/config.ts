import { createStore } from '@stencil/store'
import {
  VBI_DEFAULT_LIMIT,
  VBI_DEFAULT_LOCALE,
  VBI_DEFAULT_THEME,
  type VbiLocale,
  type VbiTheme,
} from 'src/constants/builder'

export interface ChartConfigState {
  locale: VbiLocale
  theme: VbiTheme
  limit: number
  connectorId: string
}

export interface ChartConfigStore {
  state: ChartConfigState
  onChange: <Key extends keyof ChartConfigState>(propName: Key, cb: (newValue: ChartConfigState[Key]) => void) => void
}

export function createChartConfigStore(): ChartConfigStore {
  const { state, onChange } = createStore<ChartConfigState>({
    locale: VBI_DEFAULT_LOCALE,
    theme: VBI_DEFAULT_THEME,
    limit: VBI_DEFAULT_LIMIT,
    connectorId: '',
  })

  return { state, onChange }
}
