# Plan: Hypothesis-Experiment-Validation Loop for `@visactor/vbi-agent`

> Based on [`./adr.md`](./adr.md)

## Goal

Add a stable analysis methodology and batch experiment capability to `@visactor/vbi-agent`, so data analysis tasks default to "propose multiple hypotheses -> run batch experiments -> inspect DSL for validation -> continue iterating".

## Scope

Includes:

- Add the built-in skill `hypothesis-loop`.
- Add the tool `vbi_experiment`.
- Update the skill registry and history prompt.
- Add tests.
- Add a package-level ADR.

Does not include:

- A higher-level planner that automatically generates experiment scripts.
- A parallel execution sandbox.
- Persisted experiment history.

## Smell Scan

1. There is a builder skill but no analysis loop skill, leaving a clear responsibility gap.
2. There is only a single-script tool and no batch experiment tool, so analysis tasks require repeated operations.
3. Validation standards are scattered, making it easy to treat natural-language judgment as evidence.

## Execution Order

1. Add the `hypothesis-loop` skill.
2. Add the `vbi_experiment` tool.
3. Update registry / history / tests.
4. Complete `docs/adr/packages/vbi-agent`.
5. Run repository-level verification.

## Acceptance

1. The Agent can read `hypothesis-loop` through `read_skill`.
2. The Agent can process multiple hypotheses in one pass through `vbi_experiment`.
3. The conclusion format includes `supported` / `rejected` / `inconclusive`.
4. `pnpm lint` and `pnpm typecheck` pass.
