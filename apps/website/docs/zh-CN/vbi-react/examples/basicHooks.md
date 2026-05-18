# 基础 Hooks

这个示例展示如何把 `useVBI` 和 `useVSeed` 组合成最小闭环。

## 依赖说明

- 包依赖：`@visactor/vbi-react`、`@visactor/vbi`、`@visactor/vseed`、`react`
- 入参约束：需要一个已经初始化、且绑定了可用 connector 的 `VBIChartBuilder`

## 代码示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>Retry: {error.message}</button>
  }

  if (loading || !vseed) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h4>chartType: {dsl.chartType}</h4>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## 预期效果

- 当 builder 发生变化时，`dsl` 和 `vseed` 会一起更新。
- 首次渲染或正在刷新时会显示 `Loading...`；如果失败，可以手动重试。
- 成功后可以直接看到当前 `chartType` 和最新的 VSeed JSON。
