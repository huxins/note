# Fetch API

[Fetch API](https://fetch.spec.whatwg.org/) 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。

全局 [`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch) 方法用于发起网络请求，基于 Promise 机制，主要包含以下核心组件：

- [Headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers)：HTTP 头管理
- [Request](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)：请求对象封装
- [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)：响应对象解析

## 一、核心类

### Headers

**构造函数**：

使用 [`Headers()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/Headers) 构造方法创建一个新的 [`Headers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 对象。

```javascript
// 初始化创建
const headers1 = new Headers({ "Content-Type": "text/plain" });

// 基于已有对象复制
const originalHeaders = new Headers({ Authorization: "Bearer token" });
const headers2 = new Headers(originalHeaders);
```

**实例方法**：

- headers.[**append**](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/append)(*name*, *value*)

  追加或修改头信息。
  
  ```javascript
  headers.append("Cache-Control", "max-age=3600");
  headers.append("X-Custom-Header", "value");
  ```

### Request

**构造函数**：

使用 [`Request()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request) 构造方法创建一个新的 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 对象。

```javascript
// 基础请求
const request1 = new Request("/api/data");

// 带配置项的请求
const request2 = new Request("https://api.example.com", {
  method: "POST",
  headers: new Headers({ "Content-Type": "application/json" }),
  body: JSON.stringify({ key: "value" })
});
```

**实例属性**：

- request.[**url**](https://developer.mozilla.org/en-US/docs/Web/API/Request/url)

  以字符串形式返回请求的 URL。
  
  ```javascript
  console.log(request2.url);
  ```

### Response

**构造函数**：

使用 [`Response()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/Response) 构造函数创建一个新的 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象。

```javascript
// 创建自定义响应
const response = new Response(JSON.stringify({ data: "test" }), {
  status: 200,
  headers: new Headers({ "Content-Type": "application/json" })
});
```

**实例属性**：

- response.[**headers**](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/headers)

  返回与响应关联的 [`Headers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 对象。
  
  ```javascript
  response.headers.get("Content-Type"); // 返回: application/json
  ```

## 二、Fetch

全局作用域中的 [`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch) 方法用于发起资源请求，返回一个在响应到达时解析为 `Response` 对象的 Promise。

### 基础用法

```javascript
fetch("https://api.ipify.org/?format=json")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

### 高级配置

```javascript
// 带请求配置的示例
fetch(new Request("https://api.ipify.org", {
  headers: { "User-Agent": "Cloudflare Workers" }
}))
  .then(res => res.text())
  .then(ip => console.log("Public IP:", ip));
```

