# VBIChartBuilder

## Proprietes

| Propriete | Type | Description |
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


## Methodes

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, options?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl?: Y.Map<any>)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `options?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |
| `dsl?` | Y.Map<any> | - |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): void
```

**Retour**: `void`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): Uint8Array<ArrayBufferLike>
```

**Retour**: `Uint8Array<ArrayBufferLike>`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### getUUID

**Definition**:

```typescript
getUUID(): string
```

**Retour**: `string`

### buildVSeed

**Definition**:

```typescript
buildVSeed(options?: BuildVSeedOptions): Promise<TSeedDSL>
```

**Retour**: `Promise<TSeedDSL>`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `options?` = {} | BuildVSeedOptions | - |

### buildVQuery

**Definition**:

```typescript
buildVQuery(): TQueryDSL
```

**Retour**: `TQueryDSL`

### build

**Definition**:

```typescript
build(): VBIChartDSL
```

**Retour**: `VBIChartDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Retour**: `boolean`

### getSchema

**Definition**:

```typescript
getSchema(): Promise<any>
```

**Retour**: `Promise<any>`
