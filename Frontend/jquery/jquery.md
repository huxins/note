# jQuery

## 事件

### 页面载入

#### .ready()

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

### 事件处理

#### .on()

在选择元素上绑定一个或多个事件的事件处理函数。

点击表格某一行时触发相关函数：

```javascript
$('#table').on('click', 'tbody tr', function() {
    console.log(this);
});
```

## 参考文献

- [jQuery Cheat Sheet](https://oscarotero.com/jquery/)
- [jQuery API 中文文档](https://jquery.cuishifeng.cn/)

