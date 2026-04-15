# Annotation Difference Line Style Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the built-in `annotationDifferenceLine` styling so the generated VChart `markLine` is solid, arrowed, and theme-adaptive without changing the DSL.

**Architecture:** Keep the change local to the existing spec pipe and annotation theme defaults. The pipe will explicitly override VChart's generic marker defaults, while the shared light/dark annotation theme will reuse the same color mode already used by other annotation types.

**Tech Stack:** TypeScript, VSeed builder/spec pipeline, Vitest

---

### Task 1: Lock The Desired Compiled Spec Defaults

**Files:**

- Modify: `packages/vseed/tests/unit/builder/annotationDifferenceLine.test.ts`
- Test: `packages/vseed/tests/unit/builder/annotationDifferenceLine.test.ts`

- [ ] **Step 1: Write failing assertions for the new markLine defaults**

Add assertions for:

- `expandDistance: 24`
- `line.style.lineDash: [0]`
- `line.style.lineWidth: 2`
- `line.style.cornerRadius: 4`
- `label.position: 'middle'`
- `label.labelBackground.padding: 4`
- `endSymbol.size: 12`
- `endSymbol.refX: -4`

- [ ] **Step 2: Run the focused unit test to confirm the old implementation fails**

Run: `cd packages/vseed && node_modules/.bin/vitest run tests/unit/builder/annotationDifferenceLine.test.ts`

- [ ] **Step 3: Update the implementation to satisfy the new assertions**

Touch:

- `packages/vseed/src/pipeline/spec/chart/pipes/annotation/annotationDifferenceLine.ts`
- `packages/vseed/src/theme/common/annotaion.ts`
- `packages/vseed/src/theme/tokenTheme.ts`

- [ ] **Step 4: Re-run the focused unit test**

Run: `cd packages/vseed && node_modules/.bin/vitest run tests/unit/builder/annotationDifferenceLine.test.ts`

### Task 2: Reuse The Existing Annotation Family Color Mode

**Files:**

- Modify: `packages/vseed/src/theme/common/annotaion.ts`
- Modify: `packages/vseed/src/theme/tokenTheme.ts`
- Test: `packages/vseed/tests/unit/builder/annotationDifferenceLine.test.ts`

- [ ] **Step 1: Replace the current light/dark difference-line colors**

Use the same family pattern already used by other annotation defaults:

- light: `lineColor/textBackgroundColor = '#BCC1CB'`, `textColor = '#ffffff'`
- dark: `lineColor/textBackgroundColor = '#55595F'`, `textColor = '#E2E3E6'`

- [ ] **Step 2: Keep token theme behavior consistent with other annotations**

Remove any difference-line-specific token color overrides and leave `textFontSize` as the only token-driven patch.

- [ ] **Step 3: Add assertions that the compiled default label background and line colors come from the updated theme**

Keep the test focused on compiled spec output rather than internal helper structure.

- [ ] **Step 4: Re-run unit tests**

Run: `cd packages/vseed && node_modules/.bin/vitest run tests/unit/builder/annotationDifferenceLine.test.ts`

### Task 3: Verify Against Existing Integration Coverage

**Files:**

- Modify: `packages/vseed/tests/integrations/column/annotation/annotationDifferenceLineValue.json` (only if needed)
- Modify: `packages/vseed/tests/integrations/bar/annotation/annotationDifferenceLineValue.json` (only if needed)
- Modify: `packages/vseed/tests/integrations/columnParallel/annotation/annotationDifferenceLineSeries.json` (only if needed)

- [ ] **Step 1: Run the existing focused integration suites**

Run: `node_modules/.bin/vitest run tests/integrations/column/column.test.ts tests/integrations/bar/bar.test.ts tests/integrations/columnParallel/columnParallel.test.ts`

- [ ] **Step 2: If a fixture expectation is implicitly depending on the old style, adjust only the relevant assertions/fixtures**

Do not widen coverage beyond the style defaults changed in this plan.

- [ ] **Step 3: Run typecheck**

Run: `pnpm --filter @visactor/vseed typecheck`

- [ ] **Step 4: Summarize the verification evidence**

Report the exact commands run and whether each passed.
