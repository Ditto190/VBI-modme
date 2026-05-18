# VBIInsightBuilder

## Propriétés

| Propriété | Type | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## Méthodes

### constructor

**Définition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### applyUpdate

**Définition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Retour**: `any`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Définition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Retour**: `any`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `targetStateVector` | Uint8Array | - |

### getUUID

**Définition**:

```typescript
getUUID(): string
```

**Retour**: `string`

### setContent

**Définition**:

```typescript
setContent(content: string): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `content` | string | - |

### build

**Définition**:

```typescript
build(): VBIInsightDSL
```

**Retour**: `VBIInsightDSL`

### isEmpty

**Définition**:

```typescript
isEmpty(): boolean
```

**Retour**: `boolean`
