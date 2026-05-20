# VBI.insight

VBI インスタンス上の insight 名前空間です。Insight Builder と空の insight DSL の作成を担当します。

## メソッド

### create

insight DSL から VBIInsightBuilder を作成します。

**定義**:

```typescript
create(insight: VBIInsightDSLInput): VBIInsightBuilder
```

**戻り値**: `VBIInsightBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### createEmpty

空の insight DSL を作成します。

**定義**:

```typescript
createEmpty(uuid?: string): VBIInsightDSL
```

**戻り値**: `VBIInsightDSL`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `uuid?` | string | - |
