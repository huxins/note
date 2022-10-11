# DataTables

## 入门

### 快速开始

#### CSS

```css
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.css">
```

#### JS

```html
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.js"></script>
```

### 初始化数据表

```javascript
$(document).ready(function() {
    $('#table_id').DataTable();
});
```

## 数据

### 数据源类型

用于 DataTable 的主要数据源必须始终是一个数组。该数组中的每个项目都将定义要显示的行，DataTables 可以使用三种基本的 JavaScript 数据类型作为行的数据源：

- Arrays - `[]`
- Objects - `{}`
- Instances - `new MyClass()`

#### Arrays

数组很容易在 DataTable 中使用，因为数组元素到数据所在列的映射只需通过读取该位置的数组元素值的列索引来执行。因此，当使用数组作为数据源时，每个数组中的元素数必须等于表中的列数。

基于数组的数据可能如下所示：

```javascript
var data = [
    [
        "Tiger Nixon",
        "System Architect",
        "Edinburgh",
        "5421",
        "2011/04/25",
        "$3,120"
    ],
    [
        "Garrett Winters",
        "Director",
        "Edinburgh",
        "8422",
        "2011/07/25",
        "$5,300"
    ]
]
```

表初始化：

```javascript
$(document).ready(function() {
    $('#table').DataTable({
        data: data,
        columns: [
            { title: "Name"},
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ]
    });
});
```

#### Objects

对象非常适合直观地使用，其方式与数组略有不同。如果您通过 API 积极处理数据，对象可以使获取特定数据变得非常容易，因为您只需要使用属性名称，而不是记住数据所在的数组索引（例如 `data.name`，而不是 `data[0]`）。

对象还可以包含比 DataTable 显示所需的更多信息，这对于操作数据非常有用（例如，包括对最终用户不可见的数据库主键）。

基于对象的数据可能如下所示：

```javascript
var data = [
    {
        "name":       "Tiger Nixon",
        "position":   "System Architect",
        "salary":     "$3,120",
        "start_date": "2011/04/25",
        "office":     "Edinburgh",
        "extn":       "5421"
    },
    {
        "name":       "Garrett Winters",
        "position":   "Director",
        "salary":     "$5,300",
        "start_date": "2011/07/25",
        "office":     "Edinburgh",
        "extn":       "8422"
    }
]
```

表初始化：

```javascript
$(document).ready(function() {
    $('#table').DataTable({
        data: data,
        columns: [
            { data: 'name' },
            { data: 'position' },
            { data: 'salary' },
            { data: 'office' }
        ]
    });
});
```

### 数据源

DataTables 将在表中显示的数据有三个基本来源：

- DOM
- JavaScript
- Ajax sourced data

#### JavaScript

可以使用数据初始化选项指示 DataTables 使用提供给它的 `data`。

```javascript
$(document).ready(function() {
    $('#table').DataTable({
        data: data
    });
});
```

#### Ajax

Ajax 来源数据与 JavaScript 来源数据非常相似，但 DataTables 会进行 Ajax 调用来为您获取数据。

##### 加载数据

Ajax 数据由 DataTables 加载，只需使用 `ajax` 选项设置应该发出 Ajax 请求的 URL。





## 参见

- [DataTables Manual](https://datatables.net/manual/index)

