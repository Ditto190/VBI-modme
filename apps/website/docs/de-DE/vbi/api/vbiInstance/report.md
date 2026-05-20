# VBI.report

Der Report-Namespace auf einer VBI-Instanz, zuständig für das Erstellen von Report-Buildern, leeren Reports und leeren Seiten.

## Methoden

### create

Erstellt einen VBIReportBuilder aus einer report-DSL.

**Definition**:

```typescript
create(report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Rückgabe**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `report` | VBIReportDSLInput | - |
| `builderOptions?` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Erstellt eine leere report-DSL.

**Definition**:

```typescript
createEmpty(uuid?: string): VBIReportDSL
```

**Rückgabe**: `VBIReportDSL`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `uuid?` | string | - |

### createEmptyPage

Erstellt eine leere report page-DSL.

**Definition**:

```typescript
createEmptyPage(pageId?: string): VBIReportPageDSL
```

**Rückgabe**: `VBIReportPageDSL`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `pageId?` | string | - |
