# Heatmap

:::info{title=Empfohlen}
- Empfohlene Feldkonfiguration: `1` Kennzahl, `2` Dimensionen

- Unterstützt Data Reshape: mindestens `1` Kennzahl, `0` Dimensionen

:::

:::info{title=Encoding-Zuordnung}
Das Heatmap-Diagramm unterstützt die folgenden visuellen Kanäle:

`xAxis`      : X-Achsen-Kanal, unterstützt `mehrere Dimensionen`, Zuordnung zur X-Achse nach Dimensionswert

`yAxis`      : Y-Achsen-Kanal, unterstützt `mehrere Dimensionen`, Zuordnung zur Y-Achse nach Dimensionswert

`detail`     : Detailkanal, unterstützt `mehrere Dimensionen`, zur Anzeige feinerer Daten innerhalb derselben Farbserie

`color`      : Farbkanal, unterstützt `eine Kennzahl`, ordnet Kennzahlwerte der Farbintensität zu

`tooltip`    : Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`, wird beim Hover über einen Datenpunkt angezeigt

`label`      : Beschriftungskanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`, zeigt Datenbeschriftungen auf Datenpunkten an

:::

:::note{title=Beschreibung}
Heatmap-Diagramm, das Verteilung und Intensitätsbeziehungen von Daten über Farbtiefe in einer zweidimensionalen Matrix zeigt.

Geeignete Szenarien:

- Darstellung von Dichte und Intensität großer zweidimensionaler Daten

- Korrelationsanalyse zwischen Kategorien und numerischen Werten

- Kreuzvergleich zwischen Zeitreihen und Kategorien

:::

:::warning{title=Warning}
Datenanforderungen:

- Mindestens 2 Dimensionsfelder zur Bestimmung der Zeilen und Spalten des Heatmap-Diagramms

- Mindestens 1 numerisches Feld zur Zuordnung der Farbtiefe

- Wenn mehrere Kennzahlen unterstützt werden, wird üblicherweise eine Kennzahl für die Farbzuordnung ausgewählt

Standardmäßig aktivierte Funktionen:

- Legende, Achsen, Datenbeschriftungen, Tooltips und numerische Skalierung sind standardmäßig aktiviert.

:::


## chartType

**Type:** `"heatmap"`

:::note{title=Beschreibung}
Heatmap-Diagramm, das Verteilung und Intensitätsbeziehungen von Daten über Farbtiefe in einer zweidimensionalen Matrix zeigt.

:::

**Beispiel**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Dataset. Ein bereits aggregierter Datensatz gemäß TidyData-Spezifikation, der Datenquelle und Struktur des Diagramms definiert. Benutzereingaben erfordern keine Vorverarbeitung; VSeed verfügt über leistungsfähige Data-Reshape-Funktionen, die die Formatierung automatisch übernehmen. Daten des Heatmap-Diagramms werden letztlich in 2 Dimensionen und 1 Kennzahl konvertiert.

:::

**Beispiel**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen. Bei Heatmap-Diagrammen wird die erste Dimension üblicherweise der X-Achse zugeordnet, während andere Dimensionen mit Kennzahlnamen (falls mehrere vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt werden.

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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird:

- xAxis: unterstützt die Zuordnung mehrerer Dimensionen zur X-Achse

- yAxis: unterstützt die Zuordnung mehrerer Dimensionen zur Y-Achse

- tooltip: unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

- label: unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen. Kennzahlen des Heatmap-Diagramms werden automatisch zu einer Kennzahl zusammengeführt und der Farbskala zugeordnet. Wenn mehrere Kennzahlen vorhanden sind, werden ihre Namen mit anderen Dimensionen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: 'value', alias: 'Wert'}]




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
Automatische Zahlenformatierung, standardmäßig aktiviert, höchste Priorität.

Wenn autoFormat=true ist, werden alle numFormat-Konfigurationen überschrieben.

Wenn aktiviert, wählen Diagramm-Datenbeschriftungen und Tooltips automatisch die passende Formatierung anhand von Kennzahlwerten und Gebietsschema aus.

Formatierungsregeln: Dezimalzahlen mit aktivierter compact notation, mindestens 0 und höchstens 2 Dezimalstellen, automatische Rundung, umgesetzt mit Intl.NumberFormat des Browsers.

Zum Beispiel:

- locale=zh-CN: 749740.264 → 74.45~74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Beschriftungen und Tooltips angewendet.

Hinweis: Für benutzerdefinierte Formatierung muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration.

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
- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



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
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser; höhere Priorität als fractionDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingPriority.

:::

**Beispiel**
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode.

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
- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



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
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser; höhere Priorität als fractionDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingPriority.

:::

**Beispiel**
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode.

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird:

- color: Kennzahl wird dem Farbkanal zugeordnet

- label: Kennzahl wird dem Beschriftungskanal zugeordnet

- tooltip: Kennzahl wird dem Tooltip-Kanal zugeordnet

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
In einer flachen Kennzahlkonfiguration wird eine baumartige Kennzahlstruktur aufgebaut. parentId verweist auf die ID der übergeordneten Kennzahlgruppe und dient zum Aufbau der Hierarchie.

:::

:::tip{title=Tipp}
Es gibt zwei Möglichkeiten, den Kennzahlbaum zu konfigurieren: Option 1 konfiguriert den Kennzahlbaum direkt mit children; Option 2 stellt eine flache Kennzahlliste mit parentId bereit. Beide Methoden können nicht gleichzeitig verwendet werden.

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierungskonfiguration.

:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Paginierungsfeld; legt den Feldnamen für die Paginierung fest und muss eine Dimension sein.

:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Aktueller Paginierungswert; legt den Wert fest, mit dem die aktuelle Seite bestimmt wird.

:::

**Beispiel**
'2023-01-01'




## backgroundColor

**Type:** `BackgroundFarbe`

:::note{title=Beschreibung}
Hintergrundfarbe des Diagramms.

Background color can be a color string (e.g., 'red', 'blue'), or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Farbe | undefined`

:::note{title=Beschreibung}
Farbkonfiguration zur Definition des Farbschemas des Diagramms, einschließlich Farblisten, Farbzuordnungen und Farbverläufen.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Diskretes Farbschema zur Definition der Farben verschiedener Elemente im Diagramm.

:::

**Beispiel**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Lineares Verlaufsfarbschema zur Definition der Farben verschiedener Elemente im Diagramm.

:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
Farbzuordnung, mit der Datenwerte bestimmten Farben zugeordnet werden.

:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe für positive Werte im Diagramm.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe für negative Werte im Diagramm.

:::


## label

**Type:** `Beschriftung | undefined`

:::note{title=Beschreibung}
Beschriftungskonfiguration für Heatmap-Diagramme. Dient zur Definition von Datenbeschriftungen und aktiviert automatisch die Beschriftungsinversion, um Lesbarkeit vor Hintergrundfarben sicherzustellen.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Beschriftungsfunktion aktiviert ist.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen in die nächste Zeile umbrechen.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte anzeigen.

In Szenarien mit mehreren Kennzahlen müssen keine widersprüchlichen Werte befürchtet werden, da alle darstellungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert.

Hinweis: Encoding-Beschriftungen haben höhere Priorität; diese Konfiguration wirkt sich nicht auf Encoding-Beschriftungen aus.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahl-Prozentwerte anzeigen.

In Szenarien mit mehreren Kennzahlen müssen keine widersprüchlichen Werte befürchtet werden, da alle darstellungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert.

Hinweis: Encoding-Beschriftungen haben höhere Priorität; diese Konfiguration wirkt sich nicht auf Encoding-Beschriftungen aus.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Dimensionsnamen anzeigen.

Displays all dimension labels.

Hinweis: Encoding-Beschriftungen haben höhere Priorität; diese Konfiguration wirkt sich nicht auf Encoding-Beschriftungen aus.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungswerte automatisch formatiert werden. Wenn autoFormat true ist, wird die numFormat-Konfiguration ignoriert.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Formatkonfiguration für Beschriftungswerte; wird mit `format` in `measure` zusammengeführt, wobei `format` in `measure` höhere Priorität hat. numFormat hat eine niedrigere Priorität als autoFormat.

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
- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



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
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser; höhere Priorität als fractionDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingPriority.

:::

**Beispiel**
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Beschriftung.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Beschriftung.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe der Beschriftung.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe (Kontur) der Beschriftung.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Beschriftung.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Beschriftungsposition.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether the label overlap avoidance function is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Beschriftungsfilterung; die Standardbeziehung zwischen Selektoren ist OR.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld-ID.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Vergleichsoperator:

- in: Wählt Datenelemente aus, deren Dimensionsfeldwert in der 'value'-Liste enthalten ist.

- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in der 'value'-Liste enthalten ist.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Vergleichsoperator:

- in: Wählt Datenelemente aus, deren Dimensionsfeldwert in der 'value'-Liste enthalten ist.

- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in der 'value'-Liste enthalten ist.

Gleich wie operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Auszuwählende Dimensionswerte; unterstützt Arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code).

Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen.

- Nutzt integrierte Hilfsfunktionen für Datenoperationen.

- Sichere Ausführung in der Browserumgebung (Web-Worker-Sandbox).

Anforderungen: Unterstützt nur Browserumgebungen; Node.js-Umgebungen verwenden fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Konfiguration für den dynamischen Diagrammfilter.

Filtert Diagrammmarkierungen (Spalten, Punkte usw.) über KI-generierten JavaScript-Code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache).

:::

**Beispiel**
"Umsatzspalten größer als 1000 hervorheben."

"Die Spalte mit der höchsten Gewinnmarge je Region hervorheben."



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode.

- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R).

- Eingabeparameter: data (Array); jedes Element enthält ein __row_index-Feld, das die Zeilennummer repräsentiert.

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>.

- __row_index represents the row number of the original data item, and field represents the field to be highlighted.

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen.

:::

**Beispiel**
'sales'-Feld für Datenobjekte hervorheben, bei denen sales > 1000 ist:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Datenobjekte mit der höchsten Gewinnmarge in jeder Region hervorheben:
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

Datenobjekte hervorheben, die mehrere Filterbedingungen erfüllen:
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
Fallback-Plan, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird.

:::


##### field

**Type:** `string`

##### operator

**Type:** `"in" | "not in" | undefined`

##### op

**Type:** `"in" | "not in" | undefined`

##### value

**Type:** `string | number | (string | number)[]`

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld). Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt.

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `ColorLegend | undefined`

:::note{title=Beschreibung}
Legende. Farb-Legendenkonfiguration für Heatmap-Diagramme, mit der die Diagrammlegende einschließlich Position, Format und Stil definiert wird.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legendenposition.

:::

**Beispiel**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether legend functionality is enabled.

:::

**Beispiel**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Legende.

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Legende.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Legende.

:::

**Beispiel**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende.

:::

**Beispiel**
labelFontWeight: 400



### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltip-Konfiguration zur Definition der Diagramm-Tooltips einschließlich Position, Format und Stil.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Tooltip-Funktion aktiviert ist.

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Brush-Konfiguration zum Aktivieren oder Deaktivieren der Bereichsauswahl.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Bereichsauswahl aktiviert ist.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}
Brush-Typ. Definiert Form und Richtung des Auswahlbereichs:

- `rect`: Rechteckauswahl, erlaubt Auswahl in X- und Y-Richtung.

- `polygon`: Polygonauswahl, erlaubt das Zeichnen beliebiger Formen durch Klicken mehrerer Punkte.

- `x`: Horizontale Auswahl, beschränkt die Auswahl auf die X-Achsenrichtung.

- `y`: Vertikale Auswahl, beschränkt die Auswahl auf die Y-Achsenrichtung.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
Auswahlmodus, einfach oder mehrfach. Definiert die Auswahllogik:

- `single`: Einzelauswahlmodus, es kann jeweils nur ein Auswahlbereich existieren.

- `multiple`: Mehrfachauswahlmodus, mehrere Auswahlbereiche können gleichzeitig existieren.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Auswahlbereiche nach Ende der Bereichsauswahl gelöscht werden.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Stil für Daten innerhalb des ausgewählten Bereichs.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft ausgewählter Datenpunkte, Bereich 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite.

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Stil für Daten außerhalb des ausgewählten Bereichs.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft von Datenpunkten außerhalb der Auswahl, Bereich 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagramm-Theme. Themes sind Konfigurationen mit niedrigerer Priorität und enthalten allgemeine Einstellungen für alle Diagrammtypen sowie spezifische Einstellungen innerhalb einer Diagrammkategorie.

Helle und dunkle Themes sind integriert; Benutzer können über den Builder eigene Themes definieren.

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

**Type:** `Locale | undefined`

:::note{title=Beschreibung}
Locale. Sprachkonfiguration des Diagramms; unterstützt 'zh-CN' und 'en-US'. Alternativ kann intl.setLocale('zh-CN') aufgerufen werden, um die Sprache festzulegen.

:::
