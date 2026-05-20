# DashboardInsightBuilder

## Methods

### constructor

**Definition**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardInsightBuilderOptions)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardInsightBuilderOptions | - |

### getId

**Definition**:

```typescript
getId(): string
```

**Returns**: `string`

### getBuilder

**Definition**:

```typescript
getBuilder(): VBIInsightBuilder | undefined
```

**Returns**: `VBIInsightBuilder \| undefined`

### setTitle

**Definition**:

```typescript
setTitle(title: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Definition**:

```typescript
setDescription(description: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `description` | string | - |

### setInsightId

**Definition**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### setLayouts

**Definition**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Definition**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Returns**: `DashboardWidgetLayouts`

### toJSON

**Definition**:

```typescript
toJSON(): VBIDashboardWidget
```

**Returns**: `VBIDashboardWidget`
