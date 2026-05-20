# VBI.connectors

VBI 인스턴스의 커넥터 네임스페이스입니다.

## 메서드

### register

커넥터를 등록합니다.

**정의**:

```typescript
register(id: VBIConnectorId, connector: VBIConnectorLike): void
```

**반환**: `void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |
| `connector` | VBIConnectorLike | - |

### get

커넥터를 가져옵니다.

**정의**:

```typescript
get(id: VBIConnectorId): Promise<VBIConnector>
```

**반환**: `Promise<VBIConnector>`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### has

커넥터가 등록되었는지 확인합니다.

**정의**:

```typescript
has(id: VBIConnectorId): boolean
```

**반환**: `boolean`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### unregister

커넥터 등록을 해제합니다.

**정의**:

```typescript
unregister(id: VBIConnectorId): boolean
```

**반환**: `boolean`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

---

# VBIConnectorFactory

VBIConnector를 지연 생성하는 팩토리 함수입니다.

**정의**:

```typescript
type VBIConnectorFactory = () => Promise<VBIConnector>
```

---

# VBIConnectorLike

VBI 인스턴스에 등록할 수 있는 커넥터 값으로, 직접 전달되는 커넥터 또는 비동기 팩토리를 지원합니다.

**정의**:

```typescript
type VBIConnectorLike = VBIConnector | VBIConnectorFactory
```
