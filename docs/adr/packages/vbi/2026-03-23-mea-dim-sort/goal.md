Generate an architecture decision record named `./adr.md`.

Planned `packages/vbi` development tasks:

[] Measures and dimensions should support sorting. Design the appropriate VBI DSL, then update `buildVQuery` so queries fetch data correctly.
[] If no dimension or measure has explicit sorting configured, `buildVQuery` should sort by the first dimension by default. This may change unit tests; it is acceptable to run `pnpm g` to regenerate generated tests and snapshots. This is an allowed breaking change.
[] If any measure or dimension has sorting configured, `buildVQuery` should sort by the configured sort fields and ignore the default sorting logic.
