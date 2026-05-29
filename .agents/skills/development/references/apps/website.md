# Website

Reference for `apps/website`: Rspress docs, generated API/example docs, and
locale synchronization.

## Ownership

- App/config/docs: `apps/website`, `apps/website/rspress.config.ts`,
  `apps/website/docs`.
- Chinese docs are the authority: `apps/website/docs/zh-CN/**`.
- Mirrored locales: `en-US`, `ja-JP`, `de-DE`, `id-ID`, `fr-FR`, `ko-KR`,
  `vi-VN`.

Update or regenerate `zh-CN` first. Non-Chinese locales follow the `zh-CN`
directory structure and content intent; never use another locale as the source
of truth.

## Generated Docs

Generated docs are outputs. When package APIs, examples, or generated pages need
refresh, run:

```bash
pnpm g
```

Inspect the generated diff before manual edits. If a generated page is wrong,
fix the owning source or generator.

## Locale Sync

Work one file at a time against `zh-CN`; update only missing or stale content.
Translate prose only. Keep frontmatter, code blocks, links, imports, components,
example identifiers, API names, package names, paths, option keys, and
executable code aligned with `zh-CN`.

Do not use translation services or subagents for translation review or sync.

## Validation

```bash
pnpm --filter=website run typecheck
pnpm --filter=website run lint
pnpm --filter=website run build
```

For markdown/MDX-only sync, run the smallest useful subset and report skipped
validation.
