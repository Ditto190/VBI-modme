# VBI.resources.chart

VBI インスタンス上のチャートリソース名前空間です。

## メソッド

### register

単一のチャートリソースを登録します。

**定義**:

```typescript
register(chart: VBIChartDSLInput): VBIChartDSL
```

**戻り値**: `VBIChartDSL`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `chart` | VBIChartDSLInput | - |

### get

登録済みのチャートリソース DSL を取得します。

**定義**:

```typescript
get(uuid: string): VBIChartDSL | undefined
```

**戻り値**: `VBIChartDSL \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `uuid` | string | - |

### list

登録済みのすべてのチャートリソース DSL を取得します。

**定義**:

```typescript
list(): VBIChartDSL[]
```

**戻り値**: `VBIChartDSL[]`

### has

指定したチャートリソースが登録済みかどうかを判定します。

**定義**:

```typescript
has(uuid: string): boolean
```

**戻り値**: `boolean`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `uuid` | string | - |

### unregister

指定したチャートリソースの登録を解除します。

**定義**:

```typescript
unregister(uuid: string): boolean
```

**戻り値**: `boolean`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `uuid` | string | - |
