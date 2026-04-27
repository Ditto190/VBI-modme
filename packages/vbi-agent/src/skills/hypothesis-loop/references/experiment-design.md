# Experiment Design

## Hypothesis Shape

Use concise hypotheses with three parts:

- `claim`: what may be true
- `signal`: what observable output should change
- `risk`: what could make the signal misleading

## Batch Design

For each hypothesis, prepare one experiment object:

```json
{
  "hypothesis": "measure encoding is wrong",
  "goal": "check whether the builder is using yAxis for sales",
  "code": "const b = await chart.open(); return json({ verdict: 'supported', evidence: '...', artifacts: { dsl: b.build() } })"
}
```

Guidelines:

- Keep each script narrow and independent.
- Inspect current DSL before mutating it.
- Prefer checking `buildVQuery()` or `buildVSeed()` when the hypothesis concerns lowering or rendering.
- Return only the smallest artifact needed to judge the hypothesis.

## Ranking

Run highest-value hypotheses first:

1. low-cost checks on current DSL
2. one-step mutations with immediate inspection
3. deeper experiments that depend on earlier evidence
