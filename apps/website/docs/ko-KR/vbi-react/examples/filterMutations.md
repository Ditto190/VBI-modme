# 필터 조건 편집

이 예제는 `useWhereFilter`와 `useHavingFilter`의 mutation 진입점을 보여줍니다.

## 의존성 설명

- 패키지 의존성: `@visactor/vbi-react`, `@visactor/vbi`, `react`
- 입력 제약: Where/Having 변경을 보여줄 수 있도록 `builder`에는 최소한 `region`과 `sales` 필드가 있어야 합니다

## 코드 조각

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter, useWhereFilter } from '@visactor/vbi-react'

export function FilterDemo({ builder }: { builder: VBIChartBuilder }) {
  const { whereFilter, mutateWhereFilter, clearWhereFilter } = useWhereFilter(builder)
  const { havingFilter, mutateHavingFilter, clearHavingFilter } = useHavingFilter(builder)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button
        onClick={() =>
          mutateWhereFilter((where) => {
            where.add('region', (node) => node.setOperator('eq').setValue('East'))
          })
        }
      >
        Where 조건 추가
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        Having 조건 추가
      </button>
      <button onClick={clearWhereFilter}>Where 비우기</button>
      <button onClick={clearHavingFilter}>Having 비우기</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## 기대 효과

- 버튼을 클릭하면 Where/Having 조건이 각각 builder의 필터 트리에 추가됩니다.
- 비우기 버튼은 해당 필터 조건을 즉시 제거합니다.
- 페이지 하단의 JSON으로 현재 필터 DSL 구조를 확인할 수 있습니다.
