# vbi_cli

CLI shell for VBI Agent workflows.

The reusable runtime, OpenAI-compatible model provider, and Builder tools live in `packages/vbi-agent`.
Provider workspace adapters live in `apps/vbi_provider`. This app only wires them to:

- Ink TUI
- local bash tool
- `@visactor/headless-bi-provider`
- CLI-only resource tools

## Usage

```bash
pnpm --filter=vbi_cli run build
node apps/vbi_cli/dist/cli.js -p "turn this chart into a line chart"
node apps/vbi_cli/dist/cli.js tui
```

Environment:

```bash
AGENT_API_KEY=...
AGENT_MODEL=deepseek-chat
AGENT_BASE_URL=https://api.deepseek.com
VBI_API_BASE_URL=http://localhost:3030/api/v1
```

Flags:

- `--task`: initial task
- `--model`: model override
- `--cwd`: working directory for `bash`
- `--api-base-url`: provider API base URL

Tools:

- `bash`: CLI-only shell command runner
- `vbi_builder`: runs JavaScript against the injected Builder workspace
  - workspace also exposes `workspace.connectors.register(...)` and `workspace.connectors.registerChart(...)` for connector-dependent APIs like `builder.getSchema()`
- `vbi_resource`: CLI-only resource CRUD and report page operations
- `list_skills`: lists builtin VBI Agent skills and reference metadata
- `read_skill`: reads a builtin skill, with optional references and section filters
- `search_skill_reference`: searches focused builtin skill reference sections
