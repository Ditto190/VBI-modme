# VBIInsightBuilder

## Properti

| Properti | Tipe | Deskripsi |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## Metode

### constructor

**Definisi**:

```typescript
constructor(doc: Y.Doc, dsl?: Y.Map<any>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl?` | Y.Map<any> | - |

### applyUpdate

**Definisi**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): any
```

**Mengembalikan**: `any`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**Definisi**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): any
```

**Mengembalikan**: `any`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### getUUID

**Definisi**:

```typescript
getUUID(): string
```

**Mengembalikan**: `string`

### setContent

**Definisi**:

```typescript
setContent(content: string): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `content` | string | - |

### build

**Definisi**:

```typescript
build(): VBIInsightDSL
```

**Mengembalikan**: `VBIInsightDSL`

### isEmpty

**Definisi**:

```typescript
isEmpty(): boolean
```

**Mengembalikan**: `boolean`
