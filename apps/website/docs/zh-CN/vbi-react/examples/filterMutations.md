# 过滤条件编辑

这个示例展示 `useWhereFilter` 和 `useHavingFilter` 的 mutation 入口。

## 依赖说明

- 包依赖：`@visactor/vbi-react`、`@visactor/vbi`、`react`
- 入参约束：`builder` 中至少应包含 `region` 和 `sales` 字段，方便演示 Where / Having 的变化。

## 代码示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter, useWhereFilter } from '@visactor/vbi-react'

export function FilterDemo({ builder }: { builder: VBIChartBuilder }) {
  const { whereFilter, mutateWhereFilter, clearWhereFilter } = useWhereFilter(builder)
  const { havingFilter, mutateHavingFilter, clearHavingFilter } = useHavingFilter(builder)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button
        onClick={() =>
          mutateWhereFilter((where) => {
            where.add('region', (node) => node.setOperator('eq').setValue('East'))
          })
        }
      >
        Add Where Condition
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        Add Having Condition
      </button>
      <button onClick={clearWhereFilter}>Clear Where</button>
      <button onClick={clearHavingFilter}>Clear Having</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## 预期效果

- 点击按钮后，Where / Having 条件会被追加到 builder 的过滤树中。
- `Clear` 按钮会立即移除对应的过滤条件。
- 页面底部的 JSON 可以用来确认当前过滤 DSL 的结构。
