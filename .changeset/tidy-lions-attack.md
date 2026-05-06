---
'@visactor/vseed': patch
---

- Fix stacked annotation difference lines so column charts place totals above or below by sign, and bar charts place them to the right or left by sign.
- Add annotation theme tokens for line color, line style, line dash, text color, text background color, and text background opacity. These tokens now apply consistently across annotation point, area, line, and difference line defaults.
- Add annotation area theme tokens for area color and area color opacity.
- Add configurable annotation difference line styles, including solid, dashed, dotted, and explicit line dash values.
- Expose and reuse `createSpecifiedForColorMapping()` so custom `colorMapping` definitions can be resolved consistently for chart specs, legends, and derived color value maps.
- Expose `Builder.getColorValueMap()` to return the final discrete color id to color mapping, including custom themes, custom color schemes, and color mappings. Linear color scales still return `undefined`.
