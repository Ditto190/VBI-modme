# pipeline 설계

:::info 왜 Pipeline인가?
1. 팀 내 선배들의 선택입니다.
2. Pipeline의 장점은 `VSeed`가 각 차트 유형의 실행 흐름을 독립적으로 제어할 수 있게 한다는 점입니다. 좋은 설계를 통해 각 차트 유형의 구현은 결합도를 낮추면서도 부분적으로 재사용할 수 있고, 각 차트 유형은 어떤 세부 사항도 정밀하게 제어할 수 있습니다. 이것이 Pipeline이 가져오는 것이며, `VSeed`에 가장 필요한 것입니다.
3. 이에 비해 Pipeline 패턴의 단점은 설계 시 피할 수 있습니다. 개별 `Pipe`의 규모를 줄이고 `Pipe` 간 의존성을 줄이면 이 패턴이 가져오는 단점을 크게 피할 수 있습니다.
4. 네 세대의 Pipeline 설계와 최적화를 거쳐 VSeed에서는 이미 다섯 번째 버전입니다. 밟아야 할 시행착오는 이미 밟았습니다.

:::

## Pipeline이란?

Pipeline은 강력한 추상화이자 엔지니어링 실천입니다. 복잡한 작업을 서로 연결되고 순서대로 실행되는 작은 단계들의 연속으로 분해합니다. 그 설계 철학과 구현 방식은 함수형 프로그래밍(FP)의 핵심 사상에서 깊은 영향을 받았습니다.

### Pipeline의 장점:
- 모듈화: 원자적으로 구현하고, 원자를 조합해 모듈을 얻습니다.
- 자동화: 입력만 정하면 내부 구현을 신경 쓰지 않아도 자동으로 출력을 얻을 수 있습니다.
- 순수 함수: 지정된 입력은 반드시 기대한 출력을 얻으며, 이는 순수 함수의 특징입니다.
- 병렬성: 자연스럽게 동시성을 지원합니다.
- 재사용성: 모든 모듈은 재사용할 수 있습니다.
- 테스트 가능성: 이론적으로 각 모듈은 독립적이며 단독으로 테스트해 품질을 보장할 수 있습니다.
- 추적 가능성: 각 단계의 입력과 출력이 명확해 문제 위치 파악과 프로세스 상태 모니터링이 쉽습니다.
- 캐시 가능성: 이론적으로 단일 `Pipe`의 출력을 독립적으로 캐시할 수 있어 중복 계산을 피하고 효율을 높일 수 있습니다.

### Pipeline의 단점:
- 선후 의존성: `Pipe` 사이에 선후 의존성이 있으면 이해 비용이 증가합니다. 뒤 단계를 이해하려면 앞 단계를 먼저 이해해야 하기 때문입니다. 문제를 빠르게 찾으려면 전체 흐름에 대한 깊은 이해가 필요합니다.
- 디버깅 비용: Pipeline은 순서대로 실행되므로 어느 한 단계가 실패하면 전체 Pipeline이 실패합니다. 실패한 단계를 찾아 고쳐야 하므로 디버깅이 어려워집니다.
- 성능 문제: Pipeline은 순서대로 실행되므로 각 단계의 출력은 앞 단계가 완료되기를 기다려야 합니다. 특히 어떤 단계의 실행 시간이 길면 전체 Pipeline의 실행 효율에 영향을 줍니다.
- 함수형 프로그래밍: 새로운 개념을 이해해야 하므로 학습 비용이 있습니다. 그래서 설계 원리와 구현 세부 사항을 기여 가이드에 작성해 다른 개발자가 이해하고 사용할 수 있게 해야 합니다.

## VSeed에서는 Pipeline을 어떻게 작성해야 하는가?

### Pipe 조합 패턴

여러 기능 `Pipe`는 더 큰 기능 `Pipe`로 조합할 수도 있고, 더 복잡한 Pipeline으로 조합할 수도 있습니다.

VSeed에서 하나의 완전한 Pipeline은 하나의 차트 유형 구현에 대응합니다. `Pipe`의 조합 관계를 설명하면 서로 다른 차트 유형을 만들 수 있습니다. Pipeline 조합 단계에서는 각 `pipe`의 구체적인 구현을 신경 쓸 필요가 없습니다.


#### 조합 차이

예를 들어:

라인 차트와 영역 차트는 라벨, 범례, 축 등 많은 기능을 재사용할 수 있습니다. 하지만 라인 차트에는 영역 마크 스타일이 없으므로, pipeline은 기능 `Pipe` 조합을 통해 이 차이를 해결합니다. 전체 과정에는 어떤 `if` 문도 없습니다.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // 영역 차트에만 영역 마크 스타일이 있다
  areaStyle,
]
```


### Pipe 어댑터 패턴

조합 패턴 외에도 `Pipe` 구성에는 일정한 조건이 있는 경우가 많습니다. 서로 다른 조건의 `Pipe` 조합을 만족시키기 위해 VSeed 내부에서는 `Pipe` 어댑터를 많이 사용합니다.

#### 조합 조건

예를 들어:

라인 차트에는 피벗 기능이 있습니다. 피벗이 없으면 VChart가 렌더링하고 VChart spec을 출력합니다. 피벗이 있으면 VTable이 렌더링하고 VTable spec을 출력합니다.

피벗 라인 차트는 라벨, 범례, 축 등 라인 차트의 기본 기능을 대부분 재사용해야 합니다. 따라서 어댑터 패턴을 통해 라인 차트의 `Pipe`를 피벗 라인 차트의 `Pipe`로 적응시켜야 합니다.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
]

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

정리하면, 각 adapter는 하나의 `if else`입니다. `pipe` 안에 숨겨진 조건을 adapter로 추상화할 수 있으므로 `if else`가 최상위로 올라갑니다. 그 결과 의존 관계가 더 명확하고 유지보수 비용이 낮은 Pipeline을 얻을 수 있습니다.

### Pipeline의 가장 기본 단위: 기능 Pipe

VSeed는 모든 차트 유형이 기능을 가장 기본 단위로 삼아 충분한 재사용성과 확장성을 제공하기를 기대합니다. 차트 유형의 pipeline은 아래에서 위로 구축됩니다. 각 기능 `Pipe`는 독립적이고 테스트 가능하며 재사용 가능한 모듈이어야 합니다.

가장 중요한 점은 기능 차이를 서로 다른 `Pipe`로 추상화하는 것, 즉 `if else`를 적게 쓰는 것이며, 크고 모든 것을 포함하는 `Pipe`를 쓰는 것이 아닙니다.

#### 평탄화된 기능 Pipe

예를 들어:

막대 차트, 컬럼 차트, 라인 차트, 영역 차트, 산점도는 모두 X축과 Y축을 가지고 있습니다. 서로 비슷하지만 조금씩 다릅니다. 크고 모든 것을 포함하는 `axes` pipe를 작성하면 다음과 같을 수 있습니다.

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // 라인 차트, 영역 차트, 컬럼 차트에는 하나의 이산 축과 하나의 연속 축이 있다
    return xy(spec, context)
  }
  if (isScatter){
    // 산점도에는 두 개의 연속 축이 있다
    return yy(spec, context)
  }
  if (isBar){
    // 막대 차트에는 하나의 이산 축과 하나의 연속 축이 있지만, 축 방향은 라인/영역/컬럼 차트와 다르다
    return yx(spec, context)
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

위 로직은 하나의 기능 `Pipe` 안에서 차트 유형에 따라 서로 다른 하위 기능 `pipe`를 선택합니다. 이로 인해 두 가지 문제가 생깁니다.
1. `xy`, `yx`, `yy` 내부의 반복 기능은 어떻게 재사용해야 할까요? 비슷하지만 다른 많은 하위 함수가 서로 다른 하위 기능 `pipe`에서 반복 호출되어야 합니다. 의존 관계가 쉽게 복잡해져 유지보수 비용이 증가합니다.
2. 라인 차트와 영역 차트 기능을 수정할 때 막대 차트를 놓치기 쉽습니다. 로직이 분기되어 있기 때문입니다. 따라서 새 기능을 구현할 때 차이를 고려해야 합니다.

전체 spec pipeline의 규모가 수백 개의 `pipe`로 커지면, 이런 작성 방식은 매우 높은 유지보수 비용을 가져옵니다. 따라서 차트 유형에 따라 서로 다른 하위 기능 `pipe`를 선택하는 더 단순한 방식이 필요합니다.

위 예를 계속하면, 차이를 서로 다른 `Pipe`로 추상화하고 더 세밀한 기능 단위에서 차이를 캡슐화한 다음, 마지막에 pipeline 안에서 직접 조합하면 위 문제를 피할 수 있습니다.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

위 예에서는 `axes` pipe를 구현하지 않고, `xBandAxis`, `yBandAxis`, `xLinearAxis`, `yLinearAxis` 네 개의 pipe를 직접 조합합니다. 이렇게 하면 `axes` pipe 안에서 차트 유형에 따라 서로 다른 하위 기능 `pipe`를 선택하는 문제를 피하고, 차트 유형 기반 분기를 피하며, `if else` 사용을 줄일 수 있습니다.

모든 차트 유형 차이의 분기는 Pipeline 위에 있어야 합니다. 부득이한 경우가 아니라면 Pipeline 내부에서 차트 유형에 따라 서로 다른 하위 기능 `pipe`를 선택할 필요가 없습니다.

이 조합 방식은 VSeed의 설계 철학에 부합합니다. 즉 `if else` 조건 판단으로 크고 모든 것을 포함하는 기능 `Pipe`를 만드는 대신, 더 평탄한 기능 `Pipe` 조합을 사용합니다.
