---
name: vseed-development
description: >
  Use when working on @visactor/vseed: chart DSL types, VSeed examples,
  generated docs/API/test files, chart pipelines, feature examples, or any task
  that must preserve the VSeed source-to-docs generation workflow.
---

# VSeed Development

Use this skill for changes under `packages/vseed`, VSeed examples, or generated VSeed documentation in the website.

## Source Of Truth

VSeed follows a source-first workflow:

- DSL/types live in `packages/vseed/src/types/**`.
- Runnable examples live in `packages/vseed/tests/examples/**`.
- Generated tests live beside those examples as `*.test.ts`.
- Generated website docs live under `apps/website/docs/zh-CN/vseed/**`.
- Generated API docs are produced by `packages/vseed/scripts/build-api.mjs`.

Do not hand-edit generated website VSeed docs or generated example test files as the primary fix. Update the source type/example first, then regenerate.

## Standard Workflow

Run all `pnpm` commands from the repository root.

1. Add or update VSeed source:
   - For behavior: update `packages/vseed/src/**`.
   - For public DSL: update `packages/vseed/src/types/**`.
   - For examples: update `packages/vseed/tests/examples/**`.
2. Add examples before or with implementation when a feature changes user-facing DSL.
3. Run:

```bash
pnpm --filter @visactor/vseed g
```

This runs `build:test`, `build:docs`, `build:examples`, and `build:api`, regenerating tests, option docs, example docs, and API docs.

4. Verify the package:

```bash
pnpm --filter @visactor/vseed run test
pnpm --filter @visactor/vseed run typecheck
pnpm --filter @visactor/vseed run lint
```

For narrow example-only changes, at minimum run the affected generated test file.

## Examples

Add VSeed examples under:

- `packages/vseed/tests/examples/chartType/<chartType>/*.json` for chart type examples.
- `packages/vseed/tests/examples/features/<feature>/*.json` for feature examples.

Every example JSON must include:

- `name`
- `description`
- `vseed`

`pnpm --filter @visactor/vseed run build:examples` reads those JSON files and generates MDX examples into:

```text
apps/website/docs/zh-CN/vseed/examples
```

`pnpm --filter @visactor/vseed run build:test` also regenerates aggregated example tests such as:

```text
packages/vseed/tests/examples/chartType/chartType.test.ts
packages/vseed/tests/examples/features/features.test.ts
```

After adding a JSON example, do not manually wire imports in the generated test unless the generator itself is broken.

## Types And Docs

Public chart DSL types must be documented enough for `build:docs` to generate correct website option pages.

When editing `packages/vseed/src/types/chartType/**`:

- Keep the chart interface name aligned with the directory/file convention when possible, for example `column/column.ts` exports `Column`.
- Use clear JSDoc on public properties.
- Include `@description`, `@example`, and relevant domain notes when a property is user-facing.
- Ensure referenced property types are exported from the type tree so the generator can resolve them.
- Avoid duplicating generated docs by editing `apps/website/docs/zh-CN/vseed/option/*.md` directly.

`pnpm --filter @visactor/vseed run build:docs` generates option docs from TypeScript interfaces into:

```text
apps/website/docs/zh-CN/vseed/option
```

## Generation Discipline

Use the full generator after VSeed DSL, examples, docs, or API-facing changes:

```bash
pnpm --filter @visactor/vseed g
```

Review generated diffs before finishing. Expected generated changes often include:

- `packages/vseed/tests/**/**/*.test.ts`
- `apps/website/docs/zh-CN/vseed/examples/**`
- `apps/website/docs/zh-CN/vseed/option/**`
- generated API docs

If generation changes unrelated files that were already dirty or staged, do not revert them blindly. Identify whether they came from the generator and report the scope clearly.

## Quality Gate

Before delivery, check:

- New user-facing DSL has an example under `tests/examples`.
- Type definitions generate readable option docs.
- `pnpm --filter @visactor/vseed g` has been run when generation is relevant.
- A focused VSeed test or full `pnpm --filter @visactor/vseed run test` passes.
- Changes preserve Single Source of Truth: types and examples drive generated docs/tests.
