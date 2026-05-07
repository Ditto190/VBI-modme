# ADR-001: practices/standard Shelves Naming and Secondary Interaction Alignment

## Status

Proposed

## Context

The current shelf-related implementation in `practices/standard` already has a stable structure, but four clear inconsistencies still need to be aligned:

1. Code directories and imports still use the incorrect plural `Shelfs`, while the UI copy and intended meaning use `shelves`.
2. The measure and dimension submenus open through `children + popupOffset`. The current offset is negative, so the submenu is pulled back to the left and overlaps the first-level menu.
3. The submenu container has extra padding, so when hovering items such as `Sum`, the background cannot reach the left and right edges of the container.
4. The where date filter already has `VBIWhereDatePredicate` and `DateFilterEditor`, but the current interaction still uses a top `Select` to switch among four types instead of reusing the more stable popover panel pattern from the shelves system.

Current related code locations:

- `practices/standard/src/components/Shelves/common/FieldShelf.tsx`
- `practices/standard/src/components/Shelves/shelves/MeasureShelf.tsx`
- `practices/standard/src/components/Shelves/shelves/DimensionShelf.tsx`
- `practices/standard/src/components/Shelves/utils/menuItemUtils.tsx`
- `practices/standard/src/components/Shelves/common/FilterShelf.tsx`
- `practices/standard/src/components/Filter/FilterPanel.tsx`
- `practices/standard/src/components/Filter/DateFilterEditor.tsx`

This change focuses on demo interaction and naming alignment, not a DSL redesign. `@visactor/vbi` already provides the core expression capabilities required for measure format, dimension aggregate, and where date predicate. This ADR only decides how the demo should organize them.

## Decision

### 1. Normalize plural naming in demo code to `Shelves`

Rename all incorrect `Shelfs` / `shelfs` names in `practices/standard` to `Shelves` / `shelves`.

Specific constraints:

1. Rename the directory `practices/standard/src/components/Shelfs` to `practices/standard/src/components/Shelves`.
2. Move all import / export / test paths to `Shelves` in one atomic change.
3. Keep singular `Shelf` names, such as `FieldShelf`, `FilterShelf`, and `ShelfTrack`.
4. Do not rename existing correct i18n keys such as `shelves*`.
5. Do not keep long-term compatibility aliases; complete the atomic migration inside the demo.

Rationale:

1. `Shelfs` is an incorrect plural, and keeping it would only add cognitive noise.
2. This is an internal demo module, so maintaining a compatibility layer for an incorrect name is not worthwhile.
3. After naming is normalized, later documentation, tests, component directories, and user task descriptions will share the same meaning.

### 2. Open all submenus from the right side of the first-level menu

Treat measure `Aggregate` / `Encoding` / `Format` and dimension `Date Aggregate` / `Encoding` as secondary interaction surfaces.

Layout rules:

1. The first-level menu continues to open below the shelf tag through `Dropdown`.
2. All submenus open from the right side of the first-level menu item.
3. Remove the current negative `popupOffset`.
4. Use one positive horizontal gap, with `4px` as the baseline.
5. Align the top of the secondary panel with the top of the triggering menu item.

Implementation constraints:

1. `menuItemUtils` provides the single submenu gap constant.
2. Individual menu items must not override their own offset.
3. Although `MeasureFormatPanel` is a custom panel, it still belongs to the secondary interaction level, so its placement rules match ordinary submenus.

The rationale is direct: a submenu means "continue choosing on the right", not "cover the first-level menu and choose again".

### 3. Let items own submenu spacing; remove horizontal container padding

The hover background of a submenu must cover the full row for the menu item and must not be clipped by container padding.

Use the following rules consistently:

1. Set horizontal padding on the submenu container to zero.
2. Let each item own its click target and text spacing.
3. Make hover / selected backgrounds reach the left and right edges of the submenu.
4. Dividers must not create extra horizontal spacing.
5. Keep the entire item row clickable; do not create a partial click target.

Requirements for custom panels:

1. The panel wrapper only keeps the border, radius, and shadow.
2. Structural spacing is controlled by field rows inside the panel.
3. Do not rely on wrapper padding to simulate menu boundaries.

This decision prioritizes complete interaction feedback before visual looseness.

### 4. Change the where date filter to a single Popover + Tabs, without a second overlay layer

The where date filter continues to reuse the existing item editor popover from `FilterShelf` / `FilterPanel`; it must not open an additional popover, modal, or drawer.

UI rules:

1. Date filters are always edited in the same popover.
2. `DateFilterEditor` no longer uses a top-level `Select` to switch types.
3. Use four fixed tabs: `range`, `relative`, `current`, `period`.
4. When opening an existing date condition, restore the current tab from `predicate.type`.
5. When adding a new date condition, default to the `range` tab.

State rules:

1. The underlying data remains `VBIWhereDatePredicate`.
2. Tab switching only changes `predicate.type`.
3. Each tab edits the same `datePredicate` draft directly.
4. After Save is clicked, write back through `builder.whereFilter.add(...)` / `update(...)`.

This change does not add a demo-specific date DSL and does not change the `setDate(...)` builder entrypoint.

### 5. This ADR only aligns demo interactions and does not change core DSL semantics

Explicit scope:

1. Do not modify `VBIWhereDatePredicate` in `@visactor/vbi`.
2. Do not modify the measure format DSL.
3. Do not modify the dimension aggregate DSL.
4. Do not modify the chart pipeline or lowering behavior.
5. Do not opportunistically refactor `HavingFilterPanel`.

The reason is that these issues are not missing expression-layer capabilities; they come from unstable organization in the demo interaction layer.

### 6. Verification scope

The following checks must be covered:

1. No `Shelfs` / `shelfs` path references remain under `practices/standard`.
2. Measure / dimension submenus and the format panel all open from the right side of the first-level menu.
3. Submenus no longer overlap the first-level menu.
4. When hovering items such as `Sum`, the background reaches the left and right edges of the submenu.
5. The four date filter tabs can switch, restore state, and save.
6. Both the add-date-condition and edit-date-condition paths correctly write back to `VBIWhereDatePredicate`.
7. Existing tests for `shelfMenus`, aggregate, date aggregate, and drag/drop are updated along with the directory migration.

## Reference

- `practices/standard/src/components/Shelves/common/FieldShelf.tsx`
- `practices/standard/src/components/Shelves/shelves/MeasureShelf.tsx`
- `practices/standard/src/components/Shelves/shelves/DimensionShelf.tsx`
- `practices/standard/src/components/Shelves/utils/menuItemUtils.tsx`
- `practices/standard/src/components/Shelves/common/FilterShelf.tsx`
- `practices/standard/src/components/Filter/FilterPanel.tsx`
- `practices/standard/src/components/Filter/DateFilterEditor.tsx`
- Ant Design Dropdown / Popover / Tabs: https://ant.design/llms-full.txt

## Rejected Items

This plan explicitly rejects the following approaches:

- Do not keep the `Shelfs` directory as a compatibility alias.
- Do not use negative `popupOffset` to pull submenus back over the first-level menu.
- Do not create spacing through horizontal padding on the submenu container.
- Do not create separate overlays for each date mode: `range / relative / current / period`.
- Do not modify the DSL structure in `@visactor/vbi` to solve demo interaction issues.
