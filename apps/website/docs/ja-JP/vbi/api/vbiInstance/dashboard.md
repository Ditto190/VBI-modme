# VBI.dashboard

VBI インスタンス上のダッシュボード名前空間です。Dashboard Builder と空の dashboard DSL の作成を担当します。

## メソッド

### create

dashboard DSL から VBIDashboardBuilder を作成します。

**定義**:

```typescript
create(dashboard: VBIDashboardDSLInput, builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>): VBIDashboardBuilder<TQueryDSL, TSeedDSL>
```

**戻り値**: `VBIDashboardBuilder<TQueryDSL, TSeedDSL>`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `dashboard` | VBIDashboardDSLInput | - |
| `builderOptions?` | VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

空の dashboard DSL を作成します。

**定義**:

```typescript
createEmpty(uuid?: string): VBIDashboardDSL
```

**戻り値**: `VBIDashboardDSL`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `uuid?` | string | - |
