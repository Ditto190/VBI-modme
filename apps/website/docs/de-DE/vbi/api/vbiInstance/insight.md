# VBI.insight

Der insight-Namespace auf einer VBI-Instanz, zuständig für das Erstellen von Insight-Buildern und leeren insight-DSLs.

## Methoden

### create

Erstellt einen VBIInsightBuilder aus einer insight-DSL.

**Definition**:

```typescript
create(insight: VBIInsightDSLInput): VBIInsightBuilder
```

**Rückgabe**: `VBIInsightBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### createEmpty

Erstellt eine leere insight-DSL.

**Definition**:

```typescript
createEmpty(uuid?: string): VBIInsightDSL
```

**Rückgabe**: `VBIInsightDSL`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `uuid?` | string | - |
