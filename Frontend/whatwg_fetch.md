# Fetch

## Fetch API

### Request class

#### 构造函数

`Request()` 构造器创建一个新的 `Request` 对象。

```javascript
var myRequest = new Request(input[, init])
```

请求相对地址：

```javascript
var myRequest = new Request('flowers.jpg');
```

#### 属性

- `request.url`：以字符串形式返回请求的 URL。

### Fetch method

```javascript
fetch(new Request("https://api.ipify.org/"), {
    headers: {
        'User-Agent': 'Cloudflare Workers'
    }
})
```

## 参见

- [Fetch Standard - WHATWG](https://fetch.spec.whatwg.org/)

