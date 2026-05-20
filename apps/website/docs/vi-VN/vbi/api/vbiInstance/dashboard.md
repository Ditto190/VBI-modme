# VBI.dashboard

Không gian tên dashboard trên một phiên bản VBI, chịu trách nhiệm tạo Dashboard Builder và DSL dashboard rỗng.

## Phương thức

### create

Tạo VBIDashboardBuilder từ DSL dashboard.

**Định nghĩa**:

```typescript
create(dashboard: VBIDashboardDSLInput, builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>): VBIDashboardBuilder<TQueryDSL, TSeedDSL>
```

**Trả về**: `VBIDashboardBuilder<TQueryDSL, TSeedDSL>`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `dashboard` | VBIDashboardDSLInput | - |
| `builderOptions?` | VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Tạo một DSL dashboard rỗng.

**Định nghĩa**:

```typescript
createEmpty(uuid?: string): VBIDashboardDSL
```

**Trả về**: `VBIDashboardDSL`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `uuid?` | string | - |
