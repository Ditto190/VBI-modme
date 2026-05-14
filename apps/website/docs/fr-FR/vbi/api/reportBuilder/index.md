# VBIReportBuilder

## Proprietes

| Propriete | Type | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## Methodes

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `options` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |
| `resourceRegistry` | VBIResourceRegistry<TQueryDSL, TSeedDSL> | - |

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

### getChartBuilder

**Definition**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Definition**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Retour**: `VBIInsightBuilder \| undefined`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Definition**:

```typescript
build(): VBIReportDSL
```

**Retour**: `VBIReportDSL`

### snapshot

**Definition**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**Retour**: `VBIReportSnapshotDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Retour**: `boolean`