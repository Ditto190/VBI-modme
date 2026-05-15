# Datenumformung - Prinzipien

:::info Datenumformung
VSeed schlägt eine allgemeine Methode zur Dimensionsumformung vor, um die Einstiegshürde für Datenvisualisierung weiter zu senken.
:::

Datenumformung bezeichnet den Prozess, Daten von einer strukturierten Form in eine andere zu überführen. Im Kern wird die Organisation der Daten wie Zeilen, Spalten, Indizes oder Hierarchien verändert, um unterschiedliche Analyse- oder Verarbeitungsanforderungen zu erfüllen und zugleich die Datenintegrität zu wahren.

## Dimensionsumformung

Python und R verfügen bereits über Werkzeuge, die Dimensionsumformung unterstützen:
1. Python Pandas stellt `pivot` und `melt` für die Datenumformung bereit
2. R tidyverse stellt `pivot_longer` und `pivot_wider` für die Datenumformung bereit

## Dimensionserhöhung und Dimensionsreduktion

Dimensionserhöhung und -reduktion entsprechen gedanklich der Kategorientheorie (Objekte und Morphismen sowie Isomorphie), folgen in der Implementierung aber nicht streng der Kategorientheorie.

Besonders zu beachten:
1. Bei der Dimensionserhöhung werden nicht vorhandene Informationen zu „Measure-Name“ und „Measure-Wert“ aus dem Nichts erzeugt
2. Bei der Dimensionsreduktion werden vorhandene Informationen zu „Measure-Name“ und „Measure-Wert“ aus den Daten entfernt

Dimensionserhöhung kann Daten vollständig transformieren, aber Dimensionsspaltennamen können Nullwerte enthalten, daher wird das Ergänzen zusätzlicher Informationen unterstützt.
Dimensionsreduktion verliert Informationsinhalte. Deshalb müssen zusätzliche Transformationsinformationen gespeichert werden, um eine echte isomorphe Transformation zu erreichen. Andernfalls gehen Informationen zwangsläufig verloren.

![commonDataReshape](/images/commonDataReshape.png)

## Gruppierte Dimensionserhöhung und Dimensionsreduktion

Wie bei normaler Erhöhung und Reduktion gibt es ähnliche Szenarien mit Informationszuwachs oder Informationsverlust. Zusätzlich erzeugt die Einführung von Gruppierung mehr leere Daten.

Bedeutung:
1. **Measure-Gruppierung**: Detaildaten lassen sich durch gruppierte Dimensionserhöhung einfach verarbeiten
2. **Mehrgruppen-Abfragen**: Mehrere SQL-Abfragen können leicht mehrere Detaildatensätze abrufen, die per gruppierter Dimensionsreduktion zu einem Datensatz zusammengeführt werden können

![groupedDataReshape](/images/groupedDataReshape.png)

## Regelableitung

### Dimensionserhöhung

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. Bei mehreren Measures wird die Anzahl der Measures durch Dimensionserhöhung zu 1. Ein Measure bleibt nach der Dimensionserhöhung weiterhin 1.
2. Bei mehreren Dimensionen fügt die Dimensionserhöhung eine weitere Dimension hinzu. Auch 0 Dimensionen werden zu 1.
3. 0 Dimensionen und 1 Measure können wiederholt dimensionserhöht werden, um beliebig viele Dimensionen und 1 Measure zu erhalten. So kann auch ein einzelnes Measure ein Balkendiagramm rendern.
:::

### Dimensionsreduktion

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. Bei mehreren Measures bildet die Dimensionsreduktion ein kartesisches Produkt aus Dimensionswerten und Measures, wodurch neue Measures entstehen
2. Bei mehreren Dimensionen bildet die Dimensionsreduktion ein kartesisches Produkt aus mehreren Dimensionswerten, wodurch neue Dimensionen entstehen
:::

## Beispiele

#### 0 Dimensionen, 1 Measure
![0d1m](/images/0d1m.png)
#### 0 Dimensionen, 3 Measures
![0d3m](/images/0d3m.png)
#### 1 Dimension, 1 Measure
![1d1m](/images/1d1m.png)
#### 1 Dimension, 2 Measures
![1d2m](/images/1d2m.png)
#### 2 Dimensionen, 1 Measure
![2d1m](/images/2d1m.png)
#### 2 Dimensionen, 2 Measures
![2d2m](/images/2d2m.png)
