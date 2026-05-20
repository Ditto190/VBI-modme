# VBI.connectors

Không gian tên connector trên một phiên bản VBI.

## Phương thức

### register

Đăng ký connector.

**Định nghĩa**:

```typescript
register(id: VBIConnectorId, connector: VBIConnectorLike): void
```

**Trả về**: `void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | VBIConnectorId | - |
| `connector` | VBIConnectorLike | - |

### get

Lấy connector.

**Định nghĩa**:

```typescript
get(id: VBIConnectorId): Promise<VBIConnector>
```

**Trả về**: `Promise<VBIConnector>`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### has

Kiểm tra connector đã được đăng ký hay chưa.

**Định nghĩa**:

```typescript
has(id: VBIConnectorId): boolean
```

**Trả về**: `boolean`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### unregister

Hủy đăng ký connector.

**Định nghĩa**:

```typescript
unregister(id: VBIConnectorId): boolean
```

**Trả về**: `boolean`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

---

# VBIConnectorFactory

Hàm factory tạo VBIConnector theo cách lazy.

**Định nghĩa**:

```typescript
type VBIConnectorFactory = () => Promise<VBIConnector>
```

---

# VBIConnectorLike

Giá trị connector có thể đăng ký vào một phiên bản VBI, hỗ trợ truyền trực tiếp connector hoặc factory bất đồng bộ.

**Định nghĩa**:

```typescript
type VBIConnectorLike = VBIConnector | VBIConnectorFactory
```
