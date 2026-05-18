# ChartRenderer

## インポート

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## シグネチャ

```ts
ChartRenderer(props: ChartRendererProps)
```

## 説明

builder の出力に基づいてチャートをレンダリングし、ローディング状態とエラー状態を処理します。

## 最小例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```
