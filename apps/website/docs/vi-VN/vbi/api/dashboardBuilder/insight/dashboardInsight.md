# DashboardInsightBuilder

## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardInsightBuilderOptions)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardInsightBuilderOptions | - |

### getId

**Định nghĩa**:

```typescript
getId(): string
```

**Trả về**: `string`

### getBuilder

**Định nghĩa**:

```typescript
getBuilder(): VBIInsightBuilder | undefined
```

**Trả về**: `VBIInsightBuilder \| undefined`

### setTitle

**Định nghĩa**:

```typescript
setTitle(title: string): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Định nghĩa**:

```typescript
setDescription(description: string): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `description` | string | - |

### setInsightId

**Định nghĩa**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### setLayouts

**Định nghĩa**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Định nghĩa**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Trả về**: `DashboardWidgetLayouts`

### toJSON

**Định nghĩa**:

```typescript
toJSON(): VBIDashboardWidget
```

**Trả về**: `VBIDashboardWidget`
