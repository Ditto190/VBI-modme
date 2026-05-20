# VBI.insight

L'espace de noms insight sur une instance VBI, chargé de créer des Insight Builders et des DSL insight vides.

## Méthodes

### create

Crée un VBIInsightBuilder à partir d'un DSL insight.

**Définition**:

```typescript
create(insight: VBIInsightDSLInput): VBIInsightBuilder
```

**Retour**: `VBIInsightBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### createEmpty

Crée un DSL insight vide.

**Définition**:

```typescript
createEmpty(uuid?: string): VBIInsightDSL
```

**Retour**: `VBIInsightDSL`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `uuid?` | string | - |
