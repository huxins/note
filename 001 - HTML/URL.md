## 九、URL

### 9.1. URL

#### 9.1.1. 构造函数

`URL()` 构造函数返回一个新创建的 URL 对象，该对象表示由参数定义的 URL。

```javascript
new URL(url)
```

- 将字符串解析为 URL。

  ```javascript
  var input = "https://example.org/path";
  var url = new URL(input);
  url.pathname // "/path"
  ```

### 9.2. URLSearchParams

`URLSearchParams` 接口定义了一些实用的方法来处理 URL 的查询字符串。

```javascript
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);
```

## 十、User-Agent Client Hints API

User-Agent Client Hints API 扩展了 Client Hints，提供通过请求标头以及 JavaScript API 公开浏览器和平台信息的方法。

通过 `--disable-features=UserAgentClientHint` 命令行标志关闭该功能。

