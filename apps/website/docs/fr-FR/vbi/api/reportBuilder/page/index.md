# ReportPageCollectionBuilder

## Proprietes

## Methodes

### constructor

**Definition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

**Definition**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `title` | string | - |
| `callback` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**Definition**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `pageId` | string | - |

### update

**Definition**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### get

**Definition**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `pageId` | string | - |