# Plan: vbi-react-starter Demo Component Expansion (2026-04-10)

- Goal: Upgrade the UI from a page-level implementation to a reusable component layer without regressing existing demo functionality, and lay the groundwork for later package-level component extraction.
- Scope: This phase only refactors `practices/vbi-react-starter` (demo-first). It does not add public exports from `packages/vbi-react` and does not touch `packages/vbi`, `packages/vquery`, or `packages/vseed`.

## Start Gate

1. This phase only consolidates component boundaries and systematizes styling; it does not rewrite DSL logic.
2. Existing functional behavior is the baseline, and the following paths must remain usable:
   - Load demo data -> field panel shows selectable dimensions/measures.
   - Upload CSV -> data source and row count update, and fields become selectable.
   - Select dimensions/measures -> the main area renders a chart or shows a visible, actionable placeholder.
   - Switch chart type -> the render area and DSL snapshot update together.
3. All UI changes must be operable on desktop and narrow screens, with a minimum width of 375px.

## Execution Plan

## Phase 1: Consolidate UI Tokens and Base Styling

1. Stabilize shared tokens for colors, spacing, radius, shadow, and font sizes, plus a global style entry.
2. Reduce large inline style blocks in `App.tsx` and move them into the style layer.
3. Standardize theme variable usage and avoid mixing light/dark theme values.

Deliverables:

- `practices/vbi-react-starter/src/styles/tokens.css`
- `practices/vbi-react-starter/src/styles/styleObjects.ts`
- `practices/vbi-react-starter/src/App.css`

Exit Criteria:

1. Page-level inline style objects in `App.tsx` are reduced to `<= 3`; the rest move to the style layer.
2. Main page regions, including top bar, sidebar, and content area, use the same theme variables.
3. Build passes: `pnpm --filter=vbi-react-starter run build`.

## Phase 2: Consolidate Component Boundaries (Core Blocks)

1. Consolidate the `StarterTopBar` boundary, including title, chart type switching, and action buttons.
2. Consolidate the `FieldPanel` integration boundary, passing selectable fields and builder only through explicit props.
3. Consolidate `StarterFooter` responsibilities, including status summary and DSL snapshot.
4. Consolidate main-area empty/render state boundaries with `StarterEmptyState`, `StarterLoadingSkeleton`, and `StarterRenderError`.

Deliverables:

- `practices/vbi-react-starter/src/App.tsx`
- `practices/vbi-react-starter/src/components/StarterTopBar.tsx`
- `practices/vbi-react-starter/src/components/StarterFooter.tsx`
- `practices/vbi-react-starter/src/components/StarterEmptyState.tsx`
- `practices/vbi-react-starter/src/components/StarterLoadingSkeleton.tsx`
- `practices/vbi-react-starter/src/components/StarterRenderError.tsx`

Exit Criteria:

1. `App.tsx` keeps only orchestration and state flow logic, with file length reduced to `<= 260` lines.
2. Component prop boundaries are clear and do not depend on implicit globals.
3. The field area is visible and operable in the default viewport, with no recurring "too little height to select" issue.

## Phase 3: Complete State Experience and Responsiveness

1. Add recognizable loading/empty/error states and reachable paths for key blocks.
2. Complete responsive rules for 375px to 768px, including panel collapse or reflow.
3. Improve DSL display readability, preserving structured display and avoiding unreadable large blocks.
4. Add a stable trigger for the error state, such as a development switch via `?debugState=error` or an explicit debug button, instead of relying on incidental data conditions.

Acceptance evidence (screenshots + operation notes):

1. Empty state: the main area shows a prompt before data is loaded.
2. Loading state: the skeleton is visible when rendering is triggered.
3. Error state: the fixed trigger enters the error state and the error card is visible.
4. 375px critical path: select chart type -> select fields -> view configuration can be completed.

Exit Criteria:

1. All three state categories are reachable through local operations and can be captured for acceptance.
2. The critical path can be completed at 375px width.
3. The page has no areas where content is compressed until it becomes unclickable.

## Phase 4: Regression Verification and Commit Strategy

1. Functional regression: chart type switching, field add/remove, configuration area synchronization, CSV upload, and demo loading.
2. Quality checks: test + lint + typecheck + build.
3. Use small commits, with at least one independent commit per phase.

Verification commands:

```bash
pnpm --filter=vbi-react-starter run test
pnpm --filter=vbi-react-starter run lint
pnpm --filter=vbi-react-starter run typecheck
pnpm --filter=vbi-react-starter run build
```

Exit Criteria:

1. All commands above pass.
2. No cross-package pollution, especially in `packages/vbi`, `packages/vquery`, or `packages/vseed`.
3. The PR description maps each phase to its outputs, command results, and screenshot evidence.

## Risks and Rollback

1. Risk: After the field panel collapses on narrow screens, the critical operation path is interrupted.
2. Rollback strategy: Keep the field panel expanded by default and prioritize the "select fields -> render chart" path; secondary information areas, such as footer extensions, can be collapsed later.

## DoD

1. Core demo functionality is fully usable.
2. UI styling is unified and component boundaries are clear.
3. `App.tsx` line count and inline styles both meet the quantitative thresholds, and component responsibilities can evolve independently.
4. Verification commands and manual acceptance on desktop/mobile both pass, with reviewable evidence.
5. Changes are limited to `practices/vbi-react-starter` and introduce no cross-package side effects.

## Notes

- Current verification commands continue to use package-name filtering: `--filter=vbi-react-starter`. If the package is later standardized to scoped naming, update the commands accordingly.
