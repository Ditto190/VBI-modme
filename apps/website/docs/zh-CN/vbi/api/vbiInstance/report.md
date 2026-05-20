# VBI.report

VBI 实例上的报表命名空间，负责创建 Report Builder、空报表和空页面。

## 方法

### create

使用 report DSL 创建 VBIReportBuilder。

**定义**:

```typescript
create(report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**返回**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `report` | VBIReportDSLInput | - |
| `builderOptions?` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

创建一个空 report DSL。

**定义**:

```typescript
createEmpty(uuid?: string): VBIReportDSL
```

**返回**: `VBIReportDSL`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uuid?` | string | - |

### createEmptyPage

创建一个空 report page DSL。

**定义**:

```typescript
createEmptyPage(pageId?: string): VBIReportPageDSL
```

**返回**: `VBIReportPageDSL`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pageId?` | string | - |