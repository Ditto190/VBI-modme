# ReportPageCollectionBuilder

## Méthodes

### constructor

**Définition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

**Définition**:

```typescript
add(title: string, callback?: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `title` | string | - |
| `callback?` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**Définition**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `pageId` | string | - |

### update

**Définition**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void | - |

### get

**Définition**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `pageId` | string | - |
