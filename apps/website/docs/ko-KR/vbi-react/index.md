# VBI React

`@visactor/vbi-react`는 `@visactor/vbi`의 React 어댑터 계층이며, `VBIChartBuilder`를 React 컴포넌트 트리에 연결합니다.

현재 export는 두 계층으로 나뉩니다.

- 루트 export `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- 하위 경로 export `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## 포지셔닝

- React 18+를 위한 상태 구독과 렌더링 래퍼
- `VBIChartBuilder`를 Single Source of Truth (SSOT)로 사용하며 별도의 비즈니스 상태 복사본을 유지하지 않습니다
- BI 설정 패널, 차트 미리보기 영역, DSL 디버그 패널을 구축하는 데 적합합니다

## 설치

일반 프로젝트에서는 다음과 같이 설치합니다.

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

이 monorepo 안에서 로컬로 연동할 때는 workspace 의존성을 사용할 수 있습니다.

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## 빠른 시작

아래 예제는 `useVBI` + `useVSeed`의 최소 폐쇄 흐름을 보여줍니다.

```tsx
import { useMemo } from 'react'
import { VBI, type VBIConnector } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

const connectorId = 'local-demo'

const connector: VBIConnector = {
  discoverSchema: async () => [
    { name: 'region', type: 'string' },
    { name: 'sales', type: 'number' },
  ],
  query: async () => ({
    dataset: [
      { region: 'East', sales: 120 },
      { region: 'West', sales: 90 },
    ],
  }),
}

VBI.registerConnector(connectorId, connector)

export function App() {
  const builder = useMemo(
    () =>
      VBI.chart.create({
        ...VBI.chart.createEmpty(connectorId),
        chartType: 'bar',
      }),
    [],
  )

  const { dsl } = useVBI(builder)
  const { vseed, loading, error } = useVSeed(builder, { debounce: 0 })

  if (error) return <pre>{error.message}</pre>
  if (loading || !vseed) return <div>Loading...</div>

  return (
    <div>
      <h3>{dsl.chartType}</h3>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## 문서 탐색

- [API 개요](./api/index)
- [예제](./examples/index)
