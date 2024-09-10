# XMLHttpRequest

[`XMLHttpRequest`](https://xhr.spec.whatwg.org/#interface-xmlhttprequest) 对象用于与服务器交互。通过 `XMLHttpRequest` 可以在不刷新页面的情况下请求特定 URL，获取数据。

## 一、FormData

[`FormData`](https://xhr.spec.whatwg.org/#interface-formdata) 接口提供了一种表示表单数据的键值对 `key/value` 的构造方式。

```javascript
const form = document.getElementById("tagForm");
const formData = new FormData(form);
```

实例方法：

- formData.[**append**](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/append)(*name*, *value*)

  添加一个新值到 `FormData` 对象内的一个已存在的键中，如果键不存在则会添加该键。

  ```javascript
  formData.append(name, value);
  formData.append(name, value, filename);
  ```

- formData.[**entries**](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/entries)()
  
  返回一个 `iterator` 对象，此对象可以遍历访问 `FormData` 中的键值对。
  
  ```javascript
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
  ```

