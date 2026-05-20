# VBI.report

L'espace de noms report sur une instance VBI, chargé de créer des Report Builders, des reports vides et des pages vides.

## Méthodes

### create

Crée un VBIReportBuilder à partir d'un DSL report.

**Définition**:

```typescript
create(report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `report` | VBIReportDSLInput | - |
| `builderOptions?` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Crée un DSL report vide.

**Définition**:

```typescript
createEmpty(uuid?: string): VBIReportDSL
```

**Retour**: `VBIReportDSL`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `uuid?` | string | - |

### createEmptyPage

Crée un DSL report page vide.

**Définition**:

```typescript
createEmptyPage(pageId?: string): VBIReportPageDSL
```

**Retour**: `VBIReportPageDSL`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `pageId?` | string | - |
