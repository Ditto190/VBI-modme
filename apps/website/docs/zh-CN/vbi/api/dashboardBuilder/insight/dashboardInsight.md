# DashboardInsightBuilder

## 方法

### constructor

**定义**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardInsightBuilderOptions)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardInsightBuilderOptions | - |

### getId

**定义**:

```typescript
getId(): string
```

**返回**: `string`

### getBuilder

**定义**:

```typescript
getBuilder(): VBIInsightBuilder | undefined
```

**返回**: `VBIInsightBuilder \| undefined`

### setTitle

**定义**:

```typescript
setTitle(title: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**定义**:

```typescript
setDescription(description: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `description` | string | - |

### setInsightId

**定义**:

```typescript
setInsightId(insight: ResourceReference): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### setLayouts

**定义**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**定义**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**返回**: `DashboardWidgetLayouts`

### toJSON

**定义**:

```typescript
toJSON(): VBIDashboardWidget
```

**返回**: `VBIDashboardWidget`