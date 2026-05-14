# UndoManager

Undo/Redo マネージャー。YJS ベースの Undo/Redo 機能を提供し、スタック管理と履歴クリアをサポートします

## プロパティ

## メソッド

### constructor

コンストラクタ

**定義**:

```typescript
constructor(scope: any)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `scope` | any | - Undo/Redo の追跡範囲を定義する YJS ドキュメントまたは型スコープ |

### undo

前回の変更を取り消す

**定義**:

```typescript
undo(): boolean
```

**戻り値**: `boolean`

### redo

取り消した変更をやり直す

**定義**:

```typescript
redo(): boolean
```

**戻り値**: `boolean`

### canUndo

取り消し可能な操作があるか確認

**定義**:

```typescript
canUndo(): boolean
```

**戻り値**: `boolean`

### canRedo

やり直し可能な操作があるか確認

**定義**:

```typescript
canRedo(): boolean
```

**戻り値**: `boolean`

### clear

履歴をクリア

**定義**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**戻り値**: `void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Undo スタックをクリアするか。デフォルトは true |
| `clearRedoStack` | boolean | - Redo スタックをクリアするか。デフォルトは true |