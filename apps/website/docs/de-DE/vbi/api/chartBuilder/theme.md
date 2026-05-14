# ThemeBuilder

Theme-Builder zum Setzen und Abrufen des aktuellen Themes

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

Theme-Aenderungen beobachten und eine Funktion zum Abbestellen zurueckgeben

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rueckgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback-Funktion |

### setTheme

Theme setzen

**Definition**:

```typescript
setTheme(theme: string)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `theme` | string | - Theme-Name |

### getTheme

Aktuelles Theme abrufen

**Definition**:

```typescript
getTheme(): string
```

**Rueckgabe**: `string`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): string
```

**Rueckgabe**: `string`