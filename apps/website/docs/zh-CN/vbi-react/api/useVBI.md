# useVBI

## 导入

```ts
import { useVBI } from '@visactor/vbi-react'
```

## 签名

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## 说明

订阅 builder 的 DSL 快照变化，返回最新 `dsl` 与原始 `builder`。

## 推荐先看

- [基础 Hooks](../examples/basicHooks)
- [过滤条件编辑](../examples/filterMutations)

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
