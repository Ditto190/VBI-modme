------
status: in-progress
---

---

Generate an architecture decision record named `./adr.md`.

Planned `packages/vquery` development tasks:
[] `packages/vbi` plans to add calculated fields. For example, `sales` (revenue) minus `profit` can produce a `cost` field. To support this on the VQuery side, `select` needs to support custom expressions through an `expr` structure. For consistency, every field should have an `expr`, enabling consistent VQuery DSL construction. Fields with `expr` should behave like ordinary fields and be usable in `where`, `having`, `select`, `order`, and `group` clauses.
[] Design an appropriate VQuery DSL and refactor the overall structure to support custom expressions.
[] After the design is complete, follow TDD: write failing tests first, then implement the feature until all tests pass.
[] The generated SQL is expected to change substantially, so some breaking change is allowed, such as changed SQL text. Query results in examples must remain the same as before.
[] Ensure `vquery` and `vbi` `lint`, `typecheck`, `g`, and `test` all pass.
[] Ensure repository-level `typecheck` and `test` pass completely.
