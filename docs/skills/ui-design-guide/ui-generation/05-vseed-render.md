# 05. VSeedRender 实现规则

`VSeedRender` 是 React UI 和 VisActor 渲染器之间的边界。每个 practice 都应该自己实现，不跨 practice 导入。

## 必需 imports

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import VChart, { type ISpec } from '@visactor/vchart'
import {
  ListTable,
  PivotChart,
  PivotTable,
  register,
  type ListTableConstructorOptions,
  type PivotChartConstructorOptions,
  type PivotTableConstructorOptions,
} from '@visactor/vtable'
import {
  Builder as VSeedBuilder,
  ColorIdEncoding,
  isPivotChart,
  isPivotTable,
  isTable,
  isVChart,
  registerAll,
  type VSeed,
} from '@visactor/vseed'
```

## 注册

```ts
registerAll()
register.chartModule('vchart', VChart)
```

注意：`registerAll()` 来自 `@visactor/vseed`，不是 `@visactor/vtable`。

## 标准组件签名

```tsx
type VSeedRenderProps = {
  style?: CSSProperties
  themeMode?: 'light' | 'dark'
  vseed: VSeed
}
```

完整 UI 中，`themeMode` 应与 Antd `ConfigProvider` 的 theme 保持一致。

## 渲染流程

```text
vseed
  -> VSeedBuilder.from({ ...vseed, theme: themeMode }).build()
  -> 判断渲染类型
  -> 创建 VChart / VTable 实例
  -> effect cleanup 时 release()
```

## 类型分流顺序

推荐顺序：

1. `isPivotChart(vseed)`
2. `isVChart(vseed)`
3. `isPivotTable(vseed)`
4. `isTable(vseed)`

`PivotTable` 和普通 table 的判断不要写反，避免被更宽泛的 table guard 提前命中。

## 基础实现骨架

```tsx
export function VSeedRender({ style, themeMode = 'light', vseed }: VSeedRenderProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    try {
      const builder = VSeedBuilder.from({ ...vseed, theme: themeMode })
      const spec = builder.build()

      if (isPivotChart(vseed)) {
        const table = new PivotChart(ref.current, spec as PivotChartConstructorOptions)
        return () => table.release()
      }

      if (isVChart(vseed)) {
        const chart = new VChart(spec as ISpec, { dom: ref.current })
        chart.renderSync()
        return () => chart.release()
      }

      if (isPivotTable(vseed)) {
        const table = new PivotTable(ref.current, spec as PivotTableConstructorOptions)
        return () => table.release()
      }

      if (isTable(vseed)) {
        const table = new ListTable(ref.current, spec as ListTableConstructorOptions)
        return () => table.release()
      }
    } catch (error) {
      console.error('Failed to render VSeed:', error)
    }
  }, [themeMode, vseed])

  return <div ref={ref} style={{ height: '100%', minHeight: 0, width: '100%', ...style }} />
}
```

## PivotChart 图例交互

如果需要图例联动，可以监听 VTable 事件：

```ts
tableInstance.on('legend_item_click', (args: { value: string[] | number[] }) => {
  tableInstance.updateFilterRules([
    {
      filterKey: ColorIdEncoding,
      filteredValues: args.value,
    },
  ])
})
```

范围图例：

```ts
tableInstance.on('legend_change', (args: { value: [number, number] }) => {
  const [minValue, maxValue] = args.value
  tableInstance.updateFilterRules([
    {
      filterFunc: (record: Record<string, number>) => {
        const value = record[record[ColorIdEncoding]]
        return value >= minValue && value <= maxValue
      },
    },
  ])
})
```

## UI 尺寸规则

- 外层 chart workspace 必须有稳定高度。
- `VSeedRender` 自身使用 `height: 100%`、`width: 100%`。
- loading、empty、error 状态不能导致 chart 区域高度改变。
- 渲染容器不要被外层多层 card 挤压。

## 防错规则

- effect cleanup 必须 release 实例。
- theme 变化要触发重建。
- 渲染失败要 catch，不要让整个 React app 崩掉。
- 不从其他 practice 导入 `VSeedRender`。
