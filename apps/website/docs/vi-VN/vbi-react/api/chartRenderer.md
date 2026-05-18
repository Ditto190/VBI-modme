# ChartRenderer

## Nhập

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## Chữ ký

```ts
ChartRenderer(props: ChartRendererProps)
```

## Mô tả

Kết xuất biểu đồ dựa trên đầu ra của builder, đồng thời xử lý trạng thái tải và lỗi.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```
