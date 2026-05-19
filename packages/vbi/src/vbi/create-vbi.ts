import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import { connectorMap, getConnector, registerConnector } from 'src/chart-builder/connector'
import type { VBIChartBuilderOptions } from 'src/types'
import {
  createVBIChartNamespace,
  createVBIConnectorNamespace,
  createVBIDashboardNamespace,
  createVBIInsightNamespace,
  createVBIReportNamespace,
  createVBIResourceNamespace,
} from './namespaces'
import { createVBIResourceRegistry } from './resources'
import type { VBIInstance } from './types'

export function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
export function createVBI<TQueryDSL, TSeedDSL>(
  defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
): VBIInstance<TQueryDSL, TSeedDSL>
export function createVBI<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  defaultBuilderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) {
  const resourceRegistry = createVBIResourceRegistry<TQueryDSL, TSeedDSL>()

  return {
    connectors: createVBIConnectorNamespace(),
    resources: createVBIResourceNamespace(resourceRegistry),
    dashboard: createVBIDashboardNamespace(defaultBuilderOptions, resourceRegistry),
    report: createVBIReportNamespace(defaultBuilderOptions, resourceRegistry),
    chart: createVBIChartNamespace(defaultBuilderOptions, resourceRegistry),
    insight: createVBIInsightNamespace(resourceRegistry),

    /** @deprecated Use `connectors` APIs instead of mutating the connector map directly. */
    connectorMap,
    /** @deprecated Use `connectors.register(id, connector)` instead. */
    registerConnector,
    /** @deprecated Use `connectors.get(id)` instead. */
    getConnector,
  } satisfies VBIInstance<TQueryDSL, TSeedDSL>
}
