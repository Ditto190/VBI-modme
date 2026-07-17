import type { VBIReportBuilder } from '@visactor/vbi'
import { createStore } from 'zustand/vanilla'
import { tRuntime } from '../../i18n/runtime'
import * as resourceApi from '../../services/resourceApi'
import type { ResourceItem } from '../../types'
import { createResourceApplicationStoreState, type ResourceApplicationStoreState } from '../resources/store-factory'

export type ReportApplicationStoreState = ResourceApplicationStoreState<ResourceItem, VBIReportBuilder>

export const reportApplicationStore = createStore<ReportApplicationStoreState>()((set, get) =>
  createResourceApplicationStoreState(set, get, {
    kind: 'report',
    create: async (_, name) => {
      await resourceApi.createResource('report', name)
    },
    getFallbackName: () => tRuntime('reports.untitled'),
    list: () => resourceApi.listResources('report'),
    remove: (id) => resourceApi.removeResource('report', id),
    rename: (id, name) => resourceApi.renameResource('report', id, name),
  }),
)
