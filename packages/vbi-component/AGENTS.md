# AGENTS.md

This file adds package-specific guidance for `packages/vbi-component`.

Repository-level development rules still come from the root `AGENTS.md` and
`.agents/skills/development/SKILL.md`. This file only adds local routing for
Web Awesome usage in this package.

## Web Awesome AI Reference

When a task in `packages/vbi-component` involves `@awesome.me/webawesome`,
`wa-*` components, Web Awesome theming, `::part(...)`, or `--wa-*` tokens, find
the installed Web Awesome package under `node_modules/.pnpm/` and read the
packaged AI skill first:

- `node_modules/.pnpm/@awesome.me+webawesome@*/node_modules/@awesome.me/webawesome/dist/skills/webawesome/SKILL.md`

Then read only the specific reference files you need under:

- `node_modules/.pnpm/@awesome.me+webawesome@*/node_modules/@awesome.me/webawesome/dist/skills/webawesome/references/`

If a broad text reference is more useful than the skill format, use:

- `node_modules/.pnpm/@awesome.me+webawesome@*/node_modules/@awesome.me/webawesome/dist/llms.txt`

## Local Constraints

- Prefer the packaged Web Awesome references above as the source of truth for
  component APIs and imports.
- Keep `vbi-*` elements as the package's default public API unless the task
  explicitly asks for a migration to `wa-*`.
