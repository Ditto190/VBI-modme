import { matchByIdOrField, requireTarget } from './common.js'

interface MeasureMutationNode {
  setAggregate(aggregate: unknown): void
  setAlias(alias: string): void
  setEncoding(encoding: string): void
  setFormat(format: unknown): void
  setSort(sort: unknown): void
}

interface MeasureBuilderLike {
  measures: {
    add(field: string, callback: (node: MeasureMutationNode) => void): void
    findAll(): Array<{ getField(): string; getId(): string }>
    remove(id: string): void
    toJSON(): unknown[]
    update(id: string, callback: (node: MeasureMutationNode) => void): void
  }
}

const findMeasure = (builder: MeasureBuilderLike, target: { field?: string; id?: string }) =>
  builder.measures.findAll().find((item) => matchByIdOrField(item, requireTarget(target, 'measure')))

export const createMeasureHelpers = () => ({
  addMeasure: (
    builder: MeasureBuilderLike,
    input: { aggregate?: unknown; alias?: string; encoding?: string; field: string; format?: unknown; sort?: unknown },
  ) =>
    builder.measures.add(input.field, (node) => {
      if (input.alias) node.setAlias(input.alias)
      if (input.encoding) node.setEncoding(input.encoding)
      if (input.sort) node.setSort(input.sort)
      if (input.aggregate) node.setAggregate(input.aggregate)
      if (input.format) node.setFormat(input.format)
    }),
  getMeasures: (builder: MeasureBuilderLike) => builder.measures.toJSON(),
  removeMeasure: (builder: MeasureBuilderLike, target: { field?: string; id?: string }) => {
    const item = findMeasure(builder, target)
    if (!item) throw new Error('measure not found')
    builder.measures.remove(item.getId())
  },
  updateMeasure: (
    builder: MeasureBuilderLike,
    input: {
      aggregate?: unknown
      alias?: string
      encoding?: string
      field?: string
      format?: unknown
      id?: string
      sort?: unknown
    },
  ) => {
    const item = findMeasure(builder, input)
    if (!item) throw new Error('measure not found')
    builder.measures.update(item.getId(), (node) => {
      if (input.alias) node.setAlias(input.alias)
      if (input.encoding) node.setEncoding(input.encoding)
      if (input.sort) node.setSort(input.sort)
      if (input.aggregate) node.setAggregate(input.aggregate)
      if (input.format) node.setFormat(input.format)
    })
  },
})
