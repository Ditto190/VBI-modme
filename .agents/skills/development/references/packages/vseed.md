# VSeed

`packages/vseed` owns VSeed DSL types, lowering/rendering behavior, runnable
examples, and generators for VSeed tests and website docs.

## Sources

Change the owning source first:

- Runtime/lowering: `packages/vseed/src/**`.
- Public DSL types: `packages/vseed/src/types/**`.
- Runnable examples: `packages/vseed/tests/examples/**/*.json`.
- Generators: `packages/vseed/scripts/build-*.mjs`.

Generated outputs are not primary fixes:

- `packages/vseed/tests/examples/**/*.test.ts`.
- `apps/website/docs/zh-CN/vseed/{api,examples,option}/**`.

Do not hand-edit generated docs or tests to fix behavior.

## Workflow

1. Modify source, examples, types, or the generator.
2. For user-visible DSL changes, update examples and public JSDoc together.
3. Regenerate and validate:

```bash
pnpm --filter @visactor/vseed g
pnpm --filter @visactor/vseed run test
pnpm --filter @visactor/vseed run typecheck
pnpm --filter @visactor/vseed run lint
```

When only examples change, run at least the affected generated example tests.

## Examples and Type Docs

Examples live under `tests/examples/chartType/<chartType>/*.json` and
`tests/examples/features/<feature>/*.json`; each must include `name`,
`description`, and `vseed`.

For public DSL fields in `src/types/**`, write generator-friendly JSDoc and
export referenced property types so option/API docs can resolve them.

## Generated Diff Checks

Inspect generated example tests and
`apps/website/docs/zh-CN/vseed/{api,examples,option}/**`. Fix the generator if
generated tests need manual import edits; report unrelated dirty generated scope
instead of blindly reverting.
