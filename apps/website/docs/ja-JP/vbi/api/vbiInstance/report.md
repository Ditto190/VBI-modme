# VBI.report

VBI インスタンス上のレポート名前空間です。Report Builder、空のレポート、空のページの作成を担当します。

## メソッド

### create

report DSL から VBIReportBuilder を作成します。

**定義**:

```typescript
create(report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**戻り値**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `report` | VBIReportDSLInput | - |
| `builderOptions?` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

空の report DSL を作成します。

**定義**:

```typescript
createEmpty(uuid?: string): VBIReportDSL
```

**戻り値**: `VBIReportDSL`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `uuid?` | string | - |

### createEmptyPage

空の report page DSL を作成します。

**定義**:

```typescript
createEmptyPage(pageId?: string): VBIReportPageDSL
```

**戻り値**: `VBIReportPageDSL`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `pageId?` | string | - |
