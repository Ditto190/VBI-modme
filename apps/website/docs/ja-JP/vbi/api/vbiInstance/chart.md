# VBI.chart

VBI インスタンス上のチャート名前空間です。チャート Builder と空のチャート DSL の作成を担当します。

## メソッド

### create

チャート DSL から VBIChartBuilder を作成します。

**定義**:

```typescript
create(vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIChartBuilder<TQueryDSL, TSeedDSL>
```

**戻り値**: `VBIChartBuilder<TQueryDSL, TSeedDSL>`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `vbi` | VBIChartDSLInput | - |
| `builderOptions?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

最小限利用可能なチャート DSL を作成します。

**定義**:

```typescript
createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIChartDSL
```

**戻り値**: `VBIChartDSL`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `connectorId` | VBIConnectorId | - |
| `uuid?` | string | - |
