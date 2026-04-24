# vbi_cli

Agent-first CLI for VBI workspace tasks.

## Usage

Set `AGENT_API_KEY` to use the TUI.
`vbi_cli` will automatically read the repository root `.env` if those variables are defined there.

```bash
pnpm --filter=vbi_cli run build
node apps/vbi_cli/dist/cli.js
node apps/vbi_cli/dist/cli.js -t "inspect the current workspace"
```

## Commands

```bash
vbi
vbi -t "fix failing tests in vbi_cli"
vbi --model deepseek-reasoner --cwd ./apps/vbi_cli -t "summarize this package"
```

Running `vbi` immediately opens the agent TUI. The old direct `chart`, `insight`, and `report` JSON commands have been removed.

## Agent TUI

The TUI uses a minimal teaching-oriented loop with two tools:

- `bash`: runs one shell command in a fresh process
- `vbi_code`: runs JavaScript against live providers so the model can `open()` builders, inspect resource ids through `client`, and call builder APIs directly

The runtime is intentionally small:

- one model turn can either call one tool or answer directly
- the TUI shows the transcript and any error message
- builder work should go through `vbi_code`

Environment:

```bash
export AGENT_API_KEY=...
export AGENT_MODEL=deepseek-chat
export AGENT_BASE_URL=https://api.deepseek.com
```

You can also put them in the repo root `.env`:

```bash
AGENT_API_KEY=...
VBI_API_BASE_URL=http://localhost:3030/api/v1
AGENT_MODEL=deepseek-chat
AGENT_BASE_URL=https://api.deepseek.com
```

Keys:

- `Enter`: send a task or follow-up
- `Esc`: clear current input
- `q`: quit

Example `vbi_code` payload shape:

```json
{
  "resource": "chart",
  "resourceId": "chart-123",
  "code": "const { builder } = await vbi.openChart(resourceId); vbi.changeChartType(builder, 'line'); return json(vbi.getChartState(builder));"
}
```
