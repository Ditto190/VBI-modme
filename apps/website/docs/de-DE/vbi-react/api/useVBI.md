# useVBI

## Import

```ts
import { useVBI } from '@visactor/vbi-react'
```

## Signatur

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## Beschreibung

Abonniert Änderungen am DSL-Snapshot des Builders und gibt das aktuelle `dsl` sowie den ursprünglichen `builder` zurück.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
