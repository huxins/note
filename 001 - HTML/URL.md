# URL

## 一、URL

`URL` 接口用于解析，构造，规范化和编码 `URL`。

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

