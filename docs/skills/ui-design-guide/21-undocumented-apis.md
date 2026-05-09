# 21. API Usage Found Only Through Practices

> The following content was missing or unclear in the skills documentation and was identified as the correct usage by reading practice source code.

---

## 1. WHERE Filters: `op` and `value` Combination Rules

### Current Documentation State

`WhereNodeBuilder.setOperator` in `03-builder-api-summary.md` lists the available operators, and `setValue` only states that a value is passed in.

### Actual Behavior

**Key rule**: `buildWhere.ts` automatically converts operators:

| Input `op` | Input `value`                                       | Actual buildWhere Conversion                                  |
| ---------- | --------------------------------------------------- | ------------------------------------------------------------- |
| `'='`      | `string` (for example `'Shanghai'`)                 | `=` (single-value exact match)                                |
| `'!='`     | `string`                                            | `!=`                                                          |
| `'='`      | `string[]` (for example `['Shanghai', 'Dongfeng']`) | `'in'`                                                        |
| `'!='`     | `string[]`                                          | `'not in'`                                                    |
| `'in'`     | `string[]`                                          | `'in'` (but this causes SQL syntax errors; **do not use it**) |

### Correct Usage

```ts
// Multi-value filtering: op='=' + array value
builder.whereFilter.add('city', (n) => {
  n.setOperator('=') // Note that this is '=' rather than 'in'
  n.setValue(['Shanghai', 'Dongfeng']) // Array!
})

// Single-value filtering: op='=' + string
builder.whereFilter.add('city', (n) => {
  n.setOperator('=')
  n.setValue('Shanghai')
})
```

### Documentation Gap

- The automatic conversion logic in `buildWhere` is not described in any skills document.
- Misusing `op: 'in'` causes SQL syntax errors, which only become apparent when running it.

---

## 2. `RawDatasetSource.rawDataset` Must Use `TidyDatum[]`

### Current Documentation State

The example in `17-demo-connector.md` directly uses `{ type: 'json', rawDataset: localData }`, where `localData` is `unknown[]`.

### Actual Behavior

`TidyDatum = Record<string, number | string | null | boolean | undefined>`

The type of `rawDataset` is `string | ArrayBuffer | Blob | TidyDatum[]`. If `unknown[]` is passed:

- TypeScript error: `Type 'unknown[]' is not assignable to parameter of type 'TidyDatum[]'`
- Even if it passes via type assertion, nested objects cause errors during DuckDB queries.

### Correct Usage

```ts
import { type TidyDatum } from '@visactor/vquery'

const toTidyDatum = (row: unknown): TidyDatum | null => {
  if (typeof row !== 'object' || row === null) return null
  const result: TidyDatum = {}
  for (const [k, v] of Object.entries(row as Record<string, unknown>)) {
    if (typeof v === 'number' || typeof v === 'string' || v === null || typeof v === 'boolean' || v === undefined) {
      result[k] = v as number | string | null | boolean | undefined
    } else {
      return null // Nested objects are not supported
    }
  }
  return result
}

const tidyData: TidyDatum[] = []
for (const row of localData) {
  const datum = toTidyDatum(row)
  if (datum) tidyData.push(datum)
}

const ds: RawDatasetSource = { type: 'json', rawDataset: tidyData }
await vquery.createDataset(connectorId, schema, ds)
```

### Documentation Gap

- The `TidyDatum` type definition does not appear in any skills document.
- The difference between `{ type: 'json', rawDataset: url }` and `{ type: 'csv', rawDataset: url }` is not explained. The former requires `TidyDatum[]`, while the latter can pass a URL string directly.
- The `CSV URL` approach (`type: 'csv'` + url string) is simpler, needs no type conversion, and had not been recommended.

---

## 3. `useVBISchemaFields` Returns `fieldRoleMap` and `fieldTypeMap`

### Current Documentation State

`11-hooks-useVBISchemaFields.md` only documents the returned `schemaFields`.

### Actual Behavior

The professional implementation returns three fields:

```ts
const { schemaFields, fieldRoleMap, fieldTypeMap } = useVBISchemaFields(builder, schemaKey)
// schemaFields: { name, type, role }[]
// fieldRoleMap: Record<string, 'dimension' | 'measure'>
// fieldTypeMap: Record<string, string>
```

`fieldRoleMap` is used to quickly determine whether a field is a dimension or a measure. `fieldTypeMap` is used to determine the field type (date/string/number), which is very useful in ConfigPanel for deciding whether to show date aggregation options.

### Documentation Gap

- `fieldRoleMap` and `fieldTypeMap` are not described in any skills document.
- The purpose of the second `useVBISchemaFields` parameter, `schemaRefreshKey`, is not described. It is incremented when refreshing schema.

---

## 4. `useVBIChartType` Returns `availableChartTypes`

### Current Documentation State

`09-hooks-useVBIChartType.md` only documents `chartType` and `changeChartType`.

### Actual Behavior

```ts
const { chartType, changeChartType, availableChartTypes } = useVBIChartType(builder)
// chartType: string
// changeChartType: (type: string) => void
// availableChartTypes: string[]
```

`availableChartTypes` is used to render the option list in ChartTypeSelector.

---

## 5. `useVBIBuilder` Returns Complete theme/limit State

### Current Documentation State

`10-hooks-useVBIBuilder.md` only mentioned `locale`.

### Actual Behavior

```ts
const { theme, setTheme, limit, setLimit, locale, setLocale } = useVBIBuilder(builder)
// theme: 'dark' | 'light'
// setTheme: (theme: 'dark' | 'light') => void
// limit: number
// setLimit: (n: number) => void
```

---

## 6. `replaceFilters` vs Incremental Add/Remove: Two WHERE Filter Patterns

### Current Documentation State

`07-hooks-useVBIWhereFilter.md` only documents incremental adding and does not describe replacement mode.

### Actual Behavior

There are two usage patterns:

**Pattern 1: Incremental add (add one filter condition at a time)**

```ts
builder.whereFilter.add('city', (n) => {
  n.setOperator('=')
  n.setValue('Shanghai')
})
```

**Pattern 2: Full replacement (suitable for UI panels that manage all filter conditions)**

```ts
const replaceFilters = (next: FilterItem[]) => {
  builder.doc.transact(() => {
    builder.whereFilter.clear()
    next.forEach((f) => {
      builder.whereFilter.add(f.field, (n) => {
        n.setOperator(f.operator)
        n.setValue(f.value)
      })
    })
  })
}
```

UI panels should prefer pattern 2 because panels need to display all current filter conditions, and replacement is easier to manage than incremental changes.

---

## 7. FilterPanel `onChange` Passes the Complete Array

### Current Documentation State

There was no explanation of how the FilterPanel component works with `replaceFilters`.

### Actual Behavior

The FilterPanel component passes **the new array of all filter conditions** to `onChange`, and the UI layer uses `replaceFilters` for full replacement:

```tsx
// Inside FilterPanel: when users add/edit/delete
onChange([...filters, newItem]) // Pass the complete array

// App component: receive the complete array and fully replace with replaceFilters
<FilterPanel
  filters={filterItems}
  onChange={(next) => replaceWhereFilters(
    next.map((f) => ({ field: f.field, operator: f.operator, value: f.value }))
  )}
/>
```

---

## 8. `window.dispatchEvent('vbi-filter-error')` Synchronizes the UI Layer

### Current Documentation State

Not mentioned.

### Actual Behavior

When `buildVSeed()` inside `bindEvent` throws, the last bad filter condition is automatically removed and a custom event is dispatched:

```ts
// Inside VBIStore bindEvent
window.dispatchEvent(new CustomEvent('vbi-filter-error', { detail: lastFilter }))
```

The App component in the UI layer listens for this event and synchronizes local filter state by removing the last item:

```ts
useEffect(() => {
  const handleFilterError = () => {
    setFilters((prev) => prev.slice(0, -1))
  }
  window.addEventListener('vbi-filter-error', handleFilterError)
  return () => window.removeEventListener('vbi-filter-error', handleFilterError)
}, [])
```

---

## 9. `VSeedBuilder.from()` Needs an Explicit `theme`

### Current Documentation State

The `VSeedBuilder.from` call in `14-vseed-render.md` does not describe the `theme` parameter.

### Actual Behavior

VSeedRender needs to pass the Builder theme to VSeedBuilder:

```tsx
const VSeedRender = ({ vseed, themeMode = 'dark' }) => {
  // ...
  useEffect(() => {
    const b = VSeedBuilder.from({ ...vseed, theme: themeMode })
    // ...
  }, [themeMode, vseed])
}
```

If `theme` is omitted, the chart theme may be incorrect.

---

## 10. Antd ConfigProvider `algorithm` Setting

### Current Documentation State

Not mentioned.

### Actual Behavior

Light/dark themes are controlled through Antd ConfigProvider:

```tsx
import { theme } from 'antd'

const createThemeConfig = (themeMode: 'dark' | 'light') => ({
  algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: themeMode === 'dark' ? '#6c8cff' : '#275df5',
    borderRadius: 10,
  },
})

;<ConfigProvider theme={createThemeConfig(themeMode)}>{/* ... */}</ConfigProvider>
```

VChart/VTable's own theme is controlled by `VSeedBuilder.from({ ...vseed, theme: themeMode })`, so the two need to stay consistent.

---

## 11. `clearBuilderState` — Helper for Resetting All Configuration

### Current Documentation State

Not mentioned.

### Actual Behavior

When loading new data or resetting, dimensions, measures, filters, chart type, and row limit need to be cleared:

```ts
const clearBuilderState = (builder: VBIChartBuilder) => {
  const dimensionIds = builder.dimensions
    .toJSON()
    .map((d) => d.id)
    .reverse()
  const measureIds = builder.measures
    .toJSON()
    .map((m) => m.id)
    .reverse()

  builder.doc.transact(() => {
    dimensionIds.forEach((id) => builder.dimensions.remove(id))
    measureIds.forEach((id) => builder.measures.remove(id))
    builder.whereFilter.clear()
    builder.havingFilter.clear()
  })

  builder.chartType.changeChartType('table')
  builder.limit.setLimit(DEFAULT_LIMIT)
}
```

`reverse()` is necessary because Yjs `remove` operations affect subsequent indexes.

---

## 12. `setLocalDataWithSchema` — Data Setter with Schema

### Current Documentation State

The `registerDemoConnector` example in `17-demo-connector.md` does not show a local data injection method.

### Actual Behavior

It provides an initialization function with an explicit schema (from professional):

```ts
// demoConnector.ts
export const setLocalDataWithSchema = (data: unknown[], schema: DatasetColumn[] | null) => {
  localData = data
  localSchema = schema // Override automatic inference
  datasetNeedsRefresh = true
}

// Usage
import { supermarketSchema } from './utils/supermarketSchema'
setLocalDataWithSchema(data, supermarketSchema)
```

When an explicit schema is already available, such as demo data with a fixed structure, passing schema can avoid automatic inference errors.
