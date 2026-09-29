---
'@visactor/vseed': patch
---

Add static legends and fixed donut center text through composable pipelines. Legend interaction can be disabled without changing existing sizing, spacing or layout. Center titleText/subTitleText fit the inner radius and inherit theme colors. Center text typography, pie geometry and hover, and legend interaction defaults are owned by themes; chart DSLs only need content and explicit overrides. PieStyle follows the existing mark-style naming with pieBorderColor, pieBorderWidth, pieCornerRadius and pieHoverEffect; existing hover enlargement, adaptive borders and chart defaults remain unchanged. Migrate the lightweight dashboard consumer ring to the simplified DSL.
