# Discussion: Provider-Oriented Platform-Level Headless BI Decoupling

## Restating The Goal

The goal of this decoupling is not only to extract `chart / insight / report` from page logic, and not only to make REST interfaces cleaner.

The real goal should be:

1. All `Report / Insight / Chart` operations are essentially built on collaborative documents.
2. All resource operations can be called by pages, CLI, and any JS runtime.
3. Call entry points should not directly depend on pages or concrete backend interface details; they should depend on a unified Provider abstraction.
4. Provider is not merely a "connector." It is the resource capability entry point and can directly return `ReportBuilder`, `ChartBuilder`, and `InsightBuilder`.
5. The whole platform has only three first-class Providers: `ReportProvider`, `ChartProvider`, and `InsightProvider`.

The core change is:

- Previously, resources were "page driven."
- Now, resources should become "Provider driven."

Pages, CLI, Node scripts, browser sandboxes, and server-rendering environments are all only Provider consumers.

## Why The Previous Discussion Was Not Enough

The previous discussion emphasized:

- Independent resources.
- `report` only owns orchestration.
- Separation between storage layer and business layer.

All of that is correct, but still not enough, because it did not converge on a unified access point.

If the system only has:

- backend REST API
- frontend page hooks
- future CLI commands

then it can still split into three call paths:

- one for pages
- one for CLI
- one for business scripts

The eventual problem becomes "same capability, three entry points, three semantics."

To avoid this split, platform capabilities must converge on Provider.

## New Core Judgment

In the future, decide whether a capability is platformized by asking only two questions:

1. Can it be called through a Provider in any JS runtime?
2. Does it return Builder / business semantics instead of exposing low-level storage and transport details?

If not, the capability is still an application-layer capability, not a platform capability.

## Provider First Architecture Direction

### 1. Provider Is The Platform Capability Entry Point, Not A UI Helper

Provider is not a replacement for React hooks, and it is not a simple API client.

Provider should directly own these responsibilities:

- Establish backend connections.
- Open collaborative documents.
- Provide resource CRUD.
- Read resource detail.
- Obtain Builder.
- Perform structural orchestration operations.
- Provide snapshots, export, reference checks, and other capabilities.

In other words, Provider is the "resource runtime entry point."

### 2. Provider Should Unify Pages, CLI, And Any JS Runtime

The same Provider should be consumable by these entry points:

- `apps/vbi_fe`
- `apps/vbi_tui`
- Node.js scripts
- regular browser JS
- future host applications

This means Provider must not bind to React, DOM, or any concrete page state-management solution.

Provider must be a pure JavaScript / TypeScript runtime object.

### 3. Provider Is Backed By Collaboration, Not REST DTO

The resource body is a collaborative document, not JSON returned by REST.

More precisely:

- `Bytes` / Yjs update is the low-level encoding of the resource source of truth.
- Builder is the operable form of the resource source of truth.
- JSON is the business projection of the resource source of truth.

So Provider needs to center on collaboration connections rather than REST detail fetching.

REST is still needed, but its responsibilities should converge:

- list queries
- metadata queries
- command-style operations such as create and delete
- reference checks
- non-collaborative business actions

Real resource editing and continuous state synchronization should happen through the collaborative document held by Provider.

## Three First-Class Providers

This discussion recommends explicitly having only three first-class Providers:

- `ChartProvider`
- `InsightProvider`
- `ReportProvider`

Do not keep abstracting them into an overly generic `ResourceProvider<T>` as the main public model. Internal reuse is fine, but public semantics should remain clear.

The reason is simple:

- `chart`, `insight`, and `report` do not share the same operation set.
- `report` has structural orchestration responsibilities.
- `chart` has query and rendering-related capabilities.
- `insight` is a text or semantic content resource.

Forcing public unification easily produces an abstraction that appears reusable but is actually vague.

### 1. ChartProvider

Responsibilities:

- Create / delete / rename chart.
- Connect the chart collaborative document.
- Return `VBIChartBuilder`.
- Provide chart summary / detail / snapshot.
- Provide derived capabilities related to `VQuery` and `VSeed`.

Example:

```ts
const chartProvider = await platform.getChartProvider(chartId)
const chartBuilder = await chartProvider.open()
chartBuilder.chartType.changeChartType('bar')
```

### 2. InsightProvider

Responsibilities:

- Create / delete / rename insight.
- Connect the insight collaborative document.
- Return `VBIInsightBuilder`.
- Provide insight summary / detail / snapshot.

Example:

```ts
const insightProvider = await platform.getInsightProvider(insightId)
const insightBuilder = await insightProvider.open()
insightBuilder.setContent('Monthly overview')
```

### 3. ReportProvider

Responsibilities:

- Create / delete / rename report.
- Connect the report collaborative document.
- Return `VBIReportBuilder`.
- Provide page structural orchestration.
- Provide binding capabilities for child resource references.
- Provide snapshot / export capabilities.

Example:

```ts
const reportProvider = await platform.getReportProvider(reportId)
const reportBuilder = await reportProvider.open()
await reportProvider.addPage({
  title: 'Q1',
  chartId,
  insightId,
})
```

## What Provider Provides

Provider should at least provide two kinds of capabilities.

### 1. Resource Connection Capabilities

- `open()`
- `connect()`
- `disconnect()`
- `getBuilder()`
- `getSnapshot()`

This layer answers "how to connect to a resource."

### 2. Resource Operation Capabilities

- `create()`
- `delete()`
- `rename()`
- `getSummary()`
- `getDetail()`

And resource-specific operations:

- `ReportProvider.addPage()`
- `ReportProvider.removePage()`
- `ReportProvider.reorderPages()`
- `ReportProvider.bindChart()`
- `ReportProvider.bindInsight()`

This layer answers "what can be done after connecting."

## Why Builder Must Come From Provider

If Builder is still instantiated by pages themselves, or constructed independently by different entry points, three problems appear:

1. Document initialization logic is scattered.
2. Collaboration connection state is scattered.
3. Builder behavior may differ between CLI / page / script environments.

Therefore, the better direction is:

- Provider owns Builder creation.
- Consumers do not care how the underlying YDoc is restored.
- Consumers only care about obtaining an operable Builder.

That is:

- Pages obtain `builder`.
- CLI obtains `builder`.
- Regular scripts also obtain `builder`.

Builder is the unified operation surface, and Provider is the unified access surface.

## Relationship Between Pages, CLI, And Any JS Runtime

### Pages

Pages are only responsible for:

- Display.
- Interaction.
- Lifecycle management.
- Translating user actions into Provider calls.

Pages do not define resource protocols.

### CLI

CLI is only responsible for:

- Parsing commands.
- Calling Provider.
- Outputting results.

CLI should not bypass Provider directly to call a private service.

### Any JS Runtime

Regular scripts or external applications are only responsible for:

- Initializing the platform client.
- Obtaining the corresponding Provider.
- Calling Provider or Builder.

This is what makes Headless BI real.

## How The Backend Should Support This Model

The backend needs to evolve from a "page backend" into a "Provider backend."

This means the backend should provide at least two types of capabilities:

### 1. Command And Query Capabilities

For example:

- Create / delete resources.
- Get resource summary.
- Get metadata.
- Check reference relationships.
- Export snapshots.

These capabilities fit REST or equivalent command interfaces.

### 2. Collaboration Connection Capabilities

For example:

- Open resource documents.
- Synchronize resource state.
- Restore snapshots and increments.

These capabilities fit Hocuspocus / Yjs Provider protocols.

So the backend can be understood as:

- REST is the management plane.
- Collaboration connection is the data plane.

Provider is the client abstraction that consumes both planes.

## Unified Semantics For Resource Operations

To make the three Providers truly reusable, define a unified minimum semantic set:

- `create`
- `remove`
- `rename`
- `open`
- `close`
- `getBuilder`
- `getSummary`
- `getDetail`
- `snapshot`

Then add provider-specific actions on each Provider.

The value of doing this:

- Page teams have a consistent mental model.
- CLI commands map naturally.
- Documentation and SDK remain stable.

## Special Treatment For `report`

Even when adopting Provider First, one boundary must remain:

- `report` is a structural orchestration resource.
- `chart` and `insight` are content resources.

So although `ReportProvider` can manage pages and references, it should not absorb the responsibilities of `ChartProvider` and `InsightProvider`.

A better pattern:

- `ReportProvider` manages structure.
- `ChartProvider` manages chart content.
- `InsightProvider` manages insight content.
- `ReportProvider` organizes them through `chartId / insightId`.

## Recommended Platform Object Model

Consider adding a higher-level `VBIProviderClient`:

```ts
const client = await createVBIProviderClient(config)

const reportProvider = client.report(reportId)
const chartProvider = client.chart(chartId)
const insightProvider = client.insight(insightId)
```

Where:

- `client` handles authentication, connection configuration, and transport assembly.
- `provider` handles resource-level capabilities.
- `builder` handles DSL-level operations.

The three-layer relationship should stabilize as:

`client -> provider -> builder`

Instead of:

`page -> api -> service -> builder`

## Recommended Implementation Order

### Phase 1: Establish The Provider Concept First

- Clarify `ChartProvider / InsightProvider / ReportProvider`.
- Define the unified interface and minimum method set.
- Clarify that Builder is obtained from Provider.

### Phase 2: Change Existing Frontend Calls To Consume Provider

- Pages no longer assemble REST calls and collaboration hooks directly.
- Pages obtain builder and execute operations through Provider.

### Phase 3: Implement `vbi_tui`

- CLI is only a thin wrapper around Provider.
- Do not design a second set of business semantics.

### Phase 4: Open To Any JS Runtime

- Provide a pure TS SDK.
- Documentation examples cover both Node / Browser runtimes.

## Conclusion

This decoupling should go one step further, from "resource service decoupling" to a "Provider-first platform architecture."

The final stable model should be:

- `chart / insight / report` are three independent resources.
- `ChartProvider / InsightProvider / ReportProvider` are three first-class entry points.
- Provider can connect to the backend and operate resources in any JS runtime.
- Provider can directly return the corresponding Builder.
- Pages, CLI, and scripts are only different consumers of Provider.
- REST owns the management plane, and the collaboration protocol owns the data plane.
- `Bytes` stays inside persistence and collaboration protocols, while the business layer uniformly exposes JSON and Builder semantics.

Only this lets VBI truly move from an "embeddable capability collection" to "platform-level Headless BI."
