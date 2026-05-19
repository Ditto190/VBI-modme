import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { VBIInsightDSLInput } from 'src/types'
import type { createEmptyInsight } from '../create-empty-insight'

export interface VBIInsightNamespace {
  create: (insight: VBIInsightDSLInput) => VBIInsightBuilder
  createEmpty: typeof createEmptyInsight
}
