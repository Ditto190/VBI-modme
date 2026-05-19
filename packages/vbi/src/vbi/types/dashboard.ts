import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import type { VBIDashboardBuilderOptions, VBIDashboardDSLInput } from 'src/types'
import type { createEmptyDashboard } from '../create-empty-dashboard'

export interface VBIDashboardNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  create: (
    dashboard: VBIDashboardDSLInput,
    builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>,
  ) => VBIDashboardBuilder<TQueryDSL, TSeedDSL>
  createEmpty: typeof createEmptyDashboard
}
