# VBI.resources.chart

Không gian tên resource biểu đồ trên một phiên bản VBI.

## Phương thức

### register

Đăng ký một resource biểu đồ.

**Định nghĩa**:

```typescript
register(chart: VBIChartDSLInput): VBIChartDSL
```

**Trả về**: `VBIChartDSL`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `chart` | VBIChartDSLInput | - |

### get

Lấy DSL resource biểu đồ đã đăng ký.

**Định nghĩa**:

```typescript
get(uuid: string): VBIChartDSL | undefined
```

**Trả về**: `VBIChartDSL \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `uuid` | string | - |

### list

Lấy tất cả DSL resource biểu đồ đã đăng ký.

**Định nghĩa**:

```typescript
list(): VBIChartDSL[]
```

**Trả về**: `VBIChartDSL[]`

### has

Kiểm tra resource biểu đồ được chỉ định đã được đăng ký hay chưa.

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

Hủy đăng ký resource biểu đồ được chỉ định.

**Định nghĩa**:

```typescript
unregister(uuid: string): boolean
```

**Trả về**: `boolean`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `uuid` | string | - |
