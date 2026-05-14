# UndoManager

Undo/Redo-Manager mit YJS-basierter Undo- und Redo-Funktionalitaet, inklusive Stack-Verwaltung und Verlaufloeschung

## Eigenschaften

## Methoden

### constructor

Konstruktor

**Definition**:

```typescript
constructor(scope: any)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `scope` | any | - YJS-Dokument oder Typ-Scope zur Definition des Tracking-Bereichs fuer Undo/Redo |

### undo

Letzte Aenderung rueckgaengig machen

**Definition**:

```typescript
undo(): boolean
```

**Rueckgabe**: `boolean`

### redo

Rueckgaengig gemachte Aenderung wiederholen

**Definition**:

```typescript
redo(): boolean
```

**Rueckgabe**: `boolean`

### canUndo

Pruefen, ob Operationen rueckgaengig gemacht werden koennen

**Definition**:

```typescript
canUndo(): boolean
```

**Rueckgabe**: `boolean`

### canRedo

Pruefen, ob Operationen wiederholt werden koennen

**Definition**:

```typescript
canRedo(): boolean
```

**Rueckgabe**: `boolean`

### clear

Verlauf loeschen

**Definition**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Rueckgabe**: `void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Ob der Undo-Stack geloescht wird, Standard true |
| `clearRedoStack` | boolean | - Ob der Redo-Stack geloescht wird, Standard true |