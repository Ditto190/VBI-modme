# ColumnPercent

:::info{title=Empfohlen}
\- Empfohlene Feldkonfiguration: `1` Kennzahl, `2` Dimensionen

\- Unterstützt Data Reshape: mindestens `1` Kennzahl, `0` Dimensionen

:::

:::info{title=Encoding-Zuordnung}
Das Prozent-Säulendiagramm unterstützt die folgenden visuellen Kanäle:

`xAxis`  : x-Achsenkanal, unterstützt `mehrere Dimensionen`, Zuordnung zur x-Achse nach Dimensionswert

`yAxis`  : y-Achsenkanal, unterstützt `mehrere Kennzahlen`, Zuordnung zur y-Achse nach Kennzahlwert

`detail` : Detailkanal, unterstützt `mehrere Dimensionen`, um innerhalb derselben Farbserie feiner granulare Daten anzuzeigen

`color`  : Farbkanal, unterstützt `mehrere Dimensionen` oder `eine Kennzahl`; Dimensionsfarben unterscheiden Datenreihen, Kennzahlfarben bilden Kennzahlwerte linear auf Grafikfarben ab

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`, wird beim Hover über einen Datenpunkt angezeigt

`label`  : Label-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`, zeigt Datenlabels auf Datenpunkten an

:::

:::note{title=Beschreibung}
Ein Prozent-Säulendiagramm eignet sich für Szenarien, in denen Anteilsverhältnisse verschiedener Kategorien dargestellt werden; die Y-Achse zeigt die Datenanteile in Prozent an

Geeignete Szenarien:

\- Vergleich der Anteile verschiedener Kategorien

\- Strukturanalyse mehrdimensionaler Daten

\- Trends der Anteilsänderung in Zeitreihen

:::

:::warning{title=Warning}
Datenanforderungen:

\- Mindestens 1 Kennzahlfeld

\- Die erste Dimension wird auf der X-Achse platziert; verbleibende Dimensionen werden mit Kennzahlnamen (wenn mehrere Kennzahlen vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt.

\- Alle Kennzahlen werden automatisch zu einer Kennzahl zusammengeführt

Standardmäßig aktivierte Funktionen:

\- Legende, Achsen, Prozentbeschriftungen, Tooltips und Anteilsberechnung sind standardmäßig aktiviert

:::


## chartType

**Type:** `"columnPercent"`

:::note{title=Beschreibung}
Prozent-Säulendiagramm



Prozent-Säulendiagramm, das die Anteilsverhältnisse der Kategoriedaten in Prozent darstellt

:::

**Beispiel**
'columnPercent'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Ein voraggregierter, TidyData-konformer Datensatz, der Datenquelle und Struktur des Diagramms definiert. Benutzer müssen Eingabedaten nicht manuell verarbeiten; die leistungsfähige Data-Reshape-Funktion von VSeed übernimmt dies automatisch. Daten des Flächendiagramms werden letztlich in 2 Dimensionen und 1 Kennzahl umgeformt.



Ein bereits aggregierter Datensatz, der der TidyData-Spezifikation entspricht und Datenquelle sowie Struktur des Diagramms definiert. Der vom Benutzer eingegebene Datensatz muss nicht weiter verarbeitet werden. VSeed verfügt über leistungsfähige Data-Reshape-Funktionen und formt die Daten automatisch um. Die Daten des Prozent-Säulendiagramms werden schließlich in 2 Dimensionen und 1 Kennzahl umgewandelt.

:::

**Beispiel**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Beschreibung}
Die erste Dimension wird der X-Achse zugeordnet; die verbleibenden Dimensionen werden mit Kennzahlnamen (wenn mehrere Kennzahlen vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt.



**Beispiel**

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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- xAxis: unterstützt die Zuordnung mehrerer Dimensionen zur X-Achse

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt das Zuordnen mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt das Zuordnen mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen



Die Kennzahlen des Prozent-Säulendiagramms werden automatisch zu einer Kennzahl zusammengeführt und der Y-Achse zugeordnet. Bei mehreren Kennzahlen werden die Kennzahlnamen mit den übrigen Dimensionen kombiniert und als Legendeneinträge angezeigt.

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
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
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
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- yAxis: Kennzahl wird der Y-Achse zugeordnet

\- detail: Kennzahl wird dem Detailkanal zugeordnet

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
Es gibt zwei Möglichkeiten, den Kennzahlbaum zu konfigurieren: Option 1 konfiguriert den Kennzahlbaum direkt mit children; Option 2 konfiguriert eine flache Kennzahlliste mit parentId. Beide Methoden können nicht gleichzeitig verwendet werden

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}


:::


### field

**Type:** `string`

:::note{title=Beschreibung}


:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}


:::

**Beispiel**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Hintergrundfarbe des Diagramms. Standard ist ein transparenter Hintergrund. Die Hintergrundfarbe kann ein Farbstring (z. B. 'red', 'blue') oder ein Hex-, RGB- oder RGBA-Wert sein (z. B. '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}


:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::


## label

**Type:** `Label | undefined`

:::note{title=Beschreibung}


:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}






:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}






:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"




#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}


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


:::

**Beispiel**
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}


:::


#### field

**Type:** `string`

:::note{title=Beschreibung}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}








:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
































:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnmarge je Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}














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


:::


##### field

**Type:** `string`

:::note{title=Beschreibung}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}






:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}






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


:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

:::warning{title=Warning}


:::

**Beispiel**




### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}


:::

:::warning{title=Warning}


:::

**Beispiel**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}






:::

:::warning{title=Warning}


:::

**Beispiel**





## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Beschreibung}




**Type:** `false | true`

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Ob die Brush-Auswahl aktiviert wird

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}








Brush-Auswahlmodus: einzeln oder mehrfach

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
Deckkraft of selected data points, range 0-1



**Type:** `number | boolean | undefined`

**Type:** `string | undefined`



:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}






:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achse, Kategorieachse, X-Achsenkonfiguration; definiert die X-Achse des Diagramms einschliesslich Position, Format, Stil usw.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Type:** `boolean | undefined`

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=Beschreibung}
Auto-Hide-Intervall fur Achsenbeschriftungen; wenn der Abstand zwischen zwei Textbeschriftungen kleiner als autoHideGap ist, wird die uberlappende Beschriftung automatisch ausgeblendet. Nur fur Kategorieachsen wirksam.



Wenn autoHide deaktiviert ist, wird Sampling verwendet, konfiguriert uber minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Beschreibung}


:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Beschreibung}


:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Beschreibung}


:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Beschreibung}


:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Beschreibung}


:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Beschreibung}


:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

##### interval

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=Beschreibung}


:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=Beschreibung}


:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::

###### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Beschreibung}


:::


###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Beschreibung}


:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Beschreibung}
**Type:** `boolean | undefined`

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Rasterlinientyp

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
X-Achse animation configuration

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Beschreibung}


Y-Achse, numerische Achse, Y-Achsenkonfiguration; definiert die Y-Achse des Diagramms einschliesslich Position, Format, Stil usw.

**Type:** `string | undefined`

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Beschreibung}


:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Suffix der Zahlenformatierung

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Beschriftung der X-Achsen-Ticks

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}


:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Beschreibung}


:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

### min

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Beschreibung}


:::

### log

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### logBase

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### nice

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**





#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Type:** `string | undefined`

:::

**Beispiel**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Beispiel**


Easing-Funktion der Animation






#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Sortierkonfiguration der Kategorieachse, unterstutzt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolge

:::

**Beispiel**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
Sortierreihenfolge, optionale Werte sind 'asc' oder 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge, die direkt auf die Kategorieachse angewendet wird

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
or

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Type:** `string[] | undefined`

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Type:** `brand`

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Type:** `string | number | undefined`

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Beschreibung}
Fallback-Losung, wenn die Codeausfuhrung fehlschlagt oder die Umgebung nicht unterstutzt wird.





:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
selector = {

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Beschreibung}
Gestapelte Rundungen im gruppierten Säulendiagramm

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Beschreibung}


:::


## sort

**Type:** `Sort | undefined`

:::note{title=Beschreibung}
Implementiert komplexe Datenfilterlogik mit KI-generiertem JavaScript-Code





:::

**Beispiel**


**Type:** `"in" | "not in" | undefined`
}

Operator
}


\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
**Type:** `"row-with-field"`



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**





### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}


:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Beschreibung}






:::

**Beispiel**

Konfiguration des animierten Diagrammfilters

}

Implementiert das Filtern von Diagramm-Markierungen (Balken, Punkte usw.) uber KI-generierten JavaScript-Code
}



_.maxBy(group, item => item.profit / item.sales)





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Beispiel**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode

:::

**Beispiel**

\- Eingabeparameter: data (Array), jedes Element enthalt ein __row_index-Feld, das die Zeilennummer darstellt



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}




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


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Beschreibung}
Stil der Rechteckmarkierungen; definiert Farbe, Rahmen, Rundungen usw. der Rechteckmarkierungen im Diagramm.

Ob das Balken-Primitive (Rechteck) sichtbar ist





**Type:** `string | undefined`

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}




**Type:** `string | undefined`

**Type:** `boolean | undefined`

:::

**Beispiel**
Strichfarbe des Balken-Primitives (Rechteck)

**Type:** `number | undefined`

**Type:** `string | undefined`

**Type:** `number | undefined`





field: 'category',
operator: 'in',
value: 'tool'
}

field: 'category',
operator: 'not in',
value: 'book'
}

**Beispiel**

field: 'profit',
operator: '>=',
value: 100
}

field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Beschreibung}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}


**Type:** `number | number[] | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}




**Type:** `Selector | Selectors | undefined`

4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}




\- in: Wahlt Datenelemente aus, deren Dimensionsfeldwert im Wert enthalten ist

\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist





**Type:** `"in" | "not in" | undefined`

\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnmarge je Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}














:::

**Beispiel**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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
field: 'sales'

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
\- Verboten: eval, Function, asynchrone Operationen, DOM-API, Netzwerkanfragen

const profitRate = item.profit / item.sales;

});

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}




**Type:** `Selector | Selectors | undefined`

);

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}




\- in: Wahlt Datenelemente aus, deren Dimensionsfeldwert im Wert enthalten ist

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### barColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Type:** `string | string[] | undefined`

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
**Type:** `string | undefined`







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}




Textschriftgröße

:::

**Beispiel**
12

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Beschreibung}


:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}


:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
'right' Text is on the left side of the annotation point.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung; typischerweise auf 'top' gesetzt, damit Text unter dem Anmerkungspunkt erscheint und im sichtbaren Diagrammbereich bleibt.

Empfohlen ist 'top', damit der Text vollstandig im sichtbaren Diagrammbereich angezeigt wird.

top: Text befindet sich unterhalb des Anmerkungspunkts; die obere Textkante ist am Punkt ausgerichtet.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
'top' Text is at the bottom of the annotation point.





**Type:** `boolean | undefined`

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}




Strichfarbe des Hintergrunds

true













'red'











Eckenradius des Hintergrunds

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnmarge je Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Ein negativer Wert verschiebt die gesamte Komponente nach oben; z. B. verschiebt -10 Text und Hintergrund um 10 Pixel nach oben.





**Beispiel**







:::

**Beispiel**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
**Type:** `"value"`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}


**Beispiel**



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
"Use the highest sales value as a mark line reference"

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Den Durchschnitt fur die Anmerkungslinie berechnen





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
**Type:** `string | number | undefined`

:::

**Beispiel**
'Annotationstext'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}






Textfarbe

'Anmerkungstext'

:::

**Beispiel**
'right' Text links vom Annotationspunkt



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Empfohlen ist 'top', damit der Text vollstandig im sichtbaren Diagrammbereich angezeigt wird.

top: Text befindet sich unterhalb der Referenzlinie; die Oberkante ist am Endpunkt der (vertikalen) Anmerkungslinie ausgerichtet.

middle: Text wird auf der Referenzlinie zentriert; die Mitte ist am Endpunkt der (vertikalen) Anmerkungslinie ausgerichtet.

bottom: Text befindet sich oberhalb der Referenzlinie; die Unterkante ist am Endpunkt der (vertikalen) Anmerkungslinie ausgerichtet.



:::

**Beispiel**
'top' Text unter dem Annotationspunkt



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
top: Text liegt unter der Referenzlinie, die Oberkante ist am Ende der (vertikalen) Anmerkungslinie ausgerichtet.

:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
'right'

:::

**Beispiel**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Type:** `boolean | undefined`

:::

**Beispiel**




### offsetY

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Type:** `string | undefined`

**Beispiel**



:::

**Beispiel**
**Type:** `number | undefined`



### offsetX

**Type:** `number | undefined`

:::note{title=Beschreibung}






:::

**Beispiel**





## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
**Type:** `number | undefined`

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}






**Type:** `string | number | (string | number)[] | undefined`





:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Geeignet fur Szenarien, in denen die Position der Anmerkungslinie dynamisch anhand von Daten bestimmt werden muss, z. B. Durchschnitt, Maximum, Quantile, Geschaftslinien usw.

:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Annotationslinie abrufen"

"Durchschnittlichen Umsatz für die Annotationslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}






**Beispiel**







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

**Beispiel**
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
\- Eingabeparameter: data (Array).

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
Wird wahrend der prepare()-Phase geschrieben, zur Laufzeit schreibgeschutzt

:::

**Beispiel**
'Annotationstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
_.filter(data, item => item.year === 2024),

:::

**Beispiel**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
const index = Math.floor(sorted.length * 0.75);

:::

**Beispiel**
**Type:** `false | true`



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}


Textposition



Position der Beschriftung der Anmerkungslinie (relative Position der Beschriftung zur Linie).



:::

**Beispiel**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
**Beispiel**

**Beispiel**







:::

**Beispiel**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Empfohlen ist 'top', damit der Text vollstandig im sichtbaren Diagrammbereich angezeigt wird.

:::

**Beispiel**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
center: Text befindet sich in der Mitte der Referenzlinie (am Ende horizontaler Markierungslinien).



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Beschreibung}
4

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}












:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Annotationslinie abrufen"

"Durchschnittlichen Umsatz für die Annotationslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist



'red'

**Type:** `"in" | "not in" | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Beispiel**
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist
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

'solid'
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


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}




Textfarbe

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**
'Annotationstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
**Beispiel**





:::

**Beispiel**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
center: Text ist im Anmerkungsbereich zentriert; die Textmitte ist am Bereich ausgerichtet.

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung; typischerweise auf 'top' gesetzt, damit Text unten im Anmerkungsbereich erscheint und im sichtbaren Diagrammbereich bleibt.

:::

**Beispiel**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
**Type:** `boolean | undefined`



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}








Hintergrundfarbe

:::

**Beispiel**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Strichfarbe des Hintergrunds



Strichfarbe des Hintergrunds

**Beispiel**

**Beispiel**

:::

**Beispiel**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Eckenradius des Hintergrunds

:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Farbe des Anmerkungsbereichs



Farbe des Anmerkungsbereichs

:::

**Beispiel**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Beispiel**



**Beispiel**

:::

**Beispiel**




### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Eckenradius des Rahmens des Anmerkungsbereichs.

:::

**Beispiel**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Beschreibung}


:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Beschreibung}
4

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}




Farbe des Anmerkungsbereichs

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**

**Type:** `number | undefined`





:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Annotationstext'



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
Konfiguration der polynomialen Regressionslinie, einschliesslich Polynomordnung, Stil der Regressionslinie usw.

Es wird empfohlen, 'center' zu setzen, damit der Text in der Mitte des Markierungsbereichs liegt







:::

**Beispiel**
'center' Text in der Mitte des Annotationsbereichs



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}








Ordnung der polynomialen Regression

:::

**Beispiel**
'top' Text am unteren Rand des Annotationsbereichs



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Type:** `string | undefined`

:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe



Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**



**Beispiel**

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


:::

**Beispiel**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
**Type:** `boolean | undefined`



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}


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




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Beschreibung}
Ob die Dimensionsverknüpfung aktiviert wird, wenn für das Diagramm die Pivot-Funktion oder Kennzahlenkombinationen aktiviert sind

Beim Hover über einen Dimensionswert werden Daten mit demselben Dimensionswert in anderen Diagrammen verknüpft hervorgehoben



Konfiguration der Dimensionsverknüpfung für Pivot-Diagramme

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Dimensionsverknüpfung für Pivot-Diagramme aktiviert wird

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Tooltip-Informationen für die Unterdiagramme aller entsprechenden Dimensionen angezeigt werden

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das zum crosshair gehörende Label angezeigt wird

:::


## locale

**Type:** `Locale | undefined`

:::note{title=Beschreibung}
Sprachkonfiguration des Diagramms; unterstützt die beiden Sprachen 'zh\-CN' und 'en\-US'. Zusätzlich kann die Sprache über intl.setLocale('zh\-CN') gesetzt werden

:::

