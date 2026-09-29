---
'@visactor/vseed': minor
'@visactor/vbi': patch
'@visactor/vbi-component': patch
---

Use VChart 2.1.7 for native bar geometry across data updates and correct enter/exit animations. Align VBI and component renderer dependencies with this version.

Compose chart-family animation pipes so `animation.params.update` controls data enter, update, and exit timing without requiring an effect. All durations and loop intervals use milliseconds directly and preserve zero. Custom pipelines should replace the generic `animation` pipe with the corresponding family pipe, such as `columnAnimation` or `lineAreaAnimation`.

Respect explicit per-bar radii and preserve single-series and moveIn corners. Add serializable `areaStyle.areaGradient` and `barStyle.barGradient`, as boolean switches sharing one fill compiler. Areas fade from transparent at the bottom to their current color at the top; bars fade from zero toward positive or negative values, with direction composed by the chart pipeline. Resolve inherited colors from the encoding so gradients also work in dual-axis series before the color scale is configured.
