# AI Reference Authoring Notes

> This directory records key findings, verification conclusions, and design decisions from the AI Reference authoring process for future maintenance.

---

## Table of Contents

| File                                                         | Content                                                              |
| ------------------------------------------------------------ | -------------------------------------------------------------------- |
| [README.md](./README.md)                                     | This document, with an overview of key points                        |
| [01-main-entry-issue.md](./01-main-entry-issue.md)           | @visactor/vbi main entry export notes                                |
| [02-hooks-signature-issue.md](./02-hooks-signature-issue.md) | VBI-react and Standard hooks have completely different signatures    |
| [03-hidden-apis.md](./03-hidden-apis.md)                     | Easy-to-miss APIs: Y.Map/Yjs, encoding queries, and node get methods |
| [04-dataflow.md](./04-dataflow.md)                           | Data flow and AI usage boundaries                                    |

---

## Quick Index

### Most Error-prone Areas

1. **Prefer the target practice's connector/bootstrap module**. Although `VBI` is exported from the main entry, each practice still implements its own initialization wiring: connector, default builder, and data source.
2. **vbi-react hooks and each practice's own hooks have the same names but are completely different**. Mixing them causes builder parameter type mismatches. Each practice should only use its own hooks from `src/hooks/`, not the `@visactor/vbi-react` package.
3. **VSeedRender is implemented independently by each practice**. It is not provided by any npm package and must not be referenced across practices.

### Source Verification Notes

- `VBIChartBuilder` -> `packages/vbi/src/chart-builder/builder.ts`
- `filter-guards` -> `packages/vbi/src/utils/filter-guards.ts`, exported from the main entry
- `vbi-react hooks` -> `packages/vbi-react/src/hooks/`
- Each practice's own hooks -> `practices/{name}/src/hooks/`, with an independent set for each practice
- `VSeedRender` -> `practices/{name}/src/components/Render/VSeedRender.tsx`, implemented independently by each practice
- connector/bootstrap module -> `practices/{name}/src/utils/{demoConnector|localConnector}.ts`, implemented independently by each practice
