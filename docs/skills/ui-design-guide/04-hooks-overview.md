# 4. Hooks Overview and Import Rules

Each practice has its own independent hook set, exported from `src/hooks/index.ts`.

---

## 4.1 Import Rules

**Import from the target practice's `src/hooks/`, not from `@visactor/vbi-react`**:

```ts
// Correct: import from the current practice's hooks directory
import {
  useVBIDimensions,
  useVBIMeasures,
  useVBIWhereFilter,
  useVBIHavingFilter,
  useVBIChartType,
  useVBIBuilder,
  useVBISchemaFields,
  useVBIUndoManager,
  useVBIStore,
} from 'src/hooks'

// Incorrect: do not import these hooks from @visactor/vbi-react
import { useDimensions, useMeasures } from '@visactor/vbi-react'
// These two hook sets have completely different signatures and will cause builder parameter type mismatches.
```

**vbi-react-starter is the only exception**. It uses the `@visactor/vbi-react` package:

```ts
// vbi-react-starter uses this import style.
import { useVBI, useDimensions, useMeasures } from '@visactor/vbi-react'
```

---

## 4.2 Hook List

| Hook                 | Responsibility                                                   | Source Location                   |
| -------------------- | ---------------------------------------------------------------- | --------------------------------- |
| `useVBIDimensions`   | Dimension state subscription + add/update/remove (callback mode) | `src/hooks/useVBIDimensions.ts`   |
| `useVBIMeasures`     | Measure state subscription + add/update/remove (callback mode)   | `src/hooks/useVBIMeasures.ts`     |
| `useVBIWhereFilter`  | WHERE filter state subscription + complete operation set         | `src/hooks/useVBIWhereFilter.ts`  |
| `useVBIHavingFilter` | HAVING filter state subscription + complete operation set        | `src/hooks/useVBIHavingFilter.ts` |
| `useVBIChartType`    | Chart type state subscription + changeChartType                  | `src/hooks/useVBIChartType.ts`    |
| `useVBIBuilder`      | Global locale/theme/limit configuration                          | `src/hooks/useVBIBuilder.ts`      |
| `useVBISchemaFields` | Field list (with role/type classification)                       | `src/hooks/useVBISchemaFields.ts` |
| `useVBIUndoManager`  | Undo/Redo state subscription                                     | `src/hooks/useVBIUndoManager.ts`  |
| `useVBIStore`        | Get the store instance                                           | `src/hooks/useVBIStore.ts`        |

---

## 4.3 Relationship Between Hooks and the Builder API

All hooks are React wrappers around the Builder API:

```
Builder API (synchronous)
  ↓ useBuilderDocState (Yjs -> React state bridge)
  ↓ Wrapped as a React Hook
React Component (useVBIDimensions, etc.)
```

**All mutations (add/update/remove) are wrapped with `builder.doc.transact()`** to preserve correct undo/redo behavior:

```ts
// Sketch of a hook implementation
const addDimension = (field, callback) => {
  builder.doc.transact(() => {
    builder.dimensions.add(field, callback)
  })
}
```

---

## 4.4 builder Parameter Notes

Except for `useVBIStore`, all hooks accept `builder: VBIChartBuilder | undefined`:

```ts
// The builder parameter is optional. When undefined is passed, the hook is a no-op.
const { dimensions, addDimension } = useVBIDimensions(builder) // builder may be undefined
const { schemaFields } = useVBISchemaFields(undefined) // Safe; does not throw
```

Usually, get the builder from `useVBIStore`:

```ts
const builder = useVBIStore((s) => s.builder)
const { dimensions } = useVBIDimensions(builder)
```
