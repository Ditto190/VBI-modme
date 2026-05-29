# VBI FE Agent Pi Adapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `apps/vbi_fe` Agent integration to prefer official Pi Web UI public APIs while preserving VBI resource tools, backend streaming proxy, and conversation sidebar behavior.

**Architecture:** Keep React as the host shell, Pi Web UI as the chat surface, and VBI modules as narrow adapters. Split model/config and session storage helpers out of the runtime factory so Pi-specific setup, VBI-specific tools, and UI mounting stay independently testable.

**Tech Stack:** Next.js 16, React 19, TypeScript, Pi Web UI `@earendil-works/pi-web-ui`, Pi Agent Core, `@visactor/vbi-agent`, Rstest, Docker compose frontend validation.

---

### Task 1: Move Agent Loading To Page Dynamic Boundary

**Files:**

- Modify: `apps/vbi_fe/next.config.ts`
- Modify: `apps/vbi_fe/src/app/manage/agent/page.tsx`
- Modify: `apps/vbi_fe/src/views/agent/agent-runtime.ts`
- Modify: `apps/vbi_fe/src/views/agent/agent-storage.ts`
- Modify: `apps/vbi_fe/tests/agent-storage.test.ts`

- [ ] **Step 1: Clear Next aliases**

Keep `apps/vbi_fe/next.config.ts` free of Agent-specific aliases:

```ts
turbopack: {
  resolveAlias: {},
},
```

- [ ] **Step 2: Add route-level dynamic import**

Change `apps/vbi_fe/src/app/manage/agent/page.tsx` to a small client dynamic boundary:

```ts
'use client'

import dynamic from 'next/dynamic'

const AgentPage = dynamic(() => import('../../../views/AgentPage').then((module) => module.AgentPage), {
  ssr: false,
})

const ManageAgentPage = () => <AgentPage />

export default ManageAgentPage
```

- [ ] **Step 3: Keep Pi Web UI runtime-loaded**

Use runtime dynamic imports for Pi Web UI files instead of Next aliases. If package subpath exports are unavailable, import the needed dist files by relative path from the Agent runtime module:

```ts
const [{ ChatPanel }, { VBIAgent }] = await Promise.all([
  import('../../../node_modules/@earendil-works/pi-web-ui/dist/ChatPanel.js'),
  import('@visactor/vbi-agent'),
])
```

- [ ] **Step 4: Keep storage testable without loading Pi Web UI**

Wrap Pi storage class loading in an injectable loader in `agent-storage.ts`, and have `agent-storage.test.ts` inject mock classes with `setPiWebUIStorageLoaderForTests`.

- [ ] **Step 5: Verify no Next aliases or VBI Pi aliases remain**

Run:

```bash
rg -n "@vbi/pi-web-ui|@earendil-works/pi-agent-core':|@earendil-works/pi-ai':|@visactor/vbi-agent':" apps/vbi_fe/next.config.ts apps/vbi_fe/src apps/vbi_fe/tests
```

Expected: no matches.

- [ ] **Step 6: Defer frontend validation to the final gate**

The final frontend validation sequence covers this test path. If the container
is not running, start the stack with `pnpm run vbi:dev` before running the five
Docker commands documented in `.agents/skills/development/references/apps/vbi-fe.md`.

### Task 2: Extract Agent Model Configuration

**Files:**

- Create: `apps/vbi_fe/src/views/agent/agent-model-config.ts`
- Modify: `apps/vbi_fe/src/views/agent/agent-runtime.ts`
- Modify: `apps/vbi_fe/tests/agent-runtime.test.ts`

- [ ] **Step 1: Create config helper module**

Create `apps/vbi_fe/src/views/agent/agent-model-config.ts` with the model/proxy helpers currently embedded in `agent-runtime.ts`:

```ts
import type { AgentConversationSession } from './agent-storage'

export type AgentModelInput = {
  model?: string
  provider?: string
}

const defaultAgentProvider = 'deepseek'
const defaultAgentModel = 'deepseek-v4-flash'
const defaultAgentProxyUrl = '/api/v1/agent'
const defaultContextWindowByModel: Record<string, number> = {
  'deepseek-v4-flash': 1_000_000,
  'deepseek-v4-pro': 1_000_000,
}
const defaultMaxTokensByModel: Record<string, number> = {
  'deepseek-v4-flash': 384_000,
  'deepseek-v4-pro': 384_000,
}

export const resolveAgentModelInput = (input: AgentModelInput = {}) => {
  const provider = input.provider?.trim() || defaultAgentProvider
  const model = input.model?.trim() || defaultAgentModel
  if (provider === 'deepseek' && model === 'deepseek-chat') return { provider, model: 'deepseek-v4-flash' }
  if (provider === 'deepseek' && model === 'deepseek-reasoner') return { provider, model: 'deepseek-v4-pro' }
  return { provider, model }
}

export const resolveAgentProxyUrl = (value: string | undefined) =>
  (value?.trim() || defaultAgentProxyUrl).replace(/\/+$/, '')

export const createAgentModel = ({ provider, model }: Required<AgentModelInput>) => ({
  id: model,
  name: model,
  api: 'openai-completions',
  provider,
  baseUrl: '',
  reasoning: true,
  thinkingLevelMap: {},
  input: ['text' as const],
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
  contextWindow: defaultContextWindowByModel[model] ?? 0,
  maxTokens: defaultMaxTokensByModel[model] ?? 0,
})

const readPositiveNumber = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0

export const resolveAgentModel = (
  loadedModel: AgentConversationSession['model'] | undefined,
  input: Required<AgentModelInput>,
) => {
  const defaults = createAgentModel(input)
  if (!loadedModel) return defaults

  return {
    ...defaults,
    ...loadedModel,
    contextWindow: readPositiveNumber(loadedModel.contextWindow) || defaults.contextWindow,
    maxTokens: readPositiveNumber(loadedModel.maxTokens) || defaults.maxTokens,
  }
}
```

- [ ] **Step 2: Update runtime to import helpers**

In `agent-runtime.ts`, remove the moved constants/functions and import:

```ts
import {
  resolveAgentModel,
  resolveAgentModelInput,
  resolveAgentProxyUrl,
  type AgentModelInput,
} from './agent-model-config'
```

Re-export `AgentModelInput`, `resolveAgentModelInput`, and `resolveAgentProxyUrl` only if existing tests or callers still import them from `agent-runtime.ts`.

- [ ] **Step 3: Keep runtime tests stable**

If `apps/vbi_fe/tests/agent-runtime.test.ts` imports helpers from `agent-runtime.ts`, update it to import from `agent-model-config.ts`:

```ts
import { resolveAgentModelInput, resolveAgentProxyUrl } from '../src/views/agent/agent-model-config'
```

- [ ] **Step 4: Defer frontend validation to the final gate**

The final frontend validation sequence covers this test path.

### Task 3: Tighten Runtime Factory Responsibilities

**Files:**

- Modify: `apps/vbi_fe/src/views/agent/agent-runtime.ts`
- Modify: `apps/vbi_fe/tests/agent-page.test.tsx`

- [ ] **Step 1: Keep `agent-runtime.ts` limited to runtime creation**

After Task 2, verify `agent-runtime.ts` only owns:

```ts
export type AgentChatPanelRuntime = {
  agent: VBIAgent
  conversationId: string
  destroy(): void
  persist(): Promise<AgentConversationMetadata>
  panel: HTMLElement
}
```

and `createAgentChatPanel`.

- [ ] **Step 2: Preserve Pi `ChatPanel.setAgent()` ownership**

Keep tools registration inside official `setAgent`:

```ts
await panel.setAgent(agent, {
  onBeforeSend: async () => notify('running'),
  onApiKeyRequired: async () => true,
  toolsFactory: () => baseTools,
})
```

Do not set Pi artifacts tools manually outside `ChatPanel`.

- [ ] **Step 3: Keep React host unaware of storage internals**

`AgentPage.tsx` should continue passing a `PiAgentStorage` object into `createAgentChatPanel` and only receive `persist`, `panel`, `agent`, and `destroy`.

- [ ] **Step 4: Defer frontend validation to the final gate**

The final frontend validation sequence covers this React test path.

### Task 4: Add Stream Proxy Regression Tests

**Files:**

- Create: `apps/vbi_fe/tests/agent-stream-proxy.test.ts`
- Modify: `apps/vbi_fe/src/views/agent/agent-stream-proxy.ts`

- [ ] **Step 1: Test the SSE bridge end to end**

Prefer testing `streamProxy` end-to-end with a mocked `fetch` response stream. The stream should pass through
native `AssistantMessageEvent` payloads from SSE without a custom event conversion layer.

- [ ] **Step 2: Add stream pass-through test**

Create a test that feeds native SSE chunks for `start`, `text_start`, `text_delta`, `text_end`, and `done`, then asserts the final message content and usage.

```ts
expect(events.at(-1)).toMatchObject({
  type: 'done',
  message: {
    role: 'assistant',
    content: [{ type: 'text', text: 'hello' }],
    stopReason: 'stop',
  },
})
```

- [ ] **Step 3: Add error/abort test**

Mock a failed fetch response and assert the stream emits an error assistant message:

```ts
expect(events.at(-1)).toMatchObject({
  type: 'error',
  reason: 'error',
  error: {
    role: 'assistant',
    stopReason: 'error',
  },
})
```

- [ ] **Step 4: Defer frontend validation to the final gate**

The final frontend validation sequence covers this test path.

### Task 5: Dependency Latest Check And Lockfile Discipline

**Files:**

- Modify only if needed: `apps/vbi_fe/package.json`
- Modify only if needed: `pnpm-lock.yaml`

- [ ] **Step 1: Check latest Pi package versions**

```bash
npm view @earendil-works/pi-agent-core version
npm view @earendil-works/pi-ai version
npm view @earendil-works/pi-web-ui version
```

Expected on 2026-05-26:

```text
@earendil-works/pi-agent-core 0.75.5
@earendil-works/pi-ai 0.75.5
@earendil-works/pi-web-ui 0.75.3
```

- [ ] **Step 2: Compare with frontend package**

If `apps/vbi_fe/package.json` already pins those versions, do not modify dependencies or lockfile.

- [ ] **Step 3: Update only if npm latest is newer**

If newer versions exist, run dependency update through the package manager from repo root and inspect `apps/vbi_fe/package.json` plus `pnpm-lock.yaml`:

```bash
pnpm --filter @visactor/headless-bi-fe add @earendil-works/pi-agent-core@latest @earendil-works/pi-ai@latest @earendil-works/pi-web-ui@latest
```

Expected: only Pi package entries and lockfile entries change.

### Task 6: Final Docker Validation

**Files:**

- No source edits.

- [ ] **Step 1: Run final frontend validation**

Run the five Docker commands documented in
`.agents/skills/development/references/apps/vbi-fe.md`.

Expected: `lint`, `format`, `typecheck`, `test`, and `build` all PASS.

- [ ] **Step 4: Inspect diff**

```bash
git status --short
git diff -- apps/vbi_fe docs/superpowers/plans/2026-05-26-vbi-fe-agent-pi-adapter.md
```

Expected: changes are limited to Agent integration, tests, plan docs, and optional Pi dependency updates.
