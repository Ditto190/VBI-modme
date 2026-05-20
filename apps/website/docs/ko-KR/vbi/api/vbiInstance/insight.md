# VBI.insight

VBI 인스턴스의 insight 네임스페이스로, Insight Builder와 빈 insight DSL 생성을 담당합니다.

## 메서드

### create

insight DSL로 VBIInsightBuilder를 생성합니다.

**정의**:

```typescript
create(insight: VBIInsightDSLInput): VBIInsightBuilder
```

**반환**: `VBIInsightBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### createEmpty

빈 insight DSL을 생성합니다.

**정의**:

```typescript
createEmpty(uuid?: string): VBIInsightDSL
```

**반환**: `VBIInsightDSL`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `uuid?` | string | - |
