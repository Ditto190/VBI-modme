# VBIInsightBuilder

## Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, dsl?: Y.Map<any>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl?` | Y.Map<any> | - |

### applyUpdate

**Định nghĩa**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): any
```

**Trả về**: `any`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**Định nghĩa**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): any
```

**Trả về**: `any`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### getUUID

**Định nghĩa**:

```typescript
getUUID(): string
```

**Trả về**: `string`

### setContent

**Định nghĩa**:

```typescript
setContent(content: string): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `content` | string | - |

### build

**Định nghĩa**:

```typescript
build(): VBIInsightDSL
```

**Trả về**: `VBIInsightDSL`

### isEmpty

**Định nghĩa**:

```typescript
isEmpty(): boolean
```

**Trả về**: `boolean`
