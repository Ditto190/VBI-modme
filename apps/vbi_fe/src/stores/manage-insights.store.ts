import { create } from 'zustand'
import { tRuntime } from '../i18n'
import { createInsight, deleteInsight, fetchInsights, updateInsight } from '../services/insightApi'
import {
  createResourceManagementState,
  resolveNamedResourceCreateName,
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

type ManageInsightsState = ResourceManagementState & {
  createContent: string
  createOpen: boolean
  setCreateContent(createContent: string): void
}

const getNextInsightName = () => tRuntime('insights.untitled')

export const useManageInsightsStore = create<ManageInsightsState>((set, get) => ({
  ...createResourceManagementState(set, get, {
    kind: 'insight',
    connectSession: connectInsightSession,
    create: async (state, name) => {
      await createInsight({
        content: state.createContent,
        name,
      })
    },
    getCreateOpenPatch: (createOpen) => ({ createOpen }),
    getCreateResetPatch: () => ({ createContent: '' }),
    getFallbackName: getNextInsightName,
    getInitialPatch: () => ({ createContent: '', createOpen: false }),
    list: fetchInsights,
    releaseSession: releaseInsightSession,
    remove: deleteInsight,
    rename: (id, name) => updateInsight(id, { name }),
    resolveCreateName: resolveNamedResourceCreateName(getNextInsightName),
  }),
  setCreateContent: (createContent) => set({ createContent }),
}))

export const selectManageInsightsPageState = (state: ManageInsightsState) => ({
  ...selectResourceManagementPageState(state),
  createContent: state.createContent,
  createOpen: state.createOpen,
  setCreateContent: state.setCreateContent,
})
