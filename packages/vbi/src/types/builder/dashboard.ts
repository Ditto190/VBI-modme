import type { UndoManager } from 'src/chart-builder/features'
import type { Doc, Map } from 'yjs'
import type { VBIDashboardDSL } from '../dashboardDSL'

export interface VBIDashboardBuilderInterface {
  doc: Doc
  dsl: Map<any>
  undoManager: UndoManager

  applyUpdate: (update: Uint8Array, origin?: any) => void
  encodeStateAsUpdate: (targetStateVector?: Uint8Array) => Uint8Array

  getUUID: () => string
  build: () => VBIDashboardDSL
  isEmpty: () => boolean
}
