# VBI Package Development Reference

Use this reference for changes under `packages/vbi`, or for app, Provider, CLI,
agent, and React code that mutates or consumes VBI resources.

## Role

`packages/vbi` is the headless logic layer for VBI resources. It owns DSL state,
Yjs-backed collaborative documents, Builder APIs, normalization, snapshots, and
lowering from VBI DSL to `VQueryDSL` and `VSeedDSL`.

It does not own rendering or host UI concerns. Keep DOM, React state, page
layout, VChart/VTable instances, transport setup, and product workflow code in
`packages/vseed`, `packages/vbi-react`, `apps/*`, `practices/*`, or Provider.

## Development Rules

- Work TDD-first. Add or update the focused failing test in the owning scope
  before implementation, then keep the production change as small as the test
  allows.
- Design DSL-first. Model behavior in `VBIChartDSL`, `VBIReportDSL`,
  `VBIInsightDSL`, zod schemas, defaults, normalization, and lowering before
  adding UI or app affordances.
- Treat Builder as the mutation boundary. Use `VBIChartBuilder`,
  `VBIReportBuilder`, `VBIInsightBuilder`, and feature sub-builders such as
  `measures`, `dimensions`, `whereFilter`, `havingFilter`, `theme`, `locale`,
  `limit`, and `page`.
- Do not hand-write internal DSL mutations in UI, CLI, agent, Provider, or app
  code when a Builder or public package API exists.
- Prefer composition over expansion. Add cohesive sub-builders, node builders,
  modules, pipeline stages, adapters, or resource stores instead of growing a god
  Builder or coupling unrelated features.
- Keep cross-resource boundaries explicit: chart owns chart configuration,
  query, and seed lowering; insight owns semantic content; report owns page
  structure and references.

## Change Shape

When adding or changing VBI behavior, usually touch these layers in order:

1. Type/schema/defaults for the DSL.
2. Normalization or Yjs map/list helpers.
3. Builder or sub-builder mutation API.
4. Lowering pipeline or adapter, if the behavior affects query or seed output.
5. Focused tests for Builder JSON output, Yjs updates, query lowering, seed
   lowering, snapshots, and public exports as applicable.

Avoid starting from React components, page stores, or generated docs. Those are
consumers of the logic layer.

## Validation

Prefer the narrowest proving command first:

```bash
pnpm --filter @visactor/vbi run test
pnpm --filter @visactor/vbi run typecheck
pnpm --filter @visactor/vbi run lint
```

For changes that affect downstream packages, add focused validation in the
consumer package, then run repository gates from the root:

```bash
pnpm run lint:check
pnpm run typecheck
```
