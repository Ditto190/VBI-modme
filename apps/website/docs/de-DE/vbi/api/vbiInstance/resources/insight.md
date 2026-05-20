# VBI.resources.insight

Der Namespace für insight-Ressourcen auf einer VBI-Instanz.

## Methoden

### register

Registriert eine einzelne insight-Ressource.

**Definition**:

```typescript
register(insight: VBIInsightDSLInput): VBIInsightDSL
```

**Rückgabe**: `VBIInsightDSL`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### get

Ruft die registrierte DSL einer insight-Ressource ab.

**Definition**:

```typescript
get(uuid: string): VBIInsightDSL | undefined
```

**Rückgabe**: `VBIInsightDSL \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `uuid` | string | - |

### list

Ruft alle registrierten insight-Ressourcen-DSLs ab.

**Definition**:

```typescript
list(): VBIInsightDSL[]
```

**Rückgabe**: `VBIInsightDSL[]`

### has

Prüft, ob die angegebene insight-Ressource registriert wurde.

**Definition**:

```typescript
has(uuid: string): boolean
```

**Rückgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `uuid` | string | - |

### unregister

Hebt die Registrierung der angegebenen insight-Ressource auf.

**Definition**:

```typescript
unregister(uuid: string): boolean
```

**Rückgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `uuid` | string | - |
