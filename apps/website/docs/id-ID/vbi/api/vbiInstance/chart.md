# VBI.chart

Namespace chart pada instans VBI, bertanggung jawab membuat chart Builder dan DSL chart kosong.

## Metode

### create

Membuat VBIChartBuilder dari DSL chart.

**Definisi**:

```typescript
create(vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIChartBuilder<TQueryDSL, TSeedDSL>
```

**Mengembalikan**: `VBIChartBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `vbi` | VBIChartDSLInput | - |
| `builderOptions?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Membuat DSL chart minimal yang dapat digunakan.

**Definisi**:

```typescript
createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIChartDSL
```

**Mengembalikan**: `VBIChartDSL`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `connectorId` | VBIConnectorId | - |
| `uuid?` | string | - |
