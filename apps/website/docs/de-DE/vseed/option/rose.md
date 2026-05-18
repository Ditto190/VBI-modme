# Rose

:::info{title=Empfohlen}
\- Empfohlene Feldkonfiguration: `1` Kennzahl, `1` Dimension

\- Unterstützt Datenumformung: mindestens `1` Kennzahl, `0` Dimensionen

:::

:::info{title=Encoding-Zuordnung}
Das gestapelte Rosendiagramm unterstützt die folgenden visuellen Kanäle:

`angle`  : Winkelkanal, unterstützt `mehrere Dimensionen` und ordnet Dimensionswerte der Winkelachse zu

`radius` : Radiuskanal, unterstützt `mehrere Kennzahlen` und ordnet Kennzahlwerte der Radiusachse zu

`detail` : Detailkanal, unterstützt `mehrere Dimensionen` und wird verwendet, um innerhalb derselben Farbserie detailliertere Daten anzuzeigen

`color`  : Farbkanal, unterstützt `mehrere Dimensionen` oder `eine Kennzahl`; Dimensionsfarben unterscheiden Datenreihen, Kennzahlfarben bilden Kennzahlwerte linear auf Grafikfarben ab

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und wird beim Hover über einen Datenpunkt angezeigt

`label`  : Label-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und zeigt Datenlabels auf Datenpunkten an

:::

:::note{title=Beschreibung}
Das gestapelte Rosendiagramm eignet sich für Vergleiche mehrdimensionaler Daten und zeigt die Datengröße über Bogenlänge und Radius der Sektoren im Polarkoordinatensystem

Geeignete Szenarien:

\- Verteilungsvergleich mehrdimensionaler Daten

\- Vergleich von Ausprägungen in periodischen Daten

\- Gleichzeitige Anzeige von Werten und Anteilen kategorischer Daten

:::

:::warning{title=Warning}
Datenanforderungen:

\- Mindestens 1 numerisches Feld

\- Die erste Dimension wird auf der Winkelachse platziert; weitere Dimensionen werden mit Kennzahlnamen (wenn mehrere Kennzahlen vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt

\- Alle Kennzahlen werden automatisch zu einer Kennzahl zusammengeführt

Standardmäßig aktivierte Funktionen:

\- Legende, Polarkoordinatensystem, Datenlabels, Tooltips und Werteskalierung sind standardmäßig aktiviert

:::


## chartType

**Type:** `"rose"`

:::note{title=Beschreibung}
Gestapeltes Rosendiagramm



Gestapeltes Rosendiagramm, das Vergleichsbeziehungen mehrdimensionaler Daten über ein Polarkoordinatensystem darstellt

:::

**Beispiel**
'rose'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datensatz



Ein aggregierter Datensatz gemäß TidyData-Spezifikation, der Datenquelle und Struktur des Diagramms definiert. Vom Benutzer eingegebene Datensätze benötigen keine manuelle Verarbeitung; VSeed bietet eine leistungsfähige Datenumformung und transformiert die Daten automatisch. Die Daten des Rosendiagramms werden am Ende in 2 Dimensionen und 1 Kennzahl umgewandelt.

:::

**Beispiel**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen



Die erste Dimension des Rosendiagramms wird der Winkelachse zugeordnet; weitere Dimensionen werden mit Kennzahlnamen (wenn mehrere Kennzahlen vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: 'category', alias: 'Category'}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Feld-ID der Dimension

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
Zeitgranularität, bestimmt die Anzeigegenauigkeit des Datums

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- angle: unterstützt die Zuordnung mehrerer Dimensionen zum Winkelkanal

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: Unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: Unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen



Kennzahlen im Rosendiagramm werden automatisch zu einer Kennzahl zusammengeführt und der Radiusachse zugeordnet. Wenn mehrere Kennzahlen vorhanden sind, werden Kennzahlnamen mit weiteren Dimensionen zusammengeführt und als Legendeneinträge angezeigt.
:::

**Beispiel**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Kennzahl-ID, darf nicht doppelt vorkommen

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Kennzahl-Alias; Duplikate sind zulässig. Wenn nicht gesetzt, ist alias gleich id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert und mit höchster Priorität

Wenn autoFormat=true ist, überschreibt es alle numFormat-Konfigurationen

Wenn aktiviert, wählen Datenbeschriftungen und Tooltips des Diagramms automatisch eine passende Formatierung anhand von Kennzahlwerten und Locale

Formatierungsregeln: Dezimalzahlen mit aktivierter compact notation, mindestens 0 und höchstens 2 Nachkommastellen, automatische Rundung, implementiert über Intl.NumberFormat des Browsers

Beispiel:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf label und tooltip angewendet

Hinweis: Um benutzerdefinierte Formatierung zu verwenden, muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: Zahl (Dezimalzahl), Prozent (%), Promille (‰) und wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
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
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

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
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

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
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: Zahl (Dezimalzahl), Prozent (%), Promille (‰) und wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
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
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

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
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

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
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingMode

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- radius: Kennzahl, die dem Radiuskanal zugeordnet wird

\- color: Kennzahl, die dem Farbkanal zugeordnet wird

\- label: dem label-Kanal zugeordnete Kennzahl

\- tooltip: dem tooltip-Kanal zugeordnete Kennzahl

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
In der flachen Kennzahlenkonfiguration wird eine baumförmige Kennzahlgruppe aufgebaut. parentId verweist auf die id der übergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums

:::

:::tip{title=Tip}
Es gibt zwei Formen der Kennzahlbaum-Konfiguration: direkt einen Kennzahlbaum mit children konfigurieren oder eine flache Kennzahlliste mit parentId konfigurieren. Beide Formen können nicht gleichzeitig verwendet werden.

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierungskonfiguration, mit der der Feldname für die Paginierung angegeben wird; dieser muss eine Dimension sein.

:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Paginierungsfeld; gibt den Feldnamen für die Paginierung an, muss eine Dimension sein

:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Aktueller Paginierungswert; gibt den Wert an, mit dem die aktuelle Seite bestimmt wird

:::

**Beispiel**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Diagrammhintergrundfarbe



Die Hintergrundfarbe kann ein Farbstring sein (z. B. 'red', 'blue') oder ein Hex-, rgb- oder rgba-Wert (z. B. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Color



Farbkonfiguration zur Definition des Farbschemas des Diagramms, einschließlich Farblisten, Farbzuordnungen und Farbverläufen.

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
Linearer Farbverlauf zur Definition der Farben verschiedener Elemente im Diagramm

:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
Farbzuordnung, die Datenwerte bestimmten Farben zuordnet

:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konfiguration für positive/negative Farben; definiert die Farbe positiver Werte im Diagramm

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konfiguration für positive/negative Farben; definiert die Farbe negativer Werte im Diagramm

:::


## label

**Type:** `PieLabel | undefined`

:::note{title=Beschreibung}
Label



Beschriftungskonfiguration zur Definition der Datenlabels des Diagramms, einschließlich Position, Format und Stil.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Label-Funktion aktiviert ist

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen in die nächste Zeile umbrechen

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels Kennzahlwerte anzeigen

In Szenarien mit mehreren Kennzahlen gibt es keine Konflikte zwischen Werten, da alle zeichnungsrelevanten Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl für einen einzelnen Datenpunkt zusammengeführt werden

Hinweis: Das label in encoding hat höhere Priorität; diese Konfiguration beeinflusst das label in encoding nicht

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels den Prozentsatz der Kennzahlwerte anzeigen

In Szenarien mit mehreren Kennzahlen gibt es keine Konflikte zwischen Werten, da alle zeichnungsrelevanten Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl für einen einzelnen Datenpunkt zusammengeführt werden

Hinweis: Das label in encoding hat höhere Priorität; diese Konfiguration beeinflusst das label in encoding nicht

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels Dimensionslabels anzeigen

Alle Dimensionslabels anzeigen

Hinweis: Das label in encoding hat höhere Priorität; diese Konfiguration beeinflusst das label in encoding nicht

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labelwerte automatisch formatiert werden; wenn autoFormat true ist, wird die numFormat-Konfiguration ignoriert

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Formatkonfiguration für Beschriftungswerte; wird mit `format` in `measure` zusammengeführt, wobei `format` in `measure` höhere Priorität hat. numFormat hat niedrigere Priorität als autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: Zahl (Dezimalzahl), Prozent (%), Promille (‰) und wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
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
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

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
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

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
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingMode

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
Label-Hintergrundfarbe

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Strichfarbe

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe des Labels

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Label-Schriftfarbe anhand der Farbe des grafischen Elements automatisch invertiert wird

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Labelposition

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Anti-Überlappungsfunktion für Beschriftungen aktiviert ist

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Label-Filterung; die Standardbeziehung zwischen Selektoren ist OR

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld, die id eines Eintrags in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
return _.flatten(

\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist


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
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik mit KI-generiertem JavaScript-Code

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Sichere Ausführung in der Browserumgebung (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; in Node.js wird fallback verwendet

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

Filtert Diagramm-Markierungen (Balken, Punkte usw.) mit KI-generiertem JavaScript-Code

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

"Den Balken mit der höchsten Gewinnrate je Region hervorheben"


#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode

- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array); jedes item enthält __row_index als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index steht für die Zeilennummer des ursprünglichen Dateneintrags, field für das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Dateneinträgen mit sales über 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Den Dateneintrag mit der höchsten Gewinnrate je Region hervorheben
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

Dateneinträge hervorheben, die mehrere Bedingungen erfüllen
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
Fallback, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird

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

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

entspricht operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt den Wert des Dimensionsfelds im Dateneintrag aus; Arrays werden unterstützt

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
\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen







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
Hervorheben des sales-Felds für Datenelemente mit sales größer als 1000



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Legendenrahmen aktiviert ist
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
Hervorheben des Datenelements mit der höchsten Gewinnmarge in jedem Bereich



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
const profitRate = item.profit / item.sales;

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
return _.flatten(

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Legende
:::

**Beispiel**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende
:::

**Beispiel**
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Legendenform
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legendenposition
:::

**Beispiel**
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist



### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist





:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltip

Tooltip-Konfiguration zum Definieren der Diagramm-Tooltips, einschließlich Position, Format und Stil.
:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob Tooltip-Informationen aktiviert sind
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}
Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt



\- `y`: Auswahl entlang der Y-Achse; beschränkt die Auswahl auf die Y-Achsenrichtung, während die X-Achse uneingeschränkt bleibt

\- `rect`: rechteckige Brush-Auswahl, verfügbar in X- und Y-Achsenrichtung

\- `polygon`: Polygon-Brush-Auswahl; zeichnet durch Klicken mehrerer Punkte ein beliebiges Polygon


\- `y`: Brush-Auswahl entlang der Y-Achse, nur in Y-Achsenrichtung beschränkt

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
Brush-Auswahlmodus, Einzel- oder Mehrfachauswahl



Definiert den Brush-Auswahlmodus


\- `multiple`: Mehrfachauswahlmodus; mehrere Brush-Bereiche können gleichzeitig vorhanden sein

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Brush-Bereich nach Ende der Auswahl geleert wird

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



Deckkraft der ausgewählten Datenpunkte, Bereich 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Stil für Daten außerhalb des Brush-Bereichs

Definiert den Stil nicht ausgewählter Datenpunkte
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
legend font color



Deckkraft nicht ausgewählter Datenpunkte, Wertebereich 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=Beschreibung}
Schriftgröße der Legende



Diagrammanimationskonfiguration; verfügbare Effekte hängen vom Diagrammtyp ab

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
legend font color

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=Beschreibung}
Erscheinungsanimation für Kreis-, Donut- und Rosendiagramme

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Beschreibung}
Erscheinungseffekte für Kreis-, Donut- und Rosendiagramme, unterstützt radiale und Skalierungsanimationen

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
Aktualisierungsanimation für Kreis-, Donut- und Rosendiagramme

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=Beschreibung}
Aktualisierungseffekte für Kreis-, Donut- und Rosendiagramme, unterstützt radiale Animation

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
Tooltip-Konfiguration zur Definition der Tooltips des Diagramms, einschließlich Position, Format, Stil usw.

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
\- `polygon`: Polygon-Auswahl; durch Klicken mehrerer Punkte können beliebige Polygone zur Auswahl gezeichnet werden

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=Beschreibung}
Loop-Effekt für Kreis-, Donut- und Rosendiagramme

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Definiert den Stil der ausgewählten Datenpunkte.

:::

###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
brushtype

:::

###### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden

:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Deckkraft der ausgewählten Datenpunkte, Bereich 0-1

:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=Beschreibung}
\- `polygon`: Polygon-Brush-Auswahl; durch Klicken mehrerer Punkte wird ein beliebiges Polygon zur Auswahl gezeichnet

:::


###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- `x`: Brush-Auswahl nur in X-Achsenrichtung; die Y-Achsenrichtung ist nicht eingeschränkt

:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- `y`: Brush-Auswahl in Y-Achsenrichtung; die X-Achsenrichtung ist nicht eingeschränkt

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagrammthema. Das Thema ist eine funktionale Konfiguration mit niedrigerer Priorität und enthält allgemeine Einstellungen für alle Diagrammtypen sowie Einstellungen für einen einzelnen Diagrammtyp.



Zwei integrierte Themen stehen bereit: light und dark. Benutzer können Themen über Builder anpassen.



Thema



Zwei integrierte Themen stehen bereit: light und dark; neue Themen können über registerTheme angepasst werden.
:::

**Beispiel**
Ob der Brush-Bereich nach Ende der Auswahl gelöscht wird

Deckkraft nicht ausgewählter Datenpunkte, Bereich 0-1

Definiert den Stil der mit Brush ausgewählten Datenpunkte




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Stil für nicht ausgewählte Datenelemente



Definiert den Stil der Datenpunkte außerhalb der Brush-Auswahl

:::
