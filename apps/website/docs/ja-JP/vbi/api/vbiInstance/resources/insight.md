# VBI.resources.insight

VBI インスタンス上の insight リソース名前空間です。

## メソッド

### register

単一の insight リソースを登録します。

**定義**:

```typescript
register(insight: VBIInsightDSLInput): VBIInsightDSL
```

**戻り値**: `VBIInsightDSL`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### get

登録済みの insight リソース DSL を取得します。

**定義**:

```typescript
get(uuid: string): VBIInsightDSL | undefined
```

**戻り値**: `VBIInsightDSL \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `uuid` | string | - |

### list

登録済みのすべての insight リソース DSL を取得します。

**定義**:

```typescript
list(): VBIInsightDSL[]
```

**戻り値**: `VBIInsightDSL[]`

### has

指定した insight リソースが登録済みかどうかを判定します。

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

指定した insight リソースの登録を解除します。

**定義**:

```typescript
unregister(uuid: string): boolean
```

**戻り値**: `boolean`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `uuid` | string | - |
