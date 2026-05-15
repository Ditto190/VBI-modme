# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

동적 필터 코드를 비동기로 실행합니다. `build()` 전에 호출하여 `dynamicFilter` 안의 `code`를 실행하는 데 사용합니다. 멱등 메서드이므로 여러 번 호출해도 중복 실행되지 않습니다.

### build

```ts
build<T = S>(): T
```

최종 차트 설정(Spec)을 생성합니다. 가장 자주 사용되는 핵심 메서드입니다. 설정에 `dynamicFilter` code가 포함되어 있다면 먼저 `prepare()`를 호출해야 합니다.

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

중간 계층 설정(AdvancedVSeed)을 최종 Spec으로 변환합니다. 중간 계층 설정을 깊게 커스터마이즈해야 할 때만 사용합니다.

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

중간 계층 설정(AdvancedVSeed), 즉 차트 템플릿을 생성합니다. 원본 VSeed보다 더 상세하며 더 많은 차트 세부 정보를 노출합니다.

### getColorItems

```ts
getColorItems(): __type[]
```

데이터에서 색상과 관련된 필드 정보를 가져옵니다. 차트 범례나 색상 필터 UI를 생성할 때 자주 사용됩니다.

### getColorIdMap

```ts
getColorIdMap(): Record
```

색상 필드의 상세 매핑 테이블을 가져옵니다. Key는 색상 ID이고, Value는 상세 정보입니다.

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

이산 색상 맵에서 `colorId`부터 최종 색상 값까지의 매핑을 가져옵니다.

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[내부 메서드] 지정한 차트 타입의 템플릿 구축 파이프라인을 가져옵니다. VSeed에서 AdvancedVSeed로 변환되는 과정을 디버깅하는 데 사용합니다.

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[내부 메서드] 지정한 차트 타입의 Spec 구축 파이프라인을 가져옵니다. AdvancedVSeed에서 Spec으로 변환되는 과정을 디버깅하는 데 사용합니다.

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

지정한 테마의 설정을 가져옵니다. `themeKey`를 전달하지 않으면 기본적으로 `'light'` 테마를 반환합니다.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

등록된 모든 테마 설정을 가져옵니다.

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Builder 인스턴스를 편리하게 생성하기 위한 정적 팩토리 메서드입니다.

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[확장 메서드] 새 차트 타입의 템플릿 구축 파이프라인을 등록합니다.

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[확장 메서드] 새 차트 타입의 Spec 구축 파이프라인을 등록합니다.

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[확장 메서드] 기존 차트의 템플릿 구축 로직을 수정하고 커스텀 Pipe를 삽입해 생성되는 AdvancedVSeed에 영향을 줍니다.

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[확장 메서드] 기존 차트의 Spec 구축 로직을 수정하고 커스텀 Pipe를 삽입해 생성되는 최종 Spec에 영향을 줍니다.

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[확장 메서드] 커스텀 테마를 등록합니다.

## Properties

### get locale

```ts
get locale()
```

현재 Builder가 사용하는 로케일을 가져옵니다.

### get vseed

```ts
get vseed()
```

현재 VSeed 입력 데이터를 가져옵니다.

### set vseed

```ts
set vseed(value)
```

VSeed 입력 데이터를 업데이트합니다. 업데이트 후에는 `prepare()`의 캐시 상태가 지워집니다.

### get isPrepared

```ts
get isPrepared()
```

`prepare()` 상태를 가져옵니다.

### set isPrepared

```ts
set isPrepared(value: boolean)
```

`prepare()` 상태를 설정합니다.

### get advancedVSeed

```ts
get advancedVSeed()
```

현재 AdvancedVSeed 중간 설정 객체를 가져옵니다.

### set advancedVSeed

```ts
set advancedVSeed(value)
```

AdvancedVSeed 중간 설정 객체를 설정합니다. 일반적으로 기존 중간 설정을 캐시하거나 재사용하는 데 사용합니다.

### get spec

```ts
get spec()
```

현재 생성된 최종 Spec 객체를 가져옵니다.

### set spec

```ts
set spec(value)
```

Spec 객체를 설정합니다. 일반적으로 캐시에 사용합니다.

### get performance

```ts
get performance()
```

구축 과정의 성능 통계 정보를 가져옵니다. 각 단계의 소요 시간(단위: ms)을 포함합니다.

### set performance

```ts
set performance(value)
```

성능 통계 정보를 설정합니다.
