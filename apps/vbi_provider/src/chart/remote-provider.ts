import { VBIChartBuilder } from '@visactor/vbi'
import { createChartRemoteApi } from './remote-api'
import { closeRemoteBuilder, createRemoteBuilderState, openRemoteBuilder } from '../remote/collaboration'
import type { ChartProvider, ChartSummary, RemoteBuilderState, VBIProviderClientOptions } from '../types'

const close = (state: RemoteBuilderState<VBIChartBuilder>) => closeRemoteBuilder(state)

const getCollaborationProvider = async (
  state: RemoteBuilderState<VBIChartBuilder>,
  getBuilder: () => Promise<VBIChartBuilder>,
) => {
  await getBuilder()
  return state.provider
}

const remove = async (state: RemoteBuilderState<VBIChartBuilder>, removeResource: () => Promise<ChartSummary>) => {
  const summary = await removeResource()
  await close(state)
  state.resourceId = null
  return summary
}

const getLocalDetail = async (getBuilder: () => Promise<VBIChartBuilder>, getSummary: ChartProvider['getSummary']) => ({
  ...(await getSummary()),
  dsl: (await getBuilder()).build(),
})

const getLocalSnapshot = async (
  getBuilder: () => Promise<VBIChartBuilder>,
  getSummary: ChartProvider['getSummary'],
) => ({
  resource: await getSummary(),
  dsl: (await getBuilder()).build(),
})

export const createRemoteChartProvider = (config: VBIProviderClientOptions, resourceId?: string): ChartProvider => {
  const state = createRemoteBuilderState<VBIChartBuilder>(resourceId)
  const api = createChartRemoteApi(config, state)
  const getBuilder = () => openRemoteBuilder(config, state, api.getSession, (doc) => new VBIChartBuilder(doc))

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
    getReferences: api.getReferences,
  }
}
