# LimitBuilder

데이터 양 제한 빌더로 현재 limit 설정 및 조회에 사용합니다

## 메서드

### constructor

생성자

**정의**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

limit 변경을 감시하고 감시 해제 함수를 반환

**정의**:

```typescript
observe(callback: ObserveCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 콜백 함수 |

### setLimit

limit 설정

**정의**:

```typescript
setLimit(limit: number)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `limit` | number | - 데이터 양 제한 |

### getLimit

현재 limit 가져오기

**정의**:

```typescript
getLimit(): number | undefined
```

**반환**: `number \| undefined`

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): number | undefined
```

**반환**: `number \| undefined`
