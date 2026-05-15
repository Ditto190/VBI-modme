# Histogram

:::info{title=Ánh xạ mã hóa}
Biểu đồ histogram hỗ trợ các kênh trực quan sau:

`xAxis`  : kênh trục X, hỗ trợ `một chiều`, hiển thị lên trục X sau khi tính toán phân nhóm theo giá trị chiều

:::

:::note{title=Mô tả}
Biểu đồ histogram phù hợp để hiển thị phân bố dữ liệu; trục X là trục số (dữ liệu liên tục), trục Y là trục số (dữ liệu liên tục), các cột được sắp theo chiều dọc

Tình huống áp dụng:

\- Hiển thị phân bố dữ liệu, như phân bố tần suất, phân bố xác suất, v.v.

\- Phân tích xu hướng tập trung và mức độ phân tán của dữ liệu

\- Xác định giá trị bất thường và mẫu trong dữ liệu

:::


## chartType

**Type:** `"histogram"`

:::note{title=Mô tả}
Biểu đồ histogram, phù hợp để hiển thị phân bố dữ liệu

:::


## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Dataset tuân thủ TidyData và đã được tổng hợp, dùng để định nghĩa nguồn dữ liệu và cấu trúc của biểu đồ. Dataset do người dùng nhập không cần tiền xử lý; VSeed có chức năng Data Reshape mạnh mẽ tự động chuyển dữ liệu cho Column Chart thành 2 dimension và 1 measure.

:::

**Ví dụ**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `HistogramDimension[] | undefined`

:::note{title=Mô tả}
Biểu đồ histogram thường không cần chiều

:::

**Ví dụ**
[{id: "category", alias: "Danh mục"}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID trường tương ứng với chiều

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh chiều

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng ngày của chiều

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Mô tả}
Độ hạt thời gian, quyết định độ chính xác khi hiển thị ngày

:::

### encoding

**Type:** `"tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh chi tiết

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `HistogramMeasure[] | undefined`

:::note{title=Mô tả}
Biểu đồ histogram chỉ hỗ trợ một chiều, và dữ liệu là dữ liệu rời rạc

:::

**Ví dụ**
[{id: "value", alias: "Giá trị"}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID chỉ số, không được trùng lặp

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh chỉ số, cho phép trùng lặp; nếu không đặt, alias mặc định là id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có độ ưu tiên cao nhất

Khi autoFormat=true, toàn bộ cấu hình numFormat sẽ bị ghi đè

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị chỉ số và locale

Quy tắc định dạng: số thập phân bật compact notation, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho nhãn và tooltip

Lưu ý: để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Kiểu định dạng số, hỗ trợ: số (thập phân), phần trăm (%), phần nghìn (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

:::

**Ví dụ**
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Dấu phân tách hàng nghìn cho định dạng số

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000 , significantDigits:1
\- 1234.5678 được chuyển thành 1200 , significantDigits:2
\- 1234.5678 được chuyển thành 1230 , significantDigits:3
\- 1234.5678 được chuyển thành 1234 , significantDigits:4
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Kiểu định dạng số, hỗ trợ: số (thập phân), phần trăm (%), phần nghìn (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

:::

**Ví dụ**
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Dấu phân tách hàng nghìn cho định dạng số

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000 , significantDigits:1
\- 1234.5678 được chuyển thành 1200 , significantDigits:2
\- 1234.5678 được chuyển thành 1230 , significantDigits:3
\- 1234.5678 được chuyển thành 1234 , significantDigits:4
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode

:::

### encoding

**Type:** `"value" | "color" | "tooltip" | "label" | "x0" | "x1" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- value: kênh giá trị của histogram

\- x0: kênh x0 của histogram

\- x1: kênh x1 của histogram

\- color: chỉ số được ánh xạ tới kênh màu

\- label: chỉ số được ánh xạ vào kênh nhãn

\- tooltip: chỉ số được ánh xạ vào kênh tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Ở dạng cấu hình chỉ số phẳng, xây dựng nhóm chỉ số dạng cây. parentId trỏ tới id của nhóm chỉ số cha và dùng để xây dựng cây chỉ số

:::

:::tip{title=Tip}
Có hai cách cấu hình cây chỉ số: Cách 1 cấu hình trực tiếp cây chỉ số với children; Cách 2 cấu hình danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}


:::


### field

**Type:** `string`

:::note{title=Mô tả}


:::

### currentValue

**Type:** `string`

:::note{title=Mô tả}


:::

**Ví dụ**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mô tả}


:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}


:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::


## label

**Type:** `Label | undefined`

:::note{title=Mô tả}


:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mô tả}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}






:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}






:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"




#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1200 , significantDigits:2
\- 1234.5678 được chuyển thành 1230 , significantDigits:3
\- 1234.5678 được chuyển thành 1234 , significantDigits:4
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mô tả}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}


:::


#### field

**Type:** `string`

:::note{title=Mô tả}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}








:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
































:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"Tô sáng các cột có doanh số lớn hơn 1000"

"Tô sáng cột có tỷ suất lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}














:::

**Ví dụ**
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

:::note{title=Mô tả}


:::


##### field

**Type:** `string`

:::note{title=Mô tả}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}






:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Mô tả}


:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

:::warning{title=Warning}


:::

**Ví dụ**




### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mô tả}


:::

:::warning{title=Warning}


:::

**Ví dụ**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### maxSize

**Type:** `number | undefined`

:::note{title=Mô tả}






:::

:::warning{title=Warning}


:::

**Ví dụ**





## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mô tả}
Có bật chọn brush hay không

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}








Chế độ chọn brush: đơn hoặc nhiều

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mô tả}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mô tả}
Độ mờ of selected data points, range 0-1



**Type:** `number | boolean | undefined`

**Type:** `string | undefined`



:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}






:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Trục X, trục phân loại, cấu hình trục X; định nghĩa trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `boolean | undefined`

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Mô tả}
Trục X, trục số; cấu hình trục X dùng để định nghĩa vị trí, định dạng, kiểu dáng, v.v. của trục X biểu đồ.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Kiểu đường lưới

:::

### min

**Type:** `number | undefined`

:::note{title=Mô tả}
Đường trục width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mô tả}
Tick trục X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có sử dụng trục logarit hay không, chỉ có hiệu lực với trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mô tả}
Hàm easing của hoạt ảnh.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Cấu hình trục Y (trục danh mục) dùng để định nghĩa trục Y, bao gồm vị trí, định dạng, kiểu dáng, v.v.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Trục X animation configuration

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được bằng 0

:::

**Ví dụ**
Phạm vi góc cho xoay tự động khi được bật (chỉ có hiệu lực với trục danh mục).




#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Ví dụ**
Nhãn font weight


\- 1234.5678 được chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `string | undefined`

:::

**Ví dụ**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 được chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**

Đường trục width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Nhãn vạch trục X

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}


:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mô tả}
**Type:** `number | undefined`

:::


#### duration

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### easing

**Type:** `string | undefined`

:::note{title=Mô tả}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Mô tả}


:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

### min

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mô tả}


:::

### log

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### logBase

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**





#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `string | undefined`

:::

**Ví dụ**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Ví dụ**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Ví dụ**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Thứ tự sắp xếp tùy chỉnh, được áp dụng trực tiếp cho trục phân loại

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
or

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `string[] | undefined`

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Type:** `brand`

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mô tả}
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `string | number | undefined`

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mô tả}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mô tả}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Mô tả}
Giải pháp fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ.





:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
selector = {

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Toán tử

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Mô tả}
Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime

:::


## binCount

**Type:** `number | undefined`

:::note{title=Mô tả}
Số lượng bin của histogram, dùng để định nghĩa số lượng hình chữ nhật bin (cột) của histogram

:::


## binStep

**Type:** `number | undefined`

:::note{title=Mô tả}
Bước bin, dùng để tính chiều rộng bin và cũng ảnh hưởng đến chiều rộng hình chữ nhật (cột) trong histogram cuối cùng. Nếu đặt đồng thời binCount và binStep thì ưu tiên binStep

:::


## binValueType

**Type:** `"count" | "percentage" | undefined`

:::note{title=Mô tả}
Kiểu giá trị bin của histogram, dùng để định nghĩa kiểu giá trị của hình chữ nhật bin (cột), mặc định là 'count'

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}




const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::

**Ví dụ**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Mô tả}


Primitive cột (hình chữ nhật) có hiển thị hay không





**Type:** `string | undefined`

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}




**Type:** `string | undefined`

**Type:** `boolean | undefined`

:::

**Ví dụ**
Màu nét primitive cột (hình chữ nhật)

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

**Ví dụ**

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

:::note{title=Mô tả}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}


**Type:** `number | number[] | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}




**Type:** `Selector | Selectors | undefined`

4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}




\- in: Chọn các mục dữ liệu có giá trị trường dimension nằm trong value

\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value





**Type:** `"in" | "not in" | undefined`

\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"Tô sáng các cột có doanh số lớn hơn 1000"

"Tô sáng cột có tỷ suất lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}














:::

**Ví dụ**

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

:::note{title=Mô tả}
field: 'sales'

:::


##### field

**Type:** `string`

:::note{title=Mô tả}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
\- Bị cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

const profitRate = item.profit / item.sales;

});

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}




**Type:** `Selector | Selectors | undefined`

);

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}




\- in: Chọn các mục dữ liệu có giá trị trường dimension nằm trong value

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### barColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `string | string[] | undefined`

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
**Type:** `string | undefined`







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}




Kích thước chữ văn bản

:::

**Ví dụ**
12

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mô tả}


:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}


:::


#### field

**Type:** `string`

:::note{title=Mô tả}
'right' Text is on the left side of the annotation point.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Căn chỉnh dọc văn bản; thường đặt là 'top' để văn bản xuất hiện ở đáy điểm chú thích và nằm trong vùng hiển thị của biểu đồ.

Khuyến nghị đặt 'top' để văn bản hiển thị đầy đủ trong vùng hiển thị của biểu đồ.

top: Văn bản nằm ở phía dưới điểm chú thích; mép trên của văn bản căn với điểm.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
'top' Text is at the bottom of the annotation point.





**Type:** `boolean | undefined`

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}




Màu nét nền

true













'red'











Bán kính bo góc nền

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Padding nền

:::

**Ví dụ**
"Tô sáng các cột có doanh số lớn hơn 1000"

"Tô sáng cột có tỷ suất lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}
Giá trị âm dịch chuyển toàn bộ thành phần lên trên; ví dụ -10 dịch văn bản và nền lên 10 pixel.





**Ví dụ**







:::

**Ví dụ**

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

:::note{title=Mô tả}


:::


##### field

**Type:** `string`

:::note{title=Mô tả}
**Type:** `"value"`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}


**Ví dụ**



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
"Use the highest sales value as a mark line reference"

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Tính giá trị trung bình cho đường chú thích





:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
**Type:** `string | number | undefined`

:::

**Ví dụ**
'Văn bản chú thích'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}






Màu văn bản

'Văn bản chú thích'

:::

**Ví dụ**
'right' văn bản nằm bên trái điểm chú thích



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
Khuyến nghị đặt 'top' để văn bản hiển thị đầy đủ trong vùng hiển thị của biểu đồ.

top: Văn bản nằm ở đáy đường tham chiếu; mép trên căn với điểm cuối của đường chú thích (dọc).

middle: Văn bản được căn giữa trên đường tham chiếu; tâm căn với điểm cuối của đường chú thích (dọc).

bottom: Văn bản nằm ở đỉnh đường tham chiếu; mép dưới căn với điểm cuối của đường chú thích (dọc).



:::

**Ví dụ**
'top' văn bản nằm bên dưới điểm chú thích



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
top: Văn bản nằm dưới đường tham chiếu, mép trên căn với điểm cuối của đường chú thích (dọc).

:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
'right'

:::

**Ví dụ**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `boolean | undefined`

:::

**Ví dụ**




### offsetY

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `string | undefined`

**Ví dụ**



:::

**Ví dụ**
**Type:** `number | undefined`



### offsetX

**Type:** `number | undefined`

:::note{title=Mô tả}






:::

**Ví dụ**





## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mô tả}
Đường đánh dấu số (giá trị bin), hiển thị theo chiều dọc, có thể đặt vị trí, kiểu dáng, v.v. của đường đánh dấu. Nếu cần đường đánh dấu tương ứng với giá trị bin, có thể dùng cấu hình này

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}






**Type:** `string | number | (string | number)[] | undefined`





:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Phù hợp với các tình huống cần xác định động vị trí đường chú thích dựa trên dữ liệu, như trung bình, lớn nhất, phân vị, đường nghiệp vụ, v.v.

:::

**Ví dụ**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường chú thích"

"Tính doanh số trung bình cho đường chú thích"



#### code

**Type:** `string`

:::note{title=Mô tả}






**Ví dụ**







:::

**Ví dụ**

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

**Ví dụ**
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Mô tả}
\- Tham số đầu vào: data (mảng).

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime

:::

**Ví dụ**
'Văn bản chú thích'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
_.filter(data, item => item.year === 2024),

:::

**Ví dụ**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
const index = Math.floor(sorted.length * 0.75);

:::

**Ví dụ**
**Type:** `false | true`



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}


Vị trí văn bản



Vị trí nhãn đường chú thích (vị trí tương đối của nhãn so với đường).



:::

**Ví dụ**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
**Ví dụ**

**Ví dụ**







:::

**Ví dụ**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Khuyến nghị đặt 'top' để văn bản hiển thị đầy đủ trong vùng hiển thị của biểu đồ.

:::

**Ví dụ**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
center: Văn bản nằm ở giữa đường tham chiếu (ở cuối đường đánh dấu ngang).



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Mô tả}
Đường đánh dấu số (bao gồm đường trung bình, đường giá trị lớn nhất, đường giá trị nhỏ nhất, v.v.), hiển thị theo chiều ngang, có thể đặt vị trí, kiểu dáng, v.v. của đường đánh dấu. Nếu cần vẽ đường đánh dấu tương ứng với giá trị bin, hãy dùng cấu hình này; lưu ý giá trị bin chịu ảnh hưởng của `binValueType`

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}












:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường chú thích"

"Tính doanh số trung bình cho đường chú thích"



#### code

**Type:** `string`

:::note{title=Mô tả}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value



'red'

**Type:** `"in" | "not in" | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Ví dụ**
\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value
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

:::note{title=Mô tả}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}




Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**
'Văn bản chú thích'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
**Ví dụ**





:::

**Ví dụ**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
center: Văn bản được căn giữa trong vùng chú thích; tâm văn bản căn với vùng.

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Căn chỉnh dọc văn bản; thường đặt là 'top' để văn bản xuất hiện ở đáy vùng chú thích và nằm trong vùng hiển thị của biểu đồ.

:::

**Ví dụ**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
**Type:** `boolean | undefined`



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}








màu nền

:::

**Ví dụ**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
màu nét nền



màu nét nền

**Ví dụ**

**Ví dụ**

:::

**Ví dụ**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
bán kính bo góc nền

:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
padding nền

:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Màu vùng chú thích



Màu vùng chú thích

:::

**Ví dụ**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Ví dụ**



**Ví dụ**

:::

**Ví dụ**




### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Bán kính bo góc viền vùng chú thích.

:::

**Ví dụ**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Mô tả}


:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mô tả}
4

:::


#### field

**Type:** `string`

:::note{title=Mô tả}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}




Màu vùng chú thích

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
**Ví dụ**

**Type:** `number | undefined`





:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
'red'

:::

**Ví dụ**
'Văn bản chú thích'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Mô tả}
2

:::

**Ví dụ**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
4

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
[2, 2]

:::

**Ví dụ**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
0

:::

**Ví dụ**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Cấu hình đường hồi quy đa thức, bao gồm bậc đa thức, kiểu đường hồi quy, v.v.

Nên đặt thành 'center' để đảm bảo văn bản nằm ở giữa vùng đánh dấu







:::

**Ví dụ**
'center' văn bản nằm giữa vùng chú thích



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}








Bậc của hồi quy đa thức

:::

**Ví dụ**
'top' văn bản nằm dưới vùng chú thích



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `string | undefined`

:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản



Màu văn bản

:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**



**Ví dụ**

:::

**Ví dụ**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
Padding nền

:::

**Ví dụ**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu vùng đánh dấu

:::

**Ví dụ**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
**Type:** `boolean | undefined`



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
Lề của vùng đánh dấu

:::

**Ví dụ**
0




## kdeRegressionLine

**Type:** `KdeRegressionLine | KdeRegressionLine[] | undefined`

:::note{title=Mô tả}
Cấu hình đường hồi quy mật độ kernel, dùng để hiển thị xu hướng và phân bố dữ liệu

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chức năng đường hồi quy hay không

:::

### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường hồi quy

Dùng để đặt màu đường hồi quy; nếu không đặt, mặc định sử dụng màu chính của biểu đồ

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường hồi quy

Dùng để đặt độ rộng đường hồi quy, đơn vị pixel, giá trị mặc định là 1

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Kiểu đường hồi quy

Dùng để đặt kiểu đường hồi quy, ví dụ đường liền, đường nét đứt, v.v.; giá trị mặc định là đường liền

:::

### text

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản nhãn đường hồi quy

Dùng để đặt văn bản nhãn của đường hồi quy; chuỗi rỗng nghĩa là không hiển thị nhãn

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kích thước phông chữ văn bản

:::

**Ví dụ**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm phông chữ văn bản

:::

**Ví dụ**
400




## ecdfRegressionLine

**Type:** `EcdfRegressionLine | EcdfRegressionLine[] | undefined`

:::note{title=Mô tả}
Cấu hình đường hồi quy hàm phân phối tích lũy thực nghiệm, dùng để hiển thị phân bố tích lũy của dữ liệu

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật hay không

:::

### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường hồi quy

Dùng để đặt màu đường hồi quy; nếu không đặt, mặc định sử dụng màu chính của biểu đồ

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường hồi quy

Dùng để đặt độ rộng đường hồi quy, đơn vị pixel, giá trị mặc định là 1

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Kiểu đường hồi quy

Dùng để đặt kiểu đường hồi quy, ví dụ đường liền, đường nét đứt, v.v.; giá trị mặc định là đường liền

:::

### text

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản nhãn đường hồi quy

Dùng để đặt văn bản nhãn của đường hồi quy; chuỗi rỗng nghĩa là không hiển thị nhãn

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kích thước phông chữ văn bản

:::

**Ví dụ**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm phông chữ văn bản

:::

**Ví dụ**
400




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Mô tả}
Có bật liên kết chiều khi biểu đồ bật chức năng pivot hoặc tổ hợp chỉ số hay không

Khi hover vào một giá trị chiều, dữ liệu có cùng giá trị chiều trong các biểu đồ khác sẽ được liên kết và tô sáng



Cấu hình liên kết chiều của biểu đồ pivot

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật liên kết chiều của biểu đồ pivot hay không

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị thông tin Tooltip của các biểu đồ con tương ứng với tất cả các chiều hay không

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không

:::


## locale

**Type:** `Locale | undefined`

:::note{title=Mô tả}
Cấu hình ngôn ngữ biểu đồ, hỗ trợ hai ngôn ngữ 'zh\-CN' và 'en\-US'; ngoài ra có thể gọi phương thức intl.setLocale('zh\-CN') để đặt ngôn ngữ

:::

