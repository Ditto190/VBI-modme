# 19. UI Practice Notes

> This document records pitfalls and notes found during real UI development, for future AI work on VBI UI.

---

## 1. Dropdown Menus Above Panels

### Problem

After clicking dropdown components such as ChartTypeSelector, the dropdown menu is covered by the left panel.

### Cause

Topbar and Left Panel use `backdrop-filter: blur()`, which creates a new stacking context. Internal `position: absolute` elements cannot escape the parent stacking context even with a high z-index.

### Solution

**Three z-index layers + `position: fixed`**

1. Add `z-index: 100` and `position: relative` to Topbar.
2. Add `z-index: 10` to the left and right panels.
3. Add `z-index: 1` to the Canvas panel.
4. Add `position: relative` to the dropdown trigger button.
5. Use `position: fixed` for the dropdown menu and dynamically get button coordinates through `getBoundingClientRect()`.

```tsx
// Trigger button
<div ref={triggerRef} style={{ position: 'relative' }}>

// Dropdown menu
<div
  style={{
    position: 'fixed',
    top: dropPos.top,    // getBoundingClientRect().bottom + 4
    left: dropPos.left,  // getBoundingClientRect().left
    zIndex: 9999,
    // ...
  }}
>
```

```tsx
// Get coordinates
useEffect(() => {
  if (open && triggerRef.current) {
    const rect = triggerRef.current.getBoundingClientRect()
    setDropPos({ top: rect.bottom + 4, left: rect.left })
  }
}, [open])
```

### Do Not Do This

- ❌ Rely only on `z-index: 1000` without setting topbar z-index.
- ❌ Use `position: absolute` + `z-index: 9999`, which is constrained by the parent stacking context.

---

## 2. Text Contrast in Light Mode

### Problem

Many components use hardcoded colors such as `rgba(255,255,255,...)`, which become invisible in the light theme.

### Cause

CSS variables `--text-primary`, `--text-secondary`, and `--text-muted` are defined only under `:root` or theme root classes such as `.demo-app-root--dark` / `.demo-app-root--light`, but components use hardcoded white internally.

### Solution

**Use CSS variables consistently** and do not hardcode white rgba values:

```css
/* Both dark and light themes must define these variables. */
.demo-app-root--dark {
  --text-primary: rgba(255, 255, 255, 0.92);
  --text-secondary: rgba(255, 255, 255, 0.55);
  --text-muted: rgba(255, 255, 255, 0.3);
  --panel-input-bg: rgba(255, 255, 255, 0.06);
  --panel-input-border: rgba(255, 255, 255, 0.1);
}

.demo-app-root--light {
  --text-primary: rgba(15, 23, 42, 0.92);
  --text-secondary: rgba(15, 23, 42, 0.55);
  --text-muted: rgba(15, 23, 42, 0.35);
  --panel-input-bg: rgba(0, 0, 0, 0.04);
  --panel-input-border: rgba(0, 0, 0, 0.1);
}
```

```tsx
// Incorrect: hardcoded white is invisible in light mode.
<span style={{ color: 'rgba(255,255,255,0.85)' }}>Text</span>

// Correct: use CSS variables.
<span style={{ color: 'var(--text-primary)' }}>Text</span>
```

### Required Variable Use Cases

| Scenario                         | CSS Variable                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| Primary text                     | `--text-primary`                                                                           |
| Secondary text                   | `--text-secondary`                                                                         |
| Helper text (placeholder, label) | `--text-muted`                                                                             |
| Input background                 | `--panel-input-bg`                                                                         |
| Input border                     | `--panel-input-border`                                                                     |
| Acceptable hardcoded cases       | accent color (`#6c8cff`), error color (`#f66`), background color (`rgba(108,140,255,0.2)`) |

---

## 3. Initial Demo Data Loading

### Problem

The page has no data after opening; users must manually click a "Load Demo" button to see results.

### Solution

In the App component, use the `initialized` state plus a `useRef` flag to auto-load only after the first initialization:

```tsx
const autoLoaded = useRef(false)

useEffect(() => {
  if (initialized && !autoLoaded.current) {
    autoLoaded.current = true
    handleLoadDemo()
  }
}, [initialized])
```

### Do Not Do This

- ❌ Call data loading inside `initialize()`, where builder may not be ready yet.
- ❌ Omit the `autoLoaded` flag, because `initialized` state changes can trigger multiple times.

---

## 4. WHERE Filter Operators and Value Types

### Problem

Dimension filters fail when using `op: 'in'` with a single value; multi-value filters such as Shanghai and Dongfeng also fail.

### Cause

`buildWhere.ts` conversion rules:

| Condition                | Conversion Result                    |
| ------------------------ | ------------------------------------ |
| `op: '='` + array value  | `'in'`                               |
| `op: '!='` + array value | `'not in'`                           |
| `op: '='` + string value | `=` (single-value exact match)       |
| `op: 'in'` + any value   | Passed through unchanged (may error) |

### Correct Approach

```tsx
// UI layer: when the user selects "in" (multi-value)
const op = 'in'
const values = formValue.split(',').map((v) => v.trim())
// -> Pass to VBI: op='=', value=['Shanghai', 'Dongfeng']
// -> buildWhere automatically converts to op='in'

// UI layer: when the user selects "=" (single-value)
const op = '='
const value = formValue.trim()
// -> Pass to VBI: op='=', value='Shanghai'
// -> buildWhere generates SQL: WHERE city = 'Shanghai'
```

### Key Points

- `in` / `not in` **must receive array values**, even when there is only one element.
- `=` / `!=` **receive string values** for single-value exact matches.
- **Do not use `op: 'in'`**. VBI passes it through to SQL unchanged; the correct approach is `op: '='` + array.

---

## 5. RawDatasetSource TidyDatum Type Constraint

### Problem

Passing `localData` directly as `{ type: 'json', rawDataset: localData }` causes TypeScript errors or runtime type mismatches.

### Cause

`RawDatasetSource.rawDataset` has type `TidyDatum[]`, where `TidyDatum = Record<string, number | string | null | boolean | undefined>`. Nested objects are not supported.

### Correct Approach

```ts
import { type TidyDatum } from '@visactor/vquery'

type DatasetSourceValue = string | ArrayBuffer | Blob | TidyDatum[]

const toTidyDatum = (row: unknown): TidyDatum | null => {
  if (typeof row !== 'object' || row === null) return null
  const result: TidyDatum = {}
  for (const [k, v] of Object.entries(row as Record<string, unknown>)) {
    if (typeof v === 'number' || typeof v === 'string' || v === null || typeof v === 'boolean' || v === undefined) {
      result[k] = v as number | string | null | boolean | undefined
    } else {
      return null // Nested objects are not supported
    }
  }
  return result
}

// Convert data
const tidyData: TidyDatum[] = []
for (const row of localData) {
  const datum = toTidyDatum(row)
  if (datum) tidyData.push(datum)
}

const ds: RawDatasetSource = { type: 'json', rawDataset: tidyData }
await vquery.createDataset(connectorId, schema, ds)
```

---

## 6. Hook Dependency Arrays

### Problem

Missing `useCallback` / `useEffect` dependencies in components can cause closures to read stale state.

### Cause

The project uses Oxlint and no longer keeps ESLint react-hooks plugin rules as a fallback.

### Solution

- ❌ Do not rely on lint-disable comments to skip dependency checks.
- ✅ Include all required dependencies in dependency arrays, or refactor to stable callback/state boundaries.

---

## 7. VSeedRender Light-mode Background

### Problem

The Canvas chart area's background color must be set explicitly in the light theme; otherwise it may render incorrectly.

### Solution

The VSeedRender container div can use `background: var(--panel-bg-solid)` or a transparent background; VChart/VTable adapts internally to the theme. The Canvas panel itself still needs an explicit background color:

```css
.canvas-chart-area {
  background: var(--panel-bg-solid);
}
```
