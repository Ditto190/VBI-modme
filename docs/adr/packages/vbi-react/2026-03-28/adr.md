# ADR: Add VBI React Site Documentation (2026-03-28)

- Status: Accepted
- Decision Date: 2026-03-28
- Decision Owner: VBI Documentation Collaboration
- Related: `./goal.md`

## Background

`@visactor/vbi-react` has become an independent capability, but the official documentation site does not currently include a dedicated `VBI React` section in its navigation. Users have to look across different paths or source files to find the relevant information, which makes the learning path fragmented and leaves the site information architecture incomplete.

## Decisions

### Decision 1: Add `VBI React` to the site-level navigation

- Location: After `VBI`, before `Playground`.
- Purpose: Let users discover the React wrapper layer directly in the product matrix.

### Decision 2: Create an independent documentation section at `apps/website/docs/zh-CN/vbi-react/`

- Section structure: `index` + `api` + `examples`.
- Purpose: Keep the information hierarchy clear and avoid mixing React-specific content into the main `vbi` documentation.

### Decision 3: Keep API and example content code-aligned

- The API page only records the current real export.
- Example pages must be copyable, understandable, and extensible at minimum.
- Do not invent future interfaces or document unimplemented capabilities.

### Decision 4: Use package exports as the documentation boundary

- `@visactor/vbi-react` and `@visactor/vbi-react/components` are the public export entry points.
- Page names, example imports, and directory organization are all built around public exports.
- Do not document capabilities under `internal` as external APIs.

## Options and Tradeoffs

### Option A: Put vbi-react content under the existing vbi subdirectory

- Pros: Small change set.
- Cons: The boundary is unclear, making it hard for users to distinguish the core layer from the React layer.
- Conclusion: Not adopted.

### Option B: Keep only one landing page without API or examples

- Pros: Fast to ship.
- Cons: The information is incomplete and does not support practical adoption.
- Conclusion: Not adopted.

### Option C: Add a new independent `vbi-react` section

- Pros: Clear structure, sustainable expansion, and consistency with the documentation information architecture.
- Cost: More pages for initial construction.
- Conclusion: Adopted.

## Impact Scope

- Direct impact:
  - `apps/website/docs/zh-CN/_nav.json`
  - `apps/website/docs/zh-CN/vbi-react/**`
- Indirect impact:
  - Future vbi-react documentation maintenance is unified under the site.

## Risks and Mitigations

1. Risk: API documentation drifts from the code.
   - Mitigation: Compare each page against `packages/vbi-react/package.json#exports`, `src/hooks/index.ts`, and `src/components/index.ts`.
2. Risk: Examples are not high enough quality for users to reproduce.
   - Mitigation: Each example page provides consistent dependency notes, minimal code, and expected results.
3. Risk: Navigation-level changes disrupt existing path habits.
   - Mitigation: Keep the original VBI/VQuery/VSeed entries and only insert VBI React incrementally.

## Implementation Boundaries

1. Documentation language: The Chinese source documentation remains under the `zh-CN` path, with terminology aligned to the existing VBI documentation.
2. Directory constraints: Keep the `index / api / examples` three-layer structure separate.
3. Quality gate: Site build verification is required before acceptance, as specified in `plan.md`.
