# DataTables

[DataTables](https://datatables.net/) 是一个 JavaScript 表格增强库，支持排序、分页、搜索等高级功能，轻松实现交互式数据展示。

## 一、安装与依赖

```html
<!-- CDN引入 -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.css">
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.js"></script>

<!-- 基础初始化 -->
<script>
$(document).ready(function() {
    $('#table_id').DataTable();
});
</script>
```

## 二、数据加载方式

### 数据结构类型

| 类型                                                    | 特点                                     |
| ------------------------------------------------------- | ---------------------------------------- |
| [数组形式](https://datatables.net/manual/data/#Arrays)  | 通过索引映射列，需保持数组长度与列数一致 |
| [对象形式](https://datatables.net/manual/data/#Objects) | 通过键值对映射，支持扩展属性，推荐使用   |
| [类实例](https://datatables.net/manual/data/#Instances) | 需通过渲染函数处理，适用于复杂数据结构   |

#### 数组

[数组](https://datatables.net/manual/data/#Arrays)与 DataTable 的列可通过索引直接映射，是高效的数据填充方式。使用时需遵循元素与列的数量匹配规则。

```javascript
const data = [
  ["Tiger Nixon", "System Architect", "Edinburgh", "5421"],
  ["Garrett Winters", "Director", "Edinburgh", "8422"]
];

$("#table_id").DataTable({
  data: data,
  columns: [
    { title: "Name" }, 
    { title: "Position" },
    { title: "Office" },
    { title: "Extn." }
  ]
});
```

#### 对象

[对象](https://datatables.net/manual/data/#Objects)数据结构相较于数组具有更高的可读性与操作便利性，其属性名访问机制在 API 交互场景中优势显著，无需依赖索引定位即可精准获取特定数据字段。对象支持存储多维元数据的特性，既能满足 DataTable 的展示需求，又能保留完整的数据上下文，为后续数据处理和业务逻辑实现提供了灵活的基础结构。

```javascript
const data = [
  {name: "Tiger Nixon", position: "System Architect", extn: "5421"},
  {name: "Garrett Winters", position: "Director", extn: "8422"}
];

$("#table_id").DataTable({
  data: data,
  columns: [
    { title: "Name", data: "name" },
    { title: "Position", data: "position" },
    { title: "Extn.", data: "extn" }
  ]
});
```

### 数据来源

| 来源                                                         | 适用场景          | 配置方法                   |
| ------------------------------------------------------------ | ----------------- | -------------------------- |
| [DOM](https://datatables.net/manual/data/#DOM)               | 静态小数据        | 自动识别表格现有内容       |
| [JavaScript](https://datatables.net/manual/data/#Javascript) | 中小型数据集      | 通过 `data` 参数直接传递   |
| [Ajax](https://datatables.net/manual/data/#Ajax)             | 动态加载/大数据集 | 使用 `ajax` 配置远程数据源 |

#### JavaScript

可通过 `data` 初始化参数显式配置 DataTables 的数据源绑定，实现预设数据集的直接加载。

```javascript
$("#table_id").DataTable({
  data: data,
});
```

#### Ajax

通过声明式 API Endpoint 配置，DataTables 可实现 Ajax 与 JavaScript 数据源的无缝切换。二者的核心差异在于数据获取机制：当采用 `ajax` 选项指定目标 URL 后，DataTables 将自动触发标准化 RESTful 请求，完成数据获取与解析的完整流程。

```javascript
$("#table_id").DataTable({
  ajax: {
    url: "/api/data",
    dataSrc: "" // 数据根路径
  },
  columns: [
    { title: "姓名", data: "name" },
    { title: "职位", data: "position" }
  ]
});
```

## 三、核心配置选项

### 列配置

| 参数                                                         | 类型                                                         | 说明           | 示例                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- | ---------------------------------------- |
| [`data`](https://datatables.net/reference/option/columns.data) | [string](https://datatables.net/reference/option/columns.data#string)/[函数](https://datatables.net/reference/option/columns.data#data(-row,-type,-set,-meta-)) | 数据映射字段   | `data: "name"`                           |
| [`render`](https://datatables.net/reference/option/columns.render) | [函数](https://datatables.net/reference/option/columns.render#render(-data,-type,-row,-meta-)) | 自定义渲染逻辑 | `render: (data) => $('<b>'+data+'</b>')` |
| [`className`](https://datatables.net/reference/option/columns.className) | string                                                       | 列单元格样式类 | `className: "text-center"`               |
| [`orderable`](https://datatables.net/reference/option/columns.orderable) | boolean                                                      | 是否启用排序   | `orderable: false`                       |
| [`defaultContent`](https://datatables.net/reference/option/columns.defaultContent) | string                                                       | 默认占位内容   | `defaultContent: "N/A"`                  |

数据函数示例，可以显示每行序号。

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

渲染函数示例，可以指定一个返回值为 HTML 字符串的函数来自定义渲染逻辑。

```javascript
columns: [
  {
    title: "操作",
    render: (data, type, row) => 
      `<button class="edit-btn" data-id="${row.id}">编辑</button>`
  }
]
```

### 回调函数

- [**initComplete**](https://datatables.net/reference/option/initComplete)

  初始化完成回调。

  ```javascript
  initComplete: function () {
    var api = this.api();
    api.$("td").click(function () {
      api.search(this.innerHTML).draw();
    });
  }
  ```

### 全局配置

```javascript
{
  // 基础配置
  ordering: true,      // 是否启用排序
  searching: true,     // 是否启用搜索
  pageLength: 25,      // 默认每页显示数量
  
  // 高级配置
  serverSide: true,    // 启用服务端模式(分页)
  processing: true,    // 显示加载提示
  
  // 本地化配置
  language: {
    paginate: {
      first: "首页",
      last: "末页",
      next: "下一页",
      previous: "上一页"
    },
    processing: "正在处理，请稍候...",
    info: "显示 _START_ 至 _END_ 项，共 _TOTAL_ 项"
  }
}
```

## 四、服务器分页

### 请求参数处理

向服务器发出请求时，DataTables 将发送以下数据，以便让服务器知道需要什么数据。

- **start**(*integer*)

  当前数据集的起点，由第几页和每页显示数量决定。

- **length**(*integer*)

  每页显示数量。

可以使用 [`ajax.data`](https://datatables.net/reference/option/ajax.data) 自定义请求参数名称。

```javascript
$("#table").DataTable({
  serverSide: true,
  ajax: {
    url: "/api/server-side",
    data: (d) => ({
      page: Math.ceil(d.start / d.length) + 1,
      pageSize: d.length
    })
  }
});
```

### 响应格式要求

- **data**(*array*)

  要在表中显示的数据。

- **recordsTotal**(*integer*)

  数据库中的记录总数。

```json
{
  "draw": 1,
  "recordsTotal": 100,
  "recordsFiltered": 95,
  "data": [...]
}
```

可以使用 [`ajax.dataSrc`](https://datatables.net/reference/option/ajax.dataSrc) 自定义响应字段名称。

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

## 五、常用 API 方法

### 数据操作

```javascript
const table = $('#table').DataTable();

// 刷新数据
table.ajax.reload();

// 更新数据源
table.ajax.url('new-data.json').load();

// 对整个表格执行 jQuery 选择操作
table.$("td").click(function () {
  table.search(this.innerHTML).draw();
});
```

### 行列控制

```javascript
// 从表格中选择一列
table.column(0);

// 获取或设置所选行的数据
table.row(0).data();
table.row('.selected').data();

// 隐藏第一列
table.column(0).visible(false);

// 添加行点击事件
table.rows().every(function() {
  this.node().addEventListener('click', handleRowClick);
});
```

- **row**().[**child**](https://datatables.net/reference/api/row().child())()

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

## 六、交互增强示例

### 行选中功能

```javascript
$('#example tbody').on('click', 'tr', function() {
  $(this).toggleClass('selected');
});

// 获取所有选中行数据
$('#btn-get-selected').click(() => {
  const selected = table.rows('.selected').data();
  console.log(selected);
});
```

### 动态子行

```javascript
table.on('click', 'td.details-control', function() {
  const tr = $(this).closest('tr');
  const row = table.row(tr);
  
  if (row.child.isShown()) {
    row.child.hide();
  } else {
    row.child(formatChildRow(row.data())).show();
  }
});
```

## Reference

- [Converting parameter names for 1.10](https://datatables.net/upgrade/1.10-convert)

