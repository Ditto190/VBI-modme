import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { VBIInsightDSL } from 'src/types'
import { createInsightBuilderFromVBIInsightDSLInput } from '../from/from-vbi-insight-dsl-input'
import { createResourceStore, type ResourceStore } from './resource-store'

export type InsightStore = ResourceStore<VBIInsightBuilder, VBIInsightDSL>

export const createInsightStore = () => {
  return createResourceStore<VBIInsightBuilder, VBIInsightDSL, void>((dsl) =>
    createInsightBuilderFromVBIInsightDSLInput(dsl),
  )
}
