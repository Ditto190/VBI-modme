# ChartRenderer

## Import

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## Chữ ký

```ts
ChartRenderer(props: ChartRendererProps)
```

## Mô tả

Kết xuất biểu đồ dựa trên output của builder, đồng thời xử lý trạng thái loading và lỗi.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```
