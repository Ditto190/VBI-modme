---
name: development
description: >
  Use for VBI monorepo development: apps, packages, practices, website
  documentation, repository-level workflows, generated artifacts, validation
  commands, source-of-truth decisions, software entropy control,
  maintainability, refactoring, dead-code deletion, and constraining messy
  LLM-generated code.
---

# VBI Development Handbook

This is the repository-level development handbook for VBI. The main file keeps
only the core principles; load the relevant references only when changing a
specific package, practice, or software-entropy risk area.

## Entropy Budget

Every change must reduce maintenance cost or at least avoid increasing it.
Before editing, complete the following:

1. Read the relevant code and confirm ownership.
2. Explicitly list any code smells found: duplicated code, long functions, large
   files, dead exports, tight coupling, stale comments, generated files, legacy
   compatibility aliases, shotgun edits, and temporary fields.
3. Choose the smallest entropy-reducing action: delete, simplify, extract, move
   ownership, or update the source of truth and regenerate.
4. When deleting, also clean downstream references: imports, calls, types,
   comments, tests, documentation, and generated artifacts.

Prefer deleting unused paths over keeping optional branches. Do not leave
commented-out code behind. Do not add compatibility aliases without a clear
migration reason.

## Repository Ownership

Unless a package script requires otherwise, run commands from the repository root.

- `packages/vbi`: VBIChartDSL, Builder, and collaborative state.
- `packages/vquery`: VQueryDSL-to-SQL and query execution.
- `packages/vseed`: VSeedDSL-to-VChart/VTable specs.
- `packages/vbi-agent`: Builder Agent runtime and tool protocol.
- `packages/vbi-react`: React integration package.
- `apps/*`: Product applications, official website, backend, provider, and CLI.
- `practices/*`: Independent practice example applications.

If a change crosses multiple ownership boundaries, first decide whether the
boundary is wrong. Platform apps consume public package APIs; packages should not
know app, provider, page, or CLI implementation details.

## Sources of Truth

- VBIChartDSL, VQueryDSL, and VSeedDSL drive core behavior.
- Provider owns platform resource access and Builder creation.
- Builder owns DSL mutation. UI, CLI, and agent layers should call Builder or
  public package APIs instead of hand-writing internal DSL mutation logic.
- Modify the source module first. Derived documentation, tests, and build
  artifacts must be updated through the owning generator.
- Do not use hand-edited generated files as the primary fix.
- Keep each practice independent: do not import `src/*` from another practice.
- Use public package APIs or local abstractions instead of reaching into
  implementation details.

## References

Load only relevant references:

- `references/software-entropy.md`: Entropy audit workflow, VBI-specific code
  smells, and the pre-edit checklist.
- `references/vseed.md`: `packages/vseed`, VSeed examples, and generated VSeed
  documentation.
- `references/practice-minimalist.md`: `practices/minimalist`.
- `references/practice-standard.md`: `practices/standard`.
- `references/practice-streamlined.md`: `practices/streamlined`.
- `references/practice-professional.md`: `practices/professional`.

`practices/vbi-react-starter` is the `@visactor/vbi-react` package integration
starter. Treat it separately from the four self-contained practice apps.

## Validation

Repository-level gates after code changes:

```bash
pnpm run lint:check
pnpm run typecheck
```

When scripts exist in the relevant ownership scope, also run focused validation:

```bash
pnpm --filter <package-name> run test
pnpm --filter <package-name> run lint
pnpm --filter <package-name> run typecheck
```

If a change touches generated artifacts, run the generator first, then inspect
the generated diff. Clearly report any required validation that could not be run.
