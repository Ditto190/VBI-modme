# VQuery Development Reference

`packages/vquery` owns VQueryDSL-to-SQL compilation and query execution. Keep the
package small and layered:

- `src/types/dsl/*` defines the public DSL shape.
- `src/sql-builder/*` compiles DSL with Kysely and inlines parameters for stable
  SQL snapshots.
- `src/dataset/*` connects stored dataset metadata to DuckDB views.
- `src/adapters/*` isolates runtime details: QueryAdapter executes DuckDB work;
  StorageAdapter stores dataset schemas and sources.
- `src/node.ts` and `src/browser.ts` are the public runtime-specific entrypoints.

## Development Rules

Use TDD for every behavior change. Add or update the focused failing test first,
then implement the smallest source change that makes it pass.

Preserve the existing test shape:

- SQL builder behavior belongs in `tests/unit/sql-builder/**` with inline SQL
  snapshots.
- End-to-end DSL examples belong in `tests/examples/**` as paired `.json` and
  `.test.ts` files. Run `pnpm --filter @visactor/vquery run g` after adding or
  changing example JSON so generated tests, docs, and snapshots stay aligned.
- Dataset, adapter, and VQuery lifecycle behavior belongs in `tests/unit/**`
  close to the owned source module.

Maintain 100% line, statement, and function coverage. Before finishing VQuery
work, run:

```bash
pnpm --filter @visactor/vquery run test
pnpm --filter @visactor/vquery exec rstest --coverage
pnpm --filter @visactor/vquery run typecheck
```

Do not lower coverage thresholds, exclude newly touched source, or accept
untested branches as a shortcut. If a branch exists only for runtime adaptation,
cover it with focused adapter tests or explain why it cannot be covered in the
current environment.
