# Ikhtisar API

Ekspor `@visactor/vbi-react` saat ini dibagi menjadi dua bagian:

| Modul | Path Import | Isi |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

Semua hooks/components bekerja di sekitar `VBIChartBuilder` dan tidak memelihara sumber state bisnis tambahan.
