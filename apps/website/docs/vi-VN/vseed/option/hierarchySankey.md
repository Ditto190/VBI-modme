# HierarchySankey

:::info{title=Ánh xạ mã hóa}
Biểu đồ Sankey phân cấp hỗ trợ các kênh trực quan sau:

`hierarchy`: kênh phân cấp, hỗ trợ `nhiều chiều`

`size`: kênh kích thước, hỗ trợ `một measure`

`label`: kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều measure`

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều measure`

:::

:::note{title=Mô tả}
Biểu đồ Sankey phân cấp dùng để hiển thị dữ liệu luồng phân cấp, biểu diễn quan hệ phân cấp và độ lớn luồng bằng nút cây và liên kết luồng

Tình huống áp dụng:

\- Hiển thị quan hệ luân chuyển phân cấp từ thượng nguồn đến hạ nguồn

\- Nhấn mạnh phân bổ luồng và truyền đường dẫn trong cấu trúc cây

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

\- Ít nhất 1 trường chiều để xây dựng cấu trúc phân cấp

\- Ít nhất 1 trường số (chỉ số) để ánh xạ độ lớn luồng

\- advanced pipeline cần chuyển tidyData thành cấu trúc children dạng cây mà VChart hỗ trợ

:::


## chartType

**Type:** `"hierarchySankey"`

:::note{title=Mô tả}
Biểu đồ Sankey phân cấp



Biểu đồ Sankey phân cấp, hiển thị quan hệ luồng và độ lớn luồng trong cấu trúc phân cấp

:::

**Ví dụ**
'hierarchySankey'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu đã tổng hợp và tuân thủ TidyData, dùng để định nghĩa nguồn và cấu trúc dữ liệu của biểu đồ. Người dùng không cần xử lý thủ công dữ liệu đầu vào; khả năng Data Reshape mạnh mẽ của VSeed sẽ tự động xử lý. Dữ liệu biểu đồ Area cuối cùng được reshape thành 2 chiều và 1 chỉ số.



Tập dữ liệu đã được tổng hợp và tuân theo chuẩn TidyData, dùng để định nghĩa nguồn và cấu trúc dữ liệu của biểu đồ

:::

**Ví dụ**
[{region: 'Hoa Bắc', province: 'Hà Bắc', value: 30}, {region: 'Hoa Nam', province: 'Quảng Đông', value: 70}]




## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title=Mô tả}
Chiều đầu tiên được ánh xạ tới trục X; các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.



Cấu hình chiều, dùng để định nghĩa cấu trúc phân cấp, hỗ trợ các kênh hierarchy / label / tooltip

:::

**Ví dụ**
[{id: 'region', alias: 'Khu vực'}, {id: 'province', alias: 'Tỉnh'}]




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

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- hierarchy: hỗ trợ ánh xạ nhiều chiều vào kênh phân cấp

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh nhãn

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

:::

:::tip{title=Tip}
Chiều đầu tiên được ánh xạ trực tiếp vào kênh màu.

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số



Cấu hình chỉ số, dùng để định nghĩa độ lớn luồng, hỗ trợ các kênh size / label / tooltip

:::

**Ví dụ**
[{id: 'value', alias: 'Lưu lượng'}]




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

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- size: chỉ số được ánh xạ vào kênh kích thước, dùng để hiển thị diện tích hoặc kích thước trong các biểu đồ như Treemap và Sunburst.

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




Dùng để chỉ định tên trường phân trang; phải là một chiều

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




Màu nền có thể là chuỗi màu như 'red', 'blue', hoặc hex, rgb, rgba như '#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}
Màu



Cấu hình màu, dùng để định nghĩa bảng màu của biểu đồ, bao gồm danh sách màu, ánh xạ màu, gradient màu, v.v.

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
Cấu hình nhãn dùng để định nghĩa nhãn dữ liệu biểu đồ, bao gồm vị trí, định dạng và kiểu.



Cấu hình nhãn, dùng để định nghĩa nhãn dữ liệu của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.

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




Cấu hình chú giải, dùng để định nghĩa hiển thị, vị trí và kiểu dáng của chú giải màu trong biểu đồ Sankey phân cấp

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




Cấu hình tooltip, dùng để định nghĩa thông tin gợi ý của biểu đồ, bao gồm nội dung, định dạng, kiểu dáng, v.v.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}




Tích hợp sẵn hai chủ đề light và dark; người dùng có thể tùy chỉnh chủ đề thông qua Builder



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::

**Ví dụ**
'dark'

'light'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mô tả}
Ngôn ngữ



Cấu hình ngôn ngữ biểu đồ, hỗ trợ hai ngôn ngữ 'zh\-CN' và 'en\-US'

:::
