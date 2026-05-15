# useVSeed

## 导入

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## 签名

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## 说明

执行查询与 VSeed 生成流程，返回渲染所需状态与数据。

## 推荐先看

- [基础 Hooks](../examples/basicHooks)
- [过滤条件编辑](../examples/filterMutations)

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}
```
