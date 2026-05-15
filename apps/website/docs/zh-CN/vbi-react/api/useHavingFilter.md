# useHavingFilter

## 导入

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## 签名

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## 说明

管理 Having 过滤树，并提供 mutation 入口。

## 推荐先看

- [基础 Hooks](../examples/basicHooks)
- [过滤条件编辑](../examples/filterMutations)

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
