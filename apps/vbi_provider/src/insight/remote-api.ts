import type { VBIInsightBuilder } from '@visactor/vbi'
import type {
  InsightCreateInput,
  InsightResponse,
  InsightSummary,
  InsightUpdateInput,
  RemoteBuilderState,
  VBIProviderClientOptions,
} from '../types'
import { createRemoteResourceApi, pickResourceSummary } from '../remote/resource-api'
import { requestRemote } from '../remote/http'
import { requireRemoteResourceId } from '../remote/collaboration'

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

  return {
    ...api,
    update: (input: InsightUpdateInput) =>
      requestRemote<InsightResponse>(config, `/insights/${requireRemoteResourceId(state, 'insight')}`, {
        body: input,
        method: 'PATCH',
      }),
  }
}
