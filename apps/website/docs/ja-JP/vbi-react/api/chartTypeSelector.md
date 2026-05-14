# ChartTypeSelector

## インポート

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## シグネチャ

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## 説明

チャートタイプのドロップダウンセレクターを提供します。

## 最小例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```
