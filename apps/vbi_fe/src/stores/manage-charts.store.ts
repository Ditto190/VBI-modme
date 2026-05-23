import { create } from 'zustand'
import { tRuntime } from '../i18n'
import { createResource, listResources, removeResource, renameResource } from '../services/resourceApi'
import {
  createResourceManagementState,
  resolveNamedResourceCreateName,
  selectResourceManagementPageState,
  type ResourceManagementState,
} from './resource-management.model'

const connectChartSession = async (resourceId: string, userName: string) => {
  const { connectResourceSession } = await import('./resource-session.store')
  await connectResourceSession('chart', resourceId, userName)
}

const releaseChartSession = async (resourceId: string) => {
  const { releaseResourceSession } = await import('./resource-session.store')
  await releaseResourceSession('chart', resourceId)
}

type ManageChartsState = ResourceManagementState & {
  createOpen: boolean
}

const getNextChartName = () => tRuntime('charts.untitled')

export const useManageChartsStore = create<ManageChartsState>((set, get) =>
  createResourceManagementState(set, get, {
    kind: 'chart',
    connectSession: connectChartSession,
    create: async (_, name) => {
      await createResource('chart', name)
    },
    getCreateOpenPatch: (createOpen) => ({ createOpen }),
    getFallbackName: getNextChartName,
    getInitialPatch: () => ({ createOpen: false }),
    list: () => listResources('chart'),
    releaseSession: releaseChartSession,
    remove: (id) => removeResource('chart', id),
    rename: (id, name) => renameResource('chart', id, name),
    resolveCreateName: resolveNamedResourceCreateName(getNextChartName),
  }),
)

export const selectManageChartsPageState = (state: ManageChartsState) => ({
  ...selectResourceManagementPageState(state),
  createOpen: state.createOpen,
})
