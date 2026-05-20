# VBI.chart

Không gian tên biểu đồ trên một phiên bản VBI, chịu trách nhiệm tạo chart Builder và DSL biểu đồ rỗng.

## Phương thức

### create

Tạo VBIChartBuilder từ DSL biểu đồ.

**Định nghĩa**:

```typescript
create(vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIChartBuilder<TQueryDSL, TSeedDSL>
```

**Trả về**: `VBIChartBuilder<TQueryDSL, TSeedDSL>`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `vbi` | VBIChartDSLInput | - |
| `builderOptions?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Tạo một DSL biểu đồ tối thiểu có thể sử dụng.

**Định nghĩa**:

```typescript
createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIChartDSL
```

**Trả về**: `VBIChartDSL`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `connectorId` | VBIConnectorId | - |
| `uuid?` | string | - |
