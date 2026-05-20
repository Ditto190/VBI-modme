# UndoManager

Bộ quản lý undo/redo cung cấp chức năng undo và redo dựa trên YJS, hỗ trợ quản lý stack và xóa lịch sử

## Phương thức

### constructor

Hàm khởi tạo

**Định nghĩa**:

```typescript
constructor(scope: any)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `scope` | any | - Tài liệu YJS hoặc scope kiểu, dùng để xác định phạm vi theo dõi undo/redo |

### undo

Undo thay đổi gần nhất

**Định nghĩa**:

```typescript
undo(): boolean
```

**Trả về**: `boolean`

### redo

Redo thay đổi đã undo

**Định nghĩa**:

```typescript
redo(): boolean
```

**Trả về**: `boolean`

### canUndo

Kiểm tra có thao tác có thể undo hay không

**Định nghĩa**:

```typescript
canUndo(): boolean
```

**Trả về**: `boolean`

### canRedo

Kiểm tra có thao tác có thể redo hay không

**Định nghĩa**:

```typescript
canRedo(): boolean
```

**Trả về**: `boolean`

### clear

Xóa lịch sử

**Định nghĩa**:

```typescript
clear(clearUndoStack?: boolean, clearRedoStack?: boolean): void
```

**Trả về**: `void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `clearUndoStack?` | boolean | - Có xóa undo stack hay không, mặc định true |
| `clearRedoStack?` | boolean | - Có xóa redo stack hay không, mặc định true |
