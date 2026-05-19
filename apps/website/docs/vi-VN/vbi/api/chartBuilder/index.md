# VBIChartBuilder

## Thuoc tinh

| Thuoc tinh | Kieu | Mo ta |
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


## Phuong thuc

### constructor

**Dinh nghia**:

```typescript
constructor(doc: Y.Doc, options?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl?: Y.Map<any>)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `options?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |
| `dsl?` | Y.Map<any> | - |

### applyUpdate

**Dinh nghia**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): void
```

**Tra ve**: `void`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**Dinh nghia**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): Uint8Array<ArrayBufferLike>
```

**Tra ve**: `Uint8Array<ArrayBufferLike>`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### getUUID

**Dinh nghia**:

```typescript
getUUID(): string
```

**Tra ve**: `string`

### buildVSeed

**Dinh nghia**:

```typescript
buildVSeed(options?: BuildVSeedOptions): Promise<TSeedDSL>
```

**Tra ve**: `Promise<TSeedDSL>`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `options?` = {} | BuildVSeedOptions | - |

### buildVQuery

**Dinh nghia**:

```typescript
buildVQuery(): TQueryDSL
```

**Tra ve**: `TQueryDSL`

### build

**Dinh nghia**:

```typescript
build(): VBIChartDSL
```

**Tra ve**: `VBIChartDSL`

### isEmpty

**Dinh nghia**:

```typescript
isEmpty(): boolean
```

**Tra ve**: `boolean`

### getSchema

**Dinh nghia**:

```typescript
getSchema(): Promise<any>
```

**Tra ve**: `Promise<any>`
