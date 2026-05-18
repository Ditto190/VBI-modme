# useWhereFilter

## Nhập

```ts
import { useWhereFilter } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useWhereFilter(builder: VBIChartBuilder): UseWhereFilterReturn
```

## Mô tả

Quản lý cây lọc Where và cung cấp các điểm vào mutation.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useWhereFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useWhereFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
