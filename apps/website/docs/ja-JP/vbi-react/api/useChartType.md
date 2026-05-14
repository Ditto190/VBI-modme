# useChartType

## インポート

```ts
import { useChartType } from '@visactor/vbi-react'
```

## シグネチャ

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## 説明

現在のチャートタイプを読み取り、更新し、利用可能なチャートタイプ一覧も公開します。

## 最小例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
