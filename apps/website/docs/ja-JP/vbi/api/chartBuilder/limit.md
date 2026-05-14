# LimitBuilder

データ量制限ビルダー。現在の limit の設定と取得に使います

## プロパティ

## メソッド

### constructor

コンストラクタ

**定義**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

limit の変更を監視し、監視解除関数を返す

**定義**:

```typescript
observe(callback: ObserveCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - コールバック関数 |

### setLimit

limit を設定

**定義**:

```typescript
setLimit(limit: number)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `limit` | number | - データ量制限 |

### getLimit

現在の limit を取得

**定義**:

```typescript
getLimit(): number | undefined
```

**戻り値**: `number \| undefined`

### toJSON

JSON としてエクスポート

**定義**:

```typescript
toJSON(): number | undefined
```

**戻り値**: `number \| undefined`