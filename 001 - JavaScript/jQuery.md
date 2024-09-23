# jQuery

[jQuery](https://jquery.com/) 是一个快速、小巧、功能丰富的 JavaScript 库。它通过一个易于使用的 API 使 HTML 文档遍历和操作、事件处理、动画和 Ajax 等操作变得更加简单，该 API 可在多种浏览器中工作。

在没有 jQuery 的 Web 页面中，可以直接添加脚本。

```javascript
function importJs(url) {
  var js = document.createElement('script');
  js.setAttribute("src", url);
  document.getElementsByTagName("head")[0].appendChild(js);
}

importJs("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js");
```

## 一、事件

### 页面载入

[`.ready()`](https://api.jquery.com/ready/) 方法提供了一种在页面的 DOM 变得可以安全操作时，立即运行 JavaScript 代码的方法。大多数浏览器以 [`DOMContentLoaded`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/DOMContentLoaded_event) 事件的形式提供类似的功能。

```javascript
$(document).ready(handler)
```

jQuery 提供了一些简写方法。

```javascript
$(handler)
```

### 事件处理

[`.on()`](https://api.jquery.com/on/) 方法将事件处理程序附加到 jQuery 对象中当前选定的元素集。

```javascript
$("p").on(events[, selector][, data], handler)
```

例如，单击时在 `alert` 中显示段落的文本。

```javascript
$("p").on("click", function () {
  alert($(this).text());
});
```

例如，单击表格某一行时触发相关函数。

```javascript
$('#table').on('click', 'tbody tr', function () {
  console.log(this);
});
```

当相应的事件发生时，任何附加了 [`.on()`](https://api.jquery.com/on/) 或其快捷方式之一的事件处理程序都会被触发。然而，它们可以通过 [`.trigger()`](https://api.jquery.com/trigger/) 方法手动触发。调用 [`.trigger()`](https://api.jquery.com/trigger/) 以与用户自然触发事件时相同的顺序执行处理程序。

```javascript
$("p").trigger(eventType[, extraParameters])
```

例如，在指定元素上触发点击事件。

```javascript
$(".videoListItem").trigger("click");
```

## 二、Ajax

### 序列化

[`.serialize()`](https://api.jquery.com/serialize/) 方法以标准 URL 编码创建文本字符串。它可以作用于一个选择了单个表单控件的 jQuery 对象。

例如，将一组表单元素编码为字符串以供提交。

```javascript
$("form").serialize();
```

[`.serializeArray()`](https://api.jquery.com/serializeArray/) 方法创建一个 JavaScript 对象数组。它对 jQuery 表单或表单控件集合进行操作。

```javascript
$("form").serializeArray();
```

例如，将表单数据序列化为 JSON。

```javascript
function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n) {
    indexed_array[n["name"]] = n["value"];
  });

  return indexed_array;
}
```

### 底层接口

[`$.ajax()`](https://api.jquery.com/jQuery.ajax/) 函数是 jQuery 发送的所有 *ajax* 请求的基础。通常不需要直接调用此函数，因为有几个更高级的替代方法，如 [`$.get()`](https://api.jquery.com/jQuery.get/) 和 [`.load()`](https://api.jquery.com/load/)，它们更容易使用。不过，如果需要不太常见的选项，可以更灵活地使用 [`$.ajax()`](https://api.jquery.com/jQuery.ajax/)。

```javascript
jQuery.ajax(url[, settings])
```

`$.ajax()` 的 *settings* 如下，所有选项都是可选的。

- **data** (*object* or *string* or *array*)

  要发送到服务器的数据。如果 HTTP 方法是不能有实体主体的方法，例如 `GET`，数据将附加到 URL。
  
- **type** (*string*)
  
  默认值为 `GET`。请求方式可选 `POST` 或 `GET`。其它 HTTP 请求方法，如 `PUT` 和 `DELETE` 也可以使用，但仅部分浏览器支持。
  
- **url** (*string*)
  
  一个用来包含发送请求的 URL 字符串。
  
- **contentType** (*boolean* or *string*)
  
  向服务器发送数据时，使用此内容类型。如 `application/x-www-form-urlencoded`。
  
- **success** (*function*)
  
  请求成功时调用的函数。
  
- **async** (*boolean*)
  
  默认情况下，所有请求都是异步发送的，即默认情况下设置为 `true`。
  
- **beforeSend** (*function*)
  
  在发送请求之前调用，并且传入一个 `XMLHttpRequest` 作为参数。

例如，发送 JSON 数据到服务器，成功时显示信息。

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

## 三、工具

### 数组和对象操作

[`$.map()`](https://api.jquery.com/jQuery.map/) 方法将一个函数应用于数组或对象中的每个项，并将结果映射到一个新数组中。

```javascript
jQuery.map(array, callback)
```

例如，将原数组中每个元素加 100 转换为一个新数组。

```javascript
$.map([0, 1, 2], function (n) {
  return n + 100;
});
```

例如，将原数组中每个元素加自身索引转换成一个新数组。

```javascript
$.map([0, 1, 2], function (n, index) {
  return n + index;
});
```

当向 [`$.extend()`](https://api.jquery.com/jQuery.extend/) 提供两个或多个对象参数时，所有对象的属性都会添加到目标对象中。`null` 或 `undefined` 参数将被忽略。

```javascript
jQuery.extend(target, object1 [, objectN ])
```

例如，将两个或多个对象的内容合并到第一个对象中。

```javascript
const headers = {
  Authorization: `Bearer`,
};
$.extend(headers, {
  "Content-Type": "application/json",
});
```

## 四、DOM

### 查找

[`.find()`](https://api.jquery.com/find/) 方法允许我们在 DOM 树中搜索这些元素的后代，并从匹配的元素构建一个新的 jQuery 对象。[`.find()`](https://api.jquery.com/find/) 和 [`.children()`](https://api.jquery.com/children/) 方法是相似的，除了后者只在 DOM 树中向下移动一个级别。

```javascript
$('table').find(selector)
```

例如，获取当前匹配元素集中每个元素的后代元素。

```javascript
$('table').find('thead th')
```

[`.closest()`](https://api.jquery.com/closest/) 方法在 DOM 树中搜索这些元素及其祖先，并从匹配的元素构建一个新的 jQuery 对象。

```javascript
$('td').closest(selector)
```

例如，从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素。

```javascript
$("table tbody").on("click", "td", function () {
  var tr = $(this).closest("tr");
  tr.hide();
});
```

[`.parents()`](https://api.jquery.com/parents/) 和 [`.closest()`](https://api.jquery.com/closest/) 方法的[相似之处](https://api.jquery.com/closest/#entry-longdesc)在于它们都遍历 DOM 树，但 [`.parents()`](https://api.jquery.com/parents/) 查找所有匹配选择器的祖先元素。

```javascript
$('td').parents( [selector ] )
```

[`parent()`](https://api.jquery.com/parent/) 方法遍历 DOM 树中每个元素的直接父级，并从匹配的元素构造一个新的 jQuery 对象。

```javascript
$('h1').parent()
```

### 过滤

[`.eq()`](https://api.jquery.com/eq/) 方法从 jQuery 集合中的一个元素构建一个新的 jQuery 对象。提供的索引标识了该元素在集合中的位置。

```javascript
$("p").eq(0)
```

与其他过滤方法不同，[`.is()`](https://api.jquery.com/is/) 不会创建新的 jQuery 对象。相反，它允许在不进行修改的情况下测试 jQuery 对象的内容，如果这些元素中至少有一个与给定参数匹配，则返回 `true`。

```javascript
$("img").is( selector )
```

例如，验证元素是否具有某种状态，比如是否被选中、是否禁用等。

```javascript
$(element).is(':checked')
```

[`.not()`](https://api.jquery.com/not/) 方法从匹配元素的子集构造一个新的 jQuery 对象。所提供的选择器已针对每个元素进行了测试；与选择器不匹配的元素将包含在结果中。

```javascript
$(element).not( selector )
```

例如，排除特定索引的元素，比如排除列表中的第一个和最后一个元素。

```javascript
$('li').not(':first').not(':last').css('color', 'red');
```

[`.filter()`](https://api.jquery.com/filter/) 方法从匹配元素的子集构造一个新的 jQuery 对象。所提供的选择器已针对每个元素进行了测试；与选择器匹配的所有元素都将包含在结果中。

```javascript
$(element).filter( selector )
```

例如，选择表格的第二行。

```javascript
$('#example tbody tr').filter(':nth-child(2)');
```

### 操作

[`.map()`](https://api.jquery.com/map/) 方法通过函数将当前匹配集中的每个元素，映射成一个新 jQuery 对象，对于获取或设置元素集合的值特别有用。

```javascript
$("input[name='checkList']:checked").map( callback )
```

例如，获取表格中所有选择的行。

```javascript
$("input[name='checkList']:checked").map(function () {
  return $(this).val();
});
```

[`.each()`](https://api.jquery.com/each/) 迭代一个 jQuery 对象，为每个匹配的元素执行一个函数。

```javascript
$("img").each( function )
```

例如，处理所有图像资源的链接。

```javascript
$("img").each(function () {
  console.log(this.getAttribute("src"));
});
```

## 五、选择器

### 属性选择器

[jQuery( "[***attribute***='***value***']" )](https://api.jquery.com/attribute-equals-selector/) 选择具有指定属性且值恰好等于特定值的元素。

```javascript
$("input[name='checkList']").attr("checked", true);
```

### 表单

[jQuery( "**:checked**" )](https://api.jquery.com/checked-selector/) 适用于复选框、单选按钮和选择元素的选项。

```javascript
$("input:checked")
```

### 子元素

[jQuery( "**:nth-child**(index/even/odd/equation)" )](https://api.jquery.com/nth-child-selector/) 选择其父级的第 n 个子级的所有元素。

例如，选择表格的第二行。

```javascript
$('#example tbody tr:nth-child(2)');
```

## 六、核心

### DOM

- .**get**()

  取得所有匹配的 DOM 元素集合。

  ```javascript
  $("input[name='checkList']:checked")
    .map(function () {
      return $(this).val();
    })
    .get();
  ```

## 七、属性

- .**toggleClass**( *className*, *state* )

  根据类的存在或状态参数的值，从匹配元素集中的每个元素添加或删除一个或多个类。

  ```javascript
  $("#check-all").on("click", function () {
    $('input[name="link-checkbox"]').prop("checked", this.checked);
    $("#link_table tbody tr").toggleClass("selected", this.checked);
  });
  ```

