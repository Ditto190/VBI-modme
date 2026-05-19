# LocaleBuilder

ロケールビルダー。現在のロケールの設定と取得に使います

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

ロケール変更を監視し、監視解除関数を返す

**定義**:

```typescript
observe(callback: ObserveCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - コールバック関数 |

### setLocale

ロケールを設定

**定義**:

```typescript
setLocale(locale: string)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `locale` | string | - ロケール名 |

### getLocale

現在のロケールを取得

**定義**:

```typescript
getLocale(): string
```

**戻り値**: `string`

### toJSON

JSON としてエクスポート

**定義**:

```typescript
toJSON(): string
```

**戻り値**: `string`
