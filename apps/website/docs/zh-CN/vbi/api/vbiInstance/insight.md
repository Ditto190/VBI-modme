# VBI.insight

VBI 实例上的 insight 命名空间，负责创建 Insight Builder 和空 insight DSL。

## 方法

### create

使用 insight DSL 创建 VBIInsightBuilder。

**定义**:

```typescript
create(insight: VBIInsightDSLInput): VBIInsightBuilder
```

**返回**: `VBIInsightBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### createEmpty

创建一个空 insight DSL。

**定义**:

```typescript
createEmpty(uuid?: string): VBIInsightDSL
```

**返回**: `VBIInsightDSL`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uuid?` | string | - |