# XMLHttpRequest

[`XMLHttpRequest`](https://xhr.spec.whatwg.org/#interface-xmlhttprequest) 对象用于与服务器交互。通过它可以在不刷新页面的情况下请求特定 URL 并获取数据。

## 一、FormData

[`FormData`](https://xhr.spec.whatwg.org/#interface-formdata) 接口提供了一种构造表单数据（键值对 `key/value`）的方式，常用于通过 [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 或 [`fetch`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 发送表单数据。

通过表单元素或手动创建 [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) 对象。

```javascript
// 从表单元素创建
const form = document.getElementById("myForm");
const formData = new FormData(form);

// 手动创建并添加字段
const formData = new FormData();
formData.append("username", "John");
```

**实例方法**：

- formData.[**append**](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/append)(*name*, *value*)

  向 `FormData` 添加一个新值。若键已存在，则追加值；若不存在，则新建键。

  ```javascript
  formData.append(name, value);
  formData.append(name, value, filename);  // 用于文件上传时指定文件名
  ```

- formData.[**entries**](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/entries)()
  
  返回一个可遍历所有键值对的迭代器（`iterator`）。
  
  ```javascript
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
  ```

**应用场景**：

- 结合 `XMLHttpRequest` 发送 `FormData`

  ```javascript
  const formData = new FormData();
  formData.append("username", "John");
  
  const xhr = new XMLHttpRequest();
  
  // 先设置监听器再发送请求
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        console.log(JSON.parse(xhr.response));
      } catch (e) {
        console.error("Failed to parse response:", e);
      }
    } else {
      console.error("Request failed with status:", xhr.status);
    }
  };
  
  xhr.onerror = function() {
    console.error("Network error occurred");
  };
  
  xhr.open("POST", "https://httpbin.org/post");
  xhr.send(formData);
  ```

