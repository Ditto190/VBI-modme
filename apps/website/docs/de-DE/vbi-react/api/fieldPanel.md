# FieldPanel

## Import

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## Signatur

```ts
FieldPanel(props: FieldPanelProps)
```

## Beschreibung

Stellt ein Feldpanel für Dimensionen/Kennzahlen mit grundlegenden Bearbeitungsinteraktionen bereit.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
