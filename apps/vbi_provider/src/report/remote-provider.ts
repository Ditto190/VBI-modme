import { VBIReportBuilder, type VBIReportDSL, type VBIReportSnapshotDSL } from '@visactor/vbi'
import { createReportRemoteApi } from './remote-api'
import { createRemoteBuilderCore } from '../remote/builder-provider'
import type { ReportProvider, ReportSummary, VBIProviderClientOptions } from '../types'

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
    getDetail: () => (core.state.builder ? core.getLocalDetail() : core.api.getDetail()),
    snapshot: () => (core.state.builder ? core.getLocalSnapshot() : core.api.getSnapshot()),
    exportSnapshot: (): Promise<VBIReportSnapshotDSL> => core.api.exportSnapshot(),
    createPage: core.api.createPage,
    reorderPages: core.api.reorderPages,
    updatePage: core.api.updatePage,
    removePage: core.api.removePage,
  }
}
