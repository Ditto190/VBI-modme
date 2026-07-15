import { createStore } from '@stencil/store'
import { type VSeed } from '@visactor/vseed'
import { type ChartBuilderStore } from './builder'
import { type ChartConfigStore } from './config'

export interface ChartVSeedState {
  vseed: VSeed | null
}

export interface ChartVSeedStore {
  state: ChartVSeedState
  onChange: <Key extends keyof ChartVSeedState>(propName: Key, cb: (newValue: ChartVSeedState[Key]) => void) => void
  dispose: () => void
}

export function createChartVSeedStore(chartBuilder: ChartBuilderStore, chartConfig: ChartConfigStore): ChartVSeedStore {
  const {
    state,
    onChange,
    dispose: storeDispose,
  } = createStore<ChartVSeedState>({
    vseed: chartBuilder.state.vseed,
  })

  const syncVSeed = () => {
    const vseed = chartBuilder.state.vseed
    const { locale, theme } = chartConfig.state

    if (!vseed || (!locale && !theme)) {
      state.vseed = vseed
      return
    }

    state.vseed = {
      ...vseed,
      ...(locale ? { locale } : {}),
      ...(theme ? { theme } : {}),
    } as VSeed
  }

  // initial sync
  syncVSeed()

  // bind events
  chartBuilder.onChange('vseed', syncVSeed)
  chartConfig.onChange('locale', syncVSeed)
  chartConfig.onChange('theme', syncVSeed)

  const dispose = () => {
    storeDispose()
  }

  return { state, onChange, dispose }
}
