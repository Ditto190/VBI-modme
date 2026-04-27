# Validation Rubric

Use these verdicts consistently:

- `supported`: the observed DSL or output matches the hypothesis signal
- `rejected`: the observed DSL or output contradicts the hypothesis
- `inconclusive`: the experiment ran, but the evidence does not separate causes enough

## Evidence Rules

- Cite the field, node, filter, encoding, query fragment, or seed fragment that justified the verdict.
- Do not claim `supported` when the result only shows correlation.
- If a mutation changes several things at once, downgrade to `inconclusive`.

## Next Loop

After a batch:

1. keep supported hypotheses
2. delete rejected hypotheses
3. split inconclusive hypotheses into smaller checks

Stop only when one of these is true:

- a hypothesis is sufficiently supported for the user task
- the remaining uncertainty is explicit and bounded
- no useful cheaper experiment remains
