# UndoManager

Undo/Redo-Manager mit YJS-basierter Undo- und Redo-Funktionalität, inklusive Stack-Verwaltung und Verlaufslöschung

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
| `scope` | any | - YJS-Dokument oder Typ-Scope zur Definition des Tracking-Bereichs für Undo/Redo |

### undo

Letzte Änderung rückgängig machen

**Definition**:

```typescript
undo(): boolean
```

**Rückgabe**: `boolean`

### redo

Rückgängig gemachte Änderung wiederholen

**Definition**:

```typescript
redo(): boolean
```

**Rückgabe**: `boolean`

### canUndo

Prüfen, ob Operationen rückgängig gemacht werden können

**Definition**:

```typescript
canUndo(): boolean
```

**Rückgabe**: `boolean`

### canRedo

Prüfen, ob Operationen wiederholt werden können

**Definition**:

```typescript
canRedo(): boolean
```

**Rückgabe**: `boolean`

### clear

Verlauf löschen

**Definition**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Rückgabe**: `void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Ob der Undo-Stack gelöscht wird, Standard true |
| `clearRedoStack` | boolean | - Ob der Redo-Stack gelöscht wird, Standard true |
