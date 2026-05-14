# DimensionsBuilder

차원 설정을 추가, 수정, 삭제하는 차원 빌더입니다. 차원은 시간, 지역, 제품 카테고리처럼 데이터를 분류하는 필드입니다

## 속성

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

차원 추가

**정의**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**반환**: `DimensionsBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `field` | string | - 필드명 |
| `callback` | (node: DimensionNodeBuilder) => void | - 콜백 함수 |

### remove

지정한 ID의 차원 삭제

**정의**:

```typescript
remove(id: string): DimensionsBuilder
```

**반환**: `DimensionsBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | - 차원 ID |

### update

지정한 차원 ID의 설정 업데이트

**정의**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**반환**: `DimensionsBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | - 차원 ID |
| `callback` | (node: DimensionNodeBuilder) => void | - 콜백 함수 |

### find

콜백 조건으로 첫 번째 차원을 찾으며 동작은 Array.find와 같습니다

**정의**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**반환**: `DimensionNodeBuilder \| undefined`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - 검색 조건 |

### findAll

모든 차원 가져오기

**정의**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**반환**: `DimensionNodeBuilder[]`

### toJSON

모든 차원을 JSON 배열로 내보내기

**정의**:

```typescript
toJSON(): VBIDimension[]
```

**반환**: `VBIDimension[]`

### observe

차원 변경을 감시하고 감시 해제 함수를 반환

**정의**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - 콜백 함수 |

### static isDimensionNode

**정의**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**반환**: `node is VBIDimension`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

### static isDimensionGroup

**정의**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**반환**: `node is VBIDimensionGroup`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |