# VBI.resources.insight

Không gian tên resource insight trên một phiên bản VBI.

## Phương thức

### register

Đăng ký một resource insight.

**Định nghĩa**:

```typescript
register(insight: VBIInsightDSLInput): VBIInsightDSL
```

**Trả về**: `VBIInsightDSL`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### get

Lấy DSL resource insight đã đăng ký.

**Định nghĩa**:

```typescript
get(uuid: string): VBIInsightDSL | undefined
```

**Trả về**: `VBIInsightDSL \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `uuid` | string | - |

### list

Lấy tất cả DSL resource insight đã đăng ký.

**Định nghĩa**:

```typescript
list(): VBIInsightDSL[]
```

**Trả về**: `VBIInsightDSL[]`

### has

Kiểm tra resource insight được chỉ định đã được đăng ký hay chưa.

**Định nghĩa**:

```typescript
has(uuid: string): boolean
```

**Trả về**: `boolean`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `uuid` | string | - |

### unregister

Hủy đăng ký resource insight được chỉ định.

**Định nghĩa**:

```typescript
unregister(uuid: string): boolean
```

**Trả về**: `boolean`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `uuid` | string | - |
