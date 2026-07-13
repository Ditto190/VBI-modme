import type { VBIInsightBuilder } from '@visactor/vbi'
import type {
  InsightCreateInput,
  InsightResponse,
  InsightSummary,
  RemoteBuilderState,
  VBIProviderClientOptions,
} from '../types'
import { createRemoteResourceApi, pickResourceSummary } from '../remote/resource-api'

const toSummary = (response: InsightSummary): InsightSummary => pickResourceSummary(response)

export const createInsightRemoteApi = (
  config: VBIProviderClientOptions,
  state: RemoteBuilderState<VBIInsightBuilder>,
) => {
  const api = createRemoteResourceApi<InsightResponse, InsightSummary, InsightCreateInput>({
    config,
    label: 'insight',
    path: '/insights',
    state,
    toSummary,
  })

  return api
}
