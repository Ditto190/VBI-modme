# DSL-Design

:::info Bedeutung

VSeed ist eine deklarative DSL

- DSL-Design ist die Kunst, Domänenprobleme auszudrücken, und kann komplexe Probleme wirksam vereinfachen.
- Eine DSL ermöglicht vertrauten Nutzern, so natürlich zu codieren wie in ihrer Muttersprache zu schreiben. Wenn Sie mit VSeed vertraut sind, fühlt sich das Rendern von Charts so einfach an wie das Schreiben natürlicher Sprache.
- `VChart` und `VTable` folgen demselben Prinzip.


:::

:::tip

Eine `deklarative DSL` konzentriert sich auf „Was“ (What). Sie beschreibt, wie das erwartete Ergebnis oder der Endzustand aussehen soll, ohne sich um die konkreten Schritte zu kümmern, mit denen der Computer diesen Zustand erreicht.


Eine `imperative DSL` konzentriert sich auf „Wie“ (How). Sie stellt eine Reihe klarer, schrittweiser Anweisungen bereit und teilt dem Computer mit, wie er den Zielzustand Schritt für Schritt erreicht.
:::

## VSeed-Abwägungen

1. Domänenfokus (Focus)

VSeed opfert etwas Allgemeingültigkeit, um sich auf die Lösung domänenspezifischer Probleme zu konzentrieren. Das Kernziel von VSeed ist daher nicht, alle Anforderungen eines einzelnen Charttyps tiefgehend zu erfüllen, sondern sich auf die Datentransformation vor der Wahl des Charttyps zu konzentrieren. Weitere Funktionen wie Themes, Interaktionen und Animationen bleiben dem Nutzer überlassen.

2. Abstraktionsebene (Abstraction Level)

`VSeed` bietet eine höhere Abstraktionsebene, sodass Nutzer sich auf die Problemlösung konzentrieren können, statt auf Implementierungsdetails der unteren Ebene. Dadurch steigt die Entwicklungseffizienz. Zum Beispiel erfordert der Wechsel des Charttyps nur die Änderung eines Parameters, ohne die Details des Wechsels beachten zu müssen.

3. Einschränkung ist Vorteil (Constraint is Advantage)

`VSeed` betont Einschränkungen: Es nimmt eine `VSeed DSL` entgegen und gibt eine `spec` für `VTable` oder `VChart` aus. Dadurch können Nutzer die Funktionen einzelner Charts flexibler steuern. `VSeed` ist keine Blackbox.

Daher kann VSeed einfach als `Spec Builder` verstanden werden, der die ursprünglichen Fähigkeiten von `VTable` oder `VChart` nicht beeinträchtigt. Jeder `VChart`- oder `VTable`-Nutzer kann `VSeed` schnell in eine bestehende Plattform integrieren.
