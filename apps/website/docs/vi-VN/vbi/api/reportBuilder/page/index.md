# ReportPageCollectionBuilder

## Thuộc tính

## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

**Định nghĩa**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Trả về**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `title` | string | - |
| `callback` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**Định nghĩa**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Trả về**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `pageId` | string | - |

### update

**Định nghĩa**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Trả về**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### get

**Định nghĩa**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Trả về**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `pageId` | string | - |
