# ReportPageCollectionBuilder

## Properti

## Metode

### constructor

**Definisi**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

**Definisi**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Mengembalikan**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `title` | string | - |
| `callback` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**Definisi**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Mengembalikan**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `pageId` | string | - |

### update

**Definisi**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Mengembalikan**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### get

**Definisi**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Mengembalikan**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `pageId` | string | - |