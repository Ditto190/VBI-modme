# RaceLine

:::note{title=Beschreibung}
Animiertes Liniendiagramm (Race Line Chart)

Geeignet, um Trends von Daten im Zeitverlauf darzustellen; Datenpunkte werden durch Liniensegmente zu einer Trendlinie verbunden

Anwendungsszenarien:

\- Trends mehrerer Datenreihen im Zeitverlauf darstellen

\- Wachstums- oder Rueckgangsmuster verschiedener Kategorien vergleichen

\- Schwankungen der Daten entlang der Zeitdimension beobachten

:::

:::note{title=Note}
Animiertes Liniendiagramm:

\- Die X-Achse ist normalerweise eine Zeit- oder Kategorieachse und zeigt Dimensionswerte

\- Die Y-Achse ist eine Wertachse und zeigt Kennzahlenwerte

\- Die Zeitdimension kann ueber den Player gesteuert werden, um das Fortschreiben der Linie dynamisch darzustellen

:::


## chartType

**Type:** `"raceLine"`

:::note{title=Beschreibung}
Animiertes Liniendiagramm, geeignet zur Darstellung von Datentrends im Zeitverlauf

:::


## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datenquelle

:::


## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Beschreibung}
Die erste Dimension wird der X-Achse zugeordnet; die verbleibenden Dimensionen werden mit Kennzahlnamen (wenn mehrere Kennzahlen vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt.

:::


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

:::


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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**





#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}

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

### format

**Type:** `NumFormat | undefined`


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

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- yAxis: Kennzahl wird der Y-Achse zugeordnet

\- detail: Measure mapped to the detail channel

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




## player

**Type:** `Player | undefined`

:::note{title=Beschreibung}
Player-Konfiguration zur Angabe der Zeitdimension; Kernkonfiguration des animierten Liniendiagramms



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


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farbkonfiguration

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
Beschriftungskonfiguration

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





#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}

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

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
  orderBy: 'profit',

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
or

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
**Beispiel**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}




Strichfarbe des Hintergrunds













'red'











Eckenradius des Hintergrunds

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Datenelemente mit Umsatz ueber 1000 hervorheben"

"Datenelement mit der hoechsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist

**Beispiel**






:::

**Beispiel**
sales-Feld der Datenelemente mit Umsatz ueber 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Datenelement mit der hoechsten Gewinnrate in jeder Region hervorheben
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

Datenelemente hervorheben, die mehrere Filterbedingungen erfuellen
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
**Beispiel**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}




Textfarbe

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
Legendenkonfiguration

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
border: true



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
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}


:::

:::warning{title=Warning}


:::

**Beispiel**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}






:::

:::warning{title=Warning}


:::

**Beispiel**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltip-Konfiguration

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Brush-Auswahlkonfiguration



Brush-Auswahlmodus: einzeln oder mehrfach

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
Deckkraft of selected data points, range 0-1







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
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"





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

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Beschreibung}
X-Achsen-Konfiguration; Kategorieachse zur Anzeige von Dimensionswerten

:::


### visible

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

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Beschreibung}






:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
'dark'

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
value: 'tool'

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
**Beispiel**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legenden-Sortierkonfiguration; unterstutzt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen; das sort-Array folgt der Reihenfolge von links nach rechts oder von oben nach unten.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
sortLegend: {

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

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge; diese Reihenfolge wird direkt auf die Legende angewendet. Aufsteigend folgt links-nach-rechts oder oben-nach-unten; absteigend folgt rechts-nach-links oder unten-nach-oben.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
  ])

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


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

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
Y-Achsen-Konfiguration; Wertachse zur Anzeige von Kennzahlenwerten

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

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


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
value: 'tool'

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
**Beispiel**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legenden-Sortierkonfiguration; unterstutzt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen; das sort-Array folgt der Reihenfolge von links nach rechts oder von oben nach unten.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
sortLegend: {

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

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge; diese Reihenfolge wird direkt auf die Legende angewendet. Aufsteigend folgt links-nach-rechts oder oben-nach-unten; absteigend folgt rechts-nach-links oder unten-nach-oben.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
  ])

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


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Beschreibung}
Konfiguration der vertikalen Hilfslinie



Crosshair-Linienkonfiguration; ein Konfigurationstyp zum Anzeigen einer Crosshair-Linie (Hilfslinie) im Diagramm

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Crosshair-Linie angezeigt wird

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Crosshair-Linie

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Crosshair-Linienbeschriftung

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das Label der Crosshair-Linie angezeigt wird

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe der Crosshair-Linienbeschriftung

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Beschreibung}
Sortierkonfiguration der X-Achse





:::

**Beispiel**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Beispiel**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
\- `__row_index` steht fur die Zeilennummer des ursprunglichen Datenelements, `field` fur das hervorzuhebende Feld.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Beschreibung}
Legenden-Sortierkonfiguration



Dynamische Filtereinstellung des Diagramms: Filtert Diagrammmarken (Balken, Punkte usw.) über KI-generierten JavaScript-Code.

:::

**Beispiel**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Beispiel**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Theme-Konfiguration



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Beschreibung}
Stilkonfiguration fuer Punktmarken

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.






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


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}




Strichfarbe des Hintergrunds















'red'











Eckenradius des Hintergrunds

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Datenelemente mit Umsatz ueber 1000 hervorheben"

"Datenelement mit der hoechsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist

**Beispiel**






:::

**Beispiel**
sales-Feld der Datenelemente mit Umsatz ueber 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Datenelement mit der hoechsten Gewinnrate in jeder Region hervorheben
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

Datenelemente hervorheben, die mehrere Filterbedingungen erfuellen
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
**Beispiel**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}




Textfarbe

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




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Beschreibung}
Stilkonfiguration fuer Linienmarken

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.






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


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}




Strichfarbe des Hintergrunds















'red'











Eckenradius des Hintergrunds

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Datenelemente mit Umsatz ueber 1000 hervorheben"

"Datenelement mit der hoechsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist

**Beispiel**






:::

**Beispiel**
sales-Feld der Datenelemente mit Umsatz ueber 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Datenelement mit der hoechsten Gewinnrate in jeder Region hervorheben
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

Datenelemente hervorheben, die mehrere Filterbedingungen erfuellen
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
**Beispiel**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}




Textfarbe

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Liniensegmente sichtbar sind

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Liniensegmente geglaettet werden

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Liniensegments

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Liniensegmentfarbe

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Liniensegments

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Liniensegmentstil

:::

**Beispiel**
`lineStyle: 'solid'`




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Beschreibung}
Markierungspunkt-Konfiguration

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
**Beispiel**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Gibt die Kennzahlen-ID an, zu der der Markierungspunkt gehoert. In Szenarien mit mehreren Measures kann sie mit selector kombiniert werden, um den Markierungspunkt der Zielkennzahl eindeutig zu bestimmen.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}




Strichfarbe des Hintergrunds















'red'











Eckenradius des Hintergrunds

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Datenelemente mit Umsatz ueber 1000 hervorheben"

"Datenelement mit der hoechsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist

**Beispiel**






:::

**Beispiel**
sales-Feld der Datenelemente mit Umsatz ueber 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Datenelement mit der hoechsten Gewinnrate in jeder Region hervorheben
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

Datenelemente hervorheben, die mehrere Filterbedingungen erfuellen
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
**Beispiel**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}




Textfarbe

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




Schriftgrosse des Textes.


**Beispiel**

:::

**Beispiel**
'right' Text befindet sich links vom Markierungspunkt



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
**Beispiel**









:::

**Beispiel**
'top' Text befindet sich unterhalb des Markierungspunkts



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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
**Beispiel**

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
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
Hintergrundfarbe.


**Beispiel**

:::

**Beispiel**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
Konfiguration der Markierungslinie fuer Dimensionswerte

:::


### xValue

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
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist







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
'red'

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Ausgewahlte Dimensionsfeldwerte; unterstutzt Arrays.

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
left: Text befindet sich rechts vom Anmerkungsbereich, die linke Kante ist am Bereich ausgerichtet.

center: Text wird im Anmerkungsbereich zentriert.

Textfarbe.


**Beispiel**

:::

**Beispiel**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
middle: Text wird vertikal im Anmerkungsbereich zentriert.









:::

**Beispiel**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


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
Eckenradius des Rahmens des Anmerkungsbereichs.

:::

**Beispiel**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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
**Beispiel**

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
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




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Beschreibung}
Konfiguration der numerischen Markierungslinie

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
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist







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
'red'

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
2





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
left: Text befindet sich rechts vom Anmerkungsbereich, die linke Kante ist am Bereich ausgerichtet.

center: Text wird im Anmerkungsbereich zentriert.



**Beispiel**



:::

**Beispiel**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
middle: Text wird vertikal im Anmerkungsbereich zentriert.



Strichfarbe des Hintergrunds

**Beispiel**



:::

**Beispiel**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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
**Beispiel**



**Beispiel**

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
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



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}






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
Eckenradius des Rahmens des Anmerkungsbereichs.

:::

**Beispiel**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Beschreibung}
Strichelstil des Rahmens des Anmerkungsbereichs.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Beschreibung}
Markierungsbereich-Konfiguration

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Beschreibung}
Ob die Dimensionsverknupfung aktiviert wird, wenn im Diagramm Perspektive aktiviert ist oder Kennzahlen kombiniert sind.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
**Beispiel**




same as operator

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
Konfiguration der polynomialen Regressionslinie, einschliesslich Polynomordnung, Stil der Regressionslinie usw.

Es wird empfohlen, 'center' zu setzen, damit der Text in der Mitte des Markierungsbereichs liegt







:::

**Beispiel**
'center' Text befindet sich in der Mitte des Markierungsbereichs



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}








Ordnung der polynomialen Regression

:::

**Beispiel**
'top' Text befindet sich am unteren Rand des Markierungsbereichs



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
4



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
Dimensionsverknüpfungskonfiguration



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

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Sprachkonfiguration

:::
