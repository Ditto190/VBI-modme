# UndoManager

Gestionnaire annuler/retablir fournissant des fonctions basees sur YJS, avec gestion des piles et effacement de l historique

## Proprietes

## Methodes

### constructor

Constructeur

**Definition**:

```typescript
constructor(scope: any)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `scope` | any | - Document YJS ou portee de type definissant la plage de suivi annuler/retablir |

### undo

Annuler la derniere modification

**Definition**:

```typescript
undo(): boolean
```

**Retour**: `boolean`

### redo

Retablir une modification annulee

**Definition**:

```typescript
redo(): boolean
```

**Retour**: `boolean`

### canUndo

Verifier s il existe des operations annulables

**Definition**:

```typescript
canUndo(): boolean
```

**Retour**: `boolean`

### canRedo

Verifier s il existe des operations retablissables

**Definition**:

```typescript
canRedo(): boolean
```

**Retour**: `boolean`

### clear

Effacer l historique

**Definition**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Retour**: `void`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Indique s il faut effacer la pile undo, true par defaut |
| `clearRedoStack` | boolean | - Indique s il faut effacer la pile redo, true par defaut |