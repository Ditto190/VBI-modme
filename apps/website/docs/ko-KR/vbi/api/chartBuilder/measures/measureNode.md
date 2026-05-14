# MeasureNodeBuilder

단일 메저를 설정하는 메저 노드 빌더입니다

## 속성

## 메서드

### constructor

**정의**:

```typescript
constructor(yMap: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getId

노드 ID 가져오기

**정의**:

```typescript
getId(): string
```

**반환**: `string`

### getField

필드명 가져오기

**정의**:

```typescript
getField(): string
```

**반환**: `string`

### getEncoding

차트 인코딩 위치 가져오기

**정의**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**반환**: `VBIMeasure['encoding'] \| undefined`

### getSort

정렬 설정 가져오기

**정의**:

```typescript
getSort(): VBISort | undefined
```

**반환**: `VBISort \| undefined`

### setAlias

표시 이름 설정

**정의**:

```typescript
setAlias(alias: string): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `alias` | string | - 표시 이름 |

### setEncoding

차트 인코딩 위치 설정

**정의**:

```typescript
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `encoding` | NonNullable<VBIMeasure['encoding']> | - 메저 인코딩 위치 |

### setSort

정렬 설정 설정

**정의**:

```typescript
setSort(sort: VBISort): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `sort` | VBISort | - 정렬 설정 |

### setAggregate

집계 함수 설정

**정의**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `aggregate` | VBIMeasure['aggregate'] | - 집계 설정 |

### setFormat

숫자 서식 설정

**정의**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `format` | VBIMeasureFormat | - 서식 설정 |

### getFormat

숫자 서식 가져오기

**정의**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**반환**: `VBIMeasureFormat \| undefined`

### clearFormat

숫자 서식 설정 지우기

**정의**:

```typescript
clearFormat(): this
```

**반환**: `this`

### clearSort

정렬 설정 지우기

**정의**:

```typescript
clearSort(): this
```

**반환**: `this`

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): VBIMeasure
```

**반환**: `VBIMeasure`