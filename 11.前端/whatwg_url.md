# URL

## API

### URL class

#### 构造函数

`URL()` 构造函数返回一个新创建的 `URL` 对象，表示由一组参数定义的 `URL`。

```javascript
const url = new URL(url [, base])
```

不使用 `base URL` 的情况下将字符串解析为 `URL`：

```javascript
var input = "https://example.org/path",
    url = new URL(input)
url.pathname // "/path"
```

如果输入的是相对 URL 字符串，则需要 `base URL`：

```javascript
var input = "/path",
    url = new URL(input, document.baseURI)
url.href // "https://url.spec.whatwg.org/path"
```

`URL` 对象可以用作 `base URL`，`URL` 对象字符串化为它的 `href` getter 返回值：

```javascript
var url = new URL("path", new URL("https://pride.example/hello-world"))
url.pathname // "/path"
```

## 参见

- [URL Standard - WHATWG](https://url.spec.whatwg.org/)

