# Plan: vbi-react Starter Demo Visual and Experience Refactor (2026-04-02, Rev.1)

- Based on: `./adr.md`
- Goal: upgrade the starter demo into a high-quality externally presentable example while preserving its component-validation value.

## Problem Analysis (Current State)

The current `practices/vbi-react-starter/src/App.tsx` simultaneously owns state management, layout structure, visual styling, and state feedback, causing the following issues:

1. Many repeated inline styles make changes costly and make visual drift likely.
2. Visual priority is unclear and information noise is high, especially because the DSL area and status area compete for attention.
3. loading/empty/error states are weak, and first-screen guidance is not clear enough.
4. A narrow-screen layout strategy is missing, making mobile or small-window demos unstable.

## Start Gate

1. Freeze the target paths:
   - `practices/vbi-react-starter/src/**`
   - `practices/vbi-react-starter/tests/**` (as needed)
2. Freeze behavior boundaries:
   - Do not change the connector protocol or core data flow: load demo / upload CSV / build chart.
   - Do not change the public API of `@visactor/vbi-react/components`.
3. Freeze verification criteria:
   - First keep existing functionality working, then pursue visual and interaction improvements.

## Solution Design

### Styling and Theme

1. Add unified tokens for color, spacing, radius, shadow, typography, and z-index levels.
2. First unify the theme to one baseline, either default light or default dark, to avoid mixing.
3. Move from inline styles to structured style files, such as CSS Modules or an equivalent approach.

### Structural Split

1. Keep flow orchestration in `App`, and extract presentation components:
   - `TopBar`
   - `MainCanvas`
   - `StatusPanel`
   - `DslInspector`
2. Centralize shared styles and state copy to reduce repeated definitions.

### Experience Enhancements

1. Add skeleton/loading states instead of plain text waiting messages.
2. Improve empty/error cards and provide next-step action hints.
3. Collapse or demote the DSL area by default to reduce interference with the main flow.

## Phased Execution and Executable Acceptance

Each phase requires the full set of implementation, acceptance commands, and passing criteria to avoid subjective judgment.

## Phase 1: Visual System Alignment (Priority)

Implementation items:

1. Add a token/theme file and connect it to the page. Suggested path: `src/styles/tokens.css`.
2. Replace the main inline styles in `App.tsx`.
3. Unify the three core style groups: buttons, cards, and status hints.

Acceptance commands:

```bash
pnpm --filter=vbi-react-starter run build
test -f practices/vbi-react-starter/src/styles/tokens.css
rg -n "style=\\{\\{" practices/vbi-react-starter/src
```

Passing criteria:

1. `build` exits successfully with exit code = 0.
2. The token file exists and is referenced by page styles, visible in code review through import/use.
3. `style={{` usage drops significantly: `App.tsx` no longer contains large style constant definitions.

## Phase 2: Structural Split and Main Flow Clarity

Implementation items:

1. Split `App.tsx` into responsibility-focused components; `App` keeps only flow orchestration and state management.
2. Prioritize the main action area and chart preview, and demote the DSL area.
3. Keep the "load data -> select fields -> render chart" path smooth.

Acceptance commands:

```bash
pnpm --filter=vbi-react-starter run test
pnpm --filter=vbi-react-starter run build
wc -l practices/vbi-react-starter/src/App.tsx
find practices/vbi-react-starter/src -maxdepth 2 -type f | rg -n "TopBar|MainCanvas|StatusPanel|DslInspector"
```

Passing criteria:

1. Both `test` and `build` pass.
2. `App.tsx` line count drops into a maintainable range, with a target of <= 260 lines.
3. At least three responsibility-focused UI component files are added and orchestrated by `App`.

## Phase 3: Experience Details and Responsive Coverage

Implementation items:

1. Add visual feedback components for loading/empty/error states.
2. Complete narrow-screen adaptation: panel collapse, button wrapping, and content scrolling strategy.
3. Introduce lightweight enhancements if worthwhile: icons, necessary transition animations, and visual selectors.

Acceptance steps (manual smoke test, record results):

1. Desktop viewport (1440x900):
   - Complete `Load demo data -> add fields -> switch chart`.
2. Narrow viewport (390x844):
   - The page has no fatal obstruction, key buttons are clickable, and the main area has no unrecoverable stuck state.
3. Error path:
   - Uploading an invalid CSV shows an error state and still allows continued operation.

Passing criteria:

1. The four states have clear UI: `loading / empty / error / success`.
2. Key paths work on both desktop and narrow screens without blockers.

## Phase 4: Full Gates and Pre-Submit Signoff

Acceptance commands:

```bash
pnpm --filter=vbi-react-starter run lint
pnpm --filter=vbi-react-starter run test
pnpm --filter=vbi-react-starter run build
pnpm --filter=website run build
pnpm run lint
```

Optional enhancements:

```bash
pnpm --filter=vbi-react-starter run typecheck
pnpm run typecheck
```

Passing criteria:

1. All default gate commands pass.
2. The practice page in the website renders correctly with no build-time import errors.
3. Smoke-check records are complete, covering desktop, narrow screen, and error paths.

## Acceptance Criteria (DoD)

1. The style system has a single token/theme entrypoint and no longer depends on large inline style blocks.
2. `App` is split from an all-in-one file into responsibility-focused components with readable structure and names.
3. The four states `loading/empty/error/success` are reproducible and provide clear feedback.
4. Responsive behavior covers desktop and narrow screens, and key-flow usability passes manual smoke testing.
5. All default gate commands pass, allowing the work to be submitted and reviewed independently.

## Risks and Mitigations

1. Risk: the split introduces behavior differences.
   - Mitigation: first keep the logic unchanged and only move code, then replace the UI item by item.
2. Risk: styling changes conflict with in-flight documentation PRs.
   - Mitigation: limit this change to the starter demo and its corresponding practice page.
3. Risk: new dependencies do not provide enough value.
   - Mitigation: introduce dependencies by phase; first implement a no-dependency or light-dependency version and evaluate the value.

## Rollback Strategy

1. If regressions appear after the split, keep the token/theme and style output, and revert the component-splitting commit.
2. If an experience-enhancement dependency is unstable, revert the dependency-related commit and keep the completed structural refactor.
