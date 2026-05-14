# UndoManager

YJS 기반 실행 취소/다시 실행 기능을 제공하는 Undo/Redo 관리자이며 스택 관리와 기록 지우기를 지원합니다

## 속성

## 메서드

### constructor

생성자

**정의**:

```typescript
constructor(scope: any)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `scope` | any | - Undo/Redo 추적 범위를 정의하는 YJS 문서 또는 타입 스코프 |

### undo

마지막 변경 실행 취소

**정의**:

```typescript
undo(): boolean
```

**반환**: `boolean`

### redo

실행 취소된 변경 다시 실행

**정의**:

```typescript
redo(): boolean
```

**반환**: `boolean`

### canUndo

실행 취소 가능한 작업이 있는지 확인

**정의**:

```typescript
canUndo(): boolean
```

**반환**: `boolean`

### canRedo

다시 실행 가능한 작업이 있는지 확인

**정의**:

```typescript
canRedo(): boolean
```

**반환**: `boolean`

### clear

기록 지우기

**정의**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**반환**: `void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `clearUndoStack` | boolean | - undo 스택을 지울지 여부, 기본값 true |
| `clearRedoStack` | boolean | - redo 스택을 지울지 여부, 기본값 true |