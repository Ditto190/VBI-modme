# VBI.dashboard

Namespace dashboard pada instans VBI, bertanggung jawab membuat Dashboard Builder dan DSL dashboard kosong.

## Metode

### create

Membuat VBIDashboardBuilder dari DSL dashboard.

**Definisi**:

```typescript
create(dashboard: VBIDashboardDSLInput, builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>): VBIDashboardBuilder<TQueryDSL, TSeedDSL>
```

**Mengembalikan**: `VBIDashboardBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `dashboard` | VBIDashboardDSLInput | - |
| `builderOptions?` | VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Membuat DSL dashboard kosong.

**Definisi**:

```typescript
createEmpty(uuid?: string): VBIDashboardDSL
```

**Mengembalikan**: `VBIDashboardDSL`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `uuid?` | string | - |
