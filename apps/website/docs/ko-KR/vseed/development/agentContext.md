# Agent 개발 컨텍스트 (VSeed)

이 문서는 agent-code와 기여자를 위한 문서입니다. VSeed 하위 패키지의 핵심 아키텍처, 데이터 흐름, 확장 방식을 요약하여 자동화 개발 중 전체 맥락을 빠르게 파악할 수 있도록 합니다.

> 이것은 Agent 사용을 위해 설계된 "컨텍스트 인덱스"입니다. 더 자세한 엔지니어링 설명은 `packages/vseed/AGENTS.md`를 참고하세요.

## 1. 목표와 위치

VSeed는 `VSeed DSL`을 렌더링 가능한 `VChart` / `VTable` Spec으로 변환하는 **Spec Builder**이며, 차트를 지능적으로 생성하고 편집하는 기능을 지원합니다.

- 입력: `VSeed DSL`
- 출력: `VChart` / `VTable` Spec
- 핵심 흐름: `AdvancedPipeline` + `SpecPipeline`

## 2. 2단계 Pipeline

1. **AdvancedPipeline**

- 입력: `VSeed DSL`
- 출력: `AdvancedVSeed`(직렬화 가능한 중간 상태)
- 담당: 데이터 재구성, 기본값 추론, 인코딩 모델링, 테마와 스타일, 분석 설정

2. **SpecPipeline**

- 입력: `AdvancedVSeed`
- 출력: 최종 Spec(직렬화 불가, 직접 렌더링)
- 담당: 중간 상태를 구체적인 VChart / VTable 설정으로 매핑

## 3. Builder 진입점

- `Builder.from(vseed).build()`를 사용해 Spec을 생성합니다
- `prepare()`는 필요할 때 dynamicFilter를 실행합니다

소스 진입점:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. 데이터 재구성 (핵심)

- `foldMeasures`: 여러 measure를 하나의 measure로 접고 `foldInfo`를 생성합니다
- `unfoldDimensions`: 시각적 인코딩 채널별로 dimension을 병합하고 `unfoldInfo`를 생성합니다
- `dataReshapeByEncoding`: 조합 호출(fold + unfold)

소스 진입점:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. 확장과 등록

- `registerAll()`: 모든 차트와 테마를 등록합니다
- `registerXxx()`: 개별 차트 유형 pipeline을 등록합니다
- `updateAdvanced()` / `updateSpec()`: 사용자 정의 Pipe를 삽입합니다

소스 진입점:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline 설계 원칙

- Pipe는 가능한 한 원자적으로 만들고 if/else를 줄입니다
- 조건부 흐름은 Adapter로 조합합니다
- 차트 유형은 Pipe 조합으로 결정됩니다

참고:
- `apps/website/docs/ko-KR/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. 더 자세한 컨텍스트

- `packages/vseed/AGENTS.md`
- `apps/website/docs/ko-KR/vseed/development/architecture.md`
- `apps/website/docs/ko-KR/vseed/development/designPhilosophy/vseed.md`
