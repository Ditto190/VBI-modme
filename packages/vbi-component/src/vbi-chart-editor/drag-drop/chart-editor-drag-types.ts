import { DragDropManager } from '@dnd-kit/dom'
import type { VBIChartField } from '../chart-field'

export const VBI_CHART_EDITOR_FIELD_DRAG_TYPE = 'vbi-chart-field'

let defaultDragDropManager: VBIChartEditorDragDropManager | undefined

export interface VBIChartEditorFieldDragData extends Record<string, unknown> {
  kind: 'schema-field'
  field: VBIChartField
}

export type VBIChartEditorDragDropManager = DragDropManager

export const getVBIChartEditorDragDropManager = (): VBIChartEditorDragDropManager => {
  defaultDragDropManager ??= new DragDropManager()
  return defaultDragDropManager
}

export const createChartEditorFieldDragId = (field: VBIChartField) => {
  return `vbi-chart-field:${field.kind}:${field.name}`
}

export const isChartEditorFieldDragData = (data: unknown): data is VBIChartEditorFieldDragData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as { kind?: unknown }).kind === 'schema-field' &&
    typeof (data as { field?: { name?: unknown } }).field?.name === 'string'
  )
}
