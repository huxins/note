# jQuery

## 一、原型方法

### 1.1. 事件处理

- jQuery.prototype.**ready**()

  `DOMContentLoaded` 事件的替代方法。在 DOM 载入就绪能够读取并操纵时立即调用所绑定的函数。

  ```javascript
  $(document).ready(handler)
  ```

  可以简写。

  ```javascript
  $(handler)
  ```

- jQuery.prototype.**on**()

  在选择元素上绑定一个或多个事件的事件处理函数。

  ```javascript
  jQuery.prototype.on(events[, selector][, data], handler)
  ```

  - **events** (*string*)

    一种或多种以空格分隔的事件类型和可选的命名空间，例如 `click` 或 `keydown.myPlugin`。

  - **selector** (*string*)

    选择器字符串，用于过滤触发事件的所选元素的后代。

  - **data**

    触发事件时要传递的 `event.data` 给事件处理函数。

  - **handler** (*function*)

    触发事件时执行的函数。

  以下为一些例子：

  - 单击时在 `alert` 中显示段落的文本。

      ```javascript
      $("p").on("click", function() {
          alert( $(this).text() );
      });
      ```

  - 单击表格某一行时触发相关函数。

      ```javascript
      $('#table').on('click', 'tbody tr', function() {
          console.log(this);
      });
      ```

- jQuery.prototype.**trigger**()

  在每一个匹配的元素上触发某类事件。

  ```javascript
  jQuery.prototype.trigger(eventType[, extraParameters])
  ```
  
  例如，在指定元素上触发点击事件。
  
  ```javascript
  $(".videoListItem").trigger("click");
  ```

### 1.2. 序列化

- jQuery.prototype.**serialize**()

  将一组表单元素编码为字符串以供提交。

  ```javascript
  var str = $("form").serialize();
  ```

- jQuery.prototype.**serializeArray**()

  将一组表单元素编码为名称和值的数组。

  ```javascript
  var fields = $("form").serializeArray();
  ```

  - 将表单数据序列化为 JSON。

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

## 二、静态方法

### 2.1. Ajax

- jQuery.**ajax**()

  执行异步 HTTP Ajax 请求。

  ```javascript
  jQuery.ajax(url[, settings])
  ```

  - **url** (*string*)

    一个包含发送请求的 URL 字符串。

  - **settings** (*object*)

    Ajax 请求设置。所有选项都是可选的。

    - **data** (*object* or *string* or *array*)

      要发送到服务器的数据。如果 HTTP 方法是不能有实体主体的方法，例如 `GET`，数据将附加到 URL。

    - **type** (*String*)

      默认值为 `GET`。请求方式可选 `POST` 或 `GET`。其它 HTTP 请求方法，如 `PUT` 和 `DELETE` 也可以使用，但仅部分浏览器支持。

    - **url** (*String*)

      一个用来包含发送请求的 URL 字符串。

    - **contentType** (*boolean* or *string*)

      向服务器发送数据时，使用此内容类型。如 `application/x-www-form-urlencoded`。

    - **success** (*function*)

      请求成功时调用的函数。

    - **async** (*boolean*)

      默认情况下，所有请求都是异步发送的，即默认情况下设置为 `true`。
      
    - **beforeSend** (*function*)
    
      在发送请求之前调用，并且传入一个 XMLHttpRequest 作为参数。
  
  以下为一些例子：
  
  - 发送 JSON 数据到服务器，成功时显示信息。
  
    ```javascript
    $.ajax({
      type: "POST",
      url: "https://nghttp2.org/httpbin/post",
      contentType: "application/json",
      data: JSON.stringify([1, 2, 3]),
      success: function (msg) {
        alert("Data Saved: " + msg);
      },
    });
    ```

## 三、工具

### 3.1. 数组和对象操作

- *jQuery*.**map**( *array*, *callback* )

  将一个数组中的元素转换到另一个数组中。

  - 将原数组中每个元素加 4 转换为一个新数组。

    ```javascript
    $.map([0, 1, 2], function (n) {
      return n + 4;
    });
    ```

  - 将原数组中每个元素加自身索引转换成一个新数组。

    ```javascript
    $.map([0, 1, 2], function (n, index) {
      return n + index;
    });
    ```

- *jQuery*.**extend**( *target*, *object1* [, *objectN* ] )

  将两个或多个对象的内容合并到第一个对象中。

  ```javascript
  const headers = {
    Authorization: `Bearer`,
  };
  $.extend(headers, {
    "Content-Type": "application/json",
  });
  ```

## 四、遍历

### 4.1. 树遍历

- .**find**( *selector* )

  获取当前匹配元素集中每个元素的后代元素。

  ```javascript
  $('table').find('thead th')
  ```

- .**closest**( *selector* )

  从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素。

  ```javascript
  $("#table tbody").on("click", "td", function () {
    var tr = $(this).closest("tr");
    console.log(tr);
  });
  ```

- .**parent**( [*selector* ] )

  获取当前匹配元素集中每个元素的父元素。

### 4.2. 过滤

- .**map**( *callback* )

  通过函数将当前匹配集中的每个元素，映射成一个新 jQuery 对象。

  ```javascript
  $("input[name='checkList']:checked").map(function () {
    return $(this).val();
  });
  ```

- .**each**( *function* )

  迭代一个 jQuery 对象，为每个匹配的元素执行一个函数。

  ```javascript
  $("img").each(function () {
    console.log(this.getAttribute("src"));
  });
  ```

- .**eq**( *index* )

  将匹配元素的集合减少到指定索引处。

  ```javascript
  $("p").eq(0)
  ```

- .**is**( *selector* )

  根据选择器、元素或 jQuery 对象检查当前匹配的元素集，如果这些元素中至少有一个与给定参数匹配，则返回 `true`。

  ```javascript
  $(event.target).is(":nth-child(1)")
  ```

- .**not**( *selector* )

  从匹配元素集中删除元素。

## 五、选择器

### 5.1. 属性

- *jQuery*( "[**attribute**='**value**']" )

  选择具有指定属性且值恰好等于特定值的元素。

  ```javascript
  $("input[name='checkList']").attr("checked", true);
  ```

### 5.2. 表单

- *jQuery*( "**:checked**" )

  匹配所有选中或选择的元素。

  ```javascript
  $("input:checked")
  ```

### 5.3. 子元素

- *jQuery*( "**:nth-child**(*index*/*even*/*odd*/*equation*)" )

  匹配其父元素下的第N个子或奇偶元素。

  ```javascript
  $('#example tbody tr:nth-child(2)');
  $('#example tbody tr').filter(':nth-child(2)');
  ```

## 六、核心

### 6.1. DOM 元素方法

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

