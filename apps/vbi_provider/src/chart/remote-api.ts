import type {
  ChartDetail,
  ChartSummary,
  ReportReference,
  ResourceSnapshot,
  RemoteBuilderState,
  RemoteSessionConnection,
  VBIProviderClientOptions,
} from '../types'
import { requestRemote } from '../remote/http'
import { requireRemoteResourceId } from '../remote/collaboration'

const toSummary = ({ createdAt, id, name, updatedAt }: ChartDetail): ChartSummary => ({
  createdAt,
  id,
  name,
  updatedAt,
})

const toSnapshot = (detail: ChartDetail): ResourceSnapshot<ChartDetail['dsl']> => ({
  resource: toSummary(detail),
  dsl: detail.dsl,
})

export const createChartRemoteApi = (config: VBIProviderClientOptions, state: RemoteBuilderState<unknown>) => {
  const requireId = () => requireRemoteResourceId(state, 'chart')
  const getDetail = () => requestRemote<ChartDetail>(config, `/charts/${requireId()}`)

  return {
    create: async (input?: { name?: string }) => {
      const summary = await requestRemote<ChartSummary>(config, '/charts', { body: input, method: 'POST' })
      state.resourceId = summary.id
      return toSummary(await getDetail())
    },
    getDetail,
    getReferences: () => requestRemote<ReportReference[]>(config, `/charts/${requireId()}/references`),
    getSession: () => requestRemote<RemoteSessionConnection>(config, `/charts/${requireId()}/collaboration`),
    getSnapshot: async () => toSnapshot(await getDetail()),
    getSummary: async () => toSummary(await getDetail()),
    remove: () => requestRemote<ChartSummary>(config, `/charts/${requireId()}`, { method: 'DELETE' }),
    rename: (name: string) =>
      requestRemote<ChartSummary>(config, `/charts/${requireId()}`, { body: { name }, method: 'PATCH' }),
  }
}
