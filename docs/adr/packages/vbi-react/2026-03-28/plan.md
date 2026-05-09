# Plan: VBI React Website Documentation Generation (2026-03-28, Rev.2)

- Based on: `./adr.md`
- Goal: Move `vbi-react` website documentation maintenance from manual editing to script generation plus a small set of maintained templates.

## Problem Analysis (Current State)

The API and example pages under `apps/website/docs/zh-CN/vbi-react/**` are currently maintained by hand. The main risks are:

1. Documentation can easily be missed or updated late when code exports change.
2. `_meta.json` and page filenames must be synchronized manually, which can cause navigation drift.
3. Every feature adjustment requires repeated mechanical editing, increasing review cost.
4. There is no `pnpm g` generation path aligned with `packages/vbi|vquery|vseed`.

## Start Gate

1. Documentation SSOT inputs are frozen to the following files:
   - `packages/vbi-react/package.json#exports`
   - `packages/vbi-react/src/hooks/index.ts`
   - `packages/vbi-react/src/components/index.ts`
2. Generation target paths are frozen:
   - `apps/website/docs/zh-CN/vbi-react/api/**`
   - `apps/website/docs/zh-CN/vbi-react/examples/**`
3. Scope is frozen for this phase:
   - Only add or refactor documentation generation scripts and generated documentation artifacts; do not change runtime logic.
   - The `bugserver` flow is excluded from this plan and is not a blocking item.

## Design

### Script Layout

Add the following under `packages/vbi-react/scripts/`:

1. `build-api.mjs`
   - Collect public exports from `hooks/index.ts` and `components/index.ts`.
   - Generate API pages and `api/_meta.json`.
2. `build-examples.mjs`
   - Generate example pages from fixed template sources, preferably `docs/adr/packages/vbi-react/examples-source/*.md`.
   - Generate `examples/_meta.json` consistently.
3. `build-docs.mjs`
   - Generate or correct `vbi-react/_meta.json` and section landing page links.
4. Optional: `build-all.mjs`
   - Chain API, examples, and docs generation.

### Command Integration

Add the following to `packages/vbi-react/package.json`:

1. `build:api`: `node ./scripts/build-api.mjs`
2. `build:examples`: `node ./scripts/build-examples.mjs`
3. `build:docs`: `node ./scripts/build-docs.mjs`
4. `g`: `pnpm run build:api && pnpm run build:examples && pnpm run build:docs && pnpm run format`

This keeps the package aligned with the others: after changing code, running `pnpm --filter=@visactor/vbi-react run g` completes the documentation update.

## Phased Execution

## Phase 1: Script Skeleton and Parsing

1. Create the `scripts/` directory and 3 mjs files.
2. Implement export collection logic for hook/component names and source groups.
3. Define page slug rules, such as `useVBI -> useVBI.md` and `BuilderLayout -> builderLayout.md`.

Exit Criteria:

1. A stable export list can be printed locally.
2. Running the same input twice produces the same output order.

## Phase 2: API Documentation Generation

1. Generate an API overview page grouped by hooks/components.
2. Generate an individual page for each export, including signature, purpose, and a minimal example placeholder.
3. Generate `api/_meta.json` with a stable sort order.

Exit Criteria:

1. The number of API pages matches the export list.
2. After an export is added or removed, rerunning `g` automatically updates the API pages and `_meta.json`.

## Phase 3: Examples and Section Metadata

1. Move example content sources to `docs/adr/packages/vbi-react/examples-source/`, keeping only maintained body templates there.
2. Automatically sync them to `apps/website/docs/zh-CN/vbi-react/examples/`.
3. Automatically generate `examples/_meta.json` and the root `_meta.json`, preserving the `index / examples / api` structure.

Exit Criteria:

1. Adding or renaming examples no longer requires manual `_meta.json` edits.
2. The website-side directory structure is stable and has no orphan pages.

## Phase 4: Verification and Release Gate

Default verification commands:

```bash
pnpm --filter=@visactor/vbi-react run g
pnpm --filter=website run build
pnpm run lint
```

Optional enhanced verification:

```bash
pnpm run typecheck
```

Exit Criteria:

1. All commands above pass.
2. `/vbi-react/`, `/vbi-react/api/`, and `/vbi-react/examples/` routes are accessible.
3. The documentation update flow changes from "manually edit pages" to "change source/templates, then run `pnpm g`".

## Acceptance Criteria (DoD)

1. The `@visactor/vbi-react` package has a `pnpm g` command.
2. API pages and `_meta.json` are no longer maintained manually, and their source is traceable to SSOT files.
3. Example grouping and navigation no longer require manual `_meta.json` maintenance.
4. After adding or deleting exports, running `g` once produces committable website documentation changes.

## Risks and Mitigations

1. Risk: Automatic generation overwrites high-quality hand-written descriptions.
   - Mitigation: Keep a "template body section + automatic information section" structure so the template area can be maintained manually.
2. Risk: Export renames change slugs and break old links.
   - Mitigation: Maintain `slugMap` entries from old names to new names and handle them consistently in the scripts.
3. Risk: Script evolution produces unstable output and noisy diffs.
   - Mitigation: Sort all output consistently and write it after unified formatting.

## Rollback Strategy

1. If scripts are unstable, revert the `scripts/` and `package.json` `g` changes while keeping the existing website pages.
2. If some pages are not good enough, keep the generated skeleton first, enrich templates manually, and then expand automation coverage gradually.
