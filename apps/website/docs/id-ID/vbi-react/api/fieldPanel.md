# FieldPanel

## Impor

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## Tanda Tangan

```ts
FieldPanel(props: FieldPanelProps)
```

## Deskripsi

Menyediakan panel bidang dimensi/metrik dan interaksi penyuntingan dasar.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
