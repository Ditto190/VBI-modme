# VBI.resources.chart

Der Namespace für Chart-Ressourcen auf einer VBI-Instanz.

## Methoden

### register

Registriert eine einzelne Chart-Ressource.

**Definition**:

```typescript
register(chart: VBIChartDSLInput): VBIChartDSL
```

**Rückgabe**: `VBIChartDSL`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `chart` | VBIChartDSLInput | - |

### get

Ruft die registrierte DSL einer Chart-Ressource ab.

**Definition**:

```typescript
get(uuid: string): VBIChartDSL | undefined
```

**Rückgabe**: `VBIChartDSL \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `uuid` | string | - |

### list

Ruft alle registrierten Chart-Ressourcen-DSLs ab.

**Definition**:

```typescript
list(): VBIChartDSL[]
```

**Rückgabe**: `VBIChartDSL[]`

### has

Prüft, ob die angegebene Chart-Ressource registriert wurde.

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

Hebt die Registrierung der angegebenen Chart-Ressource auf.

**Definition**:

```typescript
unregister(uuid: string): boolean
```

**Rückgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `uuid` | string | - |
