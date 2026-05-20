# VBI.resources.insight

VBI 实例上的 insight 资源命名空间。

## 方法

### register

注册单个 insight 资源。

**定义**:

```typescript
register(insight: VBIInsightDSLInput): VBIInsightDSL
```

**返回**: `VBIInsightDSL`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### get

获取已注册的 insight 资源 DSL。

**定义**:

```typescript
get(uuid: string): VBIInsightDSL | undefined
```

**返回**: `VBIInsightDSL \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uuid` | string | - |

### list

获取所有已注册的 insight 资源 DSL。

**定义**:

```typescript
list(): VBIInsightDSL[]
```

**返回**: `VBIInsightDSL[]`

### has

判断指定 insight 资源是否已注册。

**定义**:

```typescript
has(uuid: string): boolean
```

**返回**: `boolean`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uuid` | string | - |

### unregister

注销指定 insight 资源。

**定义**:

```typescript
unregister(uuid: string): boolean
```

**返回**: `boolean`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uuid` | string | - |