# VBIInsightBuilder

## Eigenschaften

| Eigenschaft | Typ | Beschreibung |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## Methoden

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Rueckgabe**: `any`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Rueckgabe**: `any`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `targetStateVector` | Uint8Array | - |

### getUUID

**Definition**:

```typescript
getUUID(): string
```

**Rueckgabe**: `string`

### setContent

**Definition**:

```typescript
setContent(content: string): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `content` | string | - |

### build

**Definition**:

```typescript
build(): VBIInsightDSL
```

**Rueckgabe**: `VBIInsightDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Rueckgabe**: `boolean`