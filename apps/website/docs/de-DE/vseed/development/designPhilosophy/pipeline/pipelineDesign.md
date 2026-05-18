# pipeline-Design

:::info Warum Pipeline?
1. Eine Entscheidung erfahrener Teammitglieder.
2. Der Vorteil von Pipeline besteht darin, dass `VSeed` den Ausführungsfluss jedes Charttyps unabhängig steuern kann. Durch gutes Design kann die Implementierung jedes Charttyps entkoppelt und zugleich lokal wiederverwendbar sein, während jede Chartklasse jedes Detail präzise kontrollieren kann. Genau das bringt Pipeline, und genau das braucht `VSeed` am meisten.
3. Im Vergleich dazu lassen sich die Nachteile des Pipeline-Musters beim Design vermeiden. Wenn die Größe einzelner `Pipe`s reduziert und Abhängigkeiten zwischen `Pipe`s verringert werden, lassen sich die Nachteile dieses Musters weitgehend vermeiden.
4. Nach vier Generationen von Pipeline-Design und Optimierung ist VSeed bereits die fünfte Version. Die typischen Stolpersteine wurden bereits durchlaufen.

:::

## Was ist Pipeline?

Pipeline ist eine mächtige Abstraktion und Engineering-Praxis. Sie zerlegt eine komplexe Aufgabe in eine Reihe kleinerer, miteinander verbundener Schritte, die nacheinander ausgeführt werden. Ihre Designidee und Implementierung sind stark von den Kernideen der funktionalen Programmierung (FP) geprägt.

### Vorteile von Pipeline:
- Modularität: atomare Implementierung; durch Kombination von Atomen entstehen Module.
- Automatisierung: Sobald die Eingabe bestimmt ist, wird die Ausgabe automatisch erzeugt, ohne dass interne Details beachtet werden müssen.
- Reine Funktion: Eine bestimmte Eingabe liefert immer die erwartete Ausgabe; das ist ein Merkmal reiner Funktionen.
- Parallelität: unterstützt von Natur aus Nebenläufigkeit.
- Wiederverwendbarkeit: Jedes Modul kann wiederverwendet werden.
- Testbarkeit: Theoretisch ist jedes Modul unabhängig und kann separat getestet werden, um Qualität sicherzustellen.
- Nachverfolgbarkeit: Eingaben und Ausgaben jeder Phase sind klar, was Fehlersuche und Prozessüberwachung erleichtert.
- Cachebarkeit: Theoretisch kann die Ausgabe eines einzelnen `Pipe` separat gecacht werden, um wiederholte Berechnungen zu vermeiden und Effizienz zu erhöhen.

### Nachteile von Pipeline:
- Reihenfolgeabhängigkeit: Wenn zwischen `Pipe`s eine Reihenfolgeabhängigkeit besteht, steigt der Verständnisaufwand, weil frühere Phasen verstanden werden müssen, bevor spätere Phasen verständlich sind. Zur schnellen Fehlersuche ist ein tieferes Verständnis des Gesamtprozesses nötig.
- Debugging-Kosten: Da Pipeline sequenziell ausgeführt wird, führt der Fehler einer Phase zum Fehlschlag der gesamten Pipeline. Das erschwert Debugging, weil die fehlerhafte Phase gefunden und repariert werden muss.
- Performance-Probleme: Da Pipeline sequenziell ausgeführt wird, muss jede Phase auf die Ausgabe der vorherigen Phase warten. Das kann zu Performance-Problemen führen, besonders wenn eine Phase lange dauert.
- Funktionale Programmierung: Neue Konzepte müssen verstanden werden, was Lernaufwand bedeutet. Deshalb sollten Designprinzipien und Implementierungsdetails im Contribution Guide dokumentiert werden, damit andere Entwickler sie verstehen und nutzen können.

## Wie sollte Pipeline in VSeed geschrieben werden?

### Pipe-Kompositionsmuster

Mehrere funktionale `Pipe`s können zu einem größeren funktionalen `Pipe` oder zu einer komplexeren Pipeline kombiniert werden.

In VSeed entspricht eine vollständige Pipeline der Implementierung eines Charttyps. Durch Beschreibung der Kompositionsbeziehungen zwischen `Pipe`s lassen sich unterschiedliche Charttypen erstellen. In der Kompositionsphase der Pipeline muss man sich nicht um die konkrete Implementierung jedes `pipe` kümmern.


#### Kompositionsunterschiede

Ein Beispiel:

Liniendiagramme und Flächendiagramme können viele Funktionen wiederverwenden, etwa Labels, Legenden und Achsen. Ein Liniendiagramm hat jedoch keinen Flächen-Mark-Stil. Daher löst die pipeline diesen Unterschied durch Kombination funktionaler `Pipe`s, ganz ohne `if`-Anweisung.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // Nur Flächendiagramme haben einen Flächen-Mark-Stil
  areaStyle,
]
```


### Pipe-Adaptermuster

Neben dem Kompositionsmuster hat der Aufbau eines `Pipe` häufig bestimmte Bedingungen. Um `Pipe`-Kombinationen unter unterschiedlichen Bedingungen zu erfüllen, verwendet VSeed viele `Pipe`-Adapter.

#### Kompositionsbedingungen

Ein Beispiel:

Liniendiagramme unterstützen Pivot. Ohne Pivot werden sie von VChart gerendert und geben eine VChart spec aus. Mit Pivot werden sie von VTable gerendert und geben eine VTable spec aus.

Pivot-Liniendiagramme müssen im Wesentlichen die Grundfunktionen von Liniendiagrammen wiederverwenden, etwa Labels, Legenden und Achsen. Deshalb wird das Adaptermuster benötigt, um `Pipe`s eines Liniendiagramms in `Pipe`s eines Pivot-Liniendiagramms umzuwandeln.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
]

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

Zusammengefasst ist jeder Adapter ein `if else`. Bedingungen, die in einem `pipe` verborgen wären, können als Adapter abstrahiert werden; dadurch wird das `if else` auf die oberste Ebene verschoben. So entsteht eine Pipeline mit klareren Abhängigkeiten und geringeren Wartungskosten.

### Die Grundeinheit von Pipeline: funktionaler Pipe

VSeed erwartet, dass alle Charttypen Funktionen als Grundeinheit verwenden, um ausreichende Wiederverwendbarkeit und Erweiterbarkeit bereitzustellen. Die Pipeline eines Charttyps wird von unten nach oben aufgebaut. Jeder funktionale `Pipe` sollte ein unabhängiges, testbares und wiederverwendbares Modul sein.

Entscheidend ist, funktionale Unterschiede als unterschiedliche `Pipe`s zu abstrahieren, also weniger `if else` zu schreiben, statt einen großen allumfassenden `Pipe` zu schreiben.

#### Abgeflachter funktionaler Pipe

Ein Beispiel:

Balken-, Säulen-, Linien-, Flächen- und Streudiagramme haben alle X- und Y-Achsen. Sie sind ähnlich, aber unterscheiden sich leicht. Würde man einen großen allumfassenden `axes` pipe schreiben, könnte das so aussehen:

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // Linien-, Flächen- und Säulendiagramme haben eine diskrete und eine kontinuierliche Achse
    return xy(spec, context)
  }
  if (isScatter){
    // Streudiagramme haben zwei kontinuierliche Achsen
    return yy(spec, context)
  }
  if (isBar){
    // Balkendiagramme haben eine diskrete und eine kontinuierliche Achse, aber ihre Achsrichtung unterscheidet sich von Linien-, Flächen- und Säulendiagrammen
    return yx(spec, context)
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

Die obige Logik wählt innerhalb eines funktionalen `Pipe` je nach Charttyp unterschiedliche untergeordnete `pipe`s aus. Das führt zu zwei Problemen:
1. Wie sollen die wiederholten Funktionen in `xy`, `yx` und `yy` wiederverwendet werden? Viele ähnliche, aber verschiedene Unterfunktionen müssen in unterschiedlichen untergeordneten `pipe`s wiederholt aufgerufen werden. Abhängigkeiten können leicht unübersichtlich werden und Wartungskosten erhöhen.
2. Beim Ändern von Funktionen für Linien- und Flächendiagramme kann man Balkendiagramme leicht übersehen, weil die Logik verzweigt ist. Beim Implementieren neuer Funktionen müssen daher Unterschiede berücksichtigt werden.

Wenn die gesamte spec pipeline auf mehrere hundert `pipe`s anwächst, verursacht diese Schreibweise sehr hohe Wartungskosten. Daher brauchen wir einen einfacheren Weg, um je nach Charttyp unterschiedliche untergeordnete `pipe`s auszuwählen.

Setzt man das obige Beispiel fort, werden die Unterschiede als verschiedene `Pipe`s abstrahiert, auf feinerer funktionaler Granularität gekapselt und schließlich direkt in der pipeline kombiniert. So lassen sich die genannten Probleme vermeiden.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

Im obigen Beispiel wird kein `axes` pipe implementiert. Stattdessen werden `xBandAxis`, `yBandAxis`, `xLinearAxis` und `yLinearAxis` direkt kombiniert. Dadurch wird vermieden, in einem `axes` pipe je nach Charttyp unterschiedliche untergeordnete `pipe`s auszuwählen; charttypbasierte Verzweigungen und der Einsatz von `if else` werden reduziert.

Alle Verzweigungen aufgrund von Charttyp-Unterschieden sollten oberhalb der Pipeline liegen. Wenn es nicht unbedingt nötig ist, sollte Pipeline nicht je nach Charttyp unterschiedliche untergeordnete `pipe`s auswählen.

Diese Kompositionsweise entspricht der Designphilosophie von VSeed: eine flachere Kombination funktionaler `Pipe`s verwenden, statt mit `if else` einen großen allumfassenden funktionalen `Pipe` zu bauen.
