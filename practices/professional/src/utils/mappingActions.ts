import type { VBIChartBuilder } from '@visactor/vbi'
import type { FieldSlot, SchemaField } from 'src/types'
import { reorderYArrayByInsertIndex } from './reorderArray'

type MappingRole = SchemaField['role']
type MappingMove = { id: string; insertIndex: number; role: MappingRole; slot: FieldSlot }

type YArrayItem = { get: (key: string) => unknown; set: (key: string, value: unknown) => void }
type YArrayLike = {
  delete: (index: number, length: number) => void
  get: (index: number) => YArrayItem | undefined
  insert: (index: number, content: YArrayItem[]) => void
  length: number
  toArray: () => YArrayItem[]
}

const getYArray = (builder: VBIChartBuilder, role: MappingRole) =>
  builder.dsl.get(role === 'measure' ? 'measures' : 'dimensions') as YArrayLike | undefined

const getEncoding = (slot: FieldSlot, role: MappingRole) =>
  role === 'measure' ? slot.measureEncoding : slot.dimensionEncoding

const getTargetInsertIndex = (params: {
  encoding: string
  insertIndex: number
  movingId: string
  yArray: YArrayLike
}) => {
  const items = params.yArray
    .toArray()
    .map((item, globalIndex) => ({ encoding: item.get('encoding'), globalIndex, id: item.get('id') }))
    .filter((item) => item.encoding === params.encoding && item.id !== params.movingId)
  return items[params.insertIndex]?.globalIndex ?? (items.at(-1)?.globalIndex ?? params.yArray.length - 1) + 1
}

export const reorderMappedField = (builder: VBIChartBuilder, params: MappingMove) => {
  const encoding = getEncoding(params.slot, params.role)
  const yArray = getYArray(builder, params.role)
  if (!encoding || !yArray) return
  const dragIndex = yArray.toArray().findIndex((item) => item.get('id') === params.id)
  if (dragIndex < 0) return
  const insertIndex = getTargetInsertIndex({ encoding, insertIndex: params.insertIndex, movingId: params.id, yArray })
  builder.doc.transact(() => {
    yArray.get(dragIndex)?.set('encoding', encoding)
    reorderYArrayByInsertIndex({ dragIndex, insertIndex, yArray })
  })
}

export const addOrMoveField = (builder: VBIChartBuilder, field: SchemaField, slot: FieldSlot, insertIndex = 9999) => {
  if (field.role === 'measure' && slot.measureEncoding) {
    const existing = builder.measures.find((item) => item.getField() === field.name)
    if (existing) return reorderMappedField(builder, { id: existing.getId(), insertIndex, role: 'measure', slot })
    let id = ''
    builder.measures.add(field.name, (node) => {
      node.setAlias(field.name).setAggregate({ func: 'sum' }).setEncoding(slot.measureEncoding!)
      id = node.getId()
    })
    reorderMappedField(builder, { id, insertIndex, role: 'measure', slot })
  }

  if (field.role === 'dimension' && slot.dimensionEncoding) {
    const existing = builder.dimensions.find((item) => item.getField() === field.name)
    if (existing) return reorderMappedField(builder, { id: existing.getId(), insertIndex, role: 'dimension', slot })
    let id = ''
    builder.dimensions.add(field.name, (node) => {
      node.setAlias(field.name).setEncoding(slot.dimensionEncoding!)
      if (field.isDate) node.setAggregate({ func: 'toDay' })
      id = node.getId()
    })
    reorderMappedField(builder, { id, insertIndex, role: 'dimension', slot })
  }
}
