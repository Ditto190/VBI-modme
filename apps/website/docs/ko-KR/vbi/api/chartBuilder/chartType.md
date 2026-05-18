# ChartTypeBuilder

차트 타입을 전환하고 가져오는 차트 타입 빌더입니다. 테이블, 막대, 라인, 파이, 산점도 등 여러 차트 타입을 지원합니다

## 속성

## 메서드

### constructor

생성자

**정의**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

차트 타입 변경 감시

**정의**:

```typescript
observe(callback: ObserveCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 콜백 함수 |

### changeChartType

차트 타입 설정

**정의**:

```typescript
changeChartType(chartType: string)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `chartType` | string | - 차트 타입 |

### getChartType

현재 차트 타입 가져오기

**정의**:

```typescript
getChartType(): string
```

**반환**: `string`

### getSupportedDimensionEncodings

현재 차트 타입이 지원하는 차원 인코딩 가져오기

**정의**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

현재 차트 타입에 따라 차원 순서대로 권장 차원 인코딩 반환

**정의**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `dimensionCount` | number | - 차원 수. 기본값은 현재 DSL의 차원 수 |

### getSupportedMeasureEncodings

현재 차트 타입이 지원하는 지표 인코딩 가져오기

**정의**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

현재 차트 타입에 따라 지표 순서대로 권장 지표 인코딩 반환

**정의**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `measureCount` | number | - 지표 수. 기본값은 현재 DSL의 지표 수 |

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): string
```

**반환**: `string`

### getAvailableChartTypes

지원되는 모든 차트 타입 가져오기

**정의**:

```typescript
getAvailableChartTypes(): string[]
```

**반환**: `string[]`
