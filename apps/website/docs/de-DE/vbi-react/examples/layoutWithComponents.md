# Layout mit Komponenten

Dieses Beispiel zeigt `BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector`.

## Abhängigkeiten

- Paketabhängigkeiten: `@visactor/vbi-react/components`, `@visactor/vbi`, `react`
- Eingabeanforderung: `builder` sollte verfügbare Dimensions- und Kennzahlenfelder enthalten, damit `FieldPanel` das Hinzufügen und Entfernen demonstrieren kann

## Codeausschnitt

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { BuilderLayout, ChartRenderer, ChartTypeSelector, FieldPanel } from '@visactor/vbi-react/components'

export function LayoutDemo({ builder }: { builder: VBIChartBuilder }) {
  return (
    <BuilderLayout
      topBar={<ChartTypeSelector builder={builder} />}
      leftPanel={
        <FieldPanel
          builder={builder}
          dimensionOptions={[{ label: 'Region', value: 'region' }]}
          measureOptions={[{ label: 'Umsatz', value: 'sales' }]}
        />
      }
      main={<ChartRenderer builder={builder} debounce={100} />}
    />
  )
}
```

## Erwartetes Verhalten

- Oben kann der Chart-Typ gewechselt werden, links lassen sich Dimensionen/Kennzahlen hinzufügen oder entfernen, und der Hauptbereich zeigt die Chart-DSL-Vorschau.
- Nach Feldoperationen aktualisiert sich der Hauptbereich automatisch, ohne manuellen Trigger.
- Wenn der Build fehlschlägt, zeigt `ChartRenderer` die Standardfehlermeldung und einen Retry-Button.
