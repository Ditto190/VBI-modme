import type { VBIChartBuilder } from '@visactor/vbi'
import type {
  ChartDetail,
  ChartSummary,
  ResourceSnapshot,
  RemoteBuilderState,
  VBIProviderClientOptions,
} from '../types'
import { createRemoteResourceApi, pickResourceSummary } from '../remote/resource-api'

const toSummary = (detail: ChartSummary): ChartSummary => pickResourceSummary(detail)

const toSnapshot = (detail: ChartDetail): ResourceSnapshot<ChartDetail['dsl']> => ({
  resource: toSummary(detail),
  dsl: detail.dsl,
})

export const createChartRemoteApi = (config: VBIProviderClientOptions, state: RemoteBuilderState<VBIChartBuilder>) => {
  const api = createRemoteResourceApi<ChartDetail, ChartSummary>({
    config,
    label: 'chart',
    path: '/charts',
    state,
    toSummary,
  })

  return {
    ...api,
    getDetail: api.getResponse,
    getSnapshot: async () => toSnapshot(await api.getResponse()),
  }
}
