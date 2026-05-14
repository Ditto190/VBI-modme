# Edit Kondisi Filter

Contoh ini menunjukkan entry mutation untuk `useWhereFilter` dan `useHavingFilter`.

## Dependensi

- Dependensi paket: `@visactor/vbi-react`, `@visactor/vbi`, `react`
- Batasan input: `builder` setidaknya berisi field `region` dan `sales` agar perubahan Where/Having dapat didemonstrasikan

## Cuplikan Kode

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
        Tambah Kondisi Where
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        Tambah Kondisi Having
      </button>
      <button onClick={clearWhereFilter}>Kosongkan Where</button>
      <button onClick={clearHavingFilter}>Kosongkan Having</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## Hasil yang Diharapkan

- Setelah tombol diklik, kondisi Where/Having masing-masing ditambahkan ke pohon filter builder.
- Tombol kosongkan langsung menghapus kondisi filter terkait.
- JSON di bagian bawah halaman dapat digunakan untuk memeriksa struktur DSL filter saat ini.
