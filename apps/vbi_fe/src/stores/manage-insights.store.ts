import { create } from 'zustand'
import { tRuntime } from '../i18n/runtime'
import { createInsight, deleteInsight, updateInsight } from '../services/insightApi'
import { listResources } from '../services/resourceApi'
import {
  createResourceManagementState,
  selectResourceManagementPageState,
  type ResourceManagementState,
} from './resource-management.model'

const connectInsightSession = async (resourceId: string, userName: string) => {
  const { connectResourceSession } = await import('./resource-session.store')
  await connectResourceSession('insight', resourceId, userName)
}

const releaseInsightSession = async (resourceId: string) => {
  const { releaseResourceSession } = await import('./resource-session.store')
  await releaseResourceSession('insight', resourceId)
}

type ManageInsightsState = ResourceManagementState

const getNextInsightName = () => tRuntime('insights.untitled')

export const useManageInsightsStore = create<ManageInsightsState>((set, get) => ({
  ...createResourceManagementState(set, get, {
    kind: 'insight',
    connectSession: connectInsightSession,
    create: async (_, name, input) => {
      await createInsight({
        content: input.content ?? '',
        name,
      })
    },
    getFallbackName: getNextInsightName,
    list: () => listResources('insight'),
    releaseSession: releaseInsightSession,
    remove: (id) => deleteInsight(id),
    rename: (id, name) => updateInsight(id, { name }),
  }),
}))

export const selectManageInsightsPageState = selectResourceManagementPageState<ManageInsightsState>
