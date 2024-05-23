# File

## 一、Blob

`Blob` 对象表示一个不可变、原始数据的类文件对象。

- **Blob**()

  返回一个新创建的 `Blob` 对象，其内容由参数中给定的数组拼接组成。

  ```javascript
  const blob = new Blob(array);
  ```

  - 将 File 对象转换为 Blob 对象。

    ```javascript
    const file = document.querySelector('input[type="file"]').files[0];
    const blob = new Blob([file], {type: file.type});
    ```

## 二、FileReader

实例方法：

- FileReader.**readAsDataURL**(*blob*)

  `readAsDataURL` 方法会读取指定的 Blob 或 File 对象。

  读取操作完成的时候，`readyState` 会变成已完成 `DONE`，并触发 `loadend` 事件，同时 `result` 属性将包含一个 `data:` URL 格式的 Base64 编码字符串以表示所读取文件的内容。

  ```javascript
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  
  reader.onload = function() {
    const base64Data = reader.result;
  };
  ```

- FileReader.**readAsArrayBuffer**(*blob*)

  `readAsArrayBuffer` 方法用于开始读取指定 Blob 或 File 的内容。

  当读取操作完成时，`readyState` 变成 `DONE`，并触发 `loadend` 事件，同时 `result` 属性将包含一个 `ArrayBuffer` 对象以表示所读取文件的数据。
  
  ```javascript
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  
  reader.onload = function() {
    const arrayBuffer = reader.result;
  };
  ```

