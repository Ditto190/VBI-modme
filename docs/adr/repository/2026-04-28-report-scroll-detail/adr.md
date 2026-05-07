# ADR: Refactor Report Detail Page To A Scrollable Bidirectional Layout

## Summary

The Report Detail page in `vbi_fe` will be refactored from the current page-style interaction into a "scroll orchestration" model: the core display uses vertically stacked pages, with an optional horizontal scrolling mode; the left-side table of contents links to page content and automatically activates the current page item while scrolling; each page focuses on the smallest useful unit (one report + one insight), and report/insight hover exposes a consistent toolbar editing entry point.

## Context

The current Report Detail page lacks these capabilities:

- Continuous scrolling between pages for reading.
- A strong binding between the table of contents and page viewport position; after scrolling, the highlight can become misaligned.
- Horizontal browsing mode for user scenarios that need page-by-page sliding along the horizontal axis.
- Stable single-page content boundaries; report and insight can become mixed in layout.
- Local editing entry points on report and insight.

## Decision

### 1. Use A Dual-Mode Scroll Container For The Report Content Area

`ReportDetailPage` uses a unified container component to hold the page collection, defaulting to vertical scrolling mode.

- Vertical mode: a page-by-page stacked container using `flex-col + overflow-y-auto`.
- Horizontal mode: after switching, a horizontal arrangement using `flex-row + overflow-x-auto`.
- Both modes share the same page model and anchor index to keep behavior consistent.

### 2. Establish Bidirectional Sync Between Pages And The Left Table Of Contents

- Page nodes mount a stable `pageId`.
- Use `IntersectionObserver` to watch page visibility and update the active state in the left table of contents while scrolling.
- Table-of-contents clicks navigate to the target page through anchors (`scrollIntoView`) and force active state synchronization.
- The active state keeps the same source of truth in both vertical and horizontal modes.

### 3. Freeze The Content Structure Of Each Page

Each page contains only:

- `report` (fixed height, fixed to the primary display height of the page container)
- `insight` (adapts to content height)

Rules:

- At most one `report` per page.
- At most one `insight` per page.

This constraint reduces layout complexity and maps table-of-contents semantics to page granularity.

### 4. Keep Left Table-Of-Contents Features Unchanged And Improve Positioning

- Preserve table-of-contents presentation, hierarchy, and interaction strategy.
- Only enhance the "jump behavior": clicking an item jumps to the corresponding page, and scrolling backfills the corresponding active item.
- Keep existing menu permissions and filtering logic unchanged.

### 5. Add A Floating Toolbar To Localize Editing Entry Points

- When hovering report/insight cards, show a toolbar in the upper-right corner.
- The toolbar provides core actions such as `edit`, consistent with the current editing flow.
- Do not change the persistence model of report/insight; only reuse the existing editing protocol.

## Consequences

### Positive Impact

- The reading experience is unified: the page better matches expectations for a document-like long page with chapter navigation.
- The right content area and left table of contents get a deterministic sync path, avoiding jump/highlight mismatch.
- Layout boundaries are clear: single-page structure is controlled, reducing regressions from complex combined layouts.
- Editing actions move from a global menu down to content cards, reducing the cost of finding the target element.

### Risks And Mitigations

- Horizontal scrolling and right-side toolbar hover may add scroll event and pointer interaction noise: use unified scroll state management and throttled updates.
- Long-list page performance and observer memory pressure: register observers on demand and use reasonable thresholds to avoid global high-frequency callbacks.
- Compatibility risk: keep existing left menu interactions and gradually replace content-layer styles to avoid a large one-shot rewrite.

## Assumptions

- The left table of contents already has a stable pageId-to-title mapping.
- `report` and `insight` already have independent editing entry points and capabilities.
- Existing report/insight rendering can fully display inside fixed containers and adapt to hover interactions.

## Migration Plan

1. Review the existing `Report Detail` page data model and clarify pageId, table-of-contents index, and report/insight mapping.
2. Implement the base dual-mode container (vertical by default, horizontal switch supported).
3. Connect bidirectional page/table-of-contents synchronization, prioritizing correct table-of-contents jumps.
4. Enforce page content rules: at most one report and one insight per page, with fixed-height report and adaptive-height insight.
5. Add hover toolbar to report/insight cards.
6. Complete compatibility regression: menu features, existing permissions, and data state are unaffected.
7. Add visual acceptance coverage for page scrolling, table-of-contents sync, horizontal switching, and hover toolbar scenarios.
