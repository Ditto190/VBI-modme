import { VBIInsightBuilder, type VBIInsightDSL } from '@visactor/vbi'
import { createInsightRemoteApi } from './remote-api'
import { createRemoteBuilderCore } from '../remote/builder-provider'
import type {
  InsightDetail,
  InsightProvider,
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
  const getDetail = async (): Promise<InsightDetail> => core.getLocalDetail()

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
