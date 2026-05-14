# VBIReportBuilder

## Thuoc tinh

| Thuoc tinh | Kieu | Mo ta |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## Phuong thuc

### constructor

**Dinh nghia**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `options` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |
| `resourceRegistry` | VBIResourceRegistry<TQueryDSL, TSeedDSL> | - |

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

### getChartBuilder

**Dinh nghia**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Tra ve**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Dinh nghia**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Tra ve**: `VBIInsightBuilder \| undefined`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Dinh nghia**:

```typescript
build(): VBIReportDSL
```

**Tra ve**: `VBIReportDSL`

### snapshot

**Dinh nghia**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**Tra ve**: `VBIReportSnapshotDSL`

### isEmpty

**Dinh nghia**:

```typescript
isEmpty(): boolean
```

**Tra ve**: `boolean`