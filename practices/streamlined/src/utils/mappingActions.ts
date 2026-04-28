import type { VBIChartBuilder } from '@visactor/vbi'
import type { FieldSlot, SchemaField } from 'src/types'
import { reorderYArrayByInsertIndex } from 'src/utils/reorderArray'

type MappingRole = SchemaField['role']
type MappingMove = { id: string; insertIndex: number; role: MappingRole; slot: FieldSlot }

const getYArray = (builder: VBIChartBuilder, role: MappingRole) => {
  return builder.dsl.get(role === 'measure' ? 'measures' : 'dimensions') as
    | {
        get: (index: number) => any
        length: number
        toArray: () => any[]
        delete: (index: number, length: number) => void
        insert: (index: number, content: any[]) => void
      }
    | undefined
}

const getEncoding = (slot: FieldSlot, role: MappingRole) => {
  return role === 'measure' ? slot.measureEncoding : slot.dimensionEncoding
}

const getTargetInsertIndex = (params: {
  encoding: string
  insertIndex: number
  movingId: string
  yArray: NonNullable<ReturnType<typeof getYArray>>
}) => {
  const { encoding, insertIndex, movingId, yArray } = params
  const targetItems = yArray
    .toArray()
    .map((item, globalIndex) => ({ globalIndex, id: item.get('id'), encoding: item.get('encoding') }))
    .filter((item) => item.encoding === encoding && item.id !== movingId)
  const anchor = targetItems[insertIndex]
  if (anchor) return anchor.globalIndex
  const tail = targetItems.at(-1)
  return tail ? tail.globalIndex + 1 : yArray.length
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

export const addOrMoveField = (
  builder: VBIChartBuilder,
  field: SchemaField,
  slot: FieldSlot,
  insertIndex = Number.MAX_SAFE_INTEGER,
) => {
  if (field.role === 'measure' && slot.measureEncoding) {
    const encoding = slot.measureEncoding
    const existing = builder.measures.find((item) => item.getField() === field.name)
    if (existing) {
      reorderMappedField(builder, { id: existing.getId(), insertIndex, role: 'measure', slot })
      return
    }
    let id = ''
    builder.measures.add(field.name, (node) => {
      node.setAlias(field.name).setAggregate({ func: 'sum' }).setEncoding(encoding)
      id = node.getId()
    })
    reorderMappedField(builder, { id, insertIndex, role: 'measure', slot })
  }

  if (field.role === 'dimension' && slot.dimensionEncoding) {
    const encoding = slot.dimensionEncoding
    const existing = builder.dimensions.find((item) => item.getField() === field.name)
    if (existing) {
      reorderMappedField(builder, { id: existing.getId(), insertIndex, role: 'dimension', slot })
      return
    }
    let id = ''
    builder.dimensions.add(field.name, (node) => {
      node.setAlias(field.name).setEncoding(encoding)
      id = node.getId()
      if (field.isDate) node.setAggregate({ func: 'toDay' })
    })
    reorderMappedField(builder, { id, insertIndex, role: 'dimension', slot })
  }
}
