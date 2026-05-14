# LimitBuilder

Builder fuer Datenlimits zum Setzen und Abrufen des aktuellen limit

## Eigenschaften

## Methoden

### constructor

Konstruktor

**Definition**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

limit-Aenderungen beobachten und eine Funktion zum Abbestellen zurueckgeben

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rueckgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback-Funktion |

### setLimit

limit setzen

**Definition**:

```typescript
setLimit(limit: number)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `limit` | number | - Datenlimit |

### getLimit

Aktuelles limit abrufen

**Definition**:

```typescript
getLimit(): number | undefined
```

**Rueckgabe**: `number \| undefined`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): number | undefined
```

**Rueckgabe**: `number \| undefined`