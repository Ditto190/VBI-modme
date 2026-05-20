# VBIReportBuilder

## Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, dependencies?: VBIReportBuilderDependencies<TQueryDSL, TSeedDSL>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dependencies?` = {} | VBIReportBuilderDependencies<TQueryDSL, TSeedDSL> | - |

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

### getChartBuilder

**Định nghĩa**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Trả về**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Định nghĩa**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Trả về**: `VBIInsightBuilder \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Định nghĩa**:

```typescript
build(): VBIReportDSL
```

**Trả về**: `VBIReportDSL`

### snapshot

**Định nghĩa**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**Trả về**: `VBIReportSnapshotDSL`

### isEmpty

**Định nghĩa**:

```typescript
isEmpty(): boolean
```

**Trả về**: `boolean`
