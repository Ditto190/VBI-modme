# 14. VSeedRender — Rendering Component

VSeedRender is a component that each practice **implements independently**. It renders `VSeed` (rendering data) into an actual VChart/VTable chart or table.

## Source

`practices/standard/src/components/Render/VSeedRender.tsx`

## Signature

```ts
// React component
<VSeedRender vseed={vseed} />
```

```tsx
export const VSeedRender = (props: { vseed: VSeed }) => {
  const { vseed } = props
  const ref = useRef<HTMLDivElement>(null)
  // ...rendering logic
  return <div ref={ref} style={{ height: '100%', width: '100%', minHeight: 300 }} />
}
```

## Rendering Flow

```
VSeed (VSeedDSL)
  ↓ VSeedBuilder.from(vseed).build()
  ↓ Convert to VChart Spec / VTable Spec
  ↓ Instantiate the matching renderer by type
  ↓ Render into the ref DOM node
```

## Supported Rendering Types

| Type       | Guard Function        | Renderer     | Description                                   |
| ---------- | --------------------- | ------------ | --------------------------------------------- |
| PivotChart | `isPivotChart(vseed)` | `PivotChart` | Pivot chart with interactive legend filtering |
| PivotTable | `isPivotTable(vseed)` | `PivotTable` | Pivot table                                   |
| ListTable  | `isTable(vseed)`      | `ListTable`  | List table                                    |
| VChart     | `isVChart(vseed)`     | `VChart`     | Standard chart (column/line/pie, etc.)        |

**Note**: check `isPivotTable` before `isTable`, because PivotTable is a subtype of Table.

## PivotChart Legend Interactions

PivotChart supports two legend events:

### legend_item_click — Single Legend Item Selection

```ts
tableInstance.on('legend_item_click', (args: unknown) => {
  const rawValue = (args as { value?: unknown }).value
  const filteredValues = Array.isArray(rawValue) ? rawValue : [rawValue]
  tableInstance.updateFilterRules([
    {
      filterKey: ColorIdEncoding,
      filteredValues,
    },
  ])
})
```

### legend_change — Range Drag

```ts
tableInstance.on('legend_change', (args: unknown) => {
  const range = toNumericRange((args as { value?: unknown }).value)
  if (!range) return
  const [minValue, maxValue] = range
  tableInstance.updateFilterRules([
    {
      filterFunc: (record: PivotRecord) => {
        const colorKey = record[ColorIdEncoding]
        if (typeof colorKey !== 'string') return false
        const rawValue = record[colorKey]
        if (typeof rawValue !== 'number') return false
        return rawValue >= minValue && rawValue <= maxValue
      },
    },
  ])
})
```

## Complete Example

```tsx
import { VSeedRender } from 'src/components/Render/VSeedRender'
import { useVBIStore } from 'src/model'

export const ChartPanel = () => {
  const vseed = useVBIStore((state) => state.vseed)
  const loading = useVBIStore((state) => state.loading)

  if (loading) {
    return <Spin>Loading...</Spin>
  }

  if (!vseed) {
    return <Empty description='Add dimensions and measures' />
  }

  return <VSeedRender vseed={vseed} />
}
```

## Dependency Registration

Register all dependencies at the top of VSeedRender:

```tsx
import { registerAll } from '@visactor/vtable'
import VChart from '@visactor/vchart'

registerAll() // Register all VTable components
register.chartModule('vchart', VChart) // Register VChart
```

## Notes

- VSeedRender is **implemented independently by each practice**, so paths and implementations may differ.
- Inside the component, `useEffect` listens for `vseed` changes and automatically creates/destroys chart instances.
- Each `useEffect` returns a cleanup function that calls the instance's `release()` to prevent memory leaks.
- VSeed is generated internally by the VBI framework. AI does not need to know its internal structure; it only needs to pass it to VSeedRender.
