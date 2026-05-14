# MeasureNodeBuilder

単一メジャーを設定するメジャーノードビルダー

## プロパティ

## メソッド

### constructor

**定義**:

```typescript
constructor(yMap: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getId

ノード ID を取得

**定義**:

```typescript
getId(): string
```

**戻り値**: `string`

### getField

フィールド名を取得

**定義**:

```typescript
getField(): string
```

**戻り値**: `string`

### getEncoding

チャートエンコーディング位置を取得

**定義**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**戻り値**: `VBIMeasure['encoding'] \| undefined`

### getSort

ソート設定を取得

**定義**:

```typescript
getSort(): VBISort | undefined
```

**戻り値**: `VBISort \| undefined`

### setAlias

表示名を設定

**定義**:

```typescript
setAlias(alias: string): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `alias` | string | - 表示名 |

### setEncoding

チャートエンコーディング位置を設定

**定義**:

```typescript
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `encoding` | NonNullable<VBIMeasure['encoding']> | - メジャーエンコーディング位置 |

### setSort

ソート設定を設定

**定義**:

```typescript
setSort(sort: VBISort): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `sort` | VBISort | - ソート設定 |

### setAggregate

集計関数を設定

**定義**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `aggregate` | VBIMeasure['aggregate'] | - 集計設定 |

### setFormat

数値書式を設定

**定義**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `format` | VBIMeasureFormat | - 書式設定 |

### getFormat

数値書式を取得

**定義**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**戻り値**: `VBIMeasureFormat \| undefined`

### clearFormat

数値書式設定をクリア

**定義**:

```typescript
clearFormat(): this
```

**戻り値**: `this`

### clearSort

ソート設定をクリア

**定義**:

```typescript
clearSort(): this
```

**戻り値**: `this`

### toJSON

JSON としてエクスポート

**定義**:

```typescript
toJSON(): VBIMeasure
```

**戻り値**: `VBIMeasure`