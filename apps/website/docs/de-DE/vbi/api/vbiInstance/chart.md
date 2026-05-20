# VBI.chart

Der Chart-Namespace auf einer VBI-Instanz, zuständig für das Erstellen von Chart-Buildern und leeren Chart-DSLs.

## Methoden

### create

Erstellt einen VBIChartBuilder aus einer Chart-DSL.

**Definition**:

```typescript
create(vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIChartBuilder<TQueryDSL, TSeedDSL>
```

**Rückgabe**: `VBIChartBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `vbi` | VBIChartDSLInput | - |
| `builderOptions?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Erstellt eine minimal nutzbare Chart-DSL.

**Definition**:

```typescript
createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIChartDSL
```

**Rückgabe**: `VBIChartDSL`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `connectorId` | VBIConnectorId | - |
| `uuid?` | string | - |
