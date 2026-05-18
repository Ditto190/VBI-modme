# useMeasures

## Nhập

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## Mô tả

Đọc và cập nhật cấu hình chỉ số đo lường, đồng thời cung cấp khả năng thêm, xóa và chỉnh sửa chỉ số đo lường.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
