# vbi_cli

CLI shell for VBI Agent workflows.

The reusable runtime and Builder tools live in `packages/vbi-agent`. This app wires them to:

- DeepSeek model provider
- Ink TUI
- local bash tool
- `@visactor/headless-bi-provider`
- CLI-only resource tools

## Usage

```bash
pnpm --filter=vbi_cli run build
node apps/vbi_cli/dist/cli.js --chart-id <chart-id> -t "turn this chart into a line chart"
node apps/vbi_cli/dist/cli.js --report-id <report-id>
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
- `--chart-id`: chart builder exposed to `vbi_builder`
- `--report-id`: report builder exposed to `vbi_builder`

Tools:

- `bash`: CLI-only shell command runner
- `vbi_builder`: runs JavaScript against the injected Builder workspace
- `how_to_use_vbi_builder`: returns the Builder scripting guide
- `vbi_resource`: CLI-only resource CRUD and report page operations
