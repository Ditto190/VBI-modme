# RaceScatter

:::note{title=Beschreibung}
Dynamisches Streudiagramm (Race Scatter Chart)

Geeignet, um Datenverteilungen im Zeitverlauf darzustellen; die Position der Datenpunkte repraesentiert zwei Kennzahlenwerte

Anwendungsszenarien:

\- Verteilungsmerkmale im zweidimensionalen Raum analysieren und ihre dynamische Veraenderung im Zeitverlauf darstellen

\- Die Entwicklung der Korrelation zwischen mehreren Variablen im Zeitverlauf darstellen

\- Bewegungsverlaeufe von Datenpunkten im zweidimensionalen Raum beobachten

:::

:::note{title=Note}
Dynamisches Streudiagramm:

\- X- und Y-Achse sind beide numerische Achsen (kontinuierliche Daten) und unterstuetzen mehrere Kennzahlenzuordnungen

\- Die Zeitdimension kann ueber den Player gesteuert werden, um Datenveraenderungen dynamisch darzustellen

\- Datenveraenderungen werden durch Positionsaenderungen der Datenpunkte intuitiv dargestellt

:::


## chartType

**Type:** `"raceScatter"`

:::note{title=Beschreibung}
Dynamisches Streudiagramm, geeignet zur Darstellung von Datenverteilungen im Zeitverlauf

:::


## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datenquelle

:::

## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen, zur Unterscheidung verschiedener Datenreihen und zur Legendenanzeige

:::


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
Datumsformat-Konfiguration der Dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Beschreibung}
Zeitgranularität, bestimmt die Genauigkeit der Datumsanzeige

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Beschreibung}
Dimension-Mapping-Kanaele in Race-Scatter-Diagrammen

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

\- player: unterstützt das Zuordnen mehrerer Dimensionen zum Player-Kanal

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen. Es werden mindestens zwei Kennzahlen benötigt, die jeweils der X-Achse und der Y-Achse zugeordnet werden.

:::

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

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert, höchste Priorität

Wenn autoFormat=true ist, überschreibt dies alle numFormat-Konfigurationen

Wenn aktiviert, wählen Diagramm-Datenlabels und Tooltips anhand von Kennzahlwerten und Locale automatisch die passende Formatierung aus

Formatierungsregeln: Dezimalzahlen mit aktivierter kompakter Schreibweise, mindestens 0 Dezimalstellen, höchstens 2 Dezimalstellen, automatische Rundung und Nutzung der Intl.NumberFormat-Implementierung des Browsers

Beispiel:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Labels und Tooltips angewendet

Hinweis: Für benutzerdefinierte Formatierung muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
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
Dezimalstellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumFractionDigits und maximumFractionDigits des Browsers; niedrigere Priorität als significantDigits

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
Signifikante Stellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumSignificantDigits und maximumSignificantDigits des Browsers; höhere Priorität als fractionDigits

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
Rundungspriorität für die Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus für die Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
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
Dezimalstellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumFractionDigits und maximumFractionDigits des Browsers; niedrigere Priorität als significantDigits

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
Signifikante Stellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumSignificantDigits und maximumSignificantDigits des Browsers; höhere Priorität als fractionDigits

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
Rundungspriorität für die Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus für die Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingMode

:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- xAxis: Kennzahl, die der X-Achse zugeordnet wird

\- yAxis: Kennzahl, die der Y-Achse zugeordnet wird

\- size: Größe, der die Kennzahl zugeordnet wird

\- color: Farbe, der die Kennzahl zugeordnet wird

\- label: Beschriftung, der die Kennzahl zugeordnet wird

\- tooltip: Tooltip, dem die Kennzahl zugeordnet wird

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Erstellt in flacher Kennzahlkonfiguration eine baumförmige Kennzahlgruppe. parentId verweist auf die id der übergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums

:::

:::tip{title=Tip}
Es gibt zwei Möglichkeiten, den Kennzahlbaum zu konfigurieren: erstens direkt als Kennzahlbaum mit children; zweitens als flache Kennzahlliste mit parentId. Beide Methoden können nicht gleichzeitig verwendet werden

:::


## player

**Type:** `Player | undefined`

:::note{title=Beschreibung}
Player-Konfiguration zur Angabe der Zeitdimension; Kernkonfiguration des dynamischen Balkendiagramms



Player-Konfiguration zur Angabe des abzuspielenden Feldnamens; muss eine Dimension sein

:::

:::warning{title=Warning}
Diese Funktion unterstützt keine Diagrammtypen wie table, pivotTable, dualAxis, histogram, boxPlot usw. und kann nicht bei aktivierter Kennzahlenkombination oder Zeilen-/Spalten-Pivot verwendet werden

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=Beschreibung}
Maximale Wiedergabeanzahl; Daten oberhalb dieser Anzahl werden abgeschnitten. false bedeutet keine Begrenzung

:::

### interval

**Type:** `number | undefined`

:::note{title=Beschreibung}
Wiedergabeintervall, Einheit ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob automatisch abgespielt wird

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Wiedergabe in Schleife erfolgt

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Beschreibung}
Player-Position

:::

### railColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Spurfarbe der Player-Fortschrittsleiste

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=Beschreibung}
Player-Textschriftart

:::

### fontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Player-Textschriftgröße

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Fortschrittsfarbe der Player-Fortschrittsleiste

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Sliderfarbe der Player-Fortschrittsleiste

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Sliders der Player-Fortschrittsleiste

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Starttaste des Players

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Pausentaste des Players

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Zurück-Taste des Players

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Vorwärts-Taste des Players

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Beschreibung}
X-Achsen-Sortierkonfiguration, unterstuetzt Sortierung nach Dimension oder Kennzahl sowie benutzerdefinierte Reihenfolge

Kategorieachsen-Sortierung, unterstuetzt Sortierung nach Dimension oder Kennzahl sowie benutzerdefinierte Reihenfolge
:::

**Beispiel**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
Sortierreihenfolge; moegliche Werte sind 'asc' oder 'desc'
:::

**Beispiel**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
Datenelement mit der höchsten Gewinnrate in jeder Region hervorheben
:::

**Beispiel**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Reihenfolge, die direkt auf die Kategorieachse angewendet wird
:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierung



Paginierung-Konfiguration für Diagrammseiten

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
Diagramm-Hintergrundfarbe



Die Hintergrundfarbe kann eine Farbzeichenfolge sein (z. B. 'red', 'blue') oder ein hex-, rgb- oder rgba-Wert (z. B. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## size

**Type:** `number | number[] | undefined`

:::note{title=Beschreibung}
Kennzahlgröße im Streudiagramm, definiert die Größe oder den Größenbereich der Datenpunkte

\- Wenn der Größenbereich eine Zahl wie 10 ist, wird die Datenpunktgröße fest auf 10 gesetzt

\- Wenn der Größenbereich ein Array mit zwei Werten wie [10, 40] ist, liegt die Datenpunktgröße zwischen 10 und 40

\- Schließt sich mit sizeRange gegenseitig aus; niedrigere Priorität als size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Beschreibung}
Größenbereich der Streudiagramm-Kennzahl, definiert den Größenbereich der Datenpunkte,

\- Wenn der Größenbereich ein Array mit zwei Werten wie [10, 40] ist, liegt die Datenpunktgröße zwischen 10 und 40

\- Wenn der Größenbereich eine Zahl wie 10 ist, wird die Datenpunktgröße fest auf 10 gesetzt

\- Schließt sich mit sizeRange gegenseitig aus; höhere Priorität als size

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farbe



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
Lineares Farbverlaufsschema zur Definition der Farben verschiedener Elemente im Diagramm

:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
Farbzuordnung zur Abbildung von Datenwerten auf bestimmte Farben

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

**Type:** `Label | undefined`

:::note{title=Beschreibung}
Label



Label-Konfiguration zur Definition von Datenlabels im Diagramm, einschließlich Position, Format und Stil.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Label-Funktion aktiviert ist

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels in die nächste Zeile umbrechen

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels Kennzahlwerte anzeigen

In Szenarien mit mehreren Kennzahlen besteht kein Konfliktrisiko, da alle darstellungsbezogenen Kennzahlen die `foldMeasures`-Verarbeitung durchlaufen und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert

Hinweis: Das label von encoding hat höhere Priorität; diese Konfiguration wirkt sich nicht auf das label von encoding aus

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels den Prozentanteil von Kennzahlwerten anzeigen

In Szenarien mit mehreren Kennzahlen besteht kein Konfliktrisiko, da alle darstellungsbezogenen Kennzahlen die `foldMeasures`-Verarbeitung durchlaufen und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert

Hinweis: Das label von encoding hat höhere Priorität; diese Konfiguration wirkt sich nicht auf das label von encoding aus

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels Dimensionslabels anzeigen

Alle Dimensionslabels anzeigen

Hinweis: Das label von encoding hat höhere Priorität; diese Konfiguration wirkt sich nicht auf das label von encoding aus

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert, höchste Priorität

Wenn autoFormat=true ist, überschreibt dies alle numFormat-Konfigurationen

Wenn aktiviert, wählen Diagramm-Datenlabels und Tooltips anhand von Kennzahlwerten und Locale automatisch die passende Formatierung aus

Formatierungsregeln: Dezimalzahlen mit aktivierter kompakter Schreibweise, mindestens 0 Dezimalstellen, höchstens 2 Dezimalstellen, automatische Rundung und Nutzung der Intl.NumberFormat-Implementierung des Browsers

Beispiel:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Labels und Tooltips angewendet

Hinweis: Für benutzerdefinierte Formatierung muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
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
Dezimalstellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumFractionDigits und maximumFractionDigits des Browsers; niedrigere Priorität als significantDigits

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
Signifikante Stellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumSignificantDigits und maximumSignificantDigits des Browsers; höhere Priorität als fractionDigits

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
Rundungspriorität für die Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus für die Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftgröße

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Label-Schriftstärke

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Hintergrundfarbe

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Konturfarbe

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Schriftfarbe

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Label-Schriftfarbe abhängig von der Farbe des grafischen Elements automatisch invertiert wird

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Labelposition

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Label-Überlappungsvermeidung aktiviert ist

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Label-Filterung; die Standardbeziehung zwischen Selektoren ist OR

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

Filtert Diagrammmarkierungen (Flächen, Punkte usw.) über KI-generierten JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenelementen mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Das Datenelement mit der höchsten Gewinnmarge je Bereich hervorheben
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

Datenelemente hervorheben, die mehrere Bedingungen erfüllen
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
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Beschreibung}
Legende

Legendenkonfiguration zum Definieren der Diagrammlegende, einschließlich Position, Format und Stil.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Legendenfunktion aktiviert ist.
:::

**Beispiel**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Legendenrahmen aktiviert ist.
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Schriftfarbe

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Pager-Icon-Farbe

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe deaktivierter Pager-Icons

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
Legenden-Schriftfarbe

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende

:::

**Beispiel**
labelFontWeight: 400


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
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximale Spalten oder Zeilen bei vielen Legendeneinträgen





:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltips

Tooltip-Konfiguration zur Definition der Tooltips des Diagramms, einschließlich Position, Format, Stil usw.
:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Label-Funktion aktiviert ist

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Diagramm-Brush-Konfiguration









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

Definiert Form und Auswahlrichtung des Brush

\- `rect`: rechteckige Brush-Auswahl; Auswahl gleichzeitig in X- und Y-Achsenrichtung möglich

\- `polygon`: Polygon-Brush-Auswahl; zeichnet durch Klicken auf mehrere Punkte ein beliebiges Polygon zur Auswahl

\- `x`: X-Achsen-Brush-Auswahl; wählt nur in X-Achsenrichtung aus, Y-Achse ist nicht beschränkt

\- `y`: Y-Achsen-Brush-Auswahl; wählt nur in Y-Achsenrichtung aus, X-Achse ist nicht beschränkt
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
\- `multiple`: Mehrfachmodus, in dem mehrere brush-Auswahlen gleichzeitig bestehen können



Definiert den Brush-Auswahlmodus


\- `multiple`: Mehrfachauswahlmodus; mehrere brush-Bereiche können gleichzeitig existieren

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Brush-Bereich nach Ende der Auswahl gelöscht wird

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Deckkraft nicht ausgewählter Datenpunkte, Bereich 0-1



Definiert den Stil der mit Brush ausgewählten Datenpunkte
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft



Deckkraft ausgewählter Datenpunkte, Bereich 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konturfarbe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achse, Kategorieachse, X-Achsenkonfiguration; definiert die X-Achse des Diagramms einschließlich Position, Format, Stil usw.



Definiert den Stil der Datenpunkte außerhalb der Brush-Auswahl
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft



Deckkraft ausgewählter Datenpunkte, Bereich 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konturfarbe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::

## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Beschreibung}
X-axis numeric-axis configuration, used to define the chart X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse sichtbar ist
:::

### min

**Type:** `number | undefined`

:::note{title=Beschreibung}
Achsenlinie width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob eine logarithmische Achse verwendet wird; gilt nur für numerische Achsen

:::

### logBase

**Type:** `number | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Y-Achsen-Einstellung (Kategorieachse) zur Definition der Y-Achse, einschließlich Position, Format, Stil usw.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse umgekehrt angezeigt wird; nur fuer numerische Achsen wirksam
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Wert 0 auf der Achse erzwungen angezeigt wird; ist min und max gesetzt, ist diese Option unwirksam. Nur fuer numerische Achsen wirksam.
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert, höchste Priorität

Wenn autoFormat=true ist, überschreibt dies alle numFormat-Konfigurationen

Wenn aktiviert, wählen Diagramm-Datenlabels und Tooltips anhand von Kennzahlwerten und Locale automatisch die passende Formatierung aus

Formatierungsregeln: Dezimalzahlen mit aktivierter kompakter Schreibweise, mindestens 0 Dezimalstellen, höchstens 2 Dezimalstellen, automatische Rundung und Nutzung der Intl.NumberFormat-Implementierung des Browsers

Beispiel:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Labels und Tooltips angewendet

Hinweis: Für benutzerdefinierte Formatierung muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
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
Dezimalstellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumFractionDigits und maximumFractionDigits des Browsers; niedrigere Priorität als significantDigits

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
Signifikante Stellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumSignificantDigits und maximumSignificantDigits des Browsers; höhere Priorität als fractionDigits

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
Rundungspriorität für die Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus für die Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingMode

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
Skalenlabels der X-Achse
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Labelfarbe
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftgroesse
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftstaerke
:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Drehwinkel
:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsenlinie
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Achsenlinienfarbe
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Ticks nach innen zeigen
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Tick-Farbe
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Tick-Groesse
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsentitel
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
Titeltext; folgt standardmaessig der Feldkonfiguration
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Titelfarbe
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Titel-Schriftgroesse
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Titel-Schriftstaerke
:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Enthalt die integrierten Themes `light` und `dark`. Benutzerdefinierte Themes konnen uber `registerTheme` hinzugefugt werden.

:::


#### visible

**Type:** `boolean | undefined`
#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionenfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
X-Achsen-Animationskonfiguration
:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
}
:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Beschreibung}
Y-Achse



Numerische Achse. Y-Achsen-Konfiguration zur Definition von Position, Format, Stil und zugehörigen Einstellungen.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse sichtbar ist
:::

### min

**Type:** `number | undefined`

:::note{title=Beschreibung}
Achsenlinie width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob eine logarithmische Achse verwendet wird; gilt nur für numerische Achsen

:::

### logBase

**Type:** `number | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Y-Achsen-Einstellung (Kategorieachse) zur Definition der Y-Achse, einschließlich Position, Format, Stil usw.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse umgekehrt angezeigt wird; nur fuer numerische Achsen wirksam
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Wert 0 auf der Achse erzwungen angezeigt wird; ist min und max gesetzt, ist diese Option unwirksam. Nur fuer numerische Achsen wirksam.
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert, höchste Priorität

Wenn autoFormat=true ist, überschreibt dies alle numFormat-Konfigurationen

Wenn aktiviert, wählen Diagramm-Datenlabels und Tooltips anhand von Kennzahlwerten und Locale automatisch die passende Formatierung aus

Formatierungsregeln: Dezimalzahlen mit aktivierter kompakter Schreibweise, mindestens 0 Dezimalstellen, höchstens 2 Dezimalstellen, automatische Rundung und Nutzung der Intl.NumberFormat-Implementierung des Browsers

Beispiel:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Labels und Tooltips angewendet

Hinweis: Für benutzerdefinierte Formatierung muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
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
Dezimalstellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumFractionDigits und maximumFractionDigits des Browsers; niedrigere Priorität als significantDigits

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
Signifikante Stellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumSignificantDigits und maximumSignificantDigits des Browsers; höhere Priorität als fractionDigits

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
Rundungspriorität für die Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus für die Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingMode

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
Skalenlabels der X-Achse
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Labelfarbe
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftgroesse
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftstaerke
:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Drehwinkel
:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsenlinie
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Achsenlinienfarbe
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Ticks nach innen zeigen
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Tick-Farbe
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Tick-Groesse
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsentitel
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
Titeltext; folgt standardmaessig der Feldkonfiguration
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Titelfarbe
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Titel-Schriftgroesse
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Titel-Schriftstaerke
:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Enthalt die integrierten Themes `light` und `dark`. Benutzerdefinierte Themes konnen uber `registerTheme` hinzugefugt werden.

:::


#### visible

**Type:** `boolean | undefined`
#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionenfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
X-Achsen-Animationskonfiguration
:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
}
:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Beschreibung}
Vertikale Hilfslinie

Vertikale Hilfslinie, die angezeigt wird, wenn die Maus ueber das Diagramm bewegt wird.

Crosshair-Konfiguration zum Anzeigen von Crosshair-Linien (Hilfslinien) im Diagramm.
:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse sichtbar ist
:::

### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Crosshair-Linie

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Schriftfarbe

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das Label der Crosshair-Linie angezeigt wird

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Hintergrundfarbe

:::

## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Theme-Konfiguration

Theme

Es gibt die integrierten Themes light und dark; neue Themes können über registerTheme als eigene Themes definiert werden.

:::

### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Beschreibung}
Punktmarkierungs-Stilkonfiguration, mit der Farbe, Rahmen und zugehörige Einstellungen der Punktmarkierung definiert werden.

Unterstützt globale Stilkonfiguration oder bedingte Stilkonfiguration

Datenfilter




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionenfeldwert nicht im `value`-Array enthalten ist.






:::

**Beispiel**
Strichfarbe des Balken-Primitives (Rechteck)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}


selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

Filtert Diagrammmarkierungen (Flächen, Punkte usw.) über KI-generierten JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenelementen mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Das Datenelement mit der höchsten Gewinnmarge je Bereich hervorheben
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

Datenelemente hervorheben, die mehrere Bedingungen erfüllen
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
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


### pointVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Punkte sichtbar sind

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Punktgroesse



Punktgroesse

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Punktmarke



Farbe der Punktmarke

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Punktmarkenfarbe



Deckkraft der Punktmarkenfarbe

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe der Punktmarke



Rahmenfarbe der Punktmarke

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite der Punktmarke



Rahmenbreite der Punktmarke

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Rahmenstil der Punktmarke



Rahmenstil der Punktmarke

:::

**Beispiel**
solid

dashed

dotted




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Beschreibung}
Konfiguration von Anmerkungspunkten. Definiert Diagramm-Anmerkungspunkte auf Basis ausgewählter Daten, einschließlich Position, Format, Stil und zugehöriger Einstellungen.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Label-Filterung; die Standardbeziehung zwischen Selektoren ist OR

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### measureId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Gibt die measure id an, zu der der Annotationspunkt gehört. In Szenarien mit mehreren Kennzahlen kann sie mit selector kombiniert werden, um den Annotationspunkt der Zielkennzahl eindeutig zu lokalisieren.
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

Filtert Diagrammmarkierungen (Flächen, Punkte usw.) über KI-generierten JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenelementen mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Das Datenelement mit der höchsten Gewinnmarge je Bereich hervorheben
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

Datenelemente hervorheben, die mehrere Bedingungen erfüllen
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
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Markierungstext'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel auf right setzen, damit der Text links vom Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'right', damit der Text links vom Annotationspunkt liegt

right: Text links vom Annotationspunkt, rechte Textkante am Annotationspunkt ausgerichtet

left: Text rechts vom Annotationspunkt, linke Textkante am Annotationspunkt ausgerichtet

center: Text zentriert auf dem Annotationspunkt

:::

**Beispiel**
'right' Text liegt links vom Annotationspunkt
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. In der Regel auf top setzen, damit der Text unter dem Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'top', damit der Text vollständig im sichtbaren Bereich angezeigt wird

top: Text unter dem Annotationspunkt, obere Textkante am Annotationspunkt ausgerichtet

middle: Text zentriert auf dem Annotationspunkt

bottom: Text über dem Annotationspunkt, untere Textkante am Annotationspunkt ausgerichtet

:::

**Beispiel**
'top' Text liegt unter dem Annotationspunkt
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Hintergrundrahmens

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4



### offsetY

**Type:** `number | undefined`

:::note{title=Beschreibung}




Ob der Hintergrund sichtbar ist.

:::

**Beispiel**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Beschreibung}
Pixelversatz des gesamten Annotationspunkts in X-Richtung. Liegt der Punkt links im Diagramm (Start der Kategorieachse), wird ein positiver Wert empfohlen; liegt er rechts (Ende der Kategorieachse), ein negativer Wert.

Negative Werte verschieben die gesamte Komponente nach links, z. B. verschiebt -10 Text und Hintergrund zusammen um 10 Pixel nach links

Positive Werte verschieben die gesamte Komponente nach rechts, z. B. verschiebt 10 Text und Hintergrund zusammen um 10 Pixel nach rechts

:::

**Beispiel**
offsetX: 5, der gesamte Annotationspunkt wird um 5 Pixel nach rechts verschoben
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
Annotationslinie für Dimensionswerte, vertikal angezeigt, mit konfigurierbarer Position und Stil

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
);
:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Berechnet den Wert der Annotationslinie dynamisch über KI-generierten JavaScript-Code.

Geeignet, wenn die Position der Annotationslinie datenabhängig dynamisch bestimmt werden muss, z. B. Durchschnitt, Maximum, Quantil oder Geschäftslinie.

Nur Browserumgebungen werden unterstützt (Web Worker erforderlich).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Beschreibung}
\- Eingabeparameter: data (Array), wobei jedes Element ein __row_index-Feld für die Zeilennummer enthält



\- __row_index steht für die Zeilennummer des ursprünglichen Datenobjekts; field steht für das hervorzuhebende Feld






\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```


```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Ausgewahlte Dimensionenfeldwerte; unterstutzt Arrays.

:::

**Beispiel**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel auf right setzen, damit der Text links vom Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'right', damit der Text links vom Annotationspunkt liegt

right: Text links vom Annotationspunkt, rechte Textkante am Annotationspunkt ausgerichtet

left: Text rechts vom Annotationspunkt, linke Textkante am Annotationspunkt ausgerichtet

center: Text zentriert auf dem Annotationspunkt

:::

**Beispiel**
'right' Text liegt links vom Annotationspunkt
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. In der Regel auf top setzen, damit der Text unter dem Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'top', damit der Text vollständig im sichtbaren Bereich angezeigt wird

top: Text unter dem Annotationspunkt, obere Textkante am Annotationspunkt ausgerichtet

middle: Text zentriert auf dem Annotationspunkt

bottom: Text über dem Annotationspunkt, untere Textkante am Annotationspunkt ausgerichtet

:::

**Beispiel**
'top' Text liegt unter dem Annotationspunkt
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Deckkraft der Markierungsbereichsfarbe
:::

**Beispiel**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Anmerkungsbereichs.

:::

**Beispiel**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Anmerkungsbereichs.

:::

**Beispiel**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Liniensegmentstil

:::

**Beispiel**
`lineStyle: 'solid'`




### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Hintergrundrahmens

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4



## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Beschreibung}
Numerische Anmerkungslinie, einschließlich Durchschnitts-, Maximum- und Minimumlinien. Sie wird horizontal angezeigt und kann nach Position und Stil konfiguriert werden. Verwenden Sie diese Konfiguration, um Anmerkungslinien für numerische Werte wie Durchschnittslinien zu zeichnen.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
Fester Y-Wert zum Markieren einer horizontalen Linie. Wenn die Kategorieachse in Y-Richtung liegt, kann ein Dimensionswert eingegeben werden; bei einer numerischen Achse ein konkreter Zahlenwert.

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Berechnet den Wert der Annotationslinie dynamisch über KI-generierten JavaScript-Code.

Geeignet, wenn die Position der Annotationslinie datenabhängig dynamisch bestimmt werden muss, z. B. Durchschnitt, Maximum, Quantil oder Geschäftslinie.

Nur Browserumgebungen werden unterstützt (Web Worker erforderlich).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Beschreibung}
\- Eingabeparameter: data (Array), wobei jedes Element ein __row_index-Feld für die Zeilennummer enthält



\- __row_index steht für die Zeilennummer des ursprünglichen Datenobjekts; field steht für das hervorzuhebende Feld






\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```


```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Ausgewahlte Dimensionenfeldwerte; unterstutzt Arrays.

:::

**Beispiel**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel auf right setzen, damit der Text links vom Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'right', damit der Text links vom Annotationspunkt liegt

right: Text links vom Annotationspunkt, rechte Textkante am Annotationspunkt ausgerichtet

left: Text rechts vom Annotationspunkt, linke Textkante am Annotationspunkt ausgerichtet

center: Text zentriert auf dem Annotationspunkt

:::

**Beispiel**
'right' Text liegt links vom Annotationspunkt
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. In der Regel auf top setzen, damit der Text unter dem Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'top', damit der Text vollständig im sichtbaren Bereich angezeigt wird

top: Text unter dem Annotationspunkt, obere Textkante am Annotationspunkt ausgerichtet

middle: Text zentriert auf dem Annotationspunkt

bottom: Text über dem Annotationspunkt, untere Textkante am Annotationspunkt ausgerichtet

:::

**Beispiel**
'top' Text liegt unter dem Annotationspunkt
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Hintergrundrahmens

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Deckkraft der Markierungsbereichsfarbe



Deckkraft der Markierungsbereichsfarbe
:::

**Beispiel**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Anmerkungsbereichs.

:::

**Beispiel**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Anmerkungsbereichs.

:::

**Beispiel**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Liniensegmentstil

:::

**Beispiel**
`lineStyle: 'solid'`




### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Beschreibung}
Strichelstil des Rahmens des Anmerkungsbereichs.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Primärfarbe für den Teil größer als der Markierungswert
:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Beschreibung}
Annotationsbereich

Annotationsbereich-Konfiguration, die anhand der ausgewaehlten Daten Position und Stil des Annotationsbereichs definiert.
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Beschreibung}
Ob die Dimensionenverknupfung aktiviert wird, wenn im Diagramm Perspektive aktiviert ist oder Kennzahlen kombiniert sind.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Beschreibung}
2

:::

**Beispiel**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel auf right setzen, damit der Text links vom Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'right', damit der Text links vom Annotationspunkt liegt

right: Text links vom Annotationspunkt, rechte Textkante am Annotationspunkt ausgerichtet

left: Text rechts vom Annotationspunkt, linke Textkante am Annotationspunkt ausgerichtet

center: Text zentriert auf dem Annotationspunkt

:::

**Beispiel**
'right' Text liegt links vom Annotationspunkt
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. In der Regel auf top setzen, damit der Text unter dem Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'top', damit der Text vollständig im sichtbaren Bereich angezeigt wird

top: Text unter dem Annotationspunkt, obere Textkante am Annotationspunkt ausgerichtet

middle: Text zentriert auf dem Annotationspunkt

bottom: Text über dem Annotationspunkt, untere Textkante am Annotationspunkt ausgerichtet

:::

**Beispiel**
'top' Text liegt unter dem Annotationspunkt
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Hintergrundrahmens

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Markierungsbereichs

:::

**Beispiel**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Markierungsbereichsfüllung
:::

**Beispiel**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Markierungsbereichs
:::

**Beispiel**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Markierungsbereichs
:::

**Beispiel**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Eckenradius des Markierungsbereichsrahmens
:::

**Beispiel**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Linienstil des Markierungsbereichsrahmens
:::

**Beispiel**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Randabstand des Markierungsbereichs

:::

**Beispiel**
0




## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Language



Sprachkonfiguration des Diagramms. Unterstützt 'zh\-CN' und 'en\-US'; zusätzlich kann die Sprache über intl.setLocale('zh\-CN') gesetzt werden

:::
