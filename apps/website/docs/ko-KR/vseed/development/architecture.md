# 아키텍처 설계

VSeed는 시맨틱 설정을 기반으로 하는 차트 생성기이며, 사용자의 의도와 하위 렌더링 엔진(VChart/VTable)을 연결하도록 설계되었습니다.

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed)

## 핵심 개념

### 1. 파이프라인 아키텍처 (Pipeline Architecture)
VSeed는 파이프라인 패턴을 사용해 차트 Spec을 단계적으로 구축합니다. 전체 과정은 두 가지 주요 단계로 나뉩니다.

- **AdvancedPipeline**:
  - 입력: 초기 `VSeed` 객체.
  - 담당: 데이터 재구성(Data Reshape), 테마 적용, 기본 설정 추론.
  - 출력: `AdvancedVSeed`(중간 상태 템플릿).

- **SpecPipeline**:
  - 입력: `AdvancedVSeed`.
  - 담당: 중간 상태 템플릿을 구체적인 VChart/VTable 설정 항목으로 변환합니다.
  - 출력: 최종 렌더링 가능한 Spec.

### 2. Builder 패턴
`VSeedBuilder` 클래스는 핵심 조정자로서 Context 관리, 플러그인 등록, 파이프라인 실행을 담당합니다.

### 3. 플러그인 기반 확장 (Extensibility)
VSeed의 핵심 기능(예: 지원되는 차트 유형)은 전부 플러그인 등록 메커니즘을 통해 구현됩니다.
- **Chart Type Registration**: 각 차트 유형(예: `bar`, `line`)은 등록된 플러그인입니다.
- **Theme Registration**: 사용자 정의 테마 등록을 지원합니다.
