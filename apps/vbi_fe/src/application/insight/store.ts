import type { VBIInsightBuilder } from '@visactor/vbi'
import { createStore } from 'zustand/vanilla'
import { tRuntime } from '../../i18n/runtime'
import { createInsight, deleteInsight, updateInsight } from '../../services/insightApi'
import { listResources } from '../../services/resourceApi'
import type { InsightRecord } from '../../types'
import { createResourceApplicationStoreState, type ResourceApplicationStoreState } from '../resources/store-factory'

export type InsightApplicationStoreState = ResourceApplicationStoreState<InsightRecord, VBIInsightBuilder>

export const insightApplicationStore = createStore<InsightApplicationStoreState>()((set, get) =>
  createResourceApplicationStoreState(set, get, {
    kind: 'insight',
    create: async (_, name, input) => {
      await createInsight({
        content: input.content ?? '',
        name,
      })
    },
    getFallbackName: () => tRuntime('insights.untitled'),
    list: () => listResources('insight') as Promise<InsightRecord[]>,
    remove: (id) => deleteInsight(id),
    rename: (id, name) => updateInsight(id, { name }),
  }),
)
