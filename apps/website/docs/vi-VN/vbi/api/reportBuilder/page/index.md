# ReportPageCollectionBuilder

## Thuoc tinh

## Phuong thuc

### constructor

**Dinh nghia**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

**Dinh nghia**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Tra ve**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `title` | string | - |
| `callback` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**Dinh nghia**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Tra ve**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `pageId` | string | - |

### update

**Dinh nghia**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Tra ve**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### get

**Dinh nghia**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Tra ve**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `pageId` | string | - |