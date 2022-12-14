# jQuery

## 1. 事件

### 1.1. 页面载入

#### 1.1.1. `.ready()`

`window.load` 事件的替代方法。在 DOM 载入就绪能够读取并操纵时立即调用所绑定的函数。

```javascript
$(document).ready(function() {
    ...
});
```

可以简写为：

```javascript
$(function() {
    ...
});
```

### 1.2. 事件处理

#### 1.2.1. `.on()`

在选择元素上绑定一个或多个事件的事件处理函数。

```
.on( events [, selector ] [, data ], handler )
```

- 单击时在 `alert` 中显示段落的文本：

  ```javascript
  $("p").on("click", function(){
      alert( $(this).text() );
  });
  ```
  
- 单击表格某一行时触发相关函数：

  ```javascript
  $('#table').on('click', 'tbody tr', function() {
      console.log(this);
  });
  ```

## 2. Ajax

### 2.1. 底层接口

#### 2.1.1. `jQuery.ajax()`

执行异步 HTTP Ajax 请求。

```
jQuery.ajax( url [, settings ] )
```

- 发送 JSON 数据到服务器，成功时显示信息：

  ```javascript
  $.ajax({
      type: "POST",
      url: "some.php",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function(msg) {
          alert("Data Saved: " + msg);
      }
  });
  ```

##### 2.1.1.1. 参数

- `url`

  一个用来包含发送请求的 URL 字符串。
  
- `settings`

  AJAX 请求设置。所有选项都是可选的。

##### 2.1.1.2. 选项

- `data`

  Type: `PlainObject` or `String` or `Array`

  要发送到服务器的数据。如果 HTTP 方法是不能有实体主体的方法，例如 GET，数据将附加到 URL。

- `type`

  Type: `String`

  默认值为 `GET`。请求方式可选 `POST` 或 `GET`。其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。

### 2.2. 辅助功能

#### 2.2.1. `.serialize()`

将一组表单元素编码为字符串以供提交。

```javascript
var str = $("form").serialize();
```

#### 2.2.2. `.serializeArray()`

将一组表单元素编码为名称和值的数组。

```javascript
var fields = $("select, :radio").serializeArray();
```

- 将表单数据序列化为 JSON：

  ```javascript
  function getFormData($form) {
      var unindexed_array = $form.serializeArray();
      var indexed_array = {};
  
      $.map(unindexed_array, function (n) {
          indexed_array[n['name']] = n['value'];
      });
  
      return indexed_array;
  }
  ```

## 3. 工具

### 3.1. 数组和对象操作

#### 3.1.1. `jQuery.map()`

将一个数组中的元素转换到另一个数组中。

```
jQuery.map( array, callback )
```

- 将原数组中每个元素加 4 转换为一个新数组：

  ```javascript
  $.map([0,1,2], function(n){
      return n + 4;
  });
  ```
  
- 将原数组中每个元素加自身索引转换成一个新数组：

  ```javascript
  $.map([0,1,2], function(n, index){
      return n + index;
  });
  ```

