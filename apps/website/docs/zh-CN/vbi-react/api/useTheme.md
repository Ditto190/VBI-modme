# useTheme

## 导入

```ts
import { useTheme } from '@visactor/vbi-react'
```

## 签名

```ts
useTheme(builder: VBIChartBuilder): UseThemeReturn
```

## 说明

读取并切换当前主题配置。

## 推荐先看

- [基础 Hooks](../examples/basicHooks)
- [过滤条件编辑](../examples/filterMutations)

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useTheme } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useTheme(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
