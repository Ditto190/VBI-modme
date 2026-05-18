# WhereFilterBuilder

Where-Filter-Builder zum Hinzufügen, Ändern und Entfernen von Filterbedingungen auf Zeilenebene. Where-Filter wirken vor der Datenabfrage und filtern Rohdaten

## Eigenschaften

## Methoden

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Rückgabe**: `Y.Array<any>`

### add

Eine Where-Filterbedingung hinzufügen

**Definition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Callback-Funktion |

### addGroup

Eine Where-Gruppe hinzufügen

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logischer Operator |
| `callback` | (group: WhereGroupBuilder) => void | - Callback-Funktion |

### update

Filterbedingung mit angegebener ID aktualisieren

**Definition**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Filterbedingungs-ID |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Callback-Funktion |

### updateGroup

Gruppe mit angegebener ID aktualisieren

**Definition**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Gruppen-ID |
| `callback` | (group: WhereGroupBuilder) => void | - Callback-Funktion |

### remove

Bedingung mit angegebener ID oder Element an angegebenem Index entfernen

**Definition**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID oder Index |

### find

Erste Bedingung (Filter oder Gruppe) nach Callback-Bedingung finden, Verhalten wie Array.find

**Definition**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Rückgabe**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Suchbedingung |

### clear

Alle Where-Filterbedingungen leeren

**Definition**:

```typescript
clear()
```

### toJSON

Vollständige Where-Filterkonfiguration exportieren

**Definition**:

```typescript
toJSON(): VBIWhereGroup
```

**Rückgabe**: `VBIWhereGroup`

### observe

Filterbedingungsänderungen beobachten und eine Funktion zum Abbestellen zurückgeben

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Callback-Funktion |

### static isGroup

Prüfen, ob der Knoten ein Gruppenknoten ist

**Definition**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Rückgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### static isNode

Prüfen, ob der Knoten ein Blattknoten ist

**Definition**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Rückgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |
