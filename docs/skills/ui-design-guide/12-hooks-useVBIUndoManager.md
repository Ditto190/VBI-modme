# 12. useVBIUndoManager — Undo/Redo

## Signature

```ts
const {
  canUndo, // boolean; whether undo is available
  canRedo, // boolean; whether redo is available
  undo, // () => boolean; undo operation
  redo, // () => boolean; redo operation
  clear, // (clearUndoStack?: boolean, clearRedoStack?: boolean) => void
} = useVBIUndoManager(builder)
```

## Source

`practices/standard/src/hooks/useVBIUndoManager.ts`

## Usage Examples

### Manual Undo/Redo

```ts
const { canUndo, canRedo, undo, redo } = useVBIUndoManager(builder)

// Undo
if (canUndo) {
  undo()
}

// Redo
if (canRedo) {
  redo()
}
```

### Clear History

```ts
// Clear all undo/redo history
clear()

// Clear only the redo stack (keep undo history)
clear(false, true)

// Clear only the undo stack (keep redo history)
clear(true, false)
```

### Keyboard Shortcuts

The hook registers these shortcuts automatically:

| Platform        | Undo     | Redo                       |
| --------------- | -------- | -------------------------- |
| Windows / Linux | `Ctrl+Z` | `Ctrl+Y` or `Ctrl+Shift+Z` |
| macOS           | `Cmd+Z`  | `Cmd+Y` or `Cmd+Shift+Z`   |

**Note**: shortcuts pressed inside inputs, textareas, or contenteditable elements do not trigger undo/redo (`isEditableTarget` check).

---

## Implementation Details

- State subscription uses `builder.doc.on('update', ...)` and synchronizes through `builder.undoManager.canUndo()` / `canRedo()`.
- `undo()` / `redo()` call `builder.undoManager.undo()` / `redo()` and return whether the operation succeeded.
- `clear(clearUndoStack, clearRedoStack)` forwards to `builder.undoManager.clear()`.
- Keyboard shortcuts are registered through `window.addEventListener('keydown', ...)` and removed automatically when the component unmounts.

---

## Transactions and Undo/Redo

All operations wrapped with `builder.doc.transact()` (dimension/measure add/update/remove, filter changes, etc.) support undo/redo automatically. Multiple operations inside one transaction are merged into a single undo step.

```ts
// One undo reverts the whole transaction.
builder.doc.transact(() => {
  builder.dimensions.add('category')
  builder.measures.add('sales')
  builder.chartType.changeChartType('column')
})
// Ctrl+Z undoes all three operations above at once.
```

---

## Notes

- `undo()` / `redo()` return `boolean`, indicating whether an operation ran. They return `false` when preconditions are not met.
- Keyboard shortcuts do not trigger while `altKey` is pressed, avoiding conflicts with browser shortcuts.
- `clear()` resets both `canUndo` and `canRedo` to `false`.
