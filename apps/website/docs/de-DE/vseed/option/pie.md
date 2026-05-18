# Pie

:::info{title=Empfehlung}
\- Empfohlene Feldkonfiguration: `1` Kennzahl, `1` Dimension

\- Unterstützt Datenumformung: mindestens `1` Kennzahl, `0` Dimensionen

:::

:::info{title=Encoding-Zuordnung}
Das Kreisdiagramm unterstützt die folgenden visuellen Kanäle:

`angle`  : Winkelkanal, unterstützt `mehrere Kennzahlen` und ordnet Kennzahlenwerte den Segmentwinkeln zu

`detail` : Detailkanal, unterstützt `mehrere Dimensionen` und wird verwendet, um feinere Daten innerhalb derselben Farbserie darzustellen

`color`  : Farbkanal, unterstützt `mehrere Dimensionen` oder `eine Kennzahl`. Dimensionsfarben unterscheiden Datenserien, Kennzahlenfarben ordnen Kennzahlenwerte linear grafischen Farben zu

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und wird angezeigt, wenn der Mauszeiger über einem Datenpunkt liegt

`label`  : Label-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und zeigt Datenlabels auf Datenpunkten an

:::

:::note{title=Beschreibung}
Kreisdiagramm, geeignet zur Darstellung des Anteilsverhältnisses von Daten einer einzelnen Dimension; die Segmentfläche zeigt den Anteil jeder Kategorie.

Anwendungsszenarien:

\- Darstellung der Anteilsverteilung kategorialer Daten

\- Hervorhebung der Beziehung zwischen Ganzem und Teilen

\- Anteilsanalyse bei wenigen Kategorien (empfohlen höchstens 6)

:::

:::warning{title=Warning}
Datenanforderungen:

\- Mindestens 1 numerisches Feld (Kennzahl)

\- Alle Dimensionen werden mit Kennzahlennamen zusammengeführt, wenn mehrere Kennzahlen vorhanden sind, zu einer Dimension zusammengeführt und als Legendeneinträge angezeigt

\- Alle Kennzahlen werden automatisch zu einer Kennzahl zusammengeführt

Standardmäßig aktivierte Funktionen:

\- Legende, Datenlabels, Tooltips und Anteilsberechnung sind standardmäßig aktiviert

:::


## chartType

**Type:** `"pie"`

:::note{title=Beschreibung}
Kreisdiagramm



Kreisdiagramm, das das Anteilsverhältnis von Daten einer einzelnen Dimension darstellt

:::

**Beispiel**
'pie'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datensatz



Ein bereits aggregierter Datensatz nach TidyData-Spezifikation, der Datenquelle und Struktur des Diagramms definiert. Benutzereingaben müssen nicht vorverarbeitet werden; VSeed verfügt über leistungsfähige Datenumformungsfunktionen und formt die Daten automatisch um. Die Daten des Kreisdiagramms werden schließlich in 1 Dimension und 1 Kennzahl umgewandelt.

:::

**Beispiel**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen



Alle Dimensionen des Kreisdiagramms werden mit Kennzahlennamen zusammengeführt, wenn mehrere Kennzahlen vorhanden sind, zu einer Dimension zusammengeführt, auf den Winkel abgebildet und als Legendeneinträge angezeigt

:::

**Beispiel**
[{id: 'category', alias: 'Kategorie'}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Feld-ID, die der Dimension entspricht

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dimensionsalias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Beschreibung}
Datumsformatkonfiguration der Dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Beschreibung}
Zeitgranularität; bestimmt die Genauigkeit der Datumsanzeige

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt das Zuordnen mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt das Zuordnen mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen



Alle Kennzahlen im Kreisdiagramm werden automatisch zu einer Kennzahl zusammengeführt und auf die Radiusachse gemappt. Wenn mehrere Kennzahlen vorhanden sind, werden Kennzahlennamen mit den übrigen Dimensionen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: 'value', alias: 'Wertanteil', format: 'percent'}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Kennzahl-ID, muss eindeutig sein

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Kennzahlalias, Duplikate sind erlaubt; wenn nicht gesetzt, entspricht alias der id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert, höchste Priorität

Wenn autoFormat=true ist, werden alle numFormat-Konfigurationen überschrieben

Wenn aktiviert, wählen Diagramm-Datenbeschriftungen und Tooltips automatisch die passende Formatierung anhand von Kennzahlwerten und Gebietsschema aus

Formatierungsregeln: Dezimalzahlen mit aktivierter compact notation, mindestens 0 und höchstens 2 Dezimalstellen, automatische Rundung, umgesetzt mit Intl.NumberFormat des Browsers

Zum Beispiel:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Beschriftungen und Tooltips angewendet

Hinweis: Für benutzerdefinierte Formatierung muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: Zahl (Dezimal), Prozent (%), Promille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Verhältnis der Zahlenformatierung, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für die Zahlenformatierung

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix der Zahlenformatierung

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: Zahl (Dezimal), Prozent (%), Promille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Verhältnis der Zahlenformatierung, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für die Zahlenformatierung

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix der Zahlenformatierung

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- angle: Winkel, dem die Kennzahl zugeordnet wird

\- color: Kennzahl wird dem Farbkanal zugeordnet

\- label: Kennzahl, die dem Beschriftungskanal zugeordnet wird

\- tooltip: Kennzahl, die dem Tooltip-Kanal zugeordnet wird

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
In flacher Kennzahlkonfiguration wird eine baumförmige Kennzahlgruppe aufgebaut. parentId verweist auf die id der übergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums

:::

:::tip{title=Tip}
Es gibt zwei Formen der Kennzahlbaum-Konfiguration: direkt einen Kennzahlbaum mit children konfigurieren oder eine flache Kennzahlliste mit parentId konfigurieren. Beide Formen können nicht gleichzeitig verwendet werden.

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierungskonfiguration. Gibt den Feldnamen für die Paginierung an; dieser muss eine Dimension sein.
:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Paginierungsfeld; gibt den Feldnamen für die Paginierung an und muss eine Dimension sein
:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Aktueller Paginierungswert; gibt den Wert zur Bestimmung der aktuellen Seite an
:::

**Beispiel**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Hintergrundfarbe des Diagramms



Die Hintergrundfarbe kann ein Farbstring sein (z. B. 'red', 'blue') oder ein hex-, rgb- oder rgba-Wert (z. B. '#ff0000', 'rgba(255,0,0,0.5)')
:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farbe





:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Diskretes Farbschema zur Definition der Farben verschiedener Elemente im Diagramm
:::

**Beispiel**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Lineares Farbverlaufsschema zur Definition der Farben verschiedener Elemente im Diagramm
:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
Farbzuordnung, ordnet Datenwerte konkreten Farben zu
:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe positiver Werte im Diagramm
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe negativer Werte im Diagramm
:::


## label

**Type:** `PieLabel | undefined`

:::note{title=Beschreibung}
Beschriftungskonfiguration für Diagramm-Datenbeschriftungen, einschließlich Position, Format und Stil.





:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob Beschriftungen aktiviert sind
:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen umbrochen werden
:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte anzeigen

In Szenarien mit mehreren Kennzahlen besteht kein Risiko widersprüchlicher Werte, da alle zeichnungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen Datenpunkt repräsentiert.

Hinweis: encoding.label hat höhere Priorität; diese Konfiguration beeinflusst encoding.label nicht
:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte als Prozentsatz anzeigen

In Szenarien mit mehreren Kennzahlen besteht kein Risiko widersprüchlicher Werte, da alle zeichnungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen Datenpunkt repräsentiert.

Hinweis: encoding.label hat höhere Priorität; diese Konfiguration beeinflusst encoding.label nicht
:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Dimensionslabels anzeigen

Zeigt alle Dimensionslabels an

Hinweis: encoding.label hat höhere Priorität; diese Konfiguration beeinflusst encoding.label nicht
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungswerte automatisch formatiert werden. Wenn autoFormat true ist, wird numFormat ignoriert
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Formatierungskonfiguration für Beschriftungswerte. Sie wird mit `format` in `measure` zusammengeführt; `format` in `measure` hat höhere Priorität. numFormat hat niedrigere Priorität als autoFormat
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp. Unterstützt Zahl (dezimal), Prozent (%), Promille (‰) und wissenschaftliche Notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis. Darf nicht 0 sein
:::

**Beispiel**
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatierungssymbol, z. B. % oder ‰
:::

**Beispiel**
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"




#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für Zahlenformatierung
:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix der Zahlenformatierung
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits aus Browser Intl.NumberFormat. Niedrigere Priorität als significantDigits
:::

**Beispiel**
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits aus Browser Intl.NumberFormat. Höhere Priorität als fractionDigits
:::

**Beispiel**
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingPriority
:::

**Beispiel**
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingMode
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Beschriftung
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Beschriftung
:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe der Beschriftung
:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe der Beschriftung
:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Beschriftung
:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Schriftfarbe der Beschriftung automatisch anhand der Markierungsfarbe invertiert wird
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Position der Beschriftung
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungsüberlappungen vermieden werden
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Beschriftungsfilter. Standardmäßig ist die Bedingungsverknüpfung zwischen selectors OR
:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld, die id eines Eintrags in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

\- not in: wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

\- not in: wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

identisch mit operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt Werte des Dimensionsfelds in Datenpunkten aus. Arrays werden unterstützt
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von AI-generiertem Code)

Implementiert komplexe Datenfilterlogik durch AI-generierten JavaScript-Code

Kernfunktionen:

\- Unterstützt beliebig komplexe Datenfilterbedingungen

\- Verwendet eingebaute Hilfsfunktionen für Datenoperationen

\- Sichere Ausführung im Browser (Web-Worker-Sandbox)

Umgebungsanforderung: nur in Browserumgebungen unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden. dynamicFilter hat höhere Priorität

Dynamische Filterkonfiguration für Diagramme

Filtert Diagramm-Markierungen (Balken, Punkte usw.) mit AI-generiertem JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnmarge je Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
AI-generierter JavaScript-Filtercode

\- Es dürfen nur eingebaute Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

\- Eingabeparameter: data (Array), jedes item enthält das Feld __row_index als Zeilennummer

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index ist die Zeilennummer des ursprünglichen Datenpunkts, field ist das hervorzuhebende Feld

\- Verboten: eval, Function, asynchrone Operationen, DOM-APIs, Netzwerkanfragen
:::

**Beispiel**
return _.map(filtered, item => ({
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

const maxItems = _.map(grouped, group =>
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

const profitRate = item.profit / item.sales;
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Fallback, wenn Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld, die id eines Eintrags in dimensions
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

\- not in: wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

\- not in: wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

identisch mit operator
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt Werte des Dimensionsfelds in Datenpunkten aus. Arrays werden unterstützt
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld)

Wird in prepare() geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=Beschreibung}
Layoutmodus der Beschriftungen; gilt nur für Kreis- und Donut-Diagramme und nur wenn `labelPosition` auf `outside` gesetzt ist

\- arc: Beschriftungen entlang des Bogens anordnen

\- labelLine: Beschriftungen beidseitig ausrichten und Sektor-Markierung sowie Beschriftung über Führungslinien verbinden

\- edge: Beschriftungen beidseitig ausrichten, Sektor-Markierung und Beschriftung über Führungslinien verbinden und nahe an die beiden Diagrammränder setzen

:::


## legend

**Type:** `Legend | undefined`

:::note{title=Beschreibung}
Legende

Legendenkonfiguration zum Definieren der Diagrammlegende, einschließlich Position, Format und Stil.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Legende aktiviert ist
:::

**Beispiel**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Legendenrahmen aktiviert ist
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**




### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Legende
:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Pager-Icons
:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des deaktivierten Pager-Icons
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Legende
:::

**Beispiel**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Legende
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende
:::

**Beispiel**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Legendenform
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legendenposition
:::

**Beispiel**




### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximale Spalten- oder Zeilenzahl bei vielen Legendeneinträgen

Wenn position horizontal ist (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), steuert maxSize die Anzahl der angezeigten Spalten

Wenn position vertikal ist (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), steuert maxSize die Anzahl der angezeigten Zeilen
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**





## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}




Ob die Brush-Auswahl aktiviert wird

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob Tooltip-Informationen aktiviert sind
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}








Brush-Auswahlmodus: einzeln oder mehrfach

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Brush-Auswahl aktiviert ist
:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}
Brush-Typ

Definiert Form und Richtung der Brush-Auswahl.

\- `rect`: rechteckige Brush-Auswahl, wählt gleichzeitig in X- und Y-Richtung aus

\- `polygon`: polygonale Brush-Auswahl, zeichnet durch Klicken mehrerer Punkte ein beliebiges Polygon

\- `x`: Brush-Auswahl in X-Achsenrichtung, nur in X-Richtung; Y-Richtung bleibt uneingeschränkt

\- `y`: Brush-Auswahl in Y-Achsenrichtung, nur in Y-Richtung; X-Richtung bleibt uneingeschränkt
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
Deckkraft of selected data points, range 0-1







:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Brush-Bereich nach dem Ende der Auswahl gelöscht wird
:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Stil für Daten innerhalb des Brush-Bereichs

Definiert den Stil ausgewählter Datenpunkte
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft

Deckkraft ausgewählter Datenpunkte, Wertebereich 0 bis 1
:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achse, Kategorieachse, X-Achsenkonfiguration; definiert die X-Achse des Diagramms einschliesslich Position, Format, Stil usw.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10万, ratio:10000, symbol:"万"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=Beschreibung}
Auto-Hide-Intervall fur Achsenbeschriftungen; wenn der Abstand zwischen zwei Textbeschriftungen kleiner als autoHideGap ist, wird die uberlappende Beschriftung automatisch ausgeblendet. Nur fur Kategorieachsen wirksam.



Wenn autoHide deaktiviert ist, wird Sampling verwendet, konfiguriert uber minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Animationen für Kreis-/Donut-/Rose-Diagramme aktiviert werden

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=Beschreibung}
Animationsparameter für Kreis-/Donut-/Rose-Diagramme

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=Beschreibung}
Konfiguration der Eingangsanimation für Kreis-/Donut-/Rose-Diagramme

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Beschreibung}
Eingangseffekte für Kreis-/Donut-/Rose-Diagramme; unterstützt radiale und Skalierungsanimationen

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist
:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animation-Easing-Funktion
:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden
:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hervorhebungs- oder Atmosphärenfarbe der Animation
:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=Beschreibung}
Konfiguration der Aktualisierungsanimation für Kreis-/Donut-/Rose-Diagramme

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=Beschreibung}
Aktualisierungseffekt für Kreis-/Donut-/Rose-Diagramme; unterstützt radiale Animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist
:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animation-Easing-Funktion
:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden
:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hervorhebungs- oder Atmosphärenfarbe der Animation
:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=Beschreibung}
Konfiguration der Schleifenanimation für Kreis-/Donut-/Rose-Diagramme

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Loop-Animation aktiviert ist
:::

##### interval

**Type:** `number | undefined`

:::note{title=Beschreibung}
Loop-Animationsintervall in Millisekunden
:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=Beschreibung}
Konfiguration der Schleifenanimation für Kreis-/Donut-/Rose-Diagramme

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=Beschreibung}
Schleifeneffekt für Kreis-/Donut-/Rose-Diagramme

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist
:::

###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animation-Easing-Funktion
:::

###### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden
:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hervorhebungs- oder Atmosphärenfarbe der Animation
:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=Beschreibung}
Konfiguration der Atmosphäre-Animation für Kreis-/Donut-/Rose-Diagramme

:::


###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Atmosphärenanimation
:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Atmosphärenanimation
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}




Datenselektor. Wenn konfiguriert, bietet er Matching-Funktionen für numerische Werte, partielle Datenelemente, Dimensionen oder Kennzahlen. Wenn nicht gesetzt, gelten Stile global.



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::

**Beispiel**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Sprache



Sprachkonfiguration des Diagramms; unterstützt die beiden Sprachen 'zh\-CN' und 'en\-US'. Zusätzlich kann die Sprache über intl.setLocale('zh\-CN') gesetzt werden

:::
