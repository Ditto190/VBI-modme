# VBI.chart

L'espace de noms des graphiques sur une instance VBI, chargé de créer des Builders de graphique et des DSL de graphique vides.

## Méthodes

### create

Crée un VBIChartBuilder à partir d'un DSL de graphique.

**Définition**:

```typescript
create(vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIChartBuilder<TQueryDSL, TSeedDSL>
```

**Retour**: `VBIChartBuilder<TQueryDSL, TSeedDSL>`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `vbi` | VBIChartDSLInput | - |
| `builderOptions?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Crée un DSL de graphique minimal utilisable.

**Définition**:

```typescript
createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIChartDSL
```

**Retour**: `VBIChartDSL`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `connectorId` | VBIConnectorId | - |
| `uuid?` | string | - |
