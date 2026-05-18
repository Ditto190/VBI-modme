# 组件化布局

这个示例展示 `BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector` 的基础组合方式。

## 依赖说明

- 包依赖：`@visactor/vbi-react/components`、`@visactor/vbi`、`react`
- 入参约束：`builder` 中应存在可选维度/度量字段，便于 `FieldPanel` 演示增删操作。

## 代码示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { BuilderLayout, ChartRenderer, ChartTypeSelector, FieldPanel } from '@visactor/vbi-react/components'

export function LayoutDemo({ builder }: { builder: VBIChartBuilder }) {
  return (
    <BuilderLayout
      topBar={<ChartTypeSelector builder={builder} />}
      leftPanel={
        <FieldPanel
          builder={builder}
          dimensionOptions={[{ label: 'Region', value: 'region' }]}
          measureOptions={[{ label: 'Sales', value: 'sales' }]}
        />
      }
      main={<ChartRenderer builder={builder} debounce={100} />}
    />
  )
}
```

## 预期效果

- 顶部区域可以切换图表类型，左侧可以增删维度和度量，主区展示图表 DSL 预览。
- 字段操作完成后，主区内容会自动刷新，不需要手动触发。
- 当构建失败时，`ChartRenderer` 会显示默认错误与重试按钮。
