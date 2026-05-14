# VBI React

`@visactor/vbi-react` ist die React-Adapterebene für `@visactor/vbi` und bindet den `VBIChartBuilder` in den React-Komponentenbaum ein.

Die aktuellen Exporte sind in zwei Ebenen aufgeteilt:

- Root-Export `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Subpath-Export `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## Zweck

- Kapselung von State-Subscription und Rendering für React 18+
- Verwendet `VBIChartBuilder` als Single Source of Truth (SSOT) und hält keine zusätzliche Kopie des Business-State
- Geeignet für BI-Konfigurationspanels, Chart-Vorschaubereiche und DSL-Debug-Panels

## Installation

Installation in einem normalen Projekt:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Für lokale Entwicklung in diesem Monorepo können workspace-Abhängigkeiten verwendet werden:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Schnellstart

Das folgende Beispiel zeigt den minimalen geschlossenen Ablauf mit `useVBI` + `useVSeed`:

```tsx
import { useMemo } from 'react'
import { VBI, type VBIConnector } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

const connectorId = 'local-demo'

const connector: VBIConnector = {
  discoverSchema: async () => [
    { name: 'region', type: 'string' },
    { name: 'sales', type: 'number' },
  ],
  query: async () => ({
    dataset: [
      { region: 'East', sales: 120 },
      { region: 'West', sales: 90 },
    ],
  }),
}

VBI.registerConnector(connectorId, connector)

export function App() {
  const builder = useMemo(
    () =>
      VBI.chart.create({
        ...VBI.chart.createEmpty(connectorId),
        chartType: 'bar',
      }),
    [],
  )

  const { dsl } = useVBI(builder)
  const { vseed, loading, error } = useVSeed(builder, { debounce: 0 })

  if (error) return <pre>{error.message}</pre>
  if (loading || !vseed) return <div>Loading...</div>

  return (
    <div>
      <h3>{dsl.chartType}</h3>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## Dokumentation

- [API-Überblick](./api/index)
- [Beispiele](./examples/index)
