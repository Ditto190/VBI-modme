# 4. Data Flow and AI Usage Boundaries

## Complete Data Flow

```
User interaction (drag/input)
  -> VBIChartBuilder (VBI spec; AI operates at this layer)
      |-> buildVQuery() (generates query DSL)
      |-> connector.query() (runs SQL and fetches data)
      `-> buildVSeedDSL() (assembles the intermediate VSeed artifact)
  -> VSeed (internal intermediate artifact)
  -> VSeedBuilder.from(vseed).build() (handled by VSeedBuilder)
  -> VChart / VTable Spec
  -> Browser rendering
```

## AI Usage Boundaries

AI normally operates on the VBI + VBI-react layers. The following layers are not
direct UI authoring surfaces, but agents must understand their contracts when
building complete UIs or debugging chart correctness:

| Layer        | Package                          | Description                                                                                                    |
| ------------ | -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Query layer  | `@visactor/vquery`               | Called automatically inside VBI; agents do not hand-write SQL, but must preserve queryDSL and alias contracts. |
| Render layer | `@visactor/vseed`                | Called automatically inside VBI; agents do not build specs manually, but must implement VSeedRender correctly. |
| VSeedBuilder | `@visactor/vseed`                | Converts VSeed -> VChart Spec; handled internally by the framework.                                            |
| Renderer     | practices/standard's VSeedRender | Implemented by standard itself; AI does not operate on it.                                                     |

## Layer Responsibilities

### VBI Layer (AI Operates Here)

The user configures chart type, dimensions, measures, filters, and related chart settings. VBI is responsible for:

- Maintaining the chart configuration DSL as a Yjs collaborative document
- Generating the query DSL with `buildVQuery`
- Calling the connector to fetch data
- Assembling the VSeed DSL

### VQuery Layer (Automatic Internals)

JSON DSL -> SQL query, driven by `connector.query()`. This is invisible to AI.

### VSeed Layer (Automatic Internals)

Receives the VBI spec and dataset, then generates the VChart/VTable rendering configuration. This is invisible to AI.

### VSeedRender (Implemented Separately by Each Practice)

Each practice implements its own `VSeedRender` component, which reads VSeed and renders it. **It is invisible to AI and does not belong to any npm package**.

- Location: `practices/{name}/src/components/Render/VSeedRender.tsx`
- Not in the `@visactor/vbi-react` package

## VSeedRender Location

VSeed rendering is not provided by any npm package. It is **implemented independently by each practice**:

- Location: `practices/{name}/src/components/Render/VSeedRender.tsx`
- Receives `vseed: VSeed` as props
- Not in the `@visactor/vbi-react` package
- Must not be referenced across practices. For example, minimalist's VSeedRender must not be used by professional.

## Complete AI Chart Generation Flow

1. AI configures the chart through Builder APIs such as `builder.dimensions.add()` and `builder.measures.add()`.
2. The Yjs document changes automatically and triggers the `doc.on('update')` event.
3. The target practice's own VBIStore listens for the change and calls `builder.buildVSeed()` to rebuild rendering data.
4. The target practice's own `VSeedRender` component automatically renders the new chart.

AI directly participates in step 1 and implements the practice-owned plumbing
that lets steps 2-4 run. It should not hand-write SQL or VChart specs, but it
must preserve the connector/query/VSeedRender contracts documented in
`ui-design-guide/ui-generation`.
