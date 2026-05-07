import type { VBIChartBuilder, VBIMeasure } from '@visactor/vbi'
import {
  getFormatPreset,
  toMeasureAggregate,
  toSort,
  type DimensionAggregate,
  type MeasureAggregate,
} from './fieldOptions'
import type { MappedField } from 'src/types'

type NodeLike = {
  clearAggregate?: () => unknown
  clearFormat?: () => unknown
  clearSort: () => unknown
  setAggregate: (aggregate: DimensionAggregate | MeasureAggregate) => unknown
  setAlias: (alias: string) => unknown
  setFormat?: (format: NonNullable<VBIMeasure['format']>) => unknown
  setSort: (sort: NonNullable<MappedField['sort']>) => unknown
}

type CollectionLike = { update: (id: string, callback: (node: NodeLike) => void) => unknown }

export const removeMappedField = (builder: VBIChartBuilder, item: MappedField) =>
  builder.doc.transact(() =>
    item.role === 'measure' ? builder.measures.remove(item.id) : builder.dimensions.remove(item.id),
  )

export const renameMappedField = (builder: VBIChartBuilder, item: MappedField, alias: string) => {
  const value = alias.trim() || item.field
  builder.doc.transact(() => updateNode(builder, item, (node) => node.setAlias(value)))
}

export const setMappedSort = (builder: VBIChartBuilder, item: MappedField, order: string) => {
  const sort = toSort(order)
  builder.doc.transact(() => updateNode(builder, item, (node) => (sort ? node.setSort(sort) : node.clearSort())))
}

export const setMappedAggregate = (builder: VBIChartBuilder, item: MappedField, value: string) => {
  builder.doc.transact(() => {
    if (item.role === 'measure') {
      updateNode(builder, item, (node) => node.setAggregate(toMeasureAggregate(value as MeasureAggregate['func'])))
      return
    }
    updateNode(builder, item, (node) =>
      value === 'none' ? node.clearAggregate?.() : node.setAggregate({ func: value } as DimensionAggregate),
    )
  })
}

export const setMeasureFormat = (builder: VBIChartBuilder, item: MappedField, key: string) => {
  if (item.role !== 'measure') return
  const preset = getFormatPreset(key)
  if (!preset) return
  builder.doc.transact(() => updateNode(builder, item, (node) => applyMeasureFormat(node, preset.format)))
}

const applyMeasureFormat = (node: NodeLike, format: VBIMeasure['format']) =>
  format ? node.setFormat?.(format) : node.clearFormat?.()

const updateNode = (builder: VBIChartBuilder, item: MappedField, callback: (node: NodeLike) => void) => {
  const collection = (item.role === 'measure' ? builder.measures : builder.dimensions) as CollectionLike
  collection.update(item.id, callback)
}
