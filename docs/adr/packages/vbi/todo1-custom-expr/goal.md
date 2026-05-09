------
status: in-progress
---

---

Generate an architecture decision record named `./adr.md`.

Planned `packages/vbi` development tasks:

[] Ensure `docs/adr/packages/vquery/2026-03-22-custom-expr` has already been completed.
[] Add calculated fields to `packages/vbi`. For example, `sales` (revenue) minus `profit` can produce a `cost` field. To support this, the VBIChartDSL data connector needs to support user-defined fields. This may require changes to `discoverSchema` so each field can carry an `expr`; the expression style should follow DuckDB.
[] Align `vbidsl` with the `vquery` design and place the new structure in the appropriate part of `vbidsl`.
[] Update `buildVQuery` to support the new structure.
[] After the design is complete, follow TDD: write failing tests first, then implement the feature until all tests pass.
[] The generated SQL is expected to change substantially, so some breaking change is allowed, such as changed SQL text. Query results in examples must remain the same as before.
[] Ensure `vquery` and `vbi` `lint`, `typecheck`, `g`, and `test` all pass.
[] Ensure repository-level `typecheck` and `test` pass completely.
