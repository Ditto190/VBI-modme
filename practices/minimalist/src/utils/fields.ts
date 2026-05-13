import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import type { DragPayload, EditorField, FieldRole } from 'src/types'
import { reorderField } from 'src/utils/fieldOrder'

let activeDragPayload: DragPayload | undefined

export const toEditorField = (field: { name: string; type: string }): EditorField => {
  const type = field.type.toLowerCase()
  return {
    isDate: ['date', 'datetime', 'timestamp'].includes(type),
    name: field.name,
    role: type === 'number' ? 'measure' : 'dimension',
    type: field.type,
  }
}

export const writeFieldDrag = (event: React.DragEvent, field: EditorField) => {
  activeDragPayload = { kind: 'field', name: field.name, role: field.role }
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('application/json', JSON.stringify(activeDragPayload))
}

export const writeTokenDrag = (event: React.DragEvent, payload: Extract<DragPayload, { kind: 'token' }>) => {
  activeDragPayload = payload
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('application/json', JSON.stringify(payload))
}

export const readDragPayload = (event: React.DragEvent): DragPayload | undefined => {
  try {
    const payload = JSON.parse(event.dataTransfer.getData('application/json')) as DragPayload
    return payload.role ? payload : undefined
  } catch {
    return activeDragPayload
  }
}

export const clearDragPayload = () => {
  activeDragPayload = undefined
}

const isFieldNode = (item: unknown): item is { field: string; id: string } => {
  return Boolean(item && typeof item === 'object' && 'field' in item && 'id' in item)
}

export const addField = (
  builder: VBIChartBuilder,
  dsl: VBIChartDSL,
  field: EditorField,
  roleOrIndex: FieldRole | number = field.role,
  insertIndex?: number,
) => {
  const role = typeof roleOrIndex === 'number' ? field.role : roleOrIndex
  const targetIndex = typeof roleOrIndex === 'number' ? roleOrIndex : insertIndex
  const existing = getFieldNode(dsl, field, role)
  if (existing) {
    reorderField(builder, role, existing.id, targetIndex ?? Number.MAX_SAFE_INTEGER)
    return
  }

  let id = ''
  if (role === 'measure') {
    const [encoding] = builder.chartType.getRecommendedMeasureEncodings(dsl.measures.length + 1).slice(-1)
    builder.measures.add(field.name, (node) => {
      node.setAlias(field.name).setAggregate({ func: 'sum' })
      if (encoding) node.setEncoding(encoding)
      id = node.getId()
    })
    reorderField(builder, role, id, targetIndex ?? Number.MAX_SAFE_INTEGER)
    return
  }

  const [encoding] = builder.chartType.getRecommendedDimensionEncodings(dsl.dimensions.length + 1).slice(-1)
  builder.dimensions.add(field.name, (node) => {
    node.setAlias(field.name)
    if (encoding) node.setEncoding(encoding)
    id = node.getId()
    if (field.isDate) node.setAggregate({ func: 'toDay' })
  })
  reorderField(builder, role, id, targetIndex ?? Number.MAX_SAFE_INTEGER)
}

export const removeField = (builder: VBIChartBuilder, role: EditorField['role'], id: string) => {
  if (role === 'measure') builder.measures.remove(id)
  else builder.dimensions.remove(id)
}

export const getFieldNode = (dsl: VBIChartDSL, field: EditorField, role: FieldRole = field.role) => {
  const nodes = (role === 'measure' ? dsl.measures : dsl.dimensions) as unknown[]
  return nodes.filter(isFieldNode).find((item) => item.field === field.name)
}

export const toggleField = (builder: VBIChartBuilder, dsl: VBIChartDSL, field: EditorField) => {
  const node = getFieldNode(dsl, field)
  if (node) {
    removeField(builder, field.role, node.id)
    return
  }
  addField(builder, dsl, field)
}
