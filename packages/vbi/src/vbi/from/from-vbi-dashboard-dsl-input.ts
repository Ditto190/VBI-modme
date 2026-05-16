import { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import type { VBIDashboardDSLInput } from 'src/types'
import { zVBIDashboardDSL } from 'src/types/dashboardDSL/dashboard'
import * as Y from 'yjs'

export const createDashboardBuilderFromVBIDashboardDSLInput = (dashboard: VBIDashboardDSLInput) => {
  const doc = new Y.Doc()
  const dsl = doc.getMap('dsl')
  const normalized = zVBIDashboardDSL.parse(dashboard)

  doc.transact(() => {
    dsl.set('uuid', normalized.uuid)
    dsl.set('widgets', normalized.widgets)
    dsl.set('breakpoints', normalized.breakpoints)
    dsl.set('layout', normalized.layout)
    dsl.set('meta', normalized.meta)
    dsl.set('version', normalized.version)
  })

  return new VBIDashboardBuilder(doc, dsl)
}
