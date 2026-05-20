# MeasuresBuilder

지표 설정을 추가, 수정, 삭제하는 지표 빌더입니다. 지표는 매출, 이익, 수량처럼 데이터의 숫자 필드입니다

## 메서드

### constructor

**정의**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

지표 추가

**정의**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**반환**: `MeasuresBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `field` | string | - 필드명 |
| `callback` | (node: MeasureNodeBuilder) => void | - 콜백 함수 |

### remove

지정한 ID의 지표 삭제

**정의**:

```typescript
remove(id: string): MeasuresBuilder
```

**반환**: `MeasuresBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | - 지표 ID |

### update

지표 설정 업데이트

**정의**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**반환**: `MeasuresBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | - 지표 ID |
| `callback` | (node: MeasureNodeBuilder) => void | - 콜백 함수 |

### find

콜백 조건으로 첫 번째 지표를 찾으며 동작은 Array.find와 같습니다

**정의**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**반환**: `MeasureNodeBuilder \| undefined`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - 검색 조건 |

### findAll

모든 지표 가져오기

**정의**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**반환**: `MeasureNodeBuilder[]`

### toJSON

모든 지표를 JSON 배열로 내보내기

**정의**:

```typescript
toJSON(): VBIMeasure[]
```

**반환**: `VBIMeasure[]`

### observe

지표 변경 감시

**정의**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - 콜백 함수 |

### static isMeasureNode

**정의**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**반환**: `node is VBIMeasure`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

### static isMeasureGroup

**정의**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**반환**: `node is VBIMeasureGroup`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |
