# Grundlegende Hooks

Dieses Beispiel zeigt die kombinierte Verwendung von `useVBI` und `useVSeed`.

## Abhängigkeiten

- Paketabhängigkeiten: `@visactor/vbi-react`, `@visactor/vbi`, `@visactor/vseed`, `react`
- Eingabeanforderung: ein initialisierter `VBIChartBuilder` mit gebundenem verfügbarem connector

## Codeausschnitt

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>Erneut versuchen: {error.message}</button>
  }

  if (loading || !vseed) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h4>chartType: {dsl.chartType}</h4>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## Erwartetes Verhalten

- Wenn sich der builder ändert, werden `dsl` und `vseed` synchron aktualisiert.
- Beim ersten Laden oder während Aktualisierungen wird `Loading...` angezeigt; bei Fehlern ist ein manueller Retry möglich.
- Nach Erfolg werden der aktuelle `chartType` und das neueste VSeed JSON angezeigt.
