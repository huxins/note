# URL

## 一、URL

[`URL`](https://url.spec.whatwg.org/#url) 接口用于解析，构造，规范化和编码 `URL`。

[`URL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 构造函数返回一个新创建的 `URL` 对象，该对象表示由参数定义的 `URL`。

```javascript
let baseUrl = 'https://www.baidu.com';
let rootUrl = new URL('/', baseUrl);
```

静态方法：

- URL.[**createObjectURL**](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static)(*object*)

  创建一个用于表示参数中给出的对象的 URL 的字符串。

  ```javascript
  const url = URL.createObjectURL(blob);
  ```

## 二、URLSearchParams

[`URLSearchParams`](https://url.spec.whatwg.org/#urlsearchparams) 接口定义了一些实用的方法来处理 URL 的查询字符串。

[`URLSearchParams()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/URLSearchParams) 构造函数创建并返回一个新的 `URLSearchParams` 对象。

```javascript
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);
```

