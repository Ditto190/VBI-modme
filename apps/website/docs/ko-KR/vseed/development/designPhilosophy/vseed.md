# VSeed

:::info 한 줄 요약
위로는 유연한 비즈니스 요구를 이어 받고, 아래로는 데이터 접근 형식을 제한하며, 데이터를 통일적으로 편성해 복잡함을 단순하게 만듭니다.
:::

## VSeed란 무엇인가요?

`VSeed`는 데이터 분석을 위한 시각화 도구입니다. 서로 다른 차트 유형 사이에서 높은 일관성의 데이터 변환 능력을 제공하는 데 집중하며, 가벼운 데이터 분석 요구를 만족시키기 위한 일부 즉시 사용 가능한 기능도 제공합니다.

## VSeed의 장점은 무엇인가요?

> 먼저 정말 사용하기 쉽고, 다음으로 확실히 유연합니다. 마지막으로 VSeed 내부에는 많은 캡슐화가 있으므로, VSeed가 데이터 재구성을 어떻게 수행하는지 이해해야 완벽하게 활용할 수 있습니다.

1. 가장 직관적인 차트 전환 방식 [Demo](/vseed/guide/intro/chartTypeSwitch)
2. 가장 사용하기 쉬운 피벗 차트 [Demo](/vseed/guide/intro/pivotAndCombine)
3. 강력한 데이터 재구성 능력. 별도 데이터 처리가 필요 없으며, dimension과 measure의 수나 차트 유형에 관계없이 차트를 만들 수 있습니다 [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed`는 완전히 직렬화 가능하므로 `VSeed DSL`의 크로스 플랫폼 전송을 지원합니다 [Demo](/vseed/guide/intro/crossPlatformRender)
5. 즉시 사용 가능: 숫자 형식, 국제화, 라이트/다크 테마, 일반 스타일 등 [Demo](/vseed/guide/intro/internationalization)
6. 뛰어난 데이터 처리 성능. `Node` 측 데이터 처리와 `Web` 측 시각화를 지원합니다 [Demo](/vseed/guide/intro/separateBuild)

## VSeed의 단점은 무엇인가요?

1. `VSeed`는 단일 차트의 모든 세부 사항을 다듬는 역할을 담당하지 않습니다. 이런 요구는 `VChart`, `VTable`이 제공합니다. `VSeed`는 `spec`을 유연하게 수정하는 능력만 제공하며, 사용자는 자신의 요구에 따라 차트의 모든 세부 사항을 유연하게 수정할 수 있습니다.
2. `tidyData` 규격을 따르는 데이터셋만 `VSeed`로 시각화할 수 있습니다. 표준적이지 않은 데이터셋은 `VSeed`에서 허용하지 않습니다.
3. `VisActor` 생태계를 기반으로 구축되어 있으므로 사용자는 `VChart`와 `VTable`의 기본 개념을 이해해야 합니다.

## VSeed의 원칙은 무엇인가요?

1. `VSeed`는 반드시 직렬화를 지원해야 합니다.
2. `VSeed`는 지나치게 많은 스타일 설정 능력을 제공할 필요가 없으며, 차트와 데이터 사이의 관계를 처리하는 데 집중해야 합니다.
3. `VSeed`는 숫자 형식, 국제화, 테마, 일반 스타일, 일반 기능 등 분석 영역에서 자주 쓰는 범용 기능을 캡슐화해 즉시 사용할 수 있도록 해야 합니다.
4. 더 유연한 커스터마이징 요구는 사용자가 2차로 직접 처리해야 합니다. 따라서 VSeed는 VChart와 VTable의 spec을 구성하기 위한 Spec Builder만 외부에 제공합니다.
   - 사용자는 VChart Instance와 VTable Instance를 유연하게 제어할 수 있습니다.
   - 사용자는 자신의 요구에 따라 VChart와 VTable의 spec을 유연하게 수정할 수 있습니다.

## 왜 VSeed를 설계했나요?

1. `VChart`는 결코 `VTable`로 매끄럽게 전환될 수 없고, 그 반대도 마찬가지입니다. 이런 요구에는 상위 추상화 캡슐화가 필연적으로 등장합니다.
2. `VChart`, `VTable` 사용자는 데이터를 직접 처리해야 하며, 이 작업은 무의식적으로 수백, 수천 번 반복됩니다. `VSeed`는 일반적인 시나리오에서 데이터 처리 복잡도를 낮추고 반복 작업을 줄이고자 합니다.
3. `VChart`와 `VTable`의 사용 문턱을 어느 정도 낮출 수 있습니다. 예를 들어 `VTable`로 `PivotChart`를 렌더링할 수 있습니다.
4. `VSeed`는 최종적으로 범용 데이터 분석 도구를 만들기 위한 `HeadlessBI`의 하위 모듈로 발전할 수 있습니다.
