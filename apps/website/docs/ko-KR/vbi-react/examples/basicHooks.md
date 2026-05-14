# 기본 Hooks

이 예제는 `useVBI`와 `useVSeed`를 함께 사용하는 방법을 보여줍니다.

## 의존성 설명

- 패키지 의존성: `@visactor/vbi-react`, `@visactor/vbi`, `@visactor/vseed`, `react`
- 입력 제약: 사용 가능한 connector가 바인딩된 초기화 완료 `VBIChartBuilder`가 필요합니다

## 코드 조각

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>다시 시도: {error.message}</button>
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

## 기대 효과

- builder가 변경되면 `dsl`과 `vseed`가 동기화되어 업데이트됩니다.
- 최초 로딩 또는 업데이트 중에는 `Loading...`을 표시하고, 실패 시 수동으로 다시 시도할 수 있습니다.
- 성공 후 현재 `chartType`과 최신 VSeed JSON을 확인할 수 있습니다.
