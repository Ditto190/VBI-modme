import { VBIInsightBuilder } from '@visactor/vbi'
import { createInsightRemoteApi } from './remote-api'
import { closeRemoteBuilder, createRemoteBuilderState, openRemoteBuilder } from '../remote/collaboration'
import type {
  InsightDetail,
  InsightProvider,
  InsightSummary,
  InsightUpdateInput,
  RemoteBuilderState,
  VBIProviderClientOptions,
} from '../types'

const close = (state: RemoteBuilderState<VBIInsightBuilder>) => closeRemoteBuilder(state)

const getCollaborationProvider = async (
  state: RemoteBuilderState<VBIInsightBuilder>,
  getBuilder: () => Promise<VBIInsightBuilder>,
) => {
  await getBuilder()
  return state.provider
}

const remove = async (state: RemoteBuilderState<VBIInsightBuilder>, removeResource: () => Promise<InsightSummary>) => {
  const summary = await removeResource()
  await close(state)
  state.resourceId = null
  return summary
}

const getLocalDetail = async (
  getBuilder: () => Promise<VBIInsightBuilder>,
  getSummary: InsightProvider['getSummary'],
) => ({
  ...(await getSummary()),
  dsl: (await getBuilder()).build(),
})

const getLocalSnapshot = async (
  getBuilder: () => Promise<VBIInsightBuilder>,
  getSummary: InsightProvider['getSummary'],
) => ({
  resource: await getSummary(),
  dsl: (await getBuilder()).build(),
})

export const createRemoteInsightProvider = (config: VBIProviderClientOptions, resourceId?: string): InsightProvider => {
  const state = createRemoteBuilderState<VBIInsightBuilder>(resourceId)
  const api = createInsightRemoteApi(config, state)
  const getBuilder = () => openRemoteBuilder(config, state, api.getSession, (doc) => new VBIInsightBuilder(doc))
  const getDetail = async (): Promise<InsightDetail> => getLocalDetail(getBuilder, api.getSummary)

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
    update: async (input: InsightUpdateInput) => {
      await api.update(input)
      return getDetail()
    },
    getDetail,
    snapshot: () => getLocalSnapshot(getBuilder, api.getSummary),
    getReferences: api.getReferences,
  }
}
