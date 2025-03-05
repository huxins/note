# DataTables

[DataTables](https://datatables.net/manual/) 是一个 Javascript HTML 表增强库。

## 一、介绍

```html
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.js"></script>
```

初始化数据表：

```javascript
$(document).ready(function() {
    $('#table_id').DataTable();
});
```

## 二、数据

### 数据源类型

用于 DataTable 的数据源必须是一个数组。

该数组中的每个项目都将定义要显示的行，DataTables 可以使用三种基本的 JavaScript 数据类型作为行的数据源。

- Arrays `[]`
- Objects `{}`
- Instances `new MyClass()`

#### Arrays

数组很容易在 DataTable 中使用，因为数组元素到数据所在列的映射只需通过读取该位置的数组元素值的列索引来执行。

因此，当使用数组作为数据源时，每个数组中的元素数必须等于表中的列数。

基于数组的数据可能如下所示：

```javascript
var data = [
  ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$3,120"],
  ["Garrett Winters", "Director", "Edinburgh", "8422", "2011/07/25", "$5,300"],
];
```

表格初始化：

```javascript
$("#table_id").DataTable({
  data: data,
  columns: [
    { title: "Name" },
    { title: "Position" },
    { title: "Office" },
    { title: "Extn." },
    { title: "Start date" },
    { title: "Salary" }]
});
```

#### Objects

对象非常适合直观地使用，其方式与数组略有不同。

如果您通过 API 处理数据，对象可以使获取特定数据变得非常容易，因为您只需要使用属性名称，而不是记住数据所在的数组索引。

对象还可以包含比 DataTable 显示所需的更多信息，这对于操作数据非常有用。

基于对象的数据可能如下所示：

```javascript
var data = [
  {
    name: "Tiger Nixon",
    position: "System Architect",
    salary: "$3,120",
    start_date: "2011/04/25",
    office: "Edinburgh",
    extn: "5421",
  },
  {
    name: "Garrett Winters",
    position: "Director",
    salary: "$5,300",
    start_date: "2011/07/25",
    office: "Edinburgh",
    extn: "8422",
  }
];
```

表格初始化：

```javascript
$("#table_id").DataTable({
  data: data,
  columns: [
    { title: "Name", data: "name" },
    { title: "Position", data: "position" },
    { title: "Salary", data: "salary" },
    { title: "Office", data: "office" },
  ],
});
```

### 数据源

DataTables 在表中显示的数据有三个基本来源。

- DOM
- JavaScript
- Ajax

#### JavaScript

可以使用数据初始化选项指示 DataTables 使用提供给它的 `data`。

```javascript
$("#table_id").DataTable({
  data: data,
});
```

#### Ajax

Ajax 来源数据与 JavaScript 来源数据非常相似，但 DataTables 会进行 Ajax 调用来为您获取数据。

Ajax 数据由 DataTables 加载，只需使用 `ajax` 选项设置应该发出 Ajax 请求的 URL。

```javascript
$("#table_id").DataTable({
  ajax: {
    url: "/api/data.json",
    dataSrc: "",
  },
  columns: [
    { title: "Name", data: "name" },
    { title: "Position", data: "position" },
    { title: "Salary", data: "salary" },
    { title: "Office", data: "office" },
  ],
});
```

## 三、选项

### Columns

- *columns*.**data**

  从行数据对象中设置列的数据源。

  - *string*

    从数据源读取和写入对象属性。

    ```javascript
    columns: [
      { title: "Name", data: "name" }
    ]
    ```

  - *function*

    只要 DataTables 需要设置或获取列中单元格的数据，就会执行给定的函数。

    - **row**

      整行的数据。

    - **type**

      为单元格请求的数据类型。

    - **meta**

      包含有关被请求单元格的附加信息的对象。

    ```javascript
    columns: [
      {
        title: "Name",
        data: function (row, type, val, meta) {
          return row.name;
        }
      }
    ]
    ```

    显示每行序号。

    ```javascript
    columns: [
      {
        title: "NO.",
        data: function (row, type, set, meta) {
          return meta.settings._iDisplayStart + meta.row + 1;
        }
      }
    ]
    ```

- *columns*.**render**

  和 `columns.data` 类似，但可以指定一个返回值为 HTML 字符串的函数来自定义渲染逻辑。

  ```javascript
  $("#example").DataTable({
    columnDefs: [
      {
        orderable: false,
        className: "select-checkbox",
        targets: 0,
        render: function (data, type, full, meta) {
          return '<input type="checkbox">';
        },
      },
    ],
  });
  ```

- *columns*.**className**

  要分配给列中每个单元格的类。

  ```javascript
  columns: [
    {
      title: "Name",
      data: "name",
      className: "my_class",
    },
  ]
  ```

- *columns*.**orderable**

  启用或禁用此列的排序。

  ```javascript
  columns: [
    {
      title: "Name",
      data: "name",
      orderable: false,
    },
  ]
  ```

- *columns*.**defaultContent**

  为列设置默认的静态内容。

  ```javascript
  columns: [
    {
      title: "Name",
      data: "name",
      defaultContent: "",
    },
  ]
  ```

### Callbacks

- **initComplete**

  初始化完成回调。

  ```javascript
  initComplete: function () {
    var api = this.api();
    api.$("td").click(function () {
      api.search(this.innerHTML).draw();
    });
  }
  ```

### Options

- **order**

  表的初始排序规则。默认为 `[[0, 'asc']]`。

- **ordering**

  是否允许排序。默认值为 `true`。

- **processing**

  用于指定在数据加载时是否显示“正在处理中”的提示信息。

  ```javascript
  $("#example").dataTable({
    processing: true,
  });
  ```

- **serverSide**

  启用服务器端处理分页。

  ```javascript
  $("#example").dataTable({
    serverSide: true,
  });
  ```

- **language**

  数据表的语言配置选项。

  ```javascript
  $("#example").DataTable({
    language: {
      processing: "正在处理，请稍候...",
      info: "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
      paginate: {
        first: "首页",
        previous: "上一页",
        next: "下一页",
        last: "末页",
      },
    },
  });
  ```

- **lengthChange** (*boolean*)

  是否允许用户调整每页显示数量。

- **pageLength** (*integer*)

  更改每页显示数量。

- **searching** (*boolean*)

  是否开启搜索功能。

## 四、API

### Core

- *ajax*.**reload**()

  从 Ajax 数据源重新加载表数据。

  ```javascript
  $('#table').DataTable().ajax.reload();
  ```

- *ajax*.**url**().**load**()

  从新设置的数据源 URL 加载数据。

  ```javascript
  $('#table').DataTable().ajax.url('newData.json').load();
  ```

- **$**()

  对整个表格执行 jQuery 选择操作。

  ```javascript
  var table = $("#table").DataTable();
  table.$("td").click(function () {
    table.search(this.innerHTML).draw();
  });
  ```

### Columns

- **column**()

  从表格中选择一列。

  ```javascript
  $('#table').DataTable().column(0);
  ```

- **column**().**visible**()

  获取或设置单个选定列的可见性。

  ```javascript
  $('#table').DataTable().column(0).visible(true);
  ```

### Rows

- **row**()

  从表格中选择一行。

  ```javascript
  $('#table').DataTable().row(0);
  ```

- **row**().**data**()

  获取或设置所选行的数据。

  ```javascript
  $('#table').DataTable().row(0).data();
  ```

- **row**().**child**()

  获取或设置所选主表行的子行。

  ```javascript
  $("table tbody").on("click", "td", function () {
    var tr = $(this).closest("tr");
    var row = $("#table").DataTable().row(tr);
    if (row.child.isShown()) {
      row.child.hide();
    } else {
      row.child(JSON.stringify(row.data())).show();
    }
  });
  ```

## 五、服务器分页

### 请求数据

向服务器发出请求时，DataTables 将发送以下数据，以便让服务器知道需要什么数据。

- **start** (*integer*)

  当前数据集的起点，由第几页和每页显示数量决定。

- **length** (*integer*)

  每页显示数量。

可以使用 `ajax.data` 自定义请求参数名称：

```javascript
$("#example").DataTable({
  serverSide: true,
  ajax: {
    url: "your_api_url",
    data: function (d) {
      d.startIndex = d.start;
      d.pageSize = d.length;
      d.page = d.start / d.length + 1;
      delete d.start;
      delete d.length;
    },
  },
});
```

### 响应数据

- **data** (*array*)

  要在表中显示的数据。

- **recordsTotal** (*integer*)

  数据库中的记录总数。

可以使用 `ajax.dataSrc` 自定义响应字段名称：

```javascript
$("#example").DataTable({
  serverSide: true,
  ajax: {
    url: "your_api_url",
    dataSrc: function (json) {
      json.recordsTotal = json.total;
      json.recordsFiltered = json.total;
      delete json.total;

      return json.data;
    },
  },
});
```

## 六、选中行数据

- 单击某行时，选中行数据

  ```javascript
  $("#example tbody").on("click", "tr", function () {
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
    } else {
      $(this).parent().find("tr.selected").removeClass("selected");
      $(this).addClass("selected");
    }
  });
  ```

