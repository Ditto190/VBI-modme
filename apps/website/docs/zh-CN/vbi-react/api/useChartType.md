# useChartType

## 导入

```ts
import { useChartType } from '@visactor/vbi-react'
```

## 签名

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## 说明

读取并更新当前图表类型，同时暴露可选图表类型列表。

## 推荐先看

- [基础 Hooks](../examples/basicHooks)
- [过滤条件编辑](../examples/filterMutations)

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
