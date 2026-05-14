# FieldPanel

## Import

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## Signature

```ts
FieldPanel(props: FieldPanelProps)
```

## Deskripsi

Menyediakan panel field dimensi/measure dan interaksi edit dasar.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
