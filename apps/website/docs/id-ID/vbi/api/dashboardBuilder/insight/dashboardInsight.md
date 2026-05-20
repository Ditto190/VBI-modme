# DashboardInsightBuilder

## Metode

### constructor

**Definisi**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardInsightBuilderOptions)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardInsightBuilderOptions | - |

### getId

**Definisi**:

```typescript
getId(): string
```

**Mengembalikan**: `string`

### getBuilder

**Definisi**:

```typescript
getBuilder(): VBIInsightBuilder | undefined
```

**Mengembalikan**: `VBIInsightBuilder \| undefined`

### setTitle

**Definisi**:

```typescript
setTitle(title: string): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Definisi**:

```typescript
setDescription(description: string): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `description` | string | - |

### setInsightId

**Definisi**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### setLayouts

**Definisi**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Definisi**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Mengembalikan**: `DashboardWidgetLayouts`

### toJSON

**Definisi**:

```typescript
toJSON(): VBIDashboardWidget
```

**Mengembalikan**: `VBIDashboardWidget`
