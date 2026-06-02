import { create } from 'zustand'
import { tRuntime } from '../i18n/runtime'
import * as resourceApi from '../services/resourceApi'
import {
  createResourceManagementState,
  selectResourceManagementPageState,
  type ResourceManagementState,
} from './resource-management.model'

type ReportsState = ResourceManagementState & {
  remove(id: string): Promise<void>
}

const getNextReportName = () => tRuntime('reports.untitled')

export const useReportsStore = create<ReportsState>((set, get) => {
  const resourceManagementState = createResourceManagementState(set, get, {
    kind: 'report',
    create: async (_, name) => {
      await resourceApi.createResource('report', name)
    },
    getFallbackName: getNextReportName,
    list: () => resourceApi.listResources('report'),
    remove: (id) => resourceApi.removeResource('report', id),
    rename: (id, name) => resourceApi.renameResource('report', id, name),
  })

  return {
    ...resourceManagementState,
    remove: resourceManagementState.deleteOne,
  }
})

export const selectReportsPageState = (state: ReportsState) => ({
  ...selectResourceManagementPageState(state),
  remove: state.remove,
})
