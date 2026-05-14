# useVSeed

## Import

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## Mô tả

Thực thi quy trình query và tạo VSeed, trả về trạng thái cùng dữ liệu cần thiết cho việc kết xuất.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}
```
