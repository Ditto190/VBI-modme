# VBI.resources.chart

VBI 实例上的图表资源命名空间。

## 方法

### register

注册单个图表资源。

**定义**:

```typescript
register(chart: VBIChartDSLInput): VBIChartDSL
```

**返回**: `VBIChartDSL`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `chart` | VBIChartDSLInput | - |

### get

获取已注册的图表资源 DSL。

**定义**:

```typescript
get(uuid: string): VBIChartDSL | undefined
```

**返回**: `VBIChartDSL \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uuid` | string | - |

### list

获取所有已注册的图表资源 DSL。

**定义**:

```typescript
list(): VBIChartDSL[]
```

**返回**: `VBIChartDSL[]`

### has

判断指定图表资源是否已注册。

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

注销指定图表资源。

**定义**:

```typescript
unregister(uuid: string): boolean
```

**返回**: `boolean`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uuid` | string | - |