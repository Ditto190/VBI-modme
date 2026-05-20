# VBI.dashboard

L'espace de noms des dashboards sur une instance VBI, chargé de créer des Dashboard Builders et des DSL de dashboard vides.

## Méthodes

### create

Crée un VBIDashboardBuilder à partir d'un DSL de dashboard.

**Définition**:

```typescript
create(dashboard: VBIDashboardDSLInput, builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>): VBIDashboardBuilder<TQueryDSL, TSeedDSL>
```

**Retour**: `VBIDashboardBuilder<TQueryDSL, TSeedDSL>`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `dashboard` | VBIDashboardDSLInput | - |
| `builderOptions?` | VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Crée un DSL de dashboard vide.

**Définition**:

```typescript
createEmpty(uuid?: string): VBIDashboardDSL
```

**Retour**: `VBIDashboardDSL`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `uuid?` | string | - |
