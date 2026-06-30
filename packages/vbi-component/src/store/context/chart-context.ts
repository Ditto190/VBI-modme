import { type ChartStore } from '../chart'
import { connectContext, provideContext } from './context'

const CHART_STORE_EVENT = 'vbi-chart-store-request'

export const provideChartStore = (el: HTMLElement, store: ChartStore) => provideContext(el, CHART_STORE_EVENT, store)

export const connectChartStore = (el: HTMLElement) =>
  connectContext<ChartStore>(
    el,
    CHART_STORE_EVENT,
    `[VBI Warning] Could not find a <vbi-config-provider> wrapping the <${el.tagName.toLowerCase()}> element.`,
  )
