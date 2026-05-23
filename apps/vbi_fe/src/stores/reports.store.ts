import { create } from 'zustand'
import { tRuntime } from '../i18n'
import * as resourceApi from '../services/resourceApi'
import {
  createResourceManagementState,
  resolveNamedResourceCreateName,
  selectResourceManagementPageState,
  type ResourceManagementState,
} from './resource-management.model'

type ReportsState = ResourceManagementState & {
  isCreateOpen: boolean
  remove(id: string): Promise<void>
}

const getNextReportName = () => tRuntime('reports.untitled')

export const useReportsStore = create<ReportsState>((set, get) => {
  const resourceManagementState = createResourceManagementState(set, get, {
    kind: 'report',
    create: async (_, name) => {
      await resourceApi.createResource('report', name)
    },
    getCreateOpenPatch: (isCreateOpen) => ({ isCreateOpen }),
    getFallbackName: getNextReportName,
    getInitialPatch: () => ({ isCreateOpen: false }),
    list: () => resourceApi.listResources('report'),
    remove: (id) => resourceApi.removeResource('report', id),
    rename: (id, name) => resourceApi.renameResource('report', id, name),
    resolveCreateName: resolveNamedResourceCreateName(getNextReportName, false),
  })

  return {
    ...resourceManagementState,
    remove: resourceManagementState.deleteOne,
  }
})

export const selectReportsPageState = (state: ReportsState) => ({
  ...selectResourceManagementPageState(state),
  isCreateOpen: state.isCreateOpen,
  remove: state.remove,
})
