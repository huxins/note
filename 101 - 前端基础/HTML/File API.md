# File API

[File API](https://www.w3.org/TR/FileAPI/) 为 Web 应用提供了安全访问本地文件的能力，主要包含三大核心对象：

- [**Blob**](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)：二进制数据容器
- [**File**](https://developer.mozilla.org/zh-CN/docs/Web/API/File)：继承 Blob 的文件描述对象
- [**FileReader**](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)：异步文件内容读取器

## 一、Blob

[`Blob`](https://www.w3.org/TR/FileAPI/#dfn-Blob) 对象表示一个不可变、原始数据的类文件对象。

- **不可变性**：创建后内容不可修改
- **数据类型**：通过 [`type`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/type) 属性指定 MIME 类型
- **数据源**：支持 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)、字符串、其他 `Blob` 等

**构造函数**：

使用 [`Blob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/Blob) 构造函数创建一个新的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象。

```javascript
// 从字符串创建
const textBlob = new Blob(['Hello World'], { type: 'text/plain' });

// 组合多数据源
const mixedBlob = new Blob([buffer, 'Terminator', canvas.toBlob()]);
```

**典型应用场景**：

- **文件下载**

  使用 `Blob` 来创建下载链接，以便用户可以下载该 `Blob` 内容。
  
  ```javascript
  const downloadBlob = (content, filename) => {
    const blob = new Blob([content]);
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
  };
  ```
  
- **大文件分片**

  ```javascript
  const CHUNK_SIZE = 1024 * 1024; // 1MB
  
  function sliceLargeFile(file) {
    let offset = 0;
    const chunks = [];
  
    while (offset < file.size) {
      chunks.push(file.slice(offset, offset + CHUNK_SIZE));
      offset += CHUNK_SIZE;
    }
    return chunks;
  }
  ```

## 二、File

[`File`](https://www.w3.org/TR/FileAPI/#dfn-file) 接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

**对象获取方式**：

```html
<!-- 通过文件选择框获取 -->
<input type="file" id="fileElem" onchange="handleFile(this.files[0])">

<script>
  function handleFile(file) {
    if (!file) {
      console.log("未选择文件");
      return;
    }

    console.log("文件名:", file.name);

    // 将字节转换为更友好的单位（KB/MB/GB）
    const bytes = file.size;
    const units = ["bytes", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    console.log(`文件大小: ${size.toFixed(2)} ${units[unitIndex]}`);
  }
</script>
```

**类型转换**：

```javascript
// File → Blob
const fileToBlob = file => new Blob([file], {type: file.type});

// Blob → File
const blobToFile = (blob, fileName) => 
  new File([blob], fileName, {type: blob.type, lastModified: Date.now()});
```

## 三、FileReader

[`FileReader`](https://www.w3.org/TR/FileAPI/#dfn-filereader) 接口允许 Web 应用程序异步读取存储在用户计算机上的文件的内容，使用 `File` 或 `Blob` 对象指定要读取的文件或数据。

**读取模式对照表**：

| 方法                                                         | 输出格式         | 适用场景                 |
| ------------------------------------------------------------ | ---------------- | ------------------------ |
| [`readAsArrayBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsArrayBuffer) | `ArrayBuffer`    | 二进制数据处理           |
| [`readAsBinaryString()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsBinaryString) | 原始二进制字符串 | 遗留系统兼容（逐渐淘汰） |
| [`readAsText()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsText) | UTF-8 文本字符串 | 文本文件解析             |
| [`readAsDataURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL) | Base64 数据 URL  | 图片预览、小文件内联     |

**事件处理模型**：

当读取操作完成时，[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 变成 [`DONE`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState#filereader.done)，并触发 [`loadend`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/loadend_event) 事件。此时 [`result`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/result) 属性将包含一个对应输出格式的对象以表示所读取文件的数据。

```javascript
const reader = new FileReader();

reader.onloadstart = () => console.log('读取开始');
reader.onprogress = e => {
  const percent = (e.loaded / e.total * 100).toFixed(2);
  console.log(`进度: ${percent}%`);
};
reader.onload = () => {
  const preview = document.createElement('img');
  preview.src = reader.result;
  document.body.appendChild(preview);
};
reader.onerror = () => console.error('读取错误:', reader.error);

reader.readAsDataURL(imageFile);
```

**实例方法**：

- reader.[**readAsDataURL**](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)(*blob*)

  用于读取指定的 `Blob` 或 `File` 对象的内容。

  当读取操作完成时，[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 变成 [`DONE`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState#filereader.done)，并触发 [`loadend`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/loadend_event) 事件。此时 [`result`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/result) 属性将包含一个 `data:` URL 格式的 Base64 编码字符串以表示所读取文件的内容。

  ```javascript
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  
  reader.onload = function() {
    const base64Data = reader.result;
  };
  ```

- reader.[**readAsArrayBuffer**](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsArrayBuffer)(*blob*)

  用于读取指定的 `Blob` 或 `File` 对象的内容。

  当读取操作完成时，[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 变成 [`DONE`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState#filereader.done)，并触发 [`loadend`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/loadend_event) 事件。此时 [`result`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/result) 属性将包含一个 `ArrayBuffer` 对象以表示所读取文件的数据。
  
  ```javascript
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  
  reader.onload = function() {
    const arrayBuffer = reader.result;
  };
  ```

