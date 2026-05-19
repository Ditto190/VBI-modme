import type { VBIDashboardDSL } from 'src/types'
import { zVBIDashboardDSL } from 'src/types/dashboardDSL/dashboard'
import * as Y from 'yjs'

export const buildVBIDashboardDSL = (dsl: Y.Map<any>): VBIDashboardDSL => {
  return zVBIDashboardDSL.parse(dsl.toJSON())
}
