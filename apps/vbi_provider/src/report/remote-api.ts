import type { VBIReportBuilder, VBIReportSnapshotDSL } from '@visactor/vbi'
import type {
  ReportDetail,
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

  return {
    ...api,
    exportSnapshot: () => requestRemote<VBIReportSnapshotDSL>(config, `/reports/${requireId()}/snapshot`),
    getDetail: async () => toReportDetail(await api.getResponse()),
    getSnapshot: async () => toSnapshot(toReportDetail(await api.getResponse())),
  }
}
