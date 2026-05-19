import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import { createEmptyInsight } from '../create-empty-insight'
import { createInsightBuilderFromVBIInsightDSLInput } from '../from'
import type { VBIResourceRegistry } from '../resources'
import type { VBIInsightNamespace } from '../types'

export const createVBIInsightNamespace = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>,
): VBIInsightNamespace => ({
  create: (insight) => {
    const builder = createInsightBuilderFromVBIInsightDSLInput(insight)
    resourceRegistry.insights.registerBuilder(builder.getUUID(), builder)
    return builder
  },
  createEmpty: createEmptyInsight,
})
