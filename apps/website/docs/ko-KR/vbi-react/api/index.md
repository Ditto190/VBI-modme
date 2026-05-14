# API 개요

`@visactor/vbi-react`의 현재 export는 두 부분으로 나뉩니다.

| 모듈 | import 경로 | 내용 |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

모든 hooks/components는 `VBIChartBuilder`를 중심으로 동작하며 추가 비즈니스 상태 소스를 유지하지 않습니다.
