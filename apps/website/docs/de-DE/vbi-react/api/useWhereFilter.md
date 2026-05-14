# useWhereFilter

## Import

```ts
import { useWhereFilter } from '@visactor/vbi-react'
```

## Signatur

```ts
useWhereFilter(builder: VBIChartBuilder): UseWhereFilterReturn
```

## Beschreibung

Verwaltet den Where-Filterbaum und stellt Mutation-Einstiege bereit.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useWhereFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useWhereFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
