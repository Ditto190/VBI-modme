# VBI.report

Namespace report pada instans VBI, bertanggung jawab membuat Report Builder, report kosong, dan halaman kosong.

## Metode

### create

Membuat VBIReportBuilder dari DSL report.

**Definisi**:

```typescript
create(report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Mengembalikan**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `report` | VBIReportDSLInput | - |
| `builderOptions?` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Membuat DSL report kosong.

**Definisi**:

```typescript
createEmpty(uuid?: string): VBIReportDSL
```

**Mengembalikan**: `VBIReportDSL`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `uuid?` | string | - |

### createEmptyPage

Membuat DSL report page kosong.

**Definisi**:

```typescript
createEmptyPage(pageId?: string): VBIReportPageDSL
```

**Mengembalikan**: `VBIReportPageDSL`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `pageId?` | string | - |
