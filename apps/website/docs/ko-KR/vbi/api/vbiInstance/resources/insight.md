# VBI.resources.insight

VBI 인스턴스의 insight 리소스 네임스페이스입니다.

## 메서드

### register

단일 insight 리소스를 등록합니다.

**정의**:

```typescript
register(insight: VBIInsightDSLInput): VBIInsightDSL
```

**반환**: `VBIInsightDSL`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### get

등록된 insight 리소스 DSL을 가져옵니다.

**정의**:

```typescript
get(uuid: string): VBIInsightDSL | undefined
```

**반환**: `VBIInsightDSL \| undefined`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `uuid` | string | - |

### list

등록된 모든 insight 리소스 DSL을 가져옵니다.

**정의**:

```typescript
list(): VBIInsightDSL[]
```

**반환**: `VBIInsightDSL[]`

### has

지정한 insight 리소스가 등록되었는지 확인합니다.

**정의**:

```typescript
has(uuid: string): boolean
```

**반환**: `boolean`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `uuid` | string | - |

### unregister

지정한 insight 리소스의 등록을 해제합니다.

**정의**:

```typescript
unregister(uuid: string): boolean
```

**반환**: `boolean`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `uuid` | string | - |
