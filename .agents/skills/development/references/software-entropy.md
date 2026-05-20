# Software Entropy Control

Use this reference for maintainability, refactoring, cleanup, generated-surface
control, and any change that could expand VBI's long-term maintenance cost.

Good code is carved down through repeated, deliberate refinement: use real needs
to drive abstraction, deletion to fight entropy, and naming and boundaries to
make code explain itself.

## Entropy Signals

Treat these as risk signals to inspect, not automatic defects:

- Generated files as the fix source instead of the generated output.
- Large files or methods concentrating unrelated behavior.
- Legacy branches, TODO paths, compatibility aliases, and stale comments.
- Cross-layer shortcuts: packages depending on apps, UI rebuilding Builder
  internals, or practices importing another practice's `src/*`.
- Broad objects passed where a narrow capability or interface is enough.
- LLM-style parallel abstractions that ignore existing Builder, Provider, DSL,
  connector, or local utility boundaries.

## Optimization Habits

- Question whether an existing design is necessary before preserving it.
- Delete or inline abstraction that does not remove concrete complexity.
- Let abstractions emerge from stable repetition, not imagined flexibility.
- Make names match true semantic scope; avoid broad names for narrow work.
- Split files by domain, builder type, or ownership boundary when concerns mix.
- Invert dependencies to the smallest interface needed by the caller.
- Keep APIs direct; avoid callbacks, fallbacks, generics, or configuration layers
  unless they make real behavior simpler.
- Refine boldly: change, delete, and reshape code until intent is direct.

## Pre-Edit Questions

Before changing code, identify:

- Owner: package, app, practice, generator, or docs.
- Source of truth: DSL type, Builder method, Provider API, example JSON,
  generator script, or local utility.
- Smells: duplication, long method, large file, dead export, stale comment,
  temporary field, long parameter list, data clump, tight coupling, shotgun edit.
- Generated surface: what must be regenerated instead of hand-patched.
- Deletion impact: imports, calls, exports, tests, docs, comments, and generated
  references that must be removed together.
- Validation: focused owner checks plus repository gates when practical.

## Refactoring Actions

- Prefer deletion, simplification, extraction, or moving ownership over adding
  new compatibility layers.
- Clean all downstream references when deleting; leave no orphaned imports,
  calls, types, comments, tests, or docs.
- Split long methods around 30-40 lines and keep files focused; small files are
  preferred when they map to real ownership.
- Extract duplicated logic only when the shared behavior is stable and named by
  a real concept.
- Replace tight concrete dependencies with small interfaces or dependency
  injection.
- Delete redundant comments when code and names communicate the same meaning.
- Replace long parameter lists or repeated data clumps with a small object.
- Redraw boundaries when one change causes shotgun edits across many modules.
- Do not use "compatibility" or "depends" as a reason without a concrete
  migration need.

## VBI Boundaries

- VBIChartDSL, VQueryDSL, and VSeedDSL are core sources of truth.
- Builder owns DSL mutation. UI, CLI, agent, and app code should use Builder or
  public package APIs instead of hand-writing internal mutations.
- Provider owns platform resource access and Builder creation.
- Practices must stay independent; move reusable behavior into a package or a
  local utility instead of importing another practice's private source.

## Validation

Entropy-reduction work must prove both "it was removed" and "behavior remains
correct":

- Use `rg` for deleted symbols, old names, TODO markers, compatibility aliases,
  and deleted file names.
- Run generators before checks when source changes affect generated files.
- Run focused tests in the owning scope first, then `pnpm run lint:check` and
  `pnpm run typecheck` when available.
- Report any validation that could not run and why.
