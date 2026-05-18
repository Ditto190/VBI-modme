# 컴포넌트 기반 레이아웃

이 예제는 `BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector`를 보여줍니다.

## 의존성 설명

- 패키지 의존성: `@visactor/vbi-react/components`, `@visactor/vbi`, `react`
- 입력 제약: `FieldPanel`의 추가/삭제 동작을 보여줄 수 있도록 `builder`에는 선택 가능한 차원/측정값 필드가 있어야 합니다

## 코드 조각

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { BuilderLayout, ChartRenderer, ChartTypeSelector, FieldPanel } from '@visactor/vbi-react/components'

export function LayoutDemo({ builder }: { builder: VBIChartBuilder }) {
  return (
    <BuilderLayout
      topBar={<ChartTypeSelector builder={builder} />}
      leftPanel={
        <FieldPanel
          builder={builder}
          dimensionOptions={[{ label: '지역', value: 'region' }]}
          measureOptions={[{ label: '매출', value: 'sales' }]}
        />
      }
      main={<ChartRenderer builder={builder} debounce={100} />}
    />
  )
}
```

## 기대 효과

- 상단에서 차트 유형을 전환하고, 왼쪽에서 차원/측정값을 추가/삭제하며, 메인 영역에서 차트 DSL 미리보기를 표시합니다.
- 필드 조작 후 메인 영역 내용은 수동 트리거 없이 자동으로 갱신됩니다.
- 빌드가 실패하면 `ChartRenderer`가 기본 에러와 다시 시도 버튼을 표시합니다.
