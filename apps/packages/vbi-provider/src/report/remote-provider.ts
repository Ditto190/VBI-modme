import { VBIReportBuilder, type VBIReportSnapshotDSL } from '@visactor/vbi'
import { createReportRemoteApi } from './remote-api'
import { closeRemoteBuilder, createRemoteBuilderState, openRemoteBuilder } from '../remote/collaboration'
import type { ReportProvider, ReportSummary, RemoteBuilderState, VBIProviderClientOptions } from '../types'

const close = (state: RemoteBuilderState<VBIReportBuilder>) => closeRemoteBuilder(state)

const getCollaborationProvider = async (
  state: RemoteBuilderState<VBIReportBuilder>,
  getBuilder: () => Promise<VBIReportBuilder>,
) => {
  await getBuilder()
  return state.provider
}

const remove = async (state: RemoteBuilderState<VBIReportBuilder>, removeResource: () => Promise<ReportSummary>) => {
  const summary = await removeResource()
  await close(state)
  state.resourceId = null
  return summary
}

const getLocalDetail = async (
  getBuilder: () => Promise<VBIReportBuilder>,
  getSummary: ReportProvider['getSummary'],
) => ({
  ...(await getSummary()),
  dsl: (await getBuilder()).build(),
})

const getLocalSnapshot = async (
  getBuilder: () => Promise<VBIReportBuilder>,
  getSummary: ReportProvider['getSummary'],
) => ({
  resource: await getSummary(),
  dsl: (await getBuilder()).build(),
})

export const createRemoteReportProvider = (config: VBIProviderClientOptions, resourceId?: string): ReportProvider => {
  const state = createRemoteBuilderState<VBIReportBuilder>(resourceId)
  const api = createReportRemoteApi(config, state)
  const getBuilder = () => openRemoteBuilder(config, state, api.getSession, (doc) => new VBIReportBuilder(doc))

  return {
    getResourceId: () => state.resourceId,
    create: api.create,
    remove: () => remove(state, api.remove),
    rename: api.rename,
    open: getBuilder,
    close: () => close(state),
    getBuilder,
    getCollaborationProvider: () => getCollaborationProvider(state, getBuilder),
    getSummary: api.getSummary,
    getDetail: () => (state.builder ? getLocalDetail(getBuilder, api.getSummary) : api.getDetail()),
    snapshot: () => (state.builder ? getLocalSnapshot(getBuilder, api.getSummary) : api.getSnapshot()),
    exportSnapshot: (): Promise<VBIReportSnapshotDSL> => api.exportSnapshot(),
    createPage: api.createPage,
    reorderPages: api.reorderPages,
    updatePage: api.updatePage,
    removePage: api.removePage,
  }
}
