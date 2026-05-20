# DashboardInsightBuilder

## メソッド

### constructor

**定義**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardInsightBuilderOptions)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardInsightBuilderOptions | - |

### getId

**定義**:

```typescript
getId(): string
```

**戻り値**: `string`

### getBuilder

**定義**:

```typescript
getBuilder(): VBIInsightBuilder | undefined
```

**戻り値**: `VBIInsightBuilder \| undefined`

### setTitle

**定義**:

```typescript
setTitle(title: string): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**定義**:

```typescript
setDescription(description: string): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `description` | string | - |

### setInsightId

**定義**:

```typescript
setInsightId(insight: ResourceReference): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### setLayouts

**定義**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**定義**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**戻り値**: `DashboardWidgetLayouts`

### toJSON

**定義**:

```typescript
toJSON(): VBIDashboardWidget
```

**戻り値**: `VBIDashboardWidget`
