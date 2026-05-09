# ADR: vbi-react Starter Demo Redesign Plan (2026-04-02)

- Status: Accepted
- Decision Date: 2026-04-02
- Decision Owner: VBI React collaborative development
- Related: `./goal.md`

## Context

The current `vbi-react-starter` already covers basic capability validation, but the page still looks and feels like an internal debugging surface: styles are scattered, hierarchy is unclear, responsive behavior is missing, and state feedback is weak. This page is already exposed on the website as a practice example, so keeping the current state would hurt the external impression and learning efficiency of `@visactor/vbi-react/components`.

## Decisions

### Decision 1: Use a two-phase refactor, stabilizing first and enhancing the experience second

- Phase 1 focuses on theme unification, systematic styling, component splitting, and readability of key states.
- Phase 2 focuses on animation, visual selectors, and interaction polish.
- Purpose: control the scope of each change, reduce regression risk, and ensure each phase can be submitted and accepted independently.

### Decision 2: Use `CSS Variables + structured style files` in Phase 1, without a hard dependency on Tailwind

- First establish a lightweight token/theme system to quickly replace inline styles.
- Minimize impact on the existing monorepo build chain and avoid coupling to an additional styling tool in the first phase.
- Evaluate Tailwind adoption in later evolution if needed.

### Decision 3: Add only the minimum necessary dependencies

- Icon layer: introduce `lucide-react`.
- Interactive primitives: if native controls need to be replaced, prefer a small-scoped `Radix` adoption, such as Select/Tooltip.
- Animation libraries such as `framer-motion` only enter Phase 2 and only for key feedback.

### Decision 4: Keep the Starter's component-validation goal unchanged

- `FieldPanel`, `ChartTypeSelector`, `ChartRenderer`, and `BuilderLayout` remain the core experience skeleton.
- The UI refactor must not shift the core value from "validating component-layer usability" to "heavy business logic".

## Alternatives and Tradeoffs

### Option A: One-shot refactor + full component library migration

- Benefit: obvious short-term visual leap.
- Drawback: the change surface is too large, with high conflict and regression risk and high review cost.
- Conclusion: reject.

### Option B: Only make small styling adjustments, without structural changes

- Benefit: fast to implement.
- Drawback: cannot solve the oversized App and information hierarchy issues, so long-term maintenance cost does not decrease.
- Conclusion: reject.

### Option C: Two-phase incremental refactor (this plan)

- Benefit: controlled risk, clear cadence, and each phase can be implemented and accepted.
- Cost: delivery must be split into batches, leaving a temporary transition state in the short term.
- Conclusion: adopt.

## Impact Scope

- Direct impact:
  - `practices/vbi-react-starter/src/**`
  - `practices/vbi-react-starter/tests/**` (add as needed)
  - `apps/website/docs/zh-CN/vbi/practices/vbi-react-starter.mdx` (adjust the container display as needed)
- Indirect impact:
  - The website example presentation and learnability of `@visactor/vbi-react/components`.

## Risks and Mitigations

1. Risk: the styling refactor causes component behavior regressions.
   - Mitigation: do not change behavior logic; migrate styles first, then enhance interactions. Run existing tests in each phase and add smoke verification for key paths.
2. Risk: new dependencies increase bundle size and maintenance burden.
   - Mitigation: introduce only necessary dependencies in Phase 1. Each dependency must state its benefit and alternative cost.
3. Risk: conflicts with in-flight documentation/example PRs.
   - Mitigation: proceed in an independent worktree and new branch, focusing only on the starter path to reduce file overlap.

## Implementation Constraints

1. Directory constraint: follow the `YYYY-MM-DD-topic/` structure from `packages/vbi-react/docs/README.md`.
2. Engineering constraint: prefer small files and responsibility splits; avoid continued growth of a single large file.
3. Interaction constraint: do not increase operation complexity on key paths, and do not sacrifice the low-barrier onboarding goal.
