# LocaleBuilder

Locale-Builder zum Setzen und Abrufen der aktuellen Locale

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

Locale-Änderungen beobachten und eine Funktion zum Abbestellen zurückgeben

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback-Funktion |

### setLocale

Locale setzen

**Definition**:

```typescript
setLocale(locale: string)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `locale` | string | - Locale-Name |

### getLocale

Aktuelle Locale abrufen

**Definition**:

```typescript
getLocale(): string
```

**Rückgabe**: `string`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): string
```

**Rückgabe**: `string`
