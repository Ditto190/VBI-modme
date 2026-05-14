# VBIInsightBuilder

## Proprietes

| Propriete | Type | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## Methodes

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Retour**: `any`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Retour**: `any`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `targetStateVector` | Uint8Array | - |

### getUUID

**Definition**:

```typescript
getUUID(): string
```

**Retour**: `string`

### setContent

**Definition**:

```typescript
setContent(content: string): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `content` | string | - |

### build

**Definition**:

```typescript
build(): VBIInsightDSL
```

**Retour**: `VBIInsightDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Retour**: `boolean`