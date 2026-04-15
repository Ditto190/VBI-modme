# Annotation Difference Line Style Design

## Goal

Improve the default `annotationDifferenceLine` appearance so it reads as a deliberate difference annotation instead of inheriting the generic VChart `markLine` look.

## Problems To Fix

1. The line inherits VChart's dashed `markLine` default, which makes the annotation read like a helper grid/reference line.
2. The current label chip uses an overly heavy dark background in light theme.
3. The current end symbol styling is incomplete, so the arrow cue is weak or visually inconsistent.

## Scope

This change only updates built-in defaults for `annotationDifferenceLine`.

- No DSL changes
- No new user-facing config fields
- No behavioral change to anchor resolution or difference calculation

## Approved Visual Direction

### Line

- Force a solid line instead of inheriting VChart's dashed default
- Increase line width from `1` to `2`
- Add `cornerRadius: 4` to make the step turn feel intentional
- Increase `expandDistance` from `12` to `24`

### Arrow

- Keep `startSymbol.visible = false`
- Keep `endSymbol.visible = true`
- Use the same `arrow` end symbol family already used by existing line annotations
- Increase size to `12`
- Add `refX: -4` so the arrow sits at the line end more cleanly

### Label

- Keep the label centered on the middle segment
- Use a chip-like background with `padding: 4`
- Use `cornerRadius: 4`
- Use `lineWidth: 1`
- Remove the heavy text stroke treatment from the current implementation
- Use the line color as the chip border color

### Theme

- Reuse the existing annotation family color mode instead of introducing a one-off difference-line palette
- Light theme:
  - `lineColor: '#BCC1CB'`
  - `textColor: '#ffffff'`
  - `textBackgroundColor: '#BCC1CB'`
- Dark theme:
  - `lineColor: '#55595F'`
  - `textColor: '#E2E3E6'`
  - `textBackgroundColor: '#55595F'`
- Token theme patch should continue to map `textFontSize` only, matching the current annotation family pattern

## File Boundaries

- `packages/vseed/src/pipeline/spec/chart/pipes/annotation/annotationDifferenceLine.ts`
  - Apply the new built-in VChart `markLine` defaults
- `packages/vseed/src/theme/common/annotaion.ts`
  - Replace the current difference-line light/dark colors with theme-appropriate chip defaults
- `packages/vseed/src/theme/tokenTheme.ts`
  - Ensure token themes can override the difference-line default colors consistently
- `packages/vseed/tests/unit/builder/annotationDifferenceLine.test.ts`
  - Lock the new compiled spec defaults

## Non-Goals

- No attempt to create custom vector arrow paths
- No expansion of `AnnotationDifferenceLineConfig`
- No changes to stacked/parallel coordinate logic
