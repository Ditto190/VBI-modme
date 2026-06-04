import { createStore } from 'zustand/vanilla'
import { createResource, listResources, removeResource, renameResource } from '../../services/resourceApi'
import type { ResourceItem } from '../../types'
import { tRuntime } from '../../i18n/runtime'
import { createResourceApplicationStoreState, type ResourceApplicationStoreState } from '../resources/store-factory'
import type { VBIChartBuilder } from '@visactor/vbi'

export type ChartApplicationStoreState = ResourceApplicationStoreState<ResourceItem, VBIChartBuilder>

export const chartApplicationStore = createStore<ChartApplicationStoreState>()((set, get) =>
  createResourceApplicationStoreState(set, get, {
    kind: 'chart',
    create: async (_, name) => {
      await createResource('chart', name)
    },
    getFallbackName: () => tRuntime('charts.untitled'),
    list: () => listResources('chart'),
    remove: (id) => removeResource('chart', id),
    rename: (id, name) => renameResource('chart', id, name),
  }),
)
