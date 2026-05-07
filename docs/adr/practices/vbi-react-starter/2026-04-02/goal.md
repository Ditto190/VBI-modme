# Goal: vbi-react Starter Demo Redesign (2026-04-02)

## Goal Statement

Upgrade the visual consistency, information hierarchy, and interaction experience of `practices/vbi-react-starter` without changing the core runtime behavior of `@visactor/vbi-react`, so it becomes an externally presentable component capability showcase rather than an internal validation page.

## Delivery Scope

1. Establish a visual and layout design system for the demo: tokens, theme, and component styling constraints.
2. Split the current large `App.tsx` into maintainable smaller components.
3. Improve key experience paths: data loading, empty state, error state, and DSL inspection.
4. Add responsive layout strategies for desktop and narrow screens.
5. Produce an executable phased refactor plan and verification gates.

## Pre-Work Inputs (SSOT)

1. The current implementation in `practices/vbi-react-starter/src/App.tsx` is the source of truth.
2. The component capability boundary follows the current exports from `@visactor/vbi-react/components`:
   - `BuilderLayout`
   - `ChartRenderer`
   - `ChartTypeSelector`
   - `FieldPanel`
3. The existing documentation location is `apps/website/docs/zh-CN/vbi/practices/vbi-react-starter.mdx`.

## Key Issues (Must Cover)

1. Styles are scattered across inline `CSSProperties`, with no unified token or theme layer.
2. The page theme is inconsistent: the container is dark while some components look closer to a light theme.
3. Interaction feedback is weak: loading/empty/error states are too basic, and the DSL dump is hard to read.
4. Responsive strategy is missing, which hurts operation and reading on narrow screens.
5. The file is too large and has many repeated styles, increasing maintenance cost.

## Out of Scope

- Do not change the public API of `@visactor/vbi-react` hooks/components.
- Do not rewrite the business logic of `VBIChartBuilder`, the connector, or the CSV parser.
- Do not introduce heavyweight dependencies or complex infrastructure changes unrelated to the demo goal.

## Acceptance Criteria (DoD)

1. `practices/vbi-react-starter/src/App.tsx` no longer carries all UI details; the main flow is split into multiple responsibility-focused components.
2. Styles move from mostly inline definitions to a unified token/theme system, with consistent visual language.
3. The first-screen path "load data -> select fields -> select chart -> preview result" can be completed within three steps.
4. loading/empty/error states all have clear visual feedback and consistent copy.
5. Key flows can be completed on both desktop and narrow screens: field selection, chart switching, and data loading.
6. The design documentation can directly guide implementation and code review without relying on verbal follow-up.
