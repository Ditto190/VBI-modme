import type { VBIReportBuilder, VBIReportSnapshotDSL } from '@visactor/vbi'
import type {
  ReportDetail,
  ReportPageInput,
  ReportResponse,
  ReportSummary,
  ResourceSnapshot,
  RemoteBuilderState,
  VBIProviderClientOptions,
} from '../types'
import { createRemoteResourceApi, pickResourceSummary } from '../remote/resource-api'
import { requestRemote } from '../remote/http'
import { requireRemoteResourceId } from '../remote/collaboration'

const toReportSummary = (response: ReportSummary): ReportSummary => pickResourceSummary(response)

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

export const createReportRemoteApi = (
  config: VBIProviderClientOptions,
  state: RemoteBuilderState<VBIReportBuilder>,
) => {
  const requireId = () => requireRemoteResourceId(state, 'report')
  const api = createRemoteResourceApi<ReportResponse, ReportSummary>({
    config,
    label: 'report',
    path: '/reports',
    state,
    toSummary: toReportSummary,
  })
  const mapDetail = (request: Promise<ReportResponse>) => request.then(toReportDetail)
  const pagePath = (pageId?: string) => `/reports/${requireId()}/pages${pageId ? `/${pageId}` : ''}`

  return {
    ...api,
    exportSnapshot: () => requestRemote<VBIReportSnapshotDSL>(config, `/reports/${requireId()}/snapshot`),
    getDetail: async () => toReportDetail(await api.getResponse()),
    getSnapshot: async () => toSnapshot(toReportDetail(await api.getResponse())),
    createPage: (input?: { title?: string }) =>
      mapDetail(requestRemote<ReportResponse>(config, pagePath(), { body: input, method: 'POST' })),
    removePage: (pageId: string) =>
      mapDetail(requestRemote<ReportResponse>(config, pagePath(pageId), { method: 'DELETE' })),
    reorderPages: (pageIds: string[]) =>
      mapDetail(
        requestRemote<ReportResponse>(config, `/reports/${requireId()}/pages/reorder`, {
          body: { pageIds },
          method: 'PATCH',
        }),
      ),
    updatePage: (pageId: string, input: ReportPageInput) =>
      mapDetail(
        requestRemote<ReportResponse>(config, pagePath(pageId), {
          body: input,
          method: 'PATCH',
        }),
      ),
  }
}
