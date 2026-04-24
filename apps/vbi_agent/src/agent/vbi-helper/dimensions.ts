import { matchByIdOrField, requireTarget } from './common.js'

interface DimensionMutationNode {
  setAggregate(aggregate: unknown): void
  setAlias(alias: string): void
  setEncoding(encoding: string): void
  setSort(sort: unknown): void
}

interface DimensionBuilderLike {
  dimensions: {
    add(field: string, callback: (node: DimensionMutationNode) => void): void
    findAll(): Array<{ getField(): string; getId(): string }>
    remove(id: string): void
    toJSON(): unknown[]
    update(id: string, callback: (node: DimensionMutationNode) => void): void
  }
}

const findDimension = (builder: DimensionBuilderLike, target: { field?: string; id?: string }) =>
  builder.dimensions.findAll().find((item) => matchByIdOrField(item, requireTarget(target, 'dimension')))

export const createDimensionHelpers = () => ({
  addDimension: (
    builder: DimensionBuilderLike,
    input: { aggregate?: unknown; alias?: string; encoding?: string; field: string; sort?: unknown },
  ) =>
    builder.dimensions.add(input.field, (node) => {
      if (input.alias) node.setAlias(input.alias)
      if (input.encoding) node.setEncoding(input.encoding)
      if (input.sort) node.setSort(input.sort)
      if (input.aggregate) node.setAggregate(input.aggregate)
    }),
  getDimensions: (builder: DimensionBuilderLike) => builder.dimensions.toJSON(),
  removeDimension: (builder: DimensionBuilderLike, target: { field?: string; id?: string }) => {
    const item = findDimension(builder, target)
    if (!item) throw new Error('dimension not found')
    builder.dimensions.remove(item.getId())
  },
  updateDimension: (
    builder: DimensionBuilderLike,
    input: { aggregate?: unknown; alias?: string; encoding?: string; field?: string; id?: string; sort?: unknown },
  ) => {
    const item = findDimension(builder, input)
    if (!item) throw new Error('dimension not found')
    builder.dimensions.update(item.getId(), (node) => {
      if (input.alias) node.setAlias(input.alias)
      if (input.encoding) node.setEncoding(input.encoding)
      if (input.sort) node.setSort(input.sort)
      if (input.aggregate) node.setAggregate(input.aggregate)
    })
  },
})
