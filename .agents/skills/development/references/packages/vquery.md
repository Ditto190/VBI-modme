# VQuery Development Reference

`packages/vquery` owns QueryDSL-to-SQL compilation and query execution.

- `src/types/dsl/*`: public QueryDSL shape.
- `src/sql-builder/*`: Kysely SQL compilation with stable inline SQL snapshots.
- `src/data-source-builder/*` and `src/dataset/*`: source metadata to DuckDB
  query surfaces.
- `src/adapters/*`: QueryAdapter and StorageAdapter runtime isolation.
- `src/node.ts` and `src/browser.ts`: public runtime entrypoints.

## Tests

Behavior changes need focused tests first. SQL builder behavior belongs in
`tests/unit/sql-builder/**`; DSL examples are paired `.json` and `.test.ts`
files under `tests/examples/**`; dataset, adapter, and VQuery lifecycle tests
belong in `tests/unit/**` near the owned module.

After example JSON changes, run `pnpm --filter @visactor/vquery run g`.

## Validation

```bash
pnpm --filter @visactor/vquery run test
pnpm --filter @visactor/vquery exec rstest --coverage
pnpm --filter @visactor/vquery run typecheck
```

Do not lower coverage thresholds, exclude newly touched source, or leave
QueryDSL/runtime branches untested.
