# ChartTypeSelector

## Import

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## Chữ ký

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## Mô tả

Cung cấp bộ chọn dạng dropdown cho loại biểu đồ.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```
