# ThemeBuilder

テーマビルダー。現在のテーマの設定と取得に使います

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

テーマ変更を監視し、監視解除関数を返す

**定義**:

```typescript
observe(callback: ObserveCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - コールバック関数 |

### setTheme

テーマを設定

**定義**:

```typescript
setTheme(theme: string)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `theme` | string | - テーマ名 |

### getTheme

現在のテーマを取得

**定義**:

```typescript
getTheme(): string
```

**戻り値**: `string`

### toJSON

JSON としてエクスポート

**定義**:

```typescript
toJSON(): string
```

**戻り値**: `string`