# Hooks Dasar

Contoh ini menunjukkan penggunaan gabungan `useVBI` dan `useVSeed`.

## Dependensi

- Dependensi paket: `@visactor/vbi-react`, `@visactor/vbi`, `@visactor/vseed`, `react`
- Batasan input: membutuhkan `VBIChartBuilder` yang sudah diinisialisasi dan sudah terhubung ke connector yang tersedia

## Cuplikan Kode

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>Coba lagi: {error.message}</button>
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

## Hasil yang Diharapkan

- Ketika builder berubah, `dsl` dan `vseed` ikut diperbarui secara sinkron.
- Saat pertama kali dimuat atau sedang diperbarui, tampil `Loading...`; saat gagal, pengguna dapat mencoba ulang secara manual.
- Setelah berhasil, pengguna dapat melihat `chartType` saat ini dan VSeed JSON terbaru.
