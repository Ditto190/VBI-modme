# Filterbedingungen bearbeiten

Dieses Beispiel zeigt die Mutation-Einstiege für `useWhereFilter` und `useHavingFilter`.

## Abhängigkeiten

- Paketabhängigkeiten: `@visactor/vbi-react`, `@visactor/vbi`, `react`
- Eingabeanforderung: `builder` sollte mindestens die Felder `region` und `sales` enthalten, um Where/Having-Änderungen zu demonstrieren

## Codeausschnitt

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter, useWhereFilter } from '@visactor/vbi-react'

export function FilterDemo({ builder }: { builder: VBIChartBuilder }) {
  const { whereFilter, mutateWhereFilter, clearWhereFilter } = useWhereFilter(builder)
  const { havingFilter, mutateHavingFilter, clearHavingFilter } = useHavingFilter(builder)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button
        onClick={() =>
          mutateWhereFilter((where) => {
            where.add('region', (node) => node.setOperator('eq').setValue('East'))
          })
        }
      >
        Where-Bedingung hinzufügen
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        Having-Bedingung hinzufügen
      </button>
      <button onClick={clearWhereFilter}>Where leeren</button>
      <button onClick={clearHavingFilter}>Having leeren</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## Erwartetes Verhalten

- Nach dem Klick werden Where-/Having-Bedingungen jeweils an den Filterbaum des builders angehängt.
- Die Leeren-Buttons entfernen die entsprechenden Filterbedingungen sofort.
- Das JSON am Seitenende kann verwendet werden, um die aktuelle Filter-DSL-Struktur zu prüfen.
