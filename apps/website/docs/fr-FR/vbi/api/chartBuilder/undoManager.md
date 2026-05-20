# UndoManager

Gestionnaire annuler/rétablir fournissant des fonctions basées sur YJS, avec gestion des piles et effacement de l'historique

## Méthodes

### constructor

Constructeur

**Définition**:

```typescript
constructor(scope: any)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `scope` | any | - Document YJS ou portée de type définissant la plage de suivi annuler/rétablir |

### undo

Annuler la dernière modification

**Définition**:

```typescript
undo(): boolean
```

**Retour**: `boolean`

### redo

Rétablir une modification annulée

**Définition**:

```typescript
redo(): boolean
```

**Retour**: `boolean`

### canUndo

Vérifier s'il existe des opérations annulables

**Définition**:

```typescript
canUndo(): boolean
```

**Retour**: `boolean`

### canRedo

Vérifier s'il existe des opérations rétablissables

**Définition**:

```typescript
canRedo(): boolean
```

**Retour**: `boolean`

### clear

Effacer l'historique

**Définition**:

```typescript
clear(clearUndoStack?: boolean, clearRedoStack?: boolean): void
```

**Retour**: `void`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `clearUndoStack?` | boolean | - Indique s'il faut effacer la pile undo, true par défaut |
| `clearRedoStack?` | boolean | - Indique s'il faut effacer la pile redo, true par défaut |
