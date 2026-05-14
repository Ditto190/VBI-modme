# VBIInsightBuilder

## Thuoc tinh

| Thuoc tinh | Kieu | Mo ta |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## Phuong thuc

### constructor

**Dinh nghia**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### applyUpdate

**Dinh nghia**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Tra ve**: `any`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Dinh nghia**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Tra ve**: `any`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `targetStateVector` | Uint8Array | - |

### getUUID

**Dinh nghia**:

```typescript
getUUID(): string
```

**Tra ve**: `string`

### setContent

**Dinh nghia**:

```typescript
setContent(content: string): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `content` | string | - |

### build

**Dinh nghia**:

```typescript
build(): VBIInsightDSL
```

**Tra ve**: `VBIInsightDSL`

### isEmpty

**Dinh nghia**:

```typescript
isEmpty(): boolean
```

**Tra ve**: `boolean`