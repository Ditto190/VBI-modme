import type { VBIDashboardBuilderInterface, VBIDashboardDSL } from 'src/types'
import { VBIDashboardDefaultBreakpoints } from 'src/types/dashboardDSL/breakpoint'
import { createEmptyDashboardLayout } from 'src/vbi/create-empty-dashboard'
import { ensureResourceUUID, getResourceUUID } from 'src/vbi/resource-uuid'
import * as Y from 'yjs'
import { UndoManager } from './features'
import { applyUpdateToDoc, buildVBIDashboardDSL, encodeDocStateAsUpdate, isEmptyVBIDashboardDSL } from './modules'

export class VBIDashboardBuilder implements VBIDashboardBuilderInterface {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public undoManager: UndoManager

  constructor(doc: Y.Doc, dsl?: Y.Map<any>) {
    this.doc = doc
    this.dsl = (dsl ?? doc.getMap('dsl')) as Y.Map<any>

    doc.transact(() => {
      ensureResourceUUID(this.dsl)
      if (this.dsl.get('widgets') === undefined) {
        this.dsl.set('widgets', [])
      }
      if (this.dsl.get('breakpoints') === undefined) {
        this.dsl.set('breakpoints', { ...VBIDashboardDefaultBreakpoints })
      }
      if (this.dsl.get('layout') === undefined) {
        this.dsl.set('layout', createEmptyDashboardLayout())
      }
      if (this.dsl.get('meta') === undefined) {
        this.dsl.set('meta', {
          title: '',
          theme: 'light',
        })
      }
      if (this.dsl.get('version') === undefined) {
        this.dsl.set('version', 0)
      }
    })

    this.undoManager = new UndoManager(this.dsl)
  }

  public applyUpdate = (update: Uint8Array, transactionOrigin?: any) => {
    return applyUpdateToDoc(this.doc, update, transactionOrigin)
  }

  public encodeStateAsUpdate = (targetStateVector?: Uint8Array) => {
    return encodeDocStateAsUpdate(this.doc, targetStateVector)
  }

  public getUUID = (): string => getResourceUUID(this.dsl)

  public build = (): VBIDashboardDSL => buildVBIDashboardDSL(this.dsl)

  public isEmpty = (): boolean => isEmptyVBIDashboardDSL(this.dsl)
}
