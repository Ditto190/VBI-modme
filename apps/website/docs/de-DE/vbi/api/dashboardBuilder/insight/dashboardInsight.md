# DashboardInsightBuilder

## Methoden

### constructor

**Definition**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardInsightBuilderOptions)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardInsightBuilderOptions | - |

### getId

**Definition**:

```typescript
getId(): string
```

**Rückgabe**: `string`

### getBuilder

**Definition**:

```typescript
getBuilder(): VBIInsightBuilder | undefined
```

**Rückgabe**: `VBIInsightBuilder \| undefined`

### setTitle

**Definition**:

```typescript
setTitle(title: string): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Definition**:

```typescript
setDescription(description: string): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `description` | string | - |

### setInsightId

**Definition**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### setLayouts

**Definition**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Definition**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Rückgabe**: `DashboardWidgetLayouts`

### toJSON

**Definition**:

```typescript
toJSON(): VBIDashboardWidget
```

**Rückgabe**: `VBIDashboardWidget`
