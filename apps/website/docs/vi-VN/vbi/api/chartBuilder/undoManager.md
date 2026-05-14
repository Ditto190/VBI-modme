# UndoManager

Bo quan ly undo/redo cung cap chuc nang undo va redo dua tren YJS, ho tro quan ly stack va xoa lich su

## Thuoc tinh

## Phuong thuc

### constructor

Ham khoi tao

**Dinh nghia**:

```typescript
constructor(scope: any)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `scope` | any | - Tai lieu YJS hoac scope kieu dung de xac dinh pham vi theo doi undo/redo |

### undo

Undo thay doi gan nhat

**Dinh nghia**:

```typescript
undo(): boolean
```

**Tra ve**: `boolean`

### redo

Redo thay doi da undo

**Dinh nghia**:

```typescript
redo(): boolean
```

**Tra ve**: `boolean`

### canUndo

Kiem tra co thao tac co the undo hay khong

**Dinh nghia**:

```typescript
canUndo(): boolean
```

**Tra ve**: `boolean`

### canRedo

Kiem tra co thao tac co the redo hay khong

**Dinh nghia**:

```typescript
canRedo(): boolean
```

**Tra ve**: `boolean`

### clear

Xoa lich su

**Dinh nghia**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Tra ve**: `void`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Co xoa undo stack hay khong, mac dinh true |
| `clearRedoStack` | boolean | - Co xoa redo stack hay khong, mac dinh true |