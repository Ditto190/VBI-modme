# Goal: Add a VBI React Section to the Website Documentation (2026-03-28)

## Goal Statement

Add a `VBI React` page system to the VBI official documentation site so users can learn and adopt `@visactor/vbi-react` directly from the site, including positioning, installation, APIs, and examples.

## Delivery Scope

1. Add a `VBI React` entry to the top navigation.
2. Create a new `vbi-react` documentation section and connect it to the site sidebar.
3. Provide a `VBI React` landing page covering positioning, installation, and quick start.
4. Provide grouped API documentation covering the core hooks/components.
5. Provide grouped example documentation with copyable code and expected results.

## Pre-Start Inputs (SSOT)

1. Runtime export boundaries are defined by `exports` in `packages/vbi-react/package.json`:
   - `@visactor/vbi-react`
   - `@visactor/vbi-react/components`
2. The documented capability list is defined by `packages/vbi-react/src/hooks/index.ts` and `packages/vbi-react/src/components/index.ts`.
3. The documentation target path is fixed at `apps/website/docs/zh-CN/vbi-react/`.

## API Alignment Checklist (Required Coverage)

1. `@visactor/vbi-react`
   - `useVBI`
   - `useVSeed`
   - `useChartType`
   - `useDimensions`
   - `useMeasures`
   - `useWhereFilter`
   - `useHavingFilter`
2. `@visactor/vbi-react/components`
   - `BuilderLayout`
   - `ChartRenderer`
   - `ChartTypeSelector`
   - `FieldPanel`

## Out of Scope

- Do not change runtime code under `packages/vbi-react/src`.
- Do not implement new features or change test logic.
- Do not handle the npm release process.

## Acceptance Criteria (DoD)

1. `VBI React` is visible in the navigation and can be clicked.
2. `apps/website/docs/zh-CN/vbi-react/` has a complete directory structure: landing page, API, examples, and each `_meta.json`.
3. API documentation includes at least 6 pages, all mapped to real exports in the "API Alignment Checklist".
4. Example documentation includes at least 3 pages, each with dependency notes, a minimal code snippet, and expected results.
5. Page links and hierarchy are correct, with no obvious broken links or empty pages.
6. Copy and terminology remain consistent with the existing VBI documentation style, including consistent Chinese/English terminology.
