# VBI Frontend

## Quick Start

`apps/vbi_fe` is the Next.js frontend for the VBI console. Runtime commands are
owned by the repository Docker workflow.

From the repository root:

```bash
pnpm run vbi:dev:build
```

The frontend is served at `http://localhost:3000` by default.

## Validation

Run final frontend validation with the five Docker commands documented in
`.agents/skills/development/references/apps/vbi-fe.md`.
