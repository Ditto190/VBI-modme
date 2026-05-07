# Plan: Report Detail Page Scroll Refactor Execution Plan

> Based on [`./adr.md`](./adr.md)
> This file guides the implementation of the `vbi_fe` Report Detail page.

## Goals

1. Refactor the Report Detail page to use vertical scrolling as the main display path while retaining a horizontal scrolling switch.
2. Implement scroll-driven table-of-contents synchronization: scrolling highlights the left table of contents, and table-of-contents jumps precisely locate the target page.
3. Strengthen page structure constraints: each page has at most one report and one insight, report uses fixed height, and insight adapts to content.
4. Keep left table-of-contents features unchanged, only enhancing click positioning.
5. Show an upper-right toolbar on report / insight hover and provide an editing entry point.

## Scope

Includes: `apps/vbi_fe` Report Detail page, related table-of-contents and scroll interactions, and report/insight hover toolbar.

Does not include:

- `apps/vbi_be` data model or API changes; this plan does not change persistence semantics.
- Refactoring the insight editor itself; it only reuses existing editing logic.
- Backend resource relationship refactors related to the report root-cause model.

## Smell Scan

1. Left/right area coupling: the current boundary between table-of-contents positioning and content is unclear, and scroll/click sync logic is scattered across multiple handlers.
2. No unified page structure constraint: different pages use inconsistent report / insight composition rules, so layout easily drifts.
3. Scattered hover editing entry points: editing depends on a global menu, and local content operations are missing.
4. Insufficient configurability for scroll mode switching: vertical and horizontal modes do not share state and entry points.

## Development Principles

### Single Scroll Source

All navigation and positioning behavior is driven by a unified page-list state, avoiding each component maintaining its own active index.

### Accessibility First

Table-of-contents clicks and scroll synchronization both have clear fallback behavior: a click can locate a page, and scrolling can update the table of contents.

### Local Editing Entry Points

Both report and insight toolbars are presented through embedded hover behavior, and editing actions match the semantics of the current content area.

### Fallback Friendly

Horizontal mode is a layout variant and does not affect the vertical main flow; after switching, active page consistency is preserved.

## Execution Order

1. Organize the content model: define page data model, report/insight container constraints, and page id.
2. Implement the vertical scroll container first for the main display flow.
3. Add horizontal mode, reusing the same page index and table-of-contents mapping.
4. Add table-of-contents linkage with `IntersectionObserver` + click positioning.
5. Add hover toolbar editing entry points on report/insight cards.
6. Run compatibility regression and acceptance.

## Execution Checklist

### Step 1: Establish Page Skeleton And State Model

Definition of done:

- Define the page list model, including `id/title/reportId/insightId`.
- Determine the source of truth for `activePageId` / `activePageIndex` and `viewMode` (`vertical | horizontal`).
- Split the table-of-contents component and content container component, establishing stable props and callback interfaces.

Blockers: none

### Step 2: Implement The Vertical Scroll Main Flow

Definition of done:

- The content area becomes a vertical paginated container and supports ordered full-page rendering.
- Per-page rendering constraints:
  - the report container has fixed height matching the page visual baseline;
  - the insight container grows with content height;
  - a single page has at most one report and one insight.
- Provide page anchor capability (`ref` + `dataset` + pageId).

Blockers: Step 1

### Step 3: Implement Horizontal Mode

Definition of done:

- Add a view-mode switch. In horizontal mode, change to row direction while preserving sliding behavior.
- Reuse the same page rendering component and anchor mapping.
- Table-of-contents active state remains based on the unified `activePage` state.

Blockers: Step 2

### Step 4: Implement Table-Of-Contents Linkage

Definition of done:

- Scroll listener: use `IntersectionObserver` to update the preferred visible page.
- Table-of-contents click: use `scrollIntoView` to scroll precisely to the target page and backfill active state.
- Resolve boundary races: click highlight during scroll animation and frequent observer updates converge to final consistency.

Blockers: Step 2

### Step 5: Launch Hover Toolbar And Editing Entry Point

Definition of done:

- A toolbar appears in the upper-right corner when hovering a report card.
- A toolbar appears in the upper-right corner when hovering an insight card.
- Toolbar actions reuse existing edit/open logic and do not add a separate editing protocol.

Blockers: Step 2

### Step 6: Acceptance And Wrap-Up

Definition of done:

- Table-of-contents click and scroll linkage cover the core path.
- Switching between horizontal/vertical modes does not reset active page and preserves semantic consistency.
- report/insight slots do not exceed the 1+1 rule.
- Old menu capabilities do not regress: table-of-contents filtering, expansion, and jumping remain available.
- Compatible with the existing style system, and hover toolbar does not interfere with scroll gestures.

## Acceptance Scenarios

1. Enter report detail by default; pages display vertically and the mouse wheel can move through pages in order.
2. During scrolling, the left table of contents automatically highlights the current page.
3. Clicking the left table of contents positions the right content to the corresponding page.
4. In horizontal mode, the user can scroll page-by-page horizontally while the left table of contents still highlights correctly.
5. When report or insight is hovered, a toolbar appears in the upper-right corner.
6. Clicking the toolbar opens the corresponding editing entry point, and the editing flow matches existing behavior.
7. A single page never contains two reports or two insights.

## Risks And Mitigations

- Risk: long-list pages may cause observer callback jitter.
  - Mitigation: improve the threshold strategy and reduce high-frequency state updates.
- Risk: page height/width mismatch in horizontal mode.
  - Mitigation: fix the container baseline dimensions and overflow strategy.
- Risk: event bubbling conflicts between toolbar and page hover.
  - Mitigation: use a unified event namespace and block unrelated click propagation.
