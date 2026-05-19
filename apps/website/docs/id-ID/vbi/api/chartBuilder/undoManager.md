# UndoManager

Manager undo/redo yang menyediakan fungsi undo dan redo berbasis YJS, dengan dukungan manajemen stack dan penghapusan riwayat

## Metode

### constructor

Konstruktor

**Definisi**:

```typescript
constructor(scope: any)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `scope` | any | - Dokumen YJS atau scope tipe untuk menentukan rentang pelacakan undo/redo |

### undo

Membatalkan perubahan terakhir

**Definisi**:

```typescript
undo(): boolean
```

**Mengembalikan**: `boolean`

### redo

Mengulang perubahan yang dibatalkan

**Definisi**:

```typescript
redo(): boolean
```

**Mengembalikan**: `boolean`

### canUndo

Memeriksa apakah ada operasi yang dapat di-undo

**Definisi**:

```typescript
canUndo(): boolean
```

**Mengembalikan**: `boolean`

### canRedo

Memeriksa apakah ada operasi yang dapat di-redo

**Definisi**:

```typescript
canRedo(): boolean
```

**Mengembalikan**: `boolean`

### clear

Menghapus riwayat

**Definisi**:

```typescript
clear(clearUndoStack?: boolean, clearRedoStack?: boolean): void
```

**Mengembalikan**: `void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `clearUndoStack?` | boolean | - Apakah menghapus undo stack, default true |
| `clearRedoStack?` | boolean | - Apakah menghapus redo stack, default true |
