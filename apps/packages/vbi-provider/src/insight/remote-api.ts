import type {
  InsightCreateInput,
  InsightResponse,
  InsightSummary,
  InsightUpdateInput,
  ReportReference,
  RemoteBuilderState,
  RemoteSessionConnection,
  VBIProviderClientOptions,
} from '../types'
import { requestRemote } from '../remote/http'
import { requireRemoteResourceId } from '../remote/collaboration'

const toSummary = ({ createdAt, id, name, updatedAt }: InsightResponse): InsightSummary => ({
  createdAt,
  id,
  name,
  updatedAt,
})

export const createInsightRemoteApi = (config: VBIProviderClientOptions, state: RemoteBuilderState<unknown>) => {
  const requireId = () => requireRemoteResourceId(state, 'insight')
  const getSummary = async () => toSummary(await requestRemote<InsightResponse>(config, `/insights/${requireId()}`))

  return {
    create: async (input?: InsightCreateInput) => {
      const summary = await requestRemote<InsightResponse>(config, '/insights', { body: input, method: 'POST' })
      state.resourceId = summary.id
      return getSummary()
    },
    getSession: () => requestRemote<RemoteSessionConnection>(config, `/insights/${requireId()}/collaboration`),
    getSummary,
    getReferences: () => requestRemote<ReportReference[]>(config, `/insights/${requireId()}/references`),
    remove: () => requestRemote<InsightSummary>(config, `/insights/${requireId()}`, { method: 'DELETE' }),
    rename: (name: string) =>
      requestRemote<InsightSummary>(config, `/insights/${requireId()}`, { body: { name }, method: 'PATCH' }),
    update: (input: InsightUpdateInput) =>
      requestRemote<InsightResponse>(config, `/insights/${requireId()}`, { body: input, method: 'PATCH' }),
  }
}
