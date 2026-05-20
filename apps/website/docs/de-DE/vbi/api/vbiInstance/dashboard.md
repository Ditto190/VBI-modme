# VBI.dashboard

Der Dashboard-Namespace auf einer VBI-Instanz, zuständig für das Erstellen von Dashboard-Buildern und leeren dashboard-DSLs.

## Methoden

### create

Erstellt einen VBIDashboardBuilder aus einer dashboard-DSL.

**Definition**:

```typescript
create(dashboard: VBIDashboardDSLInput, builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>): VBIDashboardBuilder<TQueryDSL, TSeedDSL>
```

**Rückgabe**: `VBIDashboardBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `dashboard` | VBIDashboardDSLInput | - |
| `builderOptions?` | VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Erstellt eine leere dashboard-DSL.

**Definition**:

```typescript
createEmpty(uuid?: string): VBIDashboardDSL
```

**Rückgabe**: `VBIDashboardDSL`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `uuid?` | string | - |
