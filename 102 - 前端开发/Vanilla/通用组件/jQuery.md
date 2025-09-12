# jQuery

[jQuery](https://jquery.com/) 是一个快速、小巧、功能丰富的 JavaScript 库，简化 HTML 操作、事件处理、动画和 Ajax。

**快速引入**：

通过 CDN 动态加载 jQuery：

```javascript
function importJs(url) {
  const js = document.createElement('script');
  js.src = url;
  document.head.appendChild(js);
}

importJs("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js");
```

## 一、选择器

### 基础选择器

- **属性选择器**

  [$("[attribute='value']")](https://api.jquery.com/attribute-equals-selector/) 精确匹配属性值。

  ```javascript
  $("input[name='checkList']").attr("checked", true);
  ```

- **表单选择器**

  [$(":checked")](https://api.jquery.com/checked-selector/) 匹配已选中的表单元素。
  
  ```javascript
  $("input:checked");
  ```
  
### 层级选择器

- **子元素**

  [$(":nth-child()")](https://api.jquery.com/nth-child-selector/) 匹配父元素下特定位置的子元素。
  
  ```javascript
  $('#example tbody tr:nth-child(2)');
  ```
  
## 二、DOM 操作

### 元素遍历

- **向下查找**

  [`.find()`](https://api.jquery.com/find/) 搜索后代元素，[`.children()`](https://api.jquery.com/children/) 仅搜索直接子元素。
  
  ```javascript
  $('table').find('thead th')
  ```
  
- **向上查找**

  [`.closest()`](https://api.jquery.com/closest/) 查找最近的匹配祖先，[`.parents()`](https://api.jquery.com/parents/) 获取所有匹配祖先。
  
  ```javascript
  $("table tbody").on("click", "td", function () {
    var tr = $(this).closest("tr");
    tr.hide();
  });
  ```
  
### 元素过滤

- **索引过滤**

  [`.eq()`](https://api.jquery.com/eq/) 选取指定位置的元素。
  
  ```javascript
  $("p").eq(0);
  ```
  
- **条件过滤**

  [`.is()`](https://api.jquery.com/is/) 判断元素集是否匹配给定参数，如果这些元素中至少有一个与给定参数匹配，则返回 `true`。
  
  ```javascript
  $(element).is(':checked');
  ```
  
  [`.filter()`](https://api.jquery.com/filter/) 保留匹配元素，[`.not()`](https://api.jquery.com/not/) 排除匹配元素。
  
  ```javascript
  $('#example tbody tr').filter(':nth-child(2)');
  ```

### 元素操作

- **元素转换**

  [`.get()`](https://api.jquery.com/get/) 转换 jQuery 对象为 DOM 节点。
  
  ```javascript
  $("input[name='checkList']:checked")
    .map(function () {
      return $(this).val();
    })
    .get();
  ```
  
- **批量处理**

  [`.each()`](https://api.jquery.com/each/) 遍历元素。
  
  ```javascript
  $("img").each(function () {
    console.log(this.src);
  });
  ```

  [`.map()`](https://api.jquery.com/map/) 转换元素集合。
  
  ```javascript
  $("input[name='checkList']:checked").map(function () {
    return $(this).val();
  });
  ```
  
- **样式操作**

  [`.toggleClass()`](https://api.jquery.com/toggleClass/) 动态切换类名。
  
  ```javascript
  $("#example").on("click", function (event) {
    $(event.target).parent().toggleClass("selected", true);
  });
  ```

## 三、事件处理

### 事件绑定

- **页面就绪事件**

  [`.ready()`](https://api.jquery.com/ready/) 或简写 `$(handler)`。大多数浏览器以 [`DOMContentLoaded`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/DOMContentLoaded_event) 事件的形式提供类似的功能。

  ```javascript
  $(document).ready(handler);
  $(handler);
  ```
  
- **通用事件绑定**

  [`.on()`](https://api.jquery.com/on/) 绑定事件，支持动态元素。
  
  ```javascript
  $('#table').on('click', 'tr', function() { /* ... */ });
  ```
  
### 事件触发

- **手动触发事件**

  [`.trigger()`](https://api.jquery.com/trigger/) 模拟用户操作。
  
  ```javascript
  $(".videoListItem").trigger("click");
  ```
  
## 四、Ajax 与数据交互

### 数据序列化

- **表单序列化**

  [`.serialize()`](https://api.jquery.com/serialize/) 生成 URL 编码字符串，[`.serializeArray()`](https://api.jquery.com/serializeArray/) 转换为对象数组。
  
  ```javascript
  const formData = $("form").serialize();
  const formData = $("form").serializeArray();
  
  // 将表单数据序列化为 JSON
  function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
  
    $.map(unindexed_array, function (n) {
      indexed_array[n["name"]] = n["value"];
    });
  
    return indexed_array;
  }
  ```
  
### 请求方法

[`$.ajax()`](https://api.jquery.com/jQuery.ajax/) 提供高度可定制化请求，[`$.get()`](https://api.jquery.com/jQuery.get/) 和 [`.load()`](https://api.jquery.com/load/) 用于简化常见请求。

```javascript
// 基础 POST 请求
$.ajax({
  method: "POST",
  url: "/api",
  contentType: "application/json",
  data: JSON.stringify({ key: "value" }),
  success: data => console.log(data)
});

// 简写形式
$.post("/api", { name: "John" }, res => { /* ... */ });
```

`$.ajax()` 接受以下可选参数：

| 参数            | 类型                | 说明                                                     |
| --------------- | ------------------- | -------------------------------------------------------- |
| **url**         | string              | 请求目标地址（默认为当前页）                             |
| **method**      | string              | HTTP 方法（GET/POST/PUT/DELETE 等），默认为 GET          |
| **data**        | object/string/array | 发送数据，非主体方法（如 GET）自动附加到 URL             |
| **contentType** | string              | 请求体编码类型，默认 `application/x-www-form-urlencoded` |
| **dataType**    | string              | 预期响应数据类型（xml/json/script/html）                 |
| **async**       | boolean             | 是否异步请求，默认 `true`                                |
| **success**     | function            | 请求成功回调                                             |
| **error**       | function            | 请求失败回调                                             |
| **beforeSend**  | function            | 预检函数，接收 `XMLHttpRequest` 参数                     |

**应用示例**：

- 发送 JSON 数据

  ```javascript
  $.ajax({
    type: "POST",
    url: "https://nghttp2.org/httpbin/post",
    contentType: "application/json",
    data: JSON.stringify([1, 2, 3]),
    success: function (msg) {
      console.log(msg);
    },
  });
  ```

- 发送 URL 编码数据

  ```javascript
  $.ajax({
    method: "POST",
    url: "https://httpbin.org/post",
    data: { key1: "value1", key2: "value2" },
    dataType: "json",
    success: data => console.log(data),
    error: err => console.error(err)
  });
  ```

## 五、实用工具

### 数组和对象

- **数据转换**

  [`$.map()`](https://api.jquery.com/jQuery.map/) 遍历并转换数组/对象。
  
  ```javascript
  const newArr = $.map([0,1,2], n => n + 100);
  
  $.map([0,1,2], function (n, index) {
    return n + index;
  });
  ```
  
- **对象合并**

  [`$.extend()`](https://api.jquery.com/jQuery.extend/) 合并多个对象属性。
  
  ```javascript
  const headers = $.extend({}, { Authorization: "Bearer" }, { "Content-Type": "json" });
  ```
  
## Reference

- [jQuery Cheat Sheet - *Oscar Otero*](https://oscarotero.com/jquery/)
- [jQuery Cheat Sheet - *OverAPI*](https://overapi.com/jquery)
- [camsong/You-Dont-Need-jQuery](https://github.com/camsong/You-Dont-Need-jQuery)
- [HubSpot/YouMightNotNeedjQuery](https://github.com/HubSpot/YouMightNotNeedjQuery)
- [you-dont-need/You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)

