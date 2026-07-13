import { VBIReportBuilder, type VBIReportDSL, type VBIReportSnapshotDSL } from '@visactor/vbi'
import { createReportRemoteApi } from './remote-api'
import { createRemoteBuilderCore } from '../remote/builder-provider'
import { requestRemote } from '../remote/http'
import type {
  ProviderResource,
  ReportDetail,
  ReportPageInput,
  ReportProvider,
  ReportSummary,
  VBIProviderClientOptions,
} from '../types'

const getNextPageTitle = (builder: VBIReportBuilder) => `Page ${builder.build().pages.length + 1}`

const requireReportPageMutationTarget = (builder: VBIReportBuilder, pageId: string) => {
  const pages = builder.build().pages
  if (pages.length <= 1) {
    throw new Error('Report must keep at least one page')
  }
  if (!pages.some((page: VBIReportDSL['pages'][number]) => page.id === pageId)) {
    throw new Error(`Report page with id "${pageId}" not found`)
  }
}

const ensureReferencedResource = async (config: VBIProviderClientOptions, path: string, id?: string) => {
  if (!id) return
  await requestRemote<ProviderResource>(config, `${path}/${id}`)
}

const createPageResource = (config: VBIProviderClientOptions, path: string, name: string) =>
  requestRemote<ProviderResource>(config, path, {
    body: { name },
    method: 'POST',
  })

export const createRemoteReportProvider = (config: VBIProviderClientOptions, resourceId?: string): ReportProvider => {
  const core = createRemoteBuilderCore<
    VBIReportBuilder,
    VBIReportDSL,
    ReportSummary,
    ReturnType<typeof createReportRemoteApi>
  >({
    config,
    createApi: (state) => createReportRemoteApi(config, state),
    createBuilder: (doc) => new VBIReportBuilder(doc),
    resourceId,
  })
  const getDetail = (): Promise<ReportDetail> => (core.state.builder ? core.getLocalDetail() : core.api.getDetail())
  const getLocalDetailAfterMutation = async () => {
    await core.getBuilder()
    return core.getLocalDetail()
  }

  return {
    getResourceId: core.getResourceId,
    create: core.api.create,
    remove: core.remove,
    rename: core.api.rename,
    open: core.getBuilder,
    close: core.close,
    getBuilder: core.getBuilder,
    getCollaborationProvider: core.getCollaborationProvider,
    getSummary: core.api.getSummary,
    getDetail,
    snapshot: () => (core.state.builder ? core.getLocalSnapshot() : core.api.getSnapshot()),
    exportSnapshot: (): Promise<VBIReportSnapshotDSL> => core.api.exportSnapshot(),
    createPage: async (input?: { title?: string }) => {
      const builder = await core.getBuilder()
      const pageNumber = builder.build().pages.length + 1
      const [chart, insight] = await Promise.all([
        createPageResource(config, '/charts', `Chart ${pageNumber}`),
        createPageResource(config, '/insights', `Insight ${pageNumber}`),
      ])
      builder.page.add(input?.title?.trim() || getNextPageTitle(builder), (page) => {
        page.setChartId(chart.id).setInsightId(insight.id)
      })
      return getLocalDetailAfterMutation()
    },
    reorderPages: async (pageIds: string[]) => {
      const builder = await core.getBuilder()
      builder.page.reorder(pageIds)
      return getLocalDetailAfterMutation()
    },
    updatePage: async (pageId: string, input: ReportPageInput) => {
      await Promise.all([
        ensureReferencedResource(config, '/charts', input.chartId),
        ensureReferencedResource(config, '/insights', input.insightId),
      ])
      const builder = await core.getBuilder()
      builder.page.update(pageId, (page) => {
        if (input.title !== undefined) page.setTitle(input.title.trim() || page.toJSON().title)
        if (input.chartId !== undefined) page.setChartId(input.chartId)
        if (input.insightId !== undefined) page.setInsightId(input.insightId)
      })
      return getLocalDetailAfterMutation()
    },
    removePage: async (pageId: string) => {
      const builder = await core.getBuilder()
      requireReportPageMutationTarget(builder, pageId)
      builder.page.remove(pageId)
      return getLocalDetailAfterMutation()
    },
  }
}
