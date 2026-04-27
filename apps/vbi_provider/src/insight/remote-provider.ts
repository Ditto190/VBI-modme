import { VBIInsightBuilder, type VBIInsightDSL } from '@visactor/vbi'
import { createInsightRemoteApi } from './remote-api'
import { createRemoteBuilderCore } from '../remote/builder-provider'
import type {
  InsightDetail,
  InsightProvider,
  InsightResponse,
  InsightSummary,
  InsightUpdateInput,
  VBIProviderClientOptions,
} from '../types'

export const createRemoteInsightProvider = (config: VBIProviderClientOptions, resourceId?: string): InsightProvider => {
  const core = createRemoteBuilderCore<
    VBIInsightBuilder,
    VBIInsightDSL,
    InsightSummary,
    ReturnType<typeof createInsightRemoteApi>
  >({
    config,
    createApi: (state) => createInsightRemoteApi(config, state),
    createBuilder: (doc) => new VBIInsightBuilder(doc),
    resourceId,
  })
  const getRemoteDetail = async (): Promise<InsightDetail> => {
    const resource = (await core.api.getResponse()) as InsightResponse
    return {
      ...resource,
      dsl: {
        content: resource.content ?? '',
        uuid: resource.id,
        version: 0,
      },
    }
  }
  const getDetail = async (): Promise<InsightDetail> => (core.state.builder ? core.getLocalDetail() : getRemoteDetail())

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
    update: async (input: InsightUpdateInput) => {
      await core.api.update(input)
      return getDetail()
    },
    getDetail,
    snapshot: core.getLocalSnapshot,
    getReferences: core.api.getReferences,
  }
}
