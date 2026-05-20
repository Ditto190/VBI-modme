# DashboardInsightBuilder

## Méthodes

### constructor

**Définition**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardInsightBuilderOptions)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardInsightBuilderOptions | - |

### getId

**Définition**:

```typescript
getId(): string
```

**Retour**: `string`

### getBuilder

**Définition**:

```typescript
getBuilder(): VBIInsightBuilder | undefined
```

**Retour**: `VBIInsightBuilder \| undefined`

### setTitle

**Définition**:

```typescript
setTitle(title: string): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Définition**:

```typescript
setDescription(description: string): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `description` | string | - |

### setInsightId

**Définition**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### setLayouts

**Définition**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Définition**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Retour**: `DashboardWidgetLayouts`

### toJSON

**Définition**:

```typescript
toJSON(): VBIDashboardWidget
```

**Retour**: `VBIDashboardWidget`
