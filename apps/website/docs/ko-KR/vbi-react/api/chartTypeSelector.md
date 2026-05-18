# ChartTypeSelector

## 가져오기

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## 시그니처

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## 설명

차트 유형 드롭다운 셀렉터를 제공합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```
