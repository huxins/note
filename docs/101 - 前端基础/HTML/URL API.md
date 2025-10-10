# URL API

## 一、URL

[`URL`](https://url.spec.whatwg.org/#url) 接口用于解析，构造，规范化和编码 `URL`。

**构造函数**：

使用 [`URL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL) 构造函数创建一个新的 [`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 对象，该对象表示由参数定义的 `URL`。

```javascript
let baseUrl = 'https://www.baidu.com';
let rootUrl = new URL('/', baseUrl); // 生成 https://www.baidu.com/
```

**静态方法**：

- URL.[**createObjectURL**](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static)(*object*)

  生成指向 `Blob`/`File` 对象的临时 URL。

  ```javascript
  const url = URL.createObjectURL(blob);
  // 使用后需通过 revokeObjectURL 释放内存
  ```
  
- URL.[**revokeObjectURL**](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL_static)(*objectURL*)

  释放由 `createObjectURL` 创建的资源引用。

## 二、URLSearchParams

[`URLSearchParams`](https://url.spec.whatwg.org/#urlsearchparams) 接口提供了处理 URL 查询参数的标准化方法。

**构造函数**：

使用 [`URLSearchParams()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/URLSearchParams) 构造函数创建一个新的 [`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 对象。

```javascript
// 方式1: 通过查询字符串初始化
const params1 = new URLSearchParams("q=search&page=2");

// 方式2: 通过对象初始化
const params2 = new URLSearchParams({q: "test", sort: "price"});

// 方式3: 通过二维数组初始化
const params3 = new URLSearchParams([["type", "article"]]);
```

**实例方法**：

| 方法                                                         | 功能说明           | 示例                              |
| ------------------------------------------------------------ | ------------------ | --------------------------------- |
| [`.append(name, val)`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/append) | 追加参数           | `params.append('filter', '2023')` |
| [`.delete(name)`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/delete) | 删除指定参数       | `params.delete('page')`           |
| [`.get(name)`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/get) | 获取首个匹配参数值 | `params.get('q')`                 |
| [`.getAll(name)`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/getAll) | 获取全部同名参数值 | `params.getAll('category')`       |
| [`.has(name)`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/has) | 检查参数是否存在   | `params.has('search')`            |
| [`.set(name, val)`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/set) | 设置/覆盖参数      | `params.set('page', '5')`         |
| [`.sort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/sort) | 按名称排序参数     | `params.sort()`                   |

