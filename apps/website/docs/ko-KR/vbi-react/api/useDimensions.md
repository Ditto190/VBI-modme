# useDimensions

## 가져오기

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## 시그니처

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## 설명

dimension 설정을 읽고 업데이트하며, dimension 추가, 삭제, 수정 기능을 제공합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
