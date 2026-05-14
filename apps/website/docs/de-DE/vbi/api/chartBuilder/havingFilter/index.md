# HavingFilterBuilder

Having-Filter-Builder zum Hinzufuegen, Aendern und Entfernen von Filterbedingungen nach der Gruppierung. Having-Filter wirken nach der Datenaggregation und filtern Gruppenergebnisse

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

**Rueckgabe**: `Y.Array<any>`

### add

Eine Having-Filterbedingung hinzufuegen

**Definition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Rueckgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Callback-Funktion |

### addGroup

Eine Having-Gruppe hinzufuegen

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Rueckgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logischer Operator |
| `callback` | (group: HavingGroupBuilder) => void | - Callback-Funktion |

### update

Filterbedingung mit angegebener ID aktualisieren

**Definition**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Rueckgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Filterbedingungs-ID |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Callback-Funktion |

### updateGroup

Gruppe mit angegebener ID aktualisieren

**Definition**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Rueckgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Gruppen-ID |
| `callback` | (group: HavingGroupBuilder) => void | - Callback-Funktion |

### remove

Bedingung mit angegebener ID oder Element an angegebenem Index entfernen

**Definition**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Rueckgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID oder Index |

### find

Erste Bedingung (Filter oder Gruppe) nach Callback-Bedingung finden, Verhalten wie Array.find

**Definition**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Rueckgabe**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Suchbedingung |

### clear

Alle Having-Filterbedingungen leeren

**Definition**:

```typescript
clear()
```

### toJSON

Vollstaendige Having-Filterkonfiguration exportieren

**Definition**:

```typescript
toJSON(): VBIHavingGroup
```

**Rueckgabe**: `VBIHavingGroup`

### observe

Filterbedingungsaenderungen beobachten und eine Funktion zum Abbestellen zurueckgeben

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Rueckgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Callback-Funktion |

### static isGroup

Pruefen, ob der Knoten ein Gruppenknoten ist

**Definition**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Rueckgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### static isNode

Pruefen, ob der Knoten ein Blattknoten ist

**Definition**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Rueckgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |