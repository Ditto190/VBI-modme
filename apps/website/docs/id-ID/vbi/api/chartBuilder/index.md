# VBIChartBuilder

## Properti

| Properti | Tipe | Deskripsi |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **adapters** | `VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>` | - |
| **chartType** | `ChartTypeBuilder` | - |
| **measures** | `MeasuresBuilder` | - |
| **dimensions** | `DimensionsBuilder` | - |
| **havingFilter** | `HavingFilterBuilder` | - |
| **whereFilter** | `WhereFilterBuilder` | - |
| **theme** | `ThemeBuilder` | - |
| **locale** | `LocaleBuilder` | - |
| **limit** | `LimitBuilder` | - |
| **undoManager** | `UndoManager` | - |


## Metode

### constructor

**Definisi**:

```typescript
constructor(doc: Y.Doc, options?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl?: Y.Map<any>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `options?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |
| `dsl?` | Y.Map<any> | - |

### applyUpdate

**Definisi**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): void
```

**Mengembalikan**: `void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**Definisi**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): Uint8Array<ArrayBufferLike>
```

**Mengembalikan**: `Uint8Array<ArrayBufferLike>`

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

### buildVSeed

**Definisi**:

```typescript
buildVSeed(options?: BuildVSeedOptions): Promise<TSeedDSL>
```

**Mengembalikan**: `Promise<TSeedDSL>`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `options?` = {} | BuildVSeedOptions | - |

### buildVQuery

**Definisi**:

```typescript
buildVQuery(): TQueryDSL
```

**Mengembalikan**: `TQueryDSL`

### build

**Definisi**:

```typescript
build(): VBIChartDSL
```

**Mengembalikan**: `VBIChartDSL`

### isEmpty

**Definisi**:

```typescript
isEmpty(): boolean
```

**Mengembalikan**: `boolean`

### getSchema

**Definisi**:

```typescript
getSchema(): Promise<any>
```

**Mengembalikan**: `Promise<any>`
