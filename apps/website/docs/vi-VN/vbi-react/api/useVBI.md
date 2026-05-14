# useVBI

## Import

```ts
import { useVBI } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## Mô tả

Theo dõi các thay đổi snapshot DSL trên builder, trả về `dsl` mới nhất và `builder` gốc.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
