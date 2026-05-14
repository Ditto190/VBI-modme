# FieldPanel

## インポート

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## シグネチャ

```ts
FieldPanel(props: FieldPanelProps)
```

## 説明

ディメンション/メジャーフィールドパネルと基本的な編集インタラクションを提供します。

## 最小例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
