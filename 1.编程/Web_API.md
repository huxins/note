# Web API

## 一、File

### 1.1. Blob

#### 1.1.1. 构造函数

```javascript
var aBlob = new Blob(array, options);
```

将文件对象转换为 Blob 对象。

```javascript
const file = document.querySelector('input[type="file"]').files[0];

const blob = new Blob([file], {type: file.type});
```

### 1.2. FileReader

#### 1.2.1. 实例方法

- FileReader.**readAsDataURL**()

  `readAsDataURL` 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，`readyState` 会变成已完成 `DONE`，并触发 `loadend` 事件，同时 `result` 属性将包含一个 `data:` URL 格式的字符串（Base64 编码）以表示所读取文件的内容。

  ```javascript
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  
  // 读取完成后，将文件内容转换为 base64 字符串
  reader.onload = function() {
    const base64Data = reader.result;
  };
  ```

- FileReader.**readAsArrayBuffer**()

  `readAsArrayBuffer` 方法用于启动读取指定的 Blob 或 File 内容。当读取操作完成时，`readyState` 变成 `DONE`（已完成），并触发 `loadend` 事件，同时 `result` 属性中将包含一个 `ArrayBuffer` 对象以表示所读取文件的数据。

  ```javascript
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  
  // 读取完成后，创建 ArrayBuffer 对象
  reader.onload = function() {
    const arrayBuffer = reader.result;
  };
  ```

