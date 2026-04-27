---
name: hypothesis-loop
description: Use when the user asks for analysis that should iterate through multiple hypotheses, experiments, and validation instead of jumping to one answer.
version: 1.0.0
tags:
  - analysis
  - hypothesis
tools:
  - vbi_experiment
  - vbi_builder
capabilities:
  - design ranked hypothesis batches
  - run evidence-based Builder experiments
  - classify experiment results as supported, rejected, or inconclusive
references:
  - experiment-design
  - validation-rubric
---

# Hypothesis Loop

Use this skill when a data-analysis or builder-analysis task needs several candidate explanations before changing DSL.

## Goal

Keep the agent inside a tight loop:

1. state multiple plausible hypotheses
2. rank them by expected value and cost
3. run small experiments in batch
4. validate by inspecting DSL or experiment output
5. keep, reject, or refine hypotheses

## Rules

- Never start with a single explanation when several plausible causes exist.
- Prefer 2-4 hypotheses that are mutually distinguishable.
- Each experiment must test one hypothesis directly.
- Validate through `build()`, `buildVQuery()`, `buildVSeed()`, or explicit experiment result fields.
- Opening a resource does not imply saving it. Default to read or transient mutation, then inspect DSL.
- Mark each hypothesis as `supported`, `rejected`, or `inconclusive`.
- If all hypotheses are weak, generate the next smaller batch instead of forcing a conclusion.

## Workflow

1. Restate the user question as an analysis target and success condition.
2. List candidate hypotheses with expected signal.
3. Read `experiment-design` before writing a non-trivial batch.
4. Run `vbi_experiment` with one experiment per hypothesis.
5. Read `validation-rubric` when evidence is mixed or contradictory.
6. Return the surviving hypotheses, rejected hypotheses, and the next best experiment if needed.

## Tool Contract

Use `vbi_experiment` for batch work.

Each experiment should return `json({ verdict, evidence, artifacts, nextStep })`.

- `verdict`: `supported` | `rejected` | `inconclusive`
- `evidence`: short explanation grounded in DSL or output
- `artifacts`: optional structured snippets such as chart DSL, query DSL, seed DSL, counts, or field lists
- `nextStep`: optional follow-up experiment

Read only the references needed for the current task.
