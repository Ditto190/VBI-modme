import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { connectorMap, getConnector, registerConnector } from 'src/chart-builder/connector'
import type { VBIChartNamespace } from './chart'
import type { VBIConnectorNamespace } from './connectors'
import type { VBIDashboardNamespace } from './dashboard'
import type { VBIInsightNamespace } from './insight'
import type { VBIReportNamespace } from './report'
import type { VBIResourceNamespace } from './resources'

export interface VBIInstance<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  /** @deprecated Use `connectors` APIs instead of mutating the connector map directly. */
  connectorMap: typeof connectorMap
  /** @deprecated Use `connectors.register(id, connector)` instead. */
  registerConnector: typeof registerConnector
  /** @deprecated Use `connectors.get(id)` instead. */
  getConnector: typeof getConnector
  connectors: VBIConnectorNamespace
  resources: VBIResourceNamespace
  chart: VBIChartNamespace<TQueryDSL, TSeedDSL>
  insight: VBIInsightNamespace
  dashboard: VBIDashboardNamespace<TQueryDSL, TSeedDSL>
  report: VBIReportNamespace<TQueryDSL, TSeedDSL>
}
