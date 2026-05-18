# Layout dengan Komponen

Contoh ini menunjukkan `BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector`.

## Dependensi

- Dependensi paket: `@visactor/vbi-react/components`, `@visactor/vbi`, `react`
- Batasan input: `builder` sebaiknya memiliki field dimensi/metrik yang tersedia agar `FieldPanel` dapat mendemonstrasikan operasi tambah/hapus

## Cuplikan Kode

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
          dimensionOptions={[{ label: 'Wilayah', value: 'region' }]}
          measureOptions={[{ label: 'Penjualan', value: 'sales' }]}
        />
      }
      main={<ChartRenderer builder={builder} debounce={100} />}
    />
  )
}
```

## Hasil yang Diharapkan

- Bagian atas dapat mengganti jenis chart, panel kiri dapat menambah/menghapus dimensi/metrik, dan area utama menampilkan pratinjau DSL chart.
- Setelah operasi field, konten area utama diperbarui otomatis tanpa pemicu manual.
- Ketika proses build gagal, `ChartRenderer` menampilkan error default dan tombol coba ulang.
