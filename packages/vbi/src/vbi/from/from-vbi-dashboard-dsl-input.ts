import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import type { VBIDashboardBuilderOptions, VBIDashboardDSLInput } from 'src/types'
import { zVBIDashboardDSL } from 'src/types/dashboardDSL/dashboard'
import * as Y from 'yjs'
import type { VBIResourceRegistry } from '../resources'
import { createDashboardWidgetYMap, getOrCreateDashboardWidgets } from './dashboard-widget-y-map'

export const createDashboardBuilderFromVBIDashboardDSLInput = <
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
>(
  dashboard: VBIDashboardDSLInput,
  options?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>,
  resourceRegistry?: VBIResourceRegistry<TQueryDSL, TSeedDSL>,
) => {
  const doc = new Y.Doc()
  const dsl = doc.getMap('dsl')
  const normalized = zVBIDashboardDSL.parse(dashboard)

  doc.transact(() => {
    dsl.set('uuid', normalized.uuid)
    const widgets = getOrCreateDashboardWidgets(dsl)
    for (const widget of normalized.widgets) {
      widgets.push([createDashboardWidgetYMap(widget)])
    }
    dsl.set('breakpoints', normalized.breakpoints)
    dsl.set('layout', normalized.layout)
    dsl.set('meta', normalized.meta)
    dsl.set('version', normalized.version)
  })

  return new VBIDashboardBuilder<TQueryDSL, TSeedDSL>(doc, {
    builderOptions: options,
    resourceRegistry,
  })
}
