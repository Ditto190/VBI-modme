# 2. VBI-react and Practice-owned Hooks Have Completely Different Signatures

## Problem Description

The two groups of hooks have similar names but are **not interchangeable at all**. This is one of the easiest places to make mistakes:

| vbi-react hook                    | Practice-owned hook                   | Key difference                           |
| --------------------------------- | ------------------------------------- | ---------------------------------------- |
| `useDimensions(builder)` required | `useVBIDimensions(builder?)` optional | The builder parameter is optional        |
| `useMeasures(builder)` required   | `useVBIMeasures(builder?)` optional   | The builder parameter is optional        |
| `useWhereFilter(builder)`         | `useVBIWhereFilter(builder?)`         | The return value is completely different |
| `useHavingFilter(builder)`        | `useVBIHavingFilter(builder?)`        | The return value is completely different |
| `useChartType(builder)`           | `useVBIChartType(builder?)`           | The return value differs slightly        |
| -                                 | `useVBIBuilder(builder?)`             | Practice-specific                        |
| -                                 | `useVBISchemaFields(builder?)`        | Practice-specific                        |
| -                                 | `useVBIUndoManager(builder?)`         | Practice-specific                        |

## useWhereFilter Return Value Comparison

**vbi-react version**:

```ts
{
  ;(whereFilter, mutateWhereFilter, clearWhereFilter, removeWhereEntry)
}
```

**standard version**:

```ts
{
  filters,           // VBIWhereClause[], the original nested condition tree.
  flattenFilters,    // VBIWhereFilter[], all leaf conditions flattened.
  addFilter,         // (field, operator?, value?) => void
  addGroup,          // (op: 'and'|'or', callback?) => void
  removeFilter,      // (id) => void
  clearFilters,      // () => void
  updateFilter,      // (id, { operator?, value? }) => void
  findFilter,        // (id) => node | undefined
  updateGroup,       // (id, { operator? }) => void
  addToGroup,        // (groupId, field, operator?, value?) => void
  removeFromGroup,   // (groupId, idOrIndex) => void
  findGroup,         // (id) => node | undefined
}
```

## addDimension / addMeasure Style Comparison

**vbi-react version**, using a config object:

```ts
addDimension('category', { alias: 'Product Category' })
```

**standard version**, using callback mode with support for any node method:

```ts
addDimension('category', (node) => {
  node.setEncoding('xAxis')
  node.setSort({ order: 'asc' })
})
```

## Practical Development Choice

Most practices (minimalist/streamlined/professional/standard) use **their own hooks** from `src/hooks/`, which are more complete. Only `vbi-react-starter` uses hooks from the `@visactor/vbi-react` package.

**These two hook sets are completely non-interchangeable** and are an easy source of mistakes. Each practice should only use hooks from its own `src/hooks/` directory and should never import `@visactor/vbi-react`.

## Source Locations

| hook                                | Location                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------- |
| vbi-react hooks                     | `packages/vbi-react/src/hooks/`                                            |
| Practice-owned hooks                | `practices/{name}/src/hooks/`, with an independent set for each practice   |
| useFilterRootOperator, not exported | `practices/standard/src/components/Shelves/hooks/useFilterRootOperator.ts` |
