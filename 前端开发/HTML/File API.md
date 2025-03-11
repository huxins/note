# File API

[File](https://www.w3.org/TR/FileAPI/) 规范提供了一个 API，用于表示 Web 应用程序中的文件对象，以及以编程方式选择它们和访问它们的数据。

## 一、Blob

[`Blob`](https://www.w3.org/TR/FileAPI/#dfn-Blob) 对象表示一个不可变、原始数据的类文件对象。

例如，返回一个新创建的 `Blob` 对象，其内容由参数中给定的数组拼接组成。

```javascript
const array = ["Hello, world! This is a Blob example."];
const blob = new Blob(array, { type: 'text/plain' });
```

可以使用 `Blob` 来创建下载链接，以便用户可以下载该 `Blob` 内容。

```javascript
const url = URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = url;
a.download = 'example.txt';
a.click();

URL.revokeObjectURL(url);
```

将 [`File`](https://www.w3.org/TR/FileAPI/#dfn-file) 对象转换为 [`Blob`](https://www.w3.org/TR/FileAPI/#dfn-Blob) 对象。

```javascript
const file = document.querySelector('input[type="file"]').files[0];
const blob = new Blob([file], { type: file.type });
```

## 二、FileReader

[`FileReader`](https://www.w3.org/TR/FileAPI/#dfn-filereader) 接口允许 Web 应用程序异步读取存储在用户计算机上的文件的内容，使用 `File` 或 `Blob` 对象指定要读取的文件或数据。

**实例方法**：

- reader.[**readAsDataURL**](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)(*blob*)

  用于读取指定的 `Blob` 或 `File` 对象的内容。

  当读取操作完成时，[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 会变成已完成 [`DONE`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState#filereader.done)，并触发 [`loadend`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/loadend_event) 事件。此时 [`result`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/result) 属性将包含一个 `data:` URL 格式的 Base64 编码字符串以表示所读取文件的内容。

  ```javascript
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  
  reader.onload = function() {
    const base64Data = reader.result;
  };
  ```

- reader.[**readAsArrayBuffer**](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsArrayBuffer)(*blob*)

  用于开始读取指定 `Blob` 或 `File` 的内容。

  当读取操作完成时，[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 变成 [`DONE`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState#filereader.done)，并触发 [`loadend`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/loadend_event) 事件，同时 [`result`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/result) 属性将包含一个 `ArrayBuffer` 对象以表示所读取文件的数据。
  
  ```javascript
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  
  reader.onload = function() {
    const arrayBuffer = reader.result;
  };
  ```

