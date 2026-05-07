# 3. Easy-to-miss APIs

## Native Y.Map / Yjs Methods

`builder.dsl` is a `Y.Map<any>` and `builder.doc` is a `Y.Doc`. Although these are documented in docs/ai-reference/03-vbi-api.md, the following methods are easy to overlook:

```ts
// Y.Map read.
builder.dsl.get(path) // Example: builder.dsl.get('chartType') -> 'bar'

// Y.Map write for nested structures.
builder.dsl.get(path).set(k, v) // Example: builder.dsl.get('chartType').set('alias', 'Column Chart')

// Y.Doc transaction. Multiple changes are merged into one undo/redo step.
builder.doc.transact(() => {
  builder.dimensions.add('category')
  builder.measures.add('sales', { aggregate: 'sum' })
})

// Y.Doc event listener.
builder.doc.on('update', (update, origin) => {
  // Any Yjs change triggers this.
})
builder.dsl.observe((event) => {
  /* Y.Map change event */
})
```

All standard hooks wrap operations with `builder.doc.transact()` internally to ensure correct undo/redo behavior. Builder APIs are enough for AI operations; direct transact usage is usually unnecessary.

## ChartType Encoding Queries

The `chartType` sub-builder provides query methods, but they are **not listed in the Builder API section**:

```ts
// Query measure encodings supported by the current chart type.
builder.chartType.getSupportedMeasureEncodings(): Encoding[]

// Query dimension encodings supported by the current chart type.
builder.chartType.getSupportedDimensionEncodings(): Encoding[]
```

## Node get Methods Return undefined

During DSL queries and node callbacks, the following methods **return undefined** when values are unset, not empty values:

```ts
// Get node encoding config. Returns undefined when unset.
node.getEncoding(): Record<string, any> | undefined

// Get node sort config. Returns undefined when unset.
node.getSort(): VBISortSpec | undefined

// Get node format config. Returns undefined when unset.
node.getFormat(): VBIFormatSpec | undefined
```

## useFilterRootOperator Is Not Exported

The hook for switching the filter root operator (AND/OR) lives in the standard component directory and is not exported publicly:

```ts
// Location: practices/standard/src/components/Shelves/hooks/useFilterRootOperator.ts
// Not exported from practices/standard/src/hooks/index.ts.
// Import this file directly when needed.
import { useFilterRootOperator } from 'practices/standard/src/components/Shelves/hooks/useFilterRootOperator'
```
