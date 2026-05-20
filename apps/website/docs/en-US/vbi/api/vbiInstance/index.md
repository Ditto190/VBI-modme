# createVBI

Creates an independent VBI instance.

Each instance has its own resource registry, suitable for isolating different reports, dashboards, or test contexts within the same application.

## Function Signature

```typescript
function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
function createVBI<TQueryDSL, TSeedDSL>(defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIInstance<TQueryDSL, TSeedDSL>
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `defaultBuilderOptions` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | Default chart Builder configuration, passed to chart Builders created in chart, report, and dashboard. |

---

# VBI

The default VBI instance, suitable for directly using globally shared Builder and resource capabilities.

**Type**: `VBIInstance`

**Definition**:

```typescript
const VBI: VBIInstance = createVBI()
```

---

# VBIInstance

The VBI instance returned by createVBI, serving as the unified entry point for chart, insight, dashboard, report, and other capabilities.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| **connectors** | `VBIConnectorNamespace` | Connector registration, retrieval, and release APIs. |
| **resources** | `VBIResourceNamespace` | Chart and insight resource registration APIs, used by dashboard/report to reference shared resources. |
| **chart** | `VBIChartNamespace<TQueryDSL, TSeedDSL>` | Chart Builder creation API. |
| **insight** | `VBIInsightNamespace` | Insight Builder creation API. |
| **dashboard** | `VBIDashboardNamespace<TQueryDSL, TSeedDSL>` | Dashboard Builder creation API. |
| **report** | `VBIReportNamespace<TQueryDSL, TSeedDSL>` | Report Builder creation API. |
