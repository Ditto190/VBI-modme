interface HavingBuilderLike {
  havingFilter: {
    add(
      field: string,
      callback: (node: {
        setAggregate(aggregate: unknown): void
        setOperator(operator: string): void
        setValue(value: unknown): void
      }) => void,
    ): void
    clear(): void
    toJSON(): unknown
  }
}

interface WhereBuilderLike {
  whereFilter: {
    add(
      field: string,
      callback: (node: {
        setDate(value: unknown): void
        setOperator(operator: string): void
        setValue(value: unknown): void
      }) => void,
    ): void
    clear(): void
    toJSON(): unknown
  }
}

export const createFilterHelpers = () => ({
  addHaving: (
    builder: HavingBuilderLike,
    input: { aggregate?: unknown; field: string; operator?: string; value?: unknown },
  ) =>
    builder.havingFilter.add(input.field, (node) => {
      if (input.aggregate) node.setAggregate(input.aggregate)
      if (input.operator) node.setOperator(input.operator)
      if (input.value !== undefined) node.setValue(input.value)
    }),
  addWhere: (builder: WhereBuilderLike, input: { date?: unknown; field: string; operator?: string; value?: unknown }) =>
    builder.whereFilter.add(input.field, (node) => {
      if (input.date) return node.setDate(input.date)
      if (input.operator) node.setOperator(input.operator)
      if (input.value !== undefined) node.setValue(input.value)
    }),
  clearHaving: (builder: HavingBuilderLike) => builder.havingFilter.clear(),
  clearWhere: (builder: WhereBuilderLike) => builder.whereFilter.clear(),
  getHaving: (builder: HavingBuilderLike) => builder.havingFilter.toJSON(),
  getWhere: (builder: WhereBuilderLike) => builder.whereFilter.toJSON(),
})
