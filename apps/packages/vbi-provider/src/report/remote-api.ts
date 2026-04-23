import type { VBIReportSnapshotDSL } from '@visactor/vbi'
import type {
  ReportDetail,
  ReportPageInput,
  ReportResponse,
  ReportSummary,
  ResourceSnapshot,
  RemoteBuilderState,
  RemoteSessionConnection,
  VBIProviderClientOptions,
} from '../types'
import { requestRemote } from '../remote/http'
import { requireRemoteResourceId } from '../remote/collaboration'

const toReportSummary = ({ createdAt, id, name, updatedAt }: ReportResponse): ReportSummary => ({
  createdAt,
  id,
  name,
  updatedAt,
})

export const toReportDetail = ({ createdAt, id, name, pages, updatedAt }: ReportResponse): ReportDetail => ({
  createdAt,
  dsl: { pages: pages ?? [], uuid: id, version: 0 },
  id,
  name,
  updatedAt,
})

const toSnapshot = (detail: ReportDetail): ResourceSnapshot<ReportDetail['dsl']> => ({
  resource: toReportSummary(detail),
  dsl: detail.dsl,
})

export const createReportRemoteApi = (config: VBIProviderClientOptions, state: RemoteBuilderState<unknown>) => {
  const requireId = () => requireRemoteResourceId(state, 'report')
  const getResponse = () => requestRemote<ReportResponse>(config, `/reports/${requireId()}`)
  const mapDetail = (request: Promise<ReportResponse>) => request.then(toReportDetail)

  return {
    create: async (input?: { name?: string }) => {
      const summary = await requestRemote<ReportResponse>(config, '/reports', { body: input, method: 'POST' })
      state.resourceId = summary.id
      return toReportSummary(await getResponse())
    },
    exportSnapshot: () => requestRemote<VBIReportSnapshotDSL>(config, `/reports/${requireId()}/snapshot`),
    getDetail: async () => toReportDetail(await getResponse()),
    getSession: () => requestRemote<RemoteSessionConnection>(config, `/reports/${requireId()}/collaboration`),
    getSnapshot: async () => toSnapshot(toReportDetail(await getResponse())),
    getSummary: async () => toReportSummary(await getResponse()),
    remove: () =>
      requestRemote<ReportResponse>(config, `/reports/${requireId()}`, { method: 'DELETE' }).then(toReportSummary),
    rename: (name: string) =>
      requestRemote<ReportResponse>(config, `/reports/${requireId()}`, { body: { name }, method: 'PATCH' }).then(
        toReportSummary,
      ),
    createPage: (input?: { title?: string }) =>
      mapDetail(
        requestRemote<ReportResponse>(config, `/reports/${requireId()}/pages`, { body: input, method: 'POST' }),
      ),
    removePage: (pageId: string) =>
      mapDetail(requestRemote<ReportResponse>(config, `/reports/${requireId()}/pages/${pageId}`, { method: 'DELETE' })),
    reorderPages: (pageIds: string[]) =>
      mapDetail(
        requestRemote<ReportResponse>(config, `/reports/${requireId()}/pages/reorder`, {
          body: { pageIds },
          method: 'PATCH',
        }),
      ),
    updatePage: (pageId: string, input: ReportPageInput) =>
      mapDetail(
        requestRemote<ReportResponse>(config, `/reports/${requireId()}/pages/${pageId}`, {
          body: input,
          method: 'PATCH',
        }),
      ),
  }
}
