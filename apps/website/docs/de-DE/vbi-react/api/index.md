# API-Überblick

Die aktuellen Exporte von `@visactor/vbi-react` sind in zwei Teile aufgeteilt:

| Modul | Importpfad | Inhalt |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

Alle Hooks/Components arbeiten mit `VBIChartBuilder` und halten keine zusätzliche Quelle für Business-State.
