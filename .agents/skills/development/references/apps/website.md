# Website

Reference material for `apps/website`, the official Rspress 2 documentation
site, generated API/example documentation, and multilingual documentation
synchronization.

## Sources of Truth

- Website app: `apps/website`.
- Rspress 2 config: `apps/website/rspress.config.ts`.
- Documentation root: `apps/website/docs`.
- Chinese source documentation: `apps/website/docs/zh-CN/**`.
- Other language documentation mirrors:
  - `apps/website/docs/en-US/**`
  - `apps/website/docs/ja-JP/**`
  - `apps/website/docs/de-DE/**`
  - `apps/website/docs/id-ID/**`
  - `apps/website/docs/fr-FR/**`
  - `apps/website/docs/ko-KR/**`
  - `apps/website/docs/vi-VN/**`

For website documentation updates, the Chinese directory structure and Chinese
content are the absolute authority. Update other languages from `zh-CN`; do not
use another locale as the source of truth.

## Generated Documentation

The website uses generated API and example documentation. Run the repository
generator when source APIs, examples, or generated docs need to be refreshed:

```bash
pnpm g
```

`pnpm g` runs package-level generators and formats the repository. After it
finishes, inspect the generated diff before making manual documentation edits.
Do not treat hand-edited generated pages as the primary fix when the owning
source or generator should change.

## Multilingual Documentation Workflow

When updating website docs:

1. Update or regenerate `apps/website/docs/zh-CN/**` first.
2. Compare each non-Chinese locale against `zh-CN` and make the directory and
   file structure exactly match.
3. Work one file at a time. For each file, compare the Chinese source with the
   target locale and update only what is missing or stale.
4. If the current target file is already fully translated and structurally
   aligned, skip it.
5. Do not use translation services.
6. Do not use subagents for translation review or synchronization.

Target locales:

- `en-US`
- `ja-JP`
- `de-DE`
- `id-ID`
- `fr-FR`
- `ko-KR`
- `vi-VN`

Keep code blocks, frontmatter, links, imports, component usage, and example
identifiers semantically aligned with the Chinese source. Translate prose only;
preserve API names, package names, paths, option keys, and executable code
unless the Chinese source changed them.

## Validation

For website-only changes, prefer focused validation:

```bash
pnpm --filter=website run typecheck
pnpm --filter=website run lint
pnpm --filter=website run build
```

If a change only synchronizes markdown or MDX content, run the smallest useful
subset and report any skipped validation.
