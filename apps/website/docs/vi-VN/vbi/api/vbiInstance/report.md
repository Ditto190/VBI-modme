# VBI.report

Không gian tên report trên một phiên bản VBI, chịu trách nhiệm tạo Report Builder, report rỗng và trang rỗng.

## Phương thức

### create

Tạo VBIReportBuilder từ DSL report.

**Định nghĩa**:

```typescript
create(report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Trả về**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `report` | VBIReportDSLInput | - |
| `builderOptions?` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Tạo một DSL report rỗng.

**Định nghĩa**:

```typescript
createEmpty(uuid?: string): VBIReportDSL
```

**Trả về**: `VBIReportDSL`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `uuid?` | string | - |

### createEmptyPage

Tạo một DSL report page rỗng.

**Định nghĩa**:

```typescript
createEmptyPage(pageId?: string): VBIReportPageDSL
```

**Trả về**: `VBIReportPageDSL`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `pageId?` | string | - |
