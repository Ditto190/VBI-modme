# Software Entropy Control

Use this reference when a task involves maintainability, refactoring, cleanup,
constraining LLM-generated code, or any change that could expand VBI's long-term
maintenance surface.

## VBI Entropy Sources

These are risk signals, not automatic defects:

- Generated files can hide true ownership. Examples, documentation, API pages,
  and aggregate tests must trace back to source types, examples, or generators.
- Large files concentrate behavioral knowledge. Current hotspots include VSeed
  lowering/sandbox code, large data files in website guides, large generated
  example tests, and dense UI panels in `practices/standard`.
- Legacy and TODO paths are mostly concentrated in DSL compatibility, filters,
  axes, selector APIs, and demo drag/drop payloads.
- Cross-layer shortcuts are expensive: packages depending on app behavior, UI
  rebuilding Builder internals, or practices sharing private `src/*` all increase
  change cost.
- LLM output tends to add parallel abstractions instead of reusing Builder,
  Provider, DSL, local connectors, or existing utilities inside a practice.

## Pre-Edit Checklist

Before changing code, briefly write down these conclusions:

- Owner: package, app, practice, generator, or docs.
- Source of truth: DSL type, Builder method, Provider API, example JSON,
  generator script, or local utility.
- Code smells: duplicated code, long methods, large components, dead exports,
  stale comments, temporary fields, long parameter lists, data clumps, tight
  coupling, and shotgun edits.
- Generated surface: which files must be regenerated instead of manually patched.
- Deletion impact: imports, calls, exports, tests, documentation, comments, and
  generated references that must be removed at the same time.
- Validation: repository gates, plus focused tests or generators in the owning
  scope.

## VBI Antipatterns

- Using hand-edited generated website docs, generated API pages, or generated
  example tests as the primary fix.
- Adding compatibility aliases without a date, migration reason, and narrow test
  protection.
- Letting `packages/*` import `apps/*`, practice code, page stores, CLI adapters,
  provider internals, or test helpers.
- Letting one practice import another practice's `src/*`; either copy the idea
  into a local utility or move the reusable API up into a package.
- UI code bypassing Builder or public package APIs and rebuilding VBIChartDSL,
  VQueryDSL, or VSeedDSL mutations by hand.
- Passing broad prop bags through the UI layer instead of expressing data
  boundaries with hooks, store selectors, or small local objects.
- Keeping commented-out code, unused style classes, dead tests, or stale
  documentation after deleting an implementation.

## Refactoring Rules

- Follow first principles and produce intuitive designs and implementations.
- Follow the small-function, small-file principle: keep individual files under
  100 lines and individual functions under 50 lines.
- Long Method: split methods/functions once they exceed 30-40 lines.
- Large Class/God Class: split any class or module that owns too many
  responsibilities.
- Once a code smell is found, refactor or delete decisively. When deleting, clean
  all related references at the same time, including imports, function calls,
  variable references, type definitions, comments, tests, documentation, and
  other downstream impact. Do not leave orphaned code or dead references.
- Common code smell to internalize and actively detect: Duplicated Code. If the
  same or highly similar logic appears more than once, extract it into a
  function, utility, or component.
- After refactoring, code must be simpler, more readable, and more focused in
  responsibility. Follow the Single Source of Truth principle: VBIChartDSL,
  VQueryDSL, and VSeedDSL drive core functionality.
- Tight Coupling: modules should not directly depend on concrete
  implementations; use interfaces or dependency injection instead.
- Redundant Comments: delete comments when the code itself communicates the
  meaning.
- Dead Code: delete anything that is not called, imported, or used by tests.
- Long Parameter List: use an object or configuration object once a function has
  more than 4-5 parameters.
- Data Clumps: variables that always appear together should be wrapped in a class
  or object.
- Temporary Field: refactor fields that are used only in some circumstances.
- Inappropriate Intimacy: modules should not know too much about each other's
  internals.
- Divergent Change / Shotgun Surgery: if one change requires edits in many
  places, module boundaries likely need to be redrawn.
- Before every change, scan the code and list all code smells found.
- During refactoring, prefer deletion over "keep it but comment it out."
- After deletion, verify that the code still compiles/runs and behavior is
  unchanged or improved.
- In output, provide only the final clean code plus a short necessary note about
  which code smells were removed.
- Do not use indecisive language such as "could keep it," "depends," or "for
  compatibility" without a concrete migration reason.

Remember: Excellent code is not merely written; it is carved down. Be brave enough to delete code. Extreme simplicity is the highest standard.

## Validation

Entropy-reduction work must prove both "it was deleted" and "behavior remains
correct":

- Use `rg` to check deleted symbols, old names, TODO markers, compatibility
  aliases, and deleted file names.
- When source changes affect generated files, run the generator before
  repository gates.
- Run focused tests in the owning scope first, then run `pnpm run lint:check` and
  `pnpm run typecheck`.
- Even for Markdown-only changes, run repository gates unless the user explicitly
  narrows the validation scope.
