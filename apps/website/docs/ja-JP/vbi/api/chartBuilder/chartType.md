# ChartTypeBuilder

チャートタイプビルダー。チャートタイプの切り替えと取得に使います。テーブル、棒グラフ、折れ線グラフ、円グラフ、散布図など複数のチャートタイプをサポートします

## メソッド

### constructor

コンストラクタ

**定義**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

チャートタイプの変更を監視

**定義**:

```typescript
observe(callback: ObserveCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - コールバック関数 |

### changeChartType

チャートタイプを設定

**定義**:

```typescript
changeChartType(chartType: string)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `chartType` | string | - チャートタイプ |

### getChartType

現在のチャートタイプを取得

**定義**:

```typescript
getChartType(): string
```

**戻り値**: `string`

### getSupportedDimensionEncodings

現在のチャートタイプがサポートするディメンションエンコーディングを取得

**定義**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

現在のチャートタイプに基づき、ディメンション順に推奨エンコーディングを返す

**定義**:

```typescript
getRecommendedDimensionEncodings(dimensionCount?: number)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `dimensionCount?` | number | - ディメンション数。デフォルトでは現在の DSL のディメンション数を使用 |

### getSupportedMeasureEncodings

現在のチャートタイプがサポートするメジャーエンコーディングを取得

**定義**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

現在のチャートタイプに基づき、メジャー順に推奨エンコーディングを返す

**定義**:

```typescript
getRecommendedMeasureEncodings(measureCount?: number)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `measureCount?` | number | - メジャー数。デフォルトでは現在の DSL のメジャー数を使用 |

### toJSON

JSON としてエクスポート

**定義**:

```typescript
toJSON(): string
```

**戻り値**: `string`

### getAvailableChartTypes

サポートされるすべてのチャートタイプを取得

**定義**:

```typescript
getAvailableChartTypes(): string[]
```

**戻り値**: `string[]`
